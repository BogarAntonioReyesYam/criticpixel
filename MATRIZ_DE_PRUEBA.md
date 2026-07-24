# Matriz de Prueba
## CriticPixel - Plataforma de Reseñas de Videojuegos

**Versión:** 1.0  
**Fecha:** Julio 2026  
**Proyecto:** criticpixel  
**Desarrollador:** Bogar Antonio Reyes Yam  

---

## 1. Módulo: Catálogo de Juegos

| ID Prueba | Requisito | Descripción de la Prueba | Datos de Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-----------------|-------------------|--------|
| P-001 | RF-001 | Verificar que se muestran los juegos en formato grid | Abrir página principal | Se muestran tarjetas de juego con imagen, título, score y precio | |
| P-002 | RF-001 | Verificar scroll infinito | Hacer scroll en /games | Se cargan más juegos (8 por carga) automáticamente | |
| P-003 | RF-001 | Verificar vista de lista | Cambiar a vista lista en /games | Se muestran juegos en formato compacto | |
| P-004 | RF-002 | Búsqueda por título | Escribir "GTA" en buscador | Se filtran juegos que contienen "GTA" | |
| P-005 | RF-002 | Búsqueda por género | Escribir "RPG" en buscador | Se muestran juegos RPG | |
| P-006 | RF-002 | Búsqueda vacía | Buscar texto inexistente | Se muestra "No se encontraron resultados" | |
| P-007 | RF-002 | Debounce de búsqueda | Escribir rápido en buscador | No hace fetch en cada tecla, espera 300ms | |
| P-008 | RF-003 | Filtrar por PlayStation | Seleccionar filtro PS5 | Solo se muestran juegos de PS5 | |
| P-009 | RF-003 | Filtrar por PC | Seleccionar filtro PC | Solo se muestran juegos de PC | |
| P-010 | RF-003 | Filtrar por Xbox | Seleccionar filtro Xbox | Solo se muestran juegos de Xbox | |
| P-011 | RF-003 | Filtrar por Nintendo | Seleccionar filtro Nintendo | Solo se muestran juegos de Nintendo | |
| P-012 | RF-003 | Combinar filtro + búsqueda | Filtrar PS5 + buscar "GTA" | Solo juegos PS5 que contengan "GTA" | |
| P-013 | RF-004 | Ordenar por score descendente | Seleccionar "Mayor score" | Juegos ordenados de mayor a menor score | |
| P-014 | RF-004 | Ordenar por score ascendente | Seleccionar "Menor score" | Juegos ordenados de menor a mayor score | |
| P-015 | RF-004 | Ordenar alfabéticamente A-Z | Seleccionar "A-Z" | Juegos ordenados alfabéticamente | |
| P-016 | RF-005 | Cambiar a vista Grid | Click en botón grid | Se muestra vista de tarjetas | |
| P-017 | RF-005 | Cambiar a vista Lista | Click en botón lista | Se muestra vista compacta | |

---

## 2. Módulo: Detalle de Juego

| ID Prueba | Requisito | Descripción de la Prueba | Datos de Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-----------------|-------------------|--------|
| P-018 | RF-006 | Ver detalle de juego | Click en un juego | Se muestra hero section con imagen, título, score | |
| P-019 | RF-006 | Verificar campos del juego | Abrir detalle de juego | Descripción, specs, ediciones, precio visibles | |
| P-020 | RF-007 | Verificar score circular | Abrir detalle de juego | Score circular animado con valor de 0-10 | |
| P-021 | RF-007 | Verificar breakdown | Abrir detalle de juego | Barras de jugabilidad, gráficos, historia | |
| P-022 | RF-008 | Seleccionar edición Standard | Click en edición Standard | Se muestran precios y perks de Standard | |
| P-023 | RF-008 | Seleccionar edición Deluxe | Click en edición Deluxe | Se muestran precios y perks de Deluxe | |
| P-024 | RF-009 | Ver trailer de YouTube | Click en ver trailer | Se reproduce video de YouTube embebido | |
| P-025 | RF-010 | Ver juegos similares | Scroll en detalle de juego | Se muestran 4 juegos con plataformas en común | |
| P-026 | RF-011 | Ver reseñas | Scroll a sección de reseñas | Se muestran 3 reseñas por defecto | |
| P-027 | RF-011 | Expandir reseñas | Click en "Ver más reseñas" | Se muestran todas las reseñas | |
| P-028 | RF-011 | Votar reseña (like) | Click en like de una reseña | Like incrementado, color cambia | |
| P-029 | RF-011 | Votar reseña (dislike) | Click en dislike de una reseña | Dislike incrementado, color cambia | |
| P-030 | RF-015 | Ver precios del mercado | Scroll a sección de precios | Se muestran tiendas con precios en MXN | |
| P-031 | RF-015 | Filtrar precios por edición | Cambiar edición seleccionada | Precios cambian según edición | |
| P-032 | RF-015 | Abrir enlace de tienda | Click en tienda | Se abre nueva pestaña con URL de la tienda | |

---

## 3. Módulo: Wishlist

| ID Prueba | Requisito | Descripción de la Prueba | Datos de Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-----------------|-------------------|--------|
| P-033 | RF-012 | Agregar juego a wishlist | Click en corazón (sin sesión) | Se guarda en Supabase, corazón se llena | |
| P-034 | RF-012 | Quitar juego de wishlist | Click en corazón (ya guardado) | Se elimina de Supabase, corazón vacío | |
| P-035 | RF-013 | Ver wishlist | Navegar a /wishlist | Se muestran todos los juegos guardados | |
| P-036 | RF-013 | Eliminar de wishlist | Click en "Eliminar" en wishlist | Juego se elimina de la lista | |
| P-037 | RF-014 | Badge de wishlist actualizado | Agregar juego a wishlist | Badge en navbar incrementa en 1 | |

---

## 4. Módulo: Autenticación

| ID Prueba | Requisito | Descripción de la Prueba | Datos de Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-----------------|-------------------|--------|
| P-038 | RF-020 | Registrar usuario nuevo | Email: test@test.com, Pass: 123456 | Cuenta creada, email de confirmación enviado | |
| P-039 | RF-020 | Registrar con email existente | Email ya registrado | Error: "Email already registered" | |
| P-040 | RF-021 | Login con credenciales correctas | Email y password válidos | Sesión activa, redirect a home | |
| P-041 | RF-021 | Login con credenciales incorrectas | Email o password incorrecto | Error: "Invalid credentials" | |
| P-042 | RF-022 | Login con Google | Click en "Continuar con Google" | Redirect a Google → sesión activa | |
| P-043 | RF-023 | Cerrar sesión | Click en "Cerrar Sesión" | Sesión terminada, navbar actualizado | |
| P-044 | RF-024 | Ver perfil | Navegar a /profile | Se muestra avatar, nombre, reseñas | |
| P-045 | RF-024 | Editar nombre | Cambiar display_name | Nombre actualizado en perfil | |
| P-046 | RF-025 | Acceder sin sesión a ruta protegida | Navegar a /wishlist sin login | Redirect a /login | |
| P-047 | RF-025 | Return URL preservada | Intentar acceder a /wishlist sin sesión | Después de login, redirige a /wishlist | |

---

## 5. Módulo: Panel de Administración

| ID Prueba | Requisito | Descripción de la Prueba | Datos de Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-----------------|-------------------|--------|
| P-048 | RF-026 | Acceder como admin | Login con email admin | Se muestra dashboard con stats | |
| P-049 | RF-026 | Acceder como usuario normal | Login sin rol admin | Redirect a home o mensaje de denegado | |
| P-050 | RF-027 | Crear juego nuevo | Llenar formulario completo | Juego creado en Supabase | |
| P-051 | RF-027 | Editar juego | Modificar campos de juego existente | Cambios guardados | |
| P-052 | RF-027 | Eliminar juego | Click en eliminar juego | Juego eliminado de Supabase | |
| P-053 | RF-028 | Ver lista de usuarios | Navegar a /admin/users | Tabla con todos los usuarios | |
| P-054 | RF-028 | Buscar usuario | Escribir nombre de usuario | Filtrado en tiempo real | |
| P-055 | RF-029 | Actualizar precios | Modificar precios de un juego | Precios actualizados en market_prices | |
| P-056 | RF-030 | Ver analytics | Navegar a /admin/analytics | Gráficos de vistas, juegos populares | |

---

## 6. Módulo: Comunidad

| ID Prueba | Requisito | Descripción de la Prueba | Datos de Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-----------------|-------------------|--------|
| P-057 | RF-031 | Crear thread en foro | Click en "Nuevo Thread" + título + contenido | Thread creado, visible en lista | |
| P-058 | RF-031 | Responder a thread | Click en "Responder" + contenido | Respuesta agregada al thread | |
| P-059 | RF-031 | Votar en thread | Click en like/dislike | Voto registrado, puntuación actualizada | |
| P-060 | RF-032 | Ver grupos | Navegar a /groups | Lista de grupos disponibles | |
| P-061 | RF-032 | Unirse a grupo público | Click en "Unirse" | Membresía creada, contador +1 | |
| P-062 | RF-032 | Crear grupo | Llenar formulario de grupo | Grupo creado, eres miembro | |
| P-063 | RF-033 | Publicar artículo | Llenar formulario de artículo | Artículo publicado en /articles | |
| P-064 | RF-034 | Publicar guía | Llenar formulario de guía | Guía publicada en /guides | |
| P-065 | RF-035 | Subir screenshot | Seleccionar imagen + juego | Screenshot subido a Supabase Storage | |
| P-066 | RF-035 | Preview antes de subir | Seleccionar imagen | Se muestra preview antes de confirmar | |
| P-067 | RF-036 | Seguir usuario | Click en "Seguir" en perfil | Follow creado, botón cambia | |
| P-068 | RF-036 | Dejar de seguir | Click en "Dejar de seguir" | Follow eliminado | |
| P-069 | RF-037 | Ver activity feed | Navegar a /community | Timeline de actividad de seguidos | |
| P-070 | RF-038 | Ver leaderboard | Navegar a /leaderboard | Ranking de usuarios por reputación | |

---

## 7. Módulo: Sistema de Reputación

| ID Prueba | Requisito | Descripción de la Prueba | Datos de Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-----------------|-------------------|--------|
| P-071 | RF-039 | Puntos por reseña | Publicar reseña | +5 puntos agregados al perfil | |
| P-072 | RF-039 | Puntos por like | Dar like a reseña | +2 puntos agregados al perfil | |
| P-073 | RF-039 | Puntos por comentario | Comentar en reseña | +1 punto agregado al perfil | |
| P-074 | RF-039 | Puntos por thread | Crear thread en foro | +3 puntos agregados al perfil | |
| P-075 | RF-039 | Puntos por reply | Responder en foro | +1 punto agregado al perfil | |
| P-076 | RF-039 | Puntos por guía | Publicar guía | +10 puntos agregados al perfil | |
| P-077 | RF-039 | Puntos por screenshot | Subir screenshot | +2 puntos agregados al perfil | |
| P-078 | RF-040 | Rango "Novato" | 0-9 puntos | Rango Novato visible en perfil | |
| P-079 | RF-040 | Rango "Crítico Novel" | 10-49 puntos | Rango Crítico Novel visible | |
| P-080 | RF-040 | Rango "Leyenda" | 1000+ puntos | Rango Leyenda visible | |
| P-081 | RF-041 | Desbloquear badge "Primera Reseña" | Publicar primera reseña | Badge desbloqueado con notificación | |
| P-082 | RF-041 | Desbloquear badge "Reseñador Activo" | Publicar 5 reseñas | Badge desbloqueado | |
| P-083 | RF-041 | Desbloquear badge "Guía Experto" | Publicar 3 guías | Badge desbloqueado | |

---

## 8. Módulo: Alertas de Precio

| ID Prueba | Requisito | Descripción de la Prueba | Datos de Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-----------------|-------------------|--------|
| P-084 | RF-042 | Crear alerta de precio | Click en "Activar" en detalle de juego | Alerta creada en Supabase, botón cambia a "Desactivar" | |
| P-085 | RF-042 | Crear alerta sin sesión | Click en "Activar" sin login | Mensaje "Inicia sesión" | |
| P-086 | RF-043 | Desactivar alerta | Click en "Desactivar" | Alerta desactivada, botón vuelve a "Activar" | |
| P-087 | RF-044 | Cron job ejecuta | Simular bajada de precio | Notificación in-app creada | |
| P-088 | RF-045 | Notificación in-app | Precio baja de un juego | Badge de notificaciones incrementa | |
| P-089 | RF-045 | Toast notification | Precio baja de un juego | Toast aparece en pantalla | |
| P-090 | RF-046 | Email enviado | Precio baja + RESEND_API_KEY configurado | Email HTML recibido con diseño premium | |
| P-091 | RF-046 | Email sin API key | Precio baja sin RESEND_API_KEY | Error 500, no se envía email | |
| P-092 | RF-046 | Contenido del email | Abrir email de alerta | Imagen del juego, precio anterior/nuevo, ahorro, link | |

---

## 9. Módulo: Tema Claro/Oscuro

| ID Prueba | Requisito | Descripción de la Prueba | Datos de Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-----------------|-------------------|--------|
| P-093 | RF-047 | Cambiar a tema claro | Click en toggle de tema | Todo el UI cambia a colores claros | |
| P-094 | RF-047 | Cambiar a tema oscuro | Click en toggle de tema | Todo el UI cambia a colores oscuros | |
| P-095 | RF-047 | Persistencia del tema | Recargar página | Tema seleccionado se mantiene | |

---

## 10. Módulo: Notificaciones

| ID Prueba | Requisito | Descripción de la Prueba | Datos de Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-----------------|-------------------|--------|
| P-096 | RF-048 | Notificación en tiempo real | Acción que genere notificación | Badge se actualiza sin recargar | |
| P-097 | RF-049 | Abrir panel de notificaciones | Click en campana | Lista de notificaciones recientes | |
| P-098 | RF-049 | Marcar como leídas | Abrir panel de notificaciones | Notificaciones marcadas como leídas | |

---

## 11. Módulo: Estadísticas de Usuario

| ID Prueba | Requisito | Descripción de la Prueba | Datos de Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-----------------|-------------------|--------|
| P-099 | RF-050 | Ver stats personales | Navegar a /stats | Total reviews, likes, rango, badges | |
| P-100 | RF-050 | Gráficos de actividad | Navegar a /stats | Gráficos SVG de actividad | |

---

## 12. Pruebas No Funcionales

| ID Prueba | Requisito | Descripción de la Prueba | Resultado Esperado | Estado |
|-----------|-----------|--------------------------|-------------------|--------|
| P-101 | RNF-01 | First Contentful Paint | < 1.5 segundos | |
| P-102 | RNF-02 | Largest Contentful Paint | < 2.5 segundos | |
| P-103 | RNF-03 | Time to Interactive | < 3.0 segundos | |
| P-104 | RNF-04 | Tamaño bundle gzipped | < 300KB | |
| P-105 | RNF-07 | Prueba en Chrome | Funciona correctamente | |
| P-106 | RNF-07 | Prueba en Firefox | Funciona correctamente | |
| P-107 | RNF-07 | Prueba en Safari | Funciona correctamente | |
| P-108 | RNF-07 | Prueba en Edge | Funciona correctamente | |
| P-109 | RNF-08 | Responsive 320px | Layout correcto en móvil pequeño | |
| P-110 | RNF-08 | Responsive 768px | Layout correcto en tablet | |
| P-111 | RNF-08 | Responsive 1920px | Layout correcto en desktop | |
| P-112 | RNF-09 | HTTPS | Sitio accesible solo por HTTPS | |
| P-113 | RNF-12 | RLS habilitado | Usuarios no acceden a datos de otros | |
| P-114 | RNF-16 | Navegación por teclado | Todos los elementos accesibles | |
| P-115 | RNF-19 | Contraste de colores | Todos los textos legibles | |

---

## Resumen de Pruebas

| Módulo | Total Pruebas | Pasaron | Fallaron | Pendientes |
|--------|---------------|---------|----------|------------|
| Catálogo de Juegos | 17 | | | |
| Detalle de Juego | 15 | | | |
| Wishlist | 5 | | | |
| Autenticación | 10 | | | |
| Panel Admin | 9 | | | |
| Comunidad | 14 | | | |
| Reputación | 13 | | | |
| Alertas de Precio | 9 | | | |
| Tema | 3 | | | |
| Notificaciones | 3 | | | |
| Estadísticas | 2 | | | |
| No Funcionales | 15 | | | |
| **TOTAL** | **115** | | | |

---

## Instrucciones de Uso

1. Ejecutar cada prueba en el orden indicado
2. Marcar **✓** en "Estado" si pasa, **✗** si falla
3. En caso de falla, documentar en observaciones
4. Las pruebas dependen de datos de prueba específicos
5. Algunas pruebas requieren estar autenticado

---

**Documento generado:** Julio 2026  
**Total de pruebas:** 115  
**Cobertura:** 100% de requisitos funcionales (50 RF) + requisitos no funcionales (24 RNF)
