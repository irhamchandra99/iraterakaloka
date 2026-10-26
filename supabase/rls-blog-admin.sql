-- Iratera Kaloka: RLS for blog CMS.
-- Run manually in Supabase Dashboard > SQL Editor. Not applied automatically.
--
-- STEP 0 (audit first): list existing policies. Any permissive policy that
-- grants broader access (e.g. "Enable all for authenticated users") must be
-- dropped, because permissive policies are OR-ed together.
--
--   select tablename, policyname, cmd, roles, qual, with_check
--   from pg_policies
--   where schemaname = 'public' and tablename in ('blogs', 'admin_users');
--
--   drop policy "<policy name>" on public.blogs;

-- 1. Enable RLS
alter table public.blogs enable row level security;
alter table public.admin_users enable row level security;

-- 2. Admin check helper. SECURITY DEFINER avoids RLS recursion on admin_users.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- 3. admin_users: a user may only read their own row.
--    No insert/update/delete policies: membership is managed only from the
--    Supabase Dashboard (or service role), so nobody can self-promote.
drop policy if exists "admin_users_select_own" on public.admin_users;
create policy "admin_users_select_own"
  on public.admin_users
  for select
  to authenticated
  using (user_id = (select auth.uid()));

-- 4. blogs: public reads published only; admins read everything.
drop policy if exists "blogs_select_published" on public.blogs;
create policy "blogs_select_published"
  on public.blogs
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "blogs_select_admin" on public.blogs;
create policy "blogs_select_admin"
  on public.blogs
  for select
  to authenticated
  using ((select public.is_admin()));

-- 5. blogs: only admins write.
drop policy if exists "blogs_insert_admin" on public.blogs;
create policy "blogs_insert_admin"
  on public.blogs
  for insert
  to authenticated
  with check ((select public.is_admin()));

drop policy if exists "blogs_update_admin" on public.blogs;
create policy "blogs_update_admin"
  on public.blogs
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "blogs_delete_admin" on public.blogs;
create policy "blogs_delete_admin"
  on public.blogs
  for delete
  to authenticated
  using ((select public.is_admin()));
