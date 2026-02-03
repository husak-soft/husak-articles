
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { MOCK_POSTS } from '../data/mockData';

export const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <header className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Notes on <span className="text-zinc-400 italic">design</span>, code, and the void.
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed max-w-xl">
            A minimalist space exploring the intersection of high-end engineering and human philosophy.
          </p>
        </motion.div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_POSTS.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link to={`/blog/${post.slug}`} className="group block h-full">
              <article className="relative h-full flex flex-col p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 hover-glow transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowRight size={20} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                
                <div className="mb-8 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                   <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                </div>

                <div className="flex-grow">
                  <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
                    <span className="px-2 py-0.5 border border-zinc-200 dark:border-zinc-800 rounded">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full border border-zinc-100 dark:border-zinc-800" />
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{post.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-zinc-400 font-medium">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </section>

      <div className="mt-20 py-20 border-t border-zinc-100 dark:border-zinc-900 text-center">
        <h3 className="text-xl font-medium mb-8">Want to stay updated?</h3>
        <div className="max-w-md mx-auto relative">
          <input 
            type="email" 
            placeholder="email@example.com" 
            className="w-full h-14 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-6 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all"
          />
          <button className="absolute top-2 right-2 h-10 px-6 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
