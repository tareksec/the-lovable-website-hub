import { useState, useEffect } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Share2, Link as LinkIcon, Link2 as LinkedinIcon, Clock } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import DOMPurify from "dompurify";

import PageTransition from "@/components/layout/PageTransition";
import { publicApi } from "@/lib/publicApi";
import { ErrorState, SkeletonCards } from "@/components/ui/states";

export default function PostDetail() {
  const { slug } = useParams({ from: "/resources/$slug" });

  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => publicApi.posts.getBySlug(slug),
  });

  const { data: relatedData } = useQuery({
    queryKey: ["related-posts", post?.category, slug],
    queryFn: async () => {
      const all = await publicApi.posts.getAll();
      return all.posts.filter((p) => p.category === post?.category && p.slug !== slug).slice(0, 3);
    },
    enabled: !!post,
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleShare = (platform: "linkedin" | "copy") => {
    const url = window.location.href;
    if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else {
      navigator.clipboard.writeText(url);
      import("sonner").then(({ toast }) => toast.success("Link copied to clipboard!"));
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#08735d] origin-left z-[100]"
        style={{ scaleX }}
      />
      <PageTransition className="bec-post-page">
        <section className="bec-section bg-white">
          <div className="bec-container max-w-3xl">
            <Link
              to="/resources"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#08735d] hover:gap-3 transition-all"
            >
              <ArrowLeft size={16} /> Back to Resources
            </Link>

            {isLoading ? (
              <div className="space-y-4 py-8">
                <SkeletonCards count={1} lines={8} />
              </div>
            ) : isError ? (
              <ErrorState
                title="Article could not be loaded"
                message="We couldn't reach the server to load this article."
                onRetry={() => refetch()}
              />
            ) : !post ? (
              <div className="py-20 text-center">
                <h1 className="mb-3 text-2xl font-extrabold text-[#14202d]">Article not found</h1>
                <p className="mb-6 text-gray-500">
                  This article may have been moved or unpublished.
                </p>
                <Link to="/resources" className="bec-button bec-primary">
                  Browse all resources
                </Link>
              </div>
            ) : (
              <article>
                <div className="bec-subtitle-chip mb-4">{post.category}</div>
                <h1 className="text-[40px] md:text-[56px] font-[800] text-[#14202d] leading-[1.1] mb-6 tracking-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 mt-8 py-6 border-y border-[#edf6f2]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#08735d]/10 flex items-center justify-center font-[800] text-[#08735d] text-lg">
                      {post.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-[800] text-[#14202d] text-[16px]">{post.authorName}</div>
                      <div className="text-[14px] text-[#6b7280]">{post.authorTitle}</div>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-gray-200 hidden sm:block" />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-[800] uppercase tracking-widest text-[#9ca3af]">
                      Published
                    </span>
                    <span className="text-[15px] font-[700] text-[#14202d]">
                      {new Date(post.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-gray-200 hidden sm:block" />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-[800] uppercase tracking-widest text-[#9ca3af]">
                      Read Time
                    </span>
                    <span className="text-[15px] font-[800] text-[#c09643] flex items-center gap-1">
                      <Clock size={14} /> {post.readTime}
                    </span>
                  </div>
                </div>

                {post.coverImageUrl && (
                  <div className="mt-10 rounded-[24px] overflow-hidden shadow-bec-soft">
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div
                  className="mt-12 space-y-6 text-[18px] leading-[1.8] text-[#4b5563] prose prose-lg prose-headings:text-[#14202d] prose-h1:text-[40px] prose-h1:font-[800] prose-h1:tracking-tight prose-h2:text-[32px] prose-h2:font-[800] prose-h2:tracking-tight prose-h3:text-[24px] prose-h3:font-[800] prose-a:text-[#08735d] prose-a:font-[600] max-w-prose mx-auto"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                />

                <div className="mt-16 pt-8 border-t border-[#edf6f2] flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      Share Article
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="w-12 h-12 rounded-2xl bg-[#08735d]/5 text-[#08735d] flex items-center justify-center hover:bg-[#08735d] hover:text-white transition-all shadow-sm"
                      >
                        <LinkedinIcon size={20} />
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-12 h-12 rounded-2xl bg-[#08735d]/5 text-[#08735d] flex items-center justify-center hover:bg-[#08735d] hover:text-white transition-all shadow-sm"
                      >
                        <LinkIcon size={20} />
                      </button>
                    </div>
                  </div>

                  {post.tags && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags
                        .split(",")
                        .filter(Boolean)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-bec-emerald-light px-4 py-1.5 text-xs font-semibold text-bec-emerald"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </article>
            )}

            {/* Related Posts */}
            {relatedData && relatedData.length > 0 && (
              <div className="mt-24 pt-16 border-t border-[#edf6f2]">
                <h3 className="text-2xl font-extrabold text-bec-navy mb-8">Related Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedData.map((p) => (
                    <Link
                      key={p.id}
                      to="/resources/$slug"
                      params={{ slug: p.slug }}
                      className="group block bg-white rounded-[24px] overflow-hidden border border-gray-100/60 shadow-bec-soft hover:shadow-bec-soft-hover hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={
                            p.coverImageUrl ||
                            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800&fm=webp"
                          }
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="text-sm font-bold text-[#14202d] line-clamp-2 group-hover:text-[#08735d] transition-colors leading-snug">
                          {p.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </PageTransition>
    </>
  );
}
