import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/about";

export const Route = createFileRoute("/about")({
  component: Page,
  head: () => ({
    meta: [
      { title: "About Us | Bangladesh Executive Chamber" },
      { name: "description", content: "Learn about BEC's mission to empower professionals and build Bangladesh's strongest corporate community." },
      { property: "og:title", content: "About Us | Bangladesh Executive Chamber" },
      { property: "og:description", content: "Learn about BEC's mission to empower professionals and build Bangladesh's strongest corporate community." },
      { property: "og:image", content: "/og-image.png" },
      { rel: "canonical", href: "https://bec.com/about" }
    ],
  }),
});