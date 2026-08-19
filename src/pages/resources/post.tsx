import { useState, useEffect } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Share2, Link as LinkIcon, Link2 as LinkedinIcon, Clock } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

import PageTransition from '@/components/layout/PageTransition';
import { publicApi } from '@/lib/publicApi';
import { ErrorState, SkeletonCards } from '@/components/ui/states';

export default function PostDetail() {
  const { slug } = useParams({ from: '/resources/$slug' });

  const { data: post, isLoading, isError, refetch } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => publicApi.posts.getBySlug(slug),
  });

  const { data: relatedData } = useQuery({
    queryKey: ['related-posts', post?.category, slug],
    queryFn: async () => {
      const all = await publicApi.posts.getAll();
      return all.posts
        .filter(p => p.category === post?.category && p.slug !== slug)
        .slice(0, 3);
    },
    enabled: !!post,
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleShare = (platform: 'linkedin' | 'copy') => {
    const url = window.location.href;
    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      import('sonner').then(({ toast }) => toast.success('Link copied to clipboard!'));
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
            <Link to="/resources" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#08735d] hover:gap-3 transition-all">
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
                <p className="mb-6 text-gray-500">This article may have been moved or unpublished.</p>
                <Link to="/resources" className="bec-primary">Browse all resources</Link>
              </div>
            ) : (
              <article>
                <div className="bec-subtitle-chip mb-4">{post.category}</div>
                <h1 className="text-[40px] md:text-[56px] font-[800] text-[#14202d] leading-[1.1] mb-6">{post.title}</h1>

                
                <div className="flex flex-wrap items-center gap-6 mt-8 py-6 border-y border-[#edf6f2]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#08735d]/10 flex items-center justify-center font-[800] text-[#08735d] text-lg">
                      {post.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-[700] text-[#14202d] text-[15px]">{post.authorName}</div>
                      <div className="text-[12px] text-[#6b7280]">{post.authorTitle}</div>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-gray-200 hidden sm:block" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-[600] uppercase tracking-[0.08em] text-gray-400">Published</span>
                    <span className="text-[14px] font-[700] text-[#14202d]">
                      {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-gray-200 hidden sm:block" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-[600] uppercase tracking-[0.08em] text-gray-400">Read Time</span>
                    <span className="text-[14px] font-[700] text-[#c09643] flex items-center gap-1">
                      <Clock size={14} /> {post.readTime}
                    </span>
                  </div>

                </div>

                {post.coverImageUrl && (
                  <div className="mt-10 rounded-[32px] overflow-hidden shadow-2xl">
                    <img 
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div className="mt-12 space-y-6 text-[15px] leading-[1.75] text-[#6b7280]">
                  {post.content.split('\n').filter(Boolean).map((para, i) => {
                    if (para.startsWith('# ')) return <h2 key={i} className="text-[28px] md:text-[32px] font-[800] text-[#14202d] mt-12 mb-6">{para.replace('# ', '')}</h2>;
                    if (para.startsWith('## ')) return <h3 key={i} className="text-[20px] font-[700] text-[#14202d] mt-8 mb-4">{para.replace('## ', '')}</h3>;
                    if (para.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-[#c09643] pl-6 py-4 italic text-gray-600 bg-gray-50 rounded-r-xl my-8 text-[17px]">{para.replace('> ', '')}</blockquote>;
                    return <p key={i} className="text-[15px] leading-[1.75] text-[#6b7280]">{para}</p>;
                  })}
                </div>


                <div className="mt-16 pt-8 border-t border-[#edf6f2] flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Share Article</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleShare('linkedin')}
                        className="w-12 h-12 rounded-2xl bg-[#08735d]/5 text-[#08735d] flex items-center justify-center hover:bg-[#08735d] hover:text-white transition-all shadow-sm"
                      >
                        <LinkedinIcon size={20} />
                      </button>
                      <button 
                        onClick={() => handleShare('copy')}
                        className="w-12 h-12 rounded-2xl bg-[#08735d]/5 text-[#08735d] flex items-center justify-center hover:bg-[#08735d] hover:text-white transition-all shadow-sm"
                      >
                        <LinkIcon size={20} />
                      </button>
                    </div>
                  </div>

                  {post.tags && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.split(',').filter(Boolean).map((tag) => (
                        <span key={tag} className="rounded-full bg-[#edf6f2] px-4 py-1.5 text-[12px] font-[600] text-[#08735d]">
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
                <h3 className="text-[24px] font-[800] text-[#14202d] mb-8">Related Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedData.map((p) => (
                    <Link 
                      key={p.id} 
                      to="/resources/$slug" 
                      params={{ slug: p.slug }}
                      className="group block bg-white rounded-[24px] overflow-hidden border border-[#edf6f2] shadow-md hover:shadow-xl transition-all"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img 
                          src={p.coverImageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400"} 
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="text-sm font-bold text-[#14202d] line-clamp-2 group-hover:text-[#08735d] transition-colors leading-snug">{p.title}</h4>
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
