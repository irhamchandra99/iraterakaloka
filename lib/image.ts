// Cover images may come from Supabase Storage (upload) or any external URL
// (manual "Cover Image URL" field). Only Supabase Storage is allowed in
// next.config.ts remotePatterns, so other hosts must skip optimization.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).host : null;

export function isOptimizableImage(src: string) {
  try {
    const url = new URL(src);
    return (
      url.protocol === "https:" &&
      url.host === supabaseHost &&
      url.pathname.startsWith("/storage/v1/object/public/")
    );
  } catch {
    return false;
  }
}
