// Runs completely on Vercel's secure backend

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase credentials in environment variables.");
    return res.status(500).json({ error: 'Internal Server Configuration Missing' });
  }
  
  try {
    // Single-row read from the cache table — no aggregation at query time
    const response = await fetch(
      `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/stats_cache?id=eq.1&select=total_visitors,total_completions,most_common_figure,updated_at`,
      {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Supabase stats fetch failed ${response.status}: ${errorText}`);
      return res.status(500).json({ error: 'Could not load stats' });
    }
    
    const rows = await response.json();
    if (!rows.length) {
      return res.status(200).json({ total_visitors: 0, total_completions: 0, most_common_figure: null });
    }
    
    // Cache at Vercel's CDN edge for 5 minutes — stats don't need to be real-time
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    return res.status(200).json(rows[0]);
    
  } catch (error) {
    console.error("Network runtime transmission error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}