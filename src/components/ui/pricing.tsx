"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { CheckCheck } from "lucide-react";
import { useRef } from "react";

const plans = [
  {
    name: "Basic",
    description:
      "Great for students and fresh graduates starting their career journey.",
    priceDisplay: "Free",
    period: "forever",
    buttonText: "Join Basic",
    buttonVariant: "outline" as const,
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
    description:
      "Best value for professionals looking for serious career acceleration.",
    priceDisplay: "৳2,500",
    period: "year",
    buttonText: "Join Professional",
    buttonVariant: "default" as const,
    popular: true,
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
    description:
      "Tailored solutions for organizations to upskill and network.",
    priceDisplay: "Custom",
    period: "annual",
    buttonText: "Contact Us",
    buttonVariant: "outline" as const,
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
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div
      className="px-4 pt-12 pb-24 min-h-screen max-w-7xl mx-auto relative"
      ref={pricingRef}
    >
      <article className="text-center md:text-left mb-12 space-y-4 max-w-2xl mx-auto md:mx-0">
        <h2 className="md:text-[56px] text-4xl capitalize font-[800] text-[#14202d] mb-4 leading-tight">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center md:justify-start"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Choose Your Membership
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="md:text-lg text-base text-[#6b7280] mx-auto md:mx-0"
        >
          Find the right plan for your professional journey. From basic access to full corporate partnerships, we have a tier for every growth stage.
        </TimelineContent>
      </article>

      <div className="grid md:grid-cols-3 gap-8 py-6">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={1 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={`relative h-full flex flex-col border border-neutral-200 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "ring-2 ring-[#08735d] bg-[#f3f8f6] shadow-xl md:-translate-y-4"
                  : "bg-white hover:-translate-y-2"
              }`}
            >
              <CardHeader className="text-left pb-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#14202d]">
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <span className="bg-[#c09643] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6b7280] mb-6 h-10">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[40px] font-extrabold text-[#08735d] tracking-tight">
                    {plan.priceDisplay}
                  </span>
                  {plan.priceDisplay !== "Custom" && plan.priceDisplay !== "Free" && (
                    <span className="text-[#6b7280] font-medium">
                      /{plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0 flex-1 flex flex-col">
                <button
                  className={`w-full mb-8 py-4 px-6 text-lg font-bold rounded-xl transition-all active:scale-95 ${
                    plan.popular
                      ? "bg-[#08735d] text-white shadow-lg shadow-[#08735d]/30 hover:bg-[#065c4a]"
                      : "bg-white text-[#14202d] border-2 border-gray-200 hover:border-[#08735d] hover:text-[#08735d]"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-4 pt-6 border-t border-gray-200 mt-auto">
                  <h4 className="font-semibold text-base text-[#14202d]">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-4">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <span className="h-6 w-6 shrink-0 rounded-full bg-[#08735d]/10 flex items-center justify-center mt-0.5">
                          <CheckCheck className="h-3.5 w-3.5 text-[#08735d]" />
                        </span>
                        <span className="text-[15px] font-medium text-[#4b5563]">{feature}</span>
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
