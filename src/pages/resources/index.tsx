import { useState, useEffect, memo } from "react";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import PageTransition from "@/components/layout/PageTransition";
import { ErrorState, SkeletonCards } from "@/components/ui/states";
import { publicApi, type Post } from "@/lib/publicApi";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/layout/Animations";

const categories = ["All", "Career Tips", "Business", "Industry Insights", "Training"];

export default function Resources() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Newsletter
  const [email, setEmail] = useState("");
  const [_honey, setHoney] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await publicApi.posts.getAll();
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Failed to load posts", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    try {
      await publicApi.newsletter.subscribe(email, _honey);
      toast.success("Thank you for subscribing!");
      setEmail("");
      setHoney("");
    } catch (err) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesFilter = filter === "All" || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  return (
    <PageTransition className="bec-resources-page">
      <section className="bec-section relative overflow-hidden bg-[#fbfcfb]">
        <div className="bec-orb" style={{ top: "-100px", right: "-100px", opacity: 0.1 }} />
        <div className="bec-dot-pattern" style={{ bottom: "40px", left: "40px" }} />

        <div className="bec-container">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <Reveal direction="right">
                <div className="bec-gold-line" />
                <h1 className="text-[40px] md:text-[56px] font-[800] text-[#14202d] leading-[1.1] mb-6 tracking-tight">
                  Insights & <span className="text-[#08735d]">Resources</span>
                </h1>
                <p className="text-[18px] text-[#6b7280] leading-[1.6] max-w-prose">
                  Stay updated with the latest industry trends, career tips, and business
                  strategies.
                </p>
              </Reveal>
            </div>
            <div className="w-full md:w-1/2 relative">
              <Reveal direction="left">
                <div className="relative rounded-[24px] overflow-hidden shadow-bec-soft border border-gray-100/60 hover:shadow-bec-soft-hover transition-all duration-300">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200&fm=webp"
                    alt="Learning resources and professional growth"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#08735d]/20 to-transparent" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bec-section bg-white">
        <div className="bec-container">
          <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
            {/* Sticky Filters Sidebar */}
            <aside className="w-full lg:w-64 lg:sticky lg:top-24 z-10">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#edf6f2] space-y-8">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#14202d] mb-4 flex items-center gap-2">
                    <Tag size={14} className="text-[#c09643]" />
                    Categories
                  </h3>

                  <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 gap-2 scrollbar-hide">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setFilter(c)}
                        className={`whitespace-nowrap text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                          filter === c
                            ? "bg-[#08735d] text-white shadow-lg"
                            : "text-[#5d6870] hover:bg-[#edf6f2] hover:text-[#08735d]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-[#edf6f2]">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#14202d] mb-4">
                      Search
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search insights..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#fbfcfb] border border-[#edf6f2] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#08735d]/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 w-full">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SkeletonCards count={4} lines={4} />
                </div>
              ) : error ? (
                <ErrorState
                  title="Articles could not be loaded"
                  message="We couldn't reach the server to load BEC insights."
                  onRetry={() => window.location.reload()}
                />
              ) : filteredPosts.length === 0 ? (
                <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-xl max-w-3xl mx-auto">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Coming Soon</h3>
                  <p className="text-gray-500">
                    We are currently curating the best content for this category.
                  </p>
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Featured Article - Only show when "All" or if it's the first in a filtered list */}
                  {paginatedPosts.length > 0 && currentPage === 1 && (
                    <Reveal y={20}>
                      <Link
                        to="/resources/$slug"
                        params={{ slug: filteredPosts[0]?.slug || "" }}
                        className="group block bg-white rounded-[40px] overflow-hidden border border-gray-100/60 shadow-bec-soft hover:shadow-bec-soft-hover transition-all"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <div className="relative h-64 md:h-auto overflow-hidden">
                            <motion.img
                              loading="lazy"
                              decoding="async"
                              src={
                                filteredPosts[0]?.coverImageUrl ||
                                "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800&fm=webp"
                              }
                              alt={filteredPosts[0]?.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6">
                              <span className="bg-bec-gold text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                                {filteredPosts[0]?.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-10 md:p-14 flex flex-col justify-center">
                            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-bec-gold mb-6">
                              <span className="bg-bec-emerald-light px-3 py-1 rounded-full text-bec-emerald">
                                Featured Article
                              </span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Clock size={12} />
                                <span>{filteredPosts[0]?.readTime} read</span>
                              </div>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-bec-navy mb-6 group-hover:text-bec-emerald transition-colors leading-tight">
                              {filteredPosts[0]?.title}
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-prose">
                              {(
                                filteredPosts[0]?.excerpt ||
                                filteredPosts[0]?.content?.replace(/<[^>]*>?/gm, "") ||
                                ""
                              ).substring(0, 200)}
                              ...
                            </p>
                            <div className="flex items-center gap-2 font-bold text-bec-emerald group-hover:gap-4 transition-all">
                              Read Full Article{" "}
                              <ArrowRight
                                size={20}
                                className="transition-transform group-hover:translate-x-2"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  )}

                  {/* Remaining Articles Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {paginatedPosts.slice(currentPage === 1 ? 1 : 0).map((post, idx) => (
                      <Reveal key={post.id} y={20} delay={idx * 0.1}>
                        <PostCard post={post} />
                      </Reveal>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-12">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-6 py-3 rounded-xl font-bold border border-[#edf6f2] disabled:opacity-30 hover:bg-[#edf6f2] transition-all"
                      >
                        Previous
                      </button>
                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-full font-bold transition-all ${
                              currentPage === page
                                ? "bg-[#08735d] text-white shadow-lg"
                                : "text-[#5d6870] hover:bg-[#edf6f2]"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-6 py-3 rounded-xl font-bold border border-[#edf6f2] disabled:opacity-30 hover:bg-[#edf6f2] transition-all"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bec-section">
        <div className="bec-container">
          <div className="bg-gradient-to-br from-bec-navy to-[#0a111a] p-12 md:p-24 rounded-[60px] text-center text-white shadow-bec-soft border border-white/10 relative overflow-hidden">
            <div className="bec-orb" style={{ top: "-100px", left: "-100px", opacity: 0.1 }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight max-w-2xl mx-auto text-white">
                Never Miss a Professional Milestone
              </h2>
              <p className="text-white/60 text-base mb-12 max-w-xl mx-auto">
                Join 10,000+ professionals getting weekly career advice, business insights, and
                exclusive workshop invites.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto bg-white/5 p-2 rounded-3xl backdrop-blur-sm border border-white/10"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email"
                  className="bg-transparent text-white px-6 py-4 flex-1 outline-none placeholder:text-white/30 font-medium transition-all focus:bg-white/5"
                />

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

                <motion.button
                  type="submit"
                  disabled={subscribing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bec-button bec-primary"
                >
                  {subscribing ? "Joining..." : "Subscribe"}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

const PostCard = memo(({ post }: { post: Post }) => (
  <Link
    to="/resources/$slug"
    params={{ slug: post.slug }}
    className="group bg-white rounded-[24px] overflow-hidden border border-gray-100/60 shadow-bec-soft hover:shadow-bec-soft-hover hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
  >
    <div className="relative h-56 overflow-hidden">
      <motion.img
        loading="lazy"
        decoding="async"
        src={
          post.coverImageUrl ||
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800&fm=webp"
        }
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-bec-gold/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-8 flex-1 flex flex-col">
      <div className="flex items-center gap-2 text-xs font-black text-bec-gold uppercase tracking-widest mb-4">
        <Clock size={12} />
        <span>{post.readTime} read</span>
      </div>

      <h3 className="text-xl font-[800] text-[#14202d] mb-4 group-hover:text-bec-emerald transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-[15px] text-[#6b7280] leading-[1.7] mb-6 line-clamp-3">
        {(post.excerpt || post.content.replace(/<[^>]*>?/gm, "")).substring(0, 120)}...
      </p>
      <div className="mt-auto flex items-center gap-2 font-[700] text-bec-emerald text-sm transition-colors group-hover:text-[#065f4e]">
        Read More{" "}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
));
