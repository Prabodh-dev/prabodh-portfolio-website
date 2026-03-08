// Centralized ghost speech controller
let currentTimeout: NodeJS.Timeout | null = null;

export const ghostSpeak = (message: string, duration: number = 3000) => {
  // Cancel any existing timeout to prevent overlap
  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }
  
  const event = new CustomEvent('ghost-speak', {
    detail: { message, duration }
  });
  window.dispatchEvent(event);
  
  // Set new timeout
  currentTimeout = setTimeout(() => {
    currentTimeout = null;
  }, duration);
};

// Helper to pick random message from array
export const randomMessage = (messages: string[]) => {
  return messages[Math.floor(Math.random() * messages.length)];
};

// Comprehensive Ghost Messages
export const GHOST_MESSAGES = {
  // ━━ NAVIGATION ━━
  nav: {
    home: "Back to base camp",
    about: "Want to know my secrets?",
    skills: "Checking my spellbook...",
    projects: "Enter the haunted lab",
    experience: "My journey through the void...",
    contact: "Trying to reach me? Bold move",
  },
  
  // ━━ HOME SECTION ━━
  home: {
    photo: "Hey! That's the human I'm haunting",
    name: "Yes, that's my human's name. Say it 3 times",
    subtitle: "Jack of all trades, ghost of all code",
    levelBar: "Max level. No respawns needed",
    quest: "Current mission: world domination... I mean, coding",
    bio: "That's the official story. The truth is spookier",
    viewProjects: "Ooh, want to see the haunted builds?",
    downloadResume: "Summoning the ghost scroll...",
    github: "Entering the code crypt",
    linkedin: "Connecting with the living world",
  },
  
  // ━━ ABOUT SECTION ━━
  about: {
    card: "Learning more about me? Brave soul",
    stats: "These numbers don't lie. Unlike ghosts",
  },
  
  // ━━ SKILLS SECTION ━━
  skills: {
    hover: [
      "Ooh, that's a powerful spell",
      "Leveled up this one the hard way",
      "This skill? Forged in countless bugs",
      "Still grinding this one...",
    ],
    category: "This whole school of magic? Mastered",
  },
  
  // ━━ PROJECTS SECTION ━━
  projects: {
    hover: [
      "This one took 3 nights and 2 energy drinks",
      "Built with blood, sweat, and Stack Overflow",
      "My haunted masterpiece",
      "Still alive... barely",
    ],
    demo: "Launching into the unknown",
    github: "Source code revealed",
  },
  
  // ━━ EXPERIENCE SECTION ━━
  experience: {
    hover: [
      "Ah, this chapter of the story...",
      "Survived this one with my sanity intact... mostly",
      "Leveled up big time here",
      "Good times in the grind dimension",
    ],
    company: "This place shaped the ghost you see today",
    timeline: "Time flies when you're haunting the office",
  },
  
  // ━━ CONTACT SECTION ━━
  contact: {
    form: "Go ahead, summon me",
    input: [
      "Type carefully, I'm watching",
      "Spill the beans... or the ectoplasm",
      "I read all messages. ALL of them",
    ],
    submit: "Message delivered to the ghost realm",
    email: "Yes, that email works. Surprisingly",
  },
  
  // ━━ GENERAL / AMBIENT ━━
  ambient: {
    welcome: "BOO! Welcome to my realm, mortal",
    scrollDown: "Diving deeper into the void...",
    scrollTop: "Back from the depths!",
    idle: [
      "Still there? I can feel your presence",
      "Boo... did I scare you into silence?",
      "Hello? Don't leave me here alone...",
      "Your cursor went ghost mode too",
    ],
    backFromIdle: "Oh you're back! I missed haunting you",
    emptyClick: "Nothing here but fog and feelings",
    rightClick: "Inspecting my secrets? Nerdy. I respect it",
  },
  
  // ━━ SECTION SCROLL MESSAGES ━━
  sections: {
    about: "Exploring the About zone...",
    skills: "Checking out my spooky skills...",
    projects: "Enter the haunted project gallery...",
    certifications: "Looking at my ghostly credentials...",
    experience: "Walking through my career graveyard...",
    contact: "Ready to reach out from beyond?",
  },
};
