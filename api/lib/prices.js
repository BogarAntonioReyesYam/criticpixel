import supabase from './supabase.js';
import { fetchXboxPrice } from './xbox.js';
import { fetchPSNPrice } from './psn.js';

const USD_TO_MXN = 17.2;

export async function updateAllPrices() {
  console.log('Starting price update...');

  const { data: marketPrices, error } = await supabase
    .from('market_prices')
    .select('id, game_id, store, platform, store_url, edition_name, price');

  if (error) {
    console.error('Error fetching market prices:', error.message);
    return { updated: 0, errors: 1 };
  }

  if (!marketPrices || marketPrices.length === 0) {
    console.log('No market prices found');
    return { updated: 0, errors: 0 };
  }

  const { data: games } = await supabase
    .from('games')
    .select('id, title');

  const gameMap = {};
  (games || []).forEach(g => { gameMap[g.id] = g.title; });

  let updated = 0;
  let errors = 0;
  let unchanged = 0;

  for (const mp of marketPrices) {
    const gameTitle = gameMap[mp.game_id];
    if (!gameTitle) {
      console.log(`Game not found for market_price ${mp.id}`);
      errors++;
      continue;
    }

    try {
      let newPrice = null;

      const isXbox = mp.platform?.toLowerCase().includes('xbox') || mp.store?.toLowerCase().includes('microsoft');
      const isPS = mp.platform?.toLowerCase().includes('ps') || mp.store?.toLowerCase().includes('playstation');

      if (isXbox) {
        const result = await fetchXboxPrice(null, mp.store_url);
        if (result && result.currentPrice) {
          newPrice = result.currency === 'USD'
            ? Math.round(result.currentPrice * USD_TO_MXN)
            : result.currentPrice;
        }
      } else if (isPS) {
        const result = await fetchPSNPrice(gameTitle, mp.store_url);
        if (result && result.currentPrice) {
          newPrice = result.currency === 'USD'
            ? Math.round(result.currentPrice * USD_TO_MXN)
            : result.currentPrice;
        }
      }

      if (newPrice !== null && newPrice !== mp.price) {
        const { error: updateErr } = await supabase
          .from('market_prices')
          .update({
            price: newPrice,
            updated_at: new Date().toISOString(),
          })
          .eq('id', mp.id);

        if (updateErr) {
          console.error(`Error updating price ${mp.id}:`, updateErr.message);
          errors++;
        } else {
          console.log(`Updated ${gameTitle} (${mp.store}): ${mp.price} -> ${newPrice}`);
          updated++;
        }
      } else {
        unchanged++;
      }

      await sleep(1000);
    } catch (err) {
      console.error(`Error processing ${gameTitle}:`, err.message);
      errors++;
    }
  }

  const result = { updated, unchanged, errors, total: marketPrices.length };
  console.log('Price update complete:', result);
  return result;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
