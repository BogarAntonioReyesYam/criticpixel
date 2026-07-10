# Software Requirements Specification (SRS)
## PixelVerdict - Plataforma de Reseñas de Videojuegos

**Versión:** 1.0  
**Fecha:** Julio 2026  
**Proyecto:** criticpixel  
**Desarrollador:** Bogar Antonio Reyes Yam  

---

## 1. Introducción

### 1.1 Propósito
PixelVerdict es una aplicación web SPA (Single Page Application) diseñada para entusiastas de videojuegos que buscan reseñas honestas, comparar precios y descubrir nuevos títulos.

### 1.2 Alcance
Plataforma completa de reseñas gaming con catálogo de 35+ juegos, sistema de wishlist, rankings, calendario de lanzamientos yBlog de noticias.

### 1.3 Definiciones
- **Score Global**: Puntuación promedio de 0-10 basada en jugabilidad, gráficos e historia
- **Edición**: Versiones de un juego (Estándar, Deluxe, Ultimate)
- **Perk**: Beneficio incluido en cada edición
- **Market Price**: Precio en diferentes tiendas digitales

---

## 2. Descripción General

### 2.1 Perspectiva del Producto
PixelVerdict es una plataforma web tipo "metacritic" pero con enfoque en la comunidad hispanohablante, ofreciendo:
- Reseñas detalladas por juego
- Comparación de precios en múltiples tiendas
- Sistema de wishlist personal
- Contenido editorial (blog, trailers, guías)

### 2.2 Funciones del Producto
| ID | Función | Prioridad |
|----|---------|-----------|
| F-01 | Catálogo de juegos con búsqueda y filtros | Alta |
| F-02 | Detalle de juego con scores desglosados | Alta |
| F-03 | Sistema de wishlist | Alta |
| F-04 | Comparador de precios | Media |
| F-05 | Calendario de lanzamientos | Media |
| F-06 | Galería de trailers | Media |
| F-07 | Blog de noticias | Baja |
| F-08 | Rankings dinámicos | Baja |
| F-09 | Estadísticas de usuario | Baja |

### 2.3 Características de los Usuarios
- **Gamer Casual**: Busca recomendaciones rápidas
- **Gamer Hardcore**: Detalles técnicos y comparaciones
- **Coleccionista**: Wishlist y tracking de precios
- **Content Creator**: Reseñas y guides

---

## 3. Requisitos Funcionales

### 3.1 Módulo: Catálogo de Juegos

#### 3.1.1 RF-001: Listar Juegos
- **Descripción**: Mostrar todos los juegos del catálogo en formato grid o lista
- **Entrada**: Ninguna
- **Proceso**: Cargar datos de Supabase/mockGames, aplicar paginación
- **Salida**: Lista de juegos con imagen, título, score, precio, plataformas
- **Criterio de aceptación**: Se muestran 35 juegos con scroll infinito (8 por carga)

#### 3.1.2 RF-002: Buscar Juegos
- **Descripción**: Búsqueda en tiempo real por título, descripción, género, desarrollador
- **Entrada**: Texto de búsqueda (mínimo 2 caracteres)
- **Proceso**: Filtrado con debounce de 300ms
- **Salida**: Lista filtrada de juegos
- **Criterio de aceptación**: Resultados se actualizan mientras el usuario escribe

#### 3.1.3 RF-003: Filtrar por Plataforma
- **Descripción**: Filtrar juegos por plataforma (PC, PS5, Xbox, Nintendo)
- **Entrada**: Selección de plataforma
- **Proceso**: Filtrado por array de plataformas del juego
- **Salida**: Solo juegos disponibles en la plataforma seleccionada
- **Criterio de aceptación**: Filtro funciona combinado con búsqueda

#### 3.1.4 RF-004: Ordenar Juegos
- **Descripción**: Ordenar por score (asc/desc) o nombre (A-Z/Z-A)
- **Entrada**: Opción de ordenamiento
- **Proceso**: Reordenar array de juegos
- **Salida**: Lista reordenada
- **Criterio de aceptación**: Orden se mantiene al cambiar filtros

#### 3.1.5 RF-005: Cambiar Vista
- **Descripción**: Alternar entre vista Grid (tarjetas) y Lista (compacta)
- **Entrada**: Click en botón de vista
- **Proceso**: Cambiar componente renderizado
- **Salida**: Vista actualizada
- **Criterio de aceptación**: Preferencia se guarda en estado

### 3.2 Módulo: Detalle de Juego

#### 3.2.1 RF-006: Ver Detalle
- **Descripción**: Página completa con información detallada del juego
- **Entrada**: ID del juego (URL)
- **Proceso**: Fetch de datos por ID
- **Salida**: Hero section, score circular, descripción, ediciones, specs
- **Criterio de aceptación**: Todos los campos visibles sin scroll horizontal

#### 3.2.2 RF-007: Score Desglosado
- **Descripción**: Score circular animado con breakdown (jugabilidad, gráficos, historia)
- **Entrada**: Datos de score_breakdown
- **Proceso**: Calcular promedio, animar SVG circular
- **Salida**: Score visual con cada categoría
- **Criterio de aceptación**: Animación dura 1.5 segundos

#### 3.2.3 RF-008: Comparar Ediciones
- **Descripción**: Tabla comparativa de ediciones del juego
- **Entrada**: Array de ediciones con perks
- **Proceso**: Renderizar tarjetas comparativas
- **Salida**: Ediciones lado a lado con beneficios
- **Criterio de aceptación**: Mínimo 2 ediciones visibles

#### 3.2.4 RF-009: Ver Trailers
- **Descripción**: Reproductor de YouTube embebido
- **Entrada**: URL de trailer
- **Proceso**: Renderizar iframe de YouTube
- **Salida**: Video reproduciéndose
- **Criterio de aceptación**: Autoplay deshabilitado, responsive

#### 3.2.5 RF-010: Juegos Similares
- **Descripción**: Sección de juegos recomendados por género
- **Entrada**: Género del juego actual
- **Proceso**: Filtrar juegos del mismo género
- **Salida**: Carrusel de 4-6 juegos similares
- **Criterio de aceptación**: No incluir el juego actual

#### 3.2.6 RF-011: Reseñas de Usuarios
- **Descripción**: Lista de reseñas con puntuación
- **Entrada**: Array de reviews
- **Proceso**: Renderizar tarjetas de review
- **Salida**: 3 reseñas por defecto, botón "Ver más"
- **Criterio de aceptación**: Expandir muestra todas las reseñas

### 3.3 Módulo: Sistema de Wishlist

#### 3.3.1 RF-012: Agregar a Wishlist
- **Descripción**: Botón para agregar/quitar juego de favoritos
- **Entrada**: Click en botón de corazón
- **Proceso**: Guardar ID en localStorage
- **Salida**: Icono cambia de estado, toast notification
- **Criterio de aceptación**: Persiste entre sesiones

#### 3.3.2 RF-013: Ver Wishlist
- **Descripción**: Página con todos los juegos guardados
- **Entrada**: Navegación a /wishlist
- **Proceso**: Leer localStorage, renderizar juegos
- **Salida**: Lista de juegos guardados
- **Criterio de aceptación**: Botón para eliminar cada juego

#### 3.3.4 RF-014: Badge de Wishlist
- **Descripción**: Indicador numérico en navbar
- **Entrada**: Cambios en wishlist
- **Proceso**: Contar elementos en localStorage
- **Salida**: Badge con número
- **Criterio de aceptación**: Se actualiza en tiempo real

### 3.4 Módulo: Comparador de Precios

#### 3.4.1 RF-015: Ver Precios
- **Descripción**: Lista de precios por tienda digital
- **Entrada**: Array de marketPrices
- **Proceso**: Renderizar tiendas con precios
- **Salida**: PS Store, Steam, Xbox, Epic, Nintendo
- **Criterio de aceptación**: Precios en MXN

#### 3.4.2 RF-016: Alerta de Precio
- **Descripción**: Componente para configurar alerta
- **Entrada**: Precio objetivo
- **Proceso**: Guardar en localStorage (simulado)
- **Salida**: Confirmación de alerta
- **Criterio de aceptación**: Máximo 5 alertas activas

### 3.5 Módulo: Calendario de Lanzamientos

#### 3.5.1 RF-017: Ver Calendario
- **Descripción**: Vista de calendario con lanzamientos
- **Entrada**: Fechas de releaseDate
- **Proceso**: Agrupar por mes
- **Salida**: Calendario visual con juegos
- **Criterio de aceptación**: Mes actual visible por defecto

### 3.6 Módulo: Blog

#### 3.6.1 RF-018: Listar Artículos
- **Descripción**: Lista de artículos del blog
- **Entrada**: Datos mock de artículos
- **Proceso**: Renderizar cards
- **Salida**: Título, excerpt, fecha, imagen
- **Criterio de aceptación**: Mínimo 6 artículos

### 3.7 Módulo: Rankings

#### 3.7.1 RF-019: Ver Rankings
- **Descripción**: Top 10 juegos por score
- **Entrada**: Ordenar por globalScore
- **Proceso**: Tomar top 10
- **Salida**: Lista numerada con medallas
- **Criterio de_acceptación**: Top 3 con medallas dorada/plata/bronce

---

## 4. Requisitos No Funcionales

### 4.1 Rendimiento
| ID | Requisito | Meta |
|----|-----------|------|
| RNF-01 | First Contentful Paint | < 1.5s |
| RNF-02 | Largest Contentful Paint | < 2.5s |
| RNF-03 | Time to Interactive | < 3.0s |
| RNF-04 | Tamaño bundle principal | < 300KB gzipped |
| RNF-05 | Imágenes lazy load | Todas |

### 4.2 Compatibilidad
| ID | Requisito |
|----|-----------|
| RNF-06 | Chrome, Firefox, Safari, Edge (últimas 2 versiones) |
| RNF-07 | Responsive: 320px - 4K |
| RNF-08 | Touch events en móviles |

### 4.3 Seguridad
| ID | Requisito |
|----|-----------|
| RNF-09 | HTTPS en producción |
| RNF-10 | No exponer keys de Supabase en frontend |
| RNF-11 | Sanitizar inputs de usuario |

### 4.4 Accesibilidad
| ID | Requisito |
|----|-----------|
| RNF-02 | WCAG 2.1 nivel AA |
| RNF-13 | Navegación por teclado |
| RNF-14 | Labels en todos los inputs |
| RNF-15 | Contraste mínimo 4.5:1 |

### 4.5 Mantenibilidad
| ID | Requisito |
|----|-----------|
| RNF-16 | Componentes modulares reutilizables |
| RNF-17 | Código con TypeScript (parcial) |
| RNF-18 | Documentación en README |

---

## 5. Requisitos de Interfaz

### 5.1 Interfaz de Usuario

#### 5.1.1 Layout General
```
┌─────────────────────────────────────┐
│  NAVBAR (logo, links, search, icon) │
├─────────────────────────────────────┤
│                                     │
│           CONTENT AREA              │
│                                     │
├─────────────────────────────────────┤
│  FOOTER (links, redes, copyright)  │
└─────────────────────────────────────┘
```

#### 5.1.2 Colores (Dark Mode)
| Elemento | Color |
|----------|-------|
| Background | #0f0f1a |
| Surface | #1a1a2e |
| Primary | #6c5ce7 |
| Accent | #00d2d3 |
| Text | #ffffff |
| Muted | #a0a0b0 |

#### 5.1.3 Tipografía
- **Títulos**: Inter, Bold
- **Body**: Inter, Regular
- **Código**: Fira Code

### 5.2 Interfaz de Hardware
- No aplica (aplicación web)

### 5.3 Interfaz de Software
| Sistema | Tipo |
|---------|------|
| Supabase | PostgreSQL database |
| Vercel | Hosting y deploy |
| YouTube API | Embed de trailers |
| Lucide | Iconos |

---

## 6. Requisitos de Datos

### 6.1 Estructura de Datos - Games
```javascript
{
  id: Number,
  title: String,
  image: String (URL),
  globalScore: Number (0-10),
  platforms: Array<String>,
  price: Number,
  releaseDate: String (YYYY-MM-DD),
  genre: String,
  editions: Array<{
    id: String,
    name: String,
    price: String,
    perks: Array<{title, description}>
  }>,
  marketPrices: Array<{
    store: String,
    price: String,
    availability: String
  }>,
  breakdown: {
    jugabilidad: Number,
    gráficos: Number,
    historia: Number
  },
  description: String,
  about: String,
  specs: {
    desarrollador: String,
    editor: String,
    genero: String,
    lanzamiento: String,
    multijugador: String,
    clasificación: String
  },
  languages: Array<{
    lang: String,
    interface: Boolean,
    voices: Boolean,
    subs: Boolean
  }>,
  reviews: Array<{
    id: Number,
    user: String,
    text: String,
    score: Number
  }>
}
```

### 6.2 Supabase Tables
| Tabla | Descripción |
|-------|-------------|
| games | Información principal de juegos |
| editions | Ediciones disponibles |
| edition_perks | Beneficios por edición |
| market_prices | Precios por tienda |
| score_breakdown | Desglose de scores |
| languages | Idiomas soportados |
| reviews | Reseñas de usuarios |

### 6.3 Almacenamiento Local
| Key | Tipo | Descripción |
|-----|------|-------------|
| pixelVerdict_wishlist | Array<Number> | IDs de juegos guardados |
| pixelVerdict_theme | String | 'dark' o 'light' |

---

## 7. Requisitos de Seguridad

### 7.1 Autenticación
- No implementada (versión actual)
- Futuro: OAuth con Google/GitHub

### 7.2 Autorización
- No implementada (versión actual)
- Futuro: Roles de usuario (admin, usuario)

### 7.3 Datos Sensibles
- Keys de Supabase: Solo URL pública (anon key)
- No se almacenan passwords en frontend
- localStorage solo para preferencias no sensibles

---

## 8. Requisitos de Despliegue

### 8.1 Entorno de Producción
| Componente | Servicio |
|------------|----------|
| Hosting | Vercel |
| Dominio | criticpixel.vercel.app |
| SSL | Automático (Vercel) |
| CDN | Vercel Edge Network |

### 8.2 Entorno de Desarrollo
| Herramienta | Versión |
|-------------|---------|
| Node.js | 18+ |
| npm | 9+ |
| Vite | 8.x |
| React | 19.x |

### 8.3 CI/CD
```
GitHub (main) → Vercel Build → Deploy automático
```

### 8.4 Comandos
```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview
```

---

## 9. Anexos

### 9.1 Dependencias Principales
| Paquete | Versión | Uso |
|---------|---------|-----|
| react | 19.x | UI framework |
| vite | 8.x | Build tool |
| tailwindcss | 3.x | Styling |
| react-router-dom | 7.x | Routing |
| framer-motion | 11.x | Animations |
| @supabase/supabase-js | 2.x | Backend |
| lucide-react | latest | Iconos |

### 9.2 Estructura de Directorios
```
criticpixel/
├── src/
│   ├── components/    # Componentes reutilizables
│   ├── views/         # Páginas/rutas
│   ├── data/          # Mock data
│   ├── hooks/         # Custom hooks
│   ├── context/       # React context
│   ├── lib/           # Utilidades (supabase)
│   └── index.css      # Estilos globales
├── public/            # Assets estáticos
└── dist/              # Build de producción
```

---

**Documento generado:** Julio 2026  
**Última actualización:** Julio 2026  
**Estado:** Versión 1.0 completa