import { createFileRoute } from "@tanstack/react-router";
import PostDetail from "@/pages/resources/post";

export const Route = createFileRoute("/resources/$slug")({
  component: PostDetail,
  head: ({ params }) => {
    const readable = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      meta: [
        { title: `BEC | ${readable}` },
        {
          name: "description",
          content: `Read "${readable}" — career, branding and business insights from the Bangladesh Executive Chamber.`,
        },
        { property: "og:title", content: `${readable} | BEC Insights` },
        {
          property: "og:description",
          content: `Read "${readable}" — career, branding and business insights from the Bangladesh Executive Chamber.`,
        },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});
