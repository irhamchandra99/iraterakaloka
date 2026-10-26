import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { absoluteUrl } from "@/lib/site";

// Regenerate at most once per hour so newly published articles appear
// without a rebuild.
export const revalidate = 3600;

// Supabase (PostgREST) returns at most 1000 rows per request by default,
// so fetch published articles page by page.
const BATCH_SIZE = 1000;

const STATIC_PAGES = [
  "/",
  "/about",
  "/services",
  "/programs",
  "/community",
  "/collaboration",
  "/blog",
  "/contact",
];

type SitemapPost = {
  slug: string;
  published_at: string | null;
  updated_at: string | null;
};

async function getPublishedPosts() {
  const posts: SitemapPost[] = [];

  for (let from = 0; ; from += BATCH_SIZE) {
    const { data, error } = await supabase
      .from("blogs")
      .select("slug, published_at, updated_at")
      .eq("status", "published")
      .order("id", { ascending: true })
      .range(from, from + BATCH_SIZE - 1);

    // Fail loudly instead of publishing an incomplete sitemap
    if (error) {
      throw new Error(`Failed to load articles for sitemap: ${error.message}`);
    }

    posts.push(...(data ?? []));
    if (!data || data.length < BATCH_SIZE) break;
  }

  return posts;
}

function lastModified(post: SitemapPost) {
  const value = post.updated_at ?? post.published_at;
  return value ? new Date(value) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  const latestPost = posts
    .map(lastModified)
    .filter((date): date is Date => date !== undefined)
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const pages: MetadataRoute.Sitemap = STATIC_PAGES.map((path) => ({
    url: absoluteUrl(path),
    ...(path === "/blog" && latestPost && { lastModified: latestPost }),
  }));

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${encodeURIComponent(post.slug)}`),
    lastModified: lastModified(post),
  }));

  return [...pages, ...articles];
}
