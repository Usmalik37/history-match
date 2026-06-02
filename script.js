// ─── State ────────────────────────────────────────────────────────────────────
let currentIdx       = 0;
let activeQuestions  = [];       // questions selected for this run
let appliedScores    = [];       // parallel array: score snapshots before each answer
let isRefinement     = false;
let sortedProfiles   = [];

// ─── Tracking ─────────────────────────────────────────────────────────────────
async function trackDeviceVisit() {
  if (["localhost","127.0.0.1"].includes(window.location.hostname)) return;
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page_path:         window.location.pathname,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        user_agent:        navigator.userAgent
      })
    });
  } catch {}
}

document.addEventListener("DOMContentLoaded", () => {
  trackDeviceVisit();
  updateThemeButtonText(document.documentElement.getAttribute("data-theme") || "light");
  if (document.getElementById("quiz-screen")) resetQuiz();
});

// ─── Theme ────────────────────────────────────────────────────────────────────
function toggleTheme() {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeButtonText(next);
}
function updateThemeButtonText(t) {
  const btn = document.getElementById("theme-toggle-btn");
  if (btn) btn.textContent = t === "dark" ? "Light Mode" : "Dark Mode";
}

// ─── Figures ──────────────────────────────────────────────────────────────────
const figures = {
  einstein: {
    name: "Albert Einstein", subtitle: "The Systems Thinker",
    image: "images/albert-einstein.jpeg",
    pos: "Deep focus, finding hidden patterns in complex problems",
    neg: "Withdrawing from people, ignoring everyday responsibilities",
    desc: "You look at the big picture. When a problem catches your attention, you can't leave it alone — not to finish it, but because it genuinely fascinates you. You do your best thinking alone, in quiet, with no clock running. The risk is that the people around you sometimes feel like interruptions to a conversation you're already having with the problem.",
    fact: "Einstein confessed in his own writing that despite caring deeply about humanity as a concept, he felt a persistent aloofness from actual people — including his own family. He described his wish to withdraw into himself as something that grew stronger with every passing year.",
    score: 0
  },
  tesla: {
    name: "Nikola Tesla", subtitle: "The Visionary Designer",
    image: "images/nikola-tesla.jpg",
    pos: "Pure original ideas, uncompromising creative vision",
    neg: "Commercial blindness, obsessive isolation",
    desc: "Your ideas arrive feeling sacred. You would rather abandon a project entirely than water it down for someone else. You don't naturally think in terms of money, deals, or selling yourself. The world rewards people who can package their vision. You are still deciding whether you care about that.",
    fact: "Tesla died alone in a New York hotel room, deeply in debt, after being systematically outmaneuvered by Edison in the marketplace. He claimed to sleep only two hours a night, washed his hands obsessively, refused to touch hair or pearls, and only stayed in rooms whose number was divisible by three.",
    score: 0
  },
  jackson: {
    name: "Michael Jackson", subtitle: "The Dedicated Creator",
    image: "images/michael-jackson.jpeg",
    pos: "Relentless attention to craft, deep emotional expression",
    neg: "Escaping reality, fragile trust in other people",
    desc: "You feel things at an intensity most people around you can't track. You hold your own work to a standard that feels almost personal — anything less than your best feels like a lie. You are drawn to beauty as a way of making sense of the world. The danger is retreating into controlled environments when real life gets too chaotic.",
    fact: "Jackson rehearsed individual physical moves for hours until they were technically flawless. His perfectionism extended to every production detail on his albums. Because his childhood was stolen by fame and abuse, he spent his adult life constructing controlled environments — including an entire private theme park — to recreate the safety he never had.",
    score: 0
  },
  vinci: {
    name: "Leonardo da Vinci", subtitle: "The Curious Mind",
    image: "images/leonardo-da-vinci.jpg",
    pos: "Cross-domain curiosity, connecting ideas others miss",
    neg: "Leaving things unfinished, losing focus when interest shifts",
    desc: "You are genuinely interested in too many things at once. This makes you brilliant at spotting connections that specialists miss — but it also means projects get dropped the moment something more interesting arrives. Your notebooks are full of brilliant starts. Sometimes the world just needs you to finish one thing.",
    fact: "Researchers at King's College London formally proposed that Leonardo likely had ADHD — his voracious curiosity both powered his genius and constantly derailed his output. He worked on the Mona Lisa for roughly 16 years and died carrying the canvas. His patron the Duke of Milan eventually had him sign a contract with a legal penalty for leaving work unfinished.",
    score: 0
  },
  alexander: {
    name: "Alexander the Great", subtitle: "The Bold Leader",
    image: "images/alexander-the-great.jpeg",
    pos: "Explosive initiative, fearless execution under pressure",
    neg: "Restlessness that never switches off, burning people out",
    desc: "You don't wait for perfect conditions. You move, fix problems mid-flight, and figure out the details while things are already in motion. Sitting still genuinely makes you anxious. The risk is that you treat every challenge like a personal conquest — which exhausts the people who are supposed to be on your side.",
    fact: "Alexander slept with a dagger and a personal copy of the Iliad under his pillow on every campaign, seeing himself as a living Achilles. He conquered the known world by age 32 and was dead at 33. He had no plan for what came after the conquest — because stopping was never part of his psychology.",
    score: 0
  },
  rockefeller: {
    name: "John D. Rockefeller", subtitle: "The Long-Game Builder",
    image: "images/john-d-rockefeller.jpg",
    pos: "Inhuman patience, long-term system thinking",
    neg: "Emotional coldness, seeing people as moving parts in a plan",
    desc: "You play a much longer game than almost everyone around you. While others react, you watch, position, and wait. You see chaos as a chance to build something steady and treat relationships like systems that need tending. Just remember that the people inside those systems are not resources.",
    fact: "During major oil market crashes, while competitors panicked and sold, Rockefeller calmly calculated their desperation and bought them out at deep discounts. He openly said their panic was his greatest competitive advantage. His biographer described his self-control as almost eerie — he never made a decision while emotional.",
    score: 0
  },
  musk: {
    name: "Elon Musk", subtitle: "The Risk Taker",
    image: "images/elon-musk.jpeg",
    pos: "Fresh thinking, moving fast on problems others gave up on",
    neg: "Chaotic personal wake, demanding the unreasonable from others",
    desc: "You want to fix the problems everyone else agreed were unsolvable. You move at a speed that disorients people around you, and you have a habit of declaring things possible before you've fully checked the math. Your best ideas and your biggest messes come from exactly the same place.",
    fact: "When SpaceX nearly ran out of money in 2008, Musk put his last personal reserves into a fourth rocket launch rather than accept failure — it succeeded. He has described running multiple companies simultaneously while barely sleeping as normal. Teams working under him report both breakthrough results and extreme psychological pressure.",
    score: 0
  },
  napoleon: {
    name: "Napoleon Bonaparte", subtitle: "The Outsider Who Rewrote the Rules",
    image: "images/napoleon-bonaparte.jpeg",
    pos: "Sharp strategy, turning being the underdog into an advantage",
    neg: "Ego that overrides good judgment, pushing too far past the limit",
    desc: "You have always felt slightly outside the group that holds power — and instead of accepting that, you used it as fuel. You are not just trying to win; you are trying to redesign the whole system. Your strength is that you outthink people who are playing by rules you've already discarded. Your weakness is that you sometimes keep going long after the smart move was to stop.",
    fact: "Napoleon was Corsican — culturally French but never quite accepted as an insider by Parisian elites. He responded by outworking and outthinking every aristocrat in his path. He rewrote the legal code of France, reorganized its education system, and restructured its banking — all while running military campaigns. He fell not from lack of genius but from an inability to accept that Moscow was a limit.",
    score: 0
  },
  curie: {
    name: "Marie Curie", subtitle: "The Immovable Force",
    image: "images/marie-curie.jpeg",
    pos: "Quiet relentless persistence, letting results do all the talking",
    neg: "Sacrificing personal health and relationships for the work",
    desc: "You don't make noise about what you're doing. You just keep going — through rejection, through doubt, through conditions that would make most people quit. You are not trying to impress anyone. You are trying to get it right. The risk is that you push so deep into the work that everything else — rest, relationships, your own body — becomes secondary.",
    fact: "Curie was the first person ever to win two Nobel Prizes in two different sciences — physics and chemistry. She had to conduct her research in a leaking shed with no proper heating because no French university would give a woman proper lab space. She carried radioactive isotopes in her coat pockets for years. The radiation killed her, and her notebooks are still too radioactive to handle without protective equipment.",
    score: 0
  },
  jobs: {
    name: "Steve Jobs", subtitle: "The Aesthetic Tyrant",
    image: "images/steve-jobs.jpeg",
    pos: "Merging beauty with function, refusing to accept good enough",
    neg: "Brutal to people around him, blind spots in personal relationships",
    desc: "You believe that how something looks and feels is just as important as whether it works — and you hold that standard for everything you touch. You don't tolerate the gap between your vision and the reality in front of you. People either rise to meet your standard or get moved out of the way. The cost of that is real, and the people who paid it weren't always the ones who deserved to.",
    fact: "Jobs was notoriously controlling about details most people consider invisible — the color of internal circuit boards no customer would ever see, the exact radius of the corners on product packaging. Former Apple employees described his feedback style as either this is the greatest thing or this is absolute garbage with no middle ground. He also denied paternity of his first daughter for years while simultaneously naming a product line after her.",
    score: 0
  }
};

// ─── Question Pool ────────────────────────────────────────────────────────────
// Each question has:
//   tags   — trait categories it measures (used for adaptive selection)
//   targets — which figures it primarily distinguishes
//   q      — the question text (plain, concrete, grade-school readable)
//   a      — answer options
//   fx     — score functions, one per answer (index-matched to `a`)

const pool = [
  // ISOLATION / FOCUS
  {
    tags: ["isolation","focus"],
    targets: ["einstein","tesla","curie"],
    q: "You need to finish something really important. Where do you work best?",
    a: [
      "Completely alone. No noise, no people.",
      "Somewhere busy, like a café. Background noise helps me.",
      "With friends nearby, even if we're not talking."
    ],
    fx: [
      () => { figures.einstein.score+=3; figures.tesla.score+=2; figures.curie.score+=2; },
      () => { figures.jobs.score+=2; figures.vinci.score+=2; figures.napoleon.score+=1; },
      () => { figures.alexander.score+=2; figures.jackson.score+=2; figures.rockefeller.score+=1; }
    ]
  },
  {
    tags: ["isolation","trust"],
    targets: ["tesla","jackson","curie"],
    q: "When something goes wrong, what do you usually do first?",
    a: [
      "Go somewhere quiet and deal with it by myself.",
      "Talk to one person I really trust.",
      "Get everyone together and figure it out as a group."
    ],
    fx: [
      () => { figures.tesla.score+=3; figures.curie.score+=2; figures.einstein.score+=1; },
      () => { figures.jackson.score+=2; figures.jobs.score+=2; },
      () => { figures.alexander.score+=3; figures.napoleon.score+=2; figures.rockefeller.score+=1; }
    ]
  },

  // CURIOSITY
  {
    tags: ["curiosity","distraction"],
    targets: ["vinci","einstein"],
    q: "You are reading a book and it mentions a strange animal you've never heard of. What do you do?",
    a: [
      "I put the book down and spend an hour looking it up.",
      "I notice it, but keep reading.",
      "I only look it up if I need to know for the story."
    ],
    fx: [
      () => { figures.vinci.score+=4; figures.einstein.score+=2; figures.tesla.score+=1; },
      () => { figures.alexander.score+=1; figures.napoleon.score+=1; },
      () => { figures.rockefeller.score+=3; figures.jobs.score+=2; figures.curie.score+=1; }
    ]
  },
  {
    tags: ["curiosity","breadth"],
    targets: ["vinci","einstein","tesla"],
    q: "You are really into one hobby. Then you discover a completely different hobby that also seems amazing. What happens?",
    a: [
      "I drop the first one and dive into the new one.",
      "I try to do both at the same time.",
      "I stick with the first one. I hate leaving things unfinished."
    ],
    fx: [
      () => { figures.vinci.score+=4; figures.musk.score+=2; },
      () => { figures.vinci.score+=2; figures.einstein.score+=2; figures.tesla.score+=2; },
      () => { figures.curie.score+=3; figures.rockefeller.score+=2; figures.jackson.score+=2; }
    ]
  },

  // RISK / RECKLESSNESS
  {
    tags: ["recklessness","action"],
    targets: ["musk","alexander"],
    q: "You are running late. There is a shortcut, but there is a 50% chance it gets you completely lost. What do you do?",
    a: [
      "Take it. Worth the risk.",
      "Stick to the normal path. I would rather be safely late.",
      "Look at the map first, then decide."
    ],
    fx: [
      () => { figures.musk.score+=3; figures.alexander.score+=3; figures.napoleon.score+=1; },
      () => { figures.rockefeller.score+=3; figures.curie.score+=2; },
      () => { figures.napoleon.score+=2; figures.einstein.score+=2; figures.jobs.score+=1; }
    ]
  },
  {
    tags: ["recklessness","stakes"],
    targets: ["musk","napoleon","alexander"],
    q: "You saved up money for a whole year. Someone offers you a chance to double it — but you could also lose all of it. Do you take the bet?",
    a: [
      "Yes. If I have done my research, I take it.",
      "No. I worked too hard for that money.",
      "Maybe, but I would only bet half of it."
    ],
    fx: [
      () => { figures.musk.score+=3; figures.napoleon.score+=2; figures.alexander.score+=2; },
      () => { figures.curie.score+=2; figures.rockefeller.score+=3; },
      () => { figures.rockefeller.score+=2; figures.einstein.score+=1; figures.jobs.score+=1; }
    ]
  },

  // SACRIFICE / OBSESSION
  {
    tags: ["sacrifice","obsession"],
    targets: ["curie","tesla","musk"],
    q: "Would you keep working on something you love, even if it was making you sick?",
    a: [
      "Yes. The work is more important than how I feel right now.",
      "No. My health comes first.",
      "I would complain a lot, but I would probably force myself to keep going."
    ],
    fx: [
      () => { figures.curie.score+=4; figures.tesla.score+=3; figures.musk.score+=2; },
      () => { figures.rockefeller.score+=2; figures.vinci.score+=1; },
      () => { figures.jobs.score+=2; figures.napoleon.score+=2; figures.jackson.score+=2; }
    ]
  },
  {
    tags: ["sacrifice","relationships"],
    targets: ["curie","tesla","jobs"],
    q: "You are working on a project you really care about. Your friend needs help right now. What do you do?",
    a: [
      "Keep working. They will understand.",
      "Stop immediately. People always come before projects.",
      "Try to do both — badly."
    ],
    fx: [
      () => { figures.curie.score+=3; figures.tesla.score+=2; figures.jobs.score+=2; },
      () => { figures.jackson.score+=3; figures.alexander.score+=2; },
      () => { figures.vinci.score+=2; figures.musk.score+=2; figures.napoleon.score+=1; }
    ]
  },

  // PERFECTIONISM / CRAFT
  {
    tags: ["idealism","perfectionism"],
    targets: ["jobs","jackson","tesla"],
    q: "You are building a sandcastle. The sun is setting and it is time to go home, but the castle is not perfect yet. What do you do?",
    a: [
      "Stay and fix it in the dark. It has to look right.",
      "Leave it. It was fun to build, and that is what matters.",
      "Knock it down before I leave so no one else messes it up."
    ],
    fx: [
      () => { figures.jobs.score+=4; figures.jackson.score+=3; figures.tesla.score+=2; },
      () => { figures.vinci.score+=3; figures.einstein.score+=2; figures.alexander.score+=1; },
      () => { figures.alexander.score+=3; figures.napoleon.score+=2; figures.musk.score+=1; }
    ]
  },
  {
    tags: ["perfectionism","standards"],
    targets: ["jobs","jackson","curie"],
    q: "You finish a drawing and it looks pretty good, but you know you could do better. What do you do?",
    a: [
      "Start over completely.",
      "Fix the parts that bother me the most.",
      "Leave it. Good enough is fine."
    ],
    fx: [
      () => { figures.jobs.score+=4; figures.jackson.score+=3; figures.curie.score+=2; },
      () => { figures.jackson.score+=2; figures.napoleon.score+=1; figures.einstein.score+=1; },
      () => { figures.vinci.score+=3; figures.alexander.score+=2; figures.musk.score+=1; }
    ]
  },

  // DISCIPLINE / METHOD
  {
    tags: ["discipline","method"],
    targets: ["jackson","curie","rockefeller"],
    q: "You want to learn how to play the piano. How do you start?",
    a: [
      "Practice the same basic notes every single day until I get them perfect.",
      "Try to learn my favourite song immediately by ear.",
      "Read a book about how pianos work before touching one."
    ],
    fx: [
      () => { figures.jackson.score+=4; figures.curie.score+=3; figures.rockefeller.score+=2; },
      () => { figures.musk.score+=3; figures.vinci.score+=2; figures.alexander.score+=1; },
      () => { figures.einstein.score+=3; figures.tesla.score+=2; figures.napoleon.score+=1; }
    ]
  },
  {
    tags: ["discipline","routine"],
    targets: ["rockefeller","curie","jackson"],
    q: "You have a big goal. Which approach sounds most like you?",
    a: [
      "Same routine every day, slow and steady, no shortcuts.",
      "Work in huge bursts when I feel motivated, rest when I do not.",
      "Constantly change my strategy based on what is working."
    ],
    fx: [
      () => { figures.rockefeller.score+=4; figures.curie.score+=3; },
      () => { figures.jackson.score+=2; figures.tesla.score+=2; figures.vinci.score+=2; },
      () => { figures.napoleon.score+=3; figures.musk.score+=2; figures.alexander.score+=1; }
    ]
  },

  // LEADERSHIP / CONTROL
  {
    tags: ["leadership","control"],
    targets: ["alexander","napoleon","jobs"],
    q: "You and your friends are lost in the woods. Everyone is arguing about which way to go. What do you do?",
    a: [
      "Tell everyone to stop talking and declare which way we are going.",
      "Walk off to find the path myself. They will follow when I find it.",
      "Climb the tallest tree to see the whole forest before deciding."
    ],
    fx: [
      () => { figures.alexander.score+=4; figures.napoleon.score+=3; figures.jobs.score+=2; },
      () => { figures.musk.score+=3; figures.tesla.score+=2; figures.jobs.score+=1; },
      () => { figures.einstein.score+=3; figures.vinci.score+=2; figures.rockefeller.score+=2; }
    ]
  },
  {
    tags: ["leadership","ego"],
    targets: ["napoleon","alexander","jobs"],
    q: "Your group voted and chose a plan you think is wrong. What do you do?",
    a: [
      "Push hard to change their minds. I know I am right.",
      "Go along with it but stay ready to say 'I told you so.'",
      "Do my part, but quietly plan a backup just in case."
    ],
    fx: [
      () => { figures.napoleon.score+=4; figures.alexander.score+=3; figures.jobs.score+=2; },
      () => { figures.musk.score+=2; figures.jackson.score+=2; },
      () => { figures.rockefeller.score+=3; figures.einstein.score+=2; figures.curie.score+=1; }
    ]
  },

  // STRATEGY / PATIENCE
  {
    tags: ["manipulation","strategy"],
    targets: ["rockefeller","napoleon"],
    q: "Someone changes the rules of a game right before you win. What do you do?",
    a: [
      "Figure out how to beat them using their own new rules.",
      "Refuse to play. That is not fair.",
      "Make up my own rules to even things out."
    ],
    fx: [
      () => { figures.rockefeller.score+=3; figures.napoleon.score+=3; },
      () => { figures.tesla.score+=2; figures.curie.score+=2; },
      () => { figures.musk.score+=3; figures.jobs.score+=3; figures.alexander.score+=2; }
    ]
  },
  {
    tags: ["patience","long-game"],
    targets: ["rockefeller","curie","einstein"],
    q: "You planted a seed. It will take two years to grow. What do you do while you wait?",
    a: [
      "Check on it every day and keep everything perfect for it.",
      "Plant ten more seeds and forget about the first one.",
      "Try to find a way to make it grow faster."
    ],
    fx: [
      () => { figures.rockefeller.score+=4; figures.curie.score+=3; figures.einstein.score+=2; },
      () => { figures.vinci.score+=3; figures.musk.score+=2; },
      () => { figures.musk.score+=3; figures.napoleon.score+=2; figures.alexander.score+=1; }
    ]
  },

  // OUTSIDER / AMBITION
  {
    tags: ["ambition","outsider"],
    targets: ["napoleon","musk","curie"],
    q: "You are the only person in the room who was not invited. Everyone else belongs there. What do you do?",
    a: [
      "Act like I belong anyway. I will earn my place.",
      "Stay quiet and watch until I understand the room.",
      "Leave and come back when I have a better reason to be there."
    ],
    fx: [
      () => { figures.napoleon.score+=4; figures.musk.score+=3; figures.alexander.score+=2; },
      () => { figures.rockefeller.score+=3; figures.curie.score+=2; figures.einstein.score+=1; },
      () => { figures.curie.score+=2; figures.tesla.score+=2; figures.jobs.score+=1; }
    ]
  },
  {
    tags: ["ambition","drive"],
    targets: ["napoleon","alexander","musk"],
    q: "You just won a competition. What is your first thought?",
    a: [
      "Who is the next, harder thing I can beat?",
      "How do I make sure everyone knows I won this?",
      "Now I can take a break."
    ],
    fx: [
      () => { figures.alexander.score+=4; figures.napoleon.score+=3; figures.musk.score+=2; },
      () => { figures.napoleon.score+=2; figures.jobs.score+=2; },
      () => { figures.vinci.score+=2; figures.einstein.score+=2; figures.rockefeller.score+=1; }
    ]
  },

  // VISION / ORIGINALITY
  {
    tags: ["vision","originality"],
    targets: ["tesla","einstein","vinci"],
    q: "You have a brilliant idea that no one has ever tried before. What do you do?",
    a: [
      "Write it all down and spend weeks developing it alone.",
      "Tell one trusted person and get their reaction first.",
      "Start building it immediately before the excitement fades."
    ],
    fx: [
      () => { figures.tesla.score+=4; figures.einstein.score+=3; },
      () => { figures.vinci.score+=2; figures.curie.score+=2; figures.jobs.score+=1; },
      () => { figures.musk.score+=4; figures.alexander.score+=2; }
    ]
  },
  {
    tags: ["vision","compromise"],
    targets: ["tesla","jobs","jackson"],
    q: "Someone offers to make your idea famous, but only if you change the most important part of it. What do you do?",
    a: [
      "Refuse. I would rather it stays unknown than be ruined.",
      "Negotiate. Maybe we can find a middle ground.",
      "Accept. Getting it out there is better than nothing."
    ],
    fx: [
      () => { figures.tesla.score+=4; figures.jobs.score+=3; figures.jackson.score+=2; },
      () => { figures.napoleon.score+=2; figures.rockefeller.score+=2; },
      () => { figures.musk.score+=3; figures.vinci.score+=2; figures.alexander.score+=1; }
    ]
  },

  // EMOTIONAL / ESCAPE
  {
    tags: ["escape","emotion"],
    targets: ["jackson","tesla","vinci"],
    q: "The real world feels overwhelming lately. What helps you the most?",
    a: [
      "Disappearing into my own creative world — music, art, building things.",
      "Going somewhere completely new and exploring.",
      "Thinking through a really hard problem until everything else fades."
    ],
    fx: [
      () => { figures.jackson.score+=4; figures.tesla.score+=2; },
      () => { figures.vinci.score+=3; figures.alexander.score+=2; figures.musk.score+=1; },
      () => { figures.einstein.score+=4; figures.curie.score+=2; }
    ]
  },
  {
    tags: ["emotion","expression"],
    targets: ["jackson","jobs","napoleon"],
    q: "You feel something very strongly but no one around you seems to care. What do you do?",
    a: [
      "Put all of that feeling into the thing I am making.",
      "Find a way to make people listen — I will not be ignored.",
      "Keep it to myself. Actions matter more than feelings."
    ],
    fx: [
      () => { figures.jackson.score+=4; figures.tesla.score+=2; figures.vinci.score+=1; },
      () => { figures.napoleon.score+=3; figures.alexander.score+=2; figures.musk.score+=1; },
      () => { figures.curie.score+=3; figures.rockefeller.score+=2; figures.einstein.score+=1; }
    ]
  },

  // FINISHING / FOLLOW-THROUGH
  {
    tags: ["finishing","follow-through"],
    targets: ["vinci","musk","vinci"],
    q: "You are halfway through a project when a better idea shows up. What do you do?",
    a: [
      "Drop the current one and start the better idea.",
      "Finish the current one first, no matter how long it takes.",
      "Work on both at the same time."
    ],
    fx: [
      () => { figures.vinci.score+=4; figures.musk.score+=2; },
      () => { figures.curie.score+=3; figures.rockefeller.score+=3; figures.jackson.score+=2; },
      () => { figures.vinci.score+=2; figures.musk.score+=2; figures.tesla.score+=1; }
    ]
  },

  // SYSTEMS / BIG PICTURE
  {
    tags: ["systems","big-picture"],
    targets: ["rockefeller","einstein","napoleon"],
    q: "You notice a small problem that most people are ignoring. What do you do?",
    a: [
      "Watch it carefully. Small things become big things if you ignore them.",
      "Fix it right now before it gets worse.",
      "Write down exactly why it happened so I can prevent it next time."
    ],
    fx: [
      () => { figures.rockefeller.score+=3; figures.napoleon.score+=2; figures.einstein.score+=2; },
      () => { figures.alexander.score+=3; figures.musk.score+=2; },
      () => { figures.einstein.score+=3; figures.curie.score+=2; figures.vinci.score+=2; }
    ]
  }
];

// ─── Contrast / Tiebreaker Questions ─────────────────────────────────────────
// Covers all meaningful close pairs across the 10 figures.
const contrastQ = {
  einstein_tesla: {
    q: "You just had a brilliant idea. What do you do first?",
    a: ["Write down the numbers and equations to see if it is actually true.", "Draw a picture of exactly what it will look like when it is built."],
    fx: [() => figures.einstein.score+=5, () => figures.tesla.score+=5]
  },
  einstein_curie: {
    q: "You are working on a hard problem. What keeps you going?",
    a: ["Pure fascination. I just need to understand how it works.", "The thought of what finding the answer will actually change in the world."],
    fx: [() => figures.einstein.score+=5, () => figures.curie.score+=5]
  },
  tesla_jackson: {
    q: "What matters more to you?",
    a: ["That my idea is original and has never been done before.", "That what I make moves people and makes them feel something."],
    fx: [() => figures.tesla.score+=5, () => figures.jackson.score+=5]
  },
  tesla_vinci: {
    q: "You have a big creative idea. What is the problem?",
    a: ["The world is not ready for it and probably never will be.", "I already have twelve other ideas I have not finished yet."],
    fx: [() => figures.tesla.score+=5, () => figures.vinci.score+=5]
  },
  jackson_jobs: {
    q: "Why does it have to be perfect?",
    a: ["Because anything less feels like a betrayal of the art.", "Because anything less is an insult to the person using it."],
    fx: [() => figures.jackson.score+=5, () => figures.jobs.score+=5]
  },
  jackson_curie: {
    q: "You sacrificed everything for the work. What drove you?",
    a: ["I had to make something beautiful enough to match what I felt inside.", "I just had to know the answer. I could not stop until I found it."],
    fx: [() => figures.jackson.score+=5, () => figures.curie.score+=5]
  },
  vinci_einstein: {
    q: "Your biggest problem is:",
    a: ["I get distracted by every new interesting thing and never finish.", "I focus so hard on one thing that I forget everything else around me."],
    fx: [() => figures.vinci.score+=5, () => figures.einstein.score+=5]
  },
  vinci_musk: {
    q: "You love ideas. But what happens to them?",
    a: ["Most of them stay in my notebooks. I explore them but rarely finish.", "Most of them get built — even if messily and too fast."],
    fx: [() => figures.vinci.score+=5, () => figures.musk.score+=5]
  },
  alexander_napoleon: {
    q: "You are about to take on something enormous. What drives you?",
    a: ["The thrill of the fight and the feeling of being unstoppable.", "Proving to everyone who doubted me that I was always the smartest one."],
    fx: [() => figures.alexander.score+=5, () => figures.napoleon.score+=5]
  },
  alexander_musk: {
    q: "Which sounds more exciting?",
    a: ["Winning something massive right now, today.", "Building something that will still matter in a hundred years."],
    fx: [() => figures.alexander.score+=5, () => figures.musk.score+=5]
  },
  rockefeller_napoleon: {
    q: "Someone is in your way. How do you deal with them?",
    a: ["Outlast them. Wait for them to make a mistake, then move.", "Outmanoeuvre them. Hit them from a direction they are not watching."],
    fx: [() => figures.rockefeller.score+=5, () => figures.napoleon.score+=5]
  },
  rockefeller_curie: {
    q: "You are playing a very long game. What keeps you patient?",
    a: ["I can already see how it ends. The plan is clear.", "I just take the next step. I do not need to see the whole path."],
    fx: [() => figures.rockefeller.score+=5, () => figures.curie.score+=5]
  },
  musk_napoleon: {
    q: "You are taking a huge risk. What is the real reason?",
    a: ["Because no one else was going to fix this, so I had to.", "Because if it works, no one will ever question me again."],
    fx: [() => figures.musk.score+=5, () => figures.napoleon.score+=5]
  },
  jobs_napoleon: {
    q: "You have a vision and people are pushing back. What do you do?",
    a: ["Refuse to compromise. The vision is right and they will see it eventually.", "Find a smarter way to get them to agree without them realising you won."],
    fx: [() => figures.jobs.score+=5, () => figures.napoleon.score+=5]
  },
  curie_tesla: {
    q: "You are working completely alone on something the world does not understand yet. What are you?",
    a: ["Determined. I will keep going until the results prove I was right.", "Certain. I can already see it working in my mind."],
    fx: [() => figures.curie.score+=5, () => figures.tesla.score+=5]
  }
};

// ─── Adaptive Engine ──────────────────────────────────────────────────────────
const TOTAL_QUESTIONS = 7;

function selectAdaptiveQuestions() {
  // First 3: broad coverage — pick from maximally different tag groups
  const broadTags   = ["curiosity","leadership","sacrifice","perfectionism","discipline","recklessness"];
  const broadPool   = pool.filter(q => q.tags.some(t => broadTags.includes(t)));
  const initial     = pickRandom(broadPool, 3);
  const usedIds     = new Set(initial.map(q => q.q));
  return initial;
}

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function getTopFigures(n = 3) {
  return Object.entries(figures)
    .map(([k, v]) => ({ key: k, score: v.score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .filter(f => f.score > 0)
    .map(f => f.key);
}

function selectNextQuestion(usedQs) {
  const tops = getTopFigures(3);
  if (tops.length === 0) {
    // No signal yet — pick random from remaining
    const remaining = pool.filter(q => !usedQs.has(q.q));
    return remaining[Math.floor(Math.random() * remaining.length)] || null;
  }

  // Score each unused question by how well it targets the current top figures
  const scored = pool
    .filter(q => !usedQs.has(q.q))
    .map(q => {
      const overlap = q.targets.filter(t => tops.includes(t)).length;
      const noise   = Math.random() * 0.3; // small randomness so it never feels robotic
      return { q, weight: overlap + noise };
    })
    .sort((a, b) => b.weight - a.weight);

  return scored.length ? scored[0].q : null;
}

// ─── Quiz Flow ────────────────────────────────────────────────────────────────
function startQuiz() {
  for (const k in figures) figures[k].score = 0;
  currentIdx    = 0;
  isRefinement  = false;
  sortedProfiles = [];
  appliedScores = [];

  // Seed with 3 broad questions; remaining 4 chosen adaptively after each answer
  const broadTags = ["curiosity","leadership","sacrifice","perfectionism","discipline","recklessness"];
  const broadPool = pool.filter(q => q.tags.some(t => broadTags.includes(t)));
  const seed      = pickRandom(broadPool, 3);
  activeQuestions = seed;

  document.getElementById('intro-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display  = 'block';
  renderQuestion();
}

function renderQuestion() {
  const q = activeQuestions[currentIdx];

  // Progress
  const total = isRefinement ? activeQuestions.length : TOTAL_QUESTIONS;
  const pct   = isRefinement ? 100 : (currentIdx / total) * 100;
  document.getElementById('progress-bar').style.width   = `${pct}%`;
  document.getElementById('progress-label').textContent = isRefinement
    ? "Final Tie-Breaker"
    : `Question ${currentIdx + 1} of ${total}`;

  document.getElementById('prev-btn').disabled = currentIdx === 0 || isRefinement;
  document.getElementById('next-btn').textContent = "Skip";
  document.getElementById('question-text').textContent = q.q;

  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.a.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.className   = 'option-row-btn';
    btn.textContent = text;
    btn.onclick     = () => selectOption(i, q);
    container.appendChild(btn);
  });
}

function selectOption(idx, qObj) {
  // Snapshot scores before applying (enables undo on back)
  const snapshot = {};
  for (const k in figures) snapshot[k] = figures[k].score;
  appliedScores[currentIdx] = snapshot;

  qObj.fx[idx]();

  // Visual feedback
  const btns = document.getElementById('options-container').children;
  Array.from(btns).forEach((b, i) => {
    if (i === idx) b.classList.add('selected');
    b.disabled = true;
  });

  setTimeout(() => {
    if (isRefinement) { showResults(); return; }

    const usedQs = new Set(activeQuestions.map(q => q.q));

    if (currentIdx < TOTAL_QUESTIONS - 1) {
      // Adaptively pick next question based on scores so far
      if (activeQuestions.length <= currentIdx + 1) {
        const next = selectNextQuestion(usedQs);
        if (next) activeQuestions.push(next);
      }
      currentIdx++;
      renderQuestion();
    } else {
      checkForTies();
    }
  }, 350);
}

function goToPrevQuestion() {
  if (currentIdx === 0 || isRefinement) return;
  // Restore scores to before this question was answered
  const snap = appliedScores[currentIdx];
  if (snap) for (const k in figures) figures[k].score = snap[k];
  appliedScores[currentIdx] = undefined;
  currentIdx--;
  renderQuestion();
}

function goToNextQuestion() {
  if (isRefinement) { showResults(); return; }
  // Skip — no score change, just advance (or finish)
  const usedQs = new Set(activeQuestions.map(q => q.q));
  if (currentIdx < TOTAL_QUESTIONS - 1) {
    if (activeQuestions.length <= currentIdx + 1) {
      const next = selectNextQuestion(usedQs);
      if (next) activeQuestions.push(next);
    }
    currentIdx++;
    renderQuestion();
  } else {
    checkForTies();
  }
}

function checkForTies() {
  sortedProfiles = Object.entries(figures)
    .map(([k, v]) => ({ key: k, ...v }))
    .sort((a, b) => b.score - a.score);

  const [top1, top2] = sortedProfiles;
  if (top1.score > 0 && top1.score - top2.score <= 1) {
    const key = findContrastKey(top1.key, top2.key);
    if (key) {
      isRefinement    = true;
      activeQuestions = [contrastQ[key]];
      currentIdx      = 0;
      renderQuestion();
      return;
    }
  }
  showResults();
}

function findContrastKey(a, b) {
  return contrastQ[`${a}_${b}`] ? `${a}_${b}`
       : contrastQ[`${b}_${a}`] ? `${b}_${a}`
       : null;
}

// ─── Results ──────────────────────────────────────────────────────────────────
function showResults() {
  document.getElementById('quiz-screen').style.display  = 'none';
  document.getElementById('result-screen').style.display = 'block';

  const terminal = document.getElementById('terminal');
  terminal.style.display = 'block';
  terminal.textContent   = '';

  const logs = [
    "Analyzing behavior patterns...",
    "Weighing historical matches...",
    isRefinement ? "Applying final refinement..." : "Finalizing archetype..."
  ];
  let line = 0;
  (function printLine() {
    if (line < logs.length) {
      terminal.textContent += `> ${logs[line++]}\n`;
      setTimeout(printLine, 280);
    } else {
      setTimeout(calculateFinalResult, 150);
    }
  })();
}

function calculateFinalResult() {
  sortedProfiles = Object.entries(figures)
    .map(([k, v]) => ({ key: k, ...v }))
    .sort((a, b) => b.score - a.score);

  const terminal = document.getElementById('terminal');
  if (sortedProfiles[0].score === 0) {
    terminal.textContent += `\n> Insufficient data.\n`;
    const rb = document.getElementById('archetype-result');
    rb.style.display = 'block';
    rb.innerHTML = `
      <div class="procedural-step-block">
        <h1>Nothing to work with</h1>
        <p class="narrative-prose">You skipped every question. Go back and answer at least a few.</p>
        <button class="action-trigger" onclick="resetQuiz()">Start over</button>
      </div>`;
    return;
  }

  terminal.style.display = 'none';
  const rb = document.getElementById('archetype-result');
  rb.innerHTML = '';
  rb.style.display = 'block';
  renderPhaseOne();
}

function renderPhaseOne() {
  const top   = sortedProfiles[0];
  const total = sortedProfiles.reduce((s, f) => s + f.score, 0);
  const pct   = Math.min(Math.round((top.score / (total || 1)) * 160), 99);

  const burstLines = Array.from({ length: 12 }, (_, i) => {
    const a  = (i / 12) * 2 * Math.PI;
    const x1 = (80 + Math.cos(a) * 54).toFixed(1);
    const y1 = (80 + Math.sin(a) * 54).toFixed(1);
    const x2 = (80 + Math.cos(a) * 74).toFixed(1);
    const y2 = (80 + Math.sin(a) * 74).toFixed(1);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--accent)" stroke-width="1" opacity="0.25"/>`;
  }).join('');

  const rb    = document.getElementById('archetype-result');
  const block = document.createElement('div');
  block.className = 'procedural-step-block';
  block.id        = 'result-phase-1';
  block.innerHTML = `
    <div class="profile-identity-lockup">
      <div class="photo-burst-wrap" aria-hidden="true">
        <svg class="photo-burst" width="160" height="160" viewBox="0 0 160 160" fill="none">
          ${burstLines}
          <circle cx="80" cy="80" r="52" stroke="var(--accent)" stroke-width="1"
            stroke-dasharray="3 6" opacity="0.18"/>
        </svg>
        <img src="${top.image}" alt="${top.name}" onerror="this.style.display='none'">
      </div>
      <span class="profile-percentage">${pct}% match</span>
      <h1>${top.name}</h1>
      <div class="profile-subtitle">${top.subtitle}</div>
    </div>
    <button class="action-trigger" onclick="renderPhaseTwo()">
      <span>See what this means</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>`;
  rb.appendChild(block);
}

function renderPhaseTwo() {
  document.querySelector('#result-phase-1 .action-trigger').style.display = 'none';
  const top   = sortedProfiles[0];
  const rb    = document.getElementById('archetype-result');
  const block = document.createElement('div');
  block.className = 'procedural-step-block';
  block.id        = 'result-phase-2';
  block.innerHTML = `
    <p class="narrative-prose">${top.desc}</p>
    <div class="traits-minimal-grid">
      <div>
        <span class="trait-entry-label pos">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
            style="display:inline;vertical-align:middle;margin-right:5px;">
            <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/>
            <polyline points="4 6 5.5 7.5 8 5" stroke="currentColor" stroke-width="1.2"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>Where you are strong
        </span>
        <div class="trait-entry-value">${top.pos}</div>
      </div>
      <div>
        <span class="trait-entry-label neg">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
            style="display:inline;vertical-align:middle;margin-right:5px;">
            <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/>
            <line x1="4" y1="4" x2="8" y2="8" stroke="currentColor" stroke-width="1.2"
              stroke-linecap="round"/>
            <line x1="8" y1="4" x2="4" y2="8" stroke="currentColor" stroke-width="1.2"
              stroke-linecap="round"/>
          </svg>Where you are vulnerable
        </span>
        <div class="trait-entry-value">${top.neg}</div>
      </div>
    </div>
    <button class="action-trigger" onclick="renderPhaseThree()">
      <span>Read the real story</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>`;
  rb.appendChild(block);
  block.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderPhaseThree() {
  document.querySelector('#result-phase-2 .action-trigger').style.display = 'none';
  const top   = sortedProfiles[0];
  const rb    = document.getElementById('archetype-result');
  const block = document.createElement('div');
  block.className = 'procedural-step-block';
  block.innerHTML = `
    <div class="historical-context-card">
      <span class="system-meta" style="margin-bottom:0.5rem;">The real story</span>
      ${top.fact}
    </div>
    <div style="margin-bottom:3rem;">
      <span class="system-meta" style="margin-bottom:0.75rem;">All scores</span>
      <div class="scores-minimal-chart">
        ${sortedProfiles.map(f => `
          <span class="score-tag-item${f.score === top.score ? ' active-high' : ''}">
            ${f.name.split(' ').pop()}: ${f.score}
          </span>`).join('')}
      </div>
    </div>
    <button class="action-trigger" onclick="resetQuiz()"
      style="border-color:var(--accent);color:var(--accent);">
      <span>Take it again</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21.5 2v6h-6"/>
        <path d="M21.34 15.57a10 10 0 1 1-.57-8.38L21.5 8"/>
      </svg>
    </button>`;
  rb.appendChild(block);
  block.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Reset ────────────────────────────────────────────────────────────────────
function resetQuiz() {
  document.getElementById('result-screen').style.display  = 'none';
  const rb = document.getElementById('archetype-result');
  rb.style.display = 'none';
  rb.innerHTML     = '';
  document.getElementById('intro-screen').style.display   = 'block';
}
