import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, UsersRound, BarChart3, Handshake, Landmark, Globe2 } from "lucide-react";
import { Reveal } from "@/components/layout/Animations";
import XScroll from "@/components/ui/x-scroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_DATA = [
  {
    id: "talent-solutions",
    title: "Talent Solutions",
    category: "Recruitment",
    description: "Connecting the right talent with the right opportunities. We help build world-class teams.",
    image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80",
    icon: UsersRound,
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    category: "Strategy",
    description: "Strategic solutions for sales, marketing & business growth tailored to your specific needs.",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
    icon: BriefcaseBusiness,
  },
  {
    id: "training-development",
    title: "Training & Development",
    category: "Education",
    description: "Upskill, lead, and grow with industry-relevant programs designed by experts.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    icon: BarChart3,
  },
  {
    id: "networking-community",
    title: "Networking & Community",
    category: "Connections",
    description: "Bridging professionals and organizations for impactful, long-lasting partnerships.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
    icon: Handshake,
  },
  {
    id: "corporate-workshops",
    title: "Corporate Workshops",
    category: "Upskilling",
    description: "Intensive, hands-on sessions to accelerate your team's operational excellence.",
    image: "https://images.unsplash.com/photo-1633511090164-b443152a5127?w=800&q=80",
    icon: Landmark,
  },
  {
    id: "global-expansion",
    title: "Global Expansion",
    category: "Growth",
    description: "Take your brand beyond borders with our nationwide and global expansion strategies.",
    image: "https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=800&q=80",
    icon: Globe2,
  },
];

const ServiceCard = ({ service }: { service: typeof SERVICES_DATA[0] }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group bg-white rounded-[16px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col h-full w-[320px] md:w-[400px] shrink-0"
      data-tilt
      data-cursor="view"
    >
      {/* TOP — Icon Area */}
      <Link
        to="/services"
        hash={service.id}
        aria-label={`Learn more about ${service.title}`}
        className="relative h-[200px] overflow-hidden shrink-0 bg-gradient-to-b from-gray-50/80 to-white flex items-center justify-center border-b border-gray-50"
      >
        {/* Subtle technical grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#14202d 1px, transparent 1px), linear-gradient(to right, #14202d 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }}
        />
        
        {/* Ambient light blobs */}
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#08735d]/10 blur-[40px] group-hover:bg-[#08735d]/20 transition-colors duration-700 ease-out" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-[#c09643]/10 blur-[40px] group-hover:bg-[#c09643]/20 transition-colors duration-700 ease-out delay-75" />
        
        {/* Main Icon Box */}
        <div className="relative z-10 w-[72px] h-[72px] bg-white rounded-[20px] border border-gray-100/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#14202d] group-hover:text-[#08735d] group-hover:scale-110 group-hover:shadow-[0_12px_32px_rgba(8,115,93,0.12)] transition-all duration-500 ease-out">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      </Link>

      {/* BODY */}
      <div className="p-8 flex flex-col flex-1 bg-white">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-extrabold text-bec-emerald uppercase tracking-widest">
            {service.category}
          </span>
        </div>

        <Link to="/services" hash={service.id} className="block group/title" aria-label={`Learn more about ${service.title}`}>
          <h3 className="text-2xl font-bold text-bec-navy leading-snug mb-3 group-hover/title:text-bec-emerald transition-colors">
            {service.title}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-base leading-relaxed mb-8 line-clamp-3">
          {service.description}
        </p>

        <div className="mt-auto pt-5 border-t border-gray-50">
          <Link
            to="/services"
            hash={service.id}
            aria-label={`Explore ${service.title}`}
            className="inline-flex items-center gap-2 text-bec-navy hover:text-bec-emerald text-sm font-semibold transition-colors group/btn"
          >
            Explore Service
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesHorizontalScroll = () => {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop
    if (isMobile || shouldReduceMotion || !containerRef.current || !trackRef.current) return;

    const container = containerRef.current;
    const track = trackRef.current;
    let ctx: gsap.Context;

    // Small delay to ensure images load and layout settles
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
  }, [isMobile, shouldReduceMotion]);

  // Mobile layout (XScroll)
  if (isMobile) {
    return (
      <section className="bec-section bg-gray-50/50 overflow-hidden">
        <div className="bec-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <Reveal className="flex flex-col items-start max-w-xl">
              <span className="text-sm font-semibold text-bec-emerald uppercase tracking-widest mb-4">
                What We Do
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-bec-navy leading-tight tracking-tight">
                Explore Our Services
              </h2>
            </Reveal>
          </div>

          <div className="relative -mx-4 px-4">
            <XScroll className="w-full pb-8">
              <div className="flex gap-6 pb-4">
                {SERVICES_DATA.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </XScroll>
          </div>

          <Reveal className="text-center mt-8 md:hidden">
            <Link
              to="/services"
              className="bec-button bec-secondary w-full"
            >
              View All Services
            </Link>
          </Reveal>
        </div>
      </section>
    );
  }

  // Desktop layout (CSS Sticky + GSAP Scrub)
  return (
    <section ref={containerRef} className="bg-gray-50/50 w-full relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="w-full">
          <div className="bec-container mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col items-start max-w-xl">
                <span className="text-sm font-semibold text-bec-emerald uppercase tracking-widest mb-4">
                  What We Do
                </span>
                <h2 className="text-5xl font-extrabold text-bec-navy leading-tight tracking-tight">
                  Explore Our Services
                </h2>
              </div>
              <div className="hidden md:block">
                <Link
                  to="/services"
                  className="bec-button bec-secondary"
                >
                  View All Services
                </Link>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-[10vw]">
            <div ref={trackRef} className="flex gap-8 w-max pb-12 pt-4">
              {SERVICES_DATA.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
