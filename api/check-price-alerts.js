import supabase from './lib/supabase.js';

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
    console.log(`[${new Date().toISOString()}] Price alert check started`);

    const { data: alerts, error: alertsError } = await supabase
      .from('price_alerts')
      .select('id, user_id, game_id, target_price, created_at')
      .eq('active', true);

    if (alertsError) throw alertsError;
    if (!alerts || alerts.length === 0) {
      return res.status(200).json({ success: true, checked: 0, triggered: 0 });
    }

    const gameIds = [...new Set(alerts.map(a => a.game_id))];
    const { data: games, error: gamesError } = await supabase
      .from('games')
      .select('id, title, price, image')
      .in('id', gameIds);

    if (gamesError) throw gamesError;

    const gameMap = new Map(games.map(g => [g.id, g]));
    const userIds = [...new Set(alerts.map(a => a.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email, display_name')
      .in('id', userIds);
    const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

    let triggered = 0;
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://criticpixel.vercel.app';

    for (const alert of alerts) {
      const game = gameMap.get(alert.game_id);
      if (!game || !game.price) continue;

      const currentPrice = parseFloat(game.price);
      const targetPrice = parseFloat(alert.target_price);

      if (currentPrice < targetPrice) {
        const profile = profileMap.get(alert.user_id);
        if (!profile?.email) continue;

        await supabase
          .from('notifications')
          .insert({
            user_id: alert.user_id,
            title: '⚡ ¡El precio bajó!',
            message: `${game.title} ahora está en $${currentPrice.toLocaleString('es-MX')} MXN (antes $${targetPrice.toLocaleString('es-MX')} MXN)`,
            type: 'price_alert',
            link: `/game/${game.id}`,
          });

        try {
          await fetch(`${baseUrl}/api/send-alert-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: alert.user_id,
              email: profile.email,
              gameId: game.id,
              gameTitle: game.title,
              gameImage: game.image,
              oldPrice: targetPrice,
              newPrice: currentPrice,
            }),
          });
        } catch (emailErr) {
          console.error(`Email failed for ${profile.email}:`, emailErr.message);
        }

        await supabase
          .from('price_alerts')
          .update({ active: false, triggered_at: new Date().toISOString() })
          .eq('id', alert.id);

        triggered++;
      }
    }

    console.log(`Price alert check: ${alerts.length} checked, ${triggered} triggered`);
    return res.status(200).json({
      success: true,
      checked: alerts.length,
      triggered,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Price alert check failed:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
