import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ResultRevealProps {
  onRestart: () => void;
}

export const ResultReveal: React.FC<ResultRevealProps> = ({ onRestart }) => {
  useEffect(() => {
    // Trigger confetti when this component mounts
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex flex-col items-center justify-center space-y-8 mt-12 mb-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", delay: 0.5, stiffness: 200 }}
        className="relative rounded-[2rem] overflow-hidden shadow-[0_10px_0_rgba(255,255,255,0.3)] max-w-sm sm:max-w-md border-[6px] border-white bg-white"
      >
        <img 
          src="/reveal.png" 
          alt="Glowing romantic heart" 
          className="w-full h-auto object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cute-blue/40 to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 0.8, stiffness: 200 }}
        className="text-center space-y-4 max-w-lg bg-white/20 p-6 sm:p-8 rounded-[2rem] border-[3px] border-white/40 shadow-xl backdrop-blur-md"
      >
        <motion.h2 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md tracking-wide"
        >
          You're my one in 8 billion.
        </motion.h2>
        <p className="text-white/90 sm:text-lg mx-auto font-medium leading-relaxed drop-shadow-sm">
          I searched the whole universe, but there's no one quite like you. 
          Thank you for being my person.
        </p>
      </motion.div>
      
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9, y: 2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", delay: 1.2, stiffness: 300 }}
        onClick={onRestart}
        className="px-10 py-4 rounded-full bg-white text-cute-blue border-[3px] border-transparent hover:border-[#bfdbfe] transition-all text-xl font-extrabold tracking-wide uppercase shadow-[0_6px_0_rgba(0,0,0,0.15)] active:shadow-[0_0px_0_rgba(0,0,0,0.15)]"
      >
        Play Again!
      </motion.button>
    </motion.div>
  );
};
