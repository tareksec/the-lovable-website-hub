import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/reviews";

export const Route = createFileRoute("/reviews")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Reviews & Testimonials | BEC Bangladesh" },
      {
        name: "description",
        content:
          "What members and partners say about working with the Bangladesh Executive Chamber.",
      },
      { property: "og:title", content: "Reviews & Testimonials | BEC Bangladesh" },
      {
        property: "og:description",
        content:
          "What members and partners say about working with the Bangladesh Executive Chamber.",
      },
      { property: "og:image", content: "/og-image.png" },
      { rel: "canonical", href: "https://www.thebec.site/reviews" },
    ],
  }),
});
