import React, { useMemo } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, HTMLMotionProps, MotionValue } from "framer-motion";
import { UsersRound, Search, Globe2, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStep {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const HOW_IT_WORKS_STEPS: ProcessStep[] = [
  {
    id: "01",
    label: "Step 01",
    title: "Connect",
    description: "Reach out through our platform or LinkedIn. Share your professional goals with the BEC team.",
    icon: UsersRound,
  },
  {
    id: "02",
    label: "Step 02",
    title: "Assess",
    description: "Our experts review your profile and match you with the right talent placement or training program.",
    icon: Search,
  },
  {
    id: "03",
    label: "Step 03",
    title: "Grow",
    description: "Get placed, trained, or consulted. We stay with you through your entire growth journey.",
    icon: Globe2,
  },
];

// --- Primitives ---
interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}
const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (context === undefined) throw new Error("useContainerScrollContext must be used within a ContainerScrollContextProvider");
  return context;
}

const ContainerScroll: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, style, className, ...props }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start center", "end end"] });
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn("relative w-full", className)} style={{ perspective: "1000px", ...style }} {...props}>
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};
ContainerScroll.displayName = "ContainerScroll";

const CardsContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className={cn("relative", className)} style={{ perspective: "1000px", ...props.style }} {...props}>
      {children}
    </div>
  );
};
CardsContainer.displayName = "CardsContainer";

interface CardStickyProps extends HTMLMotionProps<"div"> {
  arrayLength: number;
  index: number;
  incrementY?: number;
  incrementZ?: number;
  incrementRotation?: number;
}

const CardTransformed = React.forwardRef<HTMLDivElement, CardStickyProps>(
  ({ arrayLength, index, incrementY = 72, incrementZ = 12, incrementRotation = 3, className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext();
    
    // Create overlapping windows so multiple cards are in motion/visible simultaneously
    // Each card's animation starts slightly after the previous one, but they overlap significantly
    const start = index * 0.16;
    const end = Math.min(start + 0.68, 1);
    const range = useMemo(() => [start, end], [start, end]);
    
    // Adjust rotation to fan out: start with a stagger, rotate towards 0 or another angle
    const rotateRange = [0, 1];
    
    // Reduce travel distance so they stay partially visible (fanned) instead of flying off completely
    // "-20%" keeps all three cards inside the sticky viewport through the final scroll position.
    const y = useTransform(scrollYProgress, range, ["0%", "-20%"]);
    
    // Cards start with a slight staggered rotation and straighten out/rotate as they move up
    const rotate = useTransform(scrollYProgress, range, [index * incrementRotation, (index - 1) * -incrementRotation]);
    
    const transform = useMotionTemplate`translateZ(${index * incrementZ}px) translateY(${y}) rotate(${rotate}deg)`;
    const dx = useTransform(scrollYProgress, range, [4, 0]);
    const dy = useTransform(scrollYProgress, range, [4, 12]);
    const blur = useTransform(scrollYProgress, range, [2, 12]);
    const alpha = useTransform(scrollYProgress, range, [0.08, 0.12]);
    const filter = useMotionTemplate`drop-shadow(${dx}px ${dy}px ${blur}px rgba(0,0,0,${alpha}))`;
    
    const cardStyle = {
      top: index * incrementY,
      transform,
      backfaceVisibility: "hidden" as const,
      zIndex: (arrayLength - index) * incrementZ,
      filter,
      ...style,
    };
    
    return (
      <motion.div 
        layout="position" 
        ref={ref} 
        style={cardStyle} 
        className={cn(
          "absolute will-change-transform flex size-full flex-col items-center justify-center gap-6 rounded-[2rem] border border-gray-100 bg-white/90 p-8 md:p-10 backdrop-blur-md", 
          className
        )} 
        {...props} 
      />
    );
  }
);
CardTransformed.displayName = "CardTransformed";

export function HowItWorks() {
  return (
    <section className="bec-section bg-[#f3f8f6] overflow-hidden" aria-labelledby="how-it-works-title">
      <div className="bec-container">
        <div className="mb-10 flex flex-col gap-3 items-center text-center">
          <span className="bec-subtitle-chip mb-2">How It Works</span>
          <h2 id="how-it-works-title">Your Journey With BEC</h2>
        </div>

        <ContainerScroll className="h-[200vh]">
          <div className="sticky left-0 top-[10vh] md:top-[15vh] h-svh w-full py-12 flex justify-center items-start">
            <CardsContainer className="mx-auto h-[400px] w-full max-w-[340px] md:h-[440px] md:max-w-[480px]">
              {HOW_IT_WORKS_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <CardTransformed 
                    key={step.id}
                    arrayLength={HOW_IT_WORKS_STEPS.length} 
                    index={index}
                    className="items-start justify-center border border-gray-100 bg-white"
                  >
                    <div className="flex flex-col items-start justify-start space-y-6 w-full">
                      <div className="flex w-16 h-16 md:w-20 md:h-20 items-center justify-center rounded-[1.25rem] bg-bec-emerald/10 text-bec-emerald">
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                          {step.label}
                        </h4>
                        <h3 className="text-3xl md:text-4xl font-bold text-bec-navy">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 leading-relaxed text-base md:text-lg pr-4">
                        {step.description}
                      </p>
                    </div>
                  </CardTransformed>
                );
              })}
            </CardsContainer>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}

export default HowItWorks;
