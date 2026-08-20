import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { publicApi, Post } from "@/lib/publicApi";
import { Reveal } from "@/components/layout/Animations";
import XScroll from "@/components/ui/x-scroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600",
];

const BlogCard = ({ post, index }: { post: Post; index: number }) => {
  const dateObj = new Date(post.createdAt);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group bg-white rounded-[24px] shadow-bec-soft border border-gray-100/60 hover:shadow-bec-soft-hover hover:border-bec-emerald/20 hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full w-[300px] md:w-[380px] shrink-0"
      data-tilt
      data-cursor="view"
    >
      {/* TOP — Cover image */}
      <Link
        to="/resources/$slug"
        params={{ slug: post.slug }}
        className="relative h-[220px] overflow-hidden block shrink-0"
      >
        <motion.img
          src={post.coverImageUrl || BLOG_IMAGES[index % BLOG_IMAGES.length]}
          alt={post.title}
          className="w-full h-full object-cover"
          data-editorial-image
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />

        {/* Date Badge Overlay */}
        <div className="absolute top-4 left-4 w-[48px] h-[48px] bg-white rounded-[8px] flex flex-col items-center justify-center shadow-md">
          <span className="text-lg font-bold text-bec-emerald leading-none">{day}</span>
          <span className="text-xs font-semibold text-gray-500 mt-0.5">{month}</span>
        </div>
      </Link>

      {/* BODY */}
      <div className="p-[24px] flex flex-col flex-1">
        {/* Category pill */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-bec-emerald border border-bec-emerald/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            {post.category}
          </span>
        </div>

        <Link to="/resources/$slug" params={{ slug: post.slug }} className="block">
          <h3 className="text-lg font-bold text-bec-navy leading-snug mb-4 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <div className="mt-auto">
          <Link
            to="/resources/$slug"
            params={{ slug: post.slug }}
            className="text-bec-emerald text-sm font-bold flex items-center gap-1 group/btn"
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
  <div className="bg-white rounded-[24px] shadow-bec-soft border border-gray-100/60 overflow-hidden flex flex-col h-[400px] w-[300px] md:w-[380px] shrink-0">
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
    queryKey: ["latest-insights"],
    queryFn: async () => {
      const { posts } = await publicApi.posts.getAll();
      return posts.slice(0, 8); // Slightly more posts to make the scroll worthwhile
    },
  });

  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop when we have posts
    if (isMobile || shouldReduceMotion || !containerRef.current || !trackRef.current || isLoading || !posts?.length) return;

    const container = containerRef.current;
    const track = trackRef.current;

    let ctx: gsap.Context;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const getScrollAmount = () => {
          const trackWidth = track.scrollWidth;
          const amount = trackWidth - window.innerWidth + (window.innerWidth * 0.15);
          return amount > 0 ? -amount : 0;
        };

        gsap.to(track, {
          x: () => getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }, containerRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [isMobile, shouldReduceMotion, posts, isLoading]);

  // Mobile layout (original XScroll)
  if (isMobile) {
    return (
      <section className="bec-section bg-white overflow-hidden">
        <div className="bec-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <Reveal className="flex flex-col items-start max-w-xl">
              <span className="text-sm font-semibold text-bec-emerald uppercase tracking-widest mb-4">
                Blog & News
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-bec-navy leading-tight tracking-tight">
                Latest Insights & Updates
              </h2>
            </Reveal>
          </div>

          <div className="relative -mx-4 px-4">
            <XScroll className="w-full pb-8">
              <div className="flex gap-6 pb-4">
                {isLoading
                  ? [...Array(4)].map((_, i) => <PlaceholderCard key={i} />)
                  : posts && posts.length > 0
                    ? posts.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)
                    : [...Array(4)].map((_, i) => <PlaceholderCard key={i} />)}
              </div>
            </XScroll>
          </div>

          <Reveal className="text-center mt-8 md:hidden">
            <Link
              to="/resources"
              className="bec-button bec-secondary w-full"
            >
              View All Articles
            </Link>
          </Reveal>
        </div>
      </section>
    );
  }

  // Desktop layout (CSS Sticky + GSAP Scrub)
  // Dynamic height based on whether we need to scroll or not
  const needsScroll = posts && posts.length > 3;
  const sectionHeight = needsScroll ? "200vh" : "100vh";

  return (
    <section ref={containerRef} className="bg-[#fbfcfb] w-full relative" style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="w-full">
          <div className="bec-container mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col items-start max-w-xl">
                <span className="text-sm font-semibold text-bec-emerald uppercase tracking-widest mb-4">
                  Blog & News
                </span>
                <h2 className="text-5xl font-extrabold text-bec-navy leading-tight tracking-tight">
                  Latest Insights & Updates
                </h2>
              </div>
              <div className="hidden md:block">
                <Link
                  to="/resources"
                  className="bec-button bec-secondary"
                >
                  View All Articles
                </Link>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-[10vw]">
            <div ref={trackRef} className="flex gap-8 w-max pb-12 pt-4">
              {isLoading
                ? [...Array(4)].map((_, i) => <PlaceholderCard key={i} />)
                : posts && posts.length > 0
                  ? posts.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)
                  : [...Array(4)].map((_, i) => <PlaceholderCard key={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
