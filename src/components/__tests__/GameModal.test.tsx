import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GameModal from '../GameModal';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  X: () => <span>X</span>,
  Trophy: () => <span>Trophy</span>,
  Brain: () => <span>Brain</span>,
  Grid3X3: () => <span>Grid3X3</span>,
  Clock: () => <span>Clock</span>,
}));

describe('GameModal', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should auto-open after 5 seconds', async () => {
    render(<GameModal />);
    
    // Modal should not be visible initially
    expect(screen.queryByText(/Stop scrolling/)).not.toBeInTheDocument();
    
    // Fast-forward time by 5 seconds
    vi.advanceTimersByTime(5000);
    
    // Modal should now be visible
    await waitFor(() => {
      expect(screen.getByText(/Stop scrolling/)).toBeInTheDocument();
    });
  });

  it('should display game selection screen initially', async () => {
    render(<GameModal />);
    
    vi.advanceTimersByTime(5000);
    
    await waitFor(() => {
      expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument();
      expect(screen.getByText('Trivia Quiz')).toBeInTheDocument();
      expect(screen.getByText('Memory Game')).toBeInTheDocument();
    });
  });

  it('should navigate to tic tac toe game', async () => {
    render(<GameModal />);
    
    vi.advanceTimersByTime(5000);
    
    await waitFor(() => {
      const ticTacToeButton = screen.getByText('Tic Tac Toe');
      fireEvent.click(ticTacToeButton);
    });

    await waitFor(() => {
      expect(screen.getByText('🎯 Tic Tac Toe')).toBeInTheDocument();
      expect(screen.getByText('You are X, Bot is O')).toBeInTheDocument();
    });
  });

  it('should navigate to trivia quiz', async () => {
    render(<GameModal />);
    
    vi.advanceTimersByTime(5000);
    
    await waitFor(() => {
      const triviaButton = screen.getByText('Trivia Quiz');
      fireEvent.click(triviaButton);
    });

    await waitFor(() => {
      expect(screen.getByText('🧠 Trivia Quiz')).toBeInTheDocument();
      expect(screen.getByText(/Question 1 of/)).toBeInTheDocument();
    });
  });

  it('should navigate to memory game', async () => {
    render(<GameModal />);
    
    vi.advanceTimersByTime(5000);
    
    await waitFor(() => {
      const memoryButton = screen.getByText('Memory Game');
      fireEvent.click(memoryButton);
    });

    await waitFor(() => {
      expect(screen.getByText('🧩 Memory Game')).toBeInTheDocument();
      expect(screen.getByText('🧩 Memory Challenge')).toBeInTheDocument();
    });
  });

  it('should close modal when X button is clicked', async () => {
    render(<GameModal />);
    
    vi.advanceTimersByTime(5000);
    
    await waitFor(() => {
      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByText(/Stop scrolling/)).not.toBeInTheDocument();
    });
  });

  it('should allow going back to game selection', async () => {
    render(<GameModal />);
    
    vi.advanceTimersByTime(5000);
    
    // Navigate to tic tac toe
    await waitFor(() => {
      const ticTacToeButton = screen.getByText('Tic Tac Toe');
      fireEvent.click(ticTacToeButton);
    });

    // Click back button
    await waitFor(() => {
      const backButton = screen.getByText('← Back');
      fireEvent.click(backButton);
    });

    // Should be back to game selection
    await waitFor(() => {
      expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument();
      expect(screen.getByText('Trivia Quiz')).toBeInTheDocument();
      expect(screen.getByText('Memory Game')).toBeInTheDocument();
    });
  });
});
