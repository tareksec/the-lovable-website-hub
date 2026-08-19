import { Link } from '@tanstack/react-router';
import { Link2 as LinkedinIcon, Mail, Phone, MapPin, ArrowUpRight, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bec-footer">
      {/* Decorative top edge */}
      <div className="bec-footer-glow" />

      <div className="bec-footer-main">
        {/* Column 1: Brand */}
        <div className="bec-footer-brand-col">
          <div className="bec-footer-brand">
            <div className="bec-footer-mark">BEC</div>
            <div>
              <div className="bec-footer-name">BANGLADESH EXECUTIVE CHAMBER</div>
              <div className="bec-footer-tagline">Empowering Professionals</div>
            </div>
          </div>
          <p className="bec-footer-desc">
            A professional ecosystem dedicated to empowering careers and strengthening brands through strategic consulting, talent solutions, and networking.
          </p>
          {/* Social */}
          <div className="bec-footer-socials">
            <a
              href="https://www.linkedin.com/company/bangladesh-executive-chamber/"
              target="_blank"
              rel="noopener noreferrer"
              className="bec-footer-social-btn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="bec-footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/community">Community</Link>
        </div>

        {/* Column 3: Explore */}
        <div className="bec-footer-col">
          <h4>Explore</h4>
          <Link to="/events">Events</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/join">Join BEC</Link>
        </div>

        {/* Column 4: Contact */}
        <div className="bec-footer-col">
          <h4>Get in Touch</h4>
          <a href="mailto:info@bec.com.bd" className="bec-footer-contact-item">
            <Mail size={14} />
            <span>info@bec.com.bd</span>
          </a>
          <a href="tel:+8801700000000" className="bec-footer-contact-item">
            <Phone size={14} />
            <span>+880 1700-000000</span>
          </a>
          <div className="bec-footer-contact-item">
            <MapPin size={14} />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bec-footer-cta">
        <div className="bec-footer-cta-inner">
          <div className="bec-footer-cta-text">
            <h4>Ready to accelerate your career?</h4>
            <p>Join thousands of professionals growing with BEC.</p>
          </div>
          <Link to="/join" className="bec-footer-cta-btn">
            Become a Member
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bec-footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bangladesh Executive Chamber. All Rights Reserved.</p>
        <p className="bec-footer-made-with">
          Made with <Heart size={12} className="bec-footer-heart" /> in Bangladesh
        </p>
      </div>
    </footer>
  );
}
