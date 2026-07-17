-- ============================================================
-- COMMUNITY FEATURES - CriticPixel
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- Asegurar que reviews tenga las columnas necesarias
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS dislikes_count INTEGER DEFAULT 0;

-- ============================================================
-- 1. FORO DE DISCUSIÓN POR JUEGO
-- ============================================================

CREATE TABLE IF NOT EXISTS forum_threads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  last_reply_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "forum_threads_select_public" ON forum_threads FOR SELECT USING (true);
CREATE POLICY "forum_threads_insert_auth" ON forum_threads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "forum_threads_update_own" ON forum_threads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "forum_threads_delete_own_or_admin" ON forum_threads FOR DELETE USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "forum_replies_select_public" ON forum_replies FOR SELECT USING (true);
CREATE POLICY "forum_replies_insert_auth" ON forum_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "forum_replies_update_own" ON forum_replies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "forum_replies_delete_own_or_admin" ON forum_replies FOR DELETE USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE INDEX IF NOT EXISTS idx_forum_threads_game ON forum_threads(game_id, last_reply_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_replies_thread ON forum_replies(thread_id, created_at);

-- ============================================================
-- 2. COMENTARIOS EN RESEÑAS (REPLY)
-- ============================================================

CREATE TABLE IF NOT EXISTS review_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES review_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE review_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "review_comments_select_public" ON review_comments FOR SELECT USING (true);
CREATE POLICY "review_comments_insert_auth" ON review_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "review_comments_update_own" ON review_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "review_comments_delete_own_or_admin" ON review_comments FOR DELETE USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE INDEX IF NOT EXISTS idx_review_comments_review ON review_comments(review_id, created_at);

-- ============================================================
-- 3. SISTEMA DE SEGUIDORES
-- ============================================================

CREATE TABLE IF NOT EXISTS follows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK(follower_id != following_id)
);

ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "follows_select_public" ON follows FOR SELECT USING (true);
CREATE POLICY "follows_insert_auth" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "follows_delete_own" ON follows FOR DELETE USING (auth.uid() = follower_id);

CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);

-- ============================================================
-- 4. FEED DE ACTIVIDAD
-- ============================================================

CREATE TABLE IF NOT EXISTS activity_feed (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('review', 'wishlist', 'follow', 'forum_post', 'guide', 'screenshot', 'achievement')),
  target_type TEXT,
  target_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "activity_feed_select_public" ON activity_feed FOR SELECT USING (true);
CREATE POLICY "activity_feed_insert_system" ON activity_feed FOR INSERT WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_activity_feed_created ON activity_feed(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_feed_user ON activity_feed(user_id, created_at DESC);

-- ============================================================
-- 5. GRUPOS/CLANES
-- ============================================================

CREATE TABLE IF NOT EXISTS groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'genre' CHECK (type IN ('genre', 'platform', 'general')),
  avatar_url TEXT,
  member_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'leader')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

CREATE TABLE IF NOT EXISTS group_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "groups_select_public" ON groups FOR SELECT USING (true);
CREATE POLICY "groups_insert_auth" ON groups FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "group_members_select_public" ON group_members FOR SELECT USING (true);
CREATE POLICY "group_members_insert_auth" ON group_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "group_members_delete_own" ON group_members FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "group_posts_select_public" ON group_posts FOR SELECT USING (true);
CREATE POLICY "group_posts_insert_auth" ON group_posts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Grupos iniciales
INSERT INTO groups (name, slug, description, type) VALUES
  ('RPG Masters', 'rpg-masters', 'Para amantes de los RPG', 'genre'),
  ('FPS Legends', 'fps-legends', 'Amantes de los shooters', 'genre'),
  ('Horror Survivors', 'horror-survivors', 'Para valientes que disfrutan el terror', 'genre'),
  ('PlayStation Nation', 'playstation-nation', 'Comunidad PlayStation', 'platform'),
  ('Xbox Gang', 'xbox-gang', 'Comunidad Xbox', 'platform'),
  ('Nintendo Club', 'nintendo-club', 'Comunidad Nintendo', 'platform'),
  ('PC Master Race', 'pc-master-race', 'Comunidad PC Gaming', 'platform'),
  ('Indie Lovers', 'indie-lovers', 'Juegos independientes', 'genre'),
  ('Open World Explorers', 'open-world-explorers', 'Amantes de los mundos abiertos', 'genre'),
  ('Retro Gaming', 'retro-gaming', 'Clásicos que nunca mueren', 'genre')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 6. LOGROS COMUNITARIOS
-- ============================================================

CREATE TABLE IF NOT EXISTS community_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT '🏆',
  target_count INTEGER NOT NULL,
  current_count INTEGER DEFAULT 0,
  reward_badge TEXT,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE community_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "community_achievements_select_public" ON community_achievements FOR SELECT USING (true);
CREATE POLICY "community_achievements_update_system" ON community_achievements FOR UPDATE USING (true);

-- Logros comunitarios iniciales
INSERT INTO community_achievements (key, name, description, icon, target_count, reward_badge) VALUES
  ('total_reviews_100', '100 Reseñas', 'La comunidad alcanzó 100 reseñas', '📝', 100, 'community_100_reviews'),
  ('total_reviews_500', '500 Reseñas', 'La comunidad alcanzó 500 reseñas', '🏅', 500, 'community_500_reviews'),
  ('total_reviews_1000', '1000 Reseñas', 'La comunidad alcanzó 1000 reseñas', '👑', 1000, 'community_1000_reviews'),
  ('total_users_50', '50 Miembros', 'La comunidad alcanzó 50 usuarios', '👥', 50, 'community_50_users'),
  ('total_users_100', '100 Miembros', 'La comunidad alcanzó 100 usuarios', '🌟', 100, 'community_100_users'),
  ('total_forum_posts_200', '200 Hilos', 'La comunidad creó 200 hilos en el foro', '💬', 200, 'community_200_threads')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- 7. ETIQUETAS DE RESEÑA
-- ============================================================

CREATE TABLE IF NOT EXISTS review_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  icon TEXT,
  color TEXT DEFAULT '#ff6b00'
);

CREATE TABLE IF NOT EXISTS review_tag_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES review_tags(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, tag_id, user_id)
);

ALTER TABLE review_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_tag_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "review_tags_select_public" ON review_tags FOR SELECT USING (true);
CREATE POLICY "review_tag_votes_select_public" ON review_tag_votes FOR SELECT USING (true);
CREATE POLICY "review_tag_votes_insert_auth" ON review_tag_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "review_tag_votes_delete_own" ON review_tag_votes FOR DELETE USING (auth.uid() = user_id);

-- Etiquetas iniciales
INSERT INTO review_tags (name, icon, color) VALUES
  ('Útil', '👍', '#22c55e'),
  ('Divertida', '😂', '#eab308'),
  ('Técnica', '🔧', '#3b82f6'),
  ('Spoiler', '⚠️', '#ef4444'),
  ('Original', '✨', '#a855f7'),
  ('Concisa', '📝', '#6b7280')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- 8. REPORTAR RESEÑAS
-- ============================================================

CREATE TABLE IF NOT EXISTS review_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL CHECK (reason IN ('spam', 'harassment', 'inappropriate', 'spoiler', 'fake', 'other')),
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, reporter_id)
);

ALTER TABLE review_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "review_reports_insert_auth" ON review_reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "review_reports_select_admin" ON review_reports
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "review_reports_update_admin" ON review_reports
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 9. ARTÍCULOS/NOTICIAS DE LA COMUNIDAD
-- ============================================================

CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT DEFAULT 'news' CHECK (category IN ('news', 'review', 'guide', 'opinion', 'tutorial')),
  tags TEXT[] DEFAULT '{}',
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS article_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES article_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "articles_select_published" ON articles FOR SELECT USING (published = true);
CREATE POLICY "articles_select_own" ON articles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "articles_insert_auth" ON articles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "articles_update_own" ON articles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "articles_delete_own_or_admin" ON articles FOR DELETE USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "article_comments_select_public" ON article_comments FOR SELECT USING (true);
CREATE POLICY "article_comments_insert_auth" ON article_comments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category, created_at DESC);

-- ============================================================
-- 10. GUÍAS DE USUARIO
-- ============================================================

CREATE TABLE IF NOT EXISTS guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  tags TEXT[] DEFAULT '{}',
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  bookmarks_count INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guide_bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guide_id UUID REFERENCES guides(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(guide_id, user_id)
);

ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "guides_select_published" ON guides FOR SELECT USING (published = true);
CREATE POLICY "guides_select_own" ON guides FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "guides_insert_auth" ON guides FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "guides_update_own" ON guides FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "guide_bookmarks_select_own" ON guide_bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "guide_bookmarks_insert_auth" ON guide_bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "guide_bookmarks_delete_own" ON guide_bookmarks FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_guides_published ON guides(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guides_game ON guides(game_id) WHERE game_id IS NOT NULL;

-- ============================================================
-- 11. CAPTURAS/SCREENSHOTS
-- ============================================================

CREATE TABLE IF NOT EXISTS screenshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS screenshot_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  screenshot_id UUID REFERENCES screenshots(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(screenshot_id, user_id)
);

ALTER TABLE screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenshot_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "screenshots_select_public" ON screenshots FOR SELECT USING (true);
CREATE POLICY "screenshots_insert_auth" ON screenshots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "screenshots_delete_own_or_admin" ON screenshots FOR DELETE USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "screenshot_likes_select_public" ON screenshot_likes FOR SELECT USING (true);
CREATE POLICY "screenshot_likes_insert_auth" ON screenshot_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "screenshot_likes_delete_own" ON screenshot_likes FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_screenshots_game ON screenshots(game_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_screenshots_user ON screenshots(user_id, created_at DESC);

-- ============================================================
-- 12. PUNTOS DE REPUTACIÓN Y RANGOS
-- ============================================================

CREATE TABLE IF NOT EXISTS reputation_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  source_type TEXT,
  source_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reputation_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reputation_log_select_own" ON reputation_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "reputation_log_select_public" ON reputation_log FOR SELECT USING (true);
CREATE POLICY "reputation_log_insert_system" ON reputation_log FOR INSERT WITH CHECK (true);

-- Agregar campos de reputación a profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS reputation INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS rank_title TEXT DEFAULT 'Novato';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS follower_count INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS following_count INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_reputation_log_user ON reputation_log(user_id, created_at DESC);

-- ============================================================
-- 13. LEADERBOARD
-- ============================================================

-- Vista materializada para leaderboard rápido
CREATE OR REPLACE VIEW leaderboard AS
SELECT
  p.id,
  p.display_name,
  p.avatar_url,
  p.reputation,
  p.rank_title,
  p.review_count,
  p.follower_count,
  (SELECT COUNT(*) FROM follows WHERE following_id = p.id) AS followers,
  (SELECT COUNT(*) FROM follows WHERE follower_id = p.id) AS following,
  (SELECT COUNT(*) FROM reviews WHERE user_id = p.id) AS total_reviews,
  (SELECT COUNT(*) FROM user_achievements WHERE user_id = p.id) AS total_achievements
FROM profiles p
WHERE p.is_banned = false OR p.is_banned IS NULL
ORDER BY p.reputation DESC;

-- ============================================================
-- FUNCIONES ÚTILES
-- ============================================================

-- Función para agregar puntos de reputación
CREATE OR REPLACE FUNCTION add_reputation(
  p_user_id UUID,
  p_points INTEGER,
  p_reason TEXT,
  p_source_type TEXT DEFAULT NULL,
  p_source_id TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles SET reputation = reputation + p_points WHERE id = p_user_id;
  INSERT INTO reputation_log (user_id, points, reason, source_type, source_id)
  VALUES (p_user_id, p_points, p_reason, p_source_type, p_source_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para calcular rango basado en reputación
CREATE OR REPLACE FUNCTION calculate_rank(p_reputation INTEGER)
RETURNS TEXT AS $$
BEGIN
  RETURN CASE
    WHEN p_reputation >= 1000 THEN 'Leyenda'
    WHEN p_reputation >= 500 THEN 'Maestro Crítico'
    WHEN p_reputation >= 200 then 'Crítico Veterano'
    WHEN p_reputation >= 100 THEN 'Crítico Experto'
    WHEN p_reputation >= 50 THEN 'Crítico Activo'
    WHEN p_reputation >= 20 THEN 'Crítico Novel'
    ELSE 'Novato'
  END;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TRIGGERS PARA REPUTACIÓN AUTOMÁTICA
-- ============================================================

-- +5 puntos por reseña publicada
CREATE OR REPLACE FUNCTION trigger_review_reputation()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM add_reputation(NEW.user_id, 5, 'Reseña publicada', 'review', NEW.id::TEXT);
  UPDATE profiles SET review_count = review_count + 1 WHERE id = NEW.user_id;
  UPDATE profiles SET rank_title = calculate_rank(reputation) WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_review_created ON reviews;
CREATE TRIGGER on_review_created
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION trigger_review_reputation();

-- +2 puntos por like recibido en reseña
CREATE OR REPLACE FUNCTION trigger_like_reputation()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM add_reputation(
    (SELECT user_id FROM reviews WHERE id = NEW.review_id),
    2,
    'Like recibido en reseña',
    'review_like',
    NEW.review_id::TEXT
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_review_vote_created ON review_votes;
CREATE TRIGGER on_review_vote_created
  AFTER INSERT ON review_votes
  FOR EACH ROW EXECUTE FUNCTION trigger_like_reputation();

-- +1 punto por comentario en reseña
CREATE OR REPLACE FUNCTION trigger_comment_reputation()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM add_reputation(NEW.user_id, 1, 'Comentario en reseña', 'review_comment', NEW.id::TEXT);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_review_comment_created ON review_comments;
CREATE TRIGGER on_review_comment_created
  AFTER INSERT ON review_comments
  FOR EACH ROW EXECUTE FUNCTION trigger_comment_reputation();

-- +3 puntos por hilo de foro
CREATE OR REPLACE FUNCTION trigger_forum_reputation()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM add_reputation(NEW.user_id, 3, 'Hilo de foro creado', 'forum_thread', NEW.id::TEXT);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_forum_thread_created ON forum_threads;
CREATE TRIGGER on_forum_thread_created
  AFTER INSERT ON forum_threads
  FOR EACH ROW EXECUTE FUNCTION trigger_forum_reputation();

-- +1 punto por respuesta en foro
CREATE OR REPLACE FUNCTION trigger_forum_reply_reputation()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM add_reputation(NEW.user_id, 1, 'Respuesta en foro', 'forum_reply', NEW.id::TEXT);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_forum_reply_created ON forum_replies;
CREATE TRIGGER on_forum_reply_created
  AFTER INSERT ON forum_replies
  FOR EACH ROW EXECUTE FUNCTION trigger_forum_reply_reputation();

-- +10 puntos por guía publicada
CREATE OR REPLACE FUNCTION trigger_guide_reputation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.published = true THEN
    PERFORM add_reputation(NEW.user_id, 10, 'Guía publicada', 'guide', NEW.id::TEXT);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_guide_created ON guides;
CREATE TRIGGER on_guide_created
  AFTER INSERT ON guides
  FOR EACH ROW EXECUTE FUNCTION trigger_guide_reputation();

-- +2 puntos por screenshot
CREATE OR REPLACE FUNCTION trigger_screenshot_reputation()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM add_reputation(NEW.user_id, 2, 'Screenshot compartido', 'screenshot', NEW.id::TEXT);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_screenshot_created ON screenshots;
CREATE TRIGGER on_screenshot_created
  AFTER INSERT ON screenshots
  FOR EACH ROW EXECUTE FUNCTION trigger_screenshot_reputation();

-- ============================================================
-- FUNCIÓN PARA INSERTAR ACTIVIDAD EN FEED
-- ============================================================

CREATE OR REPLACE FUNCTION log_activity(
  p_user_id UUID,
  p_action TEXT,
  p_target_type TEXT DEFAULT NULL,
  p_target_id TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO activity_feed (user_id, action, target_type, target_id, metadata)
  VALUES (p_user_id, p_action, p_target_type, p_target_id, p_metadata);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- FUNCIÓN PARA ACTUALIZAR CONTEO DE RESPUESTAS EN FORO
-- ============================================================

CREATE OR REPLACE FUNCTION update_thread_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE forum_threads SET replies_count = replies_count + 1, last_reply_at = NOW() WHERE id = NEW.thread_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE forum_threads SET replies_count = replies_count - 1 WHERE id = OLD.thread_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_forum_reply_change ON forum_replies;
CREATE TRIGGER on_forum_reply_change
  AFTER INSERT OR DELETE ON forum_replies
  FOR EACH ROW EXECUTE FUNCTION update_thread_reply_count();
