
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, FileText, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_POSTS } from '../data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query === '' 
    ? MOCK_POSTS.slice(0, 3) 
    : MOCK_POSTS.filter(p => p.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') setSelectedIndex(prev => Math.min(results.length - 1, prev + 1));
    if (e.key === 'ArrowUp') setSelectedIndex(prev => Math.max(0, prev - 1));
    if (e.key === 'Enter') {
      const selected = results[selectedIndex];
      if (selected) {
        navigate(`/blog/${selected.slug}`);
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden relative"
          >
            <div className="flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800">
              <Search size={20} className="text-zinc-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search articles, tags, authors..."
                className="flex-1 h-14 bg-transparent border-none outline-none px-4 text-sm font-medium dark:text-zinc-100"
              />
              <button 
                onClick={onClose}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-2">
              <div className="px-2 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                {query === '' ? 'Suggested' : 'Articles'}
              </div>
              <div className="space-y-1 mt-1">
                {results.map((post, idx) => (
                  <button
                    key={post.id}
                    onClick={() => { navigate(`/blog/${post.slug}`); onClose(); }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${selectedIndex === idx ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <FileText size={18} className="text-zinc-400" />
                      <div>
                        <div className="text-sm font-medium dark:text-zinc-100">{post.title}</div>
                        <div className="text-xs text-zinc-500">{post.category}</div>
                      </div>
                    </div>
                    {selectedIndex === idx && <ArrowRight size={14} className="text-zinc-400" />}
                  </button>
                ))}
              </div>

              <div className="mt-4 px-2 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Categories
              </div>
              <div className="flex flex-wrap gap-2 p-2">
                {['Engineering', 'Design', 'Philosophy', 'Product'].map((cat) => (
                  <button
                    key={cat}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
                  >
                    <Hash size={12} className="text-zinc-400" />
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-10 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 px-4 flex items-center space-x-4 text-[10px] text-zinc-400">
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800">↵</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800">esc</kbd>
                <span>Close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
