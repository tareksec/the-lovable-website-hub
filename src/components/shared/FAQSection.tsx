import {
  StickyFeatureSection,
  type StickyFeature,
} from "@/components/ui/sticky-scroll-cards-section";
import { Headset, Phone, Mail, Link2 as LinkedinIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const faqFeatures: StickyFeature[] = [
  {
    title: "What is Bangladesh Executive Chamber (BEC)?",
    description:
      "BEC is a professional ecosystem in Bangladesh focused on career development, business consulting, talent acquisition, and professional networking. We bridge the gap between talented professionals and leading organizations nationwide.",
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-[#f3f8f6]",
    textColor: "text-gray-500",
  },
  {
    title: "Who can join BEC?",
    description:
      "BEC welcomes fresh graduates, mid-career professionals, entrepreneurs, and corporate organizations. Whether you are seeking career growth or business consulting, BEC has a membership tier suited for you.",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-[#fdf8ed]",
    textColor: "text-gray-500",
  },
  {
    title: "What services does BEC provide?",
    description:
      "BEC offers four core services: Talent Acquisition & HR (connecting professionals with top companies), Business Consulting (strategy and growth guidance), Training & Workshops (skill development programs), and Networking Platforms (professional visibility).",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-[#f0f5f9]",
    textColor: "text-gray-500",
  },
  {
    title: "How do I register for BEC training events?",
    description:
      "Visit the Training & Events page on our website. Each upcoming workshop or seminar has a Register button. Fill in your details and complete the secure payment to confirm your seat.",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-[#f3f8f6]",
    textColor: "text-gray-500",
  },
  {
    title: "Is BEC membership available nationwide?",
    description:
      "Yes. While our headquarters are in Dhaka, BEC operates nationwide. Our consulting services and training programs are accessible across all 64 districts through both in-person and digital platforms.",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-[#fdf8ed]",
    textColor: "text-gray-500",
  },
];

export const FAQSection = () => {
  return (
    <section className="bec-section bg-white">
      <StickyFeatureSection
        title="Frequently Asked Questions About BEC"
        subtitle="Find answers to common questions about our services, membership, and community."
        features={faqFeatures}
      />

      {/* Premium Still Have Questions Contact Block */}
      <div className="bec-container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          data-scroll-top-obstacle="true"
          className="bec-contact-card bg-gradient-to-br from-[#08735d] via-[#065c4a] to-[#044034] rounded-[32px] p-10 md:p-16 text-white relative shadow-2xl group border border-white/10 overflow-hidden"
        >
          <div className="bec-contact-content relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Side: Text Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bec-contact-icon mb-8 inline-flex bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-inner border border-white/5"
              >
                <Headset size={44} className="text-[#c09643]" strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-tight">
                Still Have Questions?
              </h3>
              <p className="text-white/70 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                Connect with our team directly. We are always here to help you navigate your
                professional journey and find the perfect membership tier.
              </p>
            </div>

            {/* Right Side: Contact Cards */}
            <div className="flex-1 w-full flex flex-col gap-4">
              <a
                href="tel:+8801700000000"
                className="bec-contact-link flex items-center justify-between bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 px-6 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group/card"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <Phone size={20} className="text-white" />
                  </div>
                  <span className="text-lg font-semibold text-white/90 tracking-wide">
                    +880 1700-000000
                  </span>
                </div>
                <ArrowRight
                  size={20}
                  className="text-white/30 group-hover/card:text-white transition-colors group-hover/card:translate-x-1"
                />
              </a>

              <a
                href="mailto:info@bec.com.bd"
                className="bec-contact-link flex items-center justify-between bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 px-6 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group/card"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <Mail size={20} className="text-white" />
                  </div>
                  <span className="text-lg font-semibold text-white/90 tracking-wide">
                    info@bec.com.bd
                  </span>
                </div>
                <ArrowRight
                  size={20}
                  className="text-white/30 group-hover/card:text-white transition-colors group-hover/card:translate-x-1"
                />
              </a>

              <a
                href="https://www.linkedin.com/company/bangladesh-executive-chamber/"
                target="_blank"
                rel="noopener noreferrer"
                className="bec-contact-link mt-4 flex items-center justify-center gap-3 bg-white text-bec-emerald px-8 py-5 rounded-2xl font-bold hover:bg-bec-emerald-light transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-lg"
              >
                <LinkedinIcon size={22} />
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#c09643]/20 rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};
