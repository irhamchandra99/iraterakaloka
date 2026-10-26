import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/admin/blog/login";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          // Teruskan cookie hasil refresh ke Server Components (request)
          // dan ke browser (response).
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });

          Object.entries(headers ?? {}).forEach(([key, value]) => {
            response.headers.set(key, value);
          });
        },
      },
    }
  );

  // Jangan menaruh logika lain di antara createServerClient dan getUser():
  // getUser() memvalidasi token ke Supabase Auth dan memicu refresh sesi.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pengecekan optimistik. Verifikasi admin tetap dilakukan di setiap
  // halaman (admin_users) dan ditegakkan oleh RLS di database.
  if (!user && request.nextUrl.pathname !== LOGIN_PATH) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.search = "";

    const redirectResponse = NextResponse.redirect(url);

    // Bawa cookie (mis. penghapusan sesi kedaluwarsa) ke response redirect.
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });

    return redirectResponse;
  }

  return response;
}
