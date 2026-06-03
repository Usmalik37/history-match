// Runs completely on Vercel's secure backend

import { createHash } from 'crypto';

// Simple in-memory rate limit: max 10 requests per IP per minute
const recentIPs = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const times = (recentIPs.get(ip) || []).filter(t => now - t < 60_000);
  times.push(now);
  recentIPs.set(ip, times);
  return times.length > 10;
}

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
  
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  const { screen_resolution, user_agent } = req.body;
  
  if (!screen_resolution || !user_agent) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Deterministic fingerprint — anonymous, no PII stored directly
  const fingerprint = createHash('sha256')
    .update(`${user_agent}::${screen_resolution}`)
    .digest('hex')
    .slice(0, 32);
  
  const base = SUPABASE_URL.replace(/\/$/, '');
  const headers = {
    'apikey': SUPABASE_SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json'
  };
  
  try {
    // Step 1: Check if this fingerprint already exists
    const checkRes = await fetch(
      `${base}/rest/v1/visitors?fingerprint=eq.${fingerprint}&select=fingerprint,visit_count`, { method: 'GET', headers }
    );
    
    if (!checkRes.ok) {
      const err = await checkRes.text();
      console.error(`Supabase check failed ${checkRes.status}: ${err}`);
      return res.status(500).json({ error: 'Database check failed' });
    }
    
    const existing = await checkRes.json();
    const isNew = existing.length === 0;
    
    if (isNew) {
      // New visitor — INSERT a fresh row (trigger will update stats_cache)
      const insertRes = await fetch(`${base}/rest/v1/visitors`, {
        method: 'POST',
        headers: { ...headers, 'Prefer': 'return=minimal' },
        body: JSON.stringify({
          fingerprint,
          user_agent,
          screen_res: screen_resolution,
          visit_count: 1
        })
      });
      
      if (!insertRes.ok) {
        const err = await insertRes.text();
        console.error(`Supabase insert failed ${insertRes.status}: ${err}`);
        return res.status(500).json({ error: 'Database insert failed' });
      }
      
    } else {
      // Returning visitor — PATCH to increment visit_count and update last_seen
      const current = existing[0].visit_count || 1;
      const updateRes = await fetch(
        `${base}/rest/v1/visitors?fingerprint=eq.${fingerprint}`,
        {
          method: 'PATCH',
          headers: { ...headers, 'Prefer': 'return=minimal' },
          body: JSON.stringify({
            visit_count: current + 1,
            last_seen: new Date().toISOString()
          })
        }
      );
      
      if (!updateRes.ok) {
        const err = await updateRes.text();
        console.error(`Supabase update failed ${updateRes.status}: ${err}`);
        return res.status(500).json({ error: 'Database update failed' });
      }
    }
    
    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error("Network runtime transmission error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}