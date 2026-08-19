import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <PageTransition className="flex min-h-[70vh] w-full items-center justify-center bg-[#fbfcfb] px-4 py-24 text-center relative overflow-hidden">
      <div className="bec-orb" style={{ top: '-150px', right: '-100px', background: 'radial-gradient(circle, rgba(192, 150, 67, 0.05) 0%, transparent 70%)' }} />
      <div className="bec-dot-pattern" style={{ bottom: '40px', left: '40px' }} />
      
      <div className="mx-auto max-w-lg relative z-10">
        <motion.div 
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#08735d] text-3xl font-extrabold tracking-wide text-white shadow-[0_20px_40px_rgba(8,115,93,0.3)]"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
        >
          BEC
        </motion.div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#c09643]">Error 404</p>
        <h1 className="mb-4 text-4xl font-extrabold text-[#14202d]">This page isn’t part of the Chamber</h1>
        <p className="mb-10 text-lg text-gray-600">
          The page you’re looking for doesn’t exist or has moved. Explore our services, events, or get in touch with the
          Bangladesh Executive Chamber team.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="bec-primary bec-btn-hover inline-flex items-center justify-center gap-2 px-8 py-3">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <Link
            to="/services"
            className="bec-secondary bec-btn-hover inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold transition"
          >
            <Compass size={18} /> Explore Services
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-bold text-[#08735d]">
          <Link to="/about" className="bec-nav-link">About Us</Link>
          <Link to="/events" className="bec-nav-link">Events</Link>
          <Link to="/resources" className="bec-nav-link">Resources</Link>
          <Link to="/contact" className="bec-nav-link">Contact Us</Link>
        </div>
      </div>
    </PageTransition>
  );
}
