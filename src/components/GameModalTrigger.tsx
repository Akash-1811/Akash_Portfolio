import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Sparkles } from 'lucide-react';

interface GameModalTriggerProps {
  onOpenModal: () => void;
}

const GameModalTrigger: React.FC<GameModalTriggerProps> = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Show trigger button after 10 seconds if user hasn't interacted
    const timer = setTimeout(() => {
      const hasShownModal = sessionStorage.getItem('gameModalShown');
      if (!hasShownModal && !hasInteracted) {
        setIsVisible(true);
      }
    }, 10000);

    // Hide after 30 seconds if not clicked
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 40000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [hasInteracted]);

  const handleClick = () => {
    setHasInteracted(true);
    setIsVisible(false);
    onOpenModal();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setHasInteracted(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <div className="relative">
            {/* Subtle dark blue glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-indigo-500 rounded-2xl blur-lg opacity-40 animate-pulse" />

            {/* Main button */}
            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-slate-700 to-indigo-600 hover:from-slate-600 hover:to-indigo-500 text-white p-4 rounded-2xl shadow-2xl border border-slate-500/30 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2">
                <Gamepad2 className="h-5 w-5" />
                <div className="text-left">
                  <p className="text-sm font-bold">Play & Win!</p>
                  <p className="text-xs opacity-90">Get discounts 🎁</p>
                </div>
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
            </motion.button>

            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-full w-6 h-6 flex items-center justify-center text-xs border border-gray-600"
            >
              ×
            </button>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-indigo-400 rounded-full"
                  animate={{
                    y: [-10, -30, -10],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: '10%',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameModalTrigger;
