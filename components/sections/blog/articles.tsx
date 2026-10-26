import Container from "@/components/shared/container";
import Image from "next/image";
import Link from "next/link";
import { isOptimizableImage } from "@/lib/image";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  published_at: string | null;
};

export default function Articles({
  posts,
}: {
  posts: Post[];
}) {
  return (
    <section className="bg-white py-28 md:py-36">
      <Container>
        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="heading text-3xl">
              No insights published yet.
            </h2>

            <p className="mt-4 text-black/60">
              Artikel terbaru dari Iratera akan segera hadir.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-[30px] border border-black/5 bg-[#FCFAF7] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {post.cover_image && (
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    width={800}
                    height={512}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    unoptimized={!isOptimizableImage(post.cover_image)}
                    className="h-64 w-full object-cover"
                  />
                )}

                <div className="p-8">
                  {post.category && (
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#880A18]">
                      {post.category}
                    </p>
                  )}

                  <h2 className="heading mt-4 text-2xl">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="mt-4 leading-7 text-black/60">
                      {post.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex font-semibold text-[#880A18]"
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}