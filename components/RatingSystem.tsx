
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

export const RatingSystem: React.FC = () => {
  const [impact, setImpact] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [rated, setRated] = useState(false);

  const handleRate = (index: number) => {
    if (rated) return;
    setImpact(index + 1);
    setRated(true);
  };

  return (
    <div className="py-12 border-y border-zinc-100 dark:border-zinc-900 my-12 text-center">
      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Impact Score</h3>
      <div className="flex justify-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onMouseEnter={() => !rated && setIsHovered(i)}
            onMouseLeave={() => !rated && setIsHovered(null)}
            onClick={() => handleRate(i)}
            className={`p-2 transition-all duration-300 relative ${rated ? 'cursor-default' : 'hover:scale-110'}`}
          >
            <Zap
              size={32}
              className={`transition-colors duration-300 ${
                (isHovered !== null ? i <= isHovered : i < impact)
                  ? 'fill-zinc-900 text-zinc-900 dark:fill-zinc-50 dark:text-zinc-50'
                  : 'text-zinc-200 dark:text-zinc-800'
              }`}
            />
            {rated && i === impact - 1 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                className="absolute inset-0 bg-zinc-900 dark:bg-zinc-50 rounded-full"
              />
            )}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-zinc-500 font-medium h-4">
        {rated ? 'Thanks for the feedback!' : isHovered !== null ? ['Insignificant', 'Minor', 'Moderate', 'Strong', 'Extraordinary'][isHovered] : ''}
      </p>
    </div>
  );
};
