import React from 'react';
import { motion } from 'framer-motion';

interface KeyboardDeckProps {
  onKeyPress: (key: string) => void;
}

export const KeyboardDeck: React.FC<KeyboardDeckProps> = ({ onKeyPress }) => {
  const rows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, key: string) => {
    e.dataTransfer.setData('text/plain', key);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <section className="p-6 sm:p-8 rounded-[2rem] bg-white/10 backdrop-blur-sm border-[3px] border-white/30 shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold tracking-widest text-[#dbeafe] uppercase">Your Handy Keyboard</h3>
        <p className="text-xs text-white/70 hidden sm:block font-medium">Drag a letter to a box, or click to type.</p>
      </div>

      <div className="flex flex-col gap-2 sm:gap-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 sm:gap-3">
            {row.map((key, i) => (
              <motion.button
                key={key}
                draggable
                onDragStart={(e: any) => handleDragStart(e, key)}
                onClick={() => onKeyPress(key)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring", stiffness: 400, damping: 12,
                  delay: (rowIndex * 0.1) + (i * 0.02)
                }}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.85, y: 2 }}
                className="w-8 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-white rounded-full text-lg sm:text-2xl font-extrabold text-cute-blue transition-all border-[3px] border-transparent hover:border-blue-200 shadow-[0_4px_0_rgba(0,0,0,0.15)] active:shadow-[0_0px_0_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing"
              >
                <span className="mt-1">{key}</span>
              </motion.button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
