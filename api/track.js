

//Runs completely on Vercels secure backend
export default async function handler(req, res) {
  // Anything but POST gets block
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Safely read keys from environment variables (shouldnot be  exposed to the browser)
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; 

  const { page_path, screen_resolution, user_agent } = req.body;

  try {
    // Talk to Supabase securely from backend <--->  backend
    const response = await fetch(`${SUPABASE_URL}/rest/v1/site_visits`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        page_path,
        screen_resolution,
        user_agent
      })
    });

    if (!response.ok) throw new Error(`Supabase error status: ${response.status}`);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error Monitoring Transmission' });
  }
}