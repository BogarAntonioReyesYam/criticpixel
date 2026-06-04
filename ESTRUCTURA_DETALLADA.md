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
