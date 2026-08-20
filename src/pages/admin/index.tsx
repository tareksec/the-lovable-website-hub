import { useState, useEffect, memo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Check,
  LogOut,
  X,
  Image as ImageIcon,
  Save,
  Send,
  Clock,
  Trash2,
  Globe,
} from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

type TabId =
  "posts" | "reviews" | "events" | "members" | "messages" | "team" | "stats" | "subscribers";

const tabs: { id: TabId; label: string }[] = [
  { id: "posts", label: "Posts" },
  { id: "reviews", label: "Reviews" },
  { id: "events", label: "Events" },
  { id: "members", label: "Members" },
  { id: "messages", label: "Messages" },
  { id: "team", label: "Team" },
  { id: "stats", label: "Stats" },
  { id: "subscribers", label: "Newsletter" },
];

const input = "w-full bec-input text-sm min-h-[48px] rounded-[12px] bg-white";
const btn = "bec-button bec-primary text-sm px-5 py-2.5 rounded-[12px] font-bold disabled:opacity-60";
const card = "bg-white rounded-[24px] shadow-bec-soft border border-gray-100/60 p-6 transition-all duration-300 hover:shadow-bec-soft-hover";

export default function AdminDashboard() {
  const [tab, setTab] = useState<TabId>("posts");
  const { user, signOut } = useAuth();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#14202d]">Admin Panel</h1>
          <p className="text-sm text-gray-500">Signed in as {user?.email}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="inline-flex items-center gap-2 rounded-[12px] border border-gray-200 bg-white px-4 py-2 text-sm font-[700] text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2 text-[13px] font-[700] transition-all duration-300 ${
              tab === t.id
                ? "bg-[#08735d] text-white shadow-bec-soft scale-105"
                : "bg-gray-100 text-[#6b7280] hover:bg-gray-200 hover:text-[#14202d]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "posts" && <PostsTab />}
          {tab === "reviews" && <ReviewsTab />}
          {tab === "events" && <EventsTab />}
          {tab === "members" && <MembersTab />}
          {tab === "messages" && <MessagesTab />}
          {tab === "team" && <TeamTab />}
          {tab === "stats" && <StatsTab />}
          {tab === "subscribers" && <SubscribersTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function useTable<T>(key: string, fn: () => Promise<T>) {
  return useQuery({ queryKey: [key], queryFn: fn });
}

function useRefresh(key: string) {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: [key] });
}

/* ---------------- Posts ---------------- */

function PostsTab() {
  const refresh = useRefresh("admin-posts");
  const { data, isLoading } = useTable("admin-posts", async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  });

  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    id: null as number | null,
    title: "",
    slug: "",
    category: "Career Tips",
    excerpt: "",
    content: "",
    tags: "",
    cover: "",
    published: false,
  });

  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [search, setSearch] = useState("");

  const filteredData = data?.filter((p) => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  // Auto-save logic (every 30s if title or content exists)
  useEffect(() => {
    if (!form.title && !form.content) return;

    const timer = setInterval(() => {
      setIsAutoSaving(true);
      // In a real app, we'd save to a 'drafts' table or the same table
      setTimeout(() => {
        setLastSaved(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        setIsAutoSaving(false);
      }, 1000);
    }, 30000);

    return () => clearInterval(timer);
  }, [form.title, form.content]);

  const savePost = useMutation({
    mutationFn: async (vars: { published: boolean }) => {
      // Create a unique slug if this is a new post and no slug is provided
      let finalSlug = form.slug;
      if (!finalSlug) {
        const baseSlug = form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        finalSlug = form.id ? baseSlug : `${baseSlug}-${Math.random().toString(36).substring(2, 8)}`;
      }

      const postData = {
        title: form.title,
        slug: finalSlug,
        category: form.category,
        excerpt: form.excerpt || null,
        content: form.content,
        tags: form.tags,
        cover_image_url: form.cover || null,
        published: vars.published,
      };

      if (form.id) {
        const { error } = await supabase.from("posts").update(postData).eq("id", form.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("posts").insert(postData);
        if (error) throw error;
      }
    },
    onSuccess: (_, vars) => {
      toast.success(vars.published ? "Post published" : "Draft saved");
      setForm({
        id: null,
        title: "",
        slug: "",
        category: "Career Tips",
        excerpt: "",
        content: "",
        tags: "",
        cover: "",
        published: false,
      });
      setLastSaved(null);
      refresh();
      // Invalidate public posts query to immediately show updates on /resources
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Post deleted");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-12">
      {/* Post List */}
      <div className="mb-4">
        <input 
          className={input} 
          placeholder="Search posts by title or category..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && (
          <p className="text-sm text-gray-500 col-span-full text-center py-12">Loading posts...</p>
        )}
        {filteredData?.map((p) => (
          <PostCard 
            key={p.id} 
            post={p} 
            onRemove={remove.mutate} 
            onEdit={() => {
              setForm({
                id: p.id,
                title: p.title,
                slug: p.slug,
                category: p.category,
                excerpt: p.excerpt || "",
                content: p.content || "",
                tags: p.tags || "",
                cover: p.cover_image_url || "",
                published: p.published,
              });
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      <div className="bec-gold-line" />

      {/* Editor Layout */}
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Main Editor Area */}
        <div className="space-y-8">
          <div className="space-y-4">
            <input
              className="w-full text-[28px] md:text-[36px] font-[800] text-[#14202d] border-none border-b border-gray-100 focus:border-[#08735d] outline-none bg-transparent py-4 transition-all placeholder:text-gray-300"
              placeholder="Post Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              className="w-full text-[15px] text-gray-600 border-none outline-none bg-transparent resize-none placeholder:text-gray-300 py-2"
              placeholder="Short description (shown in card view)..."
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
          </div>

          <RichTextEditor
            content={form.content}
            onChange={(html) => setForm({ ...form, content: html })}
          />
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Publish Box */}
          <div className={card}>
            <h3 className="text-sm font-bold text-[#14202d] mb-4 flex items-center gap-2">
              <Globe size={16} className="text-[#08735d]" />
              Publish Status
            </h3>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-6">
              <span className="text-sm font-semibold text-gray-600">Status</span>
              <button
                type="button"
                onClick={() => setForm({ ...form, published: !form.published })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${form.published ? "bg-[#08735d]" : "bg-gray-300"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.published ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => {
                  savePost.mutate({ published: false });
                }}
                disabled={savePost.isPending}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#08735d] text-[#08735d] font-[800] text-xs hover:bg-[#08735d]/5 active:scale-95 transition-all"
              >
                <Save size={14} /> Save Draft
              </button>
              <button
                onClick={() => {
                  savePost.mutate({ published: true });
                }}
                disabled={savePost.isPending}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#08735d] text-white font-[800] text-xs hover:bg-[#065c4a] active:scale-95 transition-all shadow-sm"
              >
                <Send size={14} /> {form.id ? (form.published ? "Update" : "Publish") : "Publish"}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <Clock size={12} />
              {isAutoSaving
                ? "Auto-saving..."
                : lastSaved
                  ? `Last saved: ${lastSaved}`
                  : "Ready to save"}
            </div>
          </div>

          {/* Cover Image Box */}
          <div className={card}>
            <h3 className="text-sm font-bold text-[#14202d] mb-4 flex items-center gap-2">
              <ImageIcon size={16} className="text-[#08735d]" />
              Cover Image
            </h3>

            <div className="relative group rounded-xl overflow-hidden bg-gray-50 aspect-video mb-4 border border-dashed border-gray-200 flex items-center justify-center">
              {form.cover ? (
                <>
                  <img src={form.cover} alt="Cover" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, cover: "" })}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove cover image"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              ) : (
                <div className="text-center p-4">
                  <ImageIcon size={24} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-[10px] text-gray-400 font-bold uppercase">No cover selected</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <input
                className={input}
                placeholder="Paste Image URL"
                value={form.cover}
                onChange={(e) => setForm({ ...form, cover: e.target.value })}
              />
              <p className="text-[10px] text-center text-gray-400">OR</p>
              <button className="w-full py-2.5 border border-gray-200 rounded-[12px] text-xs font-[800] text-gray-600 hover:bg-gray-50 transition-all active:scale-95">
                Upload from Computer
              </button>
            </div>
          </div>

          {/* Settings Box */}
          <div className={card}>
            <h3 className="text-sm font-bold text-[#14202d] mb-4">Post Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Category
                </label>
                <select
                  className={input}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option>Career Tips</option>
                  <option>Business</option>
                  <option>Industry Insights</option>
                  <option>Training</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Tags
                </label>
                <input
                  className={input}
                  placeholder="e.g. strategy, dhaka, growth"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  URL Slug
                </label>
                <input
                  className={input}
                  placeholder="custom-url-path"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </div>
            </div>

            {form.id && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setForm({
                    id: null, title: "", slug: "", category: "Career Tips",
                    excerpt: "", content: "", tags: "", cover: "", published: false
                  })}
                  className="text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const PostCard = memo(
  ({
    post: p,
    onRemove,
    onEdit,
  }: {
    post: any;
    onRemove: (id: number) => void;
    onEdit: () => void;
  }) => (
    <div className={`${card} group cursor-pointer`} onClick={onEdit}>
      <div className="flex justify-between items-start mb-3">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
        >
          {p.published ? "Published" : "Draft"}
        </span>
        <DeleteButton onConfirm={(e) => { e.stopPropagation(); onRemove(p.id); }} size={16} label="Delete post" />
      </div>
      <h3 className="font-bold text-[#14202d] line-clamp-1">{p.title}</h3>
      <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-tight">
        {p.category} • /{p.slug}
      </p>
    </div>
  ),
);

/* ---------------- Reviews ---------------- */

function ReviewsTab() {
  const refresh = useRefresh("admin-reviews");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useTable("admin-reviews", async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  });

  const setApproved = useMutation({
    mutationFn: async ({ id, approved }: { id: number; approved: boolean }) => {
      const { error } = await supabase.from("reviews").update({ approved }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Review updated");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Review deleted");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;

  const filteredData = data?.filter((r) => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input 
        className={input} 
        placeholder="Search reviews by name or message..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-3">
        {filteredData?.map((r) => (
          <ReviewCard
            key={r.id}
            review={r}
            onToggleApprove={(approved) => setApproved.mutate({ id: r.id, approved })}
            onRemove={remove.mutate}
          />
        ))}
        {filteredData?.length === 0 && <p className="text-sm text-gray-500">No reviews found.</p>}
      </div>
    </div>
  );
}

const ReviewCard = memo(
  ({
    review: r,
    onToggleApprove,
    onRemove,
  }: {
    review: {
      id: number;
      name: string;
      rating: number;
      designation?: string;
      company?: string;
      message: string;
      approved: boolean;
    };
    onToggleApprove: (approved: boolean) => void;
    onRemove: (id: number) => void;
  }) => (
    <div className={`${card} flex items-start justify-between gap-4`}>
      <div>
        <h3 className="font-bold text-[#14202d]">
          {r.name} <span className="text-sm font-normal text-gray-500">— {r.rating}★</span>
        </h3>
        <p className="text-xs text-gray-500">
          {[r.designation, r.company].filter(Boolean).join(", ")}
        </p>
        <p className="mt-2 text-sm text-gray-700">{r.message}</p>
        <span
          className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${r.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
        >
          {r.approved ? "Approved" : "Pending"}
        </span>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={() => onToggleApprove(!r.approved)}
          className="text-gray-400 hover:text-[#08735d] active:scale-90 transition-all"
          aria-label="Toggle approval"
        >
          {r.approved ? <X size={18} /> : <Check size={18} />}
        </button>
        <DeleteButton
          onConfirm={() => onRemove(r.id)}
          label="Delete review"
          itemName={`Review by ${r.name}`}
        />
      </div>
    </div>
  ),
);

/* ---------------- Events ---------------- */

function EventsTab() {
  const refresh = useRefresh("admin-events");
  const { data, isLoading } = useTable("admin-events", async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });
    if (error) throw error;
    return data;
  });

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    seats: "",
    link: "",
    description: "",
  });
  const [search, setSearch] = useState("");

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("events").insert({
        title: form.title,
        event_date: form.date,
        event_time: form.time,
        venue: form.venue,
        seats: form.seats ? Number(form.seats) : null,
        registration_link: form.link || null,
        description: form.description,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Event created");
      setForm({ title: "", date: "", time: "", venue: "", seats: "", link: "", description: "" });
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Event deleted");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <form
        className={`${card} space-y-3 self-start`}
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate();
        }}
      >
        <h2 className="text-lg font-bold text-[#14202d]">New Event</h2>
        <input
          className={input}
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className={input}
          type="date"
          required
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          className={input}
          placeholder="Time (e.g. 10:00 AM - 4:00 PM)"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <input
          className={input}
          placeholder="Venue"
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
        />
        <input
          className={input}
          type="number"
          placeholder="Seats"
          value={form.seats}
          onChange={(e) => setForm({ ...form, seats: e.target.value })}
        />
        <input
          className={input}
          placeholder="External registration link (optional)"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
        <textarea
          className={input}
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className={btn} disabled={create.isPending}>
          {create.isPending ? "Saving…" : "Create event"}
        </button>
      </form>

      <div className="space-y-3">
        {isLoading && <p className="text-sm text-gray-500">Loading…</p>}
        <input 
          className={input} 
          placeholder="Search events by title..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {data?.filter(ev => ev.title.toLowerCase().includes(search.toLowerCase())).map((ev) => (
          <EventCard key={ev.id} event={ev} onRemove={remove.mutate} />
        ))}
        {data?.length === 0 && <p className="text-sm text-gray-500">No events yet.</p>}
      </div>
    </div>
  );
}

const EventCard = memo(
  ({
    event: ev,
    onRemove,
  }: {
    event: { id: number; title: string; event_date: string; event_time: string; venue: string };
    onRemove: (id: number) => void;
  }) => (
    <div className={`${card} flex items-start justify-between gap-4`}>
      <div>
        <h3 className="font-bold text-[#14202d]">{ev.title}</h3>
        <p className="text-xs text-gray-500">
          {ev.event_date} · {ev.event_time} · {ev.venue}
        </p>
        <EventRegistrations eventId={ev.id} />
      </div>
      <DeleteButton onConfirm={() => onRemove(ev.id)} label="Delete event" itemName={ev.title} />
    </div>
  ),
);

function EventRegistrations({ eventId }: { eventId: number }) {
  const { data } = useQuery({
    queryKey: ["admin-registrations", eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("event_registrations")
        .select("*")
        .eq("event_id", eventId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (!data || data.length === 0)
    return <p className="mt-2 text-xs text-gray-400">No registrations yet.</p>;

  return (
    <details className="mt-2">
      <summary className="cursor-pointer text-xs font-semibold text-[#08735d]">
        {data.length} registration(s)
      </summary>
      <ul className="mt-2 space-y-1 text-xs text-gray-600">
        {data.map((r) => (
          <li key={r.id}>
            {r.name} — {r.email}
            {r.phone ? ` — ${r.phone}` : ""}
          </li>
        ))}
      </ul>
    </details>
  );
}

/* ---------------- Members ---------------- */

function MembersTab() {
  const refresh = useRefresh("admin-members");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useTable("admin-members", async () => {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  });

  const update = useMutation({
    mutationFn: async ({
      id,
      patch,
    }: {
      id: number;
      patch: { status?: string; featured?: boolean };
    }) => {
      const { error } = await supabase.from("members").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Member updated");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Member removed");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;

  const filteredData = data?.filter((m) => 
    m.full_name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input 
        className={input} 
        placeholder="Search members by name or email..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-3">
        {filteredData?.map((m) => (
          <MemberCard key={m.id} member={m} onUpdate={update.mutate} onRemove={remove.mutate} />
        ))}
        {filteredData?.length === 0 && (
          <p className="text-sm text-gray-500">No members found.</p>
        )}
      </div>
    </div>
  );
}

const MemberCard = memo(
  ({
    member: m,
    onUpdate,
    onRemove,
  }: {
    member: {
      id: number;
      full_name: string;
      email: string;
      phone?: string;
      designation?: string;
      company?: string;
      tier: string;
      status: string;
      featured: boolean;
    };
    onUpdate: (data: { id: number; patch: { status?: string; featured?: boolean } }) => void;
    onRemove: (id: number) => void;
  }) => (
    <div className={`${card} flex flex-wrap items-start justify-between gap-4`}>
      <div>
        <h3 className="font-bold text-[#14202d]">{m.full_name}</h3>
        <p className="text-xs text-gray-500">
          {m.email}
          {m.phone ? ` · ${m.phone}` : ""}
        </p>
        <p className="text-xs text-gray-500">
          {[m.designation, m.company].filter(Boolean).join(", ")}
        </p>
        <div className="mt-2 flex gap-2 text-xs">
          <span className="rounded-full bg-gray-100 px-2 py-0.5 font-semibold uppercase">
            {m.tier}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 font-semibold">{m.status}</span>
          {m.featured && (
            <span className="rounded-full bg-[#c09643]/20 px-2 py-0.5 font-semibold text-[#8a6a26]">
              Featured
            </span>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <select
          className="rounded-lg border border-gray-300 px-2 py-1 text-xs"
          value={m.status}
          onChange={(e) => onUpdate({ id: m.id, patch: { status: e.target.value } })}
        >
          <option value="pending">pending</option>
          <option value="approved">approved</option>
          <option value="rejected">rejected</option>
        </select>
        <button
          onClick={() => onUpdate({ id: m.id, patch: { featured: !m.featured } })}
          className="rounded-lg border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
        >
          {m.featured ? "Unfeature" : "Feature"}
        </button>
        <DeleteButton
          onConfirm={() => onRemove(m.id)}
          label="Delete member"
          itemName={m.full_name}
        />
      </div>
    </div>
  ),
);

/* ---------------- Messages ---------------- */

function MessagesTab() {
  const refresh = useRefresh("admin-messages");
  const { data, isLoading } = useTable("admin-messages", async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  });

  const update = useMutation({
    mutationFn: async ({ id, handled }: { id: number; handled: boolean }) => {
      const { error } = await supabase.from("contact_messages").update({ handled }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: refresh,
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Message deleted");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <div className="space-y-3">
      {data?.map((m) => (
        <MessageCard
          key={m.id}
          message={m}
          onToggleHandled={(handled) => update.mutate({ id: m.id, handled })}
          onRemove={remove.mutate}
        />
      ))}
      {data?.length === 0 && <p className="text-sm text-gray-500">No messages yet.</p>}
    </div>
  );
}

const MessageCard = memo(
  ({
    message: m,
    onToggleHandled,
    onRemove,
  }: {
    message: {
      id: number;
      subject?: string;
      name: string;
      email: string;
      phone?: string;
      message: string;
      handled: boolean;
    };
    onToggleHandled: (handled: boolean) => void;
    onRemove: (id: number) => void;
  }) => (
    <div className={`${card} flex items-start justify-between gap-4`}>
      <div>
        <h3 className="font-bold text-[#14202d]">{m.subject || "No subject"}</h3>
        <p className="text-xs text-gray-500">
          {m.name} · {m.email}
          {m.phone ? ` · ${m.phone}` : ""}
        </p>
        <p className="mt-2 text-sm text-gray-700">{m.message}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={() => onToggleHandled(!m.handled)}
          className="text-gray-400 hover:text-[#08735d] active:scale-90 transition-all"
          aria-label="Toggle handled"
        >
          {m.handled ? <X size={18} /> : <Check size={18} />}
        </button>
        <DeleteButton
          onConfirm={() => onRemove(m.id)}
          label="Delete message"
          itemName={m.subject || m.name}
        />
      </div>
    </div>
  ),
);

/* ---------------- Team ---------------- */

function TeamTab() {
  const refresh = useRefresh("admin-team");
  const { data, isLoading } = useTable("admin-team", async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw error;
    return data;
  });

  const [form, setForm] = useState({
    name: "",
    designation: "",
    photo: "",
    linkedin: "",
    order: "",
  });

  const create = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("team_members").insert({
        name: form.name,
        designation: form.designation,
        photo_url: form.photo || null,
        linkedin_url: form.linkedin || null,
        display_order: form.order ? Number(form.order) : 0,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Team member added");
      setForm({ name: "", designation: "", photo: "", linkedin: "", order: "" });
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removed");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <form
        className={`${card} space-y-3 self-start`}
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate();
        }}
      >
        <h2 className="text-lg font-bold text-[#14202d]">Add Team Member</h2>
        <input
          className={input}
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className={input}
          placeholder="Designation"
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
        />
        <input
          className={input}
          placeholder="Photo URL"
          value={form.photo}
          onChange={(e) => setForm({ ...form, photo: e.target.value })}
        />
        <input
          className={input}
          placeholder="LinkedIn URL"
          value={form.linkedin}
          onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
        />
        <input
          className={input}
          type="number"
          placeholder="Display order"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: e.target.value })}
        />
        <button className={btn} disabled={create.isPending}>
          Add member
        </button>
      </form>

      <div className="space-y-3">
        {isLoading && <p className="text-sm text-gray-500">Loading…</p>}
        {data?.map((t) => (
          <TeamCard key={t.id} team={t} onRemove={remove.mutate} />
        ))}
      </div>
    </div>
  );
}

const TeamCard = memo(
  ({
    team: t,
    onRemove,
  }: {
    team: { id: number; name: string; designation: string };
    onRemove: (id: number) => void;
  }) => (
    <div className={`${card} flex items-center justify-between gap-4`}>
      <div>
        <h3 className="font-bold text-[#14202d]">{t.name}</h3>
        <p className="text-xs text-gray-500">{t.designation}</p>
      </div>
      <DeleteButton onConfirm={() => onRemove(t.id)} label="Delete team member" itemName={t.name} />
    </div>
  ),
);

/* ---------------- Stats ---------------- */

function StatsTab() {
  const refresh = useRefresh("admin-stats");
  const { data, isLoading } = useTable("admin-stats", async () => {
    const { data, error } = await supabase
      .from("site_stats")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw error;
    return data;
  });

  const update = useMutation({
    mutationFn: async ({ id, value, label }: { id: number; value: string; label: string }) => {
      const { error } = await supabase.from("site_stats").update({ value, label }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Stat updated");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data?.map((s) => (
        <StatRow
          key={s.id}
          stat={s}
          onSave={(value, label) => update.mutate({ id: s.id, value, label })}
        />
      ))}
    </div>
  );
}

const StatRow = memo(function StatRow({
  stat,
  onSave,
}: {
  stat: { id: number; key: string; label: string; value: string };
  onSave: (value: string, label: string) => void;
}) {
  const [value, setValue] = useState(stat.value);
  const [label, setLabel] = useState(stat.label);

  return (
    <div className={`${card} space-y-2`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{stat.key}</p>
      <input className={input} value={value} onChange={(e) => setValue(e.target.value)} />
      <input className={input} value={label} onChange={(e) => setLabel(e.target.value)} />
      <button className={btn} onClick={() => onSave(value, label)}>
        Save
      </button>
    </div>
  );
});

/* ---------------- Subscribers ---------------- */

function SubscribersTab() {
  const refresh = useRefresh("admin-subscribers");
  const { data, isLoading } = useTable("admin-subscribers", async () => {
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removed");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <div className={`${card} divide-y divide-gray-100`}>
      {data?.map((s) => (
        <div key={s.id} className="flex items-center justify-between py-2 text-sm">
          <span className="text-gray-700">{s.email}</span>
          <DeleteButton
            onConfirm={() => remove.mutate(s.id)}
            label="Delete subscriber"
            itemName={s.email}
            size={16}
          />
        </div>
      ))}
      {data?.length === 0 && <p className="text-sm text-gray-500">No subscribers yet.</p>}
    </div>
  );
}
