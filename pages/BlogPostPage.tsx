
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Hash } from 'lucide-react';
import { MOCK_POSTS } from '../data/mockData';
import { ReadingProgress } from '../components/ReadingProgress';
import { ShareDock } from '../components/ShareDock';
import { RatingSystem } from '../components/RatingSystem';
import { CommentSection } from '../components/CommentSection';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Article not found</h1>
        <Link to="/" className="text-zinc-500 hover:text-zinc-900 flex items-center justify-center space-x-2">
          <ArrowLeft size={18} />
          <span>Back to home</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />
      <ShareDock />
      
      <article className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link to="/" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-12">
            <ArrowLeft size={14} />
            <span>Back to archive</span>
          </Link>

          <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">
            <span className="flex items-center space-x-1.5 text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
              <Hash size={10} />
              <span>{post.category}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Calendar size={12} />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock size={12} />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-10">
            {post.title}
          </h1>

          <div className="flex items-center space-x-4 border-b border-zinc-100 dark:border-zinc-900 pb-12 mb-12">
            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full border border-zinc-100 dark:border-zinc-800" />
            <div>
              <div className="text-sm font-bold dark:text-zinc-100">{post.author.name}</div>
              <div className="text-xs text-zinc-500">{post.author.role}</div>
            </div>
          </div>
        </motion.div>

        <div 
          className="prose prose-zinc dark:prose-invert max-w-none 
          prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-lg prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:mb-8
          prose-blockquote:border-l-2 prose-blockquote:border-zinc-900 dark:prose-blockquote:border-zinc-50 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-zinc-900 dark:prose-blockquote:text-zinc-100"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <RatingSystem />
        <CommentSection />
      </article>
    </>
  );
};
