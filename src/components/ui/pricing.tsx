"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { CheckCircle2, Sparkles, Zap, Building2 } from "lucide-react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";

const plans = [
  {
    name: "Basic",
    description: "Great for students and fresh graduates starting their career journey.",
    priceDisplay: "Free",
    period: "forever",
    buttonText: "Join Basic",
    icon: <Zap className="w-6 h-6 text-[#08735d]" />,
    includes: [
      "Core Benefits:",
      "Community Access",
      "Basic Workshops",
      "Career Newsletter",
      "Online Forums",
    ],
  },
  {
    name: "Professional",
    description: "Best value for professionals looking for serious career acceleration.",
    priceDisplay: "৳2,500",
    period: "year",
    buttonText: "Join Professional",
    popular: true,
    icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
    includes: [
      "Everything in Basic, plus:",
      "Premium Networking Events",
      "1-on-1 Mentorship",
      "Advanced Skill Workshops",
      "Job Board Priority",
    ],
  },
  {
    name: "Corporate",
    description: "Tailored solutions for organizations to upskill and network.",
    priceDisplay: "Custom",
    period: "annual",
    buttonText: "Contact Us",
    icon: <Building2 className="w-6 h-6 text-[#08735d]" />,
    includes: [
      "Everything in Professional, plus:",
      "Dedicated Account Manager",
      "Bulk Membership Discount",
      "Sponsorship Opportunities",
      "Corporate Training Programs",
    ],
  },
];

export default function PricingSection5() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.25, 0.4, 0.2, 1],
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };

  return (
    <div className="px-4 pt-16 pb-24 relative max-w-7xl mx-auto" ref={pricingRef}>
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#08735d]/5 rounded-full blur-[100px] pointer-events-none" />

      <article className="text-center mb-16 space-y-6 max-w-3xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-[800] text-[#14202d] leading-tight tracking-tight">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.1}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
            }}
          >
            Membership Plans
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-lg md:text-xl text-gray-500"
        >
          Elevate your career trajectory. Choose a plan that aligns with your professional ambitions
          and networking needs.
        </TimelineContent>
      </article>

      <div className="grid lg:grid-cols-3 gap-8 py-6 relative z-10">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={1 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="flex"
          >
            <Card
              className={`relative w-full flex flex-col transition-all duration-500 overflow-hidden ${
                plan.popular
                  ? "border-0 shadow-2xl shadow-[#08735d]/20 lg:-translate-y-6 bg-gradient-to-br from-[#08735d] to-[#05493b] text-white ring-1 ring-[#08735d]/50"
                  : "bg-white/80 backdrop-blur-xl border-gray-100/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 text-[#14202d]"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20">
                  <Sparkles className="w-32 h-32 text-white" />
                </div>
              )}

              <CardHeader className="text-left pb-8 pt-10 px-8 relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div
                    className={`p-3 rounded-2xl ${plan.popular ? "bg-white/10" : "bg-[#08735d]/10"}`}
                  >
                    {plan.icon}
                  </div>
                  {plan.popular && (
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-950 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-sm">
                      Most Popular
                    </span>
                  )}
                </div>

                <h3 className="text-3xl font-extrabold mb-3">{plan.name}</h3>
                <p
                  className={`text-sm mb-6 leading-relaxed h-10 ${plan.popular ? "text-green-50" : "text-gray-500"}`}
                >
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-[44px] font-black tracking-tight leading-none">
                    {plan.priceDisplay}
                  </span>
                  {plan.priceDisplay !== "Custom" && plan.priceDisplay !== "Free" && (
                    <span
                      className={`font-semibold ${plan.popular ? "text-green-200" : "text-gray-400"}`}
                    >
                      /{plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0 px-8 pb-10 flex-1 flex flex-col relative z-10">
                <Link
                  to={plan.name === "Corporate" ? "/contact" : "/join"}
                  aria-label={`${plan.buttonText} membership`}
                  className={`w-full mb-10 py-4 px-6 text-[15px] font-bold rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-white text-[#08735d] shadow-[0_8px_20px_-6px_rgba(255,255,255,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(255,255,255,0.5)] hover:-translate-y-1"
                      : "bg-[#f8faf9] text-[#14202d] border border-gray-200 hover:bg-[#08735d] hover:text-white hover:border-[#08735d] hover:shadow-[0_8px_20px_-6px_rgba(8,115,93,0.3)] hover:-translate-y-1"
                  }`}
                >
                  {plan.buttonText}
                </Link>

                <div className="space-y-5 mt-auto">
                  <h4
                    className={`font-bold text-sm uppercase tracking-widest ${plan.popular ? "text-green-200" : "text-[#08735d]"}`}
                  >
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-4">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 ${plan.popular ? "text-green-300" : "text-[#08735d]"}`}
                        />
                        <span
                          className={`text-[15px] font-medium ${plan.popular ? "text-white" : "text-gray-600"}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
