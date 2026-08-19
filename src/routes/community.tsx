import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/community";

export const Route = createFileRoute("/community")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Community | Bangladesh Executive Chamber" },
      {
        name: "description",
        content: "Join 10,000+ professionals in BEC's thriving community across Bangladesh.",
      },
      { property: "og:title", content: "Community | Bangladesh Executive Chamber" },
      {
        property: "og:description",
        content: "Join 10,000+ professionals in BEC's thriving community across Bangladesh.",
      },
      { property: "og:image", content: "/og-image.png" },
      { rel: "canonical", href: "https://bec.com/community" },
    ],
  }),
});
