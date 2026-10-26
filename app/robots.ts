import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Crawl hint only. Admin pages stay protected by Supabase Auth and RLS.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
