-- Add data for "Why Choose BEC" section if not exists
INSERT INTO public.site_stats (key, label, value, icon, display_order)
VALUES 
  ('years_expertise', 'Years of Industry Expertise', '10+', 'Award', 10),
  ('client_satisfaction', 'Client Satisfaction Rate', '95%', 'Heart', 20),
  ('nationwide_reach', 'Nationwide Reach Across Bangladesh', '64 Districts', 'Map', 30)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, label = EXCLUDED.label;

-- Add demo blog posts if they don't exist
INSERT INTO public.posts (title, slug, category, content, excerpt, cover_image_url, author_name, author_title, read_time, published)
VALUES 
  ('Shaping the Future of Business in Bangladesh', 'shaping-future-business', 'Business', 'Full content here...', 'Insights into the evolving corporate landscape of Bangladesh.', 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800', 'Arif Rahman', 'Chief Strategy Officer', '6 min', true),
  ('Top Career Trends for 2026', 'career-trends-2026', 'Career Tips', 'Full content here...', 'What skills will be in high demand in the next few years.', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', 'Sarah Islam', 'HR Consultant', '4 min', true),
  ('The Power of Professional Networking', 'power-networking', 'Industry Insights', 'Full content here...', 'How building a strong network can accelerate your career growth.', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800', 'Zahid Hasan', 'Managing Director', '5 min', true)
ON CONFLICT (slug) DO NOTHING;

-- Add demo events if they don't exist
INSERT INTO public.events (title, event_date, event_time, venue, seats, description)
VALUES 
  ('Leadership Summit 2026', '2026-09-15', '10:00 AM', 'Dhaka Marriott', 100, 'A gathering of industry leaders.'),
  ('Corporate Networking Night', '2026-10-05', '06:00 PM', 'Radisson Blu', 50, 'Expand your professional reach.')
ON CONFLICT DO NOTHING;
