import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

interface ResultRevealProps {
  onRestart: () => void;
}

export const ResultReveal: React.FC<ResultRevealProps> = ({ onRestart }) => {
  const [stage, setStage] = useState<'closed' | 'opening' | 'opened'>('closed');

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
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
  };

  const handleOpen = () => {
    if (stage !== 'closed') return;
    setStage('opening');
    triggerConfetti();
    setTimeout(() => {
      setStage('opened');
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full relative">
      <AnimatePresence>
        {stage !== 'opened' && (
          <motion.div
            key="envelope-container"
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.8 }}
            className="relative z-50 cursor-pointer"
            onClick={handleOpen}
          >
            <motion.div
              animate={stage === 'closed' ? { y: [0, -10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              whileHover={stage === 'closed' ? { scale: 1.05 } : {}}
              className="relative w-[300px] h-[200px] sm:w-[400px] sm:h-[260px] drop-shadow-2xl"
            >
              {/* Back of Envelope */}
              <div className="absolute inset-0 bg-[#2563eb] rounded-xl shadow-inner border border-blue-900/20" />

              {/* The Letter inside pushing out */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={stage === 'opening' ? { y: -250, opacity: 1, scale: 1.1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-4 bottom-4 left-4 right-4 bg-[#fdfbf7] rounded-md shadow-lg z-10 flex flex-col items-center justify-start p-4 overflow-hidden outline outline-1 outline-slate-200"
              >
                <div className="w-full h-24 bg-cute-blue/10 rounded-sm mb-2" />
                <div className="w-3/4 h-4 bg-slate-200 rounded-full mb-2" />
                <div className="w-1/2 h-4 bg-slate-200 rounded-full" />
              </motion.div>

              {/* Left Flap */}
              <div
                className="absolute inset-0 bg-[#60a5fa] rounded-xl z-20"
                style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}
              />

              {/* Right Flap */}
              <div
                className="absolute inset-0 bg-[#60a5fa] rounded-xl z-20"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }}
              />

              {/* Bottom Flap */}
              <div
                className="absolute inset-0 bg-[#93c5fd] rounded-xl z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]"
                style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 45%)" }}
              />

              {/* Top Flap (opens) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: stage === 'opening' ? 180 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-[65%] origin-top rounded-t-xl z-30 drop-shadow-xl"
              >
                <div
                  className="w-full h-full bg-[#3b82f6]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                />

                {/* Wax Seal */}
                <motion.div
                  animate={{ scale: stage === 'opening' ? 0 : 1 }}
                  className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-rose-500 rounded-full shadow-xl outline outline-4 outline-rose-600 flex items-center justify-center pointer-events-none"
                >
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white" />
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ opacity: stage === 'closed' ? 1 : 0 }}
                className="absolute -bottom-12 left-0 w-full text-center text-white font-bold drop-shadow-md text-lg tracking-wider"
              >
                Click to open
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'opened' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 w-full z-40 max-w-2xl px-2"
          >
            {/* The Actual Letter Content */}
            <div className="relative w-full bg-[#fdfbf7] p-8 sm:p-12 rounded-[2rem] shadow-2xl border-[4px] border-white text-slate-800 rotate-1">

              {/* Paper Lines background pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none rounded-[2rem]" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #94a3b8 31px, #94a3b8 32px)', backgroundPositionY: '40px' }} />

              <div className="relative z-10 space-y-8">
                {/* Polaroid style image pinned */}
                <div className="w-full flex justify-center -mt-16 sm:-mt-20">
                  <motion.div
                    initial={{ rotate: -5 }}
                    animate={{ rotate: [-5, 2, -5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative bg-white p-3 sm:p-4 pb-8 sm:pb-12 shadow-xl rounded-sm border border-slate-200 rotate-[-2deg] z-20"
                  >
                    <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-3 sm:h-4 bg-red-400/80 rotate-3 shadow-sm rounded-sm backdrop-blur-sm" />
                    <img
                      src="/reveal.png"
                      alt="Glowing romantic heart"
                      className="w-48 sm:w-64 h-auto object-cover border border-slate-100"
                    />
                  </motion.div>
                </div>

                <div className="space-y-6 text-center font-bold px-2 sm:px-6">
                  <motion.h2
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-3xl sm:text-5xl text-cute-blue font-extrabold tracking-wide drop-shadow-sm leading-tight pb-2 border-b-2 border-slate-200/50 ">
                    You're my one in 8 billion.
                  </motion.h2>
                  <p className="text-lg sm:text-2xl text-slate-700 leading-relaxed font-medium">
                    The one I will always choose and who deserve the love I have for you. Thanks for being my person.
                  </p>
                  <p className="text-lg sm:text-2xl text-slate-700 leading-relaxed font-medium">
                    {/* I searched the whole universe, but there's no one quite like you.<br />
                    Thank you for being my person. */}
                  </p>
                  {/* <motion.p
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-xl sm:text-3xl text-rose-500 pt-6 font-extrabold">
                    Forever Yours ❤️
                  </motion.p> */}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9, y: 2 }}
              onClick={onRestart}
              className="mt-8 px-10 py-4 rounded-full bg-white text-cute-blue border-[3px] border-transparent hover:border-[#bfdbfe] transition-all text-xl font-extrabold tracking-wide uppercase shadow-[0_6px_0_rgba(0,0,0,0.15)] active:shadow-[0_0px_0_rgba(0,0,0,0.15)]"
            >
              Play Again!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
