import { useState } from 'react';
import { CheckCircle2, User, Mail, Phone, Building2, Briefcase, MessageSquare, Info, ShieldCheck, Zap, Globe, Rocket, Building, UsersRound, Star, ArrowRight } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import { publicApi } from '@/lib/publicApi';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/layout/Animations';
import { toast } from 'sonner';


type Tier = 'basic' | 'professional' | 'corporate';

export default function Join() {
  const [selectedTier, setSelectedTier] = useState<Tier>('basic');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [message, setMessage] = useState('');

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await publicApi.members.join({
        fullName,
        email,
        phone,
        company,
        designation,
        tier: selectedTier,
        message, // note: backend schema might drop message if not in DB, but it's safe to send
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      toast.error('Failed to submit application. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const tiers = [
    {
      id: 'basic' as Tier,
      name: 'Basic',
      subtitle: 'Community Member',
      price: 'Free',
      description: "Perfect for professionals exploring BEC's network and resources.",
      features: ['Job Alerts via LinkedIn', 'Community Feed Access', 'Monthly Newsletter', 'BEC Event Notifications', 'Access to Public Resources'],
      cta: 'Join Free',
      badge: 'FREE',
      icon: UsersRound
    },
    {
      id: 'professional' as Tier,
      name: 'Professional',
      subtitle: 'Career Growth',
      price: 'Premium',
      priceSub: 'Contact for pricing',
      description: "Ideal for ambitious professionals ready to accelerate their career with BEC support.",
      features: ['Everything in Basic', 'Featured Profile on Community Page', 'Priority Event Registration', '1-on-1 Career Consulting Session', 'CV Review & LinkedIn Optimization', 'Interview Preparation Support'],
      cta: 'Get Started',
      badge: 'MOST POPULAR',
      icon: Rocket,
      featured: true
    },
    {
      id: 'corporate' as Tier,
      name: 'Corporate',
      subtitle: 'Business Partner',
      price: 'Enterprise',
      priceSub: 'Custom pricing',
      description: "For organizations seeking talent, consulting, and brand visibility across Bangladesh.",
      features: ['Everything in Professional', 'Talent Acquisition Support', 'Business Consulting Access', 'Brand Visibility on BEC Platforms', 'Exclusive Corporate Events'],
      cta: 'Contact Us',
      badge: 'ENTERPRISE',
      icon: Building,
      dark: true
    }
  ];

  if (submitted) {
    return (
      <PageTransition className="bec-join-page py-32 text-center relative overflow-hidden bg-[#fbfcfb]">
        <div className="bec-orb" style={{ top: '-100px', right: '-100px', opacity: 0.1 }} />
        <div className="bec-dot-pattern" style={{ bottom: '40px', left: '40px' }} />
        <div className="bec-container max-w-2xl">

          <motion.div 
            className="w-24 h-24 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
          >
            <CheckCircle2 size={48} />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-[32px] md:text-[40px] font-[800] mb-4 text-[#14202d]">Welcome to BEC!</h1>
            <p className="text-[#6b7280] text-[15px] mb-8 leading-relaxed">
              We have received your application. Our team will review your details and get back to you shortly regarding your membership status.
            </p>
          </motion.div>

          <button onClick={() => window.location.href = '/'} className="bec-primary">
            Return to Home
          </button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="bec-join-page">
      <section className="bec-section relative overflow-hidden bg-[#fbfcfb]">
        <div className="bec-orb" style={{ top: '-100px', right: '-100px', opacity: 0.1 }} />
        <div className="bec-dot-pattern" style={{ bottom: '40px', left: '40px' }} />
        
        <div className="bec-container">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <Reveal direction="right">
                <div className="bec-gold-line" />
                <h1 className="text-[40px] md:text-[56px] font-[800] text-[#14202d] leading-[1.1] mb-6">
                  Invest In Your <span className="text-[#08735d]">Growth</span>
                </h1>
                <p className="text-[18px] text-[#6b7280] leading-[1.6]">
                  Choose the plan that fits your journey — whether you're starting out, growing 
                  your career, or scaling your business.
                </p>
              </Reveal>
            </div>
            <div className="w-full md:w-1/2 relative">
              <Reveal direction="left">
                <div className="relative rounded-[24px] overflow-hidden shadow-2xl">
                  <img loading="lazy" 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
                    alt="Growth and success"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-[#08735d]/10" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>



      <section className="bec-section bg-white">
        <div className="bec-container">
          
          {/* Progress Indicator */}
          <div className="flex justify-center mb-20">
            <div className="flex items-center gap-4">
              <div className={`flex flex-col items-center gap-2 ${!submitted ? 'text-[#08735d]' : 'text-[#5d6870]'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${!submitted ? 'bg-[#08735d] text-white' : 'bg-[#edf6f2] text-[#08735d]'}`}>
                  {!submitted ? '1' : <CheckCircle2 size={16} />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Step 1</span>
              </div>
              <div className={`w-20 h-0.5 transition-all ${selectedTier && !submitted ? 'bg-[#08735d]' : 'bg-[#edf6f2]'}`} />
              <div className={`flex flex-col items-center gap-2 ${selectedTier && !submitted ? 'text-[#08735d]' : 'text-[#5d6870]'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${selectedTier && !submitted ? 'bg-[#08735d] text-white' : 'bg-[#edf6f2]'}`}>2</div>
                <span className="text-[10px] font-black uppercase tracking-widest">Step 2</span>
              </div>
              <div className={`w-20 h-0.5 transition-all ${submitted ? 'bg-[#08735d]' : 'bg-[#edf6f2]'}`} />
              <div className={`flex flex-col items-center gap-2 ${submitted ? 'text-[#08735d]' : 'text-[#5d6870]'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${submitted ? 'bg-[#08735d] text-white' : 'bg-[#edf6f2]'}`}>3</div>
                <span className="text-[10px] font-black uppercase tracking-widest">Confirmed</span>
              </div>
            </div>
          </div>

          {/* Tiers */}

          <StaggerContainer>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32 items-stretch">
              {tiers.map((tier) => (
                <StaggerItem key={tier.id}>
                  <motion.div 
                    className={`h-full p-10 flex flex-col rounded-[24px] cursor-pointer transition-all relative overflow-hidden group ${
                      tier.featured 
                        ? 'bg-white border-2 border-[#08735d] shadow-[0_8px_32px_rgba(8,115,93,0.15)] lg:scale-[1.03] z-10' 
                        : tier.dark
                          ? 'bg-[#08735d] text-white shadow-xl'
                          : 'bg-white border border-[#e5e7eb] shadow-sm hover:shadow-md'
                    }`}
                    onClick={() => {
                      setSelectedTier(tier.id);
                      document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {tier.badge && (
                      <div className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-[800] uppercase tracking-[0.08em] shadow-sm ${
                        tier.featured ? 'bg-[#08735d] text-white' : tier.dark ? 'bg-[#c09643] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {tier.badge}
                      </div>
                    )}


                    <div className="mb-8 mt-4 flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                        tier.dark ? 'bg-white/10 text-white' : 'bg-[#08735d]/10 text-[#08735d]'
                      }`}>
                        <tier.icon size={32} className={tier.featured ? 'text-[#c09643]' : ''} />
                      </div>
                      <h3 className={`text-[24px] font-[800] ${tier.dark ? 'text-white' : 'text-[#14202d]'}`}>{tier.name}</h3>
                      <p className={`text-[13px] font-[600] uppercase tracking-[0.08em] ${tier.dark ? 'text-white/60' : 'text-[#08735d]'}`}>{tier.subtitle}</p>
                      
                      <div className="mt-6">
                        <span className={`text-[36px] font-[800] ${tier.dark ? 'text-white' : 'text-[#08735d]'}`}>{tier.price}</span>
                        {tier.priceSub && (
                          <p className={`text-[13px] mt-1 ${tier.dark ? 'text-white/50' : 'text-gray-400'}`}>{tier.priceSub}</p>
                        )}
                      </div>

                    </div>

                    <p className={`text-[15px] mb-8 text-center leading-relaxed ${tier.dark ? 'text-white/70' : 'text-[#6b7280]'}`}>
                      {tier.description}

                    </p>

                    <ul className="space-y-4 mb-10 flex-1">
                      {tier.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <CheckCircle2 size={18} className={tier.dark ? 'text-[#c09643]' : 'text-[#08735d]'} />
                          <span className={tier.dark ? 'text-white/90' : 'text-[#6b7280]'}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 rounded-xl font-bold transition-all border-2 text-[15px] min-h-[56px] flex items-center justify-center gap-2 ${
                      tier.featured
                        ? 'bg-[#08735d] text-white border-[#08735d] hover:bg-[#065f4e] hover:scale-[1.02] shadow-[0_4px_12px_rgba(8,115,93,0.2)]'
                        : tier.dark
                          ? 'bg-white text-[#08735d] border-white hover:bg-gray-50 hover:scale-[1.02]'
                          : 'bg-transparent text-[#08735d] border-[#08735d] hover:bg-[#08735d] hover:text-white hover:scale-[1.02]'
                    }`}>
                      {tier.cta} <ArrowRight size={18} />
                    </button>

                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Benefit Comparison */}
          <section className="mb-32">
            <h2 className="text-[32px] md:text-[40px] font-[800] text-center text-[#14202d] mb-16">Compare Benefits</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#edf6f2]">
                    <th className="py-6 text-left text-[#5d6870] font-bold text-sm uppercase tracking-widest">Benefit</th>
                    <th className="py-6 text-center text-[#14202d] font-black">Basic</th>
                    <th className="py-6 text-center text-[#08735d] font-black">Professional</th>
                    <th className="py-6 text-center text-[#c09643] font-black">Corporate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf6f2]">
                  {[
                    { name: 'Job Alerts', basic: true, pro: true, corp: true, icon: Zap },
                    { name: 'Community Access', basic: true, pro: true, corp: true, icon: Globe },
                    { name: 'Newsletter', basic: true, pro: true, corp: true, icon: Mail },
                    { name: 'Featured Profile', basic: false, pro: true, corp: true, icon: User },
                    { name: 'Priority Registration', basic: false, pro: true, corp: true, icon: Info },
                    { name: 'Career Consulting', basic: false, pro: true, corp: true, icon: ShieldCheck },
                    { name: 'Business Solutions', basic: false, pro: false, corp: true, icon: Briefcase },
                    { name: 'Brand Visibility', basic: false, pro: false, corp: true, icon: Zap },
                    { name: 'Exclusive Events', basic: false, pro: false, corp: true, icon: Star },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#f9fafb] transition-colors group/row">
                      <td className="py-5 flex items-center gap-3 text-[#14202d] font-bold">
                        <row.icon size={18} className="text-[#08735d] transition-transform group-hover/row:scale-110" />
                        {row.name}
                      </td>
                      <td className="py-5 text-center">
                        {row.basic ? (
                          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}>
                            <CheckCircle2 size={20} className="text-[#08735d] mx-auto" />
                          </motion.div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-[#edf6f2] rounded-full mx-auto" />
                        )}
                      </td>
                      <td className="py-5 text-center bg-[#edf6f2]/30">
                        {row.pro ? (
                          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}>
                            <CheckCircle2 size={20} className="text-[#08735d] mx-auto" />
                          </motion.div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-[#edf6f2] rounded-full mx-auto" />
                        )}
                      </td>
                      <td className="py-5 text-center">
                        {row.corp ? (
                          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}>
                            <CheckCircle2 size={20} className="text-[#08735d] mx-auto" />
                          </motion.div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-[#edf6f2] rounded-full mx-auto" />
                        )}

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>



          <AnimatePresence>
            {selectedTier && (
              <motion.div 
                id="join-form" 
                className="max-w-4xl mx-auto scroll-mt-24"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >

            <div className="bg-white p-12 md:p-20 rounded-[60px] shadow-2xl border border-[#edf6f2] relative overflow-hidden">
              <div className="bec-orb" style={{ top: '-100px', right: '-100px', opacity: 0.2 }} />
              
              <div className="text-center mb-16 relative z-10">
                <span className="bec-subtitle-chip mb-4">Application</span>
                <h3 className="text-[32px] md:text-[40px] font-[800] text-[#14202d] mt-4 mb-4">Join the Network</h3>
                <p className="text-[#6b7280] text-[15px] max-w-lg mx-auto leading-relaxed">
                  You are applying for the <span className="text-[#08735d] font-bold uppercase">{selectedTier}</span> Membership. Please fill in your details below.
                </p>

              </div>

              <form onSubmit={handleJoin} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bec-floating-label-group">
                    <input type="text" required placeholder=" " value={fullName} onChange={e => setFullName(e.target.value)} className="bec-input bec-floating-input" />
                    <label className="bec-floating-label flex items-center gap-2"><User size={14} /> Full Name <span className="bec-required-asterisk">*</span></label>
                  </div>
                  <div className="bec-floating-label-group">
                    <input type="email" required placeholder=" " value={email} onChange={e => setEmail(e.target.value)} className="bec-input bec-floating-input" />
                    <label className="bec-floating-label flex items-center gap-2"><Mail size={14} /> Email Address <span className="bec-required-asterisk">*</span></label>
                  </div>
                  <div className="bec-floating-label-group">
                    <input type="tel" placeholder=" " value={phone} onChange={e => setPhone(e.target.value)} className="bec-input bec-floating-input" />
                    <label className="bec-floating-label flex items-center gap-2"><Phone size={14} /> Phone Number</label>
                  </div>
                  <div className="bec-floating-label-group">
                    <input type="text" placeholder=" " value={company} onChange={e => setCompany(e.target.value)} className="bec-input bec-floating-input" />
                    <label className="bec-floating-label flex items-center gap-2"><Building2 size={14} /> Company</label>
                  </div>
                  <div className="bec-floating-label-group md:col-span-2">
                    <input type="text" placeholder=" " value={designation} onChange={e => setDesignation(e.target.value)} className="bec-input bec-floating-input" />
                    <label className="bec-floating-label flex items-center gap-2"><Briefcase size={14} /> Designation</label>
                  </div>
                  <div className="bec-floating-label-group md:col-span-2">
                    <textarea placeholder=" " rows={4} value={message} onChange={e => setMessage(e.target.value)} className="bec-input bec-floating-input min-h-[120px]" />
                    <label className="bec-floating-label flex items-center gap-2"><MessageSquare size={14} /> Why do you want to join? <span className="bec-required-asterisk">*</span></label>
                  </div>
                </div>
                
                <motion.button 
                  type="submit" 
                  disabled={submitting} 
                  className="bec-primary w-full"
                  whileHover={{ y: -2 }}
                >
                  {submitting ? 'Submitting...' : 'Submit Membership Application'}
                </motion.button>

              </form>
            </div>
              </motion.div>
            )}
          </AnimatePresence>



        </div>
      </section>
    </PageTransition>
  );
}
