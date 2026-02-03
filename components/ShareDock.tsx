
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Link as LinkIcon, Twitter, Linkedin, MessageSquare, Check } from 'lucide-react';

export const ShareDock: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="glass px-4 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-zinc-400">
              <Share2 size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Share</span>
            </div>
            
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

            <div className="flex items-center space-x-4">
              <button 
                onClick={copyLink}
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <LinkIcon size={18} />}
              </button>
              <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <Twitter size={18} />
              </button>
              <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <Linkedin size={18} />
              </button>
              <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
