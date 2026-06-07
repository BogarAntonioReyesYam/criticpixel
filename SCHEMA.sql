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

-- 4. Tabla de matriz de idiomas
CREATE TABLE game_languages (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    lang TEXT NOT NULL,
    interface BOOLEAN DEFAULT FALSE,
    voices BOOLEAN DEFAULT FALSE,
    subs BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabla de reseñas de usuarios
CREATE TABLE game_reviews (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    text TEXT,
    score DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
