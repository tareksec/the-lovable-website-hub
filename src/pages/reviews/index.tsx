import { useState, useEffect, useRef } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import { ErrorState, SkeletonCards } from '@/components/ui/states';
import { publicApi, type Review } from '@/lib/publicApi';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/layout/Animations';
import { TestimonialSlider } from '@/components/shared/TestimonialSlider';
import Testimonials from '@/components/ui/testimonials-13';

const AnimatedStars = ({ rating, interactive = false, onSelect }: { rating: number; interactive?: boolean; onSelect?: (r: number) => void }) => {
  return (
    <div className="flex gap-1 bec-star-rating">
      {[1, 2, 3, 4, 5].map((s) => (
        <motion.button
          key={s}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onSelect?.(s)}
          initial={interactive ? { scale: 1 } : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: interactive ? 0 : 0.1 * s, type: "spring", stiffness: 260, damping: 20 }}
          className={`${interactive ? 'star-btn' : ''} bec-star-animated`}
        >
          <Star 
            size={interactive ? 24 : 16} 
            className={s <= rating ? "fill-[#c09643] text-[#c09643]" : "text-gray-200"} 
          />
        </motion.button>
      ))}
    </div>
  );
};



export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<'All' | '5 Star' | '4 Star'>('All');

  // Form State
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    setLoading(true);
    setError(false);
    try {
      const data = await publicApi.reviews.getApproved();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error('Failed to load reviews', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      toast.error('Name and message are required');
      return;
    }
    
    setSubmitting(true);
    try {
      await publicApi.reviews.submit({
        name,
        designation,
        company,
        rating,
        message,
      });
      toast.success('Your review has been submitted and is pending approval.');
      // Reset form
      setName('');
      setDesignation('');
      setCompany('');
      setRating(5);
      setMessage('');
    } catch (err) {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === '5 Star') return r.rating === 5;
    if (filter === '4 Star') return r.rating === 4;
    return true;
  });

  return (
    <PageTransition className="bec-reviews-page">
      <section className="bec-section relative overflow-hidden bg-[#fbfcfb]">
        <div className="bec-orb" style={{ top: '-100px', right: '-100px' }} />
        <div className="bec-dot-pattern" style={{ top: '60px', left: '20px' }} />
        
        <div className="bec-container">
          <div className="flex flex-col md:flex-row items-center gap-16 mb-20">
            <div className="w-full md:w-1/2">
              <Reveal direction="right">
                <div className="bec-gold-line" />
                <h1 className="text-[40px] md:text-[56px] font-[800] text-[#14202d] leading-[1.1] mb-6">
                  Reviews & <span className="text-[#08735d]">Testimonials</span>
                </h1>
                <p className="text-[18px] text-[#6b7280] leading-[1.6]">
                  See what our members and partners are saying about their experience with BEC.
                </p>
              </Reveal>
            </div>
            <div className="w-full md:w-1/2 relative">
              <Reveal direction="left">
                <div className="relative rounded-[24px] overflow-hidden shadow-2xl">
                  <img loading="lazy" 
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200" 
                    alt="Professionals sharing feedback"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#08735d]/20 to-transparent" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>


        {/* FEATURED TESTIMONIAL BLOCK HERO */}
        <Testimonials />
      </section>

      <section className="bec-section bg-white">
        <div className="bec-container px-4">
          
          {/* Featured Review */}
          {!loading && !error && filteredReviews.length > 0 && filter === 'All' && (
            <Reveal y={40} className="mb-20">
              <div className="bg-[#14202d] text-white p-12 md:p-20 rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <MessageSquare size={200} />
                </div>
                <div className="relative z-10 max-w-3xl">
                  <div className="mb-8">
                    <AnimatedStars rating={filteredReviews[0]?.rating || 5} />
                  </div>
                  <blockquote className="text-2xl md:text-4xl font-black italic leading-tight mb-12">
                    "{filteredReviews[0]?.message}"
                  </blockquote>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full border-4 border-[#08735d] flex items-center justify-center text-3xl font-black bg-white text-[#14202d]">
                      {filteredReviews[0]?.name?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{filteredReviews[0]?.name}</h4>
                      <p className="text-[#c09643] font-medium">
                        {[filteredReviews[0]?.designation, filteredReviews[0]?.company].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Reviews List */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-12">
                {['All', '5 Star', '4 Star'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                      filter === f 
                        ? 'bg-[#14202d] text-white shadow-lg scale-105' 
                        : 'bg-white text-[#5d6870] border border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SkeletonCards count={4} lines={4} />
                </div>
              ) : error ? (
                <ErrorState
                  title="Reviews could not be loaded"
                  message="We couldn't reach the server to load testimonials."
                  onRetry={() => fetchReviews()}
                />
              ) : filteredReviews.length === 0 ? (
                <div className="py-20 text-center text-gray-400 border-4 border-dashed border-gray-50 rounded-[32px]">
                  <MessageSquare size={64} className="mx-auto mb-6 opacity-10" />
                  <p className="text-xl font-medium">No reviews match your filter yet.</p>
                </div>
              ) : (
                <div className="bec-masonry-grid">
                  {filteredReviews.slice(filter === 'All' ? 1 : 0).map((review, idx) => (
                    <Reveal key={review.id} y={30} delay={idx * 0.1} className="bec-masonry-item">
                      <div className="p-8 bg-white rounded-3xl border border-gray-50 shadow-xl hover:shadow-2xl transition-all group">
                        <div className="mb-6">
                          <AnimatedStars rating={review.rating} />
                        </div>
                        <p className="text-[#14202d] leading-relaxed mb-8 italic">"{review.message}"</p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full border-2 border-[#08735d] flex items-center justify-center text-lg font-bold bg-[#edf6f2] text-[#08735d]">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#14202d] text-sm">{review.name}</h4>
                            <p className="text-[10px] text-[#5d6870] uppercase font-black tracking-widest">
                              {review.company || 'Member'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Review Form */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-white p-10 rounded-[32px] shadow-2xl border border-gray-50 sticky top-24">
                <h3 className="text-2xl font-black text-[#14202d] mb-2">Share Your Story</h3>
                <p className="text-sm text-[#5d6870] mb-8">Help others by sharing your professional experience with BEC.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-8">
                    <label className="block text-xs font-black text-[#14202d] uppercase tracking-widest mb-4">Your Rating</label>
                    <AnimatedStars rating={rating} interactive onSelect={setRating} />
                  </div>
                  
                  <div className="bec-floating-label-group">
                    <input 
                      type="text" 
                      required 
                      placeholder=" "
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="bec-input bec-floating-input"
                    />
                    <label className="bec-floating-label">Full Name <span className="bec-required-asterisk">*</span></label>
                  </div>
                  
                  <div className="bec-floating-label-group">
                    <input 
                      type="text" 
                      placeholder=" "
                      value={designation} 
                      onChange={(e) => setDesignation(e.target.value)} 
                      className="bec-input bec-floating-input"
                    />
                    <label className="bec-floating-label">Designation</label>
                  </div>
                  
                  <div className="bec-floating-label-group">
                    <input 
                      type="text" 
                      placeholder=" "
                      value={company} 
                      onChange={(e) => setCompany(e.target.value)} 
                      className="bec-input bec-floating-input"
                    />
                    <label className="bec-floating-label">Company</label>
                  </div>
                  
                  <div className="bec-floating-label-group">
                    <textarea 
                      required 
                      placeholder=" "
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      className="bec-input bec-floating-input min-h-[120px]"
                    />
                    <label className="bec-floating-label">Review Message <span className="bec-required-asterisk">*</span></label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bec-primary w-full"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Submitting...
                      </>
                    ) : 'Submit Review'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
}
