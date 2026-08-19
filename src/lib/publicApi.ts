import { supabase } from '@/integrations/supabase/client';
import {
  joinMember,
  listFeaturedMembers,
  registerForEvent,
  submitContact,
  submitReview,
  subscribeNewsletter,
} from '@/lib/bec.functions';

export interface CommunityStats {
  id: number;
  key: string;
  label: string;
  value: string;
  icon: string | null;
  displayOrder: number;
}

export interface Member {
  id: number;
  fullName: string;
  designation: string | null;
  company: string | null;
  tier: 'basic' | 'professional' | 'corporate';
}

export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  photoUrl: string | null;
  linkedinUrl: string | null;
  displayOrder: number;
}

export interface Review {
  id: number;
  name: string;
  designation: string | null;
  company: string | null;
  rating: number;
  message: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  tags: string;
  createdAt: string;
  authorName: string;
  authorTitle: string;
  readTime: string;
}


export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  seats: number | null;
  registrationLink: string | null;
  description: string;
}

export const publicApi = {
  community: {
    getStats: async (): Promise<{ stats: CommunityStats[] }> => {
      const { data, error } = await supabase
        .from('site_stats')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return {
        stats: (data ?? []).map((s) => ({
          id: s.id,
          key: s.key,
          label: s.label,
          value: s.value,
          icon: s.icon,
          displayOrder: s.display_order,
        })),
      };
    },
    getMembers: async (): Promise<{ members: Member[] }> => ({
      members: await listFeaturedMembers(),
    }),
  },
  reviews: {
    getApproved: async (): Promise<{ reviews: Review[] }> => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return {
        reviews: (data ?? []).map((r) => ({
          id: r.id,
          name: r.name,
          designation: r.designation,
          company: r.company,
          rating: r.rating,
          message: r.message,
          createdAt: r.created_at,
        })),
      };
    },
    submit: (review: { name: string; designation?: string; company?: string; rating: number; message: string }) =>
      submitReview({ data: review }),
  },
  events: {
    getAll: async (): Promise<{ events: Event[] }> => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });
      if (error) throw error;
      return {
        events: (data ?? []).map((e) => ({
          id: e.id,
          title: e.title,
          date: new Date(e.event_date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          time: e.event_time,
          venue: e.venue,
          seats: e.seats,
          registrationLink: e.registration_link,
          description: e.description,
        })),
      };
    },
    register: (eventId: number, registration: { name: string; email: string; phone?: string }) =>
      registerForEvent({ data: { eventId, ...registration } }),
  },
  posts: {
    getAll: async (): Promise<{ posts: Post[] }> => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return { posts: (data ?? []).map(mapPost) };
    },
    getBySlug: async (slug: string): Promise<Post | null> => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
      if (error) throw error;
      return data ? mapPost(data) : null;
    },
  },
  newsletter: {
    subscribe: (email: string) => subscribeNewsletter({ data: { email } }),
  },
  contact: {
    submit: (message: { name: string; email: string; phone?: string; subject: string; message: string }) =>
      submitContact({ data: message }),
  },
  members: {
    join: (member: {
      fullName: string;
      email: string;
      phone?: string;
      company?: string;
      designation?: string;
      tier: 'basic' | 'professional' | 'corporate';
      message?: string;
    }) => joinMember({ data: member }),
  },
  team: {
    getAll: async (): Promise<{ team: TeamMember[] }> => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return {
        team: (data ?? []).map((t) => ({
          id: t.id,
          name: t.name,
          designation: t.designation,
          photoUrl: t.photo_url,
          linkedinUrl: t.linkedin_url,
          displayOrder: t.display_order,
        })),
      };
    },
  },
};

function mapPost(p: {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  tags: string | null;
  created_at: string;
  author_name: string | null;
  author_title: string | null;
  read_time: string | null;

}): Post {

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    content: p.content,
    excerpt: p.excerpt,
    coverImageUrl: p.cover_image_url,
    tags: p.tags || '',
    createdAt: p.created_at,
    authorName: p.author_name || 'BEC Team',
    authorTitle: p.author_title || 'Editorial Team',
    readTime: p.read_time || '5 min',
  };
}


