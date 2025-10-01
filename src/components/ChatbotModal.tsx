import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { X, Send, Mic, MicOff, Volume2, VolumeX, MessageCircle, Sparkles, Bot, Zap, Brain, Cpu, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CHATBOT_CONFIG, ChatMessage, ChatbotState, getRandomItem } from './ChatbotModal.config';
import SchedulingModalSimple from './SchedulingModalSimple';
import botImage from '../assets/bot1.svg';

// Initialize Gemini AI with error handling
let genAI: GoogleGenerativeAI | null = null;
try {
  if (CHATBOT_CONFIG.GEMINI.API_KEY && CHATBOT_CONFIG.GEMINI.API_KEY !== 'your-api-key-here') {
    genAI = new GoogleGenerativeAI(CHATBOT_CONFIG.GEMINI.API_KEY);
  }
} catch (error) {
  console.warn('Gemini AI initialization failed, using fallback responses:', error);
}

const ChatbotModal: React.FC = () => {
  const [chatbotState, setChatbotState] = useState<ChatbotState>({
    isOpen: false,
    messages: [],
    isLoading: false,
    isListening: false,
    isSpeaking: false,
    error: null,
  });

  const [isTTSEnabled, setIsTTSEnabled] = useState(CHATBOT_CONFIG.SPEECH.TTS.ENABLED);
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);

  const [inputMessage, setInputMessage] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize speech services
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize Speech Recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = CHATBOT_CONFIG.SPEECH.STT.CONTINUOUS;
        recognitionInstance.interimResults = CHATBOT_CONFIG.SPEECH.STT.INTERIM_RESULTS;
        recognitionInstance.lang = CHATBOT_CONFIG.SPEECH.STT.LANGUAGE;
        setRecognition(recognitionInstance);
      }

      // Initialize Speech Synthesis
      if ('speechSynthesis' in window) {
        setSynthesis(window.speechSynthesis);
      }
    }
  }, []);

  // Initialize greeting message when modal opens for the first time
  useEffect(() => {
    if (chatbotState.isOpen && chatbotState.messages.length === 0) {
      addBotMessage(getRandomItem(CHATBOT_CONFIG.PERSONALITY.GREETING_MESSAGES));

      // Log initialization status
      console.log('Chatbot initialized:', {
        hasGeminiAI: !!genAI,
        model: CHATBOT_CONFIG.GEMINI.MODEL,
        fallbackMode: !genAI ? 'Using smart fallback responses' : 'AI API available'
      });
    }
  }, [chatbotState.isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (CHATBOT_CONFIG.UI.AUTO_SCROLL) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatbotState.messages]);

  const addUserMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setChatbotState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const addBotMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'bot',
      timestamp: new Date(),
    };
    setChatbotState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  // Smart fallback responses based on keywords and predefined responses
  const getSmartFallbackResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();

    // Check for scheduling keywords first (highest priority)
    if (message.includes('schedule') || message.includes('appointment') || message.includes('meeting') || message.includes('book') || message.includes('calendar') || message.includes('yes book') || message.includes('appointment with akash')) {
      return "Great! I can help you schedule an appointment with Akash. Click the 'Schedule Appointment' button below to check his availability and book a meeting.\n\nAvailable appointment types:\n• Free Consultation (30 min) - Initial project discussion\n• Project Discussion (60 min) - Detailed planning\n• Technical Review (45 min) - Code or architecture review\n\nClick the purple 'Schedule Appointment' button to get started!";
    }

    // Handle friendly greetings and casual conversation
    if (message.includes('how are you') || message.includes('how r u') || message.includes('how do you do')) {
      const friendlyResponses = [
        "I'm doing great, thank you for asking! 😊 I'm here and ready to help you with any questions about our software development services. How can I assist you today?",
        "I'm fantastic! Thanks for asking! 🌟 I'm excited to help you learn more about our development services. What would you like to know?",
        "I'm doing wonderful, thanks! 😄 I love helping people discover how our software solutions can benefit their business. What can I help you with?",
        "I'm excellent, thank you! 🚀 I'm here to make your day better by helping with any questions about our services. How can I assist?"
      ];
      return friendlyResponses[Math.floor(Math.random() * friendlyResponses.length)];
    }

    if (message.includes('hello') || message.includes('hi ') || message === 'hi' || message.includes('hey')) {
      const greetings = [
        "Hello there! 👋 Great to meet you! I'm here to help you learn about our amazing software development services. What interests you most?",
        "Hi! 😊 Welcome! I'm excited to chat with you about how we can help bring your software ideas to life. What can I tell you about?",
        "Hey! 🌟 Nice to see you! I'm here to answer any questions about our development services. How can I help you today?",
        "Hello! 🚀 Thanks for stopping by! I'd love to help you discover our software solutions. What would you like to know?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening')) {
      return "Good day to you too! ☀️ I hope you're having a wonderful time. I'm here to help you with any questions about our software development services. What can I assist you with?";
    }

    if (message.includes('thank you') || message.includes('thanks') || message.includes('thx')) {
      return "You're very welcome! 😊 I'm always happy to help. Is there anything else you'd like to know about our services or how we can help with your project?";
    }

    // Check for exact matches in predefined responses
    const predefinedResponses = (CHATBOT_CONFIG as any).PREDEFINED_RESPONSES;
    if (predefinedResponses && predefinedResponses[message]) {
      return predefinedResponses[message];
    }

    // Handle specific professional/industry scenarios
    if (message.includes('dentist') || message.includes('dental')) {
      return "That's fantastic! 🦷 We specialize in healthcare software solutions, including dental practice management systems. We can build:\n\n• Patient management and scheduling systems\n• Digital patient records and treatment tracking\n• Appointment booking and reminder systems\n• Billing and insurance claim processing\n• Dental imaging and X-ray management\n• Mobile apps for patient communication\n• HIPAA-compliant secure platforms\n\nWe understand the unique needs of dental practices. Would you like to discuss your specific requirements?";
    }

    if (message.includes('doctor') || message.includes('medical') || message.includes('healthcare') || message.includes('clinic')) {
      return "Excellent! 🏥 We have extensive experience in healthcare software development:\n\n• Electronic Health Records (EHR) systems\n• Patient portal and telemedicine platforms\n• Medical practice management software\n• Appointment scheduling and patient communication\n• Medical billing and insurance processing\n• HIPAA-compliant secure solutions\n• Mobile health apps\n• Medical device integration\n\nWhat type of medical software are you looking to develop?";
    }

    if (message.includes('restaurant') || message.includes('food') || message.includes('cafe')) {
      return "Great choice! 🍽️ We create comprehensive restaurant management solutions:\n\n• Online ordering and delivery platforms\n• POS systems and payment processing\n• Table reservation and management\n• Inventory and supply chain management\n• Staff scheduling and payroll\n• Customer loyalty programs\n• Mobile apps for customers\n• Analytics and reporting dashboards\n\nWhat specific features are you looking for in your restaurant software?";
    }

    if (message.includes('retail') || message.includes('store') || message.includes('shop') || message.includes('ecommerce') || message.includes('e-commerce')) {
      return "Perfect! 🛍️ We build powerful retail and e-commerce solutions:\n\n• Custom e-commerce websites and platforms\n• Inventory management systems\n• POS and payment processing\n• Customer relationship management (CRM)\n• Multi-channel selling platforms\n• Mobile shopping apps\n• Analytics and sales reporting\n• Integration with marketplaces (Amazon, eBay, etc.)\n\nWhat kind of retail solution are you envisioning?";
    }

    if (message.includes('education') || message.includes('school') || message.includes('learning') || message.includes('student')) {
      return "Wonderful! 📚 We develop innovative educational technology solutions:\n\n• Learning Management Systems (LMS)\n• Student information systems\n• Online course platforms\n• Virtual classroom solutions\n• Student assessment and grading tools\n• Parent-teacher communication portals\n• Mobile learning apps\n• Educational content management\n\nWhat educational challenges are you looking to solve with software?";
    }

    if (message.includes('real estate') || message.includes('property')) {
      return "Excellent! 🏠 We create comprehensive real estate software solutions:\n\n• Property listing and management platforms\n• CRM for real estate agents\n• Virtual property tours and 3D visualization\n• Document management and e-signatures\n• Lead generation and marketing tools\n• Mobile apps for buyers and sellers\n• Property valuation and analytics\n• Integration with MLS systems\n\nWhat specific real estate software features do you need?";
    }

    if (message.includes('fitness') || message.includes('gym') || message.includes('workout')) {
      return "Great! 💪 We build comprehensive fitness and wellness software:\n\n• Gym management and membership systems\n• Personal trainer booking platforms\n• Workout tracking and fitness apps\n• Nutrition and meal planning tools\n• Class scheduling and payments\n• Wearable device integration\n• Progress tracking and analytics\n• Social fitness communities\n\nWhat fitness software solution are you looking to create?";
    }

    // Check for general service inquiries
    if (message.includes('service') || message.includes('what do you do') || message.includes('what do you offer')) {
      return predefinedResponses?.["what software development services do you offer"] ||
        "We offer comprehensive software development services including web development, mobile apps, AI/ML solutions, cloud services, and custom software development. What specific service interests you?";
    }

    if (message.includes('web') || message.includes('website')) {
      return "Fantastic! 🌐 We excel at web development using modern technologies:\n\n• React, Vue.js, Angular for frontend\n• Node.js, Python, PHP for backend\n• Responsive and mobile-friendly design\n• E-commerce and business websites\n• Progressive Web Apps (PWAs)\n• API development and integration\n• Database design and optimization\n• Cloud hosting and deployment\n\nWhat kind of web application are you looking to build?";
    }

    if (message.includes('mobile') || message.includes('app')) {
      return "Excellent! 📱 We create amazing mobile applications:\n\n• Native iOS and Android development\n• Cross-platform solutions (React Native, Flutter)\n• UI/UX design and prototyping\n• App Store optimization and deployment\n• Push notifications and real-time features\n• Payment integration and security\n• Backend API development\n• App maintenance and updates\n\nWhat type of mobile app do you have in mind?";
    }

    if (message.includes('ai') || message.includes('ml') || message.includes('artificial intelligence')) {
      return "Amazing! 🤖 We're passionate about AI and machine learning solutions:\n\n• Custom AI model development\n• Natural Language Processing (NLP)\n• Computer vision and image recognition\n• Predictive analytics and data science\n• Chatbots and virtual assistants\n• AI integration into existing systems\n• Machine learning pipelines\n• Deep learning solutions\n\nWhat AI capabilities are you looking to implement?";
    }

    if (message.includes('technology') || message.includes('tech') || message.includes('stack')) {
      return "Great question! 💻 We work with cutting-edge technologies:\n\n**Frontend:** React, Vue.js, Angular, TypeScript\n**Backend:** Node.js, Python, Django, PHP, Java\n**Mobile:** React Native, Flutter, Swift, Kotlin\n**Database:** PostgreSQL, MongoDB, MySQL, Redis\n**Cloud:** AWS, Azure, Google Cloud\n**DevOps:** Docker, Kubernetes, CI/CD\n**AI/ML:** TensorFlow, PyTorch, OpenAI APIs\n\nWe choose the best tech stack for your specific project needs!";
    }

    if (message.includes('price') || message.includes('cost') || message.includes('quote') || message.includes('budget')) {
      return "I'd love to help you with pricing! 💰 Our rates are competitive and depend on:\n\n• Project complexity and scope\n• Timeline requirements\n• Technology stack needed\n• Team size required\n\n**Typical ranges:**\n• Simple websites: $2,000 - $10,000\n• Mobile apps: $15,000 - $50,000\n• Enterprise solutions: $50,000+\n\nWould you like a free consultation to discuss your specific project and get an accurate quote?";
    }

    if (message.includes('contact') || message.includes('hire') || message.includes('work') || message.includes('get started')) {
      return "I'm excited to help you get started! Here's how you can connect with Akash directly:\n\nEmail Options:\n• contact@developerakash.com\n• akashyadav181198@gmail.com\n\nPhone: +91 9022445161\n\n• Free Consultation: Let's discuss your project\n• Quick Response: We typically respond within 24 hours\n• No Obligation: Get insights and recommendations\n• Custom Proposal: Tailored to your specific needs\n\nFeel free to reach out directly or click the Get In Touch button below!";
    }

    if (message.includes('email') || message.includes('mail') || message.includes('e-mail')) {
      return "Sure! Here are Akash's email addresses:\n\nBusiness Email: contact@developerakash.com\nPersonal Email: akashyadav181198@gmail.com\n\nFeel free to reach out for any software development inquiries or collaborations!";
    }

    if (message.includes('phone') || message.includes('number') || message.includes('call') || message.includes('mobile')) {
      return "You can reach Akash directly at:\n\nPhone: +91 9022445161\n\nFeel free to call for urgent matters or to schedule a consultation. For detailed project discussions, email might be better for sharing requirements and documentation!";
    }

    if (message.includes('akash') || message.includes('developer') || message.includes('who are you') || message.includes('about you')) {
      return "Hi! I'm Akash's AI assistant! I'm here to help you learn about Akash Yadav's software development services.\n\nContact Akash:\nEmail: contact@developerakash.com\nPhone: +91 9022445161\n\nAkash specializes in full-stack development, mobile apps, AI/ML solutions, and modern web technologies. How can I help you with your project today?";
    }

    if (message.includes('cloud') || message.includes('aws') || message.includes('azure') || message.includes('devops')) {
      return "Excellent! ☁️ We're cloud and DevOps experts:\n\n• **Cloud Migration:** Move your systems to the cloud\n• **Infrastructure Setup:** Scalable and secure architecture\n• **CI/CD Pipelines:** Automated deployment and testing\n• **Monitoring & Analytics:** Real-time system insights\n• **Cost Optimization:** Reduce cloud expenses\n• **Security:** Enterprise-grade protection\n• **Multi-Cloud:** AWS, Azure, Google Cloud expertise\n\nWhat cloud challenges are you looking to solve?";
    }

    // Default fallback
    return getRandomItem(CHATBOT_CONFIG.PERSONALITY.FALLBACK_RESPONSES);
  };

  const generateAIResponse = async (userMessage: string) => {
    try {
      setChatbotState(prev => ({ ...prev, isLoading: true, error: null }));

      // Check if Gemini AI is available
      if (!genAI) {
        throw new Error('Gemini AI not available, using fallback');
      }

      const model = genAI.getGenerativeModel({ model: CHATBOT_CONFIG.GEMINI.MODEL });

      const prompt = `${CHATBOT_CONFIG.PERSONALITY.SYSTEM_PROMPT}

User message: ${userMessage}

Please provide a helpful and engaging response about our software development services and capabilities. Keep it concise but informative.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setChatbotState(prev => ({ ...prev, isLoading: false }));

      // Add bot response
      setTimeout(() => {
        addBotMessage(text);

        // Speak the response if TTS is enabled
        if (isTTSEnabled && synthesis) {
          speakText(text);
        }
      }, CHATBOT_CONFIG.UI.TYPING_DELAY);

    } catch (error) {
      console.error('Error generating AI response:', error);
      setChatbotState(prev => ({
        ...prev,
        isLoading: false,
        error: null // Don't show error to user, use fallback instead
      }));

      // Use smart fallback response
      setTimeout(() => {
        const fallbackResponse = getSmartFallbackResponse(userMessage);
        addBotMessage(fallbackResponse);

        // Speak the response if TTS is enabled
        if (isTTSEnabled && synthesis) {
          speakText(fallbackResponse);
        }
      }, CHATBOT_CONFIG.UI.TYPING_DELAY);
    }
  };

  const speakText = (text: string) => {
    if (!synthesis || !isTTSEnabled) return;

    // Cancel any ongoing speech
    synthesis.cancel();

    // Clean text for speech - remove emojis and special formatting
    const cleanTextForSpeech = (text: string): string => {
      return text
        // Remove emojis
        .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
        // Remove markdown formatting
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        // Remove bullet points and special characters
        .replace(/[•·]/g, '')
        // Replace line breaks with periods for natural speech
        .replace(/\n+/g, '. ')
        // Clean up multiple spaces
        .replace(/\s+/g, ' ')
        // Remove extra punctuation
        .replace(/\.{2,}/g, '.')
        .trim();
    };

    const cleanText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = CHATBOT_CONFIG.SPEECH.TTS.RATE;
    utterance.pitch = CHATBOT_CONFIG.SPEECH.TTS.PITCH;
    utterance.volume = CHATBOT_CONFIG.SPEECH.TTS.VOLUME;

    utterance.onstart = () => {
      setChatbotState(prev => ({ ...prev, isSpeaking: true }));
    };

    utterance.onend = () => {
      setChatbotState(prev => ({ ...prev, isSpeaking: false }));
    };

    utterance.onerror = () => {
      setChatbotState(prev => ({ ...prev, isSpeaking: false }));
    };

    synthesis.speak(utterance);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const message = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    addUserMessage(message);
    
    // Generate AI response
    await generateAIResponse(message);

    // Check for contact keywords
    const hasContactKeyword = CHATBOT_CONFIG.CONTACT.TRIGGER_KEYWORDS.some(keyword =>
      message.toLowerCase().includes(keyword)
    );
    
    // Check for scheduling keywords
    const hasSchedulingKeyword = ['schedule', 'appointment', 'meeting', 'book', 'calendar'].some(keyword =>
      message.toLowerCase().includes(keyword)
    );
    
    if (hasContactKeyword) {
      setTimeout(() => {
        addBotMessage(`I'd be happy to help you get in touch with Akash! You can scroll down to the contact section or click the "${CHATBOT_CONFIG.CONTACT.CTA_TEXT}" button.`);
      }, 2000);
    }
    
    if (hasSchedulingKeyword) {
      setTimeout(() => {
        addBotMessage("Great! I can help you schedule an appointment with Akash. Click the 'Schedule Appointment' button below to check his availability and book a meeting.");
      }, 2000);
    }
  };

  const startListening = () => {
    if (!recognition) {
      setChatbotState(prev => ({ 
        ...prev, 
        error: CHATBOT_CONFIG.ERROR_MESSAGES.SPEECH_NOT_SUPPORTED 
      }));
      return;
    }

    setChatbotState(prev => ({ ...prev, isListening: true, error: null }));

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setInputMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setChatbotState(prev => ({ 
        ...prev, 
        isListening: false,
        error: event.error === 'not-allowed' 
          ? CHATBOT_CONFIG.ERROR_MESSAGES.MIC_PERMISSION_DENIED
          : CHATBOT_CONFIG.ERROR_MESSAGES.SPEECH_NOT_SUPPORTED
      }));
    };

    recognition.onend = () => {
      setChatbotState(prev => ({ ...prev, isListening: false }));
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setChatbotState(prev => ({ ...prev, isListening: false }));
  };

  const toggleSpeech = () => {
    // Toggle TTS on/off
    setIsTTSEnabled(prev => !prev);

    // If currently speaking, stop it
    if (chatbotState.isSpeaking && synthesis) {
      synthesis.cancel();
      setChatbotState(prev => ({ ...prev, isSpeaking: false }));
    }
  };

  const closeModal = () => {
    setChatbotState(prev => ({ ...prev, isOpen: false }));
    if (synthesis) {
      synthesis.cancel();
    }
    if (recognition) {
      recognition.stop();
    }
  };

  const openModal = () => {
    setChatbotState(prev => ({ ...prev, isOpen: true }));
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById(CHATBOT_CONFIG.CONTACT.SECTION_ID);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      closeModal();
    }
  };

  const handleSchedulingClick = () => {
    // Close the chat modal and open scheduling modal in the same place
    setChatbotState(prev => ({ ...prev, isOpen: false }));
    setIsSchedulingOpen(true);
  };

  return (
    <>
      <PermanentChatbotButton onOpenModal={openModal} />
      <SchedulingModalSimple 
        isOpen={isSchedulingOpen} 
        onClose={() => setIsSchedulingOpen(false)} 
      />
      <AnimatePresence>
        {chatbotState.isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 400, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px]"
          >
            <div
              className="relative w-full h-full backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(148, 163, 184, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Professional Header */}
              <div className="relative p-4 border-b border-slate-700/50" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>
                {/* Circuit pattern background */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 20">
                    <defs>
                      <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M0 10h5m5 0h5m5 0h5M10 0v5m0 5v5m0 5v5" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)"/>
                  </svg>
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {/* Robot Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center border border-indigo-400/50 shadow-lg">
                        <Bot className="h-6 w-6 text-white" />
                        {/* Glowing eyes */}
                        <div className="absolute top-2 left-3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-2 right-3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                      </div>
                      {/* Status indicator */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                          {CHATBOT_CONFIG.PERSONALITY.NAME}
                        </h2>
                        <Cpu className="h-4 w-4 text-blue-400 animate-pulse" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <p className="text-xs text-slate-300 font-medium">Online & Ready</p>
                        </div>
                        <Brain className="h-3 w-3 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleSpeech}
                      className="text-slate-300 hover:text-white hover:bg-slate-600/30 rounded-xl h-9 w-9 border border-slate-500/30 backdrop-blur-sm transition-all duration-200"
                    >
                      {isTTSEnabled ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <VolumeX className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeModal}
                      className="text-indigo-300 hover:text-white hover:bg-red-500/30 rounded-xl h-9 w-9 border border-indigo-500/30 backdrop-blur-sm transition-all duration-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
                {/* Background tech pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-8 h-8 border border-indigo-400 rotate-45"></div>
                  <div className="absolute top-12 right-8 w-6 h-6 border border-purple-400 rotate-12"></div>
                  <div className="absolute bottom-16 left-8 w-4 h-4 border border-cyan-400 rotate-45"></div>
                </div>

                {chatbotState.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] relative ${message.sender === 'user' ? 'ml-4' : 'mr-4'}`}>
                      {message.sender === 'bot' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Bot className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-xs text-indigo-300 font-medium">AI Assistant</span>
                        </div>
                      )}

                      <div
                        className={`p-3 rounded-2xl backdrop-blur-sm border break-words ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-indigo-600/80 to-purple-600/80 border-indigo-400/30 text-white shadow-lg'
                            : 'bg-gradient-to-r from-slate-700/80 to-slate-600/80 border-slate-500/30 text-white shadow-lg'
                        }`}
                        style={{
                          boxShadow: message.sender === 'user'
                            ? '0 8px 32px -8px rgba(79, 70, 229, 0.3)'
                            : '0 8px 32px -8px rgba(71, 85, 105, 0.3)'
                        }}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

                        {/* Message glow effect */}
                        <div className={`absolute inset-0 rounded-2xl opacity-20 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-indigo-400 to-purple-400'
                            : 'bg-gradient-to-r from-slate-400 to-slate-300'
                        } blur-sm -z-10`}></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {chatbotState.isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className={`${CHATBOT_CONFIG.UI.THEME.BOT_MESSAGE_BG} p-3 rounded-2xl`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {chatbotState.error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center"
                  >
                    <div className="bg-red-600/20 border border-red-500/30 p-3 rounded-2xl">
                      <p className="text-red-400 text-sm">{chatbotState.error}</p>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {chatbotState.messages.length <= 1 && CHATBOT_CONFIG.FEATURES.QUICK_REPLIES && (
                <div className="px-4 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {CHATBOT_CONFIG.QUICK_REPLIES.slice(0, 3).map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputMessage(reply);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        className="text-xs px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-full transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Futuristic Input Area */}
              <div className="p-4 border-t border-indigo-500/30 bg-gradient-to-r from-slate-800/50 to-indigo-900/50">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Neural interface ready..."
                      className="w-full px-4 py-3 bg-slate-800/60 border border-indigo-500/30 rounded-2xl text-white placeholder-indigo-300/60 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm backdrop-blur-sm transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(67, 56, 202, 0.2) 100%)',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(99, 102, 241, 0.1)'
                      }}
                      disabled={chatbotState.isLoading}
                    />
                    {/* Input glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  {CHATBOT_CONFIG.FEATURES.VOICE_INPUT && (
                    <div className="relative group">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={chatbotState.isListening ? stopListening : startListening}
                        className={`rounded-2xl h-12 w-12 border transition-all duration-300 ${
                          chatbotState.isListening
                            ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white border-red-400/50 shadow-lg shadow-red-500/25'
                            : 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-indigo-300 border-indigo-500/30'
                        }`}
                        disabled={chatbotState.isLoading}
                        title={chatbotState.isListening ? "Stop listening" : "Tap to speak"}
                      >
                        {chatbotState.isListening ? (
                          <MicOff className="h-5 w-5" />
                        ) : (
                          <Mic className="h-5 w-5" />
                        )}
                        {chatbotState.isListening && (
                          <div className="absolute inset-0 rounded-2xl bg-red-400 animate-pulse opacity-30"></div>
                        )}
                      </Button>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900/95 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-slate-600/50 backdrop-blur-sm">
                        {chatbotState.isListening ? "Stop listening" : "Tap to speak"}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || chatbotState.isLoading}
                    className="rounded-2xl h-12 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white disabled:opacity-50 border border-indigo-400/30 shadow-lg shadow-indigo-500/25 transition-all duration-300 disabled:shadow-none"
                  >
                    <Send className="h-5 w-5" />
                    {!chatbotState.isLoading && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </Button>
                </div>
              </div>

              {/* Futuristic Contact CTA */}
              <div className="px-4 pb-4 space-y-3">
                <Button
                  onClick={handleContactClick}
                  className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold py-3 rounded-2xl text-sm border border-cyan-400/30 shadow-lg shadow-cyan-500/25 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="h-4 w-4 group-hover:animate-pulse" />
                    <span>{CHATBOT_CONFIG.CONTACT.CTA_TEXT}</span>
                    <Sparkles className="h-4 w-4 group-hover:animate-spin" />
                  </div>
                  {/* Holographic effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
                
                <Button
                  onClick={handleSchedulingClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-500 text-white font-bold py-3 rounded-2xl text-sm border border-blue-400/30 shadow-lg shadow-blue-500/25 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="h-4 w-4 group-hover:animate-pulse" />
                    <span>Schedule Appointment</span>
                    <Clock className="h-4 w-4 group-hover:animate-spin" />
                  </div>
                  {/* Holographic effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Permanent Chatbot Button Component
interface PermanentChatbotButtonProps {
  onOpenModal: () => void;
}

const PermanentChatbotButton: React.FC<PermanentChatbotButtonProps> = ({ onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 0.8, delay: 0.5 }}
    >
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 rounded-full blur-xl opacity-40 animate-pulse" />

        {/* Circuit ring */}
        <div className="absolute inset-2 border border-slate-500/50 rounded-full animate-spin" style={{ animationDuration: '8s' }}>
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute left-0 top-1/2 w-1 h-1 bg-slate-400 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute right-0 top-1/2 w-1 h-1 bg-slate-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Main robot button */}
        <motion.button
          onClick={onOpenModal}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-20 h-20 rounded-full shadow-2xl backdrop-blur-sm transition-all duration-300 overflow-hidden group"
          aria-label="Chat with AI Assistant"
          style={{
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.6)'
          }}
        >
          {/* Robot face - full size image */}
          <img 
            src={botImage} 
            alt="AI Bot" 
            className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
          />
          {/* Glowing robot eyes - positioned over the image */}
          <div className="absolute top-3 left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-3 right-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>

          {/* Online activity indicator */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-slate-800 flex items-center justify-center z-10">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </motion.button>

        {/* Futuristic Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, x: 10, scale: 0.8, rotateY: -15 }}
              className="absolute right-full bottom-full mb-2 mr-4 px-4 py-3 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl text-white text-sm rounded-2xl shadow-2xl border border-slate-600/50 whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)',
                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(148, 163, 184, 0.2)'
              }}
            >
              {/* Circuit pattern */}
              <div className="absolute inset-0 opacity-20 rounded-2xl overflow-hidden">
                <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-blue-400/50"></div>
                <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-slate-400/50"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-slate-500/50"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-blue-500/50"></div>
              </div>

              <div className="relative flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Bot className="h-4 w-4 text-blue-400" />
                  <Sparkles className="h-3 w-3 text-slate-400 animate-pulse" />
                </div>
                <span className="font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Chat with AkashAI
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center space-x-1">
                <Brain className="h-3 w-3" />
                <span>Software Development Help</span>
              </p>

              {/* Holographic arrow */}
              <div className="absolute left-full top-1/2 -translate-y-1/2">
                <div className="w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-transparent border-l-slate-500/80"></div>
                <div className="absolute -left-2 -top-1 w-0 h-0 border-l-6 border-r-0 border-t-3 border-b-3 border-transparent border-l-blue-400/60"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating tech particles */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Data streams */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`stream-${i}`}
              className="absolute w-0.5 h-3 bg-gradient-to-t from-transparent via-cyan-400 to-transparent"
              animate={{
                y: [-20, -50, -20],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0, 0.8, 0],
                scaleY: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
              style={{
                left: `${15 + i * 25}%`,
                top: '20%',
              }}
            />
          ))}

          {/* Binary code particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`binary-${i}`}
              className="absolute text-xs font-mono text-indigo-400/60"
              animate={{
                y: [-15, -40, -15],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1.2,
              }}
              style={{
                left: `${25 + i * 20}%`,
                top: '15%',
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.div>
          ))}

          {/* Circuit dots */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`circuit-${i}`}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              animate={{
                scale: [0.5, 1.2, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 1,
              }}
              style={{
                left: `${30 + i * 40}%`,
                top: `${25 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatbotModal;
