// GameModal Configuration
// Customize these settings to modify the behavior of your game modal

export const GAME_CONFIG = {
  // Auto-open timer (in milliseconds)
  AUTO_OPEN_DELAY: 5000, // 5 seconds

  // Memory game settings
  MEMORY_GAME: {
    GOOD_SCORE_TIME: 90, // seconds
    CARDS: [
      '🚀', '💻', '🎯', '⚡', '🔥', '💡', '🎨', '🌟',
      '🚀', '💻', '🎯', '⚡', '🔥', '💡', '🎨', '🌟'
    ]
  },

  // Trivia quiz settings
  TRIVIA: {
    PASSING_SCORE: 70, // percentage
    QUESTIONS: [
      {
        q: "AI can help you save time at work by doing which of these?",
        options: ["Cooking meals", "Automating repetitive tasks", "Driving your car", "Taking holidays for you"],
        answer: "Automating repetitive tasks"
      },
      {
        q: "Which of these is something AI can already do today?",
        options: ["Write emails", "Teleport humans", "Grow plants", "Build houses"],
        answer: "Write emails"
      },
      {
        q: "If your business had an AI assistant that never sleeps, what is the most useful task it could handle?",
        options: ["Replying to customer queries", "Taking naps", "Going on vacation", "Playing video games"],
        answer: "Replying to customer queries"
      },
      {
        q: "Which industry is AI currently helping the most?",
        options: ["Healthcare", "Ice-cream making", "Fishing", "Carpentry"],
        answer: "Healthcare"
      },
      {
        q: "Which company created ChatGPT, one of the most famous AI tools?",
        options: ["OpenAI", "NASA", "Microsoft Excel", "Meta"],
        answer: "OpenAI"
      }
    ]
  },

  // Result messages with AI personalization
  MESSAGES: {
    WIN: "🎉 You're good! I owe you a special discount on your next project with me.",
    LOSE: "😏 You obviously owe me a project now. Let's connect!",
    DRAW: "🤝 Well played! Looks like we're evenly matched. Let's collaborate.",
    MEMORY_WIN: "🎉 Excellent memory! You are a genius!",
    MEMORY_LOSE: "⏰ Good try! You definitely owe me a project now.",
    // AI-powered dynamic messages
    FIRST_WIN: "🎉 Impressive first win! You've got potential. Let's discuss your project!",
    STREAK_WIN: "🔥 You're on fire! Multiple wins deserve a special discount!",
    COMEBACK_WIN: "💪 Great comeback! Your persistence shows you'd be perfect for challenging projects!",
    EXPERT_WIN: "🏆 Expert level! You clearly know quality when you see it. Let's work together!"
  },

  // AI Features
  AI_FEATURES: {
    DIFFICULTY_ADJUSTMENT: true,
    PERSONALIZED_MESSAGES: true,
    GAME_RECOMMENDATIONS: true,
    PROGRESS_TRACKING: true
  },

  // Contact integration
  CONTACT: {
    SECTION_ID: "contact", // ID of your contact section
    CTA_TEXT: "Work With Me"
  },

  // Animation settings
  ANIMATIONS: {
    MODAL_DURATION: 0.5,
    CARD_FLIP_DURATION: 0.3,
    RESULT_DELAY: 1500 // milliseconds
  }
};

// Game themes/colors
export const GAME_THEMES = {
  TIC_TAC_TOE: {
    PLAYER_COLOR: 'text-blue-600',
    BOT_COLOR: 'text-red-600',
    BOARD_COLOR: 'bg-gray-100 dark:bg-gray-800'
  },
  TRIVIA: {
    CORRECT_COLOR: 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200',
    WRONG_COLOR: 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-200',
    SELECTED_COLOR: 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
  MEMORY: {
    CARD_BACK_COLOR: 'bg-blue-500 hover:bg-blue-600',
    CARD_FRONT_COLOR: 'bg-white dark:bg-gray-700',
    MATCHED_RING: 'ring-2 ring-green-400'
  }
};

// Export types for TypeScript
export interface TriviaQuestion {
  q: string;
  options: string[];
  answer: string;
}

export type GameResult = 'win' | 'lose' | 'draw';
export type GameScreen = 'selection' | 'tic-tac-toe' | 'trivia' | 'memory';
