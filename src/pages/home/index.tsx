import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Globe2,
  Handshake,
  Landmark,
  UsersRound,
  Link2 as LinkedinIcon,
  Award,
  Heart,
  Map,
  Search,
  Calendar,
  MapPin,
  User,
  ChevronRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import PageTransition from "@/components/layout/PageTransition";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/layout/Animations";
import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/lib/publicApi";
import { TestimonialSlider } from "@/components/shared/TestimonialSlider";
import Testimonials from "@/components/ui/testimonials-13";
import PricingSection5 from "@/components/ui/pricing";
import { FAQSection } from "@/components/shared/FAQSection";
import { BlogInsights } from "@/components/shared/BlogInsights";
import { ServicesHorizontalScroll } from "@/components/shared/ServicesHorizontalScroll";

const services = [
  {
    icon: UsersRound,
    title: "TALENT SOLUTIONS",
    body: "Connecting the right talent with the right opportunities.",
  },
  {
    icon: BriefcaseBusiness,
    title: "BUSINESS CONSULTING",
    body: "Strategic solutions for sales, marketing & business growth.",
  },
  {
    icon: BarChart3,
    title: "TRAINING & DEVELOPMENT",
    body: "Upskill, lead, and grow with industry-relevant programs.",
  },
  {
    icon: Handshake,
    title: "NETWORKING & COMMUNITY",
    body: "Bridging professionals and organizations for impact.",
  },
];

const metrics = [
  { icon: UsersRound, value: "10,000+", label: "Professionals", sub: "Connected" },
  { icon: Building2, value: "500+", label: "Partner", sub: "Organizations" },
  { icon: BriefcaseBusiness, value: "2,000+", label: "Career Opportunities", sub: "Shared" },
  { icon: Landmark, value: "150+", label: "Training & Workshops", sub: "Conducted" },
  { icon: Globe2, value: "Nationwide", label: "Impact Across", sub: "Industries" },
];

const chooseData = [
  {
    icon: Award,
    number: "10+",
    label: "Years of Industry Expertise",
    desc: "A decade of delivering excellence in consultancy.",
  },
  {
    icon: Heart,
    number: "95%",
    label: "Client Satisfaction Rate",
    desc: "Our commitment to quality drives lasting partnerships.",
  },
  {
    icon: Map,
    number: "64",
    label: "Districts Reached",
    desc: "Nationwide reach across Bangladesh, impacting lives.",
  },
];

const processSteps = [
  { step: 1, title: "Apply or Connect", desc: "Start your journey by reaching out or applying." },
  { step: 2, title: "Get Assessed", desc: "Our experts analyze your profile or brand needs." },
  { step: 3, title: "Get Matched", desc: "We align you with the perfect opportunities." },
  { step: 4, title: "Grow Together", desc: "Scale new heights with BEC ecosystem support." },
];

const AnimatedValue = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9,]/g, "");
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || numericValue <= 0) return;

    let frame = 0;
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCurrent(Math.round(numericValue * progress));

      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  if (numericValue === 0) return <span>{value}</span>;

  return (
    <span ref={ref} className="inline-block min-w-[2ch]">
      {current.toLocaleString()}
      {suffix}
    </span>
  );
};

const serviceDestinations = [
  { id: "talent-solutions", label: "Talent Solutions" },
  { id: "business-consulting", label: "Business Consulting" },
  { id: "training-development", label: "Training & Development" },
  { id: "networking-community", label: "Networking & Community" },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroParallaxY = useTransform(heroScrollProgress, [0, 1], [0, -18]);

  const titleWords = "Building People. Strengthening Brands. Shaping Bangladesh".split(" ");

  const marqueeText =
    "◆ Talent Acquisition ◆ Business Consulting ◆ Training & Workshops ◆ Professional Networking ◆ Career Growth ◆ Brand Strategy ◆ Nationwide Impact ◆ Empowering Careers";
  const marqueeItems = marqueeText
    .split(" ◆ ")
    .filter((i) => i.trim() !== "")
    .map((i) => i.replace("◆", "").trim());

  const { data: statsData } = useQuery({
    queryKey: ["site-stats"],
    queryFn: publicApi.community.getStats,
  });

  const iconsList = [UsersRound, Building2, BriefcaseBusiness, Landmark, Globe2];
  
  const primaryStats = statsData?.stats
    ?.filter((stat) => ["professionals", "partners", "opportunities", "trainings"].includes(stat.key))
    .slice(0, 4)
    .map((stat, i) => ({
      icon: iconsList[i],
      value: stat.value,
      label: stat.label,
      sub: "",
    }));
  const displayMetrics = [...(primaryStats?.length === 4 ? primaryStats : metrics.slice(0, 4)), metrics[4]];

  const { data: postsData } = useQuery({
    queryKey: ["latest-posts"],
    queryFn: async () => {
      const { posts } = await publicApi.posts.getAll();
      return posts.slice(0, 3);
    },
  });

  const { data: eventsData } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const { events } = await publicApi.events.getAll();
      const now = new Date();
      return events.filter((e) => new Date(e.date) >= now).slice(0, 2);
    },
  });

  return (
    <PageTransition>
      <section
        ref={heroRef}
        className="bec-reference-hero"
        aria-labelledby="bec-reference-heading"
      >
        <motion.img
          src="/images/bec-reference.png"
          alt="Bangladesh Executive Chamber homepage: building people, strengthening brands, and shaping Bangladesh"
          width="1536"
          height="1024"
          style={{ y: shouldReduceMotion ? 0 : heroParallaxY }}
        />
        <h1 id="bec-reference-heading" className="sr-only">
          Building People. Strengthening Brands. Shaping Bangladesh.
        </h1>
        <nav className="bec-reference-nav-overlay" aria-label="Primary navigation">
          <Link to="/" aria-label="Home" className="reference-link reference-home" />
          <Link to="/about" aria-label="About Us" className="reference-link reference-about" />
          <Link
            to="/services"
            aria-label="Our Services"
            className="reference-link reference-services"
          />
          <Link
            to="/resources"
            aria-label="Resources"
            className="reference-link reference-resources"
          />
          <Link
            to="/contact"
            aria-label="Connect Us"
            className="reference-link reference-contact"
          />
          <Link to="/join" aria-label="Join BEC" className="reference-link reference-join" />
        </nav>
        <div className="bec-reference-cta-overlay" aria-label="Hero actions">
          <Link
            to="/services"
            aria-label="Explore Our Services"
            className="reference-link reference-explore"
          />
          <Link
            to="/join"
            aria-label="Join Our Network"
            className="reference-link reference-network"
          />
        </div>
        <div className="bec-reference-service-overlay" aria-label="BEC services">
          {serviceDestinations.map((service) => (
            <Link
              key={service.id}
              to="/services"
              hash={service.id}
              aria-label={`Learn more about ${service.label}`}
              className={`reference-link reference-service-${service.id}`}
            />
          ))}
        </div>
        <div className="bec-reference-stats-overlay" aria-label="BEC impact metrics">
          {displayMetrics.slice(0, 4).map(({ value, label }) => (
            <div className="reference-stat-value" key={label} aria-label={`${value} ${label}`}>
              <AnimatedValue value={value} />
            </div>
          ))}
        </div>
      </section>

      <section className="bec-hero legacy-home-hero" aria-labelledby="bec-heading">
        <div className="bec-backdrop" aria-hidden="true" />
        <div className="bec-dots" aria-hidden="true" />
        <div className="bec-ribbon" aria-hidden="true" />
        <div className="bec-copy">
          <Reveal delay={0.1}>
            <div className="bec-kicker">PROMOTING BRANDS. EMPOWERING CAREERS.</div>
          </Reveal>
          <h1 className="bec-title" id="bec-heading">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {word === "Shaping" || word === "Bangladesh" ? (
                  <em className="inline">{word}</em>
                ) : (
                  word
                )}
                {i === 1 || i === 3 ? <br /> : null}
              </motion.span>
            ))}
          </h1>
          <Reveal delay={0.8}>
            <div className="bec-divider" aria-hidden="true" />
            <p className="bec-desc">
              Bangladesh Executive Chamber (BEC) is a professional ecosystem that empowers careers,
              strengthens brands, and drives corporate growth through consulting, talent solutions,
              training, and meaningful connections.
            </p>
          </Reveal>
          <div className="bec-actions">
            <Reveal delay={1} width="auto">
              <Link to="/services" className="bec-button bec-primary" data-testid="link-explore-services">
                Explore Our Services
              </Link>
            </Reveal>
            <Reveal delay={1.1} width="auto">
              <Link
                to="/join"
                className="bec-secondary bec-btn-hover"
                data-testid="link-join-network"
              >
                Join Our Network <UsersRound aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
        <motion.div
          className="bec-art"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            loading="lazy"
            src="/images/bec-reference.png"
            alt="BEC business community illustration"
            width="1024"
            height="683"
          />
        </motion.div>
        <aside className="bec-services" aria-label="BEC services">
          <StaggerContainer delay={0.2}>
            {services.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <motion.div
                  className="bec-service"
                  data-testid={`service-${title.toLowerCase().replaceAll(" ", "-")}`}
                  whileHover={{ x: 5 }}
                >
                  <div className="bec-service-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <div className="bec-service-copy">
                    <h2>{title}</h2>
                    <p>{body}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </aside>
      </section>

      {/* SECTION 1: MARQUEE STRIP */}
      <div className="bec-marquee-strip legacy-home-marquee">
        <div className="bec-marquee-content">
          {[1, 2, 3].map((loop) => (
            <div key={loop} className="flex">
              {marqueeItems.map((item, idx) => (
                <div key={idx} className="bec-marquee-item">
                  <span className="bec-marquee-separator">◆</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* STATS BAR - Upgraded with SVG icons and padding */}
      <section
        className="bec-section legacy-home-stats bg-white border-y border-gray-100/60"
        aria-label="BEC impact metrics"
      >
        <div className="bec-container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {displayMetrics.map(({ icon: Icon, value, label, sub }, idx) => (
              <Reveal key={`${value}-${idx}`} y={30}>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-bec-soft transition-shadow duration-300 h-full">
                  <div className="w-14 h-14 bg-bec-emerald/10 rounded-full flex items-center justify-center mb-5 text-bec-emerald shrink-0">
                    <Icon size={26} strokeWidth={2.5} />
                  </div>
                  <div className="text-4xl font-extrabold text-bec-emerald leading-none mb-3">
                    <AnimatedValue value={value} />
                  </div>
                  <div className="text-sm font-semibold text-gray-600 leading-snug mt-auto">
                    {label}
                    {sub && (
                      <>
                        <br />
                        <span className="text-gray-400 font-medium">{sub}</span>
                      </>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection />

      {/* SECTION 6: BLOG SECTION */}
      <BlogInsights />

      {/* SECTION 7: MEMBERSHIP TEASER */}
      <section className="bg-bec-offwhite">
        <PricingSection5 />
      </section>

      {/* SECTION 4 — Our Community Partners */}
      <section className="bec-section bg-bec-offwhite overflow-hidden">
        <div className="bec-container">
          <Reveal className="text-center">
            <span className="bec-subtitle-chip mb-4">Our Network</span>
            <h2>Trusted by Leading Organizations</h2>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Our partner network is growing — check back soon for updates on our latest collaborations and corporate partners.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 — HOW BEC WORKS */}
      <section className="bec-section relative overflow-hidden bg-gray-50/50">
        <div className="bec-container">
          <div className="text-center mb-20">
            <Reveal>
              <span className="bec-subtitle-chip mb-4">How It Works</span>
              <h2 className="mt-2">Your Journey With BEC</h2>
            </Reveal>
          </div>

          <div className="relative">
            {/* Desktop Dashed Connector */}
            <div className="hidden md:block absolute top-[60px] left-0 w-full h-[2px] border-t-2 border-dashed border-[#08735d]/20 z-0" />

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {/* Step 1 */}
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-[140px] h-[140px] bg-white rounded-full shadow-bec-soft flex items-center justify-center mb-8 border border-gray-100 relative group transition-all hover:scale-105 hover:shadow-bec-soft-hover hover:border-bec-emerald/30">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-white text-bec-emerald rounded-full flex items-center justify-center font-bold border border-gray-100 shadow-sm text-lg z-10 group-hover:bg-bec-emerald group-hover:text-white transition-colors duration-300">
                      01
                    </div>
                    <UsersRound size={56} className="text-bec-emerald opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="bec-card-title mb-4 text-2xl">Connect</h3>
                  <p className="max-w-xs text-gray-600 leading-relaxed">
                    Reach out through our platform or LinkedIn. Share your professional goals with
                    the BEC team.
                  </p>
                </div>
              </StaggerItem>

              {/* Step 2 */}
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-[140px] h-[140px] bg-white rounded-full shadow-bec-soft flex items-center justify-center mb-8 border border-gray-100 relative group transition-all hover:scale-105 hover:shadow-bec-soft-hover hover:border-bec-emerald/30">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-white text-bec-emerald rounded-full flex items-center justify-center font-bold border border-gray-100 shadow-sm text-lg z-10 group-hover:bg-bec-emerald group-hover:text-white transition-colors duration-300">
                      02
                    </div>
                    <Search size={56} className="text-bec-emerald opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="bec-card-title mb-4 text-2xl">Assess</h3>
                  <p className="max-w-xs text-gray-600 leading-relaxed">
                    Our experts review your profile and match you with the right talent placement or
                    training program.
                  </p>
                </div>
              </StaggerItem>

              {/* Step 3 */}
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-[140px] h-[140px] bg-white rounded-full shadow-bec-soft flex items-center justify-center mb-8 border border-gray-100 relative group transition-all hover:scale-105 hover:shadow-bec-soft-hover hover:border-bec-emerald/30">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-white text-bec-emerald rounded-full flex items-center justify-center font-bold border border-gray-100 shadow-sm text-lg z-10 group-hover:bg-bec-emerald group-hover:text-white transition-colors duration-300">
                      03
                    </div>
                    <Globe2 size={56} className="text-bec-emerald opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="bec-card-title mb-4 text-2xl">Grow</h3>
                  <p className="max-w-xs text-gray-600 leading-relaxed">
                    Get placed, trained, or consulted. We stay with you through your entire growth
                    journey.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Services Horizontal Scroll */}
      <ServicesHorizontalScroll />

      {/* SECTION 5 — Upcoming Events Preview */}
      {eventsData && eventsData.length > 0 && (
        <section className="bec-section">
          <div className="bec-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <Reveal>
                <span className="bec-subtitle-chip mb-4">Training & Workshops</span>
                <h2 className="!mb-0">Upcoming Events</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <Link to="/events" className="bec-button bec-primary">
                  View All Events
                </Link>
              </Reveal>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventsData.map((event) => (
                <StaggerItem key={event.id}>
                  <div
                    key={event.id}
                    className="flex flex-col sm:flex-row bg-white rounded-[24px] overflow-hidden shadow-bec-soft border border-gray-100/60 hover:shadow-bec-soft-hover hover:border-bec-emerald/20 transition-all duration-500 group"
                  >
                    
                    {/* Hover Gradient Border effect (glow behind the card) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#08735d]/20 to-[#c09643]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[20px] -z-10" />
                    
                    {/* Left: Date Block */}
                    <div className="sm:w-[130px] bg-gradient-to-b from-gray-50 to-white border-b sm:border-b-0 sm:border-r border-gray-100 flex flex-row sm:flex-col items-center justify-center p-4 sm:p-6 shrink-0 group-hover:bg-[#08735d] transition-colors duration-500">
                      <span className="text-sm font-extrabold uppercase tracking-widest text-bec-emerald group-hover:text-white/80 transition-colors duration-500">
                        {new Date(event.date).toLocaleDateString("en-GB", { month: "short" })}
                      </span>
                      <span className="text-3xl sm:text-5xl font-black text-bec-navy leading-none mt-1 sm:mt-2 group-hover:text-white transition-colors duration-500">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center bg-white z-10">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bec-gold/10 text-bec-gold text-xs font-bold uppercase tracking-wider">
                          <MapPin size={12} strokeWidth={2.5} />
                          {event.venue}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                          <User size={12} strokeWidth={2.5} />
                          {event.seats} Seats Left
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-bec-navy mb-6 leading-snug group-hover:text-bec-emerald transition-colors duration-300">
                        {event.title}
                      </h4>
                      
                      <div className="mt-auto pt-4 border-t border-gray-50">
                        <Link 
                          to="/events"
                          className="inline-flex items-center gap-2 text-bec-navy hover:text-bec-emerald text-sm font-bold uppercase tracking-widest transition-colors group/btn"
                        >
                          Reserve Seat
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* COMPACT TESTIMONIAL SLIDER */}
      <Testimonials />
    </PageTransition>
  );
}
