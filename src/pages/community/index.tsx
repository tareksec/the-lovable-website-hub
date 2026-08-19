import { useState, useEffect, useRef } from 'react';
import { Building2, Landmark, UsersRound, BriefcaseBusiness, Globe2, Quote, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import PageTransition from '@/components/layout/PageTransition';
import { ErrorState, SkeletonCards } from '@/components/ui/states';
import { publicApi, type CommunityStats, type Member } from '@/lib/publicApi';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/layout/Animations';
import { motion, useInView } from 'framer-motion';

const CircularProgress = ({ value, label, icon: Icon }: { value: string; label: string; icon: any }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9,]/g, '');
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || numericValue <= 0) return;
    let frame = 0;
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const timer = setInterval(() => {
      frame++;
      setCurrent(Math.round(numericValue * (frame / totalFrames)));
      if (frame === totalFrames) clearInterval(timer);
    }, frameDuration);
    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(current, numericValue) / numericValue) * circumference || circumference;

  return (
    <div className="flex flex-col items-center gap-4" ref={ref}>
      <div className="relative w-24 h-24">
        <svg className="bec-progress-ring w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-100 stroke-current"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          <motion.circle
            className="text-[#08735d] stroke-current bec-progress-ring-circle"
            strokeWidth="8"
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: isInView ? strokeDashoffset : circumference
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[#08735d]">
          <Icon size={24} />
        </div>
      </div>
      <div className="text-center">
        <div className="text-[28px] font-[800] text-[#14202d]">{current.toLocaleString()}{suffix}</div>
        <div className="text-[12px] font-[600] text-[#6b7280] uppercase tracking-[0.08em]">{label}</div>

      </div>
    </div>
  );
};



const focusAreas = [
  'Real Estate',
  'FMCG',
  'Digital Marketing',
  'Corporate HR',
  'Business Development',
];

const fallbackStats = [
  { value: '10,000+', label: 'Professionals' },
  { value: '500+', label: 'Partner Organizations' },
  { value: '2,000+', label: 'Career Opportunities' },
  { value: '150+', label: 'Training & Workshops' },
  { value: 'Nationwide', label: 'Impact' },
];

export default function Community() {
  const [stats, setStats] = useState<CommunityStats[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, membersData] = await Promise.all([
          publicApi.community.getStats(),
          publicApi.community.getMembers(),
        ]);
        setStats(statsData.stats);
        setMembers(membersData.members);
      } catch (err) {
        console.error('Failed to load community data', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const displayStats = stats.length > 0 ? stats : fallbackStats;

  return (
    <PageTransition className="bec-community-page">
      {/* Hero Section */}
      <section className="bec-section relative overflow-hidden bg-[#fbfcfb]">
        <div className="bec-orb" style={{ top: '-100px', right: '-100px' }} />
        <div className="bec-dot-pattern" style={{ top: '80px', left: '20px' }} />
        
        <div className="bec-container">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <Reveal direction="right">
                <div className="bec-gold-line" />
                <h1 className="text-[40px] md:text-[56px] font-[800] text-[#14202d] leading-[1.1] mb-6">
                  Join a Thriving <span className="text-[#08735d]">Professional Community</span>
                </h1>
                <p className="text-[18px] text-[#6b7280] leading-[1.6]">
                  Connect, collaborate, and grow with thousands of ambitious professionals across Bangladesh.
                </p>
              </Reveal>
            </div>
            <div className="w-full md:w-1/2 relative">
              <Reveal direction="left">
                <div className="relative rounded-[24px] overflow-hidden shadow-2xl">
                  <img loading="lazy" 
                    src="https://images.unsplash.com/photo-1529070532971-f21ebc62f5d4?auto=format&fit=crop&q=80&w=1200" 
                    alt="Professionals networking and collaborating"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-[#08735d]/20" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Bar - Fixed to updated version */}
      <section className="py-[40px] bg-white border-y border-gray-100" aria-label="BEC impact metrics">
        <div className="bec-container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {displayStats.map((stat, i) => (
              <Reveal key={i} y={20} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-[#08735d]/10 rounded-full flex items-center justify-center mb-4 text-[#08735d]">
                    {i === 0 ? <UsersRound size={24} /> : i === 1 ? <Building2 size={24} /> : i === 2 ? <BriefcaseBusiness size={24} /> : i === 3 ? <Landmark size={24} /> : <Globe2 size={24} />}
                  </div>
                  <div className="text-[36px] font-[800] text-[#08735d] leading-none mb-2">{stat.value}</div>
                  <div className="text-[13px] font-[600] text-[#08735d] uppercase tracking-[0.08em]">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* Member Spotlight */}
      <section className="bec-section overflow-hidden bg-white">
        <div className="bec-container">
          <div className="text-center mb-16">
            <span className="bec-subtitle-chip mb-4">Our Members</span>
            <h2 className="text-[32px] md:text-[40px] font-[800] text-[#14202d] leading-[1.2]">Member Spotlight</h2>
          </div>

          
          <div className="overflow-x-auto pb-12 scrollbar-hide px-4">
            <motion.div 
              className="flex gap-8 min-w-max bec-momentum-scroll"
              drag="x"
              dragConstraints={{ left: -1000, right: 0 }}
              dragElastic={0.2}
              whileTap={{ cursor: "grabbing" }}
            >
              {loading ? (
                <SkeletonCards count={4} lines={2} />
              ) : error ? (
                <ErrorState
                  title="Community data unavailable"
                  message="We couldn't load member spotlights right now."
                  onRetry={() => window.location.reload()}
                />
              ) : members.length === 0 ? (
                <div className="py-12 text-center text-gray-500 w-full">
                  Our community is growing. Become the first spotlight member!
                </div>
              ) : (
                members.map((member) => (
                  <motion.div 
                    key={member.id} 
                    className="w-[300px] shrink-0 p-8 bg-white rounded-3xl shadow-xl border border-gray-100 bec-card-hover relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <div className="absolute top-6 right-6">
                      <div className={`bec-tier-badge tier-${member.tier}`}>
                        {member.tier}
                      </div>
                    </div>
                    
                    <div className="bec-member-avatar w-20 h-20 text-3xl mb-6 ml-0">
                      {member.fullName.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-[#14202d] mb-1">{member.fullName}</h3>
                      {member.designation && <p className="text-sm text-[#5d6870] font-medium mb-1">{member.designation}</p>}
                      {member.company && <p className="text-xs text-[#08735d] font-bold uppercase tracking-wider">{member.company}</p>}
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bec-section bg-[#fbfcfb] relative overflow-hidden">
        <div className="bec-orb" style={{ bottom: '-100px', left: '-100px', opacity: 0.3 }} />
        <div className="bec-container px-4">
          <div className="text-center mb-20">
            <span className="bec-subtitle-chip mb-4">Testimonials</span>
            <h2 className="text-[32px] md:text-[40px] font-[800] text-[#14202d] leading-[1.2]">Success Stories</h2>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                text: "BEC helped me land my dream role in the FMCG industry. The support and guidance were unparalleled.", 
                author: "Rahim Uddin", 
                meta: "Brand Manager, FMCG Corp",
                img: "https://i.pravatar.cc/150?u=rahim"
              },
              { 
                text: "The networking events opened doors I didn't know existed. I've met incredible mentors here.", 
                author: "Nusrat Jahan", 
                meta: "Marketing Lead, TechNova",
                img: "https://i.pravatar.cc/150?u=nusrat"
              },
              { 
                text: "Business consulting from BEC completely transformed our sales team's approach and results.", 
                author: "Arif Hossain", 
                meta: "Sales Director, Retail BD",
                img: "https://i.pravatar.cc/150?u=arif"
              }
            ].map((s, idx) => (
              <Reveal key={idx} y={40} delay={idx * 0.2}>
                <div className="relative p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow group">
                  <span className="bec-quote-large">"</span>
                  <p className="text-lg text-[#14202d] italic leading-relaxed mb-8 relative z-10">
                    {s.text}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#edf6f2]">
                      <img loading="lazy" src={s.img} alt={s.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#08735d]">{s.author}</h4>
                      <p className="text-xs text-[#5d6870]">{s.meta}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bec-section bg-white">
        <div className="bec-container text-center px-4">
          <span className="bec-subtitle-chip mb-4">Focus Areas</span>
          <h2 className="text-[32px] md:text-[40px] font-[800] text-[#14202d] leading-[1.2] mb-12">Community Focus Areas</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {focusAreas.map((area, i) => (
              <Reveal key={i} y={20} delay={i * 0.05}>
                <span className="inline-block px-8 py-4 bg-white border border-[#edf6f2] rounded-full text-[15px] font-[700] text-[#14202d] shadow-sm hover:border-[#08735d]/20 transition-all">
                  {area}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="bec-section px-4">
        <div className="bec-container">
          <div className="bg-[#14202d] p-12 md:p-20 rounded-[40px] text-center text-white shadow-2xl relative overflow-hidden">
            <div className="bec-orb" style={{ top: '-100px', right: '-100px', opacity: 0.1 }} />
            <Reveal y={20}>
              <h2 className="text-[32px] md:text-[40px] font-[800] mb-8 leading-tight text-white">
                Ready to Accelerate<br />Your Professional Journey?
              </h2>
              <p className="text-white/80 text-[15px] mb-12 max-w-2xl mx-auto">
                Gain access to exclusive events, strategic mentorship, and the most influential professional network in Bangladesh.
              </p>

              <Link to="/join" className="bec-primary">
                Become a Member
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
