import { useState, useEffect } from 'react';
import { Target, TrendingUp, Users, Lightbulb, UserCog, Link2 as LinkedinIcon } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import { ErrorState, SkeletonCards } from '@/components/ui/states';
import { publicApi, type TeamMember } from '@/lib/publicApi';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/layout/Animations';
import { motion } from 'framer-motion';


const objectives = [
  {
    icon: TrendingUp,
    title: 'Career Empowerment',
    desc: 'Equipping professionals with the skills and opportunities they need to excel in their careers.',
  },
  {
    icon: Target,
    title: 'Professional Branding',
    desc: 'Helping individuals and companies define, enhance, and leverage their brand presence in the market.',
  },
  {
    icon: Lightbulb,
    title: 'Corporate Solutions',
    desc: 'Providing expert consulting in sales, marketing, and HR to drive business growth and operational excellence.',
  },
  {
    icon: Users,
    title: 'Community Building',
    desc: 'Fostering a strong network of leaders, innovators, and young professionals for collaborative success.',
  },
];

const milestones = [
  { year: 'Vision', title: 'Founded with a mission to bridge talent and industry' },
  { year: '10K+', title: 'Professionals onboarded and connected' },
  { year: '500+', title: 'Partner organizations across Bangladesh' },
  { year: '150+', title: 'Workshops and training sessions delivered' },
];

export default function About() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const data = await publicApi.team.getAll();
        setTeam(data.team || []);
      } catch (err) {
        console.error('Failed to load team', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  return (
    <PageTransition className="bec-about">
      {/* Hero Section */}
      <section className="bec-section relative overflow-hidden bg-[#fbfcfb]">
        <div className="bec-orb" style={{ top: '-100px', left: '-50px', opacity: 0.6 }} />
        <div className="bec-dot-pattern" style={{ top: '40px', right: '40px' }} />
        
        <div className="bec-container">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <Reveal direction="right">
                <div className="bec-gold-line" />
                <h1 className="text-[40px] md:text-[56px] font-[800] text-[#14202d] leading-[1.1] mb-6">
                  Who <span className="text-[#08735d]">We Are</span>
                </h1>
                <p className="text-[18px] text-[#08735d] font-semibold mb-6">
                  Promoting Brands. Empowering Careers.
                </p>
                <p className="text-[15px] text-[#6b7280] leading-[1.75]">
                  Our vision is to build a professional ecosystem where growth is accessible to all, bridging the gap between exceptional talent and industry-leading organizations.
                </p>
              </Reveal>
            </div>

            <div className="w-full md:w-1/2 relative">
              <Reveal direction="left">
                <div className="relative rounded-[24px] overflow-hidden shadow-2xl">
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                    alt="Professional team collaboration"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-[#08735d]/10" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>


      {/* Mission & Vision */}
      <section className="bec-section bg-white relative overflow-hidden">
        <div className="bec-container px-4">
          <div className="grid md:grid-cols-2 gap-0 relative">
            <Reveal direction="left" delay={0.2} className="relative z-10 md:-mr-8 md:mt-12">
              <div className="bg-[#08735d] p-10 md:p-14 rounded-[24px] text-white shadow-2xl">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                  <TrendingUp size={32} />
                </div>
                <h2 className="text-[32px] font-[800] mb-6 text-white">Our Mission</h2>
                <p className="text-white/80 leading-[1.75] text-[15px]">
                  To empower professionals across Bangladesh through specialized skill development, strategic branding, and industry-wide collaboration.
                </p>
              </div>
            </Reveal>
            
            <Reveal direction="right" delay={0.4} className="relative z-0 md:-mt-4">
              <div className="bg-white p-10 md:p-14 rounded-[24px] text-[#14202d] shadow-2xl border border-gray-100">
                <div className="absolute top-0 right-0 p-8">
                  <div className="w-20 h-20 bg-[#c09643]/10 rounded-full flex items-center justify-center text-[#c09643]">
                    <Target size={40} />
                  </div>
                </div>
                <h2 className="text-[32px] font-[800] mb-6 pt-8 text-[#14202d]">Our Vision</h2>
                <p className="text-[#6b7280] leading-[1.75] text-[15px]">
                  To become the foremost professional hub in South Asia, recognized for producing elite leaders and fostering sustainable corporate innovation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* Objectives Section */}
      <section className="bec-section bg-[#fbfcfb]">
        <div className="bec-container px-4">
          <div className="text-center mb-16">
            <span className="bec-subtitle-chip mb-4">Core Objectives</span>
            <h2 className="text-[32px] md:text-[40px] font-[800] text-[#14202d] leading-[1.2]">Driving Professional Excellence</h2>
          </div>
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {objectives.map((obj, i) => {
                const Icon = obj.icon;
                return (
                  <StaggerItem key={i}>
                    <div className="group relative p-8 bg-white rounded-[24px] shadow-lg border border-transparent transition-all duration-300 hover:border-[#08735d]/20 hover:-translate-y-2">
                      <div className="w-14 h-14 bg-[#edf6f2] text-[#08735d] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon size={28} />
                      </div>
                      <h3 className="text-[18px] font-[700] text-[#14202d] mb-3">{obj.title}</h3>
                      <p className="text-[15px] text-[#6b7280] leading-[1.75]">{obj.desc}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>


      {/* Timeline Section */}
      <section className="bec-section relative overflow-hidden bg-white">
        <div className="bec-orb" style={{ bottom: '-100px', right: '-100px', opacity: 0.4 }} />
        <div className="bec-container px-4">
          <div className="text-center mb-20">
            <span className="bec-subtitle-chip mb-4">Our History</span>
            <h2 className="text-[32px] md:text-[40px] font-[800] text-[#14202d] leading-[1.2]">Journey of Excellence</h2>
          </div>

          
          <div className="relative max-w-4xl mx-auto">
            {/* The animated line */}
            <motion.div 
              className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#08735d] via-[#c09643] to-[#08735d] origin-top md:-translate-x-1/2"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            <div className="space-y-24">
              {milestones.map((m, i) => (
                <Reveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.2}>
                  <div className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Circle marker */}
                    <div className="absolute left-[20px] md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#c09643] z-10 md:-translate-x-1/2 flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-[#c09643]" />
                    </div>

                    <div className="w-full md:w-1/2 pt-2 md:pt-0 pl-16 md:pl-0">
                      <div className={`p-8 bg-white rounded-2xl shadow-xl border border-gray-50 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="text-[36px] font-[800] text-[#08735d] mb-2 tracking-tight">
                          {m.year}

                        </div>
                        <p className="text-gray-600 font-medium text-lg">
                          {m.title}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block w-1/2" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bec-section bg-[#f9fafb] relative">
        <div className="bec-container px-4">
          <div className="text-center mb-16">
            <span className="bec-subtitle-chip mb-4">Leadership</span>
            <h2 className="text-[32px] md:text-[40px] font-[800] text-[#14202d] leading-[1.2]">Meet Our Leadership</h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-4">The visionary professionals driving Bangladesh's premier executive network.</p>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              <SkeletonCards count={4} lines={2} />
            ) : error ? (
              <ErrorState
                title="Team could not be loaded"
                message="We couldn't reach the server to load our team members."
                onRetry={() => window.location.reload()}
              />
            ) : team.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <UserCog size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-400 font-medium">Leadership team data will appear here shortly.</p>
              </div>
            ) : (
              <StaggerContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full col-span-full">
                  {team.map((member) => (
                    <StaggerItem key={member.id}>
                      <div className="group h-[400px] [perspective:1000px]">
                        <motion.div 
                          className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer"
                        >
                          {/* Front */}
                          <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100 flex flex-col">
                            <div className="h-2/3 w-full bg-[#edf6f2] overflow-hidden">
                              {member.photoUrl ? (
                                <img loading="lazy" src={member.photoUrl} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-5xl font-black text-[#08735d]/20">
                                  {member.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="h-1/3 p-6 flex flex-col items-center justify-center text-center">
                              <h3 className="text-[18px] font-[700] text-[#14202d] mb-1">{member.name}</h3>
                              <p className="text-[#08735d] text-[14px] font-[600]">{member.designation}</p>

                            </div>
                          </div>
                          
                          {/* Back */}
                          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl bg-[#08735d] p-8 flex flex-col items-center justify-center text-center text-white shadow-2xl">
                            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                            <div className="w-10 h-1 bg-[#c09643] mb-6" />
                            <p className="text-sm text-white/80 leading-relaxed mb-8">
                              Passionate leader dedicated to fostering a professional ecosystem in Bangladesh through innovation and strategic growth.
                            </p>
                            {member.linkedinUrl && (
                              <a 
                                href={member.linkedinUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c09643] transition-all duration-300 hover:scale-110"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <LinkedinIcon size={24} />
                              </a>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
