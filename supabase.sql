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


-- 3. Author Authentication (Login System)
-- Add login credentials to authors table
alter table authors add column if not exists username text unique;
alter table authors add column if not exists password_hash text;

-- Author sessions table
create table if not exists author_sessions (
  id text primary key default gen_random_uuid()::text,
  "authorId" text references authors(id) on delete cascade,
  token text unique not null,
  "createdAt" timestamptz default now(),
  "expiresAt" timestamptz default now() + interval '7 days'
);

-- Sessions RLS
alter table author_sessions enable row level security;

do $$
begin
    if not exists (select 1 from pg_policies where policyname = 'Service role full access on sessions') then
        create policy "Service role full access on sessions" on author_sessions
          as permissive for all
          to service_role
          using (true)
          with check (true);
    end if;
end $$;


-- 4. SEO Automation Columns (Blogs)
-- Add columns for auto-generated SEO metadata
alter table blogs 
  add column if not exists "metaTitle" text,
  add column if not exists "metaDescription" text,
  add column if not exists "focusKeyword" text,
  add column if not exists "seoScore" integer default 0,
  add column if not exists "readingTime" integer default 0,
  add column if not exists "canonicalUrl" text,
  add column if not exists "ogImage" text;

-- 5. Seed Authors (Mohammad Fazil, Nancy, Auf, Barkha)
-- Password for all is '1234'
insert into authors (id, name, username, password_hash, role) values
(gen_random_uuid()::text, 'Mohammad Fazil', 'fazil', '7466986615b3c58e727e44a04629f6de35c444bb272e616ccfedd2919d8731d7', 'Writer'),
(gen_random_uuid()::text, 'Nancy', 'nancy', '7466986615b3c58e727e44a04629f6de35c444bb272e616ccfedd2919d8731d7', 'Writer'),
(gen_random_uuid()::text, 'Abdul Rahman Auf', 'auf', '7466986615b3c58e727e44a04629f6de35c444bb272e616ccfedd2919d8731d7', 'Writer'),
(gen_random_uuid()::text, 'Barkha Singh', 'barkha', '7466986615b3c58e727e44a04629f6de35c444bb272e616ccfedd2919d8731d7', 'Writer')
on conflict (username) do nothing;

-- 6. SEO Autopilot Tables (Keyword Ideas + Writing Styles)
create table if not exists keyword_ideas (
  id text primary key default gen_random_uuid()::text,
  keyword text not null,
  "searchVolume" text,
  difficulty text,
  intent text,
  "suggestedTitle" text,
  "suggestedAngle" text,
  category text,
  status text default 'idea', -- 'idea' | 'scheduled' | 'published' | 'rejected'
  "scheduledFor" date,
  "blogId" text references blogs(id) on delete set null,
  "createdAt" timestamptz default now()
);

alter table keyword_ideas enable row level security;
create policy "Service role full access on keyword_ideas" on keyword_ideas
  as permissive for all to service_role using (true) with check (true);

create table if not exists writing_styles (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  description text,
  "systemPrompt" text not null,
  "isDefault" boolean default false,
  "createdAt" timestamptz default now()
);

alter table writing_styles enable row level security;
create policy "Service role full access on writing_styles" on writing_styles
  as permissive for all to service_role using (true) with check (true);

-- Default BWMC Writing Styles
insert into writing_styles (id, name, description, "systemPrompt", "isDefault") values
(gen_random_uuid()::text, 'Professional Authority', 'Formal, expert-led, builds trust', 
 'Write in a professional, authoritative tone. Use data and UAE statistics. Sound like a senior BWMC consultant speaking to a CEO. No fluff, only value.', true),
(gen_random_uuid()::text, 'Conversational Guide', 'Friendly, easy to understand', 
 'Write like you are explaining to a friend starting their first business in Dubai. Simple language, relatable examples, warm tone.', false),
(gen_random_uuid()::text, 'UAE Local Expert', 'UAE-specific, culturally aware', 
 'Write specifically for UAE business owners. Reference FTA, DED, DIFC, ADGM, specific UAE laws. Position BWMC as the local expert.', false),
(gen_random_uuid()::text, 'Problem-Solution', 'Pain point focused', 
 'Start with a business owner pain point, then show how BWMC solves it. Empathetic opening, expert solution, clear CTA.', false)
on conflict do nothing;
