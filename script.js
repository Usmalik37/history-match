// TRAIT DIMENSIONS

const TRAITS = [
  "curiosity", "isolation", "risk", "discipline", "perfectionism",
  "leadership", "sacrifice", "ambition", "strategy", "emotion",
  "originality", "resilience"
];


// FIGURE DATA --- content + trait profile + core traits in onne place

const FIGURES = {
  einstein: {
    name: "Albert Einstein", subtitle: "The Systems Thinker",
    image: "images/albert-einstein.jpeg",
    pos: "Deep focus, finding hidden patterns in complex problems",
    neg: "Withdrawing from people, ignoring everyday responsibilities",
    desc: "You look at the big picture. When a problem catches your attention, you can't leave it alone because it genuinely fascinates you. You do your best thinking alone, in quiet, with no clock running. The risk is that the people around you sometimes feel like interruptions to a conversation you're already having with the problem.",
    fact: "Einstein confessed in his own writing that despite caring deeply about humanity as a concept, he felt a persistent aloofness from actual people, including his own family. He described his wish to withdraw into himself as something that grew stronger with every passing year.",
    traits: {
      curiosity: 10, isolation: 7, risk: 2, discipline: 5, perfectionism: 4,
      leadership: 2, sacrifice: 3, ambition: 3, strategy: 6, emotion: 2,
      originality: 6, resilience: 6
    },
    core: ["curiosity", "isolation"]
  },
  tesla: {
    name: "Nikola Tesla", subtitle: "The Visionary Designer",
    image: "images/nikola-tesla.jpg",
    pos: "Pure original ideas, uncompromising creative vision",
    neg: "Commercial blindness, obsessive isolation",
    desc: "Your ideas arrive feeling sacred. You would rather abandon a project entirely than water it down for someone else. You don't naturally think in terms of money, deals, or selling yourself. The world rewards people who can package their vision. You are still deciding whether you care about that.",
    fact: "Tesla died alone in a New York hotel room, deeply in debt, after being systematically outmaneuvered by Edison in the marketplace. He claimed to sleep only two hours a night, washed his hands obsessively, refused to touch hair or pearls, and only stayed in rooms whose number was divisible by three.",
    traits: {
      curiosity: 8, isolation: 9, risk: 3, discipline: 6, perfectionism: 8,
      leadership: 1, sacrifice: 6, ambition: 4, strategy: 3, emotion: 3,
      originality: 10, resilience: 5
    },
    core: ["isolation", "originality"]
  },
  jackson: {
    name: "Michael Jackson", subtitle: "The Dedicated Creator",
    image: "images/michael-jackson.jpeg",
    pos: "Relentless attention to craft, deep emotional expression",
    neg: "Escaping reality, fragile trust in other people",
    desc: "You feel things at an intensity most people around you can't track. You hold your own work to a standard that feels almost personal. Anything less than your best feels like a lie. You are drawn to beauty as a way of making sense of the world. The danger is retreating into controlled environments when real life gets too chaotic.",
    fact: "Jackson rehearsed individual physical moves for hours until they were technically flawless. His perfectionism extended to every production detail on his albums. Because his childhood was stolen by fame and abuse, he spent his adult life constructing controlled environments, including an entire private theme park, to recreate the safety he never had.",
    traits: {
      curiosity: 4, isolation: 6, risk: 2, discipline: 7, perfectionism: 9,
      leadership: 2, sacrifice: 8, ambition: 4, strategy: 2, emotion: 9,
      originality: 6, resilience: 5
    },
    core: ["perfectionism", "emotion"]
  },
  vinci: {
    name: "Leonardo da Vinci", subtitle: "The Curious Mind",
    image: "images/leonardo-da-vinci.jpg",
    pos: "Cross-domain curiosity, connecting ideas others miss",
    neg: "Leaving things unfinished, losing focus when interest shifts",
    desc: "You are genuinely interested in too many things at once. This makes you brilliant at spotting connections that specialists miss, but it also means projects get dropped the moment something more interesting arrives. Your notebooks are full of brilliant starts. Sometimes the world just needs you to finish one thing.",
    fact: "Researchers at King's College London formally proposed that Leonardo likely had ADHD. His voracious curiosity both powered his genius and constantly derailed his output. He worked on the Mona Lisa for roughly 16 years and died carrying the canvas. His patron the Duke of Milan eventually had him sign a contract with a legal penalty for leaving work unfinished.",
    traits: {
      curiosity: 10, isolation: 4, risk: 3, discipline: 2, perfectionism: 5,
      leadership: 2, sacrifice: 2, ambition: 3, strategy: 2, emotion: 4,
      originality: 7, resilience: 3
    },
    core: ["curiosity", "discipline"]   // low discipline is the core signature here
  },
  franklin: {
    name: "Benjamin Franklin", subtitle: "The Self-Made Pragmatist",
    image: "images/benjamin-franklin.jpeg",
    pos: "Practical curiosity, turning self-discipline into steady improvement",
    neg: "Over-systematizing yourself, mistaking control for growth",
    desc: "You treat your own habits like a project you're always tinkering with. You are endlessly curious, but you don't chase ideas just to admire them. You want them to actually work, fix something, or make you better at being you. You track your progress, adjust your approach, and rarely lose your temper in front of other people. The risk is turning your own life into a checklist and forgetting to just live it once in a while.",
    fact: "Franklin dropped out of school at ten years old and taught himself everything that followed. In his twenties he designed a system to track thirteen virtues in a small notebook, grading himself daily and cycling through the list four times a year for decades. He never believed he mastered it, but said the attempt alone made him a better and happier man than he would have been otherwise.",
    traits: {
      curiosity: 9, isolation: 1, risk: 4, discipline: 8, perfectionism: 3,
      leadership: 6, sacrifice: 2, ambition: 5, strategy: 8, emotion: 3,
      originality: 5, resilience: 6
    },
    core: ["curiosity", "strategy"]
  },
  rockefeller: {
    name: "John D. Rockefeller", subtitle: "The Long-Game Builder",
    image: "images/john-d-rockefeller.jpg",
    pos: "Inhuman patience, long-term system thinking",
    neg: "Emotional coldness, seeing people as moving parts in a plan",
    desc: "You play a much longer game than almost everyone around you. While others react, you watch, position, and wait. You see chaos as a chance to build something steady and treat relationships like systems that need tending. Just remember that the people inside those systems are not resources.",
    fact: "During major oil market crashes, while competitors panicked and sold, Rockefeller calmly calculated their desperation and bought them out at deep discounts. He openly said their panic was his greatest competitive advantage. His biographer described his self-control as almost eerie. He never made a decision while emotional.",
    traits: {
      curiosity: 3, isolation: 5, risk: 2, discipline: 9, perfectionism: 3,
      leadership: 6, sacrifice: 3, ambition: 5, strategy: 10, emotion: 1,
      originality: 2, resilience: 7
    },
    core: ["strategy", "discipline"]
  },
  musk: {
    name: "Elon Musk", subtitle: "The Risk Taker",
    image: "images/elon-musk.jpeg",
    pos: "Fresh thinking, moving fast on problems others gave up on",
    neg: "Chaotic personal wake, demanding the unreasonable from others",
    desc: "You want to fix the problems everyone else agreed were unsolvable. You move at a speed that disorients people around you, and you have a habit of declaring things possible before you've fully checked the math. Your best ideas and your biggest messes come from exactly the same place.",
    fact: "When SpaceX nearly ran out of money in 2008, Musk put his last personal reserves into a fourth rocket launch rather than accept failure, it succeeded. He has described running multiple companies simultaneously while barely sleeping as normal. Teams working under him report both breakthrough results and extreme psychological pressure.",
    traits: {
      curiosity: 6, isolation: 2, risk: 9, discipline: 4, perfectionism: 4,
      leadership: 6, sacrifice: 6, ambition: 8, strategy: 3, emotion: 2,
      originality: 6, resilience: 7
    },
    core: ["risk", "ambition"]
  },
  napoleon: {
    name: "Napoleon Bonaparte", subtitle: "The Outsider Who Rewrote the Rules",
    image: "images/napoleon-bonaparte.jpeg",
    pos: "Sharp strategy, turning being the underdog into an advantage",
    neg: "Ego that overrides good judgment, pushing too far past the limit",
    desc: "You have always felt slightly outside the group that holds power, and instead of accepting that, you used it as fuel. You are not just trying to win; you are trying to redesign the whole system. Your strength is that you outthink people who are playing by rules you've already discarded. Your weakness is that you sometimes keep going long after the smart move was to stop.",
    fact: "Napoleon was Corsican, culturally French but never quite accepted as an insider by Parisian elites. He responded by outworking and outthinking every aristocrat in his path. He rewrote the legal code of France, reorganized its education system, and restructured its banking, all while running military campaigns. He fell not from lack of genius but from an inability to accept that Moscow was a limit.",
    traits: {
      curiosity: 3, isolation: 2, risk: 6, discipline: 6, perfectionism: 3,
      leadership: 8, sacrifice: 4, ambition: 10, strategy: 8, emotion: 3,
      originality: 4, resilience: 7
    },
    core: ["ambition", "strategy"]
  },
  curie: {
    name: "Marie Curie", subtitle: "The Immovable Force",
    image: "images/marie-curie.jpeg",
    pos: "Quiet relentless persistence, letting results do all the talking",
    neg: "Sacrificing personal health and relationships for the work",
    desc: "You don't make noise about what you're doing. You just keep going through rejection, through doubt, and through conditions that would make most people quit. You are not trying to impress anyone. You are trying to get it right. The risk is that you push so deep into the work that everything else, including rest, relationships, and your own body, becomes secondary.",
    fact: "Curie was the first person ever to win two Nobel Prizes in two different sciences, physics and chemistry. She had to conduct her research in a leaking shed with no proper heating because no French university would give a woman proper lab space. She carried radioactive isotopes in her coat pockets for years. The radiation killed her, and her notebooks are still too radioactive to handle without protective equipment.",
    traits: {
      curiosity: 6, isolation: 6, risk: 2, discipline: 9, perfectionism: 5,
      leadership: 1, sacrifice: 10, ambition: 3, strategy: 4, emotion: 2,
      originality: 4, resilience: 10
    },
    core: ["sacrifice", "resilience"]
  },
  jobs: {
    name: "Steve Jobs", subtitle: "The Aesthetic Tyrant",
    image: "images/steve-jobs.jpeg",
    pos: "Merging beauty with function, refusing to accept good enough",
    neg: "Brutal to people around him, blind spots in personal relationships",
    desc: "You believe that how something looks and feels is just as important as whether it works, and you hold that standard for everything you touch. You don't tolerate the gap between your vision and the reality in front of you. People either rise to meet your standard or get moved out of the way. The cost of that is real, and the people who paid it weren't always the ones who deserved to.",
    fact: "Jobs was notoriously controlling about details most people consider invisible, like the color of internal circuit boards no customer would ever see, or the exact radius of the corners on product packaging. Former Apple employees described his feedback style as either this is the greatest thing or this is absolute garbage with no middle ground. He also denied paternity of his first daughter for years while simultaneously naming a product line after her.",
    traits: {
      curiosity: 4, isolation: 3, risk: 5, discipline: 5, perfectionism: 10,
      leadership: 7, sacrifice: 5, ambition: 6, strategy: 4, emotion: 3,
      originality: 8, resilience: 6
    },
    core: ["perfectionism", "originality"]
  }
};


// QUESTION POOL
// Each answer's fx is a plain object of trait deltas, e.g.
//   { curiosity: 3, discipline: -2 }
// Positive = evidence FOR that trait. 
// Negative = evidence AGAINST it
// (i.e. this answer actively contradicts figures who need that trait high).
// This replaces direct figure-scoring. Matching happens later via
// distance between the user's trait vector and each figure's profile.


const POOL = [
  // ISOLATION / FOCUS
  {
    tags: ["isolation", "focus"],
    q: "You need to finish something really important. Where do you work best?",
    a: [
      "Alone in a quiet room with the door shut.",
      "Somewhere with background noise like a café or a busy place.",
      "Near other people, even if nobody is talking."
    ],
    fx: [
      { isolation: 3, curiosity: 1 },
      { isolation: -1, leadership: 1 },
      { isolation: -2, leadership: 1 }
    ]
  },
  {
    tags: ["isolation", "trust"],
    q: "Something goes wrong. What do you do first?",
    a: [
      "Go somewhere quiet and sort it out by myself.",
      "Call one person I actually trust.",
      "Get everyone in the same room and figure it out together."
    ],
    fx: [
      { isolation: 3, resilience: 1 },
      { isolation: 0, emotion: 1 },
      { isolation: -3, leadership: 2 }
    ]
  },
  {
    tags: ["isolation", "recharge"],
    q: "After a long and stressful week, what actually makes you feel better?",
    a: [
      "Being completely alone with no messages, no people, and just quiet.",
      "Doing something creative by myself like music, drawing, or building.",
      "Spending time with a small group of people I like."
    ],
    fx: [
      { isolation: 3, curiosity: 1 },
      { isolation: 1, emotion: 2, originality: 1 },
      { isolation: -3, leadership: 1 }
    ]
  },

  // CURIOSITY
  {
    tags: ["curiosity", "distraction"],
    q: "You are reading a book and it mentions a strange animal you have never heard of. What do you do?",
    a: [
      "Put the book down and spend an hour reading about the animal.",
      "Notice it, wonder for a second, and keep reading.",
      "Only look it up if knowing about it matters for the story."
    ],
    fx: [
      { curiosity: 4, discipline: -1 },
      { curiosity: 0 },
      { curiosity: -3, discipline: 2, strategy: 1 }
    ]
  },
  {
    tags: ["curiosity", "breadth"],
    q: "You are deep into a hobby you love. Then you discover a completely different one that also seems amazing. What happens?",
    a: [
      "I drop the first one because the new thing is more exciting right now.",
      "I try to do both at the same time, badly but happily.",
      "I finish what I started because I hate leaving things half-done."
    ],
    fx: [
      { curiosity: 4, discipline: -3 },
      { curiosity: 2, discipline: -1 },
      { curiosity: -2, discipline: 4, resilience: 1 }
    ]
  },
  {
    tags: ["curiosity", "depth"],
    q: "You understand how something works. Most people would move on. What do you do?",
    a: [
      "Keep going deeper because there is always something underneath the explanation.",
      "Move on since knowing how it works is enough.",
      "Look for a way to use what I just learned to do something new."
    ],
    fx: [
      { curiosity: 4, isolation: 1 },
      { curiosity: -3, strategy: 1 },
      { curiosity: 2, originality: 2, risk: 1 }
    ]
  },

  // RISK / ACTION
  {
    tags: ["recklessness", "action"],
    q: "You are running late. There is a shortcut but a real chance it gets you completely lost. What do you do?",
    a: [
      "Take it. If I get lost, I will figure it out.",
      "Stick to the normal path. Being safely late is better than being hopelessly lost.",
      "Check a map for thirty seconds, then decide."
    ],
    fx: [
      { risk: 4, ambition: 1 },
      { risk: -4, discipline: 1 },
      { risk: 1, strategy: 2 }
    ]
  },
  {
    tags: ["recklessness", "stakes"],
    q: "You saved up money for a whole year. Someone offers you the chance to double it, but you could also lose everything. Do you take it?",
    a: [
      "Yes. I have thought it through and am taking the bet.",
      "No. I earned that money and am not gambling it.",
      "Maybe half of it because I am not going all in."
    ],
    fx: [
      { risk: 4, ambition: 2 },
      { risk: -4, discipline: 2 },
      { risk: 1, strategy: 1 }
    ]
  },
  {
    tags: ["action", "speed"],
    q: "You have a plan that is 80% ready. Someone says wait until it is perfect. What do you do?",
    a: [
      "Start now. I will fix the other 20% while I move.",
      "Wait because a bad start can ruin everything.",
      "Start, but only share it with one trusted person first."
    ],
    fx: [
      { risk: 3, ambition: 2, perfectionism: -2 },
      { risk: -3, perfectionism: 3, discipline: 1 },
      { risk: 1, strategy: 2, isolation: 1 }
    ]
  },

  // SACRIFICE / OBSESSION
  {
    tags: ["sacrifice", "obsession"],
    q: "Would you keep working on something you really care about, even if it was making you physically sick?",
    a: [
      "Yes. The work matters more than how I feel right now.",
      "No. If I am sick, I stop. My health comes first.",
      "I would keep going but complain the whole time."
    ],
    fx: [
      { sacrifice: 4, resilience: 2 },
      { sacrifice: -4, strategy: 1 },
      { sacrifice: 2, emotion: 2 }
    ]
  },
  {
    tags: ["sacrifice", "relationships"],
    q: "You are deep in a project you care about. A good friend calls and genuinely needs help. What do you do?",
    a: [
      "Keep working. They will understand.",
      "Stop immediately. People always come before projects.",
      "Try to do both and stretch thin across both."
    ],
    fx: [
      { sacrifice: 3, isolation: 1 },
      { sacrifice: -4, emotion: 2, leadership: 1 },
      { sacrifice: 0, emotion: 1 }
    ]
  },
  {
    tags: ["sacrifice", "obsession", "craft"],
    q: "You have been practising the same thing for eight hours and you still think it is not right. What do you do?",
    a: [
      "Keep going. I will not stop until it feels right.",
      "Stop for the day. Rest makes you better.",
      "Record what I have, listen back, and decide tomorrow."
    ],
    fx: [
      { sacrifice: 4, perfectionism: 3, emotion: 2 },
      { sacrifice: -3, strategy: 2 },
      { sacrifice: 0, strategy: 2, perfectionism: 1 }
    ]
  },

  // PERFECTIONISM / CRAFT
  {
    tags: ["perfectionism", "idealism"],
    q: "You are building a sandcastle. The sun is setting and it is time to leave, but the castle is not perfect. What do you do?",
    a: [
      "Stay and fix it in the dark. It has to look right.",
      "Leave it. Building it was the point.",
      "Knock it down before I go so no one else touches it."
    ],
    fx: [
      { perfectionism: 4, originality: 1 },
      { perfectionism: -3, curiosity: 2 },
      { perfectionism: 2, ambition: 2, risk: 1 }
    ]
  },
  {
    tags: ["perfectionism", "standards"],
    q: "You finish something and it looks good, but you know you could do better. What do you do?",
    a: [
      "Start over from scratch.",
      "Fix the specific parts that bother me.",
      "Leave it. Good enough is fine if the deadline is real."
    ],
    fx: [
      { perfectionism: 4, originality: 1 },
      { perfectionism: 2, strategy: 1 },
      { perfectionism: -4, strategy: 1 }
    ]
  },
  {
    tags: ["perfectionism", "visibility"],
    q: "You spend two weeks on something no one will ever actually see, like the hidden inside of a product. Does that bother you?",
    a: [
      "No. If I know it is messy inside, I cannot leave it that way.",
      "A little. I would rather that time went somewhere visible.",
      "Yes. Invisible work that does not change the outcome is wasted time."
    ],
    fx: [
      { perfectionism: 4, sacrifice: 1 },
      { perfectionism: 0, emotion: 1 },
      { perfectionism: -3, strategy: 2, ambition: 1 }
    ]
  },

  // DISCIPLINE / METHOD
  {
    tags: ["discipline", "method"],
    q: "You want to learn how to play the piano. How do you start?",
    a: [
      "Same basic exercises every single day until they are automatic.",
      "Learn my favourite song immediately and work backwards from there.",
      "Read about how pianos are built and how music theory works first."
    ],
    fx: [
      { discipline: 4, sacrifice: 1 },
      { discipline: -2, risk: 2, originality: 1 },
      { discipline: 1, curiosity: 3 }
    ]
  },
  {
    tags: ["discipline", "routine"],
    q: "You have a goal that will take two years. Which approach sounds most like you?",
    a: [
      "The same routine every day with no shortcuts and no breaks.",
      "Work in huge bursts when I am motivated and rest when I am not.",
      "Constantly adjust the strategy based on what is actually working."
    ],
    fx: [
      { discipline: 4, strategy: 2 },
      { discipline: -3, emotion: 1 },
      { discipline: 0, strategy: 3, risk: 1 }
    ]
  },

  // LEADERSHIP / CONTROL
  {
    tags: ["leadership", "control"],
    q: "You and your friends are lost in the woods and everyone is arguing. What do you do?",
    a: [
      "Tell everyone to stop talking and declare which way we are going.",
      "Walk off to find the path myself. They will follow when I find it.",
      "Climb the tallest tree to see the whole forest before deciding anything."
    ],
    fx: [
      { leadership: 4, ambition: 1 },
      { leadership: 1, isolation: 2, risk: 1 },
      { leadership: 0, strategy: 3, curiosity: 1 }
    ]
  },
  {
    tags: ["leadership", "ego"],
    q: "The group voted on a plan you are certain is wrong. What do you do?",
    a: [
      "Push hard to change their minds. I know I am right.",
      "Go along with it but quietly track everything so I can say I told you so.",
      "Do my part, but build a backup plan on the side."
    ],
    fx: [
      { leadership: 4, ambition: 2 },
      { leadership: -1, emotion: 1 },
      { leadership: 1, strategy: 3 }
    ]
  },
  {
    tags: ["leadership", "loyalty"],
    q: "Someone on your team keeps making mistakes. What do you do?",
    a: [
      "Give them one direct conversation. If it keeps happening, they are out.",
      "Understand why it is happening first. Maybe the problem is the system, not them.",
      "Quietly move them to something they cannot get wrong."
    ],
    fx: [
      { leadership: 3, perfectionism: 2 },
      { leadership: 1, curiosity: 1, emotion: 1 },
      { leadership: 2, strategy: 3 }
    ]
  },

  // STRATEGY / PATIENCE
  {
    tags: ["strategy", "manipulation"],
    q: "Someone changes the rules of a game right before you are about to win. What do you do?",
    a: [
      "Figure out how to beat them using their own new rules.",
      "Refuse to play. That is not fair and I am not pretending it is.",
      "Make up my own rules to level it back out."
    ],
    fx: [
      { strategy: 4, ambition: 1 },
      { strategy: -2, originality: 1, resilience: 1 },
      { strategy: 1, risk: 2, originality: 1 }
    ]
  },
  {
    tags: ["patience", "long-game"],
    q: "You planted a seed that will take two years to grow. What do you do while you wait?",
    a: [
      "Check on it every day and keep everything perfect for it.",
      "Plant ten more seeds and stop thinking about the first one.",
      "Try to find a way to make it grow faster."
    ],
    fx: [
      { strategy: 4, perfectionism: 2, discipline: 1 },
      { strategy: -2, curiosity: 3, risk: 1 },
      { strategy: -3, risk: 3, ambition: 1 }
    ]
  },
  {
    tags: ["strategy", "observation"],
    q: "You walk into a party where you do not know anyone. What do you actually do?",
    a: [
      "Find a quiet spot and watch. I learn more by observing first.",
      "Start talking to someone immediately. Waiting is a waste of time.",
      "Find the most interesting person and go straight to them."
    ],
    fx: [
      { strategy: 3, isolation: 2 },
      { strategy: -3, risk: 2, leadership: 1 },
      { strategy: 1, ambition: 2, risk: 1 }
    ]
  },

  // OUTSIDER / AMBITION
  {
    tags: ["ambition", "outsider"],
    q: "You are the only person in the room who was not invited. Everyone else clearly belongs there. What do you do?",
    a: [
      "Act like I belong anyway. I will earn my place while I am here.",
      "Stay quiet and watch until I understand how the room works.",
      "Leave and come back when I have a stronger reason to be there."
    ],
    fx: [
      { ambition: 4, risk: 2, resilience: 1 },
      { ambition: -1, strategy: 3 },
      { ambition: 1, sacrifice: 2, strategy: 1 }
    ]
  },
  {
    tags: ["ambition", "drive"],
    q: "You just won something big. What is your first thought?",
    a: [
      "What is the next, harder thing I can go after?",
      "How do I make sure people understand what I just did?",
      "Finally, now I can breathe."
    ],
    fx: [
      { ambition: 4, risk: 1 },
      { ambition: 3, leadership: 1, emotion: 1 },
      { ambition: -4, emotion: 1 }
    ]
  },
  {
    tags: ["ambition", "resistance"],
    q: "People keep telling you that what you are trying to do is impossible. How does that affect you?",
    a: [
      "It makes me more determined. Doubt is just noise.",
      "It makes me want to prove them wrong in the most obvious way possible.",
      "It makes me re-examine my approach because maybe they see something I am missing."
    ],
    fx: [
      { resilience: 4, sacrifice: 1 },
      { ambition: 3, resilience: 2, risk: 1 },
      { resilience: -1, strategy: 3, curiosity: 1 }
    ]
  },

  // VISION / ORIGINALITY
  {
    tags: ["vision", "originality"],
    q: "You have a brilliant idea no one has ever tried before. What is your first instinct?",
    a: [
      "Spend weeks developing it quietly before showing anyone.",
      "Tell one trusted person and see how they react.",
      "Start building something immediately before the feeling fades."
    ],
    fx: [
      { originality: 4, isolation: 3 },
      { originality: 1, strategy: 1 },
      { originality: 2, risk: 4, ambition: 1 }
    ]
  },
  {
    tags: ["vision", "compromise"],
    q: "Someone offers to make your idea famous, but only if you change the most important part of it. What do you do?",
    a: [
      "Refuse. I would rather it stays unknown than become something it is not.",
      "Negotiate. Maybe there is a version that works for both of us.",
      "Accept. Getting it out there is better than keeping it perfect in a drawer."
    ],
    fx: [
      { originality: 4, perfectionism: 2 },
      { originality: -1, strategy: 3 },
      { originality: -4, risk: 2 }
    ]
  },

  // EMOTIONAL / ESCAPE
  {
    tags: ["escape", "emotion"],
    q: "The real world feels overwhelming. What actually helps?",
    a: [
      "Disappearing into something creative like music, art, or building.",
      "Going somewhere new and exploring.",
      "Sitting with one hard problem until everything else goes quiet."
    ],
    fx: [
      { emotion: 4, isolation: 2 },
      { emotion: 1, curiosity: 3, risk: 1 },
      { emotion: -3, curiosity: 3, isolation: 2 }
    ]
  },
  {
    tags: ["emotion", "expression"],
    q: "You feel something very strongly but nobody around you seems to care. What do you do?",
    a: [
      "Put that feeling into whatever I am making.",
      "Find a way to make people listen. I will not be invisible.",
      "Keep it to myself. What matters is what you actually do, not what you feel."
    ],
    fx: [
      { emotion: 4, originality: 1 },
      { emotion: 2, ambition: 2, leadership: 1 },
      { emotion: -4, discipline: 2 }
    ]
  },
  {
    tags: ["emotion", "trust"],
    q: "Someone you trusted completely let you down. How do you respond?",
    a: [
      "Withdraw. I become much more careful about who gets close to me.",
      "Confront them directly. I need them to understand what they did.",
      "Move on quietly. People let you down and that is just how it goes."
    ],
    fx: [
      { isolation: 3, emotion: 2 },
      { emotion: 2, leadership: 2, risk: 1 },
      { emotion: -3, strategy: 2, resilience: 1 }
    ]
  },

  // SYSTEMS / BIG PICTURE
  {
    tags: ["systems", "big-picture"],
    q: "You notice a small problem that everyone else is walking past. What do you do?",
    a: [
      "Watch it carefully. Small things become big things if you ignore them.",
      "Fix it right now before it grows.",
      "Write down why it happened so I can stop it from happening again."
    ],
    fx: [
      { strategy: 3, discipline: 1 },
      { strategy: -2, risk: 2, leadership: 1 },
      { strategy: 2, curiosity: 2, perfectionism: 1 }
    ]
  },
  {
    tags: ["systems", "planning"],
    q: "You are organising something big. What does your process actually look like?",
    a: [
      "I map out every step and every possible failure point before I move.",
      "I set the goal and the deadline and figure out the steps as I go.",
      "I find the right people and let them own their parts."
    ],
    fx: [
      { strategy: 4, discipline: 2, perfectionism: 1 },
      { strategy: -1, risk: 2, ambition: 1 },
      { strategy: 1, leadership: 3 }
    ]
  },

  // FINISHING / FOLLOW-THROUGH
  {
    tags: ["finishing", "follow-through"],
    q: "You are halfway through a project when a clearly better idea shows up. What do you do?",
    a: [
      "Drop the current one because the better idea is the point.",
      "Finish the current one no matter how long it takes.",
      "Work on both at once even if that means both take longer."
    ],
    fx: [
      { curiosity: 4, discipline: -3, risk: 1 },
      { discipline: 4, sacrifice: 2, resilience: 1 },
      { curiosity: 2, discipline: -1 }
    ]
  },
  {
    tags: ["finishing", "accountability"],
    q: "You made a commitment to something. Life gets complicated and it is easier to back out. What do you do?",
    a: [
      "Honour it no matter what. I said I would, so I will.",
      "Back out and be honest about why. People understand.",
      "Find a smaller version of the commitment I can still deliver."
    ],
    fx: [
      { discipline: 3, sacrifice: 3, resilience: 1 },
      { discipline: -3, emotion: 1 },
      { discipline: 1, strategy: 3 }
    ]
  }
];


// CONTRAST / TIEBREAKER QUESTIONS
// Used only when the top two candidates are very close after the
// main round. Each answer gives a strong, targeted trait push.

const CONTRAST = {
  einstein_tesla: { q: "You just had a breakthrough idea. What do you do first?", a: ["Write down the equations to prove it is actually true.", "Draw a picture of exactly what it will look like when it exists."], fx: [{ curiosity: 5, strategy: 2 }, { originality: 5, isolation: 2 }] },
  einstein_curie: { q: "What keeps you going when a problem gets very hard?", a: ["Pure curiosity. I just need to understand it.", "The thought of what solving it will change for other people."], fx: [{ curiosity: 5, isolation: 1 }, { sacrifice: 5, resilience: 2 }] },
  einstein_vinci: { q: "Your biggest problem is:", a: ["I focus so hard on one thing that I forget everything else exists.", "I get excited by every new thing and never quite finish the last one."], fx: [{ curiosity: 3, isolation: 4, discipline: 2 }, { curiosity: 4, discipline: -4 }] },
  einstein_franklin: { q: "You are trying to understand something difficult. What is the real goal?", a: ["Understanding it fully, for its own sake.", "Understanding it well enough to actually use it."], fx: [{ curiosity: 5, isolation: 2 }, { strategy: 4, curiosity: 2, isolation: -3 }] },
  tesla_jackson: { q: "What matters more to you?", a: ["That what I made has never been done before.", "That what I made makes people actually feel something."], fx: [{ originality: 5, isolation: 2 }, { emotion: 5, perfectionism: 2 }] },
  tesla_vinci: { q: "You have a huge creative idea. What is the problem?", a: ["The world is not ready for it and probably never will be.", "I already have twelve other ideas I have not finished."], fx: [{ originality: 5, isolation: 2 }, { curiosity: 5, discipline: -3 }] },
  tesla_curie: { q: "You are working alone on something nobody understands yet. What are you?", a: ["Certain. I can already see it working perfectly in my mind.", "Determined. I will keep going until the results speak for themselves."], fx: [{ originality: 5, perfectionism: 2 }, { sacrifice: 5, resilience: 3 }] },
  tesla_franklin: { q: "You have an idea nobody has tried before. What matters most?", a: ["That it stays exactly as pure as it was in my head.", "That I can actually build a working version of it."], fx: [{ originality: 5, isolation: 2 }, { strategy: 4, curiosity: 2 }] },
  jackson_jobs: { q: "Why does it have to be perfect?", a: ["Because anything less is a betrayal of what the art is supposed to be.", "Because anything less is an insult to the person who is going to use it."], fx: [{ emotion: 5, perfectionism: 2 }, { perfectionism: 5, leadership: 2 }] },
  jackson_curie: { q: "You gave everything to the work. What actually drove you?", a: ["I had to make something beautiful enough to match what I felt inside.", "I just had to find the answer. Stopping was never really an option."], fx: [{ emotion: 5, perfectionism: 2 }, { resilience: 5, sacrifice: 3 }] },
  vinci_musk: { q: "You love new ideas. But what actually happens to them?", a: ["Most live in notebooks. I explore them but rarely finish.", "Most get built fast, messy, imperfect, but real."], fx: [{ curiosity: 5, discipline: -3 }, { risk: 5, ambition: 2 }] },
  vinci_franklin: { q: "You start ten interesting projects. What happens to them?", a: ["Most stay unfinished. The exploring was the point.", "I try to steer them somewhere useful, even if it takes years."], fx: [{ curiosity: 5, discipline: -4 }, { discipline: 4, strategy: 3 }] },
  napoleon_musk: { q: "You are taking an enormous risk. What is the real reason?", a: ["Nobody else was going to fix this, so I had to.", "If it works, nobody will ever question me again."], fx: [{ risk: 4, ambition: 3 }, { ambition: 5, resilience: 2 }] },
  napoleon_franklin: { q: "You were never fully accepted by the people at the top. What did you do about it?", a: ["Outworked and outthought every single one of them until I could not be ignored.", "Built my own path and my own circle instead of chasing theirs."], fx: [{ ambition: 5, strategy: 3 }, { strategy: 3, discipline: 3, isolation: -2 }] },
  rockefeller_napoleon: { q: "Someone is in your way. How do you actually deal with them?", a: ["Outlast them. Wait for them to make a mistake, then move.", "Outmanoeuvre them. Hit them from a direction they are not watching."], fx: [{ strategy: 5, discipline: 2 }, { ambition: 5, strategy: 2 }] },
  rockefeller_curie: { q: "You are playing a very long game. What keeps you patient?", a: ["I can already see exactly how it ends. The plan is clear.", "I just take the next step. I do not need to see the whole path at once."], fx: [{ strategy: 5, discipline: 2 }, { sacrifice: 5, resilience: 3 }] },
  rockefeller_einstein: { q: "You are watching something everyone else is ignoring. Why?", a: ["Because I can already see the opportunity inside it.", "Because I want to understand it before I decide what to do."], fx: [{ strategy: 5, ambition: 2 }, { curiosity: 5, isolation: 2 }] },
  rockefeller_franklin: { q: "What matters more when you are building something long-term?", a: ["Controlling the whole system so nothing is left to chance.", "Staying curious and adaptable, even if that means less control."], fx: [{ strategy: 4, discipline: 3, emotion: -2 }, { curiosity: 4, strategy: 3, isolation: -2 }] },
  musk_napoleon: { q: "You are moving fast and people around you cannot keep up. What do you think?", a: ["I do not slow down. The mission matters more.", "I find the right people who can match the pace. Then I go faster."], fx: [{ risk: 5, ambition: 2 }, { ambition: 4, leadership: 3 }] },
  jobs_napoleon: { q: "People are pushing back against your vision. What do you do?", a: ["Refuse to compromise. The vision is right and they will see it eventually.", "Find a smarter way to bring them along without them realising you already won."], fx: [{ perfectionism: 5, originality: 2 }, { ambition: 4, strategy: 3 }] },
  jobs_rockefeller: { q: "What matters more at the end?", a: ["That it was beautiful and exactly what it should have been.", "That it worked and the numbers proved it."], fx: [{ perfectionism: 5, originality: 2 }, { strategy: 5, discipline: 2 }] },
  jobs_franklin: { q: "Something you made is functional but not beautiful. What is your reaction?", a: ["Unacceptable. It has to be right, even if it costs time and people.", "Fine for now. I will refine it once I know it actually works."], fx: [{ perfectionism: 5, leadership: 2 }, { strategy: 4, discipline: 2, perfectionism: -2 }] },
  curie_einstein: { q: "You keep working alone when everyone else has stopped. Why?", a: ["Because I have not found the answer yet and I need to.", "Because I am not done thinking yet."], fx: [{ sacrifice: 5, resilience: 2 }, { curiosity: 5, isolation: 2 }] },
  curie_franklin: { q: "Progress is painfully slow. How do you keep going?", a: ["I do not need it to feel good. I need it to be right, whatever it costs me.", "I adjust my method and try again because there is usually a better way through."], fx: [{ sacrifice: 5, resilience: 3 }, { strategy: 4, curiosity: 2 }] }
};

// USER STATE
// userTraits accumulates raw deltas from answers.
// traitEvidence tracks how many times each trait was touched,
// used to decide when we have enough signal to trust a core-trait check.

let userTraits = {};
let traitEvidence = {};

function resetTraitState() {
  userTraits = {};
  traitEvidence = {};
  for (const t of TRAITS) { userTraits[t] = 0; traitEvidence[t] = 0; }
}

function applyDeltas(deltas) {
  for (const t in deltas) {
    userTraits[t] = (userTraits[t] || 0) + deltas[t];
    traitEvidence[t] = (traitEvidence[t] || 0) + 1;
  }
}


// NORMALIZATION
// Raw deltas aren't 0-10 like figure profiles, so we normalize the
// user's vector onto roughly the same scale before comparing.
// We map each trait's accumulated delta through a soft curve so a
// handful of questions can approach the 0-10 range without one
// single extreme answer maxing it out.

function normalizedUserVector() {
  const out = {};
  for (const t of TRAITS) {
    const raw = userTraits[t] || 0;
    // soft clamp: tanh-like curve, scaled so ~8 accumulated delta ≈ 10
    const scaled = 5 + 5 * Math.tanh(raw / 6);
    out[t] = scaled;
  }
  return out;
}

// :) Ahhhhh!!!!
// MATCHING — weighted distance + core-trait gating
// Lower distance = better match. We convert to a similarity score
// for ranking (higher = better) so the rest of the app reads
// naturally like the old "scores" object.

const CORE_WEIGHT = 2.2;   // core traits count more toward distance
const CORE_PENALTY_FLOOR = 0.35; // if user is below this fraction of a
// core trait's expected level, apply
// a multiplicative confidence penalty

function computeMatchScores() {
  const uv = normalizedUserVector();
  const results = {};

  for (const key in FIGURES) {
    const fig = FIGURES[key];
    let weightedSqSum = 0;
    let totalWeight = 0;

    for (const t of TRAITS) {
      const isCore = fig.core.includes(t);
      const w = isCore ? CORE_WEIGHT : 1;
      const diff = uv[t] - fig.traits[t];
      weightedSqSum += w * diff * diff;
      totalWeight += w;
    }

    const weightedRMSE = Math.sqrt(weightedSqSum / totalWeight);
    // convert distance to a 0-1 similarity (max possible weighted RMSE ~10)
    let similarity = Math.max(0, 1 - weightedRMSE / 10);

    // core-trait gate: soft penalty, not hard exclusion
    let corePenalty = 1;
    for (const t of fig.core) {
      const expected = fig.traits[t];
      const got = uv[t];
      // only evaluate the gate if we actually have evidence on this trait
      if (traitEvidence[t] >= 1 && expected >= 6) {
        const fraction = got / expected;
        if (fraction < CORE_PENALTY_FLOOR) {
          corePenalty *= 0.6; // meaningful but not fatal
        } else if (fraction < 0.6) {
          corePenalty *= 0.85;
        }
      }
      // symmetric case: figure's core trait is a LOW value (e.g. Vinci's discipline)
      if (traitEvidence[t] >= 1 && expected <= 4) {
        if (got > expected + 5) {
          corePenalty *= 0.7;
        }
      }
    }

    results[key] = similarity * corePenalty;
  }

  return results; // { figureKey: similarity 0-1 }
}

function getTopFigures(n = 3) {
  const scores = computeMatchScores();
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}


// CONFIDENCE
// Driven by: gap between #1 and #2, how many questions answered,
// and whether #1's core traits are well-covered by evidence.
// Not a raw score ratio.

function getConfidence(sortedEntries, questionsAnswered) {
  if (!sortedEntries.length || sortedEntries[0][1] <= 0) {
    return { pct: 0, label: "" };
  }
  const [topKey, topScore] = sortedEntries[0];
  const secondScore = sortedEntries[1] ? sortedEntries[1][1] : 0;
  const gap = topScore - secondScore; // 0 - ~1 range typically

  const fig = FIGURES[topKey];
  const coveredCore = fig.core.filter(t => traitEvidence[t] >= 1).length;
  const coreCoverage = coveredCore / fig.core.length; // 0-1

  const questionFactor = Math.min(questionsAnswered / 8, 1); // ramps up to 1 by Q8

  // Base confidence from absolute match quality (topScore already 0-1)
  // plus a bonus for separation from the runner-up, scaled by how much
  // evidence and core-coverage we actually have.
  let pct = topScore * 60 + gap * 250 * questionFactor + coreCoverage * 15;
  pct = Math.min(Math.round(pct), 99);
  pct = Math.max(pct, 12);

  const label = pct >= 80 ? "Strong match"
    : pct >= 60 ? "Clear match"
      : pct >= 40 ? "Likely match"
        : "Partial match";
  return { pct, label };
}


// ADAPTIVE QUESTION SELECTION
// Instead of "what haven't I asked that overlaps the leaders",
// we pick the unused question whose trait deltas most separate the
// CURRENT top 3 candidates — i.e. highest expected information gain
// approximation. We simulate each candidate answer's effect on each
// top figure's projected similarity and reward questions where the
// answers would meaningfully re-order or separate the leaders.


function estimateSeparation(question, topKeys) {
  if (!topKeys.length) return Math.random(); // no signal yet, any question is fine

  // For each answer option, project a hypothetical user vector and
  // score the top figures. Variance across figures' resulting scores
  // (averaged across the answer options) approximates how well this
  // question could split the leaders.
  const baseUV = normalizedUserVector();
  let totalVariance = 0;

  for (const deltas of question.fx) {
    const projected = { ...userTraits };
    for (const t in deltas) projected[t] = (projected[t] || 0) + deltas[t];

    const projUV = {};
    for (const t of TRAITS) {
      projUV[t] = 5 + 5 * Math.tanh((projected[t] || 0) / 6);
    }

    const figScores = topKeys.map(key => {
      const fig = FIGURES[key];
      let sq = 0;
      for (const t of TRAITS) {
        const w = fig.core.includes(t) ? CORE_WEIGHT : 1;
        const diff = projUV[t] - fig.traits[t];
        sq += w * diff * diff;
      }
      return Math.sqrt(sq);
    });

    const mean = figScores.reduce((a, b) => a + b, 0) / figScores.length;
    const variance = figScores.reduce((a, b) => a + (b - mean) ** 2, 0) / figScores.length;
    totalVariance += variance;
  }

  return totalVariance / question.fx.length;
}

function selectNextQ(usedQSet) {
  const topKeys = getTopFigures(3);
  const unused = POOL.filter(q => !usedQSet.has(q.q));
  if (!unused.length) return null;

  if (!topKeys.length) {
    return unused[Math.floor(Math.random() * unused.length)];
  }

  const scored = unused.map(q => {
    const separation = estimateSeparation(q, topKeys);
    const tagDupe = q.tags.filter(t => usedTags.has(t)).length;
    const noise = Math.random() * 2; // small tie-breaking jitter
    return { q, score: separation - tagDupe * 1.5 + noise };
  }).sort((a, b) => b.score - a.score);

  return scored[0].q;
}
// Tracking :)
async function trackDeviceVisit() {
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) return;
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        user_agent: navigator.userAgent
      })
    });
  } catch { }
}

document.addEventListener("DOMContentLoaded", () => {
  trackDeviceVisit();
  updateThemeButtonText(document.documentElement.getAttribute("data-theme") || "light");
  if (document.getElementById("quiz-screen")) resetQuiz();
  if (document.getElementById("profile-space")) initFloatingProfiles();
});

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

function initFloatingProfiles() {
  const container = document.getElementById("profile-space");
  const items = container.querySelectorAll(".floating-profile");
  const W = container.clientWidth;
  const H = container.clientHeight;
  const PUSH_R = 100;
  const PUSH_R_SQ = PUSH_R * PUSH_R;

  let mouseX = -1000, mouseY = -1000;

  const data = Array.from(items).map((el, i) => {
    const w = el.offsetWidth || 120;
    const h = el.offsetHeight || 36;
    const cols = 3;
    const c = i % cols, r = Math.floor(i / cols);
    return {
      el,
      w, h,
      x: (W / cols) * c + W / (cols * 2) - (w / 2) + (Math.random() * 20 - 10),
      y: (H / 4) * r + 40 + (Math.random() * 20 - 10),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      ox: 0, oy: 0
    };
  });

  container.addEventListener("mousemove", e => {
    const r = container.getBoundingClientRect();
    mouseX = e.clientX - r.left;
    mouseY = e.clientY - r.top;
  });

  container.addEventListener("mouseleave", () => { mouseX = -1000; mouseY = -1000; });

  function tick() {
    for (const d of data) {
      d.x += d.vx;
      d.y += d.vy;

      if (d.x < 10) { d.x = 10; d.vx *= -1; }
      if (d.x + d.w > W - 10) { d.x = W - d.w - 10; d.vx *= -1; }
      if (d.y < 10) { d.y = 10; d.vy *= -1; }
      if (d.y + d.h > H - 10) { d.y = H - d.h - 10; d.vy *= -1; }

      const cx = d.x + d.w / 2, cy = d.y + d.h / 2;
      const dx = cx - mouseX, dy = cy - mouseY;
      const distSq = dx * dx + dy * dy;

      if (distSq < PUSH_R_SQ && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (PUSH_R - dist) / PUSH_R;
        const inv = 1 / dist;
        d.ox += (dx * inv * force * 45 - d.ox) * 0.15;
        d.oy += (dy * inv * force * 45 - d.oy) * 0.15;
      } else {
        d.ox *= 0.92;
        d.oy *= 0.92;
      }

      d.el.style.transform = `translate3d(${d.x + d.ox}px,${d.y + d.oy}px,0)`;
    }
    if (!document.hidden) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  const profileDisplayNames = {
    'einstein': 'Albert Einstein', 'tesla': 'Nikola Tesla', 'jackson': 'Michael Jackson',
    'vinci': 'Leonardo da Vinci', 'franklin': 'Benjamin Franklin', 'rockefeller': 'John D. Rockefeller',
    'musk': 'Elon Musk', 'napoleon': 'Napoleon Bonaparte', 'curie': 'Marie Curie', 'jobs': 'Steve Jobs'
  };

  fetch('/api/stats')
    .then(res => res.json())
    .then(stats => {
      document.getElementById('stat-visitors').textContent = stats.total_visitors?.toLocaleString() || '0';
      document.getElementById('stat-completions').textContent = stats.total_completions?.toLocaleString() || '0';
      document.getElementById('stat-figure').textContent = profileDisplayNames[stats.most_common_figure] || 'None yet';
    })
    .catch(() => {
      document.getElementById('stat-visitors').textContent = '—';
      document.getElementById('stat-completions').textContent = '—';
      document.getElementById('stat-figure').textContent = '—';
    });
}


// Quiz State


let activeQs = [];
let snapshots = [];   // snapshot of userTraits + traitEvidence per step, for "back"
let usedTags = new Set();
let currentIdx = 0;
let isRefinement = false;
let sortedResults = [];   // [ [figureKey, score], ... ] sorted desc

const TOTAL_QS = 9;

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

function startQuiz() {
  showDisclaimer();
}

function beginQuiz() {
  resetTraitState();
  activeQs = [];
  snapshots = [];
  usedTags = new Set();
  currentIdx = 0;
  isRefinement = false;
  sortedResults = [];

  const seedTags = ["curiosity", "leadership", "sacrifice", "recklessness", "perfectionism", "discipline"];
  const seedPool = POOL.filter(q => q.tags.some(t => seedTags.includes(t)));
  const shuffled = [...seedPool].sort(() => Math.random() - 0.5);

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
  const q = activeQs[currentIdx];
  const total = isRefinement ? activeQs.length : TOTAL_QS;
  const pct = isRefinement ? 100 : (currentIdx / total) * 100;

  document.getElementById('progress-bar').style.width = `${pct}%`;
  document.getElementById('progress-label').textContent = isRefinement
    ? "Final question"
    : `Question ${currentIdx + 1} of ${total}`;

  document.getElementById('prev-btn').disabled = currentIdx === 0 || isRefinement;
  document.getElementById('next-btn').textContent = "Skip →";
  document.getElementById('question-text').textContent = q.q;

  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.a.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-row-btn';
    btn.textContent = text;
    btn.onclick = () => selectOption(i, q);
    container.appendChild(btn);
  });
}

// Selection
function selectOption(idx, qObj) {
  snapshots[currentIdx] = { traits: { ...userTraits }, evidence: { ...traitEvidence } };

  applyDeltas(qObj.fx[idx]);

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
    userTraits = { ...snapshots[currentIdx].traits };
    traitEvidence = { ...snapshots[currentIdx].evidence };
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

// Tie Detection — now based on similarity gap, not raw score gap
function checkForTies() {
  const scores = computeMatchScores();
  sortedResults = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const [[key1, s1], [key2, s2]] = sortedResults;
  if (s1 > 0 && (s1 - s2) <= 0.06) {
    const key = findContrastKey(key1, key2);
    if (key) {
      isRefinement = true;
      activeQs = [CONTRAST[key]];
      currentIdx = 0;
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
  document.getElementById('quiz-screen').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';

  const terminal = document.getElementById('terminal');
  terminal.style.display = 'block';
  terminal.textContent = '';

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

function calculateResult() {
  const scores = computeMatchScores();
  sortedResults = Object.entries(scores)
    .map(([k, s]) => [k, s])
    .sort((a, b) => b[1] - a[1]);

  const terminal = document.getElementById('terminal');
  if (!sortedResults.length || sortedResults[0][1] <= 0) {
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

  const topKey = sortedResults[0][0];
  const top = FIGURES[topKey];
  trackCompletion(topKey, top.name);
  terminal.style.display = 'none';
  const rb = document.getElementById('archetype-result');
  rb.innerHTML = '';
  rb.style.display = 'block';
  renderPhaseOne();
}

async function trackCompletion(figureKey, figureName) {
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) return;
  try {
    await fetch('/api/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        figure_key: figureKey,
        figure_name: figureName,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        user_agent: navigator.userAgent
      })
    });
  } catch { }
}

function renderPhaseOne() {
  const topKey = sortedResults[0][0];
  const top = FIGURES[topKey];
  const { pct, label } = getConfidence(sortedResults, activeQs.length);

  const burstLines = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * 2 * Math.PI;
    return `<line x1="${(80 + Math.cos(a) * 54).toFixed(1)}" y1="${(80 + Math.sin(a) * 54).toFixed(1)}" x2="${(80 + Math.cos(a) * 74).toFixed(1)}" y2="${(80 + Math.sin(a) * 74).toFixed(1)}" stroke="var(--accent)" stroke-width="1" opacity="0.25"/>`;
  }).join('');

  const block = document.createElement('div');
  block.className = 'procedural-step-block';
  block.id = 'result-phase-1';
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
  const topKey = sortedResults[0][0];
  const top = FIGURES[topKey];
  const block = document.createElement('div');
  block.className = 'procedural-step-block';
  block.id = 'result-phase-2';
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
  const topKey = sortedResults[0][0];
  const top = FIGURES[topKey];
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
        ${sortedResults.map(([k, s]) => `
          <span class="score-tag-item${k === topKey ? ' active-high' : ''}">
            ${FIGURES[k].name.split(' ').pop()}: ${Math.round(s * 100)}
          </span>`).join('')}
      </div>
    </div>
    <button class="action-trigger" onclick="resetQuiz()" style="border-color:var(--accent);color:var(--accent);">
      <span>Take it again</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21.5 2v6h-6"/><path d="M21.34 15.57a10 10 0 1 1-.57-8.38L21.5 8"/>
      </svg>
    </button>  ${buildShareButton(topKey, top.name, top.subtitle)} `;
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
    } catch { }
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

// Reset
function resetQuiz() {
  document.getElementById('result-screen').style.display = 'none';
  const rb = document.getElementById('archetype-result');
  rb.style.display = 'none';
  rb.innerHTML = '';
  document.getElementById('intro-screen').style.display = 'block';
}