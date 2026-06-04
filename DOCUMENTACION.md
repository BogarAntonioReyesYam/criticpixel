# Documentación Técnica: PixelVerdict (Alpha/Beta)

PixelVerdict es una Single Page Application (SPA) de reseñas de videojuegos con una estética oscura y moderna, inspirada en plataformas como Instant-Gaming. Esta documentación detalla la estructura, lógica y tecnologías utilizadas.

## 1. Stack Tecnológico
- **Vite + React**: Entorno de desarrollo y librería base para la interfaz.
- **Tailwind CSS**: Framework de utilidades CSS para el diseño visual y responsive.
- **React Router (v7)**: Gestión de rutas y navegación entre páginas.
- **Lucide React**: Set de iconos vectoriales consistentes.

---

## 2. Estructura de Archivos
```text
src/
├── components/          # Componentes reutilizables (UI)
│   ├── Navbar.jsx       # Barra de navegación superior con buscador (visual)
│   └── GameCard.jsx     # Tarjeta individual de juego para la cuadrícula
├── views/               # Vistas principales (Páginas)
│   ├── Home.jsx         # Página principal con filtros y lista de juegos
│   └── GameDetails.jsx  # Vista detallada de un juego específico
├── data/                # Almacenamiento de datos
│   └── mockGames.js     # Base de datos simulada en formato JSON/Array
├── App.jsx              # Enrutador principal y estructura base
├── main.jsx             # Punto de entrada de la aplicación
└── index.css            # Configuraciones globales de Tailwind
```

---

## 3. Lógica de Componentes Clave

### A. Gestión de Datos (`src/data/mockGames.js`)
Los datos están centralizados en un array de objetos. Cada objeto contiene:
- `id`: Identificador único.
- `title`: Nombre real del juego.
- `globalScore`: Puntaje promedio (0.0 - 10.0).
- `breakdown`: Desglose por categorías (Jugabilidad, Gráficos, Historia).
- `reviews`: Array de comentarios de usuarios simulados.

### B. Sistema de Ordenamiento (`src/views/Home.jsx`)
La página principal utiliza `useState` y `useMemo` para gestionar el orden de los juegos sin recargar la página:
- **Estado `sortOrder`**: Almacena el criterio seleccionado (ej: `score-desc`).
- **useMemo**: Filtra y ordena el array de juegos cada vez que `sortOrder` cambia, optimizando el rendimiento.
- **Criterios**:
  - `score-desc` / `score-asc`: Orden numérico basado en `globalScore`.
  - `alpha-asc` / `alpha-desc`: Orden alfabético basado en `title` usando `localeCompare`.

### C. Navegación Dinámica (`src/App.jsx`)
Se utiliza `BrowserRouter` para envolver la app. Las rutas definidas son:
- `/`: Carga el componente `Home`.
- `/game/:id`: Carga `GameDetails` extrayendo el ID de la URL mediante el hook `useParams`.

---

## 4. Diseño y Estilos (Tailwind Config)
En `tailwind.config.js` se extendió el tema con una paleta personalizada:
- `gamingBg` (#121214): Fondo principal profundo.
- `gamingCard` (#1e1e24): Fondo para tarjetas y menús, creando contraste.
- `gamingOrange` (#ff5400): Color de acento para botones, puntajes e iconos.
- `gamingText` (#eeeeee): Blanco suave para lectura prolongada.

### Efectos Visuales:
- **Hover Scale**: Las tarjetas utilizan `transition-all duration-300 hover:scale-105` para dar feedback visual de interactividad.
- **Responsive Grid**: La cuadrícula se adapta automáticamente:
  - Móvil: 1 columna.
  - Tablet: 2-3 columnas.
  - Desktop: 4 columnas.

---

## 5. Instrucciones de Ejecución
1. Instalar dependencias: `npm install`
2. Iniciar servidor de desarrollo: `npm run dev`
3. Construir para producción: `npm run build`

---
*Nota: Esta versión es una fase Alpha/Beta. No incluye backend real ni persistencia en base de datos; todos los cambios de estado (como el ordenamiento) ocurren únicamente en la memoria del navegador.*
