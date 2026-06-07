-- 1. Tabla principal de juegos
CREATE TABLE games (
    id              INTEGER PRIMARY KEY,
    title           TEXT NOT NULL,
    image           TEXT,
    global_score    NUMERIC(3,1),
    platforms       TEXT[],
    description     TEXT,
    about           TEXT,
    developer       TEXT,
    publisher       TEXT,
    genre           TEXT,
    release_year    TEXT,
    multiplayer     TEXT,
    rating          TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de ediciones (Standard, Deluxe, etc.)
CREATE TABLE editions (
    id              SERIAL PRIMARY KEY,
    game_id         INTEGER REFERENCES games(id) ON DELETE CASCADE,
    edition_key     TEXT NOT NULL,
    name            TEXT NOT NULL,
    price           NUMERIC(10,2) NOT NULL,
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de paquetes/perks de cada edición
CREATE TABLE edition_perks (
    id              SERIAL PRIMARY KEY,
    edition_id      INTEGER REFERENCES editions(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,
    description     TEXT
);

-- 4. Tabla de precios por tienda (Automatizada vía n8n)
CREATE TABLE market_prices (
  id              SERIAL PRIMARY KEY,
  game_id         INTEGER REFERENCES games(id) ON DELETE CASCADE,
  store           TEXT NOT NULL,
  platform        TEXT NOT NULL,
  price           NUMERIC(10,2) NOT NULL,
  original_price  NUMERIC(10,2),
  discount_pct    INTEGER,
  store_url       TEXT,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabla de puntaje técnico detallado
CREATE TABLE score_breakdown (
  id          SERIAL PRIMARY KEY,
  game_id     INTEGER REFERENCES games(id) ON DELETE CASCADE UNIQUE,
  jugabilidad NUMERIC(3,1),
  graficos    NUMERIC(3,1),
  historia    NUMERIC(3,1)
);

-- 6. Tabla de matriz de idiomas
CREATE TABLE languages (
    id      SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    lang    TEXT NOT NULL,
    interface BOOLEAN DEFAULT FALSE,
    voices    BOOLEAN DEFAULT FALSE,
    subs      BOOLEAN DEFAULT FALSE
);

-- 7. Tabla de reseñas de usuarios
CREATE TABLE reviews (
    id        INTEGER PRIMARY KEY,
    game_id   INTEGER REFERENCES games(id) ON DELETE CASCADE,
    username  TEXT NOT NULL,
    text      TEXT,
    score     NUMERIC(3,1),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRIGGERS PARA ACTUALIZACIÓN AUTOMÁTICA DE UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_market_prices_updated
  BEFORE UPDATE ON market_prices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_editions_updated
  BEFORE UPDATE ON editions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Políticas RLS (Lectura Pública)
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE edition_perks ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE score_breakdown ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública" ON games FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON editions FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON edition_perks FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON market_prices FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON score_breakdown FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON languages FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON reviews FOR SELECT USING (true);
