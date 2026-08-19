-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Posts
CREATE TABLE public.posts (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'Article',
  content text NOT NULL DEFAULT '',
  excerpt text,
  cover_image_url text,
  tags text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published posts" ON public.posts FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins manage posts" ON public.posts FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Reviews
CREATE TABLE public.reviews (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  designation text,
  company text,
  rating integer NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  message text NOT NULL,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read approved reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (approved = true);
CREATE POLICY "Admins manage reviews" ON public.reviews FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Events
CREATE TABLE public.events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  event_date date NOT NULL,
  event_time text NOT NULL DEFAULT '',
  venue text NOT NULL DEFAULT '',
  seats integer,
  registration_link text,
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read events" ON public.events FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage events" ON public.events FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Event registrations (private)
CREATE TABLE public.event_registrations (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id bigint NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, DELETE ON public.event_registrations TO authenticated;
GRANT ALL ON public.event_registrations TO service_role;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read registrations" ON public.event_registrations FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete registrations" ON public.event_registrations FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Members (private)
CREATE TABLE public.members (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  designation text,
  tier text NOT NULL DEFAULT 'basic',
  status text NOT NULL DEFAULT 'pending',
  message text,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.members TO authenticated;
GRANT ALL ON public.members TO service_role;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage members" ON public.members FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Team members (public)
CREATE TABLE public.team_members (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  designation text NOT NULL DEFAULT '',
  photo_url text,
  linkedin_url text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.team_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read team" ON public.team_members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage team" ON public.team_members FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Site stats (public)
CREATE TABLE public.site_stats (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key text NOT NULL UNIQUE,
  label text NOT NULL,
  value text NOT NULL,
  icon text,
  display_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_stats TO authenticated;
GRANT ALL ON public.site_stats TO service_role;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read stats" ON public.site_stats FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage stats" ON public.site_stats FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Contact messages (private)
CREATE TABLE public.contact_messages (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL DEFAULT '',
  message text NOT NULL,
  handled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage contact messages" ON public.contact_messages FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Newsletter (private)
CREATE TABLE public.newsletter_subscribers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read subscribers" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete subscribers" ON public.newsletter_subscribers FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Seed data
INSERT INTO public.site_stats (key, label, value, icon, display_order) VALUES
  ('professionals', 'Professionals Connected', '10,000+', 'UsersRound', 1),
  ('partners', 'Partner Organizations', '500+', 'Building2', 2),
  ('opportunities', 'Career Opportunities Shared', '2,000+', 'BriefcaseBusiness', 3),
  ('trainings', 'Training & Workshops Conducted', '150+', 'Landmark', 4);

INSERT INTO public.team_members (name, designation, linkedin_url, display_order) VALUES
  ('Md. Rakibul Hasan', 'Founder & Chief Executive', 'https://www.linkedin.com/company/bangladesh-executive-chamber/', 1),
  ('Farhana Islam', 'Head of Talent Solutions', NULL, 2),
  ('Tanvir Ahmed', 'Director, Business Consulting', NULL, 3),
  ('Nusrat Jahan', 'Lead, Training & Development', NULL, 4);

INSERT INTO public.events (title, event_date, event_time, venue, seats, description) VALUES
  ('Executive Leadership Masterclass', CURRENT_DATE + 21, '10:00 AM - 4:00 PM', 'Gulshan, Dhaka', 60, 'A full-day masterclass on modern leadership, team building, and executive decision making.'),
  ('CV Writing & Interview Bootcamp', CURRENT_DATE + 35, '3:00 PM - 6:00 PM', 'Online (Zoom)', 200, 'Practical session on building a standout CV and mastering interview conversations.'),
  ('BEC Corporate Networking Night', CURRENT_DATE + 50, '6:30 PM - 9:30 PM', 'Banani, Dhaka', 120, 'An evening of curated networking for professionals and partner organizations.');

INSERT INTO public.posts (title, slug, category, excerpt, content, tags) VALUES
  ('Building a Personal Brand That Opens Doors', 'building-a-personal-brand', 'Career', 'Why your professional reputation is your most valuable career asset — and how to build it deliberately.', E'Your personal brand is what people say about you when you are not in the room.\n\nIn Bangladesh''s fast-growing corporate landscape, professionals who communicate their value clearly move faster. Start with clarity: know the three things you want to be known for. Then make them visible through your work, your LinkedIn presence, and the way you show up in professional communities.\n\nConsistency beats intensity. A steady stream of thoughtful contributions will outperform a single burst of visibility every time.', 'branding,career,linkedin'),
  ('Five Hiring Mistakes Growing Companies Make', 'five-hiring-mistakes', 'HR', 'Recruitment errors quietly cost growing organizations far more than they realise.', E'Hiring is the highest-leverage decision a growing company makes.\n\nThe five most common mistakes we see: hiring for urgency rather than fit, skipping structured interviews, ignoring cultural alignment, underinvesting in onboarding, and failing to define success for the role in the first ninety days.\n\nFixing even two of these dramatically improves retention.', 'hr,hiring,talent'),
  ('Why Networking Still Wins in a Digital Economy', 'networking-in-a-digital-economy', 'Business', 'Digital tools amplify relationships — they do not replace them.', E'Every opportunity travels through a person.\n\nDigital platforms have made professional discovery easier, but trust is still built through consistent, genuine interaction. The professionals who thrive treat networking as a long-term practice rather than a job-search tactic.\n\nGive before you ask. Follow up. Show up.', 'networking,business,growth');