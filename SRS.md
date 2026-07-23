# Software Requirements Specification (SRS)
## CriticPixel - Plataforma de Reseñas de Videojuegos

**Versión:** 2.0  
**Fecha:** Julio 2026  
**Proyecto:** criticpixel  
**Desarrollador:** Bogar Antonio Reyes Yam  
**Repositorio:** https://github.com/BogarAntonioReyesYam/criticpixel  

---

## 1. Introducción

### 1.1 Propósito
CriticPixel es una aplicación web SPA (Single Page Application) diseñada para entusiastas de videojuegos que buscan reseñas honestas, comparar precios, descubrir nuevos títulos y participar en una comunidad gaming activa.

### 1.2 Alcance
Plataforma completa de reseñas gaming con catálogo de 35+ juegos, sistema de wishlist, rankings, calendario de lanzamientos, blog de noticias, sistema de comunidad (foro, grupos, artículos, guías, screenshots, reputación, leaderboard) y alertas de precio con notificaciones por email.

### 1.3 Definiciones
- **Score Global**: Puntuación promedio de 0-10 basada en jugabilidad, gráficos e historia
- **Edición**: Versiones de un juego (Estándar, Deluxe, Ultimate)
- **Perk**: Beneficio incluido en cada edición
- **Market Price**: Precio en diferentes tiendas digitales
- **Reputación**: Sistema de puntos que otorga rangos a usuarios por participación
- **Alerta de Precio**: Notificación cuando un juego baja de un precio objetivo
- **Foro**: Sistema de discusiones por hilos dentro de grupos
- **Grupo**: Comunidad temática con miembros, publicaciones y discusiones

### 1.4 Historial de Versiones
| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | Julio 2026 | Versión inicial: catálogo, wishlist, precios, calendario |
| 2.0 | Julio 2026 | Comunidad, autenticación, alertas de precio, rebrand CriticPixel |

---

## 2. Descripción General

### 2.1 Perspectiva del Producto
CriticPixel es una plataforma web tipo "metacritic" pero con enfoque en la comunidad hispanohablante, ofreciendo:
- Reseñas detalladas por juego
- Comparación de precios en múltiples tiendas
- Sistema de wishlist personal por usuario
- Contenido editorial (blog, trailers, guías)
- Comunidad gaming activa (foro, grupos, artículos, screenshots)
- Sistema de reputación y ranking de usuarios
- Alertas de precio con notificación in-app y email

### 2.2 Funciones del Producto
| ID | Función | Prioridad | Estado |
|----|---------|-----------|--------|
| F-01 | Catálogo de juegos con búsqueda y filtros | Alta | Implementado |
| F-02 | Detalle de juego con scores desglosados | Alta | Implementado |
| F-03 | Sistema de wishlist por usuario | Alta | Implementado |
| F-04 | Comparador de precios | Alta | Implementado |
| F-05 | Calendario de lanzamientos | Media | Implementado |
| F-06 | Galería de trailers | Media | Implementado |
| F-07 | Blog de noticias | Media | Implementado |
| F-08 | Rankings dinámicos | Media | Implementado |
| F-09 | Estadísticas de usuario | Media | Implementado |
| F-10 | Autenticación (Google OAuth + email/password) | Alta | Implementado |
| F-11 | Panel de administración | Alta | Implementado |
| F-12 | Sistema de comunidad (foro, grupos, artículos, guías, screenshots) | Alta | Implementado |
| F-13 | Sistema de reputación y ranking de usuarios | Media | Implementado |
| F-14 | Alertas de precio (in-app + email) | Alta | Implementado |
| F-15 | Tema claro/oscuro | Media | Implementado |
| F-16 | Gestión de juegos (CRUD admin) | Alta | Implementado |
| F-17 | Gestión de usuarios (admin) | Alta | Implementado |
| F-18 | Analytics de uso | Media | Implementado |
| F-19 | Notificaciones en tiempo real | Media | Implementado |
| F-20 | Logros y badges | Baja | Implementado |

### 2.3 Características de los Usuarios
- **Gamer Casual**: Busca recomendaciones rápidas
- **Gamer Hardcore**: Detalles técnicos y comparaciones
- **Coleccionista**: Wishlist y tracking de precios
- **Content Creator**: Reseñas, guides y screenshots
- **Moderador**: Gestión de comunidad y contenido
- **Administrador**: Control total de la plataforma

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
- **Descripción**: Sección de juegos recomendados por plataforma
- **Entrada**: Plataformas del juego actual
- **Proceso**: Filtrar juegos con plataformas en común
- **Salida**: Carrusel de 4 juegos similares
- **Criterio de aceptación**: No incluir el juego actual

#### 3.2.6 RF-011: Reseñas de Usuarios
- **Descripción**: Lista de reseñas con puntuación y votos
- **Entrada**: Array de reviews
- **Proceso**: Renderizar tarjetas de review con likes/dislikes
- **Salida**: 3 reseñas por defecto, botón "Ver más"
- **Criterio de aceptación**: Expandir muestra todas las reseñas

### 3.3 Módulo: Sistema de Wishlist

#### 3.3.1 RF-012: Agregar a Wishlist
- **Descripción**: Botón para agregar/quitar juego de favoritos (guardado en Supabase)
- **Entrada**: Click en botón de corazón
- **Proceso**: Guardar en tabla `wishlists` de Supabase por usuario
- **Salida**: Icono cambia de estado, toast notification
- **Criterio de aceptación**: Persiste entre sesiones, sincronizado por usuario

#### 3.3.2 RF-013: Ver Wishlist
- **Descripción**: Página con todos los juegos guardados
- **Entrada**: Navegación a `/wishlist`
- **Proceso**: Leer de Supabase por user_id
- **Salida**: Lista de juegos guardados
- **Criterio de aceptación**: Botón para eliminar cada juego

#### 3.3.3 RF-014: Badge de Wishlist
- **Descripción**: Indicador numérico en navbar
- **Entrada**: Cambios en wishlist
- **Proceso**: Contar elementos en Supabase
- **Salida**: Badge con número
- **Criterio de aceptación**: Se actualiza en tiempo real

### 3.4 Módulo: Comparador de Precios

#### 3.4.1 RF-015: Ver Precios
- **Descripción**: Lista de precios por tienda digital, filtrados por edición
- **Entrada**: Array de marketPrices
- **Proceso**: Filtrar por edición seleccionada, renderizar tiendas
- **Salida**: PS Store, Steam, Xbox, Epic, Nintendo
- **Criterio de aceptación**: Precios en MXN, filtrados por edición

#### 3.4.2 RF-016: Historial de Precios
- **Descripción**: Gráfico SVG del historial de precios del juego
- **Entrada**: Datos de price_history
- **Proceso**: Renderizar gráfico con puntos y líneas SVG
- **Salida**: Gráfico con stats (promedio, mínimo, máximo)
- **Criterio de aceptación**: Responsive, tooltips informativos

### 3.5 Módulo: Calendario de Lanzamientos

#### 3.5.1 RF-017: Ver Calendario
- **Descripción**: Vista de calendario con lanzamientos agrupados por mes
- **Entrada**: Fechas de releaseDate
- **Proceso**: Agrupar por mes, ordenar por fecha
- **Salida**: Calendario visual con juegos por mes
- **Criterio de aceptación**: Mes actual visible por defecto

### 3.6 Módulo: Blog

#### 3.6.1 RF-018: Listar Artículos
- **Descripción**: Lista de artículos del blog con categorías
- **Entrada**: Datos mock de artículos
- **Proceso**: Renderizar cards con tags
- **Salida**: Título, excerpt, fecha, imagen, categoría
- **Criterio de aceptación**: Mínimo 6 artículos con filtros por categoría

### 3.7 Módulo: Rankings

#### 3.7.1 RF-019: Ver Rankings
- **Descripción**: Top 10 juegos por score
- **Entrada**: Ordenar por globalScore
- **Proceso**: Tomar top 10
- **Salida**: Lista numerada con medallas
- **Criterio de aceptación**: Top 3 con medallas dorada/plata/bronce

### 3.8 Módulo: Autenticación

#### 3.8.1 RF-020: Registro de Usuario
- **Descripción**: Crear cuenta con email/password
- **Entrada**: Email, contraseña, nombre de visualización
- **Proceso**: Insertar en `auth.users` + crear perfil en `profiles`
- **Salida**: Sesión activa, redirect a home
- **Criterio de aceptación**: Email de confirmación enviado automáticamente

#### 3.8.2 RF-021: Login con Email/Password
- **Descripción**: Iniciar sesión con credenciales
- **Entrada**: Email y contraseña
- **Proceso**: Autenticar contra Supabase Auth
- **Salida**: Sesión activa, redirect a home
- **Criterio de aceptación**: Mensaje de error claro si credenciales inválidas

#### 3.8.3 RF-022: Login con Google OAuth
- **Descripción**: Iniciar sesión con cuenta de Google
- **Entrada**: Click en "Continuar con Google"
- **Proceso**: Redirect a Google → callback → crear sesión
- **Salida**: Sesión activa con datos de Google
- **Criterio de aceptación**: Nombre y foto de perfil importados de Google

#### 3.8.4 RF-023: Cerrar Sesión
- **Descripción**: Terminar sesión activa
- **Entrada**: Click en "Cerrar Sesión"
- **Proceso**: Limpiar sesión de Supabase
- **Salida**: Redirect a home, navbar actualizado
- **Criterio de aceptación**: Todos los datos de sesión eliminados

#### 3.8.5 RF-024: Perfil de Usuario
- **Descripción**: Página de perfil con datos, reseñas y logros
- **Entrada**: Navegación a `/profile`
- **Proceso**: Cargar datos de profiles + reviews del usuario
- **Salida**: Avatar, nombre, email, reseñas recientes, rango
- **Criterio de aceptación**: Editable nombre de visualización

#### 3.8.6 RF-025: Rutas Protegidas
- **Descripción**: Páginas que requieren autenticación
- **Entrada**: Navegación a ruta protegida sin sesión
- **Proceso**: Redirigir a login
- **Salida**: Página de login con mensaje
- **Criterio de aceptación**: Return URL preservada post-login

### 3.9 Módulo: Panel de Administración

#### 3.9.1 RF-026: Dashboard Admin
- **Descripción**: Panel principal con estadísticas y accesos rápidos
- **Entrada**: Navegación a `/admin`
- **Proceso**: Cargar stats de Supabase (juegos, usuarios, reseñas)
- **Salida**: Tarjetas de stats, accesos rápidos, actividad reciente
- **Criterio de aceptación**: Solo accesible por usuarios con `role = 'admin'`

#### 3.9.2 RF-027: Gestión de Juegos (CRUD)
- **Descripción**: Crear, editar y eliminar juegos
- **Entrada**: Formulario con todos los campos del juego
- **Proceso**: CRUD completo contra tabla `games`
- **Salida**: Juego creado/editado/eliminado
- **Criterio de aceptación**: Validación de campos obligatorios

#### 3.9.3 RF-028: Gestión de Usuarios
- **Descripción**: Ver, buscar y gestionar usuarios
- **Entrada**: Lista de usuarios de Supabase
- **Proceso**: Buscar, ver detalles, cambiar roles
- **Salida**: Tabla de usuarios con acciones
- **Criterio de aceptación**: Solo admin puede cambiar roles

#### 3.9.4 RF-029: Gestión de Precios
- **Descripción**: Actualizar precios de juegos
- **Entrada**: Selector de juego + formulario de precios
- **Proceso**: Actualizar market_prices en Supabase
- **Salida**: Precios actualizados
- **Criterio de aceptación**: Precios en MXN

#### 3.9.5 RF-030: Analytics
- **Descripción**: Métricas de uso de la plataforma
- **Entrada**: Datos de page_views
- **Proceso**: Calcular vistas, juegos más visitados
- **Salida**: Gráficos y estadísticas
- **Criterio de aceptación**: Últimos 30 días

### 3.10 Módulo: Comunidad

#### 3.10.1 RF-031: Foro
- **Descripción**: Sistema de discusiones por hilos dentro de grupos
- **Entrada**: Crear/ver threads
- **Proceso**: CRUD de threads + replies con votes
- **Salida**: Lista de hilos, vista de hilo con respuestas
- **Criterio de aceptación**: Cada usuario puede crear 1 hilo, responder ilimitado

#### 3.10.2 RF-032: Grupos
- **Descripción**: Comunidades temáticas con miembros
- **Entrada**: Crear/unirse a grupo
- **Proceso**: Gestionar membresía en `group_members`
- **Salida**: Lista de grupos, detalle con miembros
- **Criterio de aceptación**: Tipos: público, privado, solo invitación

#### 3.10.3 RF-033: Artículos de Usuario
- **Descripción**: Publicar artículos escritos por usuarios
- **Entrada**: Crear artículo con título, contenido, tags
- **Proceso**: Insertar en `articles`
- **Salida**: Artículo publicado visible en `/articles`
- **Criterio de aceptación**: Soporta tags y está relacionado al autor

#### 3.10.4 RF-034: Guías
- **Descripción**: Guías escritas por la comunidad
- **Entrada**: Crear guía con título, contenido, juego asociado
- **Proceso**: Insertar en `guides`
- **Salida**: Guía publicada visible en `/guides`
- **Criterio de aceptación**: Asociada a un juego específico

#### 3.10.5 RF-035: Screenshots
- **Descripción**: Galería de capturas de pantalla de usuarios
- **Entrada**: Subir imagen desde dispositivo
- **Proceso**: Upload a Supabase Storage + insertar en `screenshots`
- **Salida**: Screenshot visible en `/screenshots`
- **Criterio de aceptación**: Preview antes de subir, asociada a juego

#### 3.10.6 RF-036: Seguir Usuarios
- **Descripción**: Seguir/dejar de seguir a otros usuarios
- **Entrada**: Click en "Seguir"
- **Proceso**: Insertar/eliminar en `follows`
- **Salida**: Botón cambia de estado
- **Criterio de aceptación**: No permite seguirse a sí mismo

#### 3.10.7 RF-037: Activity Feed
- **Descripción**: Timeline de actividad de usuarios seguidos
- **Entrada**: Navegación a `/community`
- **Proceso**: Query de actividades de usuarios seguidos
- **Salida**: Lista cronológica de actividad
- **Criterio de aceptación**: Muestra acciones recientes (reseñas, likes, follows)

#### 3.10.8 RF-038: Leaderboard
- **Descripción**: Ranking de usuarios por reputación
- **Entrada**: Query de profiles ordenados por reputation
- **Proceso**: Calcular top usuarios
- **Salida**: Tabla con rango, nombre, puntos, medallas
- **Criterio de aceptación**: Medallas para top 3

### 3.11 Módulo: Sistema de Reputación

#### 3.11.1 RF-039: Acumular Puntos
- **Descripción**: Otorgar puntos por acciones en la plataforma
- **Entrada**: Acciones del usuario
- **Proceso**: Trigger automático en Supabase
- **Salida**: Puntos sumados al perfil
- **Criterio de aceptación**: Acciones y puntos:
  - Crear reseña: +5 puntos
  - Like en reseña: +2 puntos
  - Comentario en reseña: +1 punto
  - Crear thread en foro: +3 puntos
  - Responder en foro: +1 punto
  - Publicar guía: +10 puntos
  - Subir screenshot: +2 puntos

#### 3.11.2 RF-040: Sistema de Rangos
- **Descripción**: Otorgar rangos basados en puntos de reputación
- **Entrada**: Puntos acumulados
- **Proceso**: Evaluar contra umbrales
- **Salida**: Rango asignado automáticamente
- **Criterio de aceptación**: 7 rangos:
  - Novato: 0-9 puntos
  - Crítico Novel: 10-49 puntos
  - Crítico Activo: 50-149 puntos
  - Crítico Experto: 150-299 puntos
  - Crítico Veterano: 300-599 puntos
  - Maestro Crítico: 600-999 puntos
  - Leyenda: 1000+ puntos

#### 3.11.3 RF-041: Logros y Badges
- **Descripción**: Badges desbloqueables por acciones
- **Entrada**: Acciones del usuario
- **Proceso**: Verificar criterios en `achievements`
- **Salida**: Badge desbloqueado con notificación
- **Criterio de aceptación**: Badges iniciales:
  - Primera Reseña
  - Reseñador Activo (5 reseñas)
  - Crítico Veterano (20 reseñas)
  - Popular (10 likes recibidos)
  - Conversador (50 comentarios)
  - Guía Experto (3 guías publicadas)
  - Fotógrafo (10 screenshots)
  - Veterano (miembro desde el inicio)

### 3.12 Módulo: Alertas de Precio

#### 3.12.1 RF-042: Crear Alerta de Precio
- **Descripción**: Activar alerta para recibir notificación cuando un juego baje de precio
- **Entrada**: Click en "Activar" en detalle del juego
- **Proceso**: Insertar en tabla `price_alerts` con precio actual como objetivo
- **Salida**: Alerta activa, botón cambia a "Desactivar"
- **Criterio de aceptación**: Solo usuarios autenticados, 1 alerta por usuario/juego

#### 3.12.2 RF-043: Eliminar Alerta de Precio
- **Descripción**: Desactivar alerta existente
- **Entrada**: Click en "Desactivar"
- **Proceso**: Actualizar `active = false` en `price_alerts`
- **Salida**: Alerta desactivada
- **Criterio de aceptación**: Soft delete (no elimina registro)

#### 3.12.3 RF-044: Verificar Alertas (Cron Job)
- **Descripción**: Revisar periódicamente si los precios bajaron
- **Entrada**: Cron job diario a las 12:00
- **Proceso**: Comparar precios actuales vs objetivo en todas las alertas activas
- **Salida**: Notificación in-app + email si precio bajó
- **Criterio de aceptación**: 
  - Ejecuta 1 vez al día (Vercel Hobby)
  - Desactiva alerta después de trigger
  - No falla si email no se envía

#### 3.12.4 RF-045: Notificación In-App
- **Descripción**: Notificación visible en la campana del navbar
- **Entrada**: Trigger de alerta de precio
- **Proceso**: Insertar en tabla `notifications`
- **Salida**: Badge de notificaciones actualizado, toast
- **Criterio de aceptación**: Link directo al juego

#### 3.12.5 RF-046: Email de Alerta de Precio
- **Descripción**: Email HTML con diseño premium cuando baja el precio
- **Entrada**: Trigger de alerta de precio
- **Proceso**: POST a `/api/send-alert-email` → Resend API
- **Salida**: Email con imagen del juego, precio anterior/nuevo, ahorro, link
- **Criterio de aceptación**: 
  - Remitente: `CriticPixel <onboarding@resend.dev>`
  - Diseño: gradiente naranja, tabla de precios, botón CTA
  - Requiere `RESEND_API_KEY` en variables de entorno de Vercel

### 3.13 Módulo: Tema Claro/Oscuro

#### 3.13.1 RF-047: Cambiar Tema
- **Descripción**: Alternar entre tema oscuro (default) y claro
- **Entrada**: Click en toggle de tema
- **Proceso**: Actualizar ThemeContext, persistir en localStorage
- **Salida**: Tema aplicado en toda la app
- **Criterio de aceptación**: Preferencia persiste entre sesiones

### 3.14 Módulo: Notificaciones

#### 3.14.1 RF-048: Notificaciones en Tiempo Real
- **Descripción**: Sistema de notificaciones con suscripción realtime
- **Entrada**: Cambios en tabla `notifications`
- **Proceso**: Supabase realtime subscription
- **Salida**: Badge actualizado, toast notification
- **Criterio de aceptación**: Se actualiza sin recargar página

#### 3.14.2 RF-049: Panel de Notificaciones
- **Descripción**: Lista desplegable con notificaciones recientes
- **Entrada**: Click en campana del navbar
- **Proceso**: Cargar notificaciones del usuario
- **Salida**: Lista con título, mensaje, tipo, fecha
- **Criterio de aceptación**: Marcar como leídas al abrir

### 3.15 Módulo: Estadísticas de Usuario

#### 3.15.1 RF-050: Ver Stats
- **Descripción**: Dashboard personal con estadísticas
- **Entrada**: Navegación a `/stats`
- **Proceso**: Calcular reviews, likes, tiempo activo
- **Salida**: Total reviews, likes recibidos, rango, badges
- **Criterio de aceptación**: Gráficos SVG de actividad

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
| RNF-06 | Code splitting | Todas las rutas lazy loaded |

### 4.2 Compatibilidad
| ID | Requisito |
|----|-----------|
| RNF-07 | Chrome, Firefox, Safari, Edge (últimas 2 versiones) |
| RNF-08 | Responsive: 320px - 4K |
| RNF-09 | Touch events en móviles |
| RNF-10 | Menú hamburguesa en móvil |

### 4.3 Seguridad
| ID | Requisito |
|----|-----------|
| RNF-11 | HTTPS en producción |
| RNF-12 | RLS (Row Level Security) en todas las tablas de Supabase |
| RNF-13 | Usuarios solo acceden a sus propios datos |
| RNF-14 | Admin role verificado en RLS policies |
| RNF-15 | Service role key solo en server-side (API routes) |
| RNF-16 | CRON_SECRET para proteger cron jobs |

### 4.4 Accesibilidad
| ID | Requisito |
|----|-----------|
| RNF-17 | Navegación por teclado |
| RNF-18 | Labels en todos los inputs |
| RNF-19 | Contraste mínimo 4.5:1 |
| RNF-20 | Iconos con aria-label |

### 4.5 Mantenibilidad
| ID | Requisito |
|----|-----------|
| RNF-21 | Componentes modulares reutilizables |
| RNF-22 | Custom hooks para lógica reutilizable |
| RNF-23 | Context providers para estado global |
| RNF-24 | API routes para operaciones server-side |

---

## 5. Requisitos de Interfaz

### 5.1 Interfaz de Usuario

#### 5.1.1 Layout General
```
┌─────────────────────────────────────┐
│  NAVBAR (logo, links, search, user) │
├─────────────────────────────────────┤
│                                     │
│           CONTENT AREA              │
│                                     │
├─────────────────────────────────────┤
│  FOOTER (links, redes, copyright)  │
└─────────────────────────────────────┘
```

#### 5.1.2 Esquema de Colores (Dark Mode)
| Elemento | Color |
|----------|-------|
| Background | #0f0f1a |
| Surface | #1a1a2e |
| Primary (Orange) | #ff6b00 |
| Accent | #ff9500 |
| Text | #ffffff |
| Muted | #a0a0b0 |

#### 5.1.3 Esquema de Colores (Light Mode)
| Elemento | Color |
|----------|-------|
| Background | #f5f5f5 |
| Surface | #ffffff |
| Primary (Orange) | #ff6b00 |
| Text | #1a1a1a |
| Muted | #6b7280 |

#### 5.1.4 Tipografía
- **Títulos**: Inter, Black (900)
- **Body**: Inter, Regular (400)
- **Código**: Fira Code

### 5.2 Interfaz de Software
| Sistema | Tipo | Uso |
|---------|------|-----|
| Supabase | PostgreSQL + Auth + Storage + Realtime | Backend completo |
| Vercel | Hosting + Serverless Functions + Cron | Deploy y API |
| Resend | Email API | Alertas de precio por email |
| YouTube | Iframe embed | Trailers de juegos |
| Lucide React | Iconos | UI icons |
| Framer Motion | Animaciones | Transiciones y micro-interacciones |

---

## 6. Requisitos de Datos

### 6.1 Supabase Tables

#### Tablas Principales
| Tabla | Descripción | RLS |
|-------|-------------|-----|
| games | Información principal de juegos | ✅ |
| editions | Ediciones disponibles por juego | ✅ |
| edition_perks | Beneficios por edición | ✅ |
| market_prices | Precios por tienda | ✅ |
| score_breakdown | Desglose de scores | ✅ |
| languages | Idiomas soportados | ✅ |
| reviews | Reseñas de usuarios | ✅ |

#### Tablas de Autenticación
| Tabla | Descripción | RLS |
|-------|-------------|-----|
| profiles | Perfiles de usuario (extends auth.users) | ✅ |
| wishlists | Juegos guardados por usuario | ✅ |

#### Tablas de Comunidad
| Tabla | Descripción | RLS |
|-------|-------------|-----|
| forum_threads | Hilos del foro | ✅ |
| forum_replies | Respuestas en hilos | ✅ |
| forum_votes | Votos en threads/replies | ✅ |
| groups | Grupos temáticos | ✅ |
| group_members | Membresía de grupos | ✅ |
| articles | Artículos de usuarios | ✅ |
| guides | Guías escritas por usuarios | ✅ |
| screenshots | Capturas de pantalla | ✅ |
| follows | Seguimiento de usuarios | ✅ |
| activities | Registro de actividad | ✅ |
| profiles (reputation) | Puntos de reputación por usuario | ✅ |

#### Tablas de Gamificación
| Tabla | Descripción | RLS |
|-------|-------------|-----|
| achievements | Badges/logros disponibles | ✅ |
| user_achievements | Badges desbloqueados por usuario | ✅ |
| notifications | Notificaciones in-app | ✅ |
| reviews_votes | Votos (like/dislike) en reseñas | ✅ |

#### Tablas de Precios y Alertas
| Tabla | Descripción | RLS |
|-------|-------------|-----|
| price_history | Historial de precios por juego | ✅ |
| price_alerts | Alertas de precio configuradas por usuario | ✅ |
| page_views | Tracking de vistas de página | ✅ |

### 6.2 Supabase Views
| Vista | Descripción |
|-------|-------------|
| leaderboard | Top usuarios ordenados por reputación |
| community_stats | Estadísticas agregadas de comunidad |

### 6.3 Supabase Functions (Triggers)
| Función | Descripción |
|---------|-------------|
| handle_new_user() | Crear perfil automáticamente al registrarse |
| update_reputation() | Actualizar puntos al insertar reseña/like/comment |
| grant_achievements() | Verificar y otorgar badges automáticamente |

### 6.4 Almacenamiento (Supabase Storage)
| Bucket | Descripción |
|--------|-------------|
| screenshots | Capturas de pantalla subidas por usuarios |

### 6.5 Variables de Entorno
| Variable | Lugar | Descripción |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | Frontend | URL del proyecto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Frontend | Key pública de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel (API) | Key admin de Supabase (server-side) |
| `RESEND_API_KEY` | Vercel (API) | API key de Resend para emails |
| `CRON_SECRET` | Vercel | Secreto para proteger cron jobs |

---

## 7. Requisitos de Seguridad

### 7.1 Autenticación
- **Proveedor**: Supabase Auth
- **Métodos**: Email/Password, Google OAuth
- **Sesiones**: Manejadas por Supabase con refresh automático
- **Callback**: `${window.location.origin}` (ruta raíz)

### 7.2 Autorización
- **RLS en todas las tablas**: Cada usuario solo accede a sus datos
- **Rol admin**: Verificado por email en policies (`bogarcit02005yam@gmail.com`)
- **Service role key**: Solo en API routes server-side (nunca en frontend)
- **CRON_SECRET**: Protege endpoints de cron jobs

### 7.3 Datos Sensibles
- Keys de Supabase: Anon key en frontend (pública), service role en server-side
- Passwords: Hasheadas por Supabase Auth
- localStorage: Solo preferencias no sensibles (tema, wishlist local)
- Cookies: Manejadas por Supabase para sesiones

### 7.4 Protección de API Routes
- `api/lib/supabase.js`: Usa service role key (admin)
- `api/check-price-alerts.js`: Protegido con CRON_SECRET
- `api/send-alert-email.js`: Valida campos requeridos
- `api/update-prices.js`: Acceso admin

---

## 8. Requisitos de Despliegue

### 8.1 Entorno de Producción
| Componente | Servicio |
|------------|----------|
| Hosting | Vercel |
| Dominio | criticpixel.vercel.app |
| SSL | Automático (Vercel) |
| CDN | Vercel Edge Network |
| Git | GitHub → Vercel (auto-deploy) |

### 8.2 Cron Jobs (Vercel Hobby)
| Job | Schedule | Descripción |
|-----|----------|-------------|
| `/api/update-prices` | `0 6 * * *` (6am diario) | Actualizar precios de tiendas |
| `/api/check-price-alerts` | `0 12 * * *` (12pm diario) | Verificar y trigger alertas |

> **Nota**: Vercel Hobby limita a 1 cron job por día. Si se necesita más frecuencia, upgrade a Pro.

### 8.3 Entorno de Desarrollo
| Herramienta | Versión |
|-------------|---------|
| Node.js | 18+ |
| npm | 9+ |
| Vite | 8.x |
| React | 19.x |

### 8.4 CI/CD
```
GitHub (main) → Vercel Build → Deploy automático
```

### 8.5 Comandos
```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Deploy manual (requiere vercel login)
npx vercel --prod --yes
```

---

## 9. Anexos

### 9.1 Dependencias Principales
| Paquete | Versión | Uso |
|---------|---------|-----|
| react | 19.x | UI framework |
| vite | 8.x | Build tool |
| tailwindcss | 3.x | Styling |
| react-router-dom | 7.x | Routing (HashRouter) |
| framer-motion | 11.x | Animaciones |
| @supabase/supabase-js | 2.x | Backend (DB, Auth, Storage, Realtime) |
| lucide-react | latest | Iconos |

### 9.2 Estructura de Directorios
```
criticpixel/
├── api/                        # Serverless functions (Vercel)
│   ├── lib/
│   │   ├── supabase.js         # Client server-side con service role
│   │   ├── prices.js           # Lógica de precios
│   │   ├── psn.js              # PlayStation Store API
│   │   └── xbox.js             # Xbox Store API
│   ├── update-prices.js        # Cron: actualizar precios
│   ├── check-price-alerts.js   # Cron: verificar alertas
│   └── send-alert-email.js     # Endpoint: enviar email Resend
├── src/
│   ├── components/             # Componentes reutilizables (30+)
│   │   ├── ActivityFeed.jsx
│   │   ├── CommunityAchievements.jsx
│   │   ├── FollowButton.jsx
│   │   ├── ForumThreadList.jsx
│   │   ├── GameCard.jsx
│   │   ├── GroupList.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── PriceAlert.jsx
│   │   ├── PriceHistory.jsx
│   │   ├── ReviewComments.jsx
│   │   ├── ReviewForm.jsx
│   │   ├── ReviewTags.jsx
│   │   ├── ReviewVotes.jsx
│   │   ├── ReportReview.jsx
│   │   ├── ShareButtons.jsx
│   │   └── ... (20+ más)
│   ├── views/                  # Páginas/rutas (20+)
│   │   ├── Home.jsx
│   │   ├── GameDetails.jsx
│   │   ├── AllGames.jsx
│   │   ├── SearchResults.jsx
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── Guides.jsx
│   │   ├── Articles.jsx
│   │   ├── Forum.jsx
│   │   ├── ForumThread.jsx
│   │   ├── Groups.jsx
│   │   ├── Screenshots.jsx
│   │   ├── Community.jsx
│   │   ├── Rankings.jsx
│   │   ├── ReleasesCalendar.jsx
│   │   ├── TrailersPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── UserManagement.jsx
│   │   ├── Analytics.jsx
│   │   └── ... (5+ más)
│   ├── context/                # React context providers
│   │   ├── AuthContext.jsx     # Autenticación
│   │   ├── ThemeContext.jsx    # Tema claro/oscuro
│   │   ├── ToastContext.jsx    # Toast notifications
│   │   ├── WishlistContext.jsx # Wishlist por usuario
│   │   └── NotificationContext.jsx # Notificaciones realtime
│   ├── hooks/                  # Custom hooks
│   │   ├── useSEO.js
│   │   ├── usePageView.js
│   │   ├── usePriceAlerts.js
│   │   └── ...
│   ├── data/
│   │   └── mockGames.js        # Fallback de juegos
│   ├── lib/
│   │   └── supabase.js         # Client frontend
│   ├── App.jsx                 # Router principal
│   ├── main.jsx                # Entry point
│   └── index.css               # Estilos globales + Tailwind
├── SQL/                        # Scripts SQL
│   ├── community.sql           # Tablas de comunidad
│   ├── community_demo_data.sql # Datos demo
│   ├── price_alerts.sql        # Tabla de alertas
│   ├── screenshots_storage.sql # Bucket de storage
│   └── fix_game_images.sql     # Fix de imágenes
├── public/
│   └── favicon.ico
├── vercel.json                 # Config deploy + cron jobs
├── tailwind.config.js
├── vite.config.js
├── package.json
└── index.html
```

### 9.3 Rutas de la Aplicación
| Ruta | Componente | Descripción | Protegida |
|------|------------|-------------|-----------|
| `/#/` | Home | Página principal | No |
| `/#/game/:id` | GameDetails | Detalle de juego | No |
| `/#/games` | AllGames | Catálogo completo | No |
| `/#/search` | SearchResults | Resultados de búsqueda | No |
| `/#/trailers` | TrailersPage | Galería de trailers | No |
| `/#/calendar` | ReleasesCalendar | Calendario de lanzamientos | No |
| `/#/rankings` | Rankings | Top juegos | No |
| `/#/blog` | Blog | Noticias | No |
| `/#/about` | About | Acerca de | No |
| `/#/community` | Community | Hub de comunidad | No |
| `/#/forum` | Forum | Foro general | No |
| `/#/forum/:id` | ForumThread | Hilo del foro | No |
| `/#/groups` | Groups | Grupos temáticos | No |
| `/#/articles` | Articles | Artículos de usuarios | No |
| `/#/guides` | Guides | Guías de la comunidad | No |
| `/#/screenshots` | Screenshots | Galería de capturas | No |
| `/#/wishlist` | Wishlist | Lista de deseados | Sí |
| `/#/stats` | UserStats | Estadísticas personales | Sí |
| `/#/profile` | ProfilePage | Perfil de usuario | Sí |
| `/#/login` | LoginPage | Iniciar sesión | No |
| `/#/admin` | AdminDashboard | Panel de administración | Admin |
| `/#/admin/games` | GameCrud | CRUD de juegos | Admin |
| `/#/admin/prices` | PriceAdmin | Gestión de precios | Admin |
| `/#/admin/users` | UserManagement | Gestión de usuarios | Admin |
| `/#/admin/analytics` | Analytics | Métricas de uso | Admin |

---

**Documento generado:** Julio 2026  
**Última actualización:** Julio 2026  
**Estado:** Versión 2.0 completa  
**Total de requisitos funcionales:** 50 (RF-001 a RF-050)  
**Total de requisitos no funcionales:** 24 (RNF-01 a RNF-24)  
**Total de tablas Supabase:** 20+  
**Total de componentes:** 30+  
**Total de vistas:** 20+  
**Total de rutas:** 25
