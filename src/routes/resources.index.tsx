import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/resources";

export const Route = createFileRoute("/resources/")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Resources & Blog | BEC Bangladesh" },
      {
        name: "description",
        content:
          "Articles, guides, and insights on careers, branding, and business growth from BEC.",
      },
      { property: "og:title", content: "Resources & Blog | BEC Bangladesh" },
      {
        property: "og:description",
        content:
          "Articles, guides, and insights on careers, branding, and business growth from BEC.",
      },
      { property: "og:image", content: "/og-image.png" },
      { rel: "canonical", href: "https://www.thebec.site/resources" },
    ],
  }),
});
