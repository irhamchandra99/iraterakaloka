import Link from "next/link";
import Container from "@/components/shared/container";
import { supabase } from "@/lib/supabase";

export default async function AdminBlogPage() {
  const { data: posts, error } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, category, author, status, published_at, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-[#FCFAF7] py-20">
        <Container>
          <h1 className="heading text-4xl">Blog Management</h1>

          <p className="mt-6 text-red-600">
            Failed to load articles: {error.message}
          </p>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFAF7] py-20">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
              Admin
            </p>

            <h1 className="heading mt-3 text-4xl md:text-5xl">
              Blog Management
            </h1>

            <p className="mt-4 text-black/60">
              Manage your articles, drafts, and published content.
            </p>
          </div>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center justify-center rounded-full bg-[#880A18] px-6 py-4 font-semibold text-white transition hover:bg-[#6E0814]"
          >
            + New Article
          </Link>
        </div>

        <div className="mt-12 overflow-hidden rounded-[28px] bg-white shadow-sm">
          {posts && posts.length > 0 ? (
            <div className="divide-y divide-black/5">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h2 className="font-semibold text-lg">
                      {post.title}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-black/50">
                      {post.category && (
                        <span>{post.category}</span>
                      )}

                      {post.author && (
                        <span>By {post.author}</span>
                      )}

                      <span>
                        {new Date(
                          post.created_at
                        ).toLocaleDateString("en-US")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-semibold ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status}
                    </span>

                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="font-semibold text-[#880A18]"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-20 text-center">
              <h2 className="heading text-2xl">
                No articles yet
              </h2>

              <p className="mt-3 text-black/60">
                Create your first article to get started.
              </p>

              <Link
                href="/admin/blog/new"
                className="mt-6 inline-flex rounded-full bg-[#880A18] px-6 py-3 font-semibold text-white"
              >
                Create Article
              </Link>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}