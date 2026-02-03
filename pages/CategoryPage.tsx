
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Hash } from 'lucide-react';
import { MOCK_POSTS } from '../data/mockData';

export const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const filteredPosts = MOCK_POSTS.filter(p => p.category.toLowerCase() === id?.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4">
      <header className="mb-20">
        <Link to="/" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-12">
          <ArrowLeft size={14} />
          <span>Archive</span>
        </Link>
        <div className="flex items-baseline space-x-4">
          <Hash size={32} className="text-zinc-200 dark:text-zinc-800" />
          <h1 className="text-5xl font-bold tracking-tight capitalize">{id}</h1>
        </div>
        <p className="mt-4 text-lg text-zinc-500 max-w-xl">
          Insights and explorations specifically curated for {id} enthusiasts.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`} className="group block">
                <article className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 hover-glow transition-all duration-500">
                  <h2 className="text-xl font-bold tracking-tight mb-4 group-hover:text-zinc-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-zinc-400 font-medium">
            No articles found in this category yet.
          </div>
        )}
      </section>
    </div>
  );
};
