-- Master SQL for BWMC Blog System (Blogs + Authors)
-- Run this in the Supabase SQL Editor

-- 1. Authors Table
create table if not exists authors (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  bio text,
  avatar text,
  role text default 'Writer',
  linkedin text,
  twitter text,
  instagram text,
  website text,
  "createdAt" timestamptz default now()
);

-- Authors RLS
alter table authors enable row level security;

do $$
begin
    if not exists (select 1 from pg_policies where policyname = 'Public can read authors') then
        create policy "Public can read authors" on authors for select using (true);
    end if;
    if not exists (select 1 from pg_policies where policyname = 'Service role full access on authors') then
        create policy "Service role full access on authors" on authors
          as permissive for all
          to service_role
          using (true)
          with check (true);
    end if;
end $$;

-- 2. Blogs Table
create table if not exists blogs (
  id text primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  "coverImage" text,
  category text not null,
  author text not null,
  published boolean default false,
  slug text unique not null,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now(),
  keywords text[],
  "relatedPosts" text[],
  "relatedServices" text[]
);

-- Add authorId to blogs if it doesn't exist
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name='blogs' and column_name='authorId') then
        alter table blogs add column "authorId" text references authors(id) on delete set null;
    end if;
end $$;

-- Blogs RLS
alter table blogs enable row level security;

do $$
begin
    if not exists (select 1 from pg_policies where policyname = 'Allow public read access') then
        create policy "Allow public read access" on blogs for select using (true);
    end if;
end $$;
