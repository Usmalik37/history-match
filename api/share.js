export default async function handler(req, res) {
  const figQuery = req.query.fig;
  const fig = typeof figQuery === 'string' ? figQuery.toLowerCase().trim() : '';

  const FIGURES = {
    einstein: { name: "Albert Einstein", subtitle: "The Systems Thinker", desc: "You approach problems with deep curiosity, viewing the world as an interconnected web of systems." },
    tesla: { name: "Nikola Tesla", subtitle: "The Visionary Inventor", desc: "You see the future clearly, driven by unconventional ideas and an obsessive pursuit of innovation." },
    jackson: { name: "Michael Jackson", subtitle: "The Perfectionist Creator", desc: "You pour deep emotion and flawless execution into everything you touch, aiming for timeless impact." },
    vinci: { name: "Leonardo da Vinci", subtitle: "The Polymath Explorer", desc: "Your mind has no borders, fluidly connecting art, science, and endless human curiosity." },
    alexander: { name: "Alexander the Great", subtitle: "The Bold Strategist", desc: "You lead from the front, driven by unstoppable ambition and an instinct for decisive action." },
    rockefeller: { name: "John D. Rockefeller", subtitle: "The Master Disciplinarian", desc: "You build unbreakable structures, using patience, meticulous detail, and scale to dominate." },
    musk: { name: "Elon Musk", subtitle: "The First-Principles Builder", desc: "You break down hard problems to raw physics, betting big on engineering and grand futures." },
    napoleon: { name: "Napoleon Bonaparte", subtitle: "The Tactical Mind", desc: "You turn chaos into order with calculating speed, sharp organization, and supreme self-belief." },
    curie: { name: "Marie Curie", subtitle: "The Resilient Pioneer", desc: "You work quietly through the hardest problems, guided by raw persistence and love for truth." },
    jobs: { name: "Steve Jobs", subtitle: "The Intuitive Designer", desc: "You stand at the intersection of technology and liberal arts, demanding absolute beauty and simplicity." }
  };

  const selected = FIGURES[fig] || {
    name: "History Match",
    subtitle: "Discover Your Historical Alter Ego",
    desc: "Take the scenario-based test to reveal which great thinker or leader matches your core behavior."
  };

  const host = req.headers.host || 'history-match.vercel.app';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const origin = `${protocol}://${host}`;

  const imageUrl = fig && FIGURES[fig] 
    ? `${origin}/images/og/${fig}.png` 
    : `${origin}/images/og/default-card.png`;

  const targetUrl = fig 
    ? `${origin}/index.html?view=${fig}`
    : `${origin}/index.html`;

  const ua = req.headers['user-agent'] || '';
  const isBot = /bot|crawler|spider|crawling|facebookexternalhit|whatsapp|twitterbot|pinterest|linkedin/i.test(ua);

  const redirectScript = isBot ? '' : `<script>window.location.href = "${targetUrl}";</script>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>History Match — ${selected.name}</title>
  
  <meta property="og:type" content="website">
  <meta property="og:url" content="${origin}/api/share?fig=${fig}">
  <meta property="og:title" content="I matched with ${selected.name} (${selected.subtitle})">
  <meta property="og:description" content="${selected.desc}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:type" content="image/png">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${origin}/api/share?fig=${fig}">
  <meta name="twitter:title" content="I matched with ${selected.name} (${selected.subtitle})">
  <meta name="twitter:description" content="${selected.desc}">
  <meta name="twitter:image" content="${imageUrl}">

  ${redirectScript}
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #fbfbfb;
      color: #111111;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    .loader {
      text-align: center;
    }
    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(0,0,0,0.06);
      border-top-color: #111111;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      margin: 0 auto 12px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    p { font-size: 0.85rem; color: #666; }
  </style>
</head>
<body>
  <div class="loader">
    <div class="spinner"></div>
    <p>Opening history match result...</p>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
  return res.status(200).send(html);
}