import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Reveal } from "@/components/layout/Animations";

interface Testimonial {
  review: string;
  name: string;
  designation: string;
  company: string;
  photo: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    review:
      "BEC completely transformed our recruitment process. We hired 12 qualified professionals in just 6 weeks through their vast talent network. The team understood our requirements perfectly.",
    stars: 5,
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80",
    name: "Rahman Kabir",
    designation: "HR Director",
    company: "Bashundhara Group",
  },
  {
    review:
      "The one-on-one career consulting session completely changed my approach. I landed a senior executive role in just 3 months. Highly recommended for any professional looking to grow.",
    stars: 5,
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80",
    name: "Nusrat Jahan",
    designation: "Senior Executive",
    company: "Grameenphone",
  },
  {
    review:
      "BEC's business consulting gave our startup the strategic clarity we desperately needed. Our revenue grew by 40% in the first quarter after implementing their recommendations.",
    stars: 5,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80",
    name: "Ashraf Hossain",
    designation: "CEO & Founder",
    company: "TechBridge BD",
  },
];

export const TestimonialSlider = ({ variant = "full" }: { variant?: "full" | "compact" }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const testimonial = testimonials[current];
  if (!testimonial) return null;

  if (variant === "compact") {
    return (
      <section
        className="py-24 bg-[#fbfcfb]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="bec-container">
          <Reveal>
            <div className="max-w-[800px] mx-auto bg-[#08735d] rounded-[32px] p-8 md:p-16 text-white relative shadow-2xl overflow-hidden">
              <div className="absolute top-8 right-8 text-white/10">
                <Quote size={120} />
              </div>

              <div className="relative z-10 min-h-[280px] md:min-h-[220px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0"
                  >
                    <div className="flex gap-1 mb-8">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                        >
                          <Star size={20} className="fill-[#c09643] text-[#c09643]" />
                        </motion.div>
                      ))}
                    </div>

                    <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-10">
                      "{testimonial.review}"
                    </blockquote>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-4"
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-[#c09643]"
                      />
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-white/80 text-sm">
                          {testimonial.designation}, {testimonial.company}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-4 mt-12">
                <button
                  onClick={() => paginate(-1)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#08735d] flex items-center justify-center transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#08735d] flex items-center justify-center transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-24 bg-[#fbfcfb]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bec-container">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side */}
          <Reveal direction="right" className="w-full lg:w-1/2">
            <div className="relative rounded-[24px] overflow-hidden group">
              <img
                loading="lazy"
                decoding="async"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800"
                alt="BEC Professionals"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08735d]/60 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="bg-[#08735d] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                  10,000+ Professionals Trust BEC
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right Side */}
          <div className="w-full lg:w-1/2">
            <Reveal>
              <div className="mb-12">
                <span className="bg-bec-emerald/10 text-bec-emerald text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                  Our Testimonials
                </span>
                <h2 className="text-4xl font-extrabold text-bec-navy mb-4">
                  What Our Members Say
                </h2>
                <div className="text-[#c09643]/20">
                  <Quote size={80} />
                </div>
              </div>

              <div className="relative min-h-[300px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                        >
                          <Star size={18} className="fill-[#c09643] text-[#c09643]" />
                        </motion.div>
                      ))}
                    </div>

                    <blockquote className="text-lg md:text-xl text-bec-navy font-medium leading-relaxed mb-8">
                      "{testimonial.review}"
                    </blockquote>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-4"
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full border-2 border-[#08735d]/20"
                      />
                      <div>
                        <h4 className="font-bold text-bec-navy">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">
                          {testimonial.designation}, {testimonial.company}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-6 mt-12">
                <div className="flex gap-2">
                  <button
                    onClick={() => paginate(-1)}
                    className="w-12 h-12 rounded-full border border-[#08735d]/20 text-[#08735d] hover:bg-[#08735d] hover:text-white flex items-center justify-center transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className="w-12 h-12 rounded-full border border-[#08735d]/20 text-[#08735d] hover:bg-[#08735d] hover:text-white flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDirection(idx > current ? 1 : -1);
                        setCurrent(idx);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${current === idx ? "w-6 bg-[#c09643]" : "bg-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
