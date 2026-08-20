import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Link2 as LinkedinIcon, Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react";
import { toast } from "sonner";
import { publicApi } from "@/lib/publicApi";
import { StaggerContainer, StaggerItem } from "./Animations";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      await publicApi.newsletter.subscribe(email);
      toast.success("Subscribed! (Note: Automated email sending is not enabled yet)");
      setEmail("");
    } catch (err) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="relative bg-[#111a24] text-gray-300 pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Decorative top glowing border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#08735d] to-transparent opacity-50" />

      {/* Subtle technical grid background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }}
      />

      {/* Ambient glow effects */}
      <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#08735d] blur-[150px] opacity-10 pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#c09643] blur-[150px] opacity-[0.03] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          {/* Brand Column */}
          <StaggerItem className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col pr-0 lg:pr-8">
            <Link to="/" className="flex items-center gap-4 mb-6 group">
              <div className="w-14 h-14 bg-white/[0.03] rounded-2xl flex items-center justify-center group-hover:bg-[#08735d]/20 transition-all duration-500 border border-white/10 group-hover:border-[#08735d]/50 shadow-[0_0_20px_rgba(8,115,93,0)] group-hover:shadow-[0_0_20px_rgba(8,115,93,0.2)]">
                <span className="text-white font-[900] text-2xl tracking-tighter">BEC</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-[800] text-xl leading-none tracking-tight mb-1">
                  Bangladesh
                </span>
                <span className="text-gray-400 font-[600] text-sm leading-none tracking-wide uppercase">
                  Executive Chamber
                </span>
              </div>
            </Link>
            <p className="text-gray-400/80 text-[15px] leading-relaxed mb-8 max-w-sm">
              A premium professional ecosystem dedicated to empowering careers and strengthening brands
              through strategic consulting, talent solutions, and dynamic networking.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/bangladesh-executive-chamber/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#0077B5] hover:border-[#0077B5] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,119,181,0.4)]"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </StaggerItem>

          {/* Links Column 1 */}
          <StaggerItem className="col-span-1 lg:col-span-2 lg:ml-auto">
            <h4 className="text-white font-[700] mb-8 tracking-[0.15em] uppercase text-[11px] opacity-80">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Our Services", to: "/services" },
                { label: "Community", to: "/community" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400/80 text-[14px] hover:text-white transition-colors flex items-center gap-2 group/link"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#08735d] opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    <span className="group-hover/link:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Links Column 2 */}
          <StaggerItem className="col-span-1 lg:col-span-2 lg:ml-auto">
            <h4 className="text-white font-[700] mb-8 tracking-[0.15em] uppercase text-[11px] opacity-80">Explore</h4>
            <ul className="space-y-4">
              {[
                { label: "Events", to: "/events" },
                { label: "Reviews", to: "/reviews" },
                { label: "Resources", to: "/resources" },
                { label: "Join BEC", to: "/join" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400/80 text-[14px] hover:text-white transition-colors flex items-center gap-2 group/link"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#08735d] opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    <span className="group-hover/link:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Contact & Newsletter Column */}
          <StaggerItem className="col-span-1 md:col-span-2 lg:col-span-4 lg:pl-8">
            <h4 className="text-white font-[700] mb-6 tracking-[0.15em] uppercase text-[11px] opacity-80">
              Stay Updated
            </h4>
            <p className="text-[14px] text-gray-400/80 mb-6 leading-relaxed">
              Subscribe to our newsletter for the latest insights, exclusive events, and elite career opportunities.
            </p>
            <form className="relative flex items-center mb-10 group" onSubmit={handleSubscribe}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#08735d] to-[#0a9a7c] rounded-full blur opacity-0 group-focus-within:opacity-20 transition-opacity duration-500" />
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribing}
                className="w-full relative bg-white/[0.03] border border-white/10 rounded-full py-3.5 pl-6 pr-14 text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-[#08735d]/50 focus:bg-white/[0.05] transition-all duration-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="absolute right-1.5 p-2.5 bg-[#08735d] hover:bg-[#0a9a7c] text-white rounded-full transition-colors duration-300 disabled:opacity-50 shadow-[0_0_15px_rgba(8,115,93,0.3)] hover:shadow-[0_0_20px_rgba(10,154,124,0.5)]"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </form>

            <div className="space-y-4">
              <a
                href="mailto:info@bec.com.bd"
                className="inline-flex items-center gap-3 text-[14px] text-gray-400/80 hover:text-white transition-colors group/contact"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/contact:bg-[#08735d]/20 group-hover/contact:border-[#08735d]/50 group-hover/contact:text-[#08735d] transition-all duration-300">
                  <Mail size={14} />
                </div>
                info@bec.com.bd
              </a>
              <div className="flex items-center gap-3 text-[14px] text-gray-400/80">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                Dhaka, Bangladesh
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[13px] text-gray-500">
            &copy; {new Date().getFullYear()} Bangladesh Executive Chamber. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="flex items-center gap-1.5">
              Made with <Heart size={12} className="text-red-500 fill-red-500/20" /> in BD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
