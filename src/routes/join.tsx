import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/join";

export const Route = createFileRoute("/join")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Join BEC | Membership Plans Bangladesh" },
      { name: "description", content: "Become a member of the Bangladesh Executive Chamber and grow your career, network, and brand." },
      { property: "og:title", content: "Join BEC | Membership Plans Bangladesh" },
      { property: "og:description", content: "Become a member of the Bangladesh Executive Chamber and grow your career, network, and brand." },
      { property: "og:image", content: "/og-image.png" },
      { rel: "canonical", href: "https://bec.com/join" }
    ],
  }),
});