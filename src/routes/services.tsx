import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/services";

export const Route = createFileRoute("/services")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Our Services | BEC Bangladesh" },
      {
        name: "description",
        content:
          "Talent Acquisition, Business Consulting, Training & Workshops, and Networking — BEC offers complete professional growth solutions.",
      },
      { property: "og:title", content: "Our Services | BEC Bangladesh" },
      {
        property: "og:description",
        content:
          "Talent Acquisition, Business Consulting, Training & Workshops, and Networking — BEC offers complete professional growth solutions.",
      },
      { property: "og:image", content: "/og-image.png" },
      { rel: "canonical", href: "https://bec.com/services" },
    ],
  }),
});
