import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Asterisk } from 'lucide-react';

export type BoxStatus = 'empty' | 'correct' | 'incorrect';

interface LetterBoxProps {
  letter: string | null;
  status: BoxStatus;
  isActive: boolean;
  onClick: () => void;
  onDrop: (letter: string) => void;
  index: number;
}

export const LetterBox: React.FC<LetterBoxProps> = ({ letter, status, isActive, onClick, onDrop, index }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedLetter = e.dataTransfer.getData('text/plain');
    if (droppedLetter) {
      onDrop(droppedLetter);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: index * 0.05 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.85 }}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn(
        "relative flex h-14 w-12 sm:h-16 sm:w-14 items-center justify-center rounded-2xl text-2xl sm:text-3xl font-bold transition-all transition-colors",
        
        // Base state for cute blue theme
        "border-[3px] shadow-[0_4px_0_rgba(0,0,0,0.1)]",
        
        isActive && status === 'empty' && "border-white bg-white/20 scale-105 z-10 animate-pulse",
        
        status === 'empty' && !isActive && "border-white/80 bg-transparent text-white hover:bg-white/10 hover:border-white",
        
        status === 'empty' && isActive && "border-white bg-white/30 text-white",
        
        status === 'correct' && "border-[#86efac] bg-[#22c55e] text-white shadow-[#16a34a]",
        
        status === 'incorrect' && "border-[#fca5a5] bg-[#ef4444] text-white shadow-[#dc2626]"
      )}
    >
      <span className="relative z-10 leading-none drop-shadow-sm mt-1">{letter || ''}</span>
      
      {/* Show tiny asterisk when empty to match the provided image! */}
      {status === 'empty' && !letter && (
        <Asterisk className="w-5 h-5 opacity-40 text-white stroke-[3]" />
      )}
    </motion.button>
  );
};
