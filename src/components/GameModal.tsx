import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Brain, Grid3X3, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { GAME_CONFIG, GAME_THEMES, type TriviaQuestion, type GameResult, type GameScreen } from './GameModal.config';
import GameModalTrigger from './GameModalTrigger';

// Types
interface GameState {
  isOpen: boolean;
  currentScreen: GameScreen;
  gameResult: GameResult | null;
}

interface UserProfile {
  gamesPlayed: string[];
  totalScore: number;
  preferredGameType: string | null;
  visitCount: number;
  lastVisit: string;
}

// AI-powered features
const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! ☀️";
  if (hour < 17) return "Good afternoon! 🌤️";
  return "Good evening! 🌙";
};

const getPersonalizedMessage = (profile: UserProfile): string => {
  const { gamesPlayed, visitCount, preferredGameType } = profile;

  if (visitCount === 1) {
    return "Welcome! Let's see what you're made of! 🚀";
  }

  if (gamesPlayed.length === 0) {
    return "Ready for your first challenge? 🎯";
  }

  if (preferredGameType === 'tic-tac-toe') {
    return "Back for more strategic battles? 🧠";
  }

  if (preferredGameType === 'trivia') {
    return "Ready to test your knowledge again? 📚";
  }

  if (preferredGameType === 'memory') {
    return "Time to challenge that memory of yours! 🧩";
  }

  return `Welcome back! You've played ${gamesPlayed.length} games so far! 🎮`;
};

const getAIRecommendation = (profile: UserProfile): string => {
  const { gamesPlayed, totalScore } = profile;

  if (gamesPlayed.length === 0) {
    return "🤖 AI Suggests: Start with Tic Tac Toe - it's quick and fun!";
  }

  if (!gamesPlayed.includes('memory') && totalScore > 50) {
    return "🤖 AI Suggests: Try Memory Game - you seem sharp enough!";
  }

  if (!gamesPlayed.includes('trivia') && gamesPlayed.includes('tic-tac-toe')) {
    return "🤖 AI Suggests: Test your knowledge with our Trivia Quiz!";
  }

  if (totalScore < 30) {
    return "🤖 AI Suggests: Practice makes perfect - try again!";
  }

  return "🤖 AI Suggests: Challenge yourself with a different game!";
};

interface GameModalProps {
  isOpen?: boolean;
  onOpenModal?: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen: externalIsOpen, onOpenModal }) => {
  const [gameState, setGameState] = useState<GameState>({
    isOpen: false,
    currentScreen: 'selection',
    gameResult: null
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('gameModalProfile');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      gamesPlayed: [],
      totalScore: 0,
      preferredGameType: null,
      visitCount: 0,
      lastVisit: new Date().toISOString()
    };
  });

  // Update user profile
  useEffect(() => {
    const updatedProfile = {
      ...userProfile,
      visitCount: userProfile.visitCount + 1,
      lastVisit: new Date().toISOString()
    };
    setUserProfile(updatedProfile);
    localStorage.setItem('gameModalProfile', JSON.stringify(updatedProfile));
  }, []);

  // Auto-open modal after configured delay (only once per session)
  useEffect(() => {
    // Check if modal has been shown in this session
    const hasShownModal = sessionStorage.getItem('gameModalShown');

    if (!hasShownModal) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, isOpen: true }));
        // Mark as shown for this session
        sessionStorage.setItem('gameModalShown', 'true');
      }, GAME_CONFIG.AUTO_OPEN_DELAY);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setGameState({
      isOpen: false,
      currentScreen: 'selection',
      gameResult: null
    });
  };

  const openModal = () => {
    setGameState(prev => ({ ...prev, isOpen: true }));
  };

  const selectGame = (game: 'tic-tac-toe' | 'trivia' | 'memory') => {
    setGameState(prev => ({
      ...prev,
      currentScreen: game,
      gameResult: null
    }));
  };

  const backToSelection = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'selection',
      gameResult: null
    }));
  };

  const handleGameResult = (result: 'win' | 'lose' | 'draw') => {
    setGameState(prev => ({ ...prev, gameResult: result }));

    // Update user profile with AI tracking
    const currentGame = gameState.currentScreen;
    const scoreIncrement = result === 'win' ? 20 : result === 'draw' ? 10 : 5;

    const updatedProfile = {
      ...userProfile,
      gamesPlayed: [...new Set([...userProfile.gamesPlayed, currentGame])],
      totalScore: userProfile.totalScore + scoreIncrement,
      preferredGameType: userProfile.gamesPlayed.filter(game => game === currentGame).length >= 2
        ? currentGame
        : userProfile.preferredGameType
    };

    setUserProfile(updatedProfile);
    localStorage.setItem('gameModalProfile', JSON.stringify(updatedProfile));
  };

  const getResultMessage = () => {
    const { gameResult } = gameState;
    const { gamesPlayed, totalScore } = userProfile;

    if (!gameResult) return "";

    // AI-powered dynamic messages based on user history
    if (gameResult === 'win') {
      if (gamesPlayed.length === 1 && totalScore === 20) {
        return GAME_CONFIG.MESSAGES.FIRST_WIN;
      }
      if (totalScore >= 100) {
        return GAME_CONFIG.MESSAGES.EXPERT_WIN;
      }
      if (totalScore >= 60) {
        return GAME_CONFIG.MESSAGES.STREAK_WIN;
      }
      return GAME_CONFIG.MESSAGES.WIN;
    }

    if (gameResult === 'lose') {
      return GAME_CONFIG.MESSAGES.LOSE;
    }

    if (gameResult === 'draw') {
      return GAME_CONFIG.MESSAGES.DRAW;
    }

    return "";
  };

  const handleWorkWithMe = () => {
    // Scroll to contact section or open contact form
    const contactSection = document.getElementById(GAME_CONFIG.CONTACT.SECTION_ID);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      closeModal();
    }
  };

  return (
    <>
      <GameModalTrigger onOpenModal={openModal} />
      <AnimatePresence>
        {gameState.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-transparent bg-clip-padding rounded-3xl shadow-2xl backdrop-blur-xl max-w-md w-full mx-3 overflow-hidden relative"
            style={{
              backgroundImage: 'linear-gradient(135deg, #1f2937, #111827, #1f2937), linear-gradient(135deg, #374151, #4f46e5, #374151)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle dark blue animated border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-slate-600/20 via-indigo-500/20 to-slate-600/20 blur-sm -z-10" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-600 via-indigo-500 to-slate-600 rounded-3xl opacity-15 animate-pulse" />

            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none rounded-3xl" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
            {/* Header */}
            <div className="relative flex items-center justify-between p-3 border-b border-gray-700/30">
              <h2 className="text-base font-bold text-white flex items-center gap-2 flex-1 pr-2">
                {gameState.currentScreen === 'selection' && (
                  <>
                    <span className="text-lg">🚦</span>
                    <span className="text-sm leading-tight">Play quick game and grab some discounts on your first project!</span>
                  </>
                )}
                {gameState.currentScreen === 'tic-tac-toe' && (
                  <>
                    <span className="text-lg">🎯</span>
                    <span>Tic Tac Toe</span>
                  </>
                )}
                {gameState.currentScreen === 'trivia' && (
                  <>
                    <span className="text-lg">🧠</span>
                    <span>Trivia Quiz</span>
                  </>
                )}
                {gameState.currentScreen === 'memory' && (
                  <>
                    <span className="text-lg">🧩</span>
                    <span>Memory Game</span>
                  </>
                )}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
                className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full h-7 w-7 flex-shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Content */}
            <div className="relative p-3">
              {gameState.currentScreen === 'selection' && (
                <GameSelection onSelectGame={selectGame} userProfile={userProfile} />
              )}
              
              {gameState.currentScreen === 'tic-tac-toe' && (
                <TicTacToe 
                  onGameEnd={handleGameResult}
                  onBack={backToSelection}
                  gameResult={gameState.gameResult}
                />
              )}
              
              {gameState.currentScreen === 'trivia' && (
                <TriviaQuiz
                  questions={GAME_CONFIG.TRIVIA.QUESTIONS}
                  onGameEnd={handleGameResult}
                  onBack={backToSelection}
                  gameResult={gameState.gameResult}
                />
              )}
              
              {gameState.currentScreen === 'memory' && (
                <MemoryGame 
                  onGameEnd={handleGameResult}
                  onBack={backToSelection}
                  gameResult={gameState.gameResult}
                />
              )}

              {/* Result Message and CTA */}
              {gameState.gameResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center space-y-2.5 p-3 bg-gray-800/40 rounded-xl border border-gray-700/40 relative overflow-hidden"
                >
                  {/* Subtle dark blue background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-700/5 via-indigo-600/5 to-slate-700/5" />

                  <p className="text-xs font-medium text-white leading-relaxed relative z-10">
                    {getResultMessage()}
                  </p>
                  <Button
                    onClick={handleWorkWithMe}
                    className="bg-gradient-to-r from-slate-700 to-indigo-600 hover:from-slate-600 hover:to-indigo-500 text-white px-4 py-1.5 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-200 relative z-10 border border-slate-500/20"
                  >
                    {GAME_CONFIG.CONTACT.CTA_TEXT}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

// Game Selection Component
interface GameSelectionProps {
  onSelectGame: (game: 'tic-tac-toe' | 'trivia' | 'memory') => void;
  userProfile: UserProfile;
}

const GameSelection: React.FC<GameSelectionProps> = ({ onSelectGame, userProfile }) => {
  const games = [
    {
      id: 'tic-tac-toe' as const,
      title: 'Tic Tac Toe',
      subtitle: 'X & O - Human vs Bot',
      icon: Grid3X3,
      description: 'Classic strategy game. Can you beat my AI?',
      color: 'bg-blue-500'
    },
    {
      id: 'trivia' as const,
      title: 'Trivia Quiz',
      subtitle: 'Know Akash + AI Basics',
      icon: Brain,
      description: 'Test your knowledge about AI and more!',
      color: 'bg-purple-500'
    },
    {
      id: 'memory' as const,
      title: 'Memory Game',
      subtitle: 'Match the pairs',
      icon: Clock,
      description: 'How good is your memory? Beat the clock!',
      color: 'bg-green-500'
    }
  ];

  const greeting = getTimeBasedGreeting();
  const personalizedMsg = getPersonalizedMessage(userProfile);
  const aiRecommendation = getAIRecommendation(userProfile);

  return (
    <div className="space-y-2">
      {/* AI-Powered Personalized Header */}
      <div className="text-center space-y-1 mb-3">
        <p className="text-xs text-slate-300 font-medium">
          {greeting}
        </p>
        <p className="text-xs text-gray-300">
          {personalizedMsg}
        </p>

        {/* User Stats */}
        {userProfile.gamesPlayed.length > 0 && (
          <div className="flex justify-center space-x-3 text-xs">
            <span className="bg-gray-800/50 px-2 py-1 rounded-full text-gray-300">
              🎮 {userProfile.gamesPlayed.length} games
            </span>
            <span className="bg-gray-800/50 px-2 py-1 rounded-full text-gray-300">
              ⭐ {userProfile.totalScore} points
            </span>
          </div>
        )}

        <div className="bg-gradient-to-r from-slate-700/20 to-indigo-600/20 rounded-lg p-2 border border-slate-600/30">
          <p className="text-xs text-slate-300 font-medium">
            {aiRecommendation}
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        {games.map((game) => {
          const IconComponent = game.icon;
          const isRecommended = aiRecommendation.toLowerCase().includes(game.title.toLowerCase());
          const hasPlayed = userProfile.gamesPlayed.includes(game.id);

          return (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div
                className={`cursor-pointer transition-all duration-200 group relative overflow-hidden rounded-xl p-3 ${
                  isRecommended
                    ? 'bg-gradient-to-r from-slate-700/30 to-indigo-600/30 border border-slate-500/50 hover:border-indigo-400/70'
                    : 'bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/40 hover:border-slate-500/60'
                }`}
                onClick={() => onSelectGame(game.id)}
              >
                {/* Shiny hover effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                  isRecommended
                    ? 'bg-gradient-to-r from-slate-600/10 via-indigo-500/10 to-slate-600/10'
                    : 'bg-gradient-to-r from-slate-700/5 via-slate-600/5 to-slate-700/5'
                }`} />

                

                {/* Played Badge */}
                {hasPlayed && (
                  <div className="absolute top-1 left-1 bg-green-500/80 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    ✓
                  </div>
                )}

                <div className="flex items-center space-x-3 relative">
                  <div className={`${game.color} p-1.5 rounded-lg text-white group-hover:scale-110 transition-transform duration-200 ${
                    isRecommended ? 'ring-2 ring-indigo-400/50' : ''
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-semibold truncate ${
                      isRecommended ? 'text-slate-200' : 'text-white'
                    }`}>
                      {game.title}
                    </h3>
                    <p className={`text-xs font-medium truncate ${
                      isRecommended ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      {game.subtitle}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                      {game.description}
                    </p>
                  </div>
                  <div className={`transition-colors duration-200 flex-shrink-0 ${
                    isRecommended
                      ? 'text-slate-400 group-hover:text-indigo-300'
                      : 'text-slate-500 group-hover:text-slate-400'
                  }`}>
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Tic Tac Toe Component
interface TicTacToeProps {
  onGameEnd: (result: 'win' | 'lose' | 'draw') => void;
  onBack: () => void;
  gameResult: 'win' | 'lose' | 'draw' | null;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ onGameEnd, onBack, gameResult }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (squares: (string | null)[]): string | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = (squares: (string | null)[]): boolean => {
    return squares.every(square => square !== null);
  };

  const getBestMove = (squares: (string | null)[]): number => {
    // Check if bot can win
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        const testSquares = [...squares];
        testSquares[i] = 'O';
        if (checkWinner(testSquares) === 'O') {
          return i;
        }
      }
    }

    // Check if bot needs to block player
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        const testSquares = [...squares];
        testSquares[i] = 'X';
        if (checkWinner(testSquares) === 'X') {
          return i;
        }
      }
    }

    // Take center if available
    if (squares[4] === null) return 4;

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => squares[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available space
    const availableSpaces = squares.map((square, index) => square === null ? index : null)
      .filter(val => val !== null) as number[];
    return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
  };

  const handleClick = (index: number) => {
    if (board[index] || gameOver || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const winner = checkWinner(newBoard);
    if (winner === 'X') {
      setGameOver(true);
      onGameEnd('win');
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameOver(true);
      onGameEnd('draw');
      return;
    }

    // Bot's turn
    setTimeout(() => {
      const botMove = getBestMove(newBoard);
      newBoard[botMove] = 'O';
      setBoard([...newBoard]);

      const botWinner = checkWinner(newBoard);
      if (botWinner === 'O') {
        setGameOver(true);
        onGameEnd('lose');
      } else if (isBoardFull(newBoard)) {
        setGameOver(true);
        onGameEnd('draw');
      } else {
        setIsPlayerTurn(true);
      }
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-400 hover:text-white hover:bg-gray-700/50 text-xs px-2 py-1 rounded-lg h-7"
        >
          ← Back
        </Button>
        <div className="text-center bg-gray-800/40 px-2 py-1 rounded-lg">
          <p className="text-xs text-gray-400">
            <span className="text-blue-400 font-semibold">X</span> vs <span className="text-red-400 font-semibold">O</span>
          </p>
          {!gameOver && (
            <p className="text-xs font-medium text-blue-400">
              {isPlayerTurn ? "Your turn" : "Bot's turn..."}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          onClick={resetGame}
          className="text-gray-400 hover:text-white hover:bg-gray-700/50 text-xs px-2 py-1 rounded-lg h-7"
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-1.5 max-w-[200px] mx-auto">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: cell ? 1 : 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleClick(index)}
            className="aspect-square bg-gray-800/40 border border-gray-700/40 hover:border-blue-500/60 rounded-lg text-xl font-bold hover:bg-gray-700/60 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 relative overflow-hidden"
            disabled={!!cell || gameOver || !isPlayerTurn}
          >
            {/* Shiny hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-200" />

            {cell && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className={`relative z-10 ${cell === 'X' ? 'text-blue-400' : 'text-red-400'}`}
              >
                {cell}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Trivia Quiz Component
interface TriviaQuizProps {
  questions: TriviaQuestion[];
  onGameEnd: (result: 'win' | 'lose') => void;
  onBack: () => void;
  gameResult: 'win' | 'lose' | 'draw' | null;
}

const TriviaQuiz: React.FC<TriviaQuizProps> = ({ questions, onGameEnd, onBack, gameResult }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === questions[currentQuestion].answer) {
      setCorrectAnswers(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        // Quiz finished
        const finalScore = correctAnswers + (answer === questions[currentQuestion].answer ? 1 : 0);
        const percentage = (finalScore / questions.length) * 100;
        setShowResult(true);
        onGameEnd(percentage >= GAME_CONFIG.TRIVIA.PASSING_SCORE ? 'win' : 'lose');
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setShowResult(false);
    setAnswered(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const finalScore = correctAnswers;
    const percentage = (finalScore / questions.length) * 100;

    return (
      <div className="space-y-3 text-center">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-400 hover:text-white hover:bg-gray-700/50 text-xs px-2 py-1 rounded-lg h-7"
          >
            ← Back
          </Button>
          <Button
            variant="ghost"
            onClick={resetQuiz}
            className="text-gray-400 hover:text-white hover:bg-gray-700/50 text-xs px-2 py-1 rounded-lg h-7"
          >
            Play Again
          </Button>
        </div>

        <div className="space-y-2 bg-gray-800/40 rounded-xl p-3 border border-gray-700/40 relative overflow-hidden">
          {/* Subtle dark blue background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700/5 via-indigo-600/5 to-slate-700/5" />

          <div className="text-3xl relative z-10">
            {percentage >= GAME_CONFIG.TRIVIA.PASSING_SCORE ? '🎉' : '😅'}
          </div>
          <h3 className="text-base font-bold text-white relative z-10">
            Quiz Complete!
          </h3>
          <p className="text-xs text-gray-300 relative z-10">
            You got <span className="font-bold text-blue-400">{finalScore}</span> out of{' '}
            <span className="font-bold">{questions.length}</span> questions correct
          </p>
          <p className="text-sm font-medium text-white relative z-10">
            Score: {percentage.toFixed(0)}%
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-400 hover:text-white hover:bg-gray-700/50 text-xs px-2 py-1 rounded-lg h-7"
        >
          ← Back
        </Button>
        <div className="text-xs text-gray-400 bg-gray-800/40 px-2 py-1 rounded-lg">
          {currentQuestion + 1} of {questions.length}
        </div>
        <Button
          variant="ghost"
          onClick={resetQuiz}
          className="text-gray-400 hover:text-white hover:bg-gray-700/50 text-xs px-2 py-1 rounded-lg h-7"
        >
          Reset
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800/40 rounded-full h-1">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white text-center leading-relaxed px-2">
          {questions[currentQuestion].q}
        </h3>

        <div className="space-y-1.5">
          {questions[currentQuestion].options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === questions[currentQuestion].answer;
            const showCorrectAnswer = answered && isCorrect;
            const showWrongAnswer = answered && isSelected && !isCorrect;

            return (
              <motion.button
                key={index}
                whileHover={!answered ? { scale: 1.005 } : {}}
                whileTap={!answered ? { scale: 0.995 } : {}}
                onClick={() => handleAnswerSelect(option)}
                disabled={answered}
                className={`w-full p-2.5 text-left rounded-lg border transition-all duration-200 text-xs relative overflow-hidden ${
                  showCorrectAnswer
                    ? 'bg-green-500/20 border-green-500/50 text-green-300'
                    : showWrongAnswer
                    ? 'bg-red-500/20 border-red-500/50 text-red-300'
                    : isSelected
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                    : 'bg-gray-800/40 border-gray-700/40 hover:bg-gray-700/60 hover:border-gray-600/60 text-gray-300'
                }`}
              >
                {/* Shiny hover effect */}
                {!answered && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-200" />
                )}

                <div className="flex items-center justify-between relative z-10">
                  <span className="font-medium leading-tight">{option}</span>
                  {showCorrectAnswer && <span className="text-green-400 text-sm">✓</span>}
                  {showWrongAnswer && <span className="text-red-400 text-sm">✗</span>}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Memory Game Component
interface MemoryGameProps {
  onGameEnd: (result: 'win' | 'lose') => void;
  onBack: () => void;
  gameResult: 'win' | 'lose' | 'draw' | null;
}

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onGameEnd, onBack, gameResult }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...GAME_CONFIG.MEMORY_GAME.CARDS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setStartTime(null);
    setEndTime(null);
    setGameStarted(false);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }

    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards[cardId].isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);

          // Check if game is complete
          if (matchedPairs + 1 === GAME_CONFIG.MEMORY_GAME.CARDS.length / 2) {
            const gameEndTime = Date.now();
            setEndTime(gameEndTime);
            const timeTaken = (gameEndTime - (startTime || 0)) / 1000;
            onGameEnd(timeTaken <= GAME_CONFIG.MEMORY_GAME.GOOD_SCORE_TIME ? 'win' : 'lose');
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const getElapsedTime = () => {
    if (!startTime) return 0;
    const currentTime = endTime || Date.now();
    return Math.floor((currentTime - startTime) / 1000);
  };

  const resetGame = () => {
    initializeGame();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-400 hover:text-white hover:bg-gray-700/50 text-xs px-2 py-1 rounded-lg h-7"
        >
          ← Back
        </Button>
        <div className="text-center bg-gray-800/40 px-2 py-1 rounded-lg">
          <p className="text-xs text-gray-300">
            ⏱️ {getElapsedTime()}s | 🎯 {matchedPairs}/{GAME_CONFIG.MEMORY_GAME.CARDS.length / 2}
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={resetGame}
          className="text-gray-400 hover:text-white hover:bg-gray-700/50 text-xs px-2 py-1 rounded-lg h-7"
        >
          Reset
        </Button>
      </div>

      {!gameStarted && (
        <div className="text-center space-y-1.5 bg-gray-800/40 rounded-xl p-3 border border-gray-700/40">
          <p className="text-sm font-medium text-white">
            🧩 Memory Challenge
          </p>
          <p className="text-xs text-gray-400">
            Match all pairs in under {GAME_CONFIG.MEMORY_GAME.GOOD_SCORE_TIME} seconds to win!
          </p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-1.5 max-w-[240px] mx-auto">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: card.isMatched ? 1 : 1.03 }}
            whileTap={{ scale: card.isMatched ? 1 : 0.97 }}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-lg cursor-pointer flex items-center justify-center text-lg font-bold transition-all duration-300 relative overflow-hidden ${
              card.isFlipped || card.isMatched
                ? 'bg-gray-700/50 border border-gray-600/50 shadow-lg'
                : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border border-blue-400/50'
            } ${card.isMatched ? 'ring-1 ring-green-400/60 bg-green-500/20' : ''}`}
          >
            {/* Shiny effect for unflipped cards */}
            {!card.isFlipped && !card.isMatched && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
            )}

            <motion.div
              initial={false}
              animate={{
                rotateY: card.isFlipped || card.isMatched ? 0 : 180,
                scale: card.isMatched ? 1.05 : 1
              }}
              transition={{ duration: 0.3 }}
              className={`relative z-10 ${card.isFlipped || card.isMatched ? 'text-white' : 'text-white/90'}`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '?'}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {gameResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-1.5 bg-gray-800/40 rounded-xl p-3 border border-gray-700/40"
        >
          <p className="text-xs font-medium text-white">
            Game Complete in {getElapsedTime()} seconds!
          </p>
          <p className="text-xs text-gray-300">
            {gameResult === 'win'
              ? GAME_CONFIG.MESSAGES.MEMORY_WIN
              : GAME_CONFIG.MESSAGES.MEMORY_LOSE}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default GameModal;
