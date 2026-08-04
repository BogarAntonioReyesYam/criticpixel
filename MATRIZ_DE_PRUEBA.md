# Matriz de Pruebas - CriticPixel

## 1. Información general

- Proyecto: CriticPixel
- Tipo de aplicación: SPA (React + Vite + Supabase)
- Alcance: catálogo, detalle de juegos, wishlist, precios, calendario, blog, rankings, autenticación, comunidad, administración y alertas de precio
- Fecha: Julio 2026
- Responsable de pruebas: equipo de desarrollo / QA funcional
- Objetivo: verificar que la plataforma funcione correctamente, que las rutas, datos y permisos sean consistentes, y que la experiencia de usuario sea estable en navegadores modernos

## 2. Estrategia de prueba

### 2.1 Niveles de prueba
- Pruebas funcionales: validan cada requisito del producto
- Pruebas de integración: validan interacción entre UI, contexto y Supabase/API
- Pruebas de interfaz: validan navegación, estados de carga, errores y responsive
- Pruebas de seguridad: permisos de admin, manejo de sesiones, protección de rutas
- Pruebas no funcionales: rendimiento, accesibilidad y compatibilidad

### 2.2 Priorización
- P0: crítico para el negocio o la operación del sistema
- P1: importante, pero con impacto menor si falla
- P2: deseable o mejora menor

### 2.3 Ambientes recomendados
- Local: desarrollo con Vite
- Staging: entorno de preproducción con Supabase configurado
- Producción: validación final antes de liberación

## 3. Matriz de pruebas funcionales

### 3.1 Navegación y rutas

| ID | Caso de prueba | Prioridad | Tipo | Resultado esperado |
|---|---|---|---|---|
| NAV-01 | Cargar la landing/home sin errores | P0 | Funcional | La página principal se muestra correctamente con contenido y navegación |
| NAV-02 | Navegar entre todas las rutas principales | P0 | Funcional | Cada ruta carga su vista correspondiente sin romper la UI |
| NAV-03 | Ruta no existente muestra fallback o redirección | P1 | Funcional | El sistema devuelve una experiencia controlada en lugar de error blanco |
| NAV-04 | Búsqueda global desde navbar | P0 | Funcional | Al ingresar texto, el sistema navega a la vista de resultados |
| NAV-05 | Cambio de tema claro/oscuro | P1 | UI | El cambio aplica correctamente sin romper componentes |

### 3.2 Catálogo y búsqueda

| ID | Caso de prueba | Prioridad | Tipo | Resultado esperado |
|---|---|---|---|---|
| CAT-01 | Listar juegos disponibles | P0 | Funcional | Se muestran juegos correctamente con imagen, título y datos básicos |
| CAT-02 | Buscar por título | P0 | Funcional | Los resultados se filtran según el término ingresado |
| CAT-03 | Buscar por género o desarrollador | P1 | Funcional | La búsqueda encuentra coincidencias en campos adicionales |
| CAT-04 | Aplicar filtros combinados | P0 | Funcional | Búsqueda + filtros funcionan en conjunto sin inconsistencias |
| CAT-05 | Ordenar por score o nombre | P1 | Funcional | El listado cambia de orden correctamente |
| CAT-06 | Cambiar entre vista grid y lista | P1 | UI | La interfaz cambia de presentación sin perder datos |
| CAT-07 | Estado vacío cuando no hay resultados | P1 | Funcional | Se muestra mensaje claro de sin resultados |

### 3.3 Detalle de juego

| ID | Caso de prueba | Prioridad | Tipo | Resultado esperado |
|---|---|---|---|---|
| DET-01 | Abrir detalle de un juego desde catálogo | P0 | Funcional | Se cargan datos completos del juego y se muestra el layout esperado |
| DET-02 | Mostrar score global y breakdown | P0 | Funcional | Los scores se visualizan correctamente y son coherentes |
| DET-03 | Mostrar ediciones disponibles | P0 | Funcional | Se listan las ediciones con beneficios y precios si existen |
| DET-04 | Mostrar trailers y media asociada | P1 | Funcional | Los trailers o recursos multimedia se renderizan correctamente |
| DET-05 | Mostrar juegos similares | P1 | Funcional | Se recomiendan juegos relacionados sin incluir el juego actual |
| DET-06 | Mostrar reseñas de usuarios | P1 | Funcional | Las reseñas cargan y se pueden expandir o visualizar correctamente |
| DET-07 | Manejar juego inexistente o datos incompletos | P1 | Funcional | El sistema muestra un estado de error o vacío controlado |

### 3.4 Wishlist

| ID | Caso de prueba | Prioridad | Tipo | Resultado esperado |
|---|---|---|---|---|
| WIS-01 | Agregar juego a wishlist | P0 | Funcional | El juego se guarda correctamente para el usuario actual |
| WIS-02 | Quitar juego de wishlist | P0 | Funcional | El juego desaparece de la lista y se actualiza la UI |
| WIS-03 | Ver wishlist completa | P0 | Funcional | Se muestran todos los juegos guardados del usuario |
| WIS-04 | Badge de wishlist actualizado | P0 | Funcional | El contador refleja los cambios sin recarga total |
| WIS-05 | Wishlist sin sesión activa | P1 | Seguridad | El sistema evita acciones no autorizadas o redirige a login |
| WIS-06 | Persistencia entre sesiones | P1 | Integración | Los elementos guardados siguen apareciendo tras reiniciar sesión |

### 3.5 Precios y alertas

| ID | Caso de prueba | Prioridad | Tipo | Resultado esperado |
|---|---|---|---|---|
| PRI-01 | Visualizar precios por edición y tienda | P0 | Funcional | Se muestran los precios correspondientes por edición y marketplace |
| PRI-02 | Cambiar de edición en el comparador | P1 | Funcional | Los precios cambian según la selección sin errores |
| PRI-03 | Mostrar historial de precios | P1 | Funcional | Se renderiza el gráfico o datos históricos correctamente |
| PRI-04 | Crear alerta de precio | P0 | Funcional | Se registra la alerta correctamente con el usuario asociado |
| PRI-05 | Recibir o mostrar alerta activa | P1 | Integración | La alerta aparece en el estado correcto y puede gestionarse |
| PRI-06 | Admin gestiona precios | P0 | Funcional | El panel de administración permite crear/editar/eliminar entradas |

### 3.6 Calendario, blog y rankings

| ID | Caso de prueba | Prioridad | Tipo | Resultado esperado |
|---|---|---|---|---|
| CAL-01 | Visualizar calendario de lanzamientos | P1 | Funcional | Los eventos aparecen agrupados por mes o fecha |
| CAL-02 | Mostrar lanzamientos futuros y pasados | P1 | Funcional | La vista ordena y clasifica correctamente la información |
| BLOG-01 | Listar artículos del blog | P1 | Funcional | Se muestran cards con título, fecha, categoría y resumen |
| BLOG-02 | Filtrar artículos por categoría | P1 | Funcional | La lista cambia según el filtro aplicado |
| RANK-01 | Mostrar top de juegos | P1 | Funcional | Se renderiza la lista ordenada con el ranking esperado |
| RANK-02 | Mostrar medallas o jerarquía visual | P2 | UI | Los primeros puestos se distinguen visualmente |

### 3.7 Comunidad

| ID | Caso de prueba | Prioridad | Tipo | Resultado esperado |
|---|---|---|---|---|
| COM-01 | Acceder a la sección de comunidad | P1 | Funcional | La vista carga correctamente con las secciones disponibles |
| COM-02 | Ver listado de foros y grupos | P1 | Funcional | Se muestran grupos, hilos y categorías de manera consistente |
| COM-03 | Abrir un hilo de discusión | P1 | Funcional | Se cargan los mensajes o contenido asociado al hilo |
| COM-04 | Crear o interactuar con contenido de comunidad | P1 | Funcional | Las interacciones se reflejan en la interfaz y se guardan cuando aplica |
| COM-05 | Estado vacío en secciones sin contenido | P1 | Funcional | Se muestra mensaje claro de ausencia de datos |

### 3.8 Autenticación y perfil

| ID | Caso de prueba | Prioridad | Tipo | Resultado esperado |
|---|---|---|---|---|
| AUTH-01 | Registro con email y contraseña | P0 | Funcional | Se crea la cuenta y se genera la sesión correcta |
| AUTH-02 | Login con credenciales válidas | P0 | Funcional | El usuario accede y se muestra su estado autenticado |
| AUTH-03 | Login con credenciales inválidas | P0 | Funcional | Se muestra mensaje claro de error y no se crea sesión |
| AUTH-04 | Login con Google OAuth | P1 | Integración | El flujo redirige y establece sesión correctamente |
| AUTH-05 | Cierre de sesión | P0 | Funcional | La sesión termina y la UI refleja el cambio |
| AUTH-06 | Acceso a perfil de usuario | P0 | Funcional | Se muestran datos del perfil y contenido asociado |
| AUTH-07 | Editar nombre de visualización | P1 | Funcional | El cambio se guarda y se refleja en la interfaz |
| AUTH-08 | Ruta protegida sin sesión | P0 | Seguridad | Se redirige a login o se bloquea el acceso |

### 3.9 Administración

| ID | Caso de prueba | Prioridad | Tipo | Resultado esperado |
|---|---|---|---|---|
| ADM-01 | Acceso al panel admin con permisos válidos | P0 | Seguridad | El admin puede entrar al dashboard |
| ADM-02 | Bloqueo de acceso para usuarios no admin | P0 | Seguridad | El usuario es redirigido o impedido de entrar |
| ADM-03 | Crear juego desde panel admin | P0 | Funcional | Se guarda el juego con los datos obligatorios |
| ADM-04 | Editar juego existente | P0 | Funcional | Los cambios se reflejan correctamente |
| ADM-05 | Eliminar juego | P1 | Funcional | El juego se elimina de la fuente de datos y la UI |
| ADM-06 | Gestionar usuarios | P1 | Funcional | Se pueden listar, buscar y modificar roles si aplica |
| ADM-07 | Gestionar precios y alertas | P1 | Funcional | El panel permite administrar datos de precio sin errores |
| ADM-08 | Validación de formularios vacíos | P0 | Funcional | Los campos obligatorios generan errores claros |

## 4. Matriz de pruebas de interfaz y experiencia

| ID | Caso de prueba | Prioridad | Tipo | Resultado esperado |
|---|---|---|---|---|
| UI-01 | Responsive en desktop y mobile | P0 | UI | La interfaz se adapta sin cortes ni desbordamientos |
| UI-02 | Botones y acciones accesibles | P1 | UI | Los elementos interactivos son visibles y funcionales |
| UI-03 | Estados de carga | P0 | UI | Se muestran loaders o skeletons mientras carga la información |
| UI-04 | Estados de error | P0 | UI | Los fallos muestran mensajes comprensibles y no rompen la vista |
| UI-05 | Navegación con teclado | P1 | Accesibilidad | Se pueden recorrer elementos básicos sin mouse |
| UI-06 | Contraste y legibilidad | P1 | Accesibilidad | El texto y los componentes son legibles en ambos temas |

## 5. Matriz de pruebas no funcionales

| ID | Caso de prueba | Prioridad | Tipo | Resultado esperado |
|---|---|---|---|---|
| NF-01 | Tiempo de carga inicial aceptable | P1 | Rendimiento | La app carga en un tiempo razonable en red normal |
| NF-02 | Comportamiento con red lenta | P1 | Rendimiento | Se muestran estados adecuados y evita bloqueos |
| NF-03 | Manejo de errores de API/Supabase | P0 | Confiabilidad | Los fallos no dejan la UI en estado inconsistente |
| NF-04 | Protección de rutas y permisos | P0 | Seguridad | Solo usuarios autorizados pueden acceder a zonas sensibles |
| NF-05 | Manejo correcto de sesiones expuestas | P1 | Seguridad | La sesión no queda inválida de forma inesperada |
| NF-06 | Compatibilidad en navegadores modernos | P1 | Compatibilidad | Chrome, Edge y Firefox muestran el producto de forma estable |

## 6. Datos de prueba recomendados

- Usuario normal con cuenta válida y otra inválida
- Usuario admin con permisos de administración
- Juegos con diferentes plataformas, ediciones y precios
- Juegos sin trailers, sin reseñas o con datos incompletos
- Alertas activas e inactivas
- Perfiles con avatar, nombre y datos básicos
- Casos de wishlist vacía y con varios elementos

## 7. Criterios de salida

La funcionalidad se considera lista cuando:
- Todos los casos P0 pasan sin errores críticos
- No existen fallos críticos de navegación, autenticación o administración
- La experiencia es estable en los navegadores soportados
- Los errores visibles son controlados y comprensibles para el usuario

## 8. Observaciones

Esta matriz está diseñada para cubrir el producto completo de CriticPixel, incluyendo lo que ya está implementado en las vistas principales del proyecto y las rutas definidas en la aplicación.
