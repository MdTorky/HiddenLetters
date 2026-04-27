import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const NeonFlower = () => {
  const [showText, setShowText] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setShowText(false);
    const timer = setTimeout(() => {
      setShowText(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, [animationKey]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100] overflow-hidden">
      {/* Background ambient glow */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-pink-600/20 rounded-full blur-[100px] pointer-events-none"
      />

      <div key={animationKey} className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <svg
          viewBox="0 0 100 100"
          className="w-64 h-64 sm:w-96 sm:h-96 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        >
          {/* Center */}
          <motion.circle
            cx="50"
            cy="50"
            r="4"
            fill="none"
            stroke="#fbcfe8"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Stem */}
          <motion.path
            d="M50 50 Q 40 75 50 100"
            fill="none"
            stroke="#34d399"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {/* Stem Leaves */}
          <motion.path
            d="M45 75 Q 30 70 35 60 Q 45 65 45 75"
            fill="none"
            stroke="#34d399"
            strokeWidth="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
          />
          {/* <motion.path
            d="M53 85 Q 68 80 63 70 Q 53 75 53 85"
            fill="none"
            stroke="#34d399"
            strokeWidth="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
          /> */}

          {/* Layer 1: Inner Petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.path
              key={`l1-${i}`}
              d="M50 50 Q55 35 50 20 Q45 35 50 50"
              fill="none"
              stroke="#f9a8d4"
              strokeWidth="0.5"
              style={{ transformOrigin: '50px 50px' }}
              transform={`rotate(${i * 45})`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 + i * 0.1, ease: "easeInOut" }}
            />
          ))}

          {/* Layer 2: Outer Petals */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.path
              key={`l2-${i}`}
              d="M50 50 Q60 25 50 5 Q40 25 50 50"
              fill="none"
              stroke="#ec4899"
              strokeWidth="0.5"
              style={{ transformOrigin: '50px 50px' }}
              transform={`rotate(${i * 22.5})`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, delay: 1.5 + i * 0.05, ease: "easeInOut" }}
            />
          ))}

          {/* Layer 3: Leaves / Flourishes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.path
              key={`l3-${i}`}
              d="M50 50 Q75 50 85 85 Q50 75 50 50"
              fill="none"
              stroke="#c084fc"
              strokeWidth="0.3"
              style={{ transformOrigin: '50px 50px' }}
              transform={`rotate(${i * 45 + 22.5})`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 2.5 + i * 0.1, ease: "easeInOut" }}
            />
          ))}

          {/* Floating Spores */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5) * (Math.PI / 180);
            const r = 40;
            const cx = 50 + r * Math.sin(angle);
            const cy = 50 - r * Math.cos(angle);
            return (
              <motion.circle
                key={`dot-${i}`}
                cx={cx}
                cy={cy}
                r="0.8"
                fill="#fdf4ff"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1], scale: 1 }}
                transition={{ duration: 2, delay: 3.5 + i * 0.05, repeat: Infinity, repeatType: 'reverse' }}
              />
            )
          })}
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="mt-8 text-center px-4"
        >
          <h2 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            A Gift For You
          </h2>
          <p className="mt-6 text-pink-100/90 text-lg sm:text-xl font-medium max-w-lg mx-auto leading-relaxed">
            Just a little something to remind you that you deserve all the beautiful things in this world.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAnimationKey(k => k + 1)}
            className="mt-8 px-6 py-2 rounded-full border border-pink-400 text-pink-300 hover:bg-pink-500/20 transition-colors font-medium tracking-wide shadow-[0_0_10px_rgba(236,72,153,0.3)]"
          >
            Play Again ✨
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
