create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  username text unique,
  display_name text,
  role text not null default 'user' check (role in ('user', 'creator', 'admin')),
  creator_id text,
  avatar_url text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, username, display_name, role, creator_id, avatar_url, status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'role', 'user'),
    new.raw_user_meta_data ->> 'creator_id',
    new.raw_user_meta_data ->> 'avatar_url',
    coalesce(new.raw_user_meta_data ->> 'status', 'active')
  )
  on conflict (id) do update
  set email = excluded.email,
      username = coalesce(public.profiles.username, excluded.username),
      display_name = coalesce(public.profiles.display_name, excluded.display_name),
      avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
      updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin"
on public.profiles
for select
to authenticated
using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin"
on public.profiles
for update
to authenticated
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

create table if not exists public.review_items (
  id text primary key,
  title text not null,
  owner_name text not null,
  category text not null default '素材审核',
  risk_note text not null default '待补充说明',
  status text not null default '待审核' check (status in ('待审核', '复核中', '待补充', '已通过', '已驳回')),
  preview_image_url text,
  reviewer_id uuid references auth.users(id),
  reviewer_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_review_items_updated_at on public.review_items;
create trigger set_review_items_updated_at
before update on public.review_items
for each row execute procedure public.set_updated_at();

alter table public.review_items enable row level security;

drop policy if exists "review_items_admin_only" on public.review_items;
create policy "review_items_admin_only"
on public.review_items
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create table if not exists public.review_logs (
  id uuid primary key default gen_random_uuid(),
  review_item_id text not null references public.review_items(id) on delete cascade,
  action text not null,
  from_status text,
  to_status text,
  note text,
  actor_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.review_logs enable row level security;

drop policy if exists "review_logs_admin_only" on public.review_logs;
create policy "review_logs_admin_only"
on public.review_logs
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into public.review_items (id, title, owner_name, category, risk_note, status)
values
  ('SP-2048', '武士三视图', 'LogiFore', '角色资产', '版权声明完整', '待审核'),
  ('SP-2049', '日落河边场景组', 'LogiFore', '场景图', '需补充模型来源', '复核中'),
  ('SP-2050', '汉人服装造型', 'Aria Jin', '服装造型', '标签不足', '待补充')
on conflict (id) do nothing;
