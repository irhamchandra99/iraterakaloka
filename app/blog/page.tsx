import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/blog/hero";
import Articles from "@/components/sections/blog/articles";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/site";

// ISR: daftar artikel dibuat ulang paling cepat tiap 60 detik saat ada request,
// jadi artikel yang baru dipublish atau dikembalikan ke draft ikut ter-update.
export const revalidate = 60;

const BLOG_TITLE = "Blog & Insights";
const BLOG_DESCRIPTION =
  "Ruang untuk berbagi pengetahuan, perspektif, dan refleksi seputar pengembangan diri, kesehatan mental, pendidikan, serta kehidupan manusia.";

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `${BLOG_TITLE} | ${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
    url: "/blog",
    siteName: SITE_NAME,
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BLOG_TITLE} | ${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, excerpt, cover_image, category, author, published_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  // Detail error hanya dicatat di log server. Throw agar Next.js menampilkan
  // app/blog/error.tsx (HTTP 500) dan ISR tetap menyajikan versi lama
  // alih-alih meng-cache halaman error.
  if (error) {
    console.error("[blog] Failed to load published articles", {
      code: error.code,
      message: error.message,
    });
    throw new Error("Failed to load articles.");
  }

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Articles posts={posts ?? []} />
      </main>

      <Footer />
    </>
  );
}