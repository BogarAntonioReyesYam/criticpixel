-- ============================================================
-- FEATURE 1: User Reviews (modificar tabla existente)
-- ============================================================

-- Agregar user_id para vincular reseñas con usuarios autenticados
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Cambiar username a user_name para consistencia
ALTER TABLE reviews RENAME COLUMN username TO user_name;

-- Agregar restricción: score debe estar entre 1 y 10
ALTER TABLE reviews ADD CONSTRAINT reviews_score_check CHECK (score >= 1 AND score <= 10);

-- RLS: Los usuarios pueden leer todas las reseñas
DROP POLICY IF EXISTS "Lectura pública" ON reviews;
CREATE POLICY "reviews_select_public" ON reviews FOR SELECT USING (true);

-- RLS: Los usuarios autenticados pueden insertar reseñas
CREATE POLICY "reviews_insert_auth" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS: Los usuarios solo pueden actualizar sus propias reseñas
CREATE POLICY "reviews_update_own" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS: Los usuarios solo pueden eliminar sus propias reseñas
CREATE POLICY "reviews_delete_own" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- FEATURE 9: Notifications
-- ============================================================

CREATE TABLE IF NOT EXISTS notifications (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title       TEXT NOT NULL,
  message     TEXT NOT NULL,
  type        TEXT DEFAULT 'info' CHECK (type IN ('info', 'price_drop', 'new_game', 'review')),
  read        BOOLEAN DEFAULT FALSE,
  link        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS: Usuarios solo ven sus propias notificaciones
CREATE POLICY "notifications_select_own" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- RLS: Usuarios pueden marcar como leídas
CREATE POLICY "notifications_update_own" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS: Sistema puede insertar notificaciones (service role)
CREATE POLICY "notifications_insert_system" ON notifications
  FOR INSERT WITH CHECK (true);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================================
-- FEATURE 8: Admin - Tabla de métricas (stats)
-- ============================================================

CREATE TABLE IF NOT EXISTS site_stats (
  id          SERIAL PRIMARY KEY,
  stat_key    TEXT UNIQUE NOT NULL,
  stat_value  NUMERIC DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- Solo admin puede leer/escribir stats
CREATE POLICY "site_stats_admin" ON site_stats
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- Insertar stats iniciales
INSERT INTO site_stats (stat_key, stat_value) VALUES
  ('total_games', 0),
  ('total_reviews', 0),
  ('total_users', 0),
  ('total_wishlists', 0)
ON CONFLICT (stat_key) DO NOTHING;
