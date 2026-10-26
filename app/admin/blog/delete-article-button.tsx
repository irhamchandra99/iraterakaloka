
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type DeleteArticleButtonProps = {
  articleId: string;
  articleTitle: string;
};

export default function DeleteArticleButton({
  articleId,
  articleTitle,
}: DeleteArticleButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${articleTitle}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("Session expired. Please log in again.");
      }

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError || !admin) {
        throw new Error("You do not have admin access.");
      }

      const { data, error: deleteError } = await supabase
        .from("blogs")
        .delete()
        .eq("id", articleId)
        .select("id")
        .maybeSingle();

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      if (!data) {
        throw new Error("Article not found or cannot be deleted.");
      }

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete article."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="font-semibold text-red-600 transition hover:text-red-800 disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>

      {error && (
        <p role="alert" className="max-w-48 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
