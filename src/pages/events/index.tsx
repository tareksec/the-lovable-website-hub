import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  X,
  Check,
  ArrowRight,
  User,
  Mail,
  Phone,
  Info,
} from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import { ErrorState, SkeletonCards } from "@/components/ui/states";
import { publicApi, type Event } from "@/lib/publicApi";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/layout/Animations";

const Countdown = ({ dateStr }: { dateStr: string }) => {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(
    null,
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const eventDate = new Date(dateStr);
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft(null);
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [dateStr]);

  if (!timeLeft) return null;

  return (
    <div className="flex gap-2 mb-6">
      {[
        { val: timeLeft.d, label: "Days" },
        { val: timeLeft.h, label: "Hours" },
        { val: timeLeft.m, label: "Mins" },
        { val: timeLeft.s, label: "Secs" },
      ].map((item, i) => (
        <div key={i} className="bec-countdown-item">
          <div className="bec-countdown-value">{item.val}</div>
          <div className="bec-countdown-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past" | "All">("Upcoming");

  // Modal State
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalStep, setModalStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [_honey, setHoney] = useState("");
  const [registering, setRegistering] = useState(false);
  const [isWaitlist, setIsWaitlist] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await publicApi.events.getAll();
        setEvents(data.events || []);
      } catch (err) {
        console.error("Failed to load events", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !name || !email) return;

    setRegistering(true);
    try {
      await publicApi.events.register(selectedEvent.id, { name, email, phone, _honey });
      setIsWaitlist(false);
      setModalStep(3);
    } catch (err: any) {
      const msg = err?.message?.toLowerCase() || "";
      if (msg.includes("capacity") || msg.includes("full") || msg.includes("waitlist")) {
        setIsWaitlist(true);
        setModalStep(3);
      } else {
        toast.error("Failed to register. Please try again.");
      }
    } finally {
      setRegistering(false);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setHoney("");
    setIsWaitlist(false);
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    if (activeTab === "Upcoming") return eventDate >= now;
    if (activeTab === "Past") return eventDate < now;
    return true;
  });

  return (
    <PageTransition className="bec-events-page">
      <section className="bec-section relative overflow-hidden bg-[#fbfcfb]">
        <div className="bec-orb" style={{ top: "-100px", right: "-100px", opacity: 0.1 }} />
        <div className="bec-dot-pattern" style={{ bottom: "40px", left: "40px" }} />

        <div className="bec-container">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <Reveal direction="right">
                <div className="bec-gold-line" />
                <h1 className="text-[40px] md:text-[56px] font-[800] text-[#14202d] leading-[1.1] mb-6 tracking-tight">
                  Training & <span className="text-[#08735d]">Events</span>
                </h1>
                <p className="text-[18px] text-[#6b7280] leading-[1.6] max-w-prose">
                  Discover upcoming workshops, networking sessions, and career development events.
                </p>
              </Reveal>
            </div>
            <div className="w-full md:w-1/2 relative">
              <Reveal direction="left">
                <div className="relative rounded-[24px] overflow-hidden shadow-bec-soft border border-gray-100/60 hover:shadow-bec-soft-hover transition-all duration-300">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1200&fm=webp"
                    alt="Professional seminar and workshop event"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#08735d]/20 to-transparent" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bec-section bg-white">
        <div className="bec-container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <h2 className="text-[32px] md:text-[40px] font-[800] text-[#14202d] tracking-tight">Event Calendar</h2>

            <div className="flex p-1 bg-[#edf6f2] rounded-2xl">
              {(["Upcoming", "Past", "All"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab
                      ? "bg-white text-[#08735d] shadow-sm"
                      : "text-[#5d6870] hover:text-[#08735d]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SkeletonCards count={3} lines={3} />
            </div>
          ) : error ? (
            <ErrorState
              title="Events could not be loaded"
              message="We couldn't reach the server to load events."
              onRetry={() => window.location.reload()}
            />
          ) : filteredEvents.length === 0 ? (
            <div className="py-24 text-center border-4 border-dashed border-[#edf6f2] rounded-[40px]">
              <Calendar size={64} className="mx-auto mb-6 text-[#08735d] opacity-20" />
              <h3 className="text-xl font-[800] text-[#14202d] mb-2">No events found</h3>
              <p className="text-[#6b7280]">Check back later for new workshops and sessions.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredEvents.map((event) => {
                  const isPast = new Date(event.date) < new Date();

                  return (
                    <Reveal key={event.id} y={20}>
                      <div
                        className={`group bg-white rounded-[24px] overflow-hidden border border-gray-100/60 shadow-bec-soft hover:shadow-bec-soft-hover hover:-translate-y-1 transition-all duration-300 h-full flex flex-col ${isPast ? "opacity-80" : ""}`}
                      >
                        <div className="relative h-48 overflow-hidden bg-[#edf6f2]">
                          <img
                            loading="lazy"
                            decoding="async"
                            src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800&fm=webp"
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-[800] uppercase tracking-[0.08em] text-[#08735d]">
                            {isPast ? "Past Session" : "Upcoming"}
                          </div>

                          {isPast && (
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                              <div className="text-white text-center p-6">
                                <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center mx-auto mb-4">
                                  <Check size={24} />
                                </div>
                                <span className="font-bold uppercase tracking-widest text-xs">
                                  Event Concluded
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                          <h3 className="text-xl font-[800] text-[#14202d] mb-4 group-hover:text-bec-emerald transition-colors line-clamp-2">
                            {event.title}
                          </h3>

                          {!isPast && <Countdown dateStr={event.date} />}

                          <div className="space-y-3 mb-6 flex-1">
                            <div className="flex items-center gap-3 text-sm text-[#5d6870]">
                              <Calendar size={16} className="text-[#c09643]" />
                              <span>
                                {new Date(event.date).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#5d6870]">
                              <Clock size={16} className="text-[#c09643]" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#5d6870]">
                              <MapPin size={16} className="text-[#c09643]" />
                              <span>{event.venue}</span>
                            </div>
                          </div>

                          {!isPast && (
                            <button
                              onClick={() => setSelectedEvent(event)}
                              className="bec-button bec-primary w-full min-h-[48px]"
                            >
                              Register Now
                            </button>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="bec-modal-overlay flex items-center justify-center p-4">
            <motion.div
              className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#f9fafb] flex items-center justify-center text-[#14202d] hover:bg-gray-100 transition-colors z-10"
                onClick={closeModal}
              >
                <X size={20} />
              </button>

              <div className="p-10">
                <div className="bec-modal-progress">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`bec-progress-step ${modalStep === step ? "active" : ""} ${modalStep > step ? "completed" : ""}`}
                    >
                      {modalStep > step ? <Check size={16} /> : step}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {modalStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <span className="bec-subtitle-chip mb-2">Step 1: Event Info</span>
                        <h3 className="text-[24px] font-[800] text-[#14202d] mt-2">
                          {selectedEvent.title}
                        </h3>
                      </div>
                      <div className="bg-[#f9fafb] p-6 rounded-3xl space-y-4">
                        <div className="flex items-start gap-4">
                          <Info size={20} className="text-[#08735d] mt-1 shrink-0" />
                          <p className="text-sm text-[#5d6870] leading-relaxed">
                            {selectedEvent.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-[#14202d]">
                          <Clock size={18} className="text-[#c09643]" />
                          <span>
                            {selectedEvent.date} @ {selectedEvent.time}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => setModalStep(2)} className="bec-button bec-primary w-full min-h-[56px] text-[16px]">
                        Continue to Register
                      </button>
                    </motion.div>
                  )}

                  {modalStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div>
                        <span className="bec-subtitle-chip mb-2">Step 2: Your Details</span>
                        <h3 className="text-[24px] font-[800] text-[#14202d] mt-2 mb-8">
                          Registration Form
                        </h3>
                      </div>

                      <form onSubmit={handleRegister} className="space-y-6">
                        <div className="bec-floating-label-group">
                          <input
                            type="text"
                            required
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bec-input bec-floating-input"
                          />
                          <label className="bec-floating-label flex items-center gap-2">
                            <User size={14} /> Full Name{" "}
                            <span className="bec-required-asterisk">*</span>
                          </label>
                        </div>
                        <div className="bec-floating-label-group">
                          <input
                            type="email"
                            required
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bec-input bec-floating-input"
                          />
                          <label className="bec-floating-label flex items-center gap-2">
                            <Mail size={14} /> Email Address{" "}
                            <span className="bec-required-asterisk">*</span>
                          </label>
                        </div>
                        <div className="bec-floating-label-group">
                          <input
                            type="tel"
                            placeholder=" "
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bec-input bec-floating-input"
                          />
                          <label className="bec-floating-label flex items-center gap-2">
                            <Phone size={14} /> Phone Number
                          </label>
                        </div>

                        {/* Honeypot field for bot protection */}
                        <input
                          type="text"
                          name="_honey"
                          value={_honey}
                          onChange={(e) => setHoney(e.target.value)}
                          style={{ display: "none" }}
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                        />

                        <div className="flex gap-4 pt-4">
                          <button
                            type="button"
                            onClick={() => setModalStep(1)}
                            className="flex-1 bg-gray-100 text-[#14202d] min-h-[56px] rounded-[16px] font-[700] hover:bg-gray-200 transition-all text-[15px]"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={registering}
                            className="bec-button bec-primary flex-[2] min-h-[56px] text-[16px]"
                          >
                            {registering ? "Submitting..." : "Confirm Registration"}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {modalStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        className="w-24 h-24 bg-[#edf6f2] text-[#08735d] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
                      >
                        <Check size={48} />
                      </motion.div>
                      <h3 className="text-[32px] font-[800] text-[#14202d] mb-4">
                        {isWaitlist ? "Added to Waitlist" : "You're In!"}
                      </h3>
                      <p className="text-[#6b7280] text-[15px] leading-relaxed mb-10">
                        {isWaitlist 
                          ? `Thank you for your interest. The event is currently at capacity, but we've added ` 
                          : `Thank you for registering. We've sent a confirmation email to `}
                        <span className="text-[#08735d] font-bold">{email}</span>
                        {isWaitlist ? ` to our waitlist. We'll notify you if a spot opens up.` : ` with all the session details.`}
                      </p>

                      <button onClick={closeModal} className="bec-button bec-primary w-full">
                        {isWaitlist ? "Understood" : "Perfect, see you there!"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
