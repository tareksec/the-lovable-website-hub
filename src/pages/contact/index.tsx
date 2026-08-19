import { useState } from 'react';
import { Mail, MapPin, Link2 as LinkedinIcon, Phone, CheckCircle } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import { publicApi } from '@/lib/publicApi';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/layout/Animations';
import { FAQSection } from '@/components/shared/FAQSection';


export default function Contact() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await publicApi.contact.submit({ name, email, phone, subject, message });
      toast.success('Your message has been sent successfully!');
      setName(''); setEmail(''); setPhone(''); setSubject(''); setMessage('');
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "What is Bangladesh Executive Chamber?",
      a: "BEC is a professional ecosystem for corporate growth, career development, and professional networking."
    },
    {
      q: "Who can join BEC?",
      a: "Fresh graduates, working professionals, entrepreneurs, and corporates from various industries are welcome."
    },
    {
      q: "What services does BEC offer?",
      a: "We offer Talent Acquisition, Business Consulting, Training & Workshops, and Networking Platforms."
    },
    {
      q: "How do I register for events?",
      a: "Visit the Training & Events page and click Register on any upcoming event."
    },
    {
      q: "Is BEC only for Dhaka-based professionals?",
      a: "No. BEC operates Nationwide across Bangladesh, supporting professionals from all districts."
    }
  ];

  return (
    <PageTransition className="bec-contact-page">
      <section className="bec-section relative overflow-hidden bg-[#fbfcfb]">
        <div className="bec-orb" style={{ top: '-150px', right: '-100px', background: 'radial-gradient(circle, rgba(192, 150, 67, 0.05) 0%, transparent 70%)' }} />
        
        <div className="bec-container">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <Reveal direction="right">
                <div className="bec-gold-line" />
                <h1 className="text-[40px] md:text-[56px] font-[800] text-[#14202d] leading-[1.1] mb-6">
                  Get in <span className="text-[#08735d]">Touch</span>
                </h1>
                <p className="text-[18px] text-[#6b7280] leading-[1.6]">
                  Have questions about our services or memberships? We're here to help.
                </p>
              </Reveal>
            </div>
            <div className="w-full md:w-1/2 relative">
              <Reveal direction="left">
                <div className="relative rounded-[24px] overflow-hidden shadow-2xl">
                  <img loading="lazy" 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                    alt="Clean minimal office environment"
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
          <div className="bec-contact-layout">
            
            {/* Info Column */}
            <div className="bec-contact-info-col">
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              
              <motion.div className="bec-info-card group cursor-pointer" whileHover={{ y: -5 }}>
                <motion.div className="info-icon" whileHover={{ scale: 1.2, rotate: 5 }}><MapPin /></motion.div>
                <div>
                  <h4 className="group-hover:text-[#08735d] transition-colors">Location</h4>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </motion.div>
              
              <motion.div className="bec-info-card group cursor-pointer" whileHover={{ y: -5 }}>
                <motion.div className="info-icon" whileHover={{ scale: 1.2, rotate: -5 }}><Mail /></motion.div>
                <div>
                  <h4 className="group-hover:text-[#08735d] transition-colors">Email Us</h4>
                  <p>info@b-e-c.org</p>
                </div>
              </motion.div>
 
              <motion.div className="bec-info-card group cursor-pointer" whileHover={{ y: -5 }}>
                <motion.div className="info-icon" whileHover={{ scale: 1.2, rotate: 5 }}><LinkedinIcon /></motion.div>
                <div>
                  <h4 className="group-hover:text-[#08735d] transition-colors">LinkedIn</h4>
                  <a href="https://www.linkedin.com/company/bangladesh-executive-chamber/" target="_blank" rel="noopener noreferrer" className="text-green-700 font-semibold hover:underline flex items-center gap-1 group/link">
                    bangladesh-executive-chamber
                    <motion.span initial={{ x: -5, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }} className="inline-block">
                      <LinkedinIcon size={12} />
                    </motion.span>
                  </a>
                </div>
              </motion.div>


            </div>

            {/* Form Column */}
            <motion.div 
              className="bec-contact-form-col"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="bec-form-card p-10 shadow-xl border-none hover:shadow-2xl transition-shadow duration-500">

                <h3 className="text-2xl mb-2">Send us a Message</h3>
                <p className="text-gray-500 mb-8">Fill out the form below and our team will get back to you.</p>
                
                <form onSubmit={handleSubmit} className="bec-form space-y-6">
                  <div className="bec-floating-label-group">
                    <input type="text" required placeholder=" " value={name} onChange={e => setName(e.target.value)} className="bec-input bec-floating-input" />
                    <label className="bec-floating-label">Full Name <span className="bec-required-asterisk">*</span></label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bec-floating-label-group">
                      <input type="email" required placeholder=" " value={email} onChange={e => setEmail(e.target.value)} className="bec-input bec-floating-input" />
                      <label className="bec-floating-label">Email Address <span className="bec-required-asterisk">*</span></label>
                    </div>
                    <div className="bec-floating-label-group">
                      <input type="tel" placeholder=" " value={phone} onChange={e => setPhone(e.target.value)} className="bec-input bec-floating-input" />
                      <label className="bec-floating-label">Phone Number</label>
                    </div>
                  </div>

                  <div className="bec-floating-label-group">
                    <input type="text" required placeholder=" " value={subject} onChange={e => setSubject(e.target.value)} className="bec-input bec-floating-input" />
                    <label className="bec-floating-label">Subject <span className="bec-required-asterisk">*</span></label>
                  </div>
                  
                  <div className="bec-floating-label-group">
                    <textarea required placeholder=" " rows={5} value={message} onChange={e => setMessage(e.target.value)} className="bec-input bec-floating-input min-h-[120px]" />
                    <label className="bec-floating-label">Message <span className="bec-required-asterisk">*</span></label>
                  </div>
                  
                  <button type="submit" disabled={submitting} className="bec-primary bec-btn-hover w-full justify-center mt-4 h-12 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      {submitting ? (
                        <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </motion.span>
                      ) : (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                          Send Message
                          <CheckCircle size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.span>
                      )}

                    </AnimatePresence>
                  </button>

                </form>
              </div>
            </motion.div>


          </div>
        </div>
      </section>

      {/* ENHANCED FAQ SECTION */}
      <FAQSection />
    </PageTransition>
  );
}
