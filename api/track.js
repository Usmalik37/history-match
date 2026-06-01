

//Runs completely on Vercels secure backend


export default async function handler(req, res) {
    // Anything but POST gets block
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

 // Safely read keys from environment variables (shouldnot be  exposed to the browser)
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; 

  // Fast-fail check: If Vercel hasn't injected the keys, crash immediately instead of waiting 15 seconds to timeout
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase credentials in environment variables.");
    return res.status(500).json({ error: 'Internal Server Configuration Missing' });
  }

  const { page_path, screen_resolution, user_agent } = req.body;

  try {
       // Talk to Supabase securely from backend <--->  backend
    const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/site_visits`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        page_path: page_path || 'unknown',
        screen_resolution: screen_resolution || 'unknown',
        user_agent: user_agent || 'unknown'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Supabase DB responded with status ${response.status}: ${errorText}`);
      return res.status(500).json({ error: 'Database rejected storage sequence' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Network runtime transmission error:", error);
    return res.status(500).json({ error: 'Internal Server Error Monitoring Transmission' });
  }
}