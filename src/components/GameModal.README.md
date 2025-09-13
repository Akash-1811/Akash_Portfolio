# GameModal Component

A comprehensive React component for your portfolio website that includes an interactive game modal with multiple games to engage visitors.

## Features

### 🚦 Auto-Popup Trigger
- Automatically opens after 5 seconds of page load
- Smooth scale + fade animation using Framer Motion
- Centered modal with backdrop blur

### 🎮 Three Games Included

#### 1. Tic Tac Toe
- Human vs AI gameplay (Human = X, AI = O)
- Smart AI that blocks winning moves and tries to win
- Clean 3x3 clickable grid
- Real-time turn indicators

#### 2. Trivia Quiz
- 5 multiple-choice questions about AI basics
- Progress bar and question counter
- 70% threshold for winning
- Easily customizable questions via JSON structure

#### 3. Memory Game
- 16 cards (8 pairs) matching game
- 90-second time limit for good score
- Real-time timer and pair counter
- Smooth flip animations

### 🎯 Smart Result System
- **Win**: "🎉 You're good! I owe you a special discount on your next project with me."
- **Lose**: "😏 You obviously owe me a project now. Let's connect!"
- **Draw** (Tic Tac Toe): "🤝 Well played! Looks like we're evenly matched. Let's collaborate."

### 📱 Mobile-Friendly
- Responsive design that works on all screen sizes
- Touch-friendly interactions
- Fullscreen modal on small devices

## Installation

The component is already installed and integrated into your portfolio. Dependencies included:
- `framer-motion` for animations
- Existing Radix UI components
- Tailwind CSS for styling

## Usage

The component is already added to your `src/pages/Index.tsx`:

```tsx
import GameModal from "@/components/GameModal";

// In your component
<GameModal />
```

## Customization

### Changing the Auto-Open Timer
Edit line 52 in `GameModal.tsx`:
```tsx
const timer = setTimeout(() => {
  setGameState(prev => ({ ...prev, isOpen: true }));
}, 5000); // Change 5000 to desired milliseconds
```

### Adding New Trivia Questions
Edit the `triviaQuestions` array (lines 21-41):
```tsx
const triviaQuestions: TriviaQuestion[] = [
  {
    q: "Your question here?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "Correct Option"
  },
  // Add more questions...
];
```

### Customizing Memory Game
- Change cards: Edit `memoryCards` array (line 44)
- Change time limit: Edit line 695 (`timeTaken <= 90`)
- Change grid size: Modify the grid classes in the JSX

### Adding New Games
The component is designed to be extensible:

1. Add new game type to the `GameState` interface
2. Add new game option in `GameSelection` component
3. Create your new game component following the existing pattern
4. Add the new game to the main modal content area

### Customizing Result Messages
Edit the `getResultMessage()` function (lines 85-95):
```tsx
const getResultMessage = () => {
  switch (gameState.gameResult) {
    case 'win':
      return "Your custom win message";
    case 'lose':
      return "Your custom lose message";
    // etc...
  }
};
```

### Changing Contact Integration
The "Work With Me" button scrolls to an element with ID "contact". Make sure your contact section has this ID:
```tsx
<div id="contact">
  <ContactSection />
</div>
```

## Component Structure

```
GameModal/
├── Main Modal Container
├── GameSelection (3 game cards)
├── TicTacToe (with AI logic)
├── TriviaQuiz (with progress tracking)
├── MemoryGame (with timer)
└── Result Display (with CTA button)
```

## Styling

The component uses Tailwind CSS classes and supports dark mode automatically through your existing theme provider.

## Performance

- Games are only rendered when selected (conditional rendering)
- Smooth animations without performance impact
- Optimized re-renders using proper React patterns

## Browser Support

Works in all modern browsers that support:
- CSS Grid
- Flexbox
- ES6+ JavaScript features
- Framer Motion animations
