import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Container from "@/components/shared/container";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isOptimizableImage } from "@/lib/image";
import { sanitizeBlogHtml } from "@/lib/sanitize-blog-html";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <>
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