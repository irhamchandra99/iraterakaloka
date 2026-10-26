import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Container from "@/components/shared/container";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import { toPlainTextSummary } from "@/lib/blog-content";
import { isOptimizableImage } from "@/lib/image";
import { sanitizeBlogHtml } from "@/lib/sanitize-blog-html";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/site";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// ISR: halaman artikel di-cache dan diperbarui paling cepat tiap 60 detik,
// konsisten dengan /blog dan sitemap.
export const revalidate = 60;

// Tidak ada path yang dibuat saat build; tiap artikel dibuat saat request
// pertama lalu di-cache (slug baru tetap bisa diakses tanpa build ulang).
export async function generateStaticParams() {
  return [];
}

// Satu query per request: dipakai bersama oleh generateMetadata dan page
const getPublishedPost = cache(async (slug: string) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    // PGRST116 = tidak ada baris (slug tidak ada atau belum published): 404.
    if (error.code === "PGRST116") return null;

    // Error lain (DB/jaringan) jangan disamarkan sebagai 404 yang ikut di-cache.
    console.error("[blog] Failed to load article", {
      slug,
      code: error.code,
      message: error.message,
    });
    throw new Error("Failed to load article.");
  }

  return data;
});

type PublishedPost = NonNullable<Awaited<ReturnType<typeof getPublishedPost>>>;

function articlePath(slug: string) {
  return `/blog/${encodeURIComponent(slug)}`;
}

function articleDescription(post: PublishedPost) {
  return (
    post.excerpt?.trim() ||
    toPlainTextSummary(post.content ?? "") ||
    SITE_DESCRIPTION
  );
}

// Hanya URL http(s) absolut yang dipakai sebagai gambar share
function coverImageUrl(post: PublishedPost): string | null {
  if (!post.cover_image) return null;
  try {
    const url = new URL(post.cover_image);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  const description = articleDescription(post);
  const path = articlePath(post.slug);
  const cover = coverImageUrl(post);
  const images = cover
    ? [{ url: cover, alt: post.title }]
    : [DEFAULT_OG_IMAGE];

  return {
    title: post.title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: path,
      siteName: SITE_NAME,
      images,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at ?? post.published_at ?? undefined,
      authors: post.author ? [post.author] : undefined,
      section: post.category ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: images.map((image) => image.url),
    },
  };
}

function articleJsonLd(post: PublishedPost) {
  const url = absoluteUrl(articlePath(post.slug));
  const cover = coverImageUrl(post);
  const publisher = {
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(DEFAULT_OG_IMAGE.url),
    },
  };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: articleDescription(post),
    ...(cover && { image: [cover] }),
    ...(post.published_at && { datePublished: post.published_at }),
    ...((post.updated_at ?? post.published_at) && {
      dateModified: post.updated_at ?? post.published_at,
    }),
    // Tanpa nama penulis, artikel diatribusikan ke organisasi
    author: post.author
      ? { "@type": "Person", name: post.author }
      : { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    publisher,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    ...(post.category && { articleSection: post.category }),
  };
}

// Escape "<" agar isi artikel tidak bisa menutup tag <script> (XSS)
function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd(post)) }}
      />

      <Navbar />

      <main>
        <article className="bg-white">
          {/* Header */}
          <section className="bg-[#FCFAF7] py-28 md:py-36">
            <Container>
              <div className="mx-auto max-w-4xl">
                {post.category && (
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
                    {post.category}
                  </p>
                )}

                <h1 className="heading mt-6 text-5xl leading-tight md:text-7xl">
                  {post.title}
                </h1>

                <div className="mt-8 flex flex-wrap gap-4 text-sm text-black/50">
                  {post.author && (
                    <span>By {post.author}</span>
                  )}

                  {post.published_at && (
                    <span>
                      {new Date(post.published_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  )}
                </div>
              </div>
            </Container>
          </section>

          {/* Cover */}
          {post.cover_image && (
            <section className="py-12 md:py-16">
              <Container>
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  preload
                  unoptimized={!isOptimizableImage(post.cover_image)}
                  className="mx-auto max-h-[600px] w-full max-w-6xl rounded-[32px] object-cover"
                />
              </Container>
            </section>
          )}

          {/* Content */}
          <section className="pb-28 md:pb-36">
            <Container>
              <div className="mx-auto max-w-3xl">
                {post.excerpt && (
                  <p className="mb-10 text-xl leading-9 text-black/60">
                    {post.excerpt}
                  </p>
                )}

                {/* Konten HTML dari editor, disanitasi di server sebelum dirender */}
                <div
                  className="rich-content article-content text-lg leading-9 text-black/75"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeBlogHtml(post.content),
                  }}
                />
              </div>
            </Container>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}