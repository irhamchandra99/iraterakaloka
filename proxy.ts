import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Hanya area admin yang memakai sesi Supabase.
  matcher: ["/admin/:path*"],
};
