export async function fetchXboxPrice(productId, storeUrl) {
  try {
    if (!storeUrl) return null;

    const res = await fetch(storeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!res.ok) return null;

    const html = await res.text();

    const priceMatch = html.match(/"price":\s*"?(\d+\.?\d*)"?/i) ||
                      html.match(/"listPrice":\s*"?(\d+\.?\d*)"?/i) ||
                      html.match(/"msrp":\s*"?(\d+\.?\d*)"?/i) ||
                      html.match(/"Price":\s*"?(\d+\.?\d*)"?/i);

    if (priceMatch) {
      return {
        currentPrice: parseFloat(priceMatch[1]),
        currency: 'USD',
      };
    }

    return null;
  } catch (err) {
    console.error(`Xbox scrape error for ${productId}:`, err.message);
    return null;
  }
}
