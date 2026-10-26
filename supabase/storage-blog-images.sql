-- Iratera Kaloka: Supabase Storage for blog cover images.
-- Run manually in Supabase Dashboard > SQL Editor. Not applied automatically.
--
-- Self-contained: admin check reads public.admin_users directly, matching the
-- live public.blogs policies. Does not depend on public.is_admin().
-- Safe to re-run (upsert bucket, drop/create policies).

-- 1. Public bucket with server-side size and type limits (5 MB; JPG/PNG/WebP).
--    Public bucket = files readable via public URL, no select policy needed.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- 2. Admin-only policies. No policy for anon, and no policy for authenticated
--    non-admins, so they cannot upload, overwrite, delete, or list objects.
--    Public URLs still work because the bucket is public.

-- Select: Storage API needs it for update (upsert/move) and delete (remove).
-- Admin-only, so the bucket cannot be listed by anyone else.
drop policy if exists "blog_images_select_admin" on storage.objects;
create policy "blog_images_select_admin"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'blog-images'
    and exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  );

drop policy if exists "blog_images_insert_admin" on storage.objects;
create policy "blog_images_insert_admin"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'blog-images'
    and exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  );

drop policy if exists "blog_images_update_admin" on storage.objects;
create policy "blog_images_update_admin"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'blog-images'
    and exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  )
  with check (
    bucket_id = 'blog-images'
    and exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  );

drop policy if exists "blog_images_delete_admin" on storage.objects;
create policy "blog_images_delete_admin"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'blog-images'
    and exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  );
