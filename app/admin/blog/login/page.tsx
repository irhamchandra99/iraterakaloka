"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/container";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email atau password salah.");
      setLoading(false);
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#FCFAF7] py-20">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="rounded-[32px] bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
              Iratera Admin
            </p>

            <h1 className="heading mt-4 text-4xl">
              Welcome Back
            </h1>

            <p className="mt-4 leading-7 text-black/60">
              Sign in to manage Iratera articles.
            </p>

            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >
              <div>
                <label className="mb-2 block font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                  className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none transition focus:border-[#880A18]"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                  className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none transition focus:border-[#880A18]"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#880A18] px-6 py-4 font-semibold text-white transition hover:bg-[#6E0814] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </main>
  );
}