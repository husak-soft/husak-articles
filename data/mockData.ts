
import { Post } from '../types';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    slug: 'future-of-minimalist-interfaces',
    title: 'The Future of Minimalist Interfaces in High-Density Apps',
    excerpt: 'How we balance complexity and aesthetic in the next generation of professional tools.',
    content: `
      <h2>The paradox of choice</h2>
      <p>In the world of professional software, we are often confronted with a paradox. Our users demand power, yet they crave simplicity. Minimalist design isn't about removing features; it's about removing noise. It's about ensuring that the most important action is the most visible one.</p>
      
      <blockquote>
        "Simplicity is the ultimate sophistication." — Leonardo da Vinci
      </blockquote>

      <p>As we move towards 2025, the trend of 'hidden power' is becoming more prevalent. This means interfaces that appear empty until interacted with, or systems that rely heavily on command palettes and keyboard shortcuts to navigate complex workflows.</p>

      <h3>Micro-interactions as navigation</h3>
      <p>When you remove visual clutter, you must replace it with sensory feedback. This is where high-end micro-interactions come in. A subtle hover glow, a springy transition, or a progress indicator that feels like it has weight. These aren't just 'eye candy'; they are the breadcrumbs that lead the user through a digital space.</p>

      <p>Consider the 'Command Palette' (CMD+K). It has become the standard for modern SaaS because it removes the need for deep sidebar navigation. It turns the entire application into a searchable database, reducing cognitive load and increasing speed for power users.</p>
    `,
    date: 'Oct 24, 2024',
    readTime: '6 min read',
    category: 'Design',
    author: {
      name: 'Julian Vercetti',
      role: 'Principal Architect',
      avatar: 'https://picsum.photos/seed/julian/100/100'
    },
    coverImage: 'https://picsum.photos/seed/interface/1200/630',
    impactScore: 4.8
  },
  {
    id: '2',
    slug: 'scaling-react-in-2025',
    title: 'Scaling React Server Components for Global Infrastructure',
    excerpt: 'Exploring the boundary between the server and client in the modern web stack.',
    content: '<p>Standard React architecture has evolved...</p>',
    date: 'Oct 12, 2024',
    readTime: '12 min read',
    category: 'Engineering',
    author: {
      name: 'Sarah Drasner',
      role: 'Staff Engineer',
      avatar: 'https://picsum.photos/seed/sarah/100/100'
    },
    coverImage: 'https://picsum.photos/seed/code/1200/630',
    impactScore: 4.2
  },
  {
    id: '3',
    slug: 'stoic-philosophy-in-product',
    title: 'Stoic Philosophy in Digital Product Design',
    excerpt: 'Applying ancient wisdom to modern user experiences and team management.',
    content: '<p>Marcus Aurelius probably didn\'t have an iPhone, but...</p>',
    date: 'Sep 28, 2024',
    readTime: '8 min read',
    category: 'Philosophy',
    author: {
      name: 'Marcus Chen',
      role: 'Product Lead',
      avatar: 'https://picsum.photos/seed/marcus/100/100'
    },
    coverImage: 'https://picsum.photos/seed/statue/1200/630',
    impactScore: 4.5
  }
];
