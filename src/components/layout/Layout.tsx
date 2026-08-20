import { type ReactNode, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollTopBlocked, setScrollTopBlocked] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const obstacle = document.querySelector<HTMLElement>('[data-scroll-top-obstacle="true"]');
    if (!obstacle) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrollTopBlocked(
          window.matchMedia("(max-width: 768px)").matches && entry.isIntersecting,
        );
      },
      { threshold: 0.05 },
    );

    observer.observe(obstacle);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <div className="bec-page" id="top">
      <motion.div className="bec-scroll-progress" style={{ scaleX, transformOrigin: "0%" }} />
      <div className="bec-shell">
        <Navbar />
        <main className="bec-main-content">{children}</main>
        <Footer />

        <AnimatePresence>
          {showScrollTop && !scrollTopBlocked && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              whileHover={{ scale: 1.1, backgroundColor: "#065f4e" }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-5 right-5 md:bottom-8 md:right-8 w-12 h-12 bg-[#08735d] text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-50"

              aria-label="Scroll to top"
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
