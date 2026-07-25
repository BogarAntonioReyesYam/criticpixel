import { createClient } from '@supabase/supabase-js';
import { mockGames } from './src/data/mockGames.js';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Usar Service Role Key si existe para saltar RLS, si no, usar Anon Key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  supabaseKey
);

async function sync() {
  console.log('🚀 Iniciando sincronización masiva a Supabase...');

  for (const game of mockGames) {
    console.log(`📦 Procesando: ${game.title}...`);

    // 1. Insertar Juego
    const { data: gameData, error: gameError } = await supabase
      .from('games')
      .upsert({
        id: game.id,
        title: game.title,
        image: game.image,
        global_score: game.globalScore,
        platforms: game.platforms,
        description: game.description,
        about: game.about,
        developer: game.specs?.desarrollador,
        publisher: game.specs?.editor,
        genre: game.specs?.genero,
        release_date: game.specs?.lanzamiento,
        multiplayer: game.specs?.multijugador,
        rating: game.specs?.clasificación
      })
      .select()
      .single();

    if (gameError) {
      console.error(`❌ Error en juego ${game.title}:`, gameError.message);
      continue;
    }

    // 2. Limpiar ediciones previas del juego para evitar duplicados
    await supabase.from('editions').delete().eq('game_id', game.id);

    // 3. Insertar Ediciones
    if (game.editions) {
      for (const ed of game.editions) {
        const { data: edData, error: edError } = await supabase
          .from('editions')
          .insert({
            game_id: game.id,
            name: ed.name,
            price: ed.price
          })
          .select()
          .single();

        if (edError) {
          console.error(`   ❌ Error en edición ${ed.name}:`, edError.message);
          continue;
        }

        // 4. Insertar Perks de la edición
        if (ed.perks) {
          const perksToInsert = ed.perks.map(p => ({
            edition_id: edData.id,
            title: p.title,
            description: p.description
          }));
          
          await supabase.from('edition_perks').insert(perksToInsert);
        }
      }
    }

    // 4. Insertar Idiomas
    if (game.languages) {
      const langsToInsert = game.languages.map(l => ({
        game_id: game.id,
        lang: l.lang,
        interface: l.interface,
        voices: l.voices,
        subs: l.subs
      }));
      await supabase.from('languages').upsert(langsToInsert);
    }

    // 5. Insertar Reseñas
    if (game.reviews) {
      const reviewsToInsert = game.reviews.map(r => ({
        game_id: game.id,
        user_name: r.user,
        text: r.text,
        score: r.score
      }));
      await supabase.from('reviews').upsert(reviewsToInsert);
    }
  }

  console.log('✅ Sincronización completada con éxito.');
}

sync();
