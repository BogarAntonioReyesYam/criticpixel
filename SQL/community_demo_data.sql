-- ============================================================
-- DATOS DE EJEMPLO - COMUNIDAD
-- Ejecutar DESPUÉS de community.sql
-- ============================================================

-- Obtener IDs de usuarios existentes (usar el primer usuario)
DO $$
DECLARE
  v_user_id UUID;
  v_game_id INTEGER;
  v_thread1_id UUID;
  v_thread2_id UUID;
  v_thread3_id UUID;
  v_review_id INTEGER;
  v_article1_id UUID;
  v_article2_id UUID;
  v_guide1_id UUID;
  v_guide2_id UUID;
  v_group_id UUID;
BEGIN
  -- Obtener primer usuario
  SELECT id INTO v_user_id FROM profiles LIMIT 1;
  
  -- Obtener primer juego
  SELECT id INTO v_game_id FROM games LIMIT 1;

  -- ============================================================
  -- FORO - Hilos de discusión
  -- ============================================================
  
  INSERT INTO forum_threads (game_id, user_id, title, content, is_pinned, views_count, replies_count) VALUES
    (v_game_id, v_user_id, '¿Cuál es el mejor build para el boss final?', 'He estado intentando derrotar al jefe final durante horas. ¿Alguien tiene un build recomendado? Estoy usando una build de fuerza pero no me funciona bien.', true, 234, 12),
    (v_game_id, v_user_id, 'Secretos que encontré en el mapa', 'Después de 50 horas explorando, encontré varios secretos que no vi en ningún guide. ¿Los quieren que los comparta?', false, 156, 8),
    (v_game_id, v_user_id, 'Bug en la misión secundaria #42', 'Alguien más tuvo el bug donde el NPC no aparece? Ya intenté recargar y nada.', false, 89, 5),
    (v_game_id, v_user_id, 'Tier list de armas después del patch 1.2', 'Con el nuevo balance, algunas armas subieron mucho. Hice una tier list actualizada.', false, 312, 15),
    (v_game_id, v_user_id, '¿Vale la pena la edición deluxe?', 'Estoy pensando en comprar la deluxe pero no sé si los cosméticos valen la diferencia de precio.', false, 67, 3);

  -- Obtener IDs de los hilos
  SELECT id INTO v_thread1_id FROM forum_threads ORDER BY created_at DESC LIMIT 1 OFFSET 0;
  SELECT id INTO v_thread2_id FROM forum_threads ORDER BY created_at DESC LIMIT 1 OFFSET 1;
  SELECT id INTO v_thread3_id FROM forum_threads ORDER BY created_at DESC LIMIT 1 OFFSET 2;

  -- Respuestas del foro
  INSERT INTO forum_replies (thread_id, user_id, content, likes_count) VALUES
    (v_thread1_id, v_user_id, 'Yo usé una build de magia con el staff de fuego y funcionó perfecto. Te recomiendo subir inteligencia al máximo.', 5),
    (v_thread1_id, v_user_id, 'La build de arco es la mejor para ese boss. Mantén distancia y esquiva los ataques de área.', 3),
    (v_thread1_id, v_user_id, '¿Qué nivel tienes? Si eres menor de 40 vas a sufrir mucho.', 2),
    (v_thread2_id, v_user_id, '¡Sí por favor! Siempre busco nuevos secretos.', 4),
    (v_thread2_id, v_user_id, 'En la cueva del norte hay una pared falsa que da a una zona secreta con un item legendario.', 7),
    (v_thread3_id, v_user_id, 'A mí me pasó exactamente lo mismo. Creo que es un bug conocido.', 1);

  -- ============================================================
  -- RESEÑAS de ejemplo (si no existen)
  -- ============================================================
  
  IF NOT EXISTS (SELECT 1 FROM reviews LIMIT 1) THEN
    INSERT INTO reviews (game_id, user_id, user_name, text, score, likes_count, dislikes_count) VALUES
      (v_game_id, v_user_id, 'Bary', 'Una obra maestra del gaming. Los gráficos son impresionantes y la historia te atrapa desde el primer minuto. El combate es satisfactorio y hay cientos de horas de contenido.', 9.5, 15, 1),
      (v_game_id, v_user_id, 'Bary', 'Buen juego pero con algunos problemas de rendimiento. La historia es buena pero los side quests son repetitivos. Vale la pena si lo consigues en oferta.', 7.0, 8, 2);
  END IF;

  -- Obtener ID de reseña
  SELECT id INTO v_review_id FROM reviews ORDER BY created_at DESC LIMIT 1;

  -- Comentarios en reseñas
  INSERT INTO review_comments (review_id, user_id, content, likes_count) VALUES
    (v_review_id, v_user_id, 'Totalmente de acuerdo, el combate es lo mejor del juego.', 3),
    (v_review_id, v_user_id, 'A mí la historia no me enganchó tanto pero los gráficos son increíbles.', 2),
    (v_review_id, v_user_id, '¿Alguien sabe si va a salir DLC?', 1);

  -- ============================================================
  -- ETIQUETAS en reseñas
  -- ============================================================
  
  -- Agregar etiquetas a la primera reseña
  INSERT INTO review_tag_votes (review_id, tag_id, user_id)
  SELECT v_review_id, rt.id, v_user_id
  FROM review_tags rt
  WHERE rt.name IN ('Útil', 'Técnica')
  ON CONFLICT DO NOTHING;

  -- ============================================================
  -- ARTÍCULOS de ejemplo
  -- ============================================================
  
  INSERT INTO articles (user_id, title, slug, excerpt, content, category, tags, views_count, likes_count, comments_count, published, featured) VALUES
    (v_user_id, 'Los 10 mejores RPGs de 2026', 'los-10-mejores-rpgs-2026', 'Descubre los RPGs imprescindibles de este año.', '## Los 10 mejores RPGs de 2026\n\nEste año ha sido increíble para los RPGs. Aquí te traemos los que no te puedes perder:\n\n1. **GTA VI** - La experiencia definitiva\n2. **Baldur''s Gate 3** - La obra maestra de Larian\n3. **The Witcher 4** - El regreso de Geralt\n4. **Fable** - Albion renace\n5. **Metaphor: ReFantazio** - El JRPG del año\n\n¿Cuál es tu favorito?', 'news', ARRAY['RPG', '2026', 'Ranking'], 1250, 45, 12, true, true),
    (v_user_id, 'Guía completa para principiantes en Elden Ring', 'guia-elden-ring-principiantes', 'Todo lo que necesitas saber para empezar en Elden Ring.', '## Guía para principiantes\n\nSi recién empiezas en Elden Ring, esta guía es para ti.\n\n### Consejos iniciales:\n- No tengas miedo de morir\n- Explora todo el mapa\n- Habla con todos los NPCs\n- Usa las spirit ashes\n\n### Builds recomendados:\n- Caballero: equilibrado y fácil\n- Mago: daño a distancia\n- Samurá: rápido y con buen daño', 'guide', ARRAY['Elden Ring', 'Guía', 'Principiantes'], 890, 32, 8, true, false),
    (v_user_id, 'Análisis: ¿Nintendo Switch 2 vale la pena?', 'analisis-nintendo-switch-2', 'Review completa de la nueva consola de Nintendo.', '## Nintendo Switch 2 - Análisis\n\nLa nueva consola de Nintendo finalmente está aquí. ¿Pero vale la pena?\n\n### Pros:\n- Gráficos mejorados\n-.backward compatibility\n- Nuevo Joy-Con con rumble mejorado\n\n### Contras:\n- Precio elevado\n- Catálogo limitado al lanzamiento\n- Batería igual que la Switch\n\n### Veredicto: 8/10\nSi eres fan de Nintendo, sí vale la pena. Si buscas potencia, mejor espera.', 'review', ARRAY['Nintendo', 'Switch 2', 'Review'], 2100, 67, 23, true, true),
    (v_user_id, 'Las mejores ofertas de la semana en gaming', 'mejores-ofertas-semana-julio', 'No te pierdas estas ofertas imperdibles.', '## Ofertas de la semana\n\n🎮 **Steam Summer Sale**\n- Elden Ring: $400 MXN (50% off)\n- Baldur''s Gate 3: $700 MXN (30% off)\n\n🎮 **PlayStation Store**\n- Spider-Man 2: $500 MXN\n- God of War Ragnarok: $400 MXN\n\n🎮 **Xbox Game Pass**\n- Starfield GRATIS con Game Pass\n- Forza Motorsport GRATIS', 'news', ARRAY['Ofertas', 'Steam', 'PlayStation', 'Xbox'], 560, 18, 5, true, false);

  -- Obtener IDs de artículos
  SELECT id INTO v_article1_id FROM articles ORDER BY created_at DESC LIMIT 1 OFFSET 0;
  SELECT id INTO v_article2_id FROM articles ORDER BY created_at DESC LIMIT 1 OFFSET 1;

  -- Comentarios en artículos
  INSERT INTO article_comments (article_id, user_id, content) VALUES
    (v_article1_id, v_user_id, '¡Gran lista! Yo agregaría Black Myth Wukong.'),
    (v_article1_id, v_user_id, '¿Por qué no incluyeron a Hades II? Es uno de los mejores del año.'),
    (v_article2_id, v_user_id, 'Muy útil, justo estaba buscando una guía así.');

  -- ============================================================
  -- GUÍAS de ejemplo
  -- ============================================================
  
  INSERT INTO guides (user_id, game_id, title, slug, excerpt, content, difficulty, tags, views_count, likes_count, bookmarks_count, published) VALUES
    (v_user_id, v_game_id, 'Guía completa de coleccionables', 'guia-coleccionables-completa', 'Encuentra todos los coleccionables del juego.', '## Guía de Coleccionables\n\nHay un total de 150 coleccionables repartidos por el mapa.\n\n### Categorías:\n- **Fragmentos de memoria** (50)\n- **Cartas coleccionables** (30)\n- **Pergaminos secretos** (20)\n- **Artesfactos legendarios** (15)\n- **Pinturas ocultas** (35)\n\n### Consejos:\n- Usa el radar de coleccionables\n- Explora cada zona al 100%\n- Algunos solo aparecen de noche', 'beginner', ARRAY['Coleccionables', 'Guía completa'], 450, 12, 28, true),
    (v_user_id, v_game_id, 'Build optimizado para speedrun', 'build-speedrun-optimo', 'El build más rápido para completar el juego.', '## Build para Speedrun\n\n### Stats requeridos:\n- Fuerza: 40\n- Destreza: 30\n- Inteligencia: 20\n\n### Armas:\n- Espada principal: Katana del Trueno\n- Secundaria: Arco de Fuego Rápido\n\n### Rotación de skills:\n1. Golpe rápido\n2. Habilidad especial\n3. Dash\n4. Repetir\n\n### Tiempo récord: 2h 34min', 'advanced', ARRAY['Speedrun', 'Build', 'Optimizado'], 320, 8, 15, true),
    (v_user_id, v_game_id, 'Cómo farmear oro rápidamente', 'farmear-oro-rapidamente', 'Guía para ganar mucho oro en poco tiempo.', '## Farm de Oro\n\n### Método 1: Misiones repetitivas\n- Completa las misiones del gremio\n- Recompensa: 500 oro por misión\n\n### Método 2: Comercio\n- Compra hierro barato\n- Véndelo como lingote\n- Ganancia: 200% margen\n\n### Método 3: Jefes repetidos\n- Derrota al jefe del bosque\n- Loot: 1000-2000 oro\n- Tiempo: 5 minutos', 'intermediate', ARRAY['Oro', 'Farm', 'Económico'], 780, 25, 42, true);

  -- Obtener IDs de guías
  SELECT id INTO v_guide1_id FROM guides ORDER BY created_at DESC LIMIT 1 OFFSET 0;
  SELECT id INTO v_guide2_id FROM guides ORDER BY created_at DESC LIMIT 1 OFFSET 1;

  -- ============================================================
  -- SCREENSHOTS de ejemplo (usando URLs placeholder)
  -- ============================================================
  
  INSERT INTO screenshots (user_id, game_id, image_url, caption, likes_count) VALUES
    (v_user_id, v_game_id, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', 'Mi setup para jugar este juego increíble', 12),
    (v_user_id, v_game_id, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800', 'Momento épico del boss fight', 8),
    (v_user_id, v_game_id, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800', 'El mapa es enorme y hermoso', 15),
    (v_user_id, v_game_id, 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800', 'Noche de gaming con amigos', 6),
    (v_user_id, v_game_id, 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', 'Mi colección de juegos favoritos', 10);

  -- ============================================================
  -- SEGUIDORES de ejemplo
  -- ============================================================
  
  -- No insertar follows porque solo hay un usuario
  -- Los follows se crearán cuando los usuarios interactúen

  -- ============================================================
  -- GRUPOS - Agregar miembros
  -- ============================================================
  
  -- Obtener ID del grupo RPG Masters
  SELECT id INTO v_group_id FROM groups WHERE slug = 'rpg-masters';
  
  IF v_group_id IS NOT NULL AND v_user_id IS NOT NULL THEN
    INSERT INTO group_members (group_id, user_id, role) VALUES
      (v_group_id, v_user_id, 'leader')
    ON CONFLICT DO NOTHING;
    
    -- Actualizar conteo de miembros
    UPDATE groups SET member_count = (
      SELECT COUNT(*) FROM group_members WHERE group_id = v_group_id
    ) WHERE id = v_group_id;
  END IF;

  -- ============================================================
  -- LOGROS COMUNITARIOS - Actualizar conteos
  -- ============================================================
  
  UPDATE community_achievements SET current_count = (
    SELECT COUNT(*) FROM reviews
  ) WHERE key = 'total_reviews_100';

  UPDATE community_achievements SET current_count = (
    SELECT COUNT(*) FROM profiles
  ) WHERE key = 'total_users_50';

  UPDATE community_achievements SET current_count = (
    SELECT COUNT(*) FROM forum_threads
  ) WHERE key = 'total_forum_posts_200';

  -- Marcar como completados los que alcanzaron la meta
  UPDATE community_achievements 
  SET completed = true, completed_at = NOW()
  WHERE current_count >= target_count;

END $$;

-- ============================================================
-- ACTIVIDAD DE EJEMPLO EN FEED
-- ============================================================

DO $$
DECLARE
  v_user_id UUID;
  v_game_title TEXT;
  v_game_slug TEXT;
BEGIN
  SELECT id INTO v_user_id FROM profiles LIMIT 1;
  SELECT title, slug INTO v_game_title, v_game_slug FROM games LIMIT 1;

  IF v_user_id IS NOT NULL THEN
    INSERT INTO activity_feed (user_id, action, target_type, target_id, metadata) VALUES
      (v_user_id, 'review', 'game', v_game_slug, jsonb_build_object('game_title', v_game_title, 'game_slug', v_game_slug, 'score', 9.5)),
      (v_user_id, 'wishlist', 'game', v_game_slug, jsonb_build_object('game_title', v_game_title, 'game_slug', v_game_slug)),
      (v_user_id, 'forum_post', 'thread', 'test', jsonb_build_object('thread_title', '¿Cuál es el mejor build para el boss final?')),
      (v_user_id, 'guide', 'guide', 'test', jsonb_build_object('guide_title', 'Guía completa de coleccionables')),
      (v_user_id, 'screenshot', 'screenshot', 'test', jsonb_build_object('caption', 'Mi setup para jugar')),
      (v_user_id, 'achievement', 'achievement', 'first_review', jsonb_build_object('achievement_name', 'Primera Reseña')),
      (v_user_id, 'review', 'game', v_game_slug, jsonb_build_object('game_title', v_game_title, 'game_slug', v_game_slug, 'score', 7.0));
  END IF;
END $$;
