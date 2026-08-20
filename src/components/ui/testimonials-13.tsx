import { ComponentProps } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Marquee } from "@/components/ui/testimonials-13-utils/marquee";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { publicApi, type Review } from "@/lib/publicApi";
import { Quote } from "lucide-react";
import { Link } from "@tanstack/react-router";

const Testimonials = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["approved-reviews"],
    queryFn: publicApi.reviews.getApproved,
  });

  const reviews = data?.reviews || [];

  if (isLoading) {
    return (
      <div className="px-6 py-20 w-full text-center">
        <p className="text-[#6b7280]">Loading success stories...</p>
      </div>
    );
  }

  if (error || reviews.length === 0) {
    return (
      <div className="px-6 py-20 w-full overflow-hidden text-center">
        <h2 className="font-medium text-[28px] md:text-[40px] tracking-[-0.04em] text-[#14202d] font-[800]">
          Success Stories
        </h2>
        <p className="mt-3.5 text-[#6b7280] text-[15px] md:text-[18px]">
          Be the first to share your experience!
        </p>
        <div className="mt-6">
          <Link to="/reviews" className="bec-button bec-primary">
            Leave a Review
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-20 w-full overflow-hidden">
      <h2 className="text-center font-medium text-[28px] md:text-[40px] tracking-[-0.04em] text-[#14202d] font-[800]">
        Success Stories
      </h2>
      <p className="mt-3.5 text-center text-[#6b7280] text-[15px] md:text-[18px] tracking-[-0.015em]">
        Real stories from our members and partners
      </p>
      <div className="mask-x-from-80% mt-14 space-y-px border bg-[#f3f8f6] rounded-[24px]">
        <Marquee className="py-0 [--duration:60s] [--gap:0px]" pauseOnHover>
          <TestimonialList reviews={reviews} />
        </Marquee>
      </div>
    </div>
  );
};

interface TestimonialListProps extends ComponentProps<"div"> {
  reviews: Review[];
}

const TestimonialList = ({ reviews, className, ...props }: TestimonialListProps) =>
  reviews.map((review) => (
    <div className="-mx-1 flex w-full max-w-sm flex-col odd:flex-col-reverse" key={review.id}>
      <div
        className={cn(
          "rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-bec-soft transition-all duration-300 hover:-translate-y-1",
          className,
        )}
        {...props}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="bg-[#08735d] font-medium text-white text-xl">
                  {review.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-[#14202d]">{review.name}</p>
                <p className="text-[#6b7280] text-sm">
                  {[review.designation, review.company].filter(Boolean).join(", ")}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-[#6b7280]">
            "{review.message}"
          </p>
        </div>
      </div>
      <div className="relative flex h-42 w-96 items-center justify-center p-6">
        <Quote className="h-16 w-16 text-[#c09643]/30" />

        <div
          className="absolute inset-0 isolate -z-1 opacity-15"
          style={{
            backgroundImage: `
        linear-gradient(to right, #08735d 1px, transparent 1px),
        linear-gradient(to bottom, #08735d 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            WebkitMaskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
      </div>
    </div>
  ));

export default Testimonials;
