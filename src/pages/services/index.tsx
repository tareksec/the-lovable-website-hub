import { Users, BriefcaseBusiness, GraduationCap, Network, ArrowRight, Check } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import PageTransition from '@/components/layout/PageTransition';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/layout/Animations';
import { motion } from 'framer-motion';

const services = [
  {
    id: 'talent',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800',
    title: 'Talent Acquisition & HR',
    desc: 'Connecting skilled professionals with reputable organizations. Building high-performing teams through strategic evaluation and cultural alignment.',
    features: [
      'CV screening and evaluation',
      'Strategic job matching',
      'Comprehensive HR consulting',
      'Candidate shortlisting',
      'Interview coordination',
    ],
  },
  {
    id: 'consulting',
    icon: BriefcaseBusiness,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    title: 'Business Consulting',
    desc: 'Strategic guidance for business development, sales, and corporate marketing. We help you scale with proven methodologies.',
    features: [
      'Sales strategy development',
      'Marketing operations optimization',
      'Brand positioning & identity',
      'In-depth market research',
      'Corporate growth planning',
    ],
  },
  {
    id: 'training',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    title: 'Training & Workshops',
    desc: 'Sessions on soft skills, leadership, and technical career readiness. Empowering the next generation of leaders.',
    features: [
      'Effective communication skills',
      'Leadership & management training',
      'Professional CV building',
      'Interview preparation & tactics',
      'Personalized career coaching',
    ],
  },
  {
    id: 'networking',
    icon: Network,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
    title: 'Networking Platforms',
    desc: 'Facilitating meaningful connections through digital media and exclusive events that drive collaboration.',
    features: [
      'Professional visibility enhancement',
      'LinkedIn profile growth',
      'Exclusive industry events',
      'Peer-to-peer collaboration',
      'Direct mentor access',
    ],
  },
];


export default function Services() {
  return (
    <PageTransition className="bec-services-page">
      {/* Hero Section */}
      <section className="bec-section relative overflow-hidden bg-[#fbfcfb]">
        <div className="bec-orb" style={{ bottom: '-200px', right: '-100px', background: 'radial-gradient(circle, rgba(192, 150, 67, 0.1) 0%, transparent 70%)' }} />
        <div className="bec-dot-pattern" style={{ bottom: '40px', left: '40px' }} />
        
        <div className="bec-container">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <Reveal direction="right">
                <div className="bec-gold-line" />
                <h1 className="text-[40px] md:text-[56px] font-[800] text-[#14202d] leading-[1.1] mb-6">
                  What <span className="text-[#08735d]">We Do</span>
                </h1>
                <p className="text-[18px] text-[#6b7280] leading-[1.6]">
                  Comprehensive solutions for individuals and organizations aiming for excellence.
                </p>
              </Reveal>
            </div>
            <div className="w-full md:w-1/2 relative">
              <Reveal direction="left">
                <div className="relative rounded-[24px] overflow-hidden shadow-2xl">
                  <img loading="lazy" 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
                    alt="Strategic business consulting and teamwork"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#08735d]/20 to-transparent" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bec-section bg-white">
        <div className="bec-container">
          <div className="flex flex-col gap-32">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div key={svc.id} className="relative">
                  <Reveal y={40} delay={i * 0.1}>
                    <div 
                      className={`flex flex-col md:flex-row items-center gap-16 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                      id={svc.id}
                    >
                      {/* Image Part */}
                      <div className="w-full md:w-1/2">
                        <motion.div 
                          className="relative rounded-[24px] overflow-hidden shadow-2xl aspect-[4/3]"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img loading="lazy" 
                            src={svc.image} 
                            alt={svc.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#08735d]/40 to-transparent" />
                        </motion.div>
                      </div>

                      {/* Content Part */}
                      <div className="w-full md:w-1/2">
                        <div className="w-16 h-16 bg-[#edf6f2] rounded-2xl flex items-center justify-center mb-8">
                          <Icon size={32} className="text-[#08735d]" />
                        </div>
                        
                        <h2 className="text-[32px] md:text-[40px] font-[800] text-[#14202d] leading-[1.2] mb-6">{svc.title}</h2>
                        <p className="text-[15px] text-[#6b7280] leading-[1.75] mb-8">{svc.desc}</p>
                        
                        <ul className="space-y-4 mb-10">
                          {svc.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-4 text-[15px] text-[#6b7280]">
                              <div className="w-5 h-5 rounded-full bg-[#edf6f2] flex items-center justify-center shrink-0 mt-1">
                                <Check size={12} className="text-[#08735d]" />
                              </div>
                              {feature}
                            </li>
                          ))}

                        </ul>
                        
                        <Link to="/contact" className="bec-primary">
                          Discuss with an Expert
                        </Link>

                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

