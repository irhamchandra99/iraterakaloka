"use client";

import Link from "next/link";

// Error boundary untuk /blog dan /blog/[slug]. Di production, detail error dari
// Server Component tidak dikirim ke browser; detail lengkap ada di log server.
export default function BlogError({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FCFAF7] px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#880A18]">
          Insights
        </p>

        <h1 className="heading mt-6 text-4xl leading-tight md:text-5xl">
          Artikel belum dapat dimuat.
        </h1>

        <p className="mt-6 text-lg leading-8 text-black/60">
          Terjadi kendala sementara saat memuat konten. Silakan coba lagi
          beberapa saat lagi.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-full bg-[#880A18] px-8 py-4 font-semibold text-white transition hover:bg-[#6E0814]"
          >
            Coba Lagi
          </button>

          <Link
            href="/"
            className="rounded-full border border-[#880A18] px-8 py-4 font-semibold text-[#880A18] transition hover:bg-[#880A18] hover:text-white"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
