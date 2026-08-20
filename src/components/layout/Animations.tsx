import { m, LazyMotion, domAnimation, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

export const Reveal = ({
  children,
  width = "100%",
  delay = 0,
  y = 20,
  direction = "up",
  className,
}: {
  children: ReactNode;
  width?: string;
  delay?: number;
  y?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const shouldReduceMotion = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 0, y: 0, x: 0 };
    switch (direction) {
      case "up":
        return { opacity: 0, y };
      case "down":
        return { opacity: 0, y: -y };
      case "left":
        return { opacity: 0, x: y };
      case "right":
        return { opacity: 0, x: -y };
      default:
        return { opacity: 0, y };
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        className={className}
        variants={{
          hidden: shouldReduceMotion ? { opacity: 1, y: 0, x: 0 } : getInitial(),
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        animate={isInView || shouldReduceMotion ? "visible" : "hidden"}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.6,
          delay: shouldReduceMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ width }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

export const StaggerContainer = ({
  children,
  delay = 0.1,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: shouldReduceMotion ? 0 : delay,
            },
          },
        }}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

export const StaggerItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        variants={{
          hidden: { opacity: shouldReduceMotion ? 1 : 0, y: 0 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ 
          duration: shouldReduceMotion ? 0 : 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};
