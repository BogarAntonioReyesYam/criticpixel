import { updateAllPrices } from './lib/prices.js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log(`[${new Date().toISOString()}] Price update triggered`);

    const result = await updateAllPrices();

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      result,
    });
  } catch (err) {
    console.error('Price update failed:', err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
