import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { publicApi, Post } from '@/lib/publicApi';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/layout/Animations';
import XScroll from '@/components/ui/x-scroll';

const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600"
];

const BlogCard = ({ post, index }: { post: Post; index: number }) => {
  const dateObj = new Date(post.createdAt);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group bg-white rounded-[12px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full w-[300px] md:w-[380px] shrink-0"
    >
      {/* TOP — Cover image */}
      <Link 
        to="/resources/$slug" 
        params={{ slug: post.slug }}
        className="relative h-[220px] overflow-hidden block shrink-0"
      >
        <motion.img
          src={BLOG_IMAGES[index % BLOG_IMAGES.length]}
          alt={post.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Date Badge Overlay */}
        <div className="absolute top-4 left-4 w-[48px] h-[48px] bg-white rounded-[8px] flex flex-col items-center justify-center shadow-md">
          <span className="text-[18px] font-bold text-[#08735d] leading-none">{day}</span>
          <span className="text-[11px] font-semibold text-gray-500 mt-0.5">{month}</span>
        </div>
      </Link>

      {/* BODY */}
      <div className="p-[24px] flex flex-col flex-1">
        {/* Category pill */}
        <div className="mb-4">
          <span className="text-[12px] font-semibold text-[#08735d] border border-[#08735d]/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            {post.category}
          </span>
        </div>

        <Link 
          to="/resources/$slug" 
          params={{ slug: post.slug }}
          className="block"
        >
          <h3 className="text-[17px] font-[700] text-[#14202d] leading-[1.4] mb-4 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <div className="mt-auto">
          <Link 
            to="/resources/$slug" 
            params={{ slug: post.slug }}
            className="text-[#08735d] text-[14px] font-[700] flex items-center gap-1 group/btn"
          >
            Learn More 
            <motion.span 
              className="inline-block"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const PlaceholderCard = () => (
  <div className="bg-white rounded-[12px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col h-[400px] w-[300px] md:w-[380px] shrink-0">
    <div className="h-[220px] bg-gray-100 animate-pulse shrink-0" />
    <div className="p-[24px] flex-1 flex flex-col">
      <div className="w-20 h-6 bg-gray-100 rounded-full mb-4 animate-pulse shrink-0" />
      <div className="w-full h-6 bg-gray-100 rounded mb-3 animate-pulse shrink-0" />
      <div className="w-2/3 h-6 bg-gray-100 rounded animate-pulse shrink-0" />
      <div className="w-1/3 h-4 bg-gray-100 rounded mt-auto animate-pulse shrink-0" />
    </div>
  </div>
);

export const BlogInsights = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['latest-insights'],
    queryFn: async () => {
      const { posts } = await publicApi.posts.getAll();
      return posts.slice(0, 6);
    }
  });

  return (
    <section className="bec-section bg-white overflow-hidden">
      <div className="bec-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal className="flex flex-col items-start max-w-xl">
            <span className="text-[13px] font-semibold text-[#08735d] uppercase tracking-[0.08em] mb-4">Blog & News</span>
            <h2 className="text-[32px] md:text-[44px] font-[800] text-[#14202d] leading-[1.1] tracking-tight">
              Latest Insights & Updates
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="hidden md:block">
            <Link to="/resources" className="bec-primary bg-transparent text-[#14202d] border-2 border-gray-200 hover:border-[#08735d] hover:text-[#08735d]">
              View All Articles
            </Link>
          </Reveal>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative -mx-4 md:mx-0 px-4 md:px-0">
          <XScroll className="w-full pb-8">
            <div className="flex gap-6 pb-4">
              {isLoading ? (
                [...Array(4)].map((_, i) => <PlaceholderCard key={i} />)
              ) : posts && posts.length > 0 ? (
                posts.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)
              ) : (
                [...Array(4)].map((_, i) => <PlaceholderCard key={i} />)
              )}
            </div>
          </XScroll>
        </div>

        {/* Mobile-only Bottom CTA */}
        <Reveal className="text-center mt-8 md:hidden">
          <Link to="/resources" className="bec-primary w-full bg-transparent text-[#14202d] border-2 border-gray-200 hover:border-[#08735d] hover:text-[#08735d]">
            View All Articles
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

