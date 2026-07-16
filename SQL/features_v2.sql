-- ============================================================
-- FEATURE: Vote Reviews (like/helpful)
-- ============================================================

CREATE TABLE IF NOT EXISTS review_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('like', 'dislike')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "review_votes_select_public" ON review_votes FOR SELECT USING (true);
CREATE POLICY "review_votes_insert_auth" ON review_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "review_votes_delete_own" ON review_votes
  FOR DELETE USING (auth.uid() = user_id);

-- Agregar columna de conteo de votos a reviews
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS dislikes_count INTEGER DEFAULT 0;

-- ============================================================
-- FEATURE: Achievements/Badges
-- ============================================================

CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT '🏆',
  category TEXT DEFAULT 'general'
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_achievements_select_own" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_achievements_insert_system" ON user_achievements
  FOR INSERT WITH CHECK (true);

-- Logros iniciales
INSERT INTO achievements (key, name, description, icon, category) VALUES
  ('first_review', 'Primera Reseña', 'Escribió su primera reseña', '✍️', 'reviews'),
  ('five_reviews', 'Crítico Novel', 'Escribió 5 reseñas', '📝', 'reviews'),
  ('ten_reviews', 'Crítico Experto', 'Escribió 10 reseñas', '🏅', 'reviews'),
  ('twenty_five_reviews', 'Leyenda del Veredicto', 'Escribió 25 reseñas', '👑', 'reviews'),
  ('first_wishlist', 'Coleccionista', 'Añadió su primer juego a deseados', '❤️', 'wishlist'),
  ('ten_wishlist', 'Hoarder', 'Tiene 10 juegos en deseados', '📦', 'wishlist'),
  ('first_login', 'Bienvenido', 'Inició sesión por primera vez', '👋', 'general'),
  ('profile_complete', 'Perfil Completo', 'Editó su nombre de perfil', '👤', 'general'),
  ('five_games_played', 'Gamer Activo', 'Vio 5 juegos diferentes', '🎮', 'exploration')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- FEATURE: Price History
-- ============================================================

CREATE TABLE IF NOT EXISTS price_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  store TEXT NOT NULL,
  platform TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "price_history_select_public" ON price_history FOR SELECT USING (true);
CREATE POLICY "price_history_insert_system" ON price_history FOR INSERT WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_price_history_game ON price_history(game_id, recorded_at DESC);

-- ============================================================
-- FEATURE: User Management (ban/role)
-- ============================================================

-- Agregar campos a profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS banned_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS banned_reason TEXT;

-- RLS: Admin puede ver todos los profiles
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_select_admin" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "profiles_update_admin" ON profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- FEATURE: Analytics
-- ============================================================

CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  game_id INTEGER,
  user_id UUID,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "page_views_insert_anon" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "page_views_select_admin" ON page_views
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views(page, created_at DESC);
