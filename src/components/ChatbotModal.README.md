# AI Chatbot Modal Component

A sophisticated AI-powered chatbot for your portfolio website with voice interaction capabilities using Google's Gemini AI.

## 🤖 Features

### Core Functionality
- **Gemini AI Integration**: Powered by Google's Gemini 1.5 Flash model
- **Voice Input**: Speech-to-text for hands-free interaction
- **Voice Output**: Text-to-speech responses with natural voice
- **Smart Personality**: Trained on your portfolio, projects, and expertise
- **Permanent Visibility**: Always accessible floating button (no auto-popup)

### UI/UX Design
- **Modern Design**: Gradient backgrounds with glassmorphism effects
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Works perfectly on all devices
- **Professional Styling**: Matches your portfolio's dark theme
- **Visual Indicators**: Online status, typing indicators, and loading states

### Positioning
- **WhatsApp Button**: Bottom-left corner with green styling
- **AI Chatbot Button**: Bottom-right corner with purple/indigo gradient
- **No Overlap**: Properly spaced to avoid UI conflicts

## 🎯 Smart Features

### Conversation Intelligence
- **Context Awareness**: Knows about your projects (Receptionista, Aadhaar Capital, SpeakBook, ASQS)
- **Service Recognition**: Understands your AI/ML, web development, and consulting services
- **Contact Integration**: Automatically suggests contacting you for business inquiries
- **Quick Replies**: Suggested questions for easy user engagement

### Voice Capabilities
- **Speech Recognition**: Uses browser's native Web Speech API
- **Natural Voice**: High-quality text-to-speech synthesis
- **Voice Controls**: Microphone button for input, speaker toggle for output
- **Error Handling**: Graceful fallbacks when voice features aren't supported

## 🛠️ Technical Implementation

### Components Structure
```
ChatbotModal/
├── Main Modal Container (600px height)
├── Header (with controls and status)
├── Messages Area (scrollable chat)
├── Quick Replies (for new users)
├── Input Area (text + voice input)
├── Contact CTA Button
└── Permanent Floating Button
```

### API Integration
- **Model**: Gemini 1.5 Flash
- **API Key**: Configured in `ChatbotModal.config.ts`
- **System Prompt**: Customized for your portfolio context
- **Error Handling**: Fallback responses for API failures

### Browser Compatibility
- **Speech Recognition**: Chrome, Edge, Safari (with webkit prefix)
- **Speech Synthesis**: All modern browsers
- **Fallback**: Text-only mode when voice features unavailable

## 🎨 Styling

### Color Scheme
- **Primary**: Indigo to Purple gradient (`from-indigo-600 to-purple-600`)
- **Hover**: Lighter gradient (`from-indigo-500 to-purple-500`)
- **Background**: Dark gradient (`from-gray-900 via-gray-800 to-gray-900`)
- **Messages**: User (indigo), Bot (slate gray)

### Animations
- **Button Entrance**: Spring animation with 0.5s delay
- **Hover Effects**: Scale and glow transformations
- **Message Transitions**: Smooth fade-in from bottom
- **Typing Indicator**: Bouncing dots animation

## 🔧 Configuration

### Key Settings (ChatbotModal.config.ts)
```typescript
GEMINI: {
  API_KEY: "your-api-key",
  MODEL: "gemini-1.5-flash",
  TEMPERATURE: 0.7
},
SPEECH: {
  TTS: { ENABLED: true },
  STT: { ENABLED: true }
},
PERSONALITY: {
  NAME: "Akash AI Assistant",
  SYSTEM_PROMPT: "Customized for your expertise"
}
```

### Customization Options
- **Greeting Messages**: Multiple random greetings
- **Quick Replies**: Suggested conversation starters
- **Error Messages**: User-friendly error handling
- **Contact Keywords**: Triggers for business inquiries

## 🚀 Usage

The chatbot is automatically integrated into your portfolio:

1. **Permanent Button**: Always visible in bottom-right corner
2. **Click to Open**: Opens full chat modal interface
3. **Voice Interaction**: Click microphone to speak, speaker to toggle audio
4. **Smart Responses**: Ask about projects, skills, services, or contact info
5. **Contact Integration**: Seamlessly connects to your contact section

## 🎮 Replaced Features

The AI Chatbot has replaced the previous GameModal while preserving all code:
- **Games Hidden**: Tic-tac-toe, Trivia, Memory games are commented out
- **Code Preserved**: Can be easily restored by uncommenting in Index.tsx
- **Same Position**: Uses the same floating button area
- **Better Engagement**: More professional and business-focused

## 🔍 Testing

### Voice Features
1. **Microphone Permission**: Browser will request permission on first use
2. **Speech Input**: Click mic button and speak clearly
3. **Voice Output**: Responses are automatically spoken (toggle with speaker icon)
4. **Fallback**: Text input always available if voice fails

### AI Responses
- Ask about your projects: "Tell me about Receptionista"
- Inquire about services: "What services does Akash offer?"
- Technical questions: "What are Akash's AI/ML skills?"
- Contact requests: "How can I hire Akash?"

## 📱 Mobile Optimization

- **Touch-Friendly**: Large buttons and touch targets
- **Responsive**: Adapts to all screen sizes
- **Performance**: Optimized animations and rendering
- **Accessibility**: Proper ARIA labels and keyboard navigation

The AI Chatbot provides a professional, engaging way for visitors to learn about your work and connect with you for potential collaborations!
