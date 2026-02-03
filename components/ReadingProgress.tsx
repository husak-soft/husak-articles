
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ReadingProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setPercentage(Math.min(100, Math.max(0, Math.round(scrollPercent))));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-900 dark:bg-zinc-50 z-[60] origin-left"
        style={{ scaleX }}
      />
      <div className="fixed bottom-8 left-8 z-40 hidden lg:block">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-zinc-200 dark:text-zinc-800"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray="125.6"
              style={{ strokeDashoffset: 125.6 * (1 - percentage / 100) }}
              className="text-zinc-900 dark:text-zinc-50"
            />
          </svg>
          <span className="absolute text-[10px] font-mono font-bold">{percentage}%</span>
        </div>
      </div>
    </>
  );
};
