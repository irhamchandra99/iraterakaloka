"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw new Error(signOutError.message);
      }

      router.replace("/admin/blog/login");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to log out."
      );
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 md:items-end">
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full border border-[#880A18] px-6 py-4 font-semibold text-[#880A18] transition hover:bg-[#FFCA18] hover:border-[#FFCA18] disabled:opacity-60"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>

      {error && (
        <p role="alert" className="max-w-48 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
