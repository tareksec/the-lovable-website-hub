import { createFileRoute } from "@tanstack/react-router";
import Page from "@/pages/home";

export const Route = createFileRoute("/")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Bangladesh Executive Chamber | Promoting Brands. Empowering Careers." },
      {
        name: "description",
        content:
          "BEC is Bangladesh's premier professional ecosystem for career development, business consulting, talent acquisition, and professional networking.",
      },
      {
        property: "og:title",
        content: "Bangladesh Executive Chamber | Promoting Brands. Empowering Careers.",
      },
      {
        property: "og:description",
        content:
          "BEC is Bangladesh's premier professional ecosystem for career development, business consulting, talent acquisition, and professional networking.",
      },
      { property: "og:image", content: "https://www.thebec.site/og-image.png" },
      { property: "og:url", content: "https://www.thebec.site" },
      { rel: "canonical", href: "https://www.thebec.site" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Bangladesh Executive Chamber",
          alternateName: "BEC",
          url: "https://www.thebec.site",
          logo: "https://www.thebec.site/logo.png",
          description:
            "Professional ecosystem for career development and business consulting in Bangladesh",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dhaka",
            addressCountry: "BD",
          },
          sameAs: ["https://www.linkedin.com/company/bangladesh-executive-chamber/"],
        }),
      },
    ],
  }),
});
