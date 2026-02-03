
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reply, MoreHorizontal, CornerDownRight, Send } from 'lucide-react';
import { Comment } from '../types';

const INITIAL_COMMENTS: Comment[] = [
  {
    id: '1',
    author: 'Elena Vance',
    avatar: 'https://picsum.photos/seed/elena/100/100',
    content: 'This architectural approach to minimalist UI is truly inspiring. The attention to micro-interactions makes it feel alive.',
    timestamp: '2 hours ago',
    replies: [
      {
        id: '2',
        author: 'Marcus Aurelius',
        avatar: 'https://picsum.photos/seed/marcus/100/100',
        content: 'I particularly like how you handled the command palette integration.',
        timestamp: '1 hour ago',
        parentId: '1'
      }
    ]
  },
  {
    id: '3',
    author: 'Sarah Jenkins',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    content: 'Are there any performance implications for using heavy blur backgrounds on mobile?',
    timestamp: '5 hours ago'
  }
];

export const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // Optimistic Update Simulation
    const tempId = Math.random().toString();
    const optimisticComment: Comment = {
      id: tempId,
      author: 'You',
      avatar: 'https://picsum.photos/seed/you/100/100',
      content: newComment,
      timestamp: 'Just now'
    };

    setComments(prev => [optimisticComment, ...prev]);
    setNewComment('');

    // Simulate API latency
    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Discussion</h2>
        <span className="text-sm font-mono text-zinc-400">{comments.length} Comments</span>
      </div>

      <form onSubmit={handleSubmit} className="mb-12 relative">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Join the conversation..."
          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-sm resize-none"
        />
        <div className="absolute bottom-4 right-4 flex items-center space-x-4">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest hidden sm:inline">⌘ + Enter to post</span>
          <button 
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="p-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      <div className="space-y-8">
        <AnimatePresence initial={false}>
          {comments.map(comment => (
            <motion.div 
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              layout
            >
              <CommentItem comment={comment} />
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-6 mt-6 pl-6 border-l border-zinc-100 dark:border-zinc-900 space-y-6">
                  {comment.replies.map(reply => (
                    <CommentItem key={reply.id} comment={reply} isReply />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply }) => {
  return (
    <div className="group">
      <div className="flex items-start space-x-4">
        <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full border border-zinc-100 dark:border-zinc-800" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold dark:text-zinc-100">{comment.author}</span>
              <span className="text-xs text-zinc-400 font-medium">{comment.timestamp}</span>
            </div>
            <button className="text-zinc-300 group-hover:text-zinc-500 transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
            {comment.content}
          </p>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1.5 text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <Reply size={12} />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
