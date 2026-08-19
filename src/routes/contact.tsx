import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/contact";

export const Route = createFileRoute("/contact")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Contact Us | Bangladesh Executive Chamber" },
      { name: "description", content: "Get in touch with the Bangladesh Executive Chamber team for partnerships, services, or general enquiries." },
      { property: "og:title", content: "Contact Us | Bangladesh Executive Chamber" },
      { property: "og:description", content: "Get in touch with the Bangladesh Executive Chamber team for partnerships, services, or general enquiries." },
      { property: "og:image", content: "/og-image.png" },
      { rel: "canonical", href: "https://bec.com/contact" }
    ],
  }),
});