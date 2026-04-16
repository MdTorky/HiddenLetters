import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyboardDeck } from './components/KeyboardDeck';
import { PuzzleBoard, type SlotData } from './components/PuzzleBoard';
import { ResultReveal } from './components/ResultReveal';
import { Heart, BookHeart } from 'lucide-react';

const TARGET_PHRASE = "YOUREMYONEIN8BILLION";

function App() {
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(0);

  const isComplete = useMemo(() => {
    if (slots.length === 0) return false;
    return slots.every((slot, i) => slot.letter === TARGET_PHRASE[i]);
  }, [slots]);

  const correctCount = slots.filter((slot, i) => slot.letter === TARGET_PHRASE[i]).length;

  const initializeGame = () => {
    setSlots(Array.from({ length: 20 }).map(() => ({
      id: null,
      letter: null,
      status: 'empty'
    })));
    setActiveSlotIndex(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const placeLetterAtSlot = (index: number, key: string, autoAdvance: boolean) => {
    if (isComplete) return;

    const targetLetter = TARGET_PHRASE[index];
    const isCorrect = key.toUpperCase() === targetLetter;

    setSlots(prev => {
      const newSlots = [...prev];
      newSlots[index] = {
        id: `slot-${index}`,
        letter: key.toUpperCase(),
        status: isCorrect ? 'correct' : 'incorrect'
      };
      return newSlots;
    });

    if (autoAdvance) {
      // Advance to next empty slot if available
      const nextEmptyIndex = slots.findIndex((slot, i) => i > index && slot.status === 'empty');
      if (nextEmptyIndex !== -1) {
        setActiveSlotIndex(nextEmptyIndex);
      } else {
        const anyEmptyIndex = slots.findIndex(slot => slot.status === 'empty');
        setActiveSlotIndex(anyEmptyIndex !== -1 ? anyEmptyIndex : null);
      }
    } else {
      // Just focus the slot we dropped on
      setActiveSlotIndex(index);
    }
  };

  const handleKeyPress = (key: string) => {
    if (activeSlotIndex === null) return;
    placeLetterAtSlot(activeSlotIndex, key, true);
  };

  const handleSlotDrop = (index: number, letter: string) => {
    placeLetterAtSlot(index, letter, false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace' && activeSlotIndex !== null) {
        setSlots(prev => {
          const newSlots = [...prev];
          newSlots[activeSlotIndex] = { id: null, letter: null, status: 'empty' };
          return newSlots;
        });
        const prevIndex = activeSlotIndex > 0 ? activeSlotIndex - 1 : 0;
        setActiveSlotIndex(prevIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlotIndex, isComplete, slots]);

  const handleSlotClick = (index: number) => {
    setActiveSlotIndex(index);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 flex flex-col relative overflow-x-hidden">

      {/* Header */}
      <header className="flex flex-col items-center justify-center mb-10 mt-4 space-y-3 relative z-10 text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="inline-flex items-center justify-center p-3 sm:p-4 rounded-full bg-white text-cute-blue mb-2 shadow-[0_4px_0_rgba(0,0,0,0.1)]"
        >
          <BookHeart className="w-8 h-8 sm:w-10 sm:h-10" />
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">The Last Letter</h1>
        <p className="text-white/80 text-sm sm:text-lg max-w-lg font-medium whitespace-pre-line">
          {isComplete
            // ? "Drag letters into the correct spots or use your keyboard to reveal the message."
            ? "Twenty letters, scattered for you,\nEach one holds something true.\nNumber by number, place them right,\nLet them slowly come to light.\n\nThen from each, a letter take,\nThe very first—for meaning’s sake…\nBring them together, and you will see,\nThe words I kept inside of me."
            : "Piece by piece, they aligned and formed the words I made for you"}
        </p>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col z-10 space-y-8 sm:space-y-12 pb-24">

        {/* Top: The Puzzle Board */}
        <section className="bg-white/10 p-6 sm:p-10 rounded-4xl border-[3px] border-white/30 shadow-2xl backdrop-blur-md">
          {isComplete && (
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-bold tracking-wider text-[#dbeafe] uppercase">
                20 Letters
              </span>
              <span className="text-sm font-extrabold bg-white px-4 py-1.5 rounded-full text-cute-blue shadow-sm">
                {correctCount} / 20
              </span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {isComplete ? (
              <motion.div
                key="board"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              >
                <PuzzleBoard
                  slots={slots}
                  activeSlotIndex={activeSlotIndex}
                  onSlotClick={handleSlotClick}
                  onSlotDrop={handleSlotDrop}
                />
              </motion.div>
            ) : (
              <motion.div key="result">
                <ResultReveal onRestart={initializeGame} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Keyboard Deck */}
        <AnimatePresence mode="wait">
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <KeyboardDeck onKeyPress={handleKeyPress} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#60a5fa]/30 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#93c5fd]/30 blur-[120px]"
        />
      </div>
    </div>
  );
}

export default App;
