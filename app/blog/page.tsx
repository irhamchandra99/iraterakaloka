import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/blog/hero";
import Articles from "@/components/sections/blog/articles";
import { supabase } from "@/lib/supabase";

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, excerpt, cover_image, category, author, published_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen p-10">
        <h1 className="text-2xl font-bold text-red-600">
          Supabase Error
        </h1>
        <pre className="mt-5 whitespace-pre-wrap rounded-xl bg-gray-100 p-5 text-black">
          {JSON.stringify(
            {
              message: error.message,
              code: error.code,
              details: error.details,
              hint: error.hint,
            },
            null,
            2
          )}
        </pre>
      </div>
    );
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