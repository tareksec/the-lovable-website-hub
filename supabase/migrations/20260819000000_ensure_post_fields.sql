-- Ensure posts have the new required fields
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS author_name TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS author_title TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS read_time TEXT;

GRANT SELECT ON public.posts TO authenticated;
GRANT SELECT ON public.posts TO anon;
