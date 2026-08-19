-- Add missing columns to posts table
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'BEC Team',
ADD COLUMN IF NOT EXISTS author_title TEXT DEFAULT 'Editorial Team',
ADD COLUMN IF NOT EXISTS read_time TEXT DEFAULT '5 min';

-- Insert demo blog posts
INSERT INTO public.posts (title, slug, category, content, excerpt, author_name, author_title, read_time, published, cover_image_url)
VALUES 
(
  'How to Build a Strong Professional Brand in Bangladesh', 
  'build-strong-professional-brand-bangladesh', 
  'Career Tips', 
  'Building a professional brand in Bangladesh requires a mix of traditional networking and modern digital presence. First, optimize your LinkedIn profile by using a professional headshot and a headline that clearly states your value proposition. Second, engage with local industry leaders by sharing insightful comments on their posts. Third, ensure your CV is tailored to the specific needs of the Bangladesh corporate sector, focusing on measurable achievements rather than just job descriptions. Your personal brand is what people say about you when you are not in the room, and in a close-knit market like Dhaka, reputation is everything.', 
  'Learn how to optimize your LinkedIn profile, network effectively, and build a standout CV for the Bangladesh corporate market.', 
  'BEC Editorial Team', 
  'Professional Development', 
  '4 min', 
  true, 
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60'
),
(
  'Top Industries Hiring in Bangladesh 2026', 
  'top-industries-hiring-bangladesh-2026', 
  'Industry Insights', 
  'The hiring landscape in Bangladesh for 2026 is dominated by five key sectors. The Real Estate sector continues to grow as urbanization accelerates. FMCG companies are seeking talent to manage expanding supply chains. Digital Marketing has become a necessity for every business, leading to a surge in demand for creative and analytical minds. The Telecom sector is evolving with 5G rollout, and Banking is seeing a digital transformation shift. Staying informed about these trends is crucial for any job seeker looking to make a strategic career move this year.', 
  'An in-depth look at hiring trends across Real Estate, FMCG, Digital Marketing, Telecom, and Banking in 2026.', 
  'BEC Research Team', 
  'Market Intelligence', 
  '5 min', 
  true, 
  'https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?w=800&auto=format&fit=crop&q=60'
),
(
  '5 Essential Soft Skills Every Executive Needs', 
  '5-essential-soft-skills-executive-needs', 
  'Training', 
  'While technical skills might get you the job, soft skills will help you keep it and grow. Communication is the foundation of leadership; you must be able to convey your vision clearly. Negotiation is not just for sales; it is about finding common ground in every meeting. Time management allows you to focus on high-impact tasks. Emotional intelligence helps you navigate office dynamics and lead with empathy. Finally, continuous learning is the soft skill that ensures all your other skills stay sharp in a rapidly changing environment.', 
  'Master the key interpersonal skills—communication, leadership, negotiation, and more—required for executive success.', 
  'BEC Editorial Team', 
  'Leadership Coaching', 
  '3 min', 
  true, 
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60'
),
(
  'How BEC Helped 500+ Companies Find Top Talent', 
  'how-bec-helped-500-companies-talent', 
  'Business', 
  'At BEC, our talent acquisition process is built on a foundation of deep industry knowledge and a rigorous screening process. We don''t just match keywords; we match culture and potential. By leveraging our vast network of professionals in Bangladesh, we have successfully placed high-level executives in some of the country''s leading firms. Our success stories are a testament to the power of a strategic approach to recruitment, where we act as a bridge between ambitious companies and exceptional talent.', 
  'A deep dive into BEC''s talent acquisition process and our track record of connecting companies with exceptional talent.', 
  'BEC Team', 
  'Corporate Solutions', 
  '4 min', 
  true, 
  'https://images.unsplash.com/photo-1521791136064-7986c2959213?w=800&auto=format&fit=crop&q=60'
),
(
  'Networking in 2026: The Digital-First Approach', 
  'networking-2026-digital-first-approach', 
  'Career Tips', 
  'Networking has evolved significantly in recent years. In 2026, the first point of contact is almost always digital. A strong LinkedIn strategy involves not just having a profile, but actively participating in professional communities. Virtual networking events have become a staple, offering opportunities to connect with mentors and peers globally from your laptop. The key to successful digital networking is authenticity; reach out with a clear purpose and offer value before asking for favors.', 
  'Master the art of virtual networking, LinkedIn strategy, and building professional communities in the digital age.', 
  'BEC Editorial Team', 
  'Community Management', 
  '3 min', 
  true, 
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'
),
(
  'From Fresh Graduate to Corporate Executive: A Roadmap', 
  'fresh-graduate-to-corporate-executive-roadmap', 
  'Career Tips', 
  'The transition from university to the corporate world can be daunting. A successful roadmap starts with internships that provide real-world experience. Once you land your first role, focus on being a "sponge"—learn everything you can about the business. Find a mentor who can guide you through the unwritten rules of corporate life. Consistently exceeding expectations in your current role is the fastest way to get noticed for the next one. Remember, your career is a marathon, not a sprint; build a solid foundation early.', 
  'A step-by-step career roadmap for fresh graduates entering the Bangladesh corporate sector.', 
  'BEC Mentorship Team', 
  'Career Strategy', 
  '5 min', 
  true, 
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60'
);
