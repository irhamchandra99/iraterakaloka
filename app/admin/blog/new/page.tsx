
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NewArticleForm from "./new-article-form";

export default async function NewArticlePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/blog/login");
  }

  const { data: admin, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !admin) {
    redirect("/admin/blog/login");
  }

  return <NewArticleForm />;
}
