
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import CoverImageUpload from "../cover-image-upload";
import RichTextEditor from "../rich-text-editor";
import { isContentEmpty } from "@/lib/blog-content";

export default function NewArticleForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverPending, setCoverPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleSubmit(status: "draft" | "published") {
    if (!title.trim() || !slug.trim() || isContentEmpty(content)) {
      setError("Title, slug, and content are required.");
      return;
    }

    if (coverPending) {
      setError("Upload the selected cover image or cancel it first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data: { user }, error: authError } =
        await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError || !admin) {
        throw new Error("You do not have admin access.");
      }

      const { error: insertError } = await supabase
        .from("blogs")
        .insert({
          title: title.trim(),
          slug: generateSlug(slug),
          excerpt: excerpt.trim() || null,
          content: content.trim(),
          category: category.trim() || null,
          author: author.trim() || null,
          cover_image: coverImage.trim() || null,
          status,
          published_at:
            status === "published" ? new Date().toISOString() : null,
        });

      if (insertError) {
        throw new Error(insertError.message);
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save article.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FCFAF7] px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/blog"
          className="text-sm font-semibold text-[#880A18]"
        >
          ← Back to Dashboard
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
            Admin CMS
          </p>
          <h1 className="mt-3 text-4xl font-bold text-[#880A18]">
            Create New Article
          </h1>
          <p className="mt-3 text-black/60">
            Write and publish insights for Iratera Kaloka.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit("draft");
          }}
          className="mt-10 space-y-6 rounded-2xl bg-white p-6 shadow-sm md:p-8"
        >
          <div>
            <label htmlFor="title" className="mb-2 block font-semibold">
              Article Title *
            </label>
            <input
              id="title"
              required
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
                setSlug(generateSlug(value));
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              placeholder="Enter article title"
            />
          </div>

          <div>
            <label htmlFor="slug" className="mb-2 block font-semibold">
              Slug *
            </label>
            <input
              id="slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              placeholder="article-title"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="mb-2 block font-semibold">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              placeholder="Short article summary"
            />
          </div>

          <div>
            <label htmlFor="content" className="mb-2 block font-semibold">
              Content *
            </label>
            <RichTextEditor
              id="content"
              value={content}
              onChange={setContent}
              placeholder="Write your article here..."
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="category" className="mb-2 block font-semibold">
                Category
              </label>
              <input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="Education"
              />
            </div>

            <div>
              <label htmlFor="author" className="mb-2 block font-semibold">
                Author
              </label>
              <input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="Iratera Kaloka"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cover-file" className="mb-2 block font-semibold">
              Cover Image
            </label>
            <CoverImageUpload
              value={coverImage}
              onChange={setCoverImage}
              onPendingChange={setCoverPending}
            />
          </div>

          <div>
            <label htmlFor="cover" className="mb-2 block font-semibold">
              Cover Image URL
            </label>
            <input
              id="cover"
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-4 border-t border-gray-100 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full border border-[#880A18] px-6 py-3 font-semibold text-[#880A18] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save as Draft"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => void handleSubmit("published")}
              className="rounded-full bg-[#880A18] px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Saving..." : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
