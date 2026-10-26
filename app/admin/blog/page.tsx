import DeleteArticleButton from "./delete-article-button";
import LogoutButton from "./logout-button";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "@/components/shared/container";
import { createClient } from "@/lib/supabase/server";

const PAGE_SIZE = 10;

type StatusFilter = "all" | "published" | "draft";

type DashboardParams = {
  q: string;
  status: StatusFilter;
  page: number;
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Articles" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseParams(raw: Awaited<Props["searchParams"]>): DashboardParams {
  const q = (firstParam(raw.q) ?? "").trim().slice(0, 100);
  const statusParam = firstParam(raw.status);
  const status: StatusFilter =
    statusParam === "published" || statusParam === "draft"
      ? statusParam
      : "all";
  const page = Math.max(1, Number.parseInt(firstParam(raw.page) ?? "1", 10) || 1);

  return { q, status, page };
}

// URL dashboard dengan filter aktif; page 1 dan status "all" tidak ditulis
function dashboardHref({ q, status, page }: DashboardParams) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (status !== "all") params.set("status", status);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/admin/blog?${query}` : "/admin/blog";
}

// Escape wildcard ILIKE agar input admin dicari sebagai teks biasa
function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, "\\$&");
}

export default async function AdminBlogPage({ searchParams }: Props) {
  const { q, status, page } = parseParams(await searchParams);
  const supabase = await createClient();

  // 1. Verifikasi sesi login pengguna
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/blog/login");
  }

  // 2. Pastikan pengguna terdaftar sebagai admin
  const { data: admin, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !admin) {
    redirect("/admin/blog/login");
  }

  // 3. Statistik dari seluruh artikel (tidak terpengaruh filter/halaman)
  const countByStatus = (value?: "published" | "draft") => {
    const query = supabase
      .from("blogs")
      .select("id", { count: "exact", head: true });
    return value ? query.eq("status", value) : query;
  };

  // 4. Daftar artikel sesuai pencarian, filter, dan halaman aktif
  const buildListQuery = () => {
    let query = supabase
      .from("blogs")
      .select(
        "id, title, slug, category, author, status, published_at, created_at",
        { count: "exact" }
      );
    if (q) query = query.ilike("title", `%${escapeLike(q)}%`);
    if (status !== "all") query = query.eq("status", status);
    return query;
  };

  const from = (page - 1) * PAGE_SIZE;

  const [totalResult, publishedResult, draftResult, listResult] =
    await Promise.all([
      countByStatus(),
      countByStatus("published"),
      countByStatus("draft"),
      buildListQuery()
        .order("created_at", { ascending: false })
        .range(from, from + PAGE_SIZE - 1),
    ]);

  // Halaman melebihi jumlah data (mis. setelah delete): pindah ke halaman terakhir
  if (listResult.error?.code === "PGRST103") {
    const { count } = await buildListQuery().limit(0);
    const lastPage = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
    redirect(dashboardHref({ q, status, page: lastPage }));
  }

  const posts = listResult.data;
  const error =
    listResult.error ??
    totalResult.error ??
    publishedResult.error ??
    draftResult.error;

  const stats = [
    { label: "Total Articles", value: totalResult.count ?? 0 },
    { label: "Published Articles", value: publishedResult.count ?? 0 },
    { label: "Draft Articles", value: draftResult.count ?? 0 },
  ];

  const filteredCount = listResult.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE));
  const hasFilters = q !== "" || status !== "all";
  const firstItem = filteredCount === 0 ? 0 : from + 1;
  const lastItem = Math.min(from + PAGE_SIZE, filteredCount);

  if (error) {
    return (
      <main className="min-h-screen bg-[#FCFAF7] py-20">
        <Container>
          <h1 className="heading text-4xl">
            Blog Management
          </h1>

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

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center justify-center rounded-full bg-[#880A18] px-6 py-4 font-semibold text-white transition hover:bg-[#6E0814]"
            >
              + New Article
            </Link>

            <LogoutButton />
          </div>
        </div>

        {/* Statistik */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[24px] border-t-4 border-[#FFCA18] bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-black/50">
                {stat.label}
              </p>
              <p className="heading mt-3 text-4xl font-bold text-[#880A18]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Pencarian dan filter status */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <nav
            aria-label="Filter by status"
            className="flex flex-wrap gap-2"
          >
            {STATUS_TABS.map((tab) => {
              const active = tab.value === status;
              return (
                <Link
                  key={tab.value}
                  href={dashboardHref({ q, status: tab.value, page: 1 })}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-[#880A18] text-white"
                      : "border border-black/10 bg-white text-black/60 hover:border-[#FFCA18] hover:text-[#880A18]"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {/* key: reset isi input saat URL berubah (mis. tombol Reset) */}
          <Form
            key={`${q}|${status}`}
            action="/admin/blog"
            className="flex w-full gap-2 lg:w-auto"
          >
            {status !== "all" && (
              <input type="hidden" name="status" value={status} />
            )}
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search by title..."
              aria-label="Search articles by title"
              className="min-w-0 flex-1 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm outline-none focus:border-[#880A18] lg:w-72"
            />
            <button
              type="submit"
              className="rounded-full bg-[#880A18] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6E0814]"
            >
              Search
            </button>
            {hasFilters && (
              <Link
                href="/admin/blog"
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-black/60 transition hover:text-[#880A18]"
              >
                Reset
              </Link>
            )}
          </Form>
        </div>

        {q && (
          <p className="mt-4 text-sm text-black/60">
            Showing results for &quot;<span className="font-semibold text-black/80">{q}</span>&quot;
          </p>
        )}

        <div className="mt-6 overflow-hidden rounded-[28px] bg-white shadow-sm">
          {posts && posts.length > 0 ? (
            <div className="divide-y divide-black/5">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold">
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
                    <DeleteArticleButton
                      articleId={post.id}
                      articleTitle={post.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : hasFilters ? (
            <div className="px-6 py-20 text-center">
              <h2 className="heading text-2xl">
                No articles found
              </h2>

              <p className="mt-3 text-black/60">
                Try a different title or status filter.
              </p>

              <Link
                href="/admin/blog"
                className="mt-6 inline-flex rounded-full border border-[#880A18] px-6 py-3 font-semibold text-[#880A18] transition hover:bg-[#880A18] hover:text-white"
              >
                Reset Search
              </Link>
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

        {/* Pagination */}
        {filteredCount > 0 && (
          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-black/60">
              Showing {firstItem}–{lastItem} of {filteredCount} articles
            </p>

            <div className="flex items-center gap-3">
              <PageLink
                href={dashboardHref({ q, status, page: page - 1 })}
                disabled={page <= 1}
              >
                ← Previous
              </PageLink>

              <span className="text-sm font-semibold text-black/70">
                Page {page} of {totalPages}
              </span>

              <PageLink
                href={dashboardHref({ q, status, page: page + 1 })}
                disabled={page >= totalPages}
              >
                Next →
              </PageLink>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}

function PageLink({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  const className =
    "rounded-full border px-5 py-2 text-sm font-semibold transition";

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${className} cursor-not-allowed border-black/10 text-black/30`}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${className} border-[#880A18] text-[#880A18] hover:border-[#FFCA18] hover:bg-[#FFCA18]`}
    >
      {children}
    </Link>
  );
}
