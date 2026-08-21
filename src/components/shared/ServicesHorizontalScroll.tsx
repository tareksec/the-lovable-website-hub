import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import talentSolutionsImg from "/public/images/services/talent-solutions.jpg";
import businessConsultingImg from "/public/images/services/business-consulting.jpg";
import trainingDevelopmentImg from "/public/images/services/training-development.jpg";
import networkingCommunityImg from "/public/images/services/networking-community.jpg";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

const SERVICES: Service[] = [
  {
    id: "01",
    title: "Talent Solutions",
    description: "Connecting the right talent with the right opportunities.",
    image: talentSolutionsImg,
  },
  {
    id: "02",
    title: "Business Consulting",
    description: "Strategic solutions for sales, marketing & business growth.",
    image: businessConsultingImg,
  },
  {
    id: "03",
    title: "Training & Development",
    description: "Upskill, lead, and grow with industry-relevant programs.",
    image: trainingDevelopmentImg,
  },
  {
    id: "04",
    title: "Networking & Community",
    description: "Bridging professionals and organizations for impactful, long-lasting partnerships.",
    image: networkingCommunityImg,
  },
];

const AUTO_PLAY_DURATION = 5000;

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => { handleNext(); }, AUTO_PLAY_DURATION);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: (direction: number) => ({ y: direction > 0 ? "-100%" : "100%", opacity: 0 }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, y: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <section className="w-full bg-gray-50/50 py-16 md:py-24 lg:py-32 bec-section overflow-hidden">
      <div className="bec-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
            <div className="space-y-2 mb-12">
              <span className="text-sm font-semibold text-bec-emerald uppercase tracking-widest block">
                What We Do
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-bec-navy leading-tight tracking-tight">
                Explore Our Services
              </h2>
            </div>
            
            <div className="flex flex-col space-y-0">
              {SERVICES.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-4 py-6 md:py-8 text-left transition-all duration-500 border-t border-gray-200/80 first:border-0",
                      isActive ? "text-bec-navy" : "text-gray-400 hover:text-bec-navy"
                    )}
                  >
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-gray-200">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute top-0 left-0 w-full bg-bec-emerald origin-top"
                          initial={{ height: "0%" }}
                          animate={isPaused ? { height: "0%" } : { height: "100%" }}
                          transition={{ duration: AUTO_PLAY_DURATION / 1000, ease: "linear" }}
                        />
                      )}
                    </div>
                    <span className="text-[10px] md:text-xs font-semibold mt-1 tabular-nums opacity-60">
                      /{service.id}
                    </span>
                    <div className="flex flex-col gap-2 flex-1">
                      <span className={cn(
                        "text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-500",
                        isActive ? "text-bec-navy" : ""
                      )}>
                        {service.title}
                      </span>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-500 text-sm md:text-base font-normal leading-relaxed max-w-sm pb-3">
                              {service.description}
                            </p>
                            <div className="pt-2 pb-1">
                              <Link
                                to="/services"
                                hash={service.title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}
                                className="inline-flex items-center gap-1.5 text-bec-emerald text-sm font-semibold group/link"
                              >
                                Learn more 
                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="lg:col-span-7 flex flex-col justify-end h-full order-1 lg:order-2">
            <div className="relative group/gallery" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
              <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[16/11] rounded-[24px] md:rounded-[32px] overflow-hidden bg-gray-100 border border-gray-200/50 shadow-xl shadow-bec-navy/5">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ y: { type: "spring", stiffness: 260, damping: 32 }, opacity: { duration: 0.4 } }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={handleNext}
                  >
                    <img
                      src={SERVICES[activeIndex].image}
                      alt={SERVICES[activeIndex].title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bec-navy/60 via-transparent to-transparent opacity-80" />
                  </motion.div>
                </AnimatePresence>
                
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-3 z-20">
                  <button onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-gray-200/50 flex items-center justify-center text-bec-navy hover:bg-white hover:text-bec-emerald hover:scale-105 transition-all shadow-lg"
                    aria-label="Previous">
                    <ArrowLeft size={20} strokeWidth={2} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-gray-200/50 flex items-center justify-center text-bec-navy hover:bg-white hover:text-bec-emerald hover:scale-105 transition-all shadow-lg"
                    aria-label="Next">
                    <ArrowRight size={20} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
