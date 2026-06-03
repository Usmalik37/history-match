// Runs completely on Vercel's secure backend

import { createHash } from 'crypto';

const VALID_FIGURES = new Set([
  'einstein', 'tesla', 'jackson', 'vinci',
  'alexander', 'rockefeller', 'musk', 'napoleon', 'curie', 'jobs'
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase credentials in environment variables.");
    return res.status(500).json({ error: 'Internal Server Configuration Missing' });
  }
  
  const { figure_key, figure_name, screen_resolution, user_agent } = req.body;
  
  if (!figure_key || !VALID_FIGURES.has(figure_key)) {
    return res.status(400).json({ error: 'Invalid or missing figure_key' });
  }
  
  const fingerprint = (screen_resolution && user_agent) ?
    createHash('sha256').update(`${user_agent}::${screen_resolution}`).digest('hex').slice(0, 32) :
    null;
  
  try {
    const response = await fetch(
      `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/completions`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          fingerprint,
          figure_key,
          figure_name: figure_name || figure_key
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Supabase completions insert failed ${response.status}: ${errorText}`);
      return res.status(500).json({ error: 'Database rejected completion record' });
    }
    
    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error("Network runtime transmission error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}