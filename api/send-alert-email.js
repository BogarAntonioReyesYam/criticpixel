import supabase from './lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, email, gameId, gameTitle, gameImage, oldPrice, newPrice } = req.body;

  if (!userId || !email || !gameId || !gameTitle || oldPrice == null || newPrice == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
  }

  const savings = oldPrice - newPrice;
  const percent = Math.round((savings / oldPrice) * 100);
  const gameUrl = `https://criticpixel.vercel.app/#/game/${gameId}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Tahoma,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="text-align:center;margin-bottom:30px;">
          <h1 style="color:#ff6b00;font-size:28px;margin:0;">🕹️ CriticPixel</h1>
        </div>
        <div style="background:#1a1a1a;border-radius:16px;padding:30px;border:1px solid #333;">
          <div style="text-align:center;margin-bottom:20px;">
            <span style="background:#ff6b00;color:#000;padding:6px 16px;border-radius:20px;font-weight:bold;font-size:14px;">
              ⚡ ¡El precio bajó!
            </span>
          </div>
          ${gameImage ? `<div style="text-align:center;margin-bottom:20px;"><img src="${gameImage}" alt="${gameTitle}" style="max-width:100%;border-radius:12px;" /></div>` : ''}
          <h2 style="color:#fff;font-size:22px;text-align:center;margin:0 0 8px;">${gameTitle}</h2>
          <div style="text-align:center;margin-bottom:24px;">
            <span style="color:#666;text-decoration:line-through;font-size:18px;">$${oldPrice.toLocaleString('es-MX')} MXN</span>
            <span style="color:#ff6b00;font-size:28px;font-weight:bold;margin-left:12px;">$${newPrice.toLocaleString('es-MX')} MXN</span>
          </div>
          <div style="background:#0d3d0d;border-radius:12px;padding:16px;text-align:center;margin-bottom:24px;">
            <span style="color:#4ade80;font-size:16px;font-weight:bold;">
              Ahorras $${savings.toLocaleString('es-MX')} MXN (${percent}% off)
            </span>
          </div>
          <div style="text-align:center;">
            <a href="${gameUrl}" style="display:inline-block;background:#ff6b00;color:#000;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:16px;">
              Ver en CriticPixel →
            </a>
          </div>
        </div>
        <p style="color:#555;text-align:center;font-size:12px;margin-top:24px;">
          Recibiste esto porque activaste una alerta de precio en CriticPixel.
        </p>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CriticPixel <onboarding@resend.dev>',
        to: email,
        subject: `⚡ ¡${gameTitle} bajó de precio!`,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Failed to send email', details: err });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: err.message });
  }
}
