import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/events";

export const Route = createFileRoute("/events")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Training & Events | BEC Bangladesh" },
      {
        name: "description",
        content:
          "Upcoming BEC workshops, summits, and networking events for professionals in Bangladesh.",
      },
      { property: "og:title", content: "Training & Events | BEC Bangladesh" },
      {
        property: "og:description",
        content:
          "Upcoming BEC workshops, summits, and networking events for professionals in Bangladesh.",
      },
      { property: "og:image", content: "/og-image.png" },
      { rel: "canonical", href: "https://bec.com/events" },
    ],
  }),
});
