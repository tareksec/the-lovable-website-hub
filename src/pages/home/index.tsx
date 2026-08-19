import { useState, useEffect, useRef } from 'react';
import { ArrowRight, BarChart3, BriefcaseBusiness, Building2, Globe2, Handshake, Landmark, UsersRound, Link2 as LinkedinIcon, Award, Heart, Map, Search, Calendar, MapPin, User, ChevronRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import PageTransition from '@/components/layout/PageTransition';
import { motion, useInView } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/layout/Animations';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/publicApi';
import { TestimonialSlider } from '@/components/shared/TestimonialSlider';
import Testimonials from '@/components/ui/testimonials-13';
import PricingSection5 from '@/components/ui/pricing';
import { FAQSection } from '@/components/shared/FAQSection';
import { BlogInsights } from '@/components/shared/BlogInsights';

const services = [
  { icon: UsersRound, title: 'TALENT SOLUTIONS', body: 'Connecting the right talent with the right opportunities.' },
  { icon: BriefcaseBusiness, title: 'BUSINESS CONSULTING', body: 'Strategic solutions for sales, marketing & business growth.' },
  { icon: BarChart3, title: 'TRAINING & DEVELOPMENT', body: 'Upskill, lead, and grow with industry-relevant programs.' },
  { icon: Handshake, title: 'NETWORKING & COMMUNITY', body: 'Bridging professionals and organizations for impact.' },
];

const metrics = [
  { icon: UsersRound, value: '10,000+', label: 'Professionals', sub: 'Connected' },
  { icon: Building2, value: '500+', label: 'Partner', sub: 'Organizations' },
  { icon: BriefcaseBusiness, value: '2,000+', label: 'Career Opportunities', sub: 'Shared' },
  { icon: Landmark, value: '150+', label: 'Training & Workshops', sub: 'Conducted' },
  { icon: Globe2, value: 'Nationwide', label: 'Impact Across', sub: 'Industries' },
];

const chooseData = [
  { icon: Award, number: '10+', label: 'Years of Industry Expertise', desc: 'A decade of delivering excellence in consultancy.' },
  { icon: Heart, number: '95%', label: 'Client Satisfaction Rate', desc: 'Our commitment to quality drives lasting partnerships.' },
  { icon: Map, number: '64', label: 'Districts Reached', desc: 'Nationwide reach across Bangladesh, impacting lives.' },
];

const processSteps = [
  { step: 1, title: 'Apply or Connect', desc: 'Start your journey by reaching out or applying.' },
  { step: 2, title: 'Get Assessed', desc: 'Our experts analyze your profile or brand needs.' },
  { step: 3, title: 'Get Matched', desc: 'We align you with the perfect opportunities.' },
  { step: 4, title: 'Grow Together', desc: 'Scale new heights with BEC ecosystem support.' },
];

const partnerLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png',
  'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
];

const AnimatedValue = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9,]/g, '');
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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

  return <span ref={ref}>{current.toLocaleString()}{suffix}</span>;
};


export default function Home() {
  const titleWords = "Building People. Strengthening Brands. Shaping Bangladesh".split(" ");

  const marqueeText = "◆ Talent Acquisition ◆ Business Consulting ◆ Training & Workshops ◆ Professional Networking ◆ Career Growth ◆ Brand Strategy ◆ Nationwide Impact ◆ Empowering Careers";
  const marqueeItems = marqueeText.split(' ◆ ').filter(i => i.trim() !== '').map(i => i.replace('◆', '').trim());

  const { data: postsData } = useQuery({
    queryKey: ['latest-posts'],
    queryFn: async () => {
      const { posts } = await publicApi.posts.getAll();
      return posts.slice(0, 3);
    }
  });

  const { data: eventsData } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const { events } = await publicApi.events.getAll();
      const now = new Date();
      return events
        .filter(e => new Date(e.date) >= now)
        .slice(0, 2);
    }
  });

  return (
    <PageTransition>
      <section className="bec-hero" aria-labelledby="bec-heading">
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
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {word === "Shaping" || word === "Bangladesh" ? <em className="inline">{word}</em> : word}
                {i === 1 || i === 3 ? <br /> : null}
              </motion.span>
            ))}
          </h1>
          <Reveal delay={0.8}>
            <div className="bec-divider" aria-hidden="true" />
            <p className="bec-desc">Bangladesh Executive Chamber (BEC) is a professional ecosystem that empowers careers, strengthens brands, and drives corporate growth through consulting, talent solutions, training, and meaningful connections.</p>
          </Reveal>
          <div className="bec-actions">
            <Reveal delay={1} width="auto">
              <Link to="/services" className="bec-primary" data-testid="link-explore-services">Explore Our Services</Link>
            </Reveal>
            <Reveal delay={1.1} width="auto">
              <Link to="/join" className="bec-secondary bec-btn-hover" data-testid="link-join-network">Join Our Network <UsersRound aria-hidden="true" /></Link>
            </Reveal>
          </div>
        </div>
        <motion.div 
          className="bec-art"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img loading="lazy" src="/images/bec-reference.png" alt="BEC business community illustration" width="1024" height="683" />
        </motion.div>
        <aside className="bec-services" aria-label="BEC services">
          <StaggerContainer delay={0.2}>
            {services.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <motion.div 
                  className="bec-service" 
                  data-testid={`service-${title.toLowerCase().replaceAll(' ', '-')}`}
                  whileHover={{ x: 5 }}
                >
                  <div className="bec-service-icon"><Icon aria-hidden="true" /></div>
                  <div className="bec-service-copy"><h2>{title}</h2><p>{body}</p></div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </aside>
      </section>

      {/* SECTION 1: MARQUEE STRIP */}
      <div className="bec-marquee-strip">
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
      <section className="py-[40px] bg-white border-y border-gray-100" aria-label="BEC impact metrics">
        <div className="bec-container px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {metrics.map(({ icon: Icon, value, label, sub }) => (
              <Reveal key={value} y={30}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-[#08735d]/10 rounded-full flex items-center justify-center mb-4 text-[#08735d]">
                    <Icon size={24} strokeWidth={2.5} />
                  </div>
                  <div className="text-[36px] font-[800] text-[#08735d] leading-none mb-2">
                    <AnimatedValue value={value} />
                  </div>
                  <div className="text-[14px] font-medium text-gray-500 leading-tight">
                    {label}<br />{sub}
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
      <section className="bg-[#fbfcfb]">
        <PricingSection5 />
      </section>

      {/* SECTION 4 — Our Community Partners */}
      <section className="bec-section bg-white overflow-hidden">
        <div className="bec-container">
          <Reveal className="text-center mb-16">
            <span className="bec-subtitle-chip mb-4">Our Network</span>
            <h2>Trusted by Leading Organizations</h2>
          </Reveal>
          <div className="bec-logo-strip">
            <div className="bec-logo-strip-content">
              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <img key={i} src={logo} alt="Partner Logo" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — HOW BEC WORKS */}
      <section className="bec-section relative overflow-hidden bg-[#fbfcfb]">
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
                  <div className="w-[120px] h-[120px] bg-white rounded-full shadow-xl flex items-center justify-center mb-8 border border-gray-100 relative group transition-all hover:scale-105">
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#08735d] text-white rounded-full flex items-center justify-center font-bold">01</div>
                    <UsersRound size={48} className="text-[#08735d]" />
                  </div>
                  <h3 className="bec-card-title mb-4">Connect</h3>
                  <p className="max-w-xs">Reach out through our platform or LinkedIn. Share your professional goals with the BEC team.</p>
                </div>
              </StaggerItem>

              {/* Step 2 */}
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-[120px] h-[120px] bg-white rounded-full shadow-xl flex items-center justify-center mb-8 border border-gray-100 relative group transition-all hover:scale-105">
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#08735d] text-white rounded-full flex items-center justify-center font-bold">02</div>
                    <Search size={48} className="text-[#08735d]" />
                  </div>
                  <h3 className="bec-card-title mb-4">Assess</h3>
                  <p className="max-w-xs">Our experts review your profile and match you with the right talent placement or training program.</p>
                </div>
              </StaggerItem>

              {/* Step 3 */}
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-[120px] h-[120px] bg-white rounded-full shadow-xl flex items-center justify-center mb-8 border border-gray-100 relative group transition-all hover:scale-105">
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#08735d] text-white rounded-full flex items-center justify-center font-bold">03</div>
                    <Globe2 size={48} className="text-[#08735d]" />
                  </div>
                  <h3 className="bec-card-title mb-4">Grow</h3>
                  <p className="max-w-xs">Get placed, trained, or consulted. We stay with you through your entire growth journey.</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>


      {/* SECTION 3 — Latest from BEC */}
      <section className="bec-section bg-gray-50/50">
        <div className="bec-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <Reveal>
              <span className="bec-subtitle-chip mb-4">Latest Insights</span>
              <h2 className="!mb-0">Latest Insights & Updates</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <Link to="/resources" className="bec-primary">
                View All Articles
              </Link>

            </Reveal>
          </div>
          <BlogInsights />
        </div>
      </section>



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
                <Link to="/events" className="bec-primary">
                  View All Events
                </Link>


              </Reveal>
            </div>


            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventsData.map((event) => (
                <StaggerItem key={event.id}>
                  <div className="flex bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all p-6 group">
                    <div className="w-20 h-24 bg-[#08735d]/5 rounded-xl flex flex-col items-center justify-center text-[#08735d] border border-[#08735d]/10 mr-6 group-hover:bg-[#08735d] group-hover:text-white transition-colors">
                      <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}</span>
                      <span className="text-2xl font-extrabold">{new Date(event.date).getDate()}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-[#14202d] mb-2">{event.title}</h4>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><MapPin size={14} className="text-[#c09643]" /> {event.venue}</span>
                        <span className="flex items-center gap-1"><User size={14} className="text-[#c09643]" /> {event.seats} Seats Left</span>
                      </div>
                      <Link to="/events" className="text-[#08735d] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        RSVP NOW
                      </Link>

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
