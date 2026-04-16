import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Sparkles } from 'lucide-react';

interface CollectableCardProps {
  id: string;
  letter: string;
  isRevealed: boolean;
  isSelected: boolean;
  isAssigned: boolean;
  onClick: () => void;
  index: number;
}

export const CollectableCard: React.FC<CollectableCardProps> = ({
  letter,
  isRevealed,
  isSelected,
  isAssigned,
  onClick,
  index
}) => {
  if (isAssigned) {
    return (
      <div className="h-14 w-12 sm:h-16 sm:w-14 m-1 rounded-xl bg-slate-800/10 border border-slate-700/20" />
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "group relative flex h-14 w-12 sm:h-16 sm:w-14 m-1 items-center justify-center rounded-xl font-bold transition-all duration-300",
        isSelected ? "ring-2 ring-primary-500 ring-offset-2 ring-offset-slate-900 shadow-[0_0_15px_rgba(236,72,153,0.5)] z-10" : "hover:shadow-lg",
        isRevealed 
          ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white border border-indigo-400" 
          : "bg-slate-800 border border-slate-700 text-slate-400"
      )}
    >
      {isRevealed ? (
        <motion.span
          initial={{ opacity: 0, rotateY: 180 }}
          animate={{ opacity: 1, rotateY: 0 }}
          className="text-2xl sm:text-3xl"
        >
          {letter}
        </motion.span>
      ) : (
        <Sparkles className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.button>
  );
};
