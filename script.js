// Tracking :)
async function trackDeviceVisit() {
  if (["localhost","127.0.0.1"].includes(window.location.hostname)) return;
  try {
    await fetch('/api/track', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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

//  Theme
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

//  Static Figure Data (no scores — state is separate) 
const FIGURES = {
  einstein: {
    name: "Albert Einstein", subtitle: "The Systems Thinker",
    image: "images/albert-einstein.jpeg",
    pos: "Deep focus, finding hidden patterns in complex problems",
    neg: "Withdrawing from people, ignoring everyday responsibilities",
    desc: "You look at the big picture. When a problem catches your attention, you can't leave it alone — not to finish it, but because it genuinely fascinates you. You do your best thinking alone, in quiet, with no clock running. The risk is that the people around you sometimes feel like interruptions to a conversation you're already having with the problem.",
    fact: "Einstein confessed in his own writing that despite caring deeply about humanity as a concept, he felt a persistent aloofness from actual people — including his own family. He described his wish to withdraw into himself as something that grew stronger with every passing year."
  },
  tesla: {
    name: "Nikola Tesla", subtitle: "The Visionary Designer",
    image: "images/nikola-tesla.jpg",
    pos: "Pure original ideas, uncompromising creative vision",
    neg: "Commercial blindness, obsessive isolation",
    desc: "Your ideas arrive feeling sacred. You would rather abandon a project entirely than water it down for someone else. You don't naturally think in terms of money, deals, or selling yourself. The world rewards people who can package their vision. You are still deciding whether you care about that.",
    fact: "Tesla died alone in a New York hotel room, deeply in debt, after being systematically outmaneuvered by Edison in the marketplace. He claimed to sleep only two hours a night, washed his hands obsessively, refused to touch hair or pearls, and only stayed in rooms whose number was divisible by three."
  },
  jackson: {
    name: "Michael Jackson", subtitle: "The Dedicated Creator",
    image: "images/michael-jackson.jpeg",
    pos: "Relentless attention to craft, deep emotional expression",
    neg: "Escaping reality, fragile trust in other people",
    desc: "You feel things at an intensity most people around you can't track. You hold your own work to a standard that feels almost personal — anything less than your best feels like a lie. You are drawn to beauty as a way of making sense of the world. The danger is retreating into controlled environments when real life gets too chaotic.",
    fact: "Jackson rehearsed individual physical moves for hours until they were technically flawless. His perfectionism extended to every production detail on his albums. Because his childhood was stolen by fame and abuse, he spent his adult life constructing controlled environments — including an entire private theme park — to recreate the safety he never had."
  },
  vinci: {
    name: "Leonardo da Vinci", subtitle: "The Curious Mind",
    image: "images/leonardo-da-vinci.jpg",
    pos: "Cross-domain curiosity, connecting ideas others miss",
    neg: "Leaving things unfinished, losing focus when interest shifts",
    desc: "You are genuinely interested in too many things at once. This makes you brilliant at spotting connections that specialists miss — but it also means projects get dropped the moment something more interesting arrives. Your notebooks are full of brilliant starts. Sometimes the world just needs you to finish one thing.",
    fact: "Researchers at King's College London formally proposed that Leonardo likely had ADHD — his voracious curiosity both powered his genius and constantly derailed his output. He worked on the Mona Lisa for roughly 16 years and died carrying the canvas. His patron the Duke of Milan eventually had him sign a contract with a legal penalty for leaving work unfinished."
  },
  alexander: {
    name: "Alexander the Great", subtitle: "The Bold Leader",
    image: "images/alexander-the-great.jpeg",
    pos: "Explosive initiative, fearless execution under pressure",
    neg: "Restlessness that never switches off, burning people out",
    desc: "You don't wait for perfect conditions. You move, fix problems mid-flight, and figure out the details while things are already in motion. Sitting still genuinely makes you anxious. The risk is that you treat every challenge like a personal conquest — which exhausts the people who are supposed to be on your side.",
    fact: "Alexander slept with a dagger and a personal copy of the Iliad under his pillow on every campaign, seeing himself as a living Achilles. He conquered the known world by age 32 and was dead at 33. He had no plan for what came after the conquest — because stopping was never part of his psychology."
  },
  rockefeller: {
    name: "John D. Rockefeller", subtitle: "The Long-Game Builder",
    image: "images/john-d-rockefeller.jpg",
    pos: "Inhuman patience, long-term system thinking",
    neg: "Emotional coldness, seeing people as moving parts in a plan",
    desc: "You play a much longer game than almost everyone around you. While others react, you watch, position, and wait. You see chaos as a chance to build something steady and treat relationships like systems that need tending. Just remember that the people inside those systems are not resources.",
    fact: "During major oil market crashes, while competitors panicked and sold, Rockefeller calmly calculated their desperation and bought them out at deep discounts. He openly said their panic was his greatest competitive advantage. His biographer described his self-control as almost eerie — he never made a decision while emotional."
  },
  musk: {
    name: "Elon Musk", subtitle: "The Risk Taker",
    image: "images/elon-musk.jpeg",
    pos: "Fresh thinking, moving fast on problems others gave up on",
    neg: "Chaotic personal wake, demanding the unreasonable from others",
    desc: "You want to fix the problems everyone else agreed were unsolvable. You move at a speed that disorients people around you, and you have a habit of declaring things possible before you've fully checked the math. Your best ideas and your biggest messes come from exactly the same place.",
    fact: "When SpaceX nearly ran out of money in 2008, Musk put his last personal reserves into a fourth rocket launch rather than accept failure — it succeeded. He has described running multiple companies simultaneously while barely sleeping as normal. Teams working under him report both breakthrough results and extreme psychological pressure."
  },
  napoleon: {
    name: "Napoleon Bonaparte", subtitle: "The Outsider Who Rewrote the Rules",
    image: "images/napoleon-bonaparte.jpeg",
    pos: "Sharp strategy, turning being the underdog into an advantage",
    neg: "Ego that overrides good judgment, pushing too far past the limit",
    desc: "You have always felt slightly outside the group that holds power — and instead of accepting that, you used it as fuel. You are not just trying to win; you are trying to redesign the whole system. Your strength is that you outthink people who are playing by rules you've already discarded. Your weakness is that you sometimes keep going long after the smart move was to stop.",
    fact: "Napoleon was Corsican — culturally French but never quite accepted as an insider by Parisian elites. He responded by outworking and outthinking every aristocrat in his path. He rewrote the legal code of France, reorganized its education system, and restructured its banking — all while running military campaigns. He fell not from lack of genius but from an inability to accept that Moscow was a limit."
  },
  curie: {
    name: "Marie Curie", subtitle: "The Immovable Force",
    image: "images/marie-curie.jpeg",
    pos: "Quiet relentless persistence, letting results do all the talking",
    neg: "Sacrificing personal health and relationships for the work",
    desc: "You don't make noise about what you're doing. You just keep going — through rejection, through doubt, through conditions that would make most people quit. You are not trying to impress anyone. You are trying to get it right. The risk is that you push so deep into the work that everything else — rest, relationships, your own body — becomes secondary.",
    fact: "Curie was the first person ever to win two Nobel Prizes in two different sciences — physics and chemistry. She had to conduct her research in a leaking shed with no proper heating because no French university would give a woman proper lab space. She carried radioactive isotopes in her coat pockets for years. The radiation killed her, and her notebooks are still too radioactive to handle without protective equipment."
  },
  jobs: {
    name: "Steve Jobs", subtitle: "The Aesthetic Tyrant",
    image: "images/steve-jobs.jpeg",
    pos: "Merging beauty with function, refusing to accept good enough",
    neg: "Brutal to people around him, blind spots in personal relationships",
    desc: "You believe that how something looks and feels is just as important as whether it works — and you hold that standard for everything you touch. You don't tolerate the gap between your vision and the reality in front of you. People either rise to meet your standard or get moved out of the way. The cost of that is real, and the people who paid it weren't always the ones who deserved to.",
    fact: "Jobs was notoriously controlling about details most people consider invisible — the color of internal circuit boards no customer would ever see, the exact radius of the corners on product packaging. Former Apple employees described his feedback style as either this is the greatest thing or this is absolute garbage with no middle ground. He also denied paternity of his first daughter for years while simultaneously naming a product line after her."
  }
};

// Normalized Scoring 
let scores   = {};   
let ceilings = {};   

function initScores() {
  scores   = {};
  ceilings = {};
  for (const k in FIGURES) { scores[k] = 0; ceilings[k] = 0; }

  for (const q of POOL) {
    const figureMaxes = {};
    for (const fx of q.fx) {
      const before = { ...scores };
      const tmp = {};
      for (const k in FIGURES) tmp[k] = 0;
      const tmpScores = { ...tmp };
      applyFx(fx, tmpScores);
      for (const k in FIGURES) {
        figureMaxes[k] = Math.max(figureMaxes[k] || 0, tmpScores[k]);
      }
    }
    for (const k in FIGURES) ceilings[k] += figureMaxes[k] || 0;
  }
}

function applyFx(fx, target) {
  const real = scores;
  scores = target;
  fx();
  scores = real;
}

// ─── Question Pool 
const POOL = [
  // ISOLATION / FOCUS
  {
    tags: ["isolation","focus"],
    targets: ["einstein","tesla","curie"],
    q: "You need to finish something really important. Where do you work best?",
    a: [
      "Alone in a quiet room with the door shut.",
      "Somewhere with background noise — a café or a busy place.",
      "Near other people, even if nobody is talking."
    ],
    fx: [
      () => { scores.einstein+=3; scores.tesla+=2; scores.curie+=2; },
      () => { scores.jobs+=2; scores.vinci+=2; scores.napoleon+=1; },
      () => { scores.alexander+=2; scores.jackson+=2; scores.rockefeller+=1; }
    ]
  },
  {
    tags: ["isolation","trust"],
    targets: ["tesla","jackson","curie"],
    q: "Something goes wrong. What do you do first?",
    a: [
      "Go somewhere quiet and sort it out by myself.",
      "Call one person I actually trust.",
      "Get everyone in the same room and figure it out together."
    ],
    fx: [
      () => { scores.tesla+=3; scores.curie+=2; scores.einstein+=1; },
      () => { scores.jackson+=3; scores.jobs+=1; },
      () => { scores.alexander+=3; scores.napoleon+=2; scores.rockefeller+=1; }
    ]
  },
  {
    tags: ["isolation","recharge"],
    targets: ["einstein","tesla","curie"],
    q: "After a long and stressful week, what actually makes you feel better?",
    a: [
      "Being completely alone. No messages, no people, just quiet.",
      "Doing something creative by myself — music, drawing, building.",
      "Spending time with a small group of people I like."
    ],
    fx: [
      () => { scores.einstein+=3; scores.curie+=2; scores.tesla+=1; },
      () => { scores.jackson+=3; scores.tesla+=2; scores.vinci+=1; },
      () => { scores.alexander+=2; scores.napoleon+=2; scores.rockefeller+=1; }
    ]
  },

  // CURIOSITY 
  {
    tags: ["curiosity","distraction"],
    targets: ["vinci","einstein"],
    q: "You are reading a book and it mentions a strange animal you have never heard of. What do you do?",
    a: [
      "Put the book down and spend an hour reading about the animal.",
      "Notice it, wonder for a second, and keep reading.",
      "Only look it up if knowing about it matters for the story."
    ],
    fx: [
      () => { scores.vinci+=4; scores.einstein+=2; scores.tesla+=1; },
      () => { scores.alexander+=1; scores.napoleon+=1; scores.musk+=1; },
      () => { scores.rockefeller+=3; scores.jobs+=2; scores.curie+=1; }
    ]
  },
  {
    tags: ["curiosity","breadth"],
    targets: ["vinci","musk"],
    q: "You are deep into a hobby you love. Then you discover a completely different one that also seems amazing. What happens?",
    a: [
      "I drop the first one. The new thing is more exciting right now.",
      "I try to do both at the same time — badly, but happily.",
      "I finish what I started. I hate leaving things half-done."
    ],
    fx: [
      () => { scores.vinci+=4; scores.musk+=2; scores.alexander+=1; },
      () => { scores.vinci+=2; scores.einstein+=1; scores.tesla+=1; },
      () => { scores.curie+=3; scores.rockefeller+=3; scores.jackson+=2; }
    ]
  },
  {
    tags: ["curiosity","depth"],
    targets: ["einstein","curie","tesla"],
    q: "You understand how something works. Most people would move on. What do you do?",
    a: [
      "Keep going deeper. There is always something underneath the explanation.",
      "Move on. Knowing how it works is enough.",
      "Look for a way to use what I just learned to do something new."
    ],
    fx: [
      () => { scores.einstein+=4; scores.tesla+=2; scores.curie+=2; },
      () => { scores.napoleon+=2; scores.alexander+=2; scores.rockefeller+=1; },
      () => { scores.musk+=3; scores.vinci+=2; scores.jobs+=1; }
    ]
  },

  //  RISK / ACTION 
  {
    tags: ["recklessness","action"],
    targets: ["musk","alexander"],
    q: "You are running late. There is a shortcut but a real chance it gets you completely lost. What do you do?",
    a: [
      "Take it. If I get lost, I will figure it out.",
      "Stick to the normal path. Being safely late is better than hopelessly lost.",
      "Check a map for thirty seconds, then decide."
    ],
    fx: [
      () => { scores.musk+=3; scores.alexander+=3; scores.napoleon+=1; },
      () => { scores.rockefeller+=3; scores.curie+=2; },
      () => { scores.napoleon+=3; scores.einstein+=2; scores.jobs+=1; }
    ]
  },
  {
    tags: ["recklessness","stakes"],
    targets: ["musk","napoleon","alexander"],
    q: "You saved up money for a whole year. Someone offers you the chance to double it — but you could also lose everything. Do you take it?",
    a: [
      "Yes. I have thought it through. I am taking the bet.",
      "No. I earned that money. I am not gambling it.",
      "Maybe half of it. I am not going all in."
    ],
    fx: [
      () => { scores.musk+=3; scores.napoleon+=2; scores.alexander+=2; },
      () => { scores.curie+=2; scores.rockefeller+=3; scores.einstein+=1; },
      () => { scores.rockefeller+=2; scores.jobs+=2; scores.napoleon+=1; }
    ]
  },
  {
    tags: ["action","speed"],
    targets: ["alexander","musk","napoleon"],
    q: "You have a plan that is 80% ready. Someone says wait until it is perfect. What do you do?",
    a: [
      "Start now. I will fix the other 20% while I move.",
      "Wait. A bad start can ruin everything.",
      "Start, but only share it with one trusted person first."
    ],
    fx: [
      () => { scores.alexander+=4; scores.musk+=3; scores.napoleon+=2; },
      () => { scores.curie+=3; scores.rockefeller+=3; scores.einstein+=1; },
      () => { scores.jobs+=2; scores.napoleon+=2; scores.rockefeller+=1; }
    ]
  },

  // SACRIFICE / OBSESSION 
  {
    tags: ["sacrifice","obsession"],
    targets: ["curie","tesla","musk"],
    q: "Would you keep working on something you really care about, even if it was making you physically sick?",
    a: [
      "Yes. The work matters more than how I feel right now.",
      "No. If I am sick, I stop. My health comes first.",
      "I would keep going but complain the whole time."
    ],
    fx: [
      () => { scores.curie+=4; scores.tesla+=3; scores.musk+=2; },
      () => { scores.rockefeller+=2; scores.vinci+=1; scores.alexander+=1; },
      () => { scores.jobs+=2; scores.napoleon+=2; scores.jackson+=2; }
    ]
  },
  {
    tags: ["sacrifice","relationships"],
    targets: ["curie","tesla","jobs"],
    q: "You are deep in a project you care about. A good friend calls and genuinely needs help. What do you do?",
    a: [
      "Keep working. They will understand.",
      "Stop immediately. People always come before projects.",
      "Try to do both — stretch thin across both."
    ],
    fx: [
      () => { scores.curie+=3; scores.tesla+=2; scores.jobs+=2; },
      () => { scores.jackson+=3; scores.alexander+=2; scores.napoleon+=1; },
      () => { scores.vinci+=2; scores.musk+=2; scores.einstein+=1; }
    ]
  },
  {
    tags: ["sacrifice","obsession","craft"],
    targets: ["jackson","curie","tesla"],
    q: "You have been practising the same thing for eight hours and you still think it is not right. What do you do?",
    a: [
      "Keep going. I will not stop until it feels right.",
      "Stop for the day. Rest makes you better.",
      "Record what I have, listen back, and decide tomorrow."
    ],
    fx: [
      () => { scores.jackson+=4; scores.curie+=3; scores.tesla+=2; },
      () => { scores.vinci+=2; scores.rockefeller+=2; scores.einstein+=1; },
      () => { scores.jobs+=3; scores.napoleon+=1; scores.musk+=1; }
    ]
  },

  // PERFECTIONISM / CRAFT 
  {
    tags: ["perfectionism","idealism"],
    targets: ["jobs","jackson","tesla"],
    q: "You are building a sandcastle. The sun is setting and it is time to leave, but the castle is not perfect. What do you do?",
    a: [
      "Stay and fix it in the dark. It has to look right.",
      "Leave it. Building it was the point.",
      "Knock it down before I go. No one else should touch it."
    ],
    fx: [
      () => { scores.jobs+=4; scores.jackson+=3; scores.tesla+=2; },
      () => { scores.vinci+=3; scores.einstein+=2; scores.alexander+=1; },
      () => { scores.alexander+=3; scores.napoleon+=2; scores.musk+=1; }
    ]
  },
  {
    tags: ["perfectionism","standards"],
    targets: ["jobs","jackson","curie"],
    q: "You finish something and it looks good — but you know you could do better. What do you do?",
    a: [
      "Start over from scratch.",
      "Fix the specific parts that bother me.",
      "Leave it. Good enough is fine if the deadline is real."
    ],
    fx: [
      () => { scores.jobs+=4; scores.jackson+=3; scores.tesla+=2; },
      () => { scores.curie+=2; scores.napoleon+=2; scores.einstein+=1; },
      () => { scores.rockefeller+=2; scores.alexander+=2; scores.musk+=1; }
    ]
  },
  {
    tags: ["perfectionism","visibility"],
    targets: ["jobs","tesla","jackson"],
    q: "You spend two weeks on something no one will ever actually see — the hidden inside of a product. Does that bother you?",
    a: [
      "No. If I know it is messy inside, I cannot leave it that way.",
      "A little. I would rather that time went somewhere visible.",
      "Yes. Invisible work that does not change the outcome is wasted time."
    ],
    fx: [
      () => { scores.jobs+=4; scores.tesla+=2; scores.curie+=2; },
      () => { scores.jackson+=2; scores.vinci+=2; },
      () => { scores.rockefeller+=3; scores.napoleon+=2; scores.musk+=1; }
    ]
  },

  // DISCIPLINE / METHOD 
  {
    tags: ["discipline","method"],
    targets: ["jackson","curie","rockefeller"],
    q: "You want to learn how to play the piano. How do you start?",
    a: [
      "Same basic exercises every single day until they are automatic.",
      "Learn my favourite song immediately, work backwards from there.",
      "Read about how pianos are built and how music theory works first."
    ],
    fx: [
      () => { scores.jackson+=4; scores.curie+=3; scores.rockefeller+=2; },
      () => { scores.musk+=3; scores.vinci+=2; scores.alexander+=1; },
      () => { scores.einstein+=3; scores.tesla+=2; scores.napoleon+=1; }
    ]
  },
  {
    tags: ["discipline","routine"],
    targets: ["rockefeller","curie"],
    q: "You have a goal that will take two years. Which approach sounds most like you?",
    a: [
      "The same routine every day, no shortcuts, no breaks.",
      "Work in huge bursts when I am motivated, rest when I am not.",
      "Constantly adjust the strategy based on what is actually working."
    ],
    fx: [
      () => { scores.rockefeller+=4; scores.curie+=3; scores.einstein+=1; },
      () => { scores.jackson+=2; scores.tesla+=2; scores.vinci+=2; },
      () => { scores.napoleon+=3; scores.musk+=2; scores.alexander+=1; }
    ]
  },

  // LEADERSHIP / CONTROL 
  {
    tags: ["leadership","control"],
    targets: ["alexander","napoleon","jobs"],
    q: "You and your friends are lost in the woods and everyone is arguing. What do you do?",
    a: [
      "Tell everyone to stop talking and declare which way we are going.",
      "Walk off to find the path myself. They will follow when I find it.",
      "Climb the tallest tree to see the whole forest before deciding anything."
    ],
    fx: [
      () => { scores.alexander+=4; scores.napoleon+=3; scores.jobs+=2; },
      () => { scores.musk+=3; scores.tesla+=2; scores.jobs+=1; },
      () => { scores.einstein+=3; scores.vinci+=2; scores.rockefeller+=2; }
    ]
  },
  {
    tags: ["leadership","ego"],
    targets: ["napoleon","alexander","jobs"],
    q: "The group voted on a plan you are certain is wrong. What do you do?",
    a: [
      "Push hard to change their minds. I know I am right.",
      "Go along with it but quietly track everything so I can say I told you so.",
      "Do my part, but build a backup plan on the side."
    ],
    fx: [
      () => { scores.napoleon+=4; scores.alexander+=3; scores.jobs+=2; },
      () => { scores.musk+=2; scores.jackson+=2; scores.napoleon+=1; },
      () => { scores.rockefeller+=3; scores.einstein+=2; scores.curie+=1; }
    ]
  },
  {
    tags: ["leadership","loyalty"],
    targets: ["alexander","rockefeller","napoleon"],
    q: "Someone on your team keeps making mistakes. What do you do?",
    a: [
      "Give them one direct conversation. If it keeps happening, they are out.",
      "Understand why it is happening first. Maybe the problem is the system, not them.",
      "Quietly move them to something they cannot get wrong."
    ],
    fx: [
      () => { scores.alexander+=3; scores.jobs+=3; scores.napoleon+=2; },
      () => { scores.einstein+=2; scores.vinci+=2; scores.curie+=2; },
      () => { scores.rockefeller+=4; scores.napoleon+=2; scores.musk+=1; }
    ]
  },

  //  STRATEGY / PATIENCE 
  {
    tags: ["strategy","manipulation"],
    targets: ["rockefeller","napoleon"],
    q: "Someone changes the rules of a game right before you are about to win. What do you do?",
    a: [
      "Figure out how to beat them using their own new rules.",
      "Refuse to play. That is not fair and I am not pretending it is.",
      "Make up my own rules to level it back out."
    ],
    fx: [
      () => { scores.rockefeller+=3; scores.napoleon+=3; scores.jobs+=1; },
      () => { scores.tesla+=2; scores.curie+=2; scores.einstein+=1; },
      () => { scores.musk+=3; scores.alexander+=2; scores.napoleon+=1; }
    ]
  },
  {
    tags: ["patience","long-game"],
    targets: ["rockefeller","curie","einstein"],
    q: "You planted a seed that will take two years to grow. What do you do while you wait?",
    a: [
      "Check on it every day. Keep everything perfect for it.",
      "Plant ten more seeds and stop thinking about the first one.",
      "Try to find a way to make it grow faster."
    ],
    fx: [
      () => { scores.rockefeller+=4; scores.curie+=3; scores.einstein+=1; },
      () => { scores.vinci+=3; scores.musk+=2; scores.alexander+=1; },
      () => { scores.musk+=3; scores.napoleon+=2; scores.tesla+=1; }
    ]
  },
  {
    tags: ["strategy","observation"],
    targets: ["rockefeller","napoleon","einstein"],
    q: "You walk into a party where you do not know anyone. What do you actually do?",
    a: [
      "Find a quiet spot and watch. I learn more by observing first.",
      "Start talking to someone immediately. Waiting is a waste of time.",
      "Find the most interesting-looking person and go straight to them."
    ],
    fx: [
      () => { scores.rockefeller+=3; scores.einstein+=2; scores.curie+=2; },
      () => { scores.alexander+=3; scores.napoleon+=2; scores.musk+=1; },
      () => { scores.napoleon+=3; scores.jobs+=2; scores.vinci+=1; }
    ]
  },

  // ── OUTSIDER / AMBITION  
  {
    tags: ["ambition","outsider"],
    targets: ["napoleon","musk","curie"],
    q: "You are the only person in the room who was not invited. Everyone else clearly belongs there. What do you do?",
    a: [
      "Act like I belong anyway. I will earn my place while I am here.",
      "Stay quiet and watch until I understand how the room works.",
      "Leave and come back when I have a stronger reason to be there."
    ],
    fx: [
      () => { scores.napoleon+=4; scores.musk+=3; scores.alexander+=2; },
      () => { scores.rockefeller+=3; scores.curie+=2; scores.einstein+=1; },
      () => { scores.curie+=2; scores.tesla+=2; scores.jobs+=2; }
    ]
  },
  {
    tags: ["ambition","drive"],
    targets: ["napoleon","alexander","musk"],
    q: "You just won something big. What is your first thought?",
    a: [
      "What is the next, harder thing I can go after?",
      "How do I make sure people understand what I just did?",
      "Finally. Now I can breathe."
    ],
    fx: [
      () => { scores.alexander+=4; scores.napoleon+=2; scores.musk+=2; },
      () => { scores.napoleon+=3; scores.jobs+=2; scores.musk+=1; },
      () => { scores.vinci+=2; scores.einstein+=2; scores.curie+=2; }
    ]
  },
  {
    tags: ["ambition","resistance"],
    targets: ["curie","napoleon","tesla"],
    q: "People keep telling you that what you are trying to do is impossible. How does that affect you?",
    a: [
      "It makes me more determined. Doubt is just noise.",
      "It makes me want to prove them wrong in the most obvious way possible.",
      "It makes me re-examine my approach — maybe they are seeing something I am missing."
    ],
    fx: [
      () => { scores.curie+=4; scores.tesla+=2; scores.einstein+=2; },
      () => { scores.napoleon+=4; scores.musk+=2; scores.alexander+=2; },
      () => { scores.rockefeller+=3; scores.vinci+=2; scores.jobs+=1; }
    ]
  },

  // VISION / ORIGINALITY
  {
    tags: ["vision","originality"],
    targets: ["tesla","einstein","vinci"],
    q: "You have a brilliant idea no one has ever tried before. What is your first instinct?",
    a: [
      "Spend weeks developing it quietly before showing anyone.",
      "Tell one trusted person and see how they react.",
      "Start building something immediately before the feeling fades."
    ],
    fx: [
      () => { scores.tesla+=4; scores.einstein+=3; scores.curie+=1; },
      () => { scores.vinci+=2; scores.curie+=2; scores.jobs+=1; },
      () => { scores.musk+=4; scores.alexander+=2; scores.napoleon+=1; }
    ]
  },
  {
    tags: ["vision","compromise"],
    targets: ["tesla","jobs","jackson"],
    q: "Someone offers to make your idea famous — but only if you change the most important part of it. What do you do?",
    a: [
      "Refuse. I would rather it stays unknown than become something it is not.",
      "Negotiate. Maybe there is a version that works for both of us.",
      "Accept. Getting it out there is better than keeping it perfect in a drawer."
    ],
    fx: [
      () => { scores.tesla+=4; scores.jobs+=3; scores.jackson+=2; },
      () => { scores.napoleon+=2; scores.rockefeller+=2; scores.vinci+=1; },
      () => { scores.musk+=3; scores.vinci+=2; scores.alexander+=1; }
    ]
  },

  // EMOTIONAL / ESCAPE
  {
    tags: ["escape","emotion"],
    targets: ["jackson","tesla","vinci"],
    q: "The real world feels overwhelming. What actually helps?",
    a: [
      "Disappearing into something creative — music, art, building.",
      "Going somewhere new and exploring.",
      "Sitting with one hard problem until everything else goes quiet."
    ],
    fx: [
      () => { scores.jackson+=4; scores.tesla+=2; scores.vinci+=1; },
      () => { scores.vinci+=3; scores.alexander+=2; scores.musk+=1; },
      () => { scores.einstein+=4; scores.curie+=2; scores.rockefeller+=1; }
    ]
  },
  {
    tags: ["emotion","expression"],
    targets: ["jackson","napoleon","jobs"],
    q: "You feel something very strongly but nobody around you seems to care. What do you do?",
    a: [
      "Put that feeling into whatever I am making.",
      "Find a way to make people listen. I will not be invisible.",
      "Keep it to myself. What matters is what you actually do, not what you feel."
    ],
    fx: [
      () => { scores.jackson+=4; scores.tesla+=2; scores.vinci+=1; },
      () => { scores.napoleon+=3; scores.alexander+=2; scores.musk+=1; },
      () => { scores.curie+=3; scores.rockefeller+=2; scores.einstein+=1; }
    ]
  },
  {
    tags: ["emotion","trust"],
    targets: ["jackson","tesla","curie"],
    q: "Someone you trusted completely let you down. How do you respond?",
    a: [
      "Withdraw. I become much more careful about who gets close to me.",
      "Confront them directly. I need them to understand what they did.",
      "Move on quietly. People let you down. That is just how it goes."
    ],
    fx: [
      () => { scores.jackson+=3; scores.tesla+=3; scores.einstein+=1; },
      () => { scores.napoleon+=3; scores.alexander+=2; scores.jobs+=1; },
      () => { scores.rockefeller+=3; scores.curie+=2; scores.musk+=1; }
    ]
  },

  //SYSTEMS / BIG PICTURE 
  {
    tags: ["systems","big-picture"],
    targets: ["rockefeller","einstein","napoleon"],
    q: "You notice a small problem that everyone else is walking past. What do you do?",
    a: [
      "Watch it carefully. Small things become big things if you ignore them.",
      "Fix it right now before it grows.",
      "Write down why it happened so I can stop it from recurring."
    ],
    fx: [
      () => { scores.rockefeller+=3; scores.napoleon+=2; scores.einstein+=1; },
      () => { scores.alexander+=3; scores.musk+=2; scores.napoleon+=1; },
      () => { scores.einstein+=3; scores.curie+=2; scores.vinci+=2; }
    ]
  },
  {
    tags: ["systems","planning"],
    targets: ["rockefeller","napoleon","einstein"],
    q: "You are organising something big. What does your process actually look like?",
    a: [
      "I map out every step and every possible failure point before I move.",
      "I set the goal and the deadline and figure out the steps as I go.",
      "I find the right people and let them own their parts."
    ],
    fx: [
      () => { scores.rockefeller+=3; scores.einstein+=2; scores.napoleon+=2; },
      () => { scores.musk+=3; scores.alexander+=2; scores.vinci+=1; },
      () => { scores.napoleon+=3; scores.jobs+=2; scores.rockefeller+=1; }
    ]
  },

  // FINISHING / FOLLOW-THROUGH
  {
    tags: ["finishing","follow-through"],
    targets: ["vinci","curie","rockefeller"],
    q: "You are halfway through a project when a clearly better idea shows up. What do you do?",
    a: [
      "Drop the current one. The better idea is the point.",
      "Finish the current one no matter how long it takes.",
      "Work on both at once even if that means both take longer."
    ],
    fx: [
      () => { scores.vinci+=4; scores.musk+=2; scores.alexander+=1; },
      () => { scores.curie+=3; scores.rockefeller+=3; scores.jackson+=2; },
      () => { scores.vinci+=2; scores.musk+=2; scores.tesla+=1; }
    ]
  },
  {
    tags: ["finishing","accountability"],
    targets: ["curie","jobs","rockefeller"],
    q: "You made a commitment to something. Life gets complicated and it is easier to back out. What do you do?",
    a: [
      "Honour it no matter what. I said I would, so I will.",
      "Back out and be honest about why. People understand.",
      "Find a smaller version of the commitment I can still deliver."
    ],
    fx: [
      () => { scores.curie+=3; scores.jobs+=2; scores.rockefeller+=3; },
      () => { scores.vinci+=2; scores.napoleon+=1; scores.musk+=2; },
      () => { scores.napoleon+=2; scores.rockefeller+=2; scores.einstein+=1; }
    ]
  }
];

// Contrast / Tiebreaker Questions 
const CONTRAST = {
  einstein_tesla:     { q: "You just had a breakthrough idea. What do you do first?", a: ["Write down the equations to prove it is actually true.", "Draw a picture of exactly what it will look like when it exists."], fx: [() => scores.einstein+=5, () => scores.tesla+=5] },
  einstein_curie:     { q: "What keeps you going when a problem gets very hard?", a: ["Pure curiosity. I just need to understand it.", "The thought of what solving it will change for other people."], fx: [() => scores.einstein+=5, () => scores.curie+=5] },
  einstein_vinci:     { q: "Your biggest problem is:", a: ["I focus so hard on one thing that I forget everything else exists.", "I get excited by every new thing and never quite finish the last one."], fx: [() => scores.einstein+=5, () => scores.vinci+=5] },
  tesla_jackson:      { q: "What matters more to you?", a: ["That what I made has never been done before.", "That what I made makes people actually feel something."], fx: [() => scores.tesla+=5, () => scores.jackson+=5] },
  tesla_vinci:        { q: "You have a huge creative idea. What is the problem?", a: ["The world is not ready for it and probably never will be.", "I already have twelve other ideas I have not finished."], fx: [() => scores.tesla+=5, () => scores.vinci+=5] },
  tesla_curie:        { q: "You are working alone on something nobody understands yet. What are you?", a: ["Certain. I can already see it working perfectly in my mind.", "Determined. I will keep going until the results speak for themselves."], fx: [() => scores.tesla+=5, () => scores.curie+=5] },
  jackson_jobs:       { q: "Why does it have to be perfect?", a: ["Because anything less is a betrayal of what the art is supposed to be.", "Because anything less is an insult to the person who is going to use it."], fx: [() => scores.jackson+=5, () => scores.jobs+=5] },
  jackson_curie:      { q: "You gave everything to the work. What actually drove you?", a: ["I had to make something beautiful enough to match what I felt inside.", "I just had to find the answer. Stopping was never really an option."], fx: [() => scores.jackson+=5, () => scores.curie+=5] },
  vinci_musk:         { q: "You love new ideas. But what actually happens to them?", a: ["Most live in notebooks. I explore them but rarely finish.", "Most get built — fast, messy, imperfect, but real."], fx: [() => scores.vinci+=5, () => scores.musk+=5] },
  alexander_napoleon: { q: "You are about to do something enormous. What is actually driving you?", a: ["The thrill of it. The feeling of being completely unstoppable.", "Proving to every person who doubted me that I was always the smartest one in the room."], fx: [() => scores.alexander+=5, () => scores.napoleon+=5] },
  alexander_musk:     { q: "Which one sounds more exciting to you?", a: ["Winning something massive right now, today.", "Building something that will still matter in a hundred years."], fx: [() => scores.alexander+=5, () => scores.musk+=5] },
  rockefeller_napoleon: { q: "Someone is in your way. How do you actually deal with them?", a: ["Outlast them. Wait for them to make a mistake, then move.", "Outmanoeuvre them. Hit them from a direction they are not watching."], fx: [() => scores.rockefeller+=5, () => scores.napoleon+=5] },
  rockefeller_curie:  { q: "You are playing a very long game. What keeps you patient?", a: ["I can already see exactly how it ends. The plan is clear.", "I just take the next step. I do not need to see the whole path at once."], fx: [() => scores.rockefeller+=5, () => scores.curie+=5] },
  rockefeller_einstein: { q: "You are watching something everyone else is ignoring. Why?", a: ["Because I can already see the opportunity inside it.", "Because I want to understand it before I decide what to do."], fx: [() => scores.rockefeller+=5, () => scores.einstein+=5] },
  musk_napoleon:      { q: "You are taking an enormous risk. What is the real reason?", a: ["Nobody else was going to fix this, so I had to.", "If it works, nobody will ever question me again."], fx: [() => scores.musk+=5, () => scores.napoleon+=5] },
  musk_alexander:     { q: "You are moving fast and people around you cannot keep up. What do you think?", a: ["I do not slow down. The mission matters more.", "I find the right people who can match the pace. Then I go faster."], fx: [() => scores.musk+=5, () => scores.alexander+=5] },
  jobs_napoleon:      { q: "People are pushing back against your vision. What do you do?", a: ["Refuse to compromise. The vision is right and they will see it eventually.", "Find a smarter way to bring them along without them realising you already won."], fx: [() => scores.jobs+=5, () => scores.napoleon+=5] },
  jobs_rockefeller:   { q: "What matters more at the end?", a: ["That it was beautiful and exactly what it should have been.", "That it worked and the numbers proved it."], fx: [() => scores.jobs+=5, () => scores.rockefeller+=5] },
  curie_einstein:     { q: "You keep working alone when everyone else has stopped. Why?", a: ["Because I have not found the answer yet and I need to.", "Because I am not done thinking yet."], fx: [() => scores.curie+=5, () => scores.einstein+=5] }
};

// Adaptive Engine
const TOTAL_QS = 9;  

function selectNextQ(used) {
  const topKeys = getTopFigures(4);
  const unused  = POOL.filter(q => !used.has(q.q));
  if (!unused.length) return null;

  if (!topKeys.length) return unused[Math.floor(Math.random() * unused.length)];

  const weighted = unused.map(q => {
    const overlap  = q.targets.filter(k => topKeys.includes(k)).length;
    const tagDupe  = q.tags.filter(t => usedTags.has(t)).length;
    const noise    = Math.random() * 0.4;
    return { q, score: overlap * 2 - tagDupe * 0.5 + noise };
  }).sort((a, b) => b.score - a.score);

  return weighted[0].q;
}

function getTopFigures(n = 3) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .filter(([, s]) => s > 0)
    .map(([k]) => k);
}

// Quiz State 
let activeQs      = [];
let snapshots     = [];   
let usedTags      = new Set();
let currentIdx    = 0;
let isRefinement  = false;
let sortedResults = [];

// Disclaimer Screen 
function showDisclaimer() {
  document.getElementById('intro-screen').style.display = 'none';
  const disc = document.getElementById('disclaimer-screen');
  disc.style.display = 'block';
}

function startFromDisclaimer() {
  document.getElementById('disclaimer-screen').style.display = 'none';
  beginQuiz();
}

// Quiz Start 
function startQuiz() {
  showDisclaimer();
}

function beginQuiz() {
  scores        = {};
  for (const k in FIGURES) scores[k] = 0;
  activeQs      = [];
  snapshots     = [];
  usedTags      = new Set();
  currentIdx    = 0;
  isRefinement  = false;
  sortedResults = [];

  const seedTags  = ["curiosity", "leadership", "sacrifice", "recklessness", "perfectionism", "discipline"];
  const seedPool  = POOL.filter(q => q.tags.some(t => seedTags.includes(t)));
  const shuffled  = [...seedPool].sort(() => Math.random() - 0.5);

  const seeds = [];
  const seenT = new Set();
  for (const q of shuffled) {
    if (seeds.length === 3) break;
    if (!q.tags.some(t => seenT.has(t))) {
      seeds.push(q);
      q.tags.forEach(t => seenT.add(t));
    }
  }
  activeQs = seeds.length === 3 ? seeds : shuffled.slice(0, 3);
  seeds.forEach(q => q.tags.forEach(t => usedTags.add(t)));

  document.getElementById('quiz-screen').style.display = 'block';
  renderQuestion();
}

// Render 
function renderQuestion() {
  const q     = activeQs[currentIdx];
  const total = isRefinement ? activeQs.length : TOTAL_QS;
  const pct   = isRefinement ? 100 : (currentIdx / total) * 100;

  document.getElementById('progress-bar').style.width   = `${pct}%`;
  document.getElementById('progress-label').textContent = isRefinement
    ? "Final question"
    : `Question ${currentIdx + 1} of ${total}`;

  document.getElementById('prev-btn').disabled       = currentIdx === 0 || isRefinement;
  document.getElementById('next-btn').textContent    = "Skip →";
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

// Selection
function selectOption(idx, qObj) {
  snapshots[currentIdx] = { ...scores };

  qObj.fx[idx]();

  if (qObj.tags) {
    qObj.tags.forEach(t => usedTags.add(t));
  }

  Array.from(document.getElementById('options-container').children)
    .forEach((b, i) => { if (i === idx) b.classList.add('selected'); b.disabled = true; });

  setTimeout(() => {
    if (isRefinement) { showResults(); return; }

    const usedSet = new Set(activeQs.map(q => q.q));

    if (currentIdx < TOTAL_QS - 1) {
      if (activeQs.length <= currentIdx + 1) {
        const next = selectNextQ(usedSet);
        if (next) { activeQs.push(next); if (next.tags) next.tags.forEach(t => usedTags.add(t)); }
      }
      currentIdx++;
      renderQuestion();
    } else {
      checkForTies();
    }
  }, 350);
}

// Navigation
function goToPrevQuestion() {
  if (currentIdx === 0 || isRefinement) return;
  if (snapshots[currentIdx]) {
    scores = { ...snapshots[currentIdx] };
    snapshots[currentIdx] = undefined;
  }
  usedTags = new Set();
  activeQs.slice(0, currentIdx).forEach(q => {
    if (q.tags) q.tags.forEach(t => usedTags.add(t));
  });

  currentIdx--;
  renderQuestion();
}

function goToNextQuestion() {
  if (isRefinement) { showResults(); return; }
  const usedSet = new Set(activeQs.map(q => q.q));
  if (currentIdx < TOTAL_QS - 1) {
    if (activeQs.length <= currentIdx + 1) {
      const next = selectNextQ(usedSet);
      if (next) { activeQs.push(next); if (next.tags) next.tags.forEach(t => usedTags.add(t)); }
    }
    currentIdx++;
    renderQuestion();
  } else {
    checkForTies();
  }
}

// Tie Detection 
function checkForTies() {
  sortedResults = Object.entries(scores)
    .map(([k, s]) => ({ key: k, score: s, ...FIGURES[k] }))
    .sort((a, b) => b.score - a.score);

  const [t1, t2] = sortedResults;
  if (t1.score > 0 && t1.score - t2.score <= 2) {
    const key = findContrastKey(t1.key, t2.key);
    if (key) {
      isRefinement = true;
      activeQs     = [CONTRAST[key]];
      currentIdx   = 0;
      renderQuestion();
      return;
    }
  }
  showResults();
}

function findContrastKey(a, b) {
  return CONTRAST[`${a}_${b}`] ? `${a}_${b}`
       : CONTRAST[`${b}_${a}`] ? `${b}_${a}`
       : null;
}

// Results
function showResults() {
  document.getElementById('quiz-screen').style.display   = 'none';
  document.getElementById('result-screen').style.display = 'block';

  const terminal = document.getElementById('terminal');
  terminal.style.display = 'block';
  terminal.textContent   = '';

  const logs = [
    "Analyzing behavior patterns...",
    "Weighing historical matches...",
    isRefinement ? "Applying final refinement..." : "Finalizing archetype..."
  ];
  let i = 0;
  (function print() {
    if (i < logs.length) { terminal.textContent += `> ${logs[i++]}\n`; setTimeout(print, 280); }
    else setTimeout(calculateResult, 150);
  })();
}

// Confidence Calculation
function getConfidence(topScore, allScores) {
  const total = allScores.reduce((s, v) => s + v, 0);
  if (!total) return { pct: 0, label: "" };
  const raw = topScore / total;
  const lo = 0.10, hi = 0.60;
  const pct = Math.min(Math.round(((raw - lo) / (hi - lo)) * 100), 99);
  const label = pct >= 75 ? "Strong match"
              : pct >= 50 ? "Clear match"
              : pct >= 30 ? "Likely match"
              :             "Partial match";
  return { pct: Math.max(pct, 10), label };
}

function calculateResult() {
  sortedResults = Object.entries(scores)
    .map(([k, s]) => ({ key: k, score: s, ...FIGURES[k] }))
    .sort((a, b) => b.score - a.score);

  const terminal = document.getElementById('terminal');
  if (sortedResults[0].score === 0) {
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

  const top = sortedResults[0];
  trackCompletion(top.key, top.name); 
  terminal.style.display = 'none';
  const rb = document.getElementById('archetype-result');
  rb.innerHTML = '';
  rb.style.display = 'block';
  renderPhaseOne();
}

async function trackCompletion(figureKey, figureName) {
  if (["localhost","127.0.0.1"].includes(window.location.hostname)) return;
  try {
    await fetch('/api/complete', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        figure_key:        figureKey,
        figure_name:       figureName,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        user_agent:        navigator.userAgent
      })
    });
  } catch {}
}

function renderPhaseOne() {
  const top        = sortedResults[0];
  const allScores  = sortedResults.map(f => f.score);
  const { pct, label } = getConfidence(top.score, allScores);

  const burstLines = Array.from({ length: 12 }, (_, i) => {
    const a  = (i / 12) * 2 * Math.PI;
    return `<line x1="${(80 + Math.cos(a)*54).toFixed(1)}" y1="${(80 + Math.sin(a)*54).toFixed(1)}" x2="${(80 + Math.cos(a)*74).toFixed(1)}" y2="${(80 + Math.sin(a)*74).toFixed(1)}" stroke="var(--accent)" stroke-width="1" opacity="0.25"/>`;
  }).join('');

  const block = document.createElement('div');
  block.className = 'procedural-step-block';
  block.id        = 'result-phase-1';
  block.innerHTML = `
    <div class="profile-identity-lockup">
      <div class="photo-burst-wrap" aria-hidden="true">
        <svg class="photo-burst" width="160" height="160" viewBox="0 0 160 160" fill="none">
          ${burstLines}
          <circle cx="80" cy="80" r="52" stroke="var(--accent)" stroke-width="1" stroke-dasharray="3 6" opacity="0.18"/>
        </svg>
        <img src="${top.image}" alt="${top.name}" onerror="this.style.display='none'">
      </div>
      <span class="profile-percentage">${pct}% — ${label}</span>
      <h1>${top.name}</h1>
      <div class="profile-subtitle">${top.subtitle}</div>
    </div>
    <button class="action-trigger" onclick="renderPhaseTwo()">
      <span>See what this means</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
    </button>`;
  document.getElementById('archetype-result').appendChild(block);
}

function renderPhaseTwo() {
  document.querySelector('#result-phase-1 .action-trigger').style.display = 'none';
  const top   = sortedResults[0];
  const block = document.createElement('div');
  block.className = 'procedural-step-block';
  block.id        = 'result-phase-2';
  block.innerHTML = `
    <p class="narrative-prose">${top.desc}</p>
    <div class="traits-minimal-grid">
      <div>
        <span class="trait-entry-label pos">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style="display:inline;vertical-align:middle;margin-right:5px;">
            <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/>
            <polyline points="4 6 5.5 7.5 8 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>Where you are strong
        </span>
        <div class="trait-entry-value">${top.pos}</div>
      </div>
      <div>
        <span class="trait-entry-label neg">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style="display:inline;vertical-align:middle;margin-right:5px;">
            <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/>
            <line x1="4" y1="4" x2="8" y2="8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            <line x1="8" y1="4" x2="4" y2="8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>Where you are vulnerable
        </span>
        <div class="trait-entry-value">${top.neg}</div>
      </div>
    </div>
    <button class="action-trigger" onclick="renderPhaseThree()">
      <span>Read the real story</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
    </button>`;
  document.getElementById('archetype-result').appendChild(block);
  block.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderPhaseThree() {
  document.querySelector('#result-phase-2 .action-trigger').style.display = 'none';
  const top   = sortedResults[0];
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
        ${sortedResults.map(f => `
          <span class="score-tag-item${f.score === top.score ? ' active-high' : ''}">
            ${f.name.split(' ').pop()}: ${f.score}
          </span>`).join('')}
      </div>
    </div>
    <button class="action-trigger" onclick="resetQuiz()" style="border-color:var(--accent);color:var(--accent);">
      <span>Take it again</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21.5 2v6h-6"/><path d="M21.34 15.57a10 10 0 1 1-.57-8.38L21.5 8"/>
      </svg>
    </button>  ${buildShareButton(top.key, top.name, top.subtitle)} `;
  document.getElementById('archetype-result').appendChild(block);
  block.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildShareButton(figureKey, figureName, subtitleText) {
  const name = figureName || "History Match";
  const subtitle = subtitleText || "";
  
  const baseShareUrl = `${window.location.origin}/api/share?fig=${encodeURIComponent(figureKey)}`;
  
  const shareText = `My historical alter ego is ${name} (${subtitle}).\n\nTake the scenario-based test to find your match:`;

  return `
    <button class="action-trigger share-btn" onclick="handleShare(this)"
      style="margin-top:1rem;"
      data-text="${shareText.replace(/"/g, '&quot;')}"
      data-url="${baseShareUrl}">
      <span>Share your result</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    </button>

    <div id="share-confirm" style="display:none;font-family:'Fira Code',monospace;font-size:0.8rem;color:var(--accent);margin-top:0.75rem;">
      Link copied to clipboard.
    </div>`;
}
async function handleShare(btn) {
  const targetBtn = btn || document.querySelector('.share-btn');
  const text = targetBtn.dataset.text;
  const url = targetBtn.dataset.url;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'History Match',
        text: text,
        url: url
      });
      return;
    } catch {}
  }

  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    const confirm = document.getElementById('share-confirm');
    if (confirm) {
      confirm.style.display = 'block';
      setTimeout(() => confirm.style.display = 'none', 3000);
    }
  } catch {
    window.prompt('Copy this link:', `${text}\n${url}`);
  }
}

//  Reset
function resetQuiz() {
  document.getElementById('result-screen').style.display = 'none';
  const rb = document.getElementById('archetype-result');
  rb.style.display = 'none';
  rb.innerHTML     = '';
  document.getElementById('intro-screen').style.display = 'block';
}

