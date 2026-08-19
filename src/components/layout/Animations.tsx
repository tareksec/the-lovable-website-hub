import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

export const Reveal = ({ children, width = "100%", delay = 0, y = 20, direction = "up", className }: { children: ReactNode; width?: string; delay?: number; y?: number; direction?: "up" | "down" | "left" | "right"; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y };
      case "down": return { opacity: 0, y: -y };
      case "left": return { opacity: 0, x: y };
      case "right": return { opacity: 0, x: -y };
      default: return { opacity: 0, y };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: getInitial(),
        visible: { opacity: 1, y: 0, x: 0 },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.6, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, delay = 0.1, className }: { children: ReactNode; delay?: number; className?: string }) => {
  return (
    <motion.div
      className={className}

      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};
