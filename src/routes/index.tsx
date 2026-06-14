import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home/HomePage";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: siteConfig.seo.title },
      { name: "description", content: siteConfig.seo.description },
      { property: "og:title", content: siteConfig.name },
      { property: "og:description", content: siteConfig.seo.ogDescription },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: siteConfig.name },
      {
        name: "twitter:description",
        content: "Licensed pest control in Leppington, NSW. Free inspection, 7 days a week.",
      },
    ],
  }),
  component: HomePage,
});
