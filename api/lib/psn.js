const PSN_SEARCH_API = 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/999';

export async function fetchPSNPrice(gameTitle, storeUrl) {
  try {
    if (storeUrl) {
      const res = await fetch(storeUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html',
        },
      });

      if (res.ok) {
        const html = await res.text();

        const priceMatch = html.match(/"price":\s*(\d+\.?\d*)/i) ||
                          html.match(/"basePrice":\s*(\d+\.?\d*)/i) ||
                          html.match(/data-price="(\d+\.?\d*)"/i);

        if (priceMatch) {
          return {
            currentPrice: parseFloat(priceMatch[1]),
            currency: 'MXN',
            isOnSale: false,
          };
        }
      }
    }

    return null;
  } catch (err) {
    console.error(`PSN price error for "${gameTitle}":`, err.message);
    return null;
  }
}

export async function searchPSNGame(query) {
  try {
    const res = await fetch(
      `https://store.playstation.com/store/api/chihiro/00_09_000/search/US/en/999/?query=${encodeURIComponent(query)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const includes = data?.includes || {};
    const game = includes.standard?.[0] || Object.values(includes)[0]?.[0];
    if (!game) return null;

    return {
      name: game.name,
      price: game.default_sku?.rewards?.[0]?.price || game.default_sku?.price,
      cusa: game.id,
    };
  } catch (err) {
    console.error(`PSN search error for "${query}":`, err.message);
    return null;
  }
}
