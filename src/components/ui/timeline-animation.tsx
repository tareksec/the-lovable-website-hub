import React from "react";
import { motion, Variants } from "framer-motion";

interface TimelineContentProps {
  children: React.ReactNode;
  animationNum: number;
  timelineRef?: React.RefObject<HTMLDivElement | null>;
  customVariants?: Variants;
  className?: string;
  as?: React.ElementType;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  children,
  animationNum,
  customVariants,
  className,
  as: Component = "div",
}) => {
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  const variants = customVariants || defaultVariants;
  const MotionComponent = motion(Component as React.ElementType) as React.ElementType;

  return (
    <MotionComponent
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};
