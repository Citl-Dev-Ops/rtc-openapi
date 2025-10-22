// Serverless function on Vercel (Node 18+)
// Path: /api/fetchSchedule
export default async function handler(req, res) {
  // Allow only POST (and quick preflight replies if you ever call cross-origin)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { term, subject, campus } = req.body || {};
    const payload = {
      term,
      subject: subject || '',
      campus: campus || ''
    };

    const upstream = await fetch('https://classes.sbctc.edu/api/Schedule/Search', {
      method: 'POST',
      headers: {
        // SBCTC likes explicit JSON headers
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Some public APIs behave better with a UA
        'User-Agent': 'rtc-openapi/1.0 (+https://rtc-openapi.vercel.app)'
      },
      body: JSON.stringify(payload)
    });

    const text = await upstream.text();
    res.status(upstream.status);
    // forward content-type when possible
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    return res.send(text);
  } catch (err) {
    console.error('fetchSchedule error:', err);
    return res.status(502).json({ error: 'Upstream call failed' });
  }
}
