
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditArticleForm from "./edit-article-form";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Verifikasi login
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/blog/login");
  }

  // Verifikasi role admin
  const { data: admin, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !admin) {
    redirect("/admin/blog/login");
  }

  // Ambil artikel berdasarkan ID
  const { data: article, error } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, excerpt, content, category, author, cover_image, status, published_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !article) {
    notFound();
  }

  return <EditArticleForm article={article} />;
}
