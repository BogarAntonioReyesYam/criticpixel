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
