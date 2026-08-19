import React, { useState, useEffect, useRef } from 'react';

export interface StickyFeature {
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
  textColor: string;
}

interface StickyScrollCardsProps {
  features: StickyFeature[];
  title?: string;
  subtitle?: string;
}

// --- Custom Hook for Scroll Animation ---
const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when the element's intersection status changes.
        setInView(entry.isIntersecting);
      },
      {
        root: null, // observing intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1, // 10% of the item must be visible to trigger the callback
      }
    );

    observer.observe(element);

    // Cleanup function to disconnect the observer when the component unmounts.
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
};

// --- Header Component ---
const AnimatedHeader = ({ title, subtitle }: { title?: string; subtitle?: string }) => {
  const [headerRef, headerInView] = useScrollAnimation();
  const [pRef, pInView] = useScrollAnimation();

  return (
    <div className="text-center max-w-3xl mx-auto mb-16 px-4">
      {title && (
        <h2 
          ref={headerRef as React.RefObject<HTMLHeadingElement>}
          className={`text-[28px] md:text-[40px] font-[800] text-[#14202d] leading-[1.2] transition-all duration-700 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p 
          ref={pRef as React.RefObject<HTMLParagraphElement>}
          className={`text-[15px] text-[#6b7280] leading-[1.75] mt-4 transition-all duration-700 ease-out delay-200 ${pInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

// This is the main component that orchestrates everything.
export function StickyFeatureSection({ features, title, subtitle }: StickyScrollCardsProps) {
  return (
    <div className="bg-transparent font-sans w-full">
      <div className="w-full">
        <div className="max-w-7xl mx-auto">
          {/* The main section for the features */}
          <section className="flex flex-col items-center">
            
            {(title || subtitle) && <AnimatedHeader title={title} subtitle={subtitle} />}

            {/* The container for the sticky cards */}
            <div className="w-full">
              {features.map((feature, index) => (
                <div
                  key={index}
                  // The sticky class makes the card stick to the top of the container on desktop.
                  className={`${feature.bgColor} grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 p-8 md:p-12 rounded-[24px] mb-16 static md:sticky shadow-sm border border-gray-100`}
                  // All cards will stick at the same position, creating the stacking effect.
                  style={{ top: '120px' }}
                >
                  {/* Card Content */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#14202d]">{feature.title}</h3>
                    <p className={`${feature.textColor} text-[15px] leading-relaxed`}>{feature.description}</p>
                  </div>
                  
                  {/* Card Image */}
                  <div className="image-wrapper mt-8 md:mt-0">
                    <img 
                      src={feature.imageUrl} 
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-[300px] md:h-[400px] rounded-xl shadow-md object-cover"
                      // Simple fallback in case an image fails to load
                      onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found"; 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
