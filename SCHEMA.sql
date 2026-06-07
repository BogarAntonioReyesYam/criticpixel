-- 1. Tabla principal de juegos
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    global_score DECIMAL,
    platforms TEXT[], -- Ejemplo: {'PC', 'PS5'}
    description TEXT,
    about TEXT,
    developer TEXT,
    publisher TEXT,
    genre TEXT,
    release_date TEXT,
    multiplayer TEXT,
    rating TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de ediciones (Standard, Deluxe, etc.)
CREATE TABLE editions (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price TEXT, -- En formato $1,899.00
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de paquetes/perks de cada edición
CREATE TABLE edition_perks (
    id SERIAL PRIMARY KEY,
    edition_id INTEGER REFERENCES editions(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabla de precios por tienda (Mercado)
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
CREATE TABLE game_languages (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    lang TEXT NOT NULL,
    interface BOOLEAN DEFAULT FALSE,
    voices BOOLEAN DEFAULT FALSE,
    subs BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Tabla de reseñas de usuarios
CREATE TABLE game_reviews (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    text TEXT,
    score DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas RLS (Lectura Pública)
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE edition_perks ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE score_breakdown ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública" ON games FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON editions FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON edition_perks FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON market_prices FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON score_breakdown FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON game_languages FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON game_reviews FOR SELECT USING (true);
