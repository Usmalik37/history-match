let activeQuestions = [];
let currentIdx = 0;
let userSelections = [];
let sortedResultProfiles = [];


// track user data :) 
async function trackDeviceVisit() {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return;
  }

  const payload = {
    page_path: window.location.pathname,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    user_agent: navigator.userAgent
  };

  try {
    // Hit the local Vercel API endpoint directly relative to this domain
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("> Analytics logging bypassed quietly.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  trackDeviceVisit();
});



// ─── INITIALIZATION ENGINE ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const currentActiveTheme = document.documentElement.getAttribute("data-theme") || "dark";
  updateThemeButtonText(currentActiveTheme);
  
  if (document.getElementById("quiz-screen")) {
    resetQuiz();
  }
});

function toggleTheme() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeButtonText(newTheme);
}

function updateThemeButtonText(theme) {
  const btn = document.getElementById("theme-toggle-btn");
  if (!btn) return;
  btn.textContent = theme === "dark" ? "Light System" : "Dark System";
}

// ─── FIGURES DATABASE ────────────────────────────────────────────────────────
const figures = {
  einstein: {
    name: "Albert Einstein",
    subtitle: "The Systems Thinker",
    image: "images/albert-einstein.jpeg",
    pos: "Deep focus, finding hidden patterns in complex problems",
    neg: "Withdrawing from people, ignoring everyday responsibilities",
    desc: "You look at the big picture. When a problem catches your attention, you can't leave it alone — not to finish it, but because it genuinely fascinates you. You do your best thinking alone, in quiet, with no clock running. The risk is that the people around you sometimes feel like interruptions to a conversation you're already having with the problem.",
    fact: "Einstein confessed in his own writing that despite caring deeply about humanity as a concept, he felt a persistent aloofness from actual people — including his own family. He described his wish to withdraw into himself as something that grew stronger with every passing year."
  },
  tesla: {
    name: "Nikola Tesla",
    subtitle: "The Visionary Designer",
    image: "images/nikola-tesla.jpg",
    pos: "Pure original ideas, uncompromising creative vision",
    neg: "Commercial blindness, obsessive isolation",
    desc: "Your ideas arrive feeling sacred. You would rather abandon a project entirely than water it down for someone else. You don't naturally think in terms of money, deals, or selling yourself. The world rewards people who can package their vision. You are still deciding whether you care about that.",
    fact: "Tesla died alone in a New York hotel room, deeply in debt, after being systematically outmaneuvered by Edison in the marketplace. He claimed to sleep only two hours a night, washed his hands obsessively, refused to touch hair or pearls, and only stayed in rooms whose number was divisible by three."
  },
  jackson: {
    name: "Michael Jackson",
    subtitle: "The Dedicated Creator",
    image: "images/michael-jackson.jpeg",
    pos: "Relentless attention to craft, deep emotional expression",
    neg: "Escaping reality, fragile trust in other people",
    desc: "You feel things at an intensity most people around you can't track. You hold your own work to a standard that feels almost personal — anything less than your best feels like a lie. You are drawn to beauty as a way of making sense of the world. The danger is retreating into controlled environments when real life gets too chaotic.",
    fact: "Jackson rehearsed individual physical moves for hours until they were technically flawless. His perfectionism extended to every production detail on his albums. Because his childhood was stolen by fame and abuse, he spent his adult life constructing controlled environments — including an entire private theme park — to recreate the safety he never had."
  },
  vinci: {
    name: "Leonardo da Vinci",
    subtitle: "The Curious Mind",
    image: "images/leonardo-da-vinci.jpg",
    pos: "Cross-domain curiosity, connecting ideas others miss",
    neg: "Leaving things unfinished, losing focus when interest shifts",
    desc: "You are genuinely interested in too many things at once. This makes you brilliant at spotting connections that specialists miss — but it also means projects get dropped the moment something more interesting arrives. Your notebooks are full of brilliant starts. Sometimes the world just needs you to finish one thing.",
    fact: "Researchers at King's College London formally proposed that Leonardo likely had ADHD — his voracious curiosity both powered his genius and constantly derailed his output. He worked on the Mona Lisa for roughly 16 years and died carrying the canvas. His patron the Duke of Milan eventually had him sign a contract with a legal penalty for leaving work unfinished."
  },
  alexander: {
    name: "Alexander the Great",
    subtitle: "The Bold Leader",
    image: "images/alexander-the-great.jpeg",
    pos: "Explosive initiative, fearless execution under pressure",
    neg: "Restlessness that never switches off, burning people out",
    desc: "You don't wait for perfect conditions. You move, fix problems mid-flight, and figure out the details while things are already in motion. Sitting still genuinely makes you anxious. The risk is that you treat every challenge like a personal conquest — which exhausts the people who are supposed to be on your side.",
    fact: "Alexander slept with a dagger and a personal copy of the Iliad under his pillow on every campaign, seeing himself as a living Achilles. He conquered the known world by age 32 and was dead at 33. He had no plan for what came after the conquest — because stopping was never part of his psychology."
  },
  rockefeller: {
    name: "John D. Rockefeller",
    subtitle: "The Long-Game Builder",
    image: "images/john-d-rockefeller.jpg",
    pos: "Inhuman patience, long-term system thinking",
    neg: "Emotional coldness, seeing people as moving parts in a plan",
    desc: "You play a much longer game than almost everyone around you. While others react, you watch, position, and wait. You see chaos as a structural opportunity and treat relationships like systems that need maintaining. Just remember that the people inside those systems are not resources.",
    fact: "During major oil market crashes, while competitors panicked and sold, Rockefeller calmly calculated their desperation and bought them out at deep discounts. He openly said their panic was his greatest competitive advantage. His biographer described his self-control as almost eerie — he never made a decision while emotional."
  },
  musk: {
    name: "Elon Musk",
    subtitle: "The Risk Taker",
    image: "images/elon-musk.jpeg",
    pos: "First-principles thinking, moving fast on impossible problems",
    neg: "Chaotic personal wake, demanding the unreasonable from others",
    desc: "You want to fix the problems everyone else agreed were unsolvable. You move at a speed that disorients people around you, and you have a habit of declaring things possible before you've fully checked the math. Your best ideas and your biggest messes come from exactly the same place.",
    fact: "When SpaceX nearly ran out of money in 2008, Musk put his last personal reserves into a fourth rocket launch rather than accept failure — it succeeded. He has described running multiple companies simultaneously while barely sleeping as normal. Teams working under him report both breakthrough results and extreme psychological pressure."
  },
  napoleon: {
    name: "Napoleon Bonaparte",
    subtitle: "The Outsider Who Rewrote the Rules",
    image: "images/napoleon-bonaparte.jpeg",
    pos: "Strategic brilliance, turning outsider status into a weapon",
    neg: "Ego that overrides good judgment, catastrophic overreach",
    desc: "You have always felt slightly outside the group that holds power — and instead of accepting that, you used it as fuel. You are not just trying to win; you are trying to redesign the whole system. Your strength is that you outthink people who are playing by rules you've already discarded. Your weakness is that you sometimes keep going long after the smart move was to stop.",
    fact: "Napoleon was Corsican — culturally French but never quite accepted as an insider by Parisian elites. He responded by outworking and outthinking every aristocrat in his path. He rewrote the legal code of France, reorganized its education system, and restructured its banking — all while running military campaigns. He fell not from lack of genius but from an inability to accept that Moscow was a limit."
  },
  curie: {
    name: "Marie Curie",
    subtitle: "The Immovable Force",
    image: "images/marie-curie.jpeg",
    pos: "Quiet relentless persistence, letting results do all the talking",
    neg: "Sacrificing personal health and relationships for the work",
    desc: "You don't make noise about what you're doing. You just keep going — through rejection, through doubt, through conditions that would make most people quit. You are not trying to impress anyone. You are trying to get it right. The risk is that you push so deep into the work that everything else — rest, relationships, your own body — becomes secondary.",
    fact: "Curie was the first person ever to win two Nobel Prizes in two different sciences — physics and chemistry. She had to conduct her research in a leaking shed with no proper heating because no French university would give a woman proper lab space. She carried radioactive isotopes in her coat pockets for years. The radiation killed her, and her notebooks are still too radioactive to handle without protective equipment."
  },
  jobs: {
    name: "Steve Jobs",
    subtitle: "The Aesthetic Tyrant",
    image: "images/steve-jobs.jpeg",
    pos: "Merging beauty with function, refusing to accept 'good enough'",
    neg: "Brutal to people around him, blind spots in personal relationships",
    desc: "You believe that how something looks and feels is just as important as whether it works — and you hold that standard for everything you touch. You don't tolerate the gap between your vision and the reality in front of you. People either rise to meet your standard or get moved out of the way. The cost of that is real, and the people who paid it weren't always the ones who deserved to.",
    fact: "Jobs was notoriously controlling about details most people consider invisible — the color of internal circuit boards no customer would ever see, the exact radius of the corners on product packaging. Former Apple employees described his feedback style as either 'this is the greatest thing' or 'this is absolute garbage' with no middle ground. He also denied paternity of his first daughter for years while simultaneously naming a product line after her."
  }
};

// ─── QUESTION POOL ────────────────────────────────────────────────────────────
const questionPool = [
  {
    q: "A project you have been working on for weeks hits a serious wall. What actually happens next?",
    a: [
      "I sit with it quietly until I understand exactly what broke. I can't move on without knowing why.",
      "I pivot immediately. The failure is data. What is the fastest route around it?",
      "I lose motivation. Something newer and more interesting has already started pulling my attention.",
      "I don't stop. I work through the night if I have to. Stopping feels like losing."
    ],
    fx: [
      () => { figures.einstein.score+=3; figures.curie.score+=2; },
      () => { figures.musk.score+=3; figures.napoleon.score+=2; },
      () => { figures.vinci.score+=3; },
      () => { figures.alexander.score+=3; figures.tesla.score+=2; figures.jobs.score+=1; }
    ]
  },
  {
    q: "Someone with more status or authority tells you your idea is wrong in front of others. What do you do?",
    a: [
      "I go quiet in the moment. I take notes. I come back later with something they can't argue with.",
      "I push back on the spot. If I believe I'm right, I say so directly regardless of who they are.",
      "It stings privately, but I let the work answer for me. I'll prove it without a fight.",
      "I feel deeply unsettled. I replay the moment for days and wonder if they were right about me."
    ],
    fx: [
      () => { figures.rockefeller.score+=3; figures.curie.score+=2; figures.einstein.score+=1; },
      () => { figures.napoleon.score+=3; figures.alexander.score+=2; figures.musk.score+=2; },
      () => { figures.tesla.score+=3; figures.curie.score+=2; figures.jobs.score+=1; },
      () => { figures.jackson.score+=3; figures.vinci.score+=1; }
    ]
  },
  {
    q: "You have a free afternoon with zero obligations. What does it actually look like?",
    a: [
      "I end up three hours deep into a topic I barely knew existed this morning.",
      "I work on something I've been refining for a long time. Free time is just more time to get it right.",
      "I make a plan, work through it, and feel satisfied having made real visible progress.",
      "I hop between four different things and finish nothing, but I enjoyed all of them."
    ],
    fx: [
      () => { figures.einstein.score+=3; figures.vinci.score+=2; figures.tesla.score+=1; },
      () => { figures.jackson.score+=3; figures.jobs.score+=3; figures.curie.score+=2; },
      () => { figures.rockefeller.score+=3; figures.napoleon.score+=2; },
      () => { figures.vinci.score+=3; figures.musk.score+=1; }
    ]
  },
  {
    q: "What is your honest relationship to finishing things you start?",
    a: [
      "I finish what matters. Everything else can wait or disappear.",
      "I struggle to finish. New ideas always feel more alive than old ones.",
      "I finish things, but I'm never quite satisfied. There's always one more thing to fix.",
      "I finish by force — deadlines and consequences are what actually close things for me."
    ],
    fx: [
      () => { figures.curie.score+=3; figures.rockefeller.score+=2; figures.einstein.score+=1; },
      () => { figures.vinci.score+=4; figures.tesla.score+=1; },
      () => { figures.jobs.score+=3; figures.jackson.score+=3; figures.tesla.score+=1; },
      () => { figures.musk.score+=2; figures.alexander.score+=2; figures.napoleon.score+=2; }
    ]
  },
  {
    q: "How do you respond when a system or institution is blocking you from something you need?",
    a: [
      "I work within it longer than most people would. I learn its rules well enough to use them better than anyone.",
      "I find a way around it entirely. I don't waste energy fighting what I can simply bypass.",
      "I get frustrated but keep my head down and push through by sheer endurance.",
      "I start building a new system to replace the broken one."
    ],
    fx: [
      () => { figures.napoleon.score+=3; figures.rockefeller.score+=3; },
      () => { figures.musk.score+=3; figures.vinci.score+=2; figures.einstein.score+=1; },
      () => { figures.curie.score+=4; figures.tesla.score+=2; },
      () => { figures.musk.score+=3; figures.napoleon.score+=2; figures.jobs.score+=2; }
    ]
  },
  {
    q: "Someone else gets public credit for something you contributed to significantly. You:",
    a: [
      "Note it quietly. I don't react publicly, but I don't forget either.",
      "Speak up about my contribution directly. Credit matters and I'm not pretending it doesn't.",
      "Let it go. The work is what I care about. Recognition is a distraction.",
      "Feel genuinely wounded. Being unseen hurts more than I usually admit."
    ],
    fx: [
      () => { figures.rockefeller.score+=3; figures.napoleon.score+=2; },
      () => { figures.alexander.score+=3; figures.musk.score+=2; figures.jobs.score+=2; },
      () => { figures.curie.score+=3; figures.einstein.score+=3; figures.tesla.score+=2; },
      () => { figures.jackson.score+=3; figures.vinci.score+=2; }
    ]
  },
  {
    q: "When you care deeply about a project, what does your work style look like?",
    a: [
      "Long, uninterrupted solo sessions. I go deep and surface when it's done.",
      "Slow and steady, every day, with no big bursts. Consistency over intensity.",
      "Intense but messy. I jump between layers, break things, rebuild, and somehow it comes together.",
      "Obsessively detailed. I will redo the same small element repeatedly until it matches what I see in my head."
    ],
    fx: [
      () => { figures.einstein.score+=3; figures.tesla.score+=3; figures.curie.score+=1; },
      () => { figures.rockefeller.score+=4; figures.curie.score+=3; },
      () => { figures.musk.score+=3; figures.vinci.score+=3; figures.napoleon.score+=1; },
      () => { figures.jobs.score+=4; figures.jackson.score+=3; figures.tesla.score+=1; }
    ]
  },
  {
    q: "You feel like an outsider in a room where everyone else seems comfortable and connected. You:",
    a: [
      "Observe. I watch the room and figure out how it works before I engage with any of it.",
      "Withdraw. I find a corner, my phone, or the first excuse to leave early.",
      "Push through it. Discomfort is just the cost of being somewhere worth being.",
      "Use it. Feeling like the odd one out makes me want to outperform everyone who fits in naturally."
    ],
    fx: [
      () => { figures.napoleon.score+=3; figures.rockefeller.score+=2; figures.jobs.score+=2; },
      () => { figures.einstein.score+=3; figures.tesla.score+=3; },
      () => { figures.curie.score+=3; figures.alexander.score+=2; },
      () => { figures.napoleon.score+=4; figures.musk.score+=2; figures.alexander.score+=1; }
    ]
  },
  {
    q: "What is the most honest reason you work as hard as you do?",
    a: [
      "The problem itself. I genuinely cannot leave an interesting question alone.",
      "I want to build something that works so well it speaks for itself.",
      "I need to prove something — to myself, or to people who underestimated me.",
      "I want to create something that outlasts me. Something that matters after I am gone."
    ],
    fx: [
      () => { figures.einstein.score+=3; figures.vinci.score+=2; figures.tesla.score+=2; },
      () => { figures.jobs.score+=3; figures.curie.score+=3; figures.rockefeller.score+=1; },
      () => { figures.napoleon.score+=4; figures.alexander.score+=3; figures.musk.score+=2; },
      () => { figures.rockefeller.score+=3; figures.tesla.score+=2; figures.curie.score+=2; figures.jackson.score+=1; }
    ]
  },
  {
    q: "Your close friend tells you that you are difficult to really know. Your reaction is:",
    a: [
      "That sounds right. I keep most of my interior life to myself and that is not an accident.",
      "It surprises me. I think I am open — I just show it through what I make, not what I say.",
      "I take it seriously. If someone I trust is telling me this, I need to understand what I'm doing.",
      "I already knew. I have accepted that what I'm building requires a distance that not everyone will like."
    ],
    fx: [
      () => { figures.einstein.score+=3; figures.tesla.score+=3; figures.rockefeller.score+=2; },
      () => { figures.jackson.score+=3; figures.vinci.score+=2; figures.jobs.score+=2; },
      () => { figures.curie.score+=3; figures.napoleon.score+=2; },
      () => { figures.jobs.score+=3; figures.musk.score+=3; figures.alexander.score+=2; }
    ]
  },
  {
    q: "How do you handle a plan when conditions change completely mid-way through?",
    a: [
      "I adapt fast and move. The original plan was always just a starting point.",
      "I pause, rethink the whole structure, then recommit to a new path deliberately.",
      "I struggle. I had everything calibrated and the disruption genuinely throws me.",
      "I keep going on the original path longer than I should, hoping conditions will correct."
    ],
    fx: [
      () => { figures.musk.score+=3; figures.alexander.score+=3; figures.napoleon.score+=2; },
      () => { figures.rockefeller.score+=3; figures.napoleon.score+=2; figures.jobs.score+=1; },
      () => { figures.tesla.score+=3; figures.jackson.score+=2; figures.einstein.score+=1; },
      () => { figures.curie.score+=3; figures.vinci.score+=2; figures.alexander.score+=1; }
    ]
  },
  {
    q: "Think back to school. What kind of student were you really?",
    a: [
      "I only engaged with subjects that actually interested me. The rest I ignored or barely passed.",
      "I was consistent and disciplined — maybe not the most naturally gifted, but I outworked everyone.",
      "I started strong, got distracted, and scraped through on last-minute intensity.",
      "I pushed back on teachers I disagreed with and had strong opinions about how things should be taught."
    ],
    fx: [
      () => { figures.einstein.score+=3; figures.tesla.score+=2; figures.vinci.score+=2; },
      () => { figures.curie.score+=4; figures.rockefeller.score+=3; },
      () => { figures.vinci.score+=3; figures.musk.score+=2; figures.alexander.score+=1; },
      () => { figures.napoleon.score+=3; figures.jobs.score+=3; figures.musk.score+=1; }
    ]
  },
  {
    q: "What does your relationship to beauty and aesthetics actually look like?",
    a: [
      "I care deeply. How something looks and feels matters as much as whether it works.",
      "I appreciate it but it doesn't drive my decisions. Function comes first.",
      "I have strong personal taste but mostly keep it to myself — it's a private thing.",
      "I find it interesting but my real passion is in systems, structures, and how things connect."
    ],
    fx: [
      () => { figures.jobs.score+=4; figures.jackson.score+=3; figures.vinci.score+=2; },
      () => { figures.musk.score+=3; figures.napoleon.score+=2; figures.alexander.score+=2; },
      () => { figures.einstein.score+=3; figures.tesla.score+=3; figures.curie.score+=1; },
      () => { figures.rockefeller.score+=3; figures.napoleon.score+=3; figures.curie.score+=2; }
    ]
  }
];


// ─── QUIZ NAV MECHANICS ────────────────────────────────────────────────────────
function startQuiz() {
  activeQuestions = [...questionPool].sort(() => Math.random() - 0.5).slice(0, 10);
  currentIdx = 0;
  userSelections = new Array(activeQuestions.length).fill(null);
  
  document.getElementById('intro-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display = 'block';
  renderQuestion();
}

function renderQuestion() {
  if (currentIdx >= activeQuestions.length) { 
    showResults(); 
    return; 
  }
  
  document.getElementById('prev-btn').disabled = (currentIdx === 0);
  document.getElementById('next-btn').textContent = (userSelections[currentIdx] !== null) ? "Next" : "Skip";

  const pct = (currentIdx / activeQuestions.length) * 100;
  document.getElementById('progress-bar').style.width = `${pct}%`;
  document.getElementById('progress-label').textContent = `Verification Vector ${currentIdx + 1}/${activeQuestions.length}`;
  
  const q = activeQuestions[currentIdx];
  document.getElementById('question-text').textContent = q.q;
  
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  
  q.a.forEach((answerText, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-row-btn';
    if (userSelections[currentIdx] === index) {
      btn.classList.add('selected');
    }
    btn.textContent = answerText;
    btn.onclick = () => selectOption(index);
    container.appendChild(btn);
  });
}

function selectOption(index) {
  userSelections[currentIdx] = index;
  renderQuestion();
  
  setTimeout(() => {
    if (currentIdx === userSelections.length - 1) {
      showResults();
    } else {
      currentIdx++;
      renderQuestion();
    }
  }, 240);
}

function goToPrevQuestion() {
  if (currentIdx > 0) {
    currentIdx--;
    renderQuestion();
  }
}

function goToNextQuestion() {
  if (currentIdx < activeQuestions.length - 1) {
    currentIdx++;
    renderQuestion();
  } else {
    showResults();
  }
}

// ─── PROCEDURAL NARRATIVE CONTROLLER ──────────────────────────────────────────
function showResults() {
  document.getElementById('quiz-screen').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';
  
  const terminal = document.getElementById('terminal');
  terminal.style.display = 'block';
  terminal.textContent = '';
  
  const logs = [
    "Compiling configuration selection logs...",
    "Searching matrix alignments...",
    "Isolating closest relative archetype..."
  ];
  
  let line = 0;
  function printLine() {
    if (line < logs.length) {
      terminal.textContent += `> ${logs[line]}\n`;
      line++;
      setTimeout(printLine, 280);
    } else {
      setTimeout(calculateProceduralArchetype, 150);
    }
  }
  printLine();
}

function calculateProceduralArchetype() {
  for (let k in figures) figures[k].score = 0;
  
  let answeredCount = 0;
  userSelections.forEach((selectedIndex, qIdx) => {
    if (selectedIndex !== null) {
      activeQuestions[qIdx].fx[selectedIndex]();
      answeredCount++;
    }
  });

  const terminal = document.getElementById('terminal');

  if (answeredCount === 0) {
    terminal.textContent += `\n>> Evaluation stalled: Zero system inputs.\n`;
    const resultBox = document.getElementById('archetype-result');
    resultBox.innerHTML = `
      <div class="procedural-step-block">
        <h1>Empty Profile Vector</h1>
        <p class="narrative-prose">You managed to skip every single diagnostic question. No metrics were generated, leaving your historical tracking pattern completely void.</p>
        <button class="action-trigger" onclick="resetQuiz()">Restart System Matrix</button>
      </div>
    `;
    resultBox.style.display = 'block';
    return;
  }

  sortedResultProfiles = Object.entries(figures)
    .map(([k, v]) => ({ key: k, ...v }))
    .sort((a, b) => b.score - a.score);

  terminal.style.display = 'none';
  const resultBox = document.getElementById('archetype-result');
  resultBox.innerHTML = '';
  resultBox.style.display = 'block';

  renderResultPhaseOne();
}

// PHASE 1: The Identity Reveal
// PHASE 1: The Identity Reveal
function renderResultPhaseOne() {
  const top = sortedResultProfiles[0];
  const totalWeight = sortedResultProfiles.reduce((sum, f) => sum + f.score, 0);
  const matchPct = Math.min(Math.round((top.score / (totalWeight || 1)) * 320), 99);

  const container = document.getElementById('archetype-result');
  
  const step1 = document.createElement('div');
  step1.className = 'procedural-step-block';
  step1.id = 'result-phase-1';
  step1.innerHTML = `
    <div class="profile-identity-lockup">
      <span class="profile-percentage">${matchPct}% ALIGNMENT DETECTED</span>
      <img src="${top.image}" alt="${top.name}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin: 1.5rem 0; border: 2px solid var(--accent, #ff5722);">
      <h1>${top.name}</h1>
      <div class="profile-subtitle">${top.subtitle}</div>
    </div>
    
    <button class="action-trigger" onclick="renderResultPhaseTwo()">
      <span>Analyze Operational Matrix</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </button>
  `;
  
  container.appendChild(step1);
}

// PHASE 2: The Core Analysis & Traits Blueprint
function renderResultPhaseTwo() {
  const p1Button = document.querySelector('#result-phase-1 .action-trigger');
  if (p1Button) p1Button.style.display = 'none';

  const top = sortedResultProfiles[0];
  const container = document.getElementById('archetype-result');

  const step2 = document.createElement('div');
  step2.className = 'procedural-step-block';
  step2.id = 'result-phase-2';
  step2.innerHTML = `
    <p class="narrative-prose">${top.desc}</p>

    <div class="traits-minimal-grid">
      <div>
        <span class="trait-entry-label pos">Strategic Strengths</span>
        <div class="trait-entry-value">${top.pos}</div>
      </div>
      <div>
        <span class="trait-entry-label neg">System Vulnerabilities</span>
        <div class="trait-entry-value">${top.neg}</div>
      </div>
    </div>

    <button class="action-trigger" onclick="renderResultPhaseThree()">
      <span>Access Historical Blueprint Logs</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </button>
  `;

  container.appendChild(step2);
  window.scrollTo({ top: step2.offsetTop - 40, behavior: 'smooth' });
}

// PHASE 3: Historical Fact, Scores & Re-evaluation Trigger
function renderResultPhaseThree() {
  const p2Button = document.querySelector('#result-phase-2 .action-trigger');
  if (p2Button) p2Button.style.display = 'none';

  const top = sortedResultProfiles[0];
  const primeHighScore = top.score;
  const container = document.getElementById('archetype-result');

  const step3 = document.createElement('div');
  step3.className = 'procedural-step-block';
  step3.innerHTML = `
    <div class="historical-context-card">
      <span class="system-meta" style="margin-bottom:0.5rem;">HISTORICAL CONTEXT DECRYPTION</span>
      ${top.fact}
    </div>

    <div style="margin-bottom: 3.5rem;">
      <span class="system-meta" style="margin-bottom:0.75rem;">MATRIX WEIGHT MATRIX DISTRIBUTION</span>
      <div class="scores-minimal-chart">
        ${sortedResultProfiles.map(f => `
          <span class="score-tag-item${f.score === primeHighScore ? ' active-high' : ''}">
            ${f.name.split(' ').pop()}: ${f.score}pt
          </span>
        `).join('')}
      </div>
    </div>

    <button class="action-trigger" onclick="resetQuiz()" style="border-color: var(--accent); color: var(--accent);">
      <span>Re-Run Diagnostic Matrix</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
    </button>
  `;

  container.appendChild(step3);
  window.scrollTo({ top: step3.offsetTop - 40, behavior: 'smooth' });
}

function resetQuiz() {
  document.getElementById('result-screen').style.display = 'none';
  document.getElementById('archetype-result').style.display = 'none';
  document.getElementById('archetype-result').innerHTML = '';
  document.getElementById('intro-screen').style.display = 'block';
}

// ─── SUPABASE DEVICE ANALYTICS TRACKER ────────────────────────────────────────
async function trackDeviceVisit() {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return;
  }

  const payload = {
    page_path: window.location.pathname,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    user_agent: navigator.userAgent
  };

  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("> Analytics logging bypassed quietly.");
  }
}

// Fire tracking sequence when DOM is prepared
document.addEventListener("DOMContentLoaded", () => {
  trackDeviceVisit();
});