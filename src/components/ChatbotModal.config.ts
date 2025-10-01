// ChatbotModal Configuration
// Customize these settings to modify the behavior of your AI chatbot modal

export const CHATBOT_CONFIG = {
  // Chatbot is now permanently visible - no auto-open needed
  AUTO_OPEN_DELAY: 0, // Disabled

  // Gemini API Configuration
  GEMINI: {
    API_KEY: "", // Set to empty to use fallback mode - replace with your valid API key
    MODEL: "gemini-pro", // Using the more stable model
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.7,
  },

  // Speech Configuration
  SPEECH: {
    // Text-to-Speech settings
    TTS: {
      ENABLED: true,
      VOICE_NAME: "Google US English", // Fallback voice
      RATE: 1.0,
      PITCH: 1.0,
      VOLUME: 0.8,
    },
    // Speech-to-Text settings
    STT: {
      ENABLED: true,
      LANGUAGE: "en-US",
      CONTINUOUS: false,
      INTERIM_RESULTS: true,
    },
  },

  // Chatbot Personality & System Prompt
  PERSONALITY: {
    NAME: "AI Assistant",
    ROLE: "Software Development Services Assistant",
    SYSTEM_PROMPT: `You are a professional AI assistant for a software development company. You help visitors understand our comprehensive software development services and capabilities.

Our Core Services:
- Custom Software Development (Web Applications)
- Full Stack Development (React, Node.js, Python, Django, etc.)
- AI/ML Solutions and Integration
- Cloud Solutions and DevOps
- Database Design and Management
- API Development and Integration
- E-commerce Solutions
- UI/UX Design and Development
- Software Consulting and Architecture

Be warm, friendly, and genuinely helpful while maintaining professionalism.
Show enthusiasm and use emojis appropriately to create a welcoming atmosphere.
Respond to casual greetings and personal questions in a friendly way before guiding to business topics.
Keep responses concise but valuable, and always make users feel welcomed and valued.`,
    GREETING_MESSAGES: [
      "👋 Hi there! I'm your friendly AI assistant, and I'm genuinely excited to meet you! I'm here to help you discover our amazing software development services. What can I tell you about? 😊",
      "🌟 Hello and welcome! I hope you're having a wonderful day! I'd love to help you explore how our talented development team can bring your ideas to life. What interests you most?",
      "🚀 Hey there! It's great to see you here! I'm thrilled to chat about our software solutions and how we can help your business thrive. What would you like to know?",
      "💡 Hi! I'm here to make your day brighter by answering any questions about our development services. I'm all ears - how can I help you today? ✨",
    ],
    FALLBACK_RESPONSES: [
      "I'd absolutely love to help you with that! 😊 Could you please rephrase your question so I can give you the best answer?",
      "That's a great question! 🤔 I'm thinking about how our software development services might be perfect for what you need. Could you tell me a bit more?",
      "I want to give you the most helpful answer possible! ✨ Could you provide a bit more context about your project or what you're looking for?",
      "You know what? I'm really excited to help you! 🚀 Could you rephrase that so I can point you in the right direction?",
    ],
  },

  // UI Configuration
  UI: {
    MAX_MESSAGES: 50,
    TYPING_DELAY: 1000, // milliseconds
    AUTO_SCROLL: true,
    SHOW_TIMESTAMPS: false,
    THEME: {
      PRIMARY_COLOR: "from-slate-700 to-indigo-600",
      SECONDARY_COLOR: "from-slate-600 to-indigo-500",
      BACKGROUND: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
      TEXT_COLOR: "text-white",
      USER_MESSAGE_BG: "bg-indigo-600",
      BOT_MESSAGE_BG: "bg-slate-700",
    },
  },

  // Contact Integration
  CONTACT: {
    SECTION_ID: "contact",
    CTA_TEXT: "Get In Touch",
    TRIGGER_KEYWORDS: ["contact", "hire", "work", "collaborate", "project", "service", "quote", "estimate"],
  },

  // Animation Settings
  ANIMATIONS: {
    MODAL_DURATION: 0.5,
    MESSAGE_DURATION: 0.3,
    TYPING_INDICATOR_DURATION: 0.5,
  },

  // Features
  FEATURES: {
    VOICE_INPUT: true,
    VOICE_OUTPUT: true,
    TYPING_INDICATOR: true,
    MESSAGE_TIMESTAMPS: false,
    CONVERSATION_MEMORY: true,
    QUICK_REPLIES: true,
  },

  // Quick Reply Suggestions
  QUICK_REPLIES: [
    "What software development services do you offer?",
    "Tell me about web development",
    "Do you build mobile applications?",
    "What technologies do you work with?",
    "How can I get a project quote?",
    "Tell me about AI/ML solutions",
  ],

  // Predefined responses for common questions
  PREDEFINED_RESPONSES: {
    "what software development services do you offer": "We offer comprehensive software development services including:\n\n• Custom Web Applications (React, Node.js, Python)\n• Mobile App Development (iOS & Android)\n• AI/ML Solutions & Integration\n• Cloud Services & DevOps\n• API Development & Integration\n• E-commerce Solutions\n• Database Design & Management\n• UI/UX Design\n\nWhat specific service interests you most?",

    "tell me about web development": "We specialize in modern web development using cutting-edge technologies:\n\n• Frontend: React, TypeScript, Next.js, Tailwind CSS\n• Backend: Node.js, Python, Django, Express.js\n• Databases: PostgreSQL, MongoDB, Redis\n• Cloud: AWS, Azure, Google Cloud\n\nWe build responsive, scalable, and secure web applications tailored to your business needs.",

    "do you build mobile applications": "Yes! We develop both native and cross-platform mobile applications:\n\n• Native iOS (Swift) & Android (Kotlin)\n• Cross-platform with React Native & Flutter\n• Progressive Web Apps (PWAs)\n• Mobile-first responsive design\n\nOur mobile apps are optimized for performance, user experience, and app store guidelines.",

    "what technologies do you work with": "We work with a comprehensive tech stack:\n\n• Languages: JavaScript, TypeScript, Python, Java, Swift, Kotlin\n• Frontend: React, Vue.js, Angular, Next.js\n• Backend: Node.js, Django, Express, FastAPI\n• Databases: PostgreSQL, MongoDB, MySQL, Redis\n• Cloud: AWS, Azure, Google Cloud, Docker\n• AI/ML: TensorFlow, PyTorch, OpenAI APIs\n\nWe choose the best technologies based on your project requirements.",

    "how can i get a project quote": "Getting a project quote is easy! Here's how:\n\n1. Contact us through our website or email\n2. We'll schedule a free consultation call\n3. Discuss your project requirements and goals\n4. Receive a detailed proposal with timeline and pricing\n\nWe offer competitive rates and flexible engagement models. Ready to get started?",

    "tell me about ai/ml solutions": "We provide comprehensive AI/ML solutions:\n\n• Custom AI Chatbots & Virtual Assistants\n• Predictive Analytics & Data Science\n• Computer Vision & Image Processing\n• Natural Language Processing (NLP)\n• Machine Learning Model Development\n• AI Integration into existing systems\n\nOur AI solutions help automate processes and provide intelligent insights for your business."
  },

  // Error Messages
  ERROR_MESSAGES: {
    API_ERROR: "I'm here to help! Let me assist you with information about our software development services.",
    SPEECH_NOT_SUPPORTED: "Speech recognition isn't supported in your browser. You can still type your messages!",
    MIC_PERMISSION_DENIED: "I need microphone permission to hear you. You can enable it in your browser settings.",
    NETWORK_ERROR: "I'm still here to help! Let me know what you'd like to know about our services.",
    RATE_LIMIT: "I'm getting a lot of requests right now. Please wait a moment before trying again.",
  },
};

// Export types for TypeScript
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  error: string | null;
}

// Utility function to get random item from array
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
