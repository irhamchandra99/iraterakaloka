
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import CoverImageUpload from "../../cover-image-upload";
import RichTextEditor from "../../rich-text-editor";
import { isContentEmpty } from "@/lib/blog-content";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  author: string | null;
  cover_image: string | null;
  status: string;
  published_at: string | null;
};

type ArticleStatus = "draft" | "published";

export default function EditArticleForm({
  article,
}: {
  article: Article;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(article.title);
  const [slug, setSlug] = useState(article.slug);
  const [excerpt, setExcerpt] = useState(article.excerpt ?? "");
  const [content, setContent] = useState(article.content);
  const [category, setCategory] = useState(article.category ?? "");
  const [author, setAuthor] = useState(article.author ?? "");
  const [coverImage, setCoverImage] = useState(
    article.cover_image ?? ""
  );
  const [coverPending, setCoverPending] = useState(false);
  const [status, setStatus] = useState<ArticleStatus>(
    article.status === "published" ? "published" : "draft"
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanSlug = generateSlug(slug);

    if (!title.trim() || !cleanSlug || isContentEmpty(content)) {
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
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError || !admin) {
        throw new Error("You do not have admin access.");
      }

      const publishedAt =
        status === "published"
          ? article.published_at ?? new Date().toISOString()
          : null;

      const { data: updatedArticle, error: updateError } =
        await supabase
          .from("blogs")
          .update({
            title: title.trim(),
            slug: cleanSlug,
            excerpt: excerpt.trim() || null,
            content: content.trim(),
            category: category.trim() || null,
            author: author.trim() || null,
            cover_image: coverImage.trim() || null,
            status,
            published_at: publishedAt,
            updated_at: new Date().toISOString(),
          })
          .eq("id", article.id)
          .select("id")
          .single();

      if (updateError) {
        throw new Error(updateError.message);
      }

      if (!updatedArticle) {
        throw new Error("Article could not be updated.");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update article."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#880A18]";

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
            Edit Article
          </h1>

          <p className="mt-3 text-black/60">
            Update article information and publication status.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="mt-10 space-y-6 rounded-2xl bg-white p-6 shadow-sm md:p-8"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-semibold"
            >
              Article Title *
            </label>

            <input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="mb-2 block font-semibold"
            >
              Slug *
            </label>

            <input
              id="slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="excerpt"
              className="mb-2 block font-semibold"
            >
              Excerpt
            </label>

            <textarea
              id="excerpt"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="mb-2 block font-semibold"
            >
              Content *
            </label>

            <RichTextEditor
              id="content"
              value={content}
              onChange={setContent}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="category"
                className="mb-2 block font-semibold"
              >
                Category
              </label>

              <input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="mb-2 block font-semibold"
              >
                Author
              </label>

              <input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="cover-file"
              className="mb-2 block font-semibold"
            >
              Cover Image
            </label>

            <CoverImageUpload
              value={coverImage}
              onChange={setCoverImage}
              onPendingChange={setCoverPending}
            />
          </div>

          <div>
            <label
              htmlFor="cover"
              className="mb-2 block font-semibold"
            >
              Cover Image URL
            </label>

            <input
              id="cover"
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className={inputClass}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block font-semibold"
            >
              Publication Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as ArticleStatus)
              }
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
            <Link
              href="/admin/blog"
              className="font-semibold text-black/60"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#880A18] px-8 py-3 font-semibold text-white transition hover:bg-[#6E0814] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
