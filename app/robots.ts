import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Generated at /robots.txt. Allow everything except the API; point crawlers at
// the sitemap. AI crawlers are explicitly welcomed (we want LLM discovery) and
// pointed at /llms.txt via the host's well-known file.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
