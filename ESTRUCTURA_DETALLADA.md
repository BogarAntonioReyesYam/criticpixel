# ESTRUCTURA DETALLADA: PIXELVERDICT (ESTÉTICA INSTANT-GAMING)

Este documento detalla la arquitectura técnica y el diseño visual de la plataforma PixelVerdict, diseñada bajo una filosofía de **densidad informativa y alto contraste**.

## 1. Identidad Visual (Instant-Gaming Style)
La aplicación utiliza una configuración de Tailwind CSS optimizada para el "Dark-Commerce":
- **Base (gamingBg)**: `#121212`. Un negro casi puro que permite que los elementos floten.
- **Contraste (gamingOrange)**: `#ff6b00`. Utilizado exclusivamente para llamadas a la acción (CTA) y datos críticos como el puntaje.
- **Densidad**: Se redujo el `padding` y se optimizó el `gap` para mostrar más información en menos espacio (estilo grid compacto).

---

## 2. Arquitectura de la Aplicación

### A. Capa de Datos (Data Layer)
- **Archivo**: `src/data/mockGames.js`
- **Estructura**: Array de objetos con tipado estricto (simulado).
- **Lógica**: Centraliza metadatos, desgloses técnicos (jugabilidad/gráficos) y un pool de reseñas.

### B. Capa de Navegación (Routing Layer)
- **Engine**: `react-router-dom` (v7).
- **Componente**: `App.jsx` actúa como el "Shell".
- **Dynamic Routing**: `/game/:id` permite la carga perezosa (lazy-loading) conceptual de datos específicos basándose en el parámetro de la URL.

### C. Capa de Presentación (UI Layer)
- **Home View**: Implementa un algoritmo de ordenamiento en memoria usando el Hook `useMemo`. Esto asegura que la re-organización de la cuadrícula sea instantánea (0ms de latencia percibida).
- **Game Details View**: Utiliza un diseño de 3 columnas en desktop para separar la multimedia de la analítica de puntajes y el feed social de reseñas.

---

## 3. Desglose de Componentes Críticos

### `Navbar.jsx`
- **Funcionalidad**: Sticky header con desenfoque de fondo (`backdrop-blur`).
- **Diseño**: Logo con inclinación (skew) y barra de búsqueda integrada con ancho máximo controlado para mantener el equilibrio visual.

### `GameCard.jsx`
- **Visuales**: Utiliza `aspect-[3/4]` para emular las carátulas físicas de juegos.
- **Interacción**: Filtro de brillo y escala en hover.
- **Optimización**: Truncado de texto en 2 líneas (`line-clamp-2`) para mantener la cuadrícula alineada.

---

## 4. Flujo de Trabajo y Escalabilidad
El proyecto está preparado para la siguiente fase (Fase Gamma):
1. **Context API / Zustand**: Para manejar el estado global de filtros.
2. **Framer Motion**: Para transiciones de página suaves estilo cinemático.
3. **API Integration**: Reemplazo de `mockGames.js` por llamadas `fetch/axios` a una base de datos real (ej: Supabase o RAWG API).

---
*Este documento fue generado bajo la directiva de diseño de alta densidad y contraste naranja.*


NUEVO hecho por mi

FASE 1 — Base de Datos en Supabase

Problema inicial: Los precios y datos de los juegos estaban hardcodeados en el archivo mockGames.js. Para cambiar cualquier precio había que editar el código manualmente y volver a desplegar.

1.1 Diseño de Tablas PostgreSQL
Se diseñaron 7 tablas adaptadas exactamente a la estructura del proyecto:

Tabla: games
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

Tabla: editions
CREATE TABLE editions (
  id              SERIAL PRIMARY KEY,
  game_id         INTEGER REFERENCES games(id) ON DELETE CASCADE,
  edition_key     TEXT NOT NULL,  -- 'std', 'dlx', 'ult'
  name            TEXT NOT NULL,
  price           NUMERIC(10,2) NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

Tabla: edition_perks
CREATE TABLE edition_perks (
  id              SERIAL PRIMARY KEY,
  edition_id      INTEGER REFERENCES editions(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT
);

Tabla: market_prices (la más importante)
CREATE TABLE market_prices (
  id              SERIAL PRIMARY KEY,
  game_id         INTEGER REFERENCES games(id) ON DELETE CASCADE,
  store           TEXT NOT NULL,    -- 'Steam', 'PlayStation Store', etc.
  platform        TEXT NOT NULL,    -- 'PC', 'PS5', 'Xbox Series X'
  price           NUMERIC(10,2) NOT NULL,
  original_price  NUMERIC(10,2),   -- precio sin descuento
  discount_pct    INTEGER,          -- % de descuento
  store_url       TEXT,             -- URL directa al juego en la tienda
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

Tabla: score_breakdown
CREATE TABLE score_breakdown (
  id          SERIAL PRIMARY KEY,
  game_id     INTEGER REFERENCES games(id) ON DELETE CASCADE UNIQUE,
  jugabilidad NUMERIC(3,1),
  graficos    NUMERIC(3,1),
  historia    NUMERIC(3,1)
);

Tabla: languages
CREATE TABLE languages (
  id      SERIAL PRIMARY KEY,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  lang    TEXT NOT NULL,
  interface BOOLEAN DEFAULT FALSE,
  voices    BOOLEAN DEFAULT FALSE,
  subs      BOOLEAN DEFAULT FALSE
);

Tabla: reviews
CREATE TABLE reviews (
  id        INTEGER PRIMARY KEY,
  game_id   INTEGER REFERENCES games(id) ON DELETE CASCADE,
  username  TEXT NOT NULL,
  text      TEXT,
  score     NUMERIC(3,1),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

1.2 Triggers de actualización automática
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

1.3 Inserción de datos — Ejemplo GTA VI
INSERT INTO games (id, title, image, global_score, platforms, description, about,
  developer, publisher, genre, release_year, multiplayer, rating) VALUES
(12, 'Grand Theft Auto VI',
  'https://images.unsplash.com/...',
  10, ARRAY['PS5','Xbox Series X'],
  'La culminación de una década de espera...',
  'Grand Theft Auto VI viaja al estado de Leonida...',
  'Rockstar North', 'Rockstar Games', 'Acción / Mundo Abierto',
  '2025/2026', 'Sí (GTA Online 2)', 'M (17+)');

-- Ediciones
INSERT INTO editions (game_id, edition_key, name, price) VALUES
(12,'std','Standard Edition',1899.00),
(12,'dlx','Deluxe Edition',2299.00),
(12,'ult','Ultimate Edition',2799.00);

-- Precios de mercado
INSERT INTO market_prices (game_id, store, platform, price, store_url) VALUES
(12,'PlayStation Store','PS5',1899.00,'https://store.playstation.com/...'),
(12,'Microsoft Store','Xbox Series X',1899.00,'https://www.xbox.com/...');

1.4 Configuración de RLS (Row Level Security)
Se habilitó seguridad a nivel de fila y se crearon políticas de lectura pública para que la app pueda leer los datos:
-- Habilitar RLS en todas las tablas
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE edition_perks ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE score_breakdown ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública
CREATE POLICY "Lectura pública" ON games FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON editions FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON edition_perks FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON market_prices FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON score_breakdown FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON languages FOR SELECT USING (true);
CREATE POLICY "Lectura pública" ON reviews FOR SELECT USING (true);
 
FASE 2 — Conexión de React a Supabase

2.1 Instalación del cliente
npm install @supabase/supabase-js

2.2 Archivo .env
Creado en la raíz del proyecto junto al package.json:
VITE_SUPABASE_URL=https://pddczazavyhpdikgemav.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

2.3 Cliente de Supabase (src/lib/supabase.js)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

2.4 Consultas en GameDetails.jsx
El componente GameDetails fue refactorizado para hacer 6 consultas a Supabase:
// 1. Datos base del juego
const { data: gameData } = await supabase
  .from('games')
  .select('*')
  .eq('id', id)
  .single();

// 2. Puntaje técnico
const { data: scoreData } = await supabase
  .from('score_breakdown')
  .select('jugabilidad, graficos, historia')
  .eq('game_id', id)
  .single();

// 3. Precios de mercado (con URLs)
const { data: marketData } = await supabase
  .from('market_prices')
  .select('*')
  .eq('game_id', id);

// 4. Ediciones y perks
const { data: editionsData } = await supabase
  .from('editions')
  .select('*, edition_perks(*)')
  .eq('game_id', id);

// 5. Idiomas
const { data: langsData } = await supabase
  .from('game_languages')
  .select('*')
  .eq('game_id', id);

// 6. Reseñas
const { data: reviewsData } = await supabase
  .from('game_reviews')
  .select('*')
  .eq('game_id', id);

2.5 Renderizado de links a tiendas
El componente de valor de mercado usa los store_url para redirigir al hacer clic:
<a
  href={market.url || '#'}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-gamingCard border border-white/5 p-4 rounded-xl
    flex justify-between items-center hover:bg-white/5
    hover:border-gamingOrange/50 transition-all group shadow-lg"
>
  <div className="flex items-center gap-4">
    <ExternalLink className="w-5 h-5 text-gamingOrange" />
    <div>
      <div>{market.availability}</div>  {/* PS5, PC, etc */}
      <div>{market.store}</div>          {/* Steam, PlayStation Store */}
    </div>
  </div>
  <div>{market.price}</div>              {/* $1,299.00 MXN */}
</a>

2.6 Variables de entorno en Vercel
Se configuraron las variables en Vercel para que la versión en producción funcione:
•	Ir a vercel.com → proyecto criticpixel → Settings → Environment Variables
•	Agregar VITE_SUPABASE_URL con el valor de la URL del proyecto
•	Agregar VITE_SUPABASE_ANON_KEY con la anon key de Supabase
•	Marcar los checkboxes: Production, Preview y Development
•	Hacer Redeploy para que los cambios surtan efecto
 
FASE 3 — Links Directos a las Tiendas

3.1 SQL de actualización de URLs
Se ejecutó un UPDATE en Supabase con los links directos de cada juego en cada tienda:
-- GTA VI
UPDATE market_prices SET store_url = 'https://store.playstation.com/en-us/concept/10000730'
WHERE game_id = 12 AND store = 'PlayStation Store';

UPDATE market_prices SET store_url = 'https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9nl3wwnzlzzn'
WHERE game_id = 12 AND store = 'Microsoft Store';

-- Baldur's Gate 3
UPDATE market_prices SET store_url = 'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/'
WHERE game_id = 5 AND store = 'Steam';

-- Black Myth: Wukong
UPDATE market_prices SET store_url = 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/'
WHERE game_id = 21 AND store = 'Steam';

-- Elden Ring: Shadow of the Erdtree
UPDATE market_prices SET store_url = 'https://store.steampowered.com/app/2778580/ELDEN_RING_Shadow_of_the_Erdtree/'
WHERE game_id = 1 AND store = 'Steam';

-- Silent Hill 2 Remake
UPDATE market_prices SET store_url = 'https://store.steampowered.com/app/2124490/SILENT_HILL_2/'
WHERE game_id = 23 AND store = 'Steam';

-- Hades II
UPDATE market_prices SET store_url = 'https://store.steampowered.com/app/1145350/Hades_II/'
WHERE game_id = 11 AND store = 'Steam';

-- Monster Hunter Wilds
UPDATE market_prices SET store_url = 'https://store.steampowered.com/app/2246340/Monster_Hunter_Wilds/'
WHERE game_id = 27 AND store = 'Steam';

-- DOOM: The Dark Ages
UPDATE market_prices SET store_url = 'https://store.steampowered.com/app/2413590/DOOM_The_Dark_Ages/'
WHERE game_id = 29 AND store = 'Steam';

-- Resident Evil 4 Remake
UPDATE market_prices SET store_url = 'https://store.steampowered.com/app/2050650/Resident_Evil_4/'
WHERE game_id = 9 AND store = 'Steam';

-- Cyberpunk 2077
UPDATE market_prices SET store_url = 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/'
WHERE game_id = 8 AND store = 'Steam';

-- Alan Wake 2
UPDATE market_prices SET store_url = 'https://store.epicgames.com/en-US/p/alan-wake-2'
WHERE game_id = 6 AND store = 'Epic Games';

-- Zelda: Tears of the Kingdom
UPDATE market_prices SET store_url = 'https://www.nintendo.com/us/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/'
WHERE game_id = 3 AND store = 'Nintendo eShop';
 
FASE 4 — Automatización con n8n en Railway

4.1 Instalación de n8n en Railway
•	Ir a railway.app e iniciar sesión con GitHub
•	Nuevo Proyecto → Plantilla → buscar 'n8n'
•	Seleccionar la plantilla con 9099 descargas (la más popular)
•	La plantilla incluye n8n + PostgreSQL automáticamente
•	Esperar 2-3 minutos al despliegue
•	Acceder vía: https://n8n-production-e7bba.up.railway.app/setup

4.2 Workflow completo (JSON para importar)
El workflow tiene 5 nodos conectados en secuencia:
{
  "name": "PixelVerdict - Actualizar Precios Steam",
  "nodes": [
    {
      "name": "Cada 24 horas",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": {
        "rule": { "interval": [{ "field": "hours", "hoursInterval": 24 }] }
      }
    },
    {
      "name": "Lista de Juegos Steam",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "const steamGames = [\n
          { game_id: 5,  appid: 1086940, store: 'Steam', platform: 'PC' },
          { game_id: 21, appid: 2358720, store: 'Steam', platform: 'PC' },
          { game_id: 1,  appid: 2778580, store: 'Steam', platform: 'PC' },
          { game_id: 23, appid: 2124490, store: 'Steam', platform: 'PC' },
          { game_id: 11, appid: 1145350, store: 'Steam', platform: 'PC' },
          { game_id: 15, appid: 2668510, store: 'Steam', platform: 'PC' },
          { game_id: 27, appid: 2246340, store: 'Steam', platform: 'PC' },
          { game_id: 29, appid: 2413590, store: 'Steam', platform: 'PC' },
          { game_id: 33, appid: 2235701, store: 'Steam', platform: 'PC' },
          { game_id: 9,  appid: 2050650, store: 'Steam', platform: 'PC' },
          { game_id: 8,  appid: 1091500, store: 'Steam', platform: 'PC' },
          { game_id: 6,  appid: 1903340, store: 'Epic Games', platform: 'PC' }
        ];"
      }
    },
    {
      "name": "Consultar API de Steam",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://store.steampowered.com/api/appdetails
          ?appids={{ $json.appid }}&cc=mx&l=spanish"
      }
    },
    {
      "name": "Extraer Precio",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "
          const priceOverview = gameData.data.price_overview;
          const price = priceOverview.final / 100;  // centavos a pesos
          const originalPrice = priceOverview.initial / 100;
          const discountPct = priceOverview.discount_percent;
          return [{ json: { price, original_price, discount_pct } }];"
      }
    },
    {
      "name": "Update rows in a table (Postgres)",
      "type": "n8n-nodes-base.postgres",
      "parameters": {
        "operation": "update",
        "schema": "public",
        "table": "market_prices",
        "columnsToMatch": ["game_id", "store", "platform"],
        "valuesToUpdate": {
          "price": "{{ $json.price }}",
          "original_price": "{{ $json.original_price }}",
          "discount_pct": "{{ $json.discount_pct }}",
          "updated_at": "{{ new Date().toISOString() }}"
        }
      }
    }
  ]
}

4.3 Configuración de credenciales Postgres en n8n
Se usó el Session Pooler de Supabase para evitar problemas de IPv6:
Host:     aws-0-us-east-2.pooler.supabase.com
Database: postgres
User:     postgres.pddczazavyhpdikgemav  (formato especial para Session Pooler)
Password: [tu password de Supabase]
Port:     5432
SSL:      Disable  (el pooler maneja la seguridad internamente)

IMPORTANTE: El usuario debe tener el formato 'postgres.PROJECT_ID' — sin este formato el Session Pooler rechaza la conexión con el error 'no tenant identifier provided'.

4.4 Flujo de datos del workflow
Cada 24 horas (Schedule Trigger)
        |
        v
Lista de Juegos Steam (Code Node)
  -- Genera 12 objetos con game_id y Steam appid
        |
        v  (12 items en paralelo)
Consultar API de Steam (HTTP Request)
  -- GET https://store.steampowered.com/api/appdetails
  --   ?appids={appid}&cc=mx&l=spanish
  -- Retorna precio en centavos MXN, descuento, precio original
        |
        v
Extraer Precio (Code Node)
  -- Convierte centavos a pesos (final / 100)
  -- Detecta si hay oferta (discount_percent > 0)
  -- Retorna { price, original_price, discount_pct }
        |
        v
¿Precio válido? (If Node)
  -- Filtra juegos sin datos en Steam
  -- true: continúa al update
  -- false: se ignora
        |
        v (solo items válidos)
Update rows in a table (Postgres Node)
  -- UPDATE market_prices
  -- SET price, original_price, discount_pct, updated_at
  -- WHERE game_id = X AND store = Y AND platform = Z
 
RESUMEN FINAL — Estado del Proyecto


Componente	Antes	Después
Datos de juegos	mockGames.js (código)	PostgreSQL en Supabase
Precios	Estáticos / hardcodeados	Actualizados automáticamente
Links a tiendas	No existían	Redirigen a cada tienda
Actualizaciones	Manuales (editar código)	Automáticas cada 24hrs
Hosting de BD	Local (solo tu PC)	Nube (Supabase)
Automatización	Ninguna	n8n en Railway
Despliegue	Vercel (frontend)	Vercel + Supabase + n8n

URLs del proyecto

App en vivo=	https://criticpixel.vercel.app

Supabase	=https://supabase.com/dashboard/project/pddczazavyhpdikgemav

n8n=	https://n8n-production-e7bba.up.railway.app

Próximos pasos sugeridos
•	Agregar precios automáticos para PlayStation Store y Xbox (requiere scraping)
•	Panel de administración para actualizar precios manualmente desde el navegador
•	Notificaciones por email cuando haya una oferta en algún juego
•	Sistema de login para usuarios reales con wishlist guardada en BD
•	Galería de imágenes/screenshots para cada juego
•	Filtros de búsqueda funcionales en el Navbar

