-- SQL for creating the blogs table in Supabase
-- Run this in the Supabase SQL Editor

create table if not exists blogs (
  id text primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  coverImage text,
  category text not null,
  author text not null,
  published boolean default false,
  slug text unique not null,
  createdAt timestamp with time zone default now(),
  updatedAt timestamp with time zone default now(),
  keywords text[],
  relatedPosts text[],
  relatedServices text[]
);

-- Set up Row Level Security (RLS)
-- For a simple blog, we can allow public read access
alter table blogs enable row level security;

create policy "Allow public read access"
  on blogs for select
  using (true);

-- For admin operations, we will use the service_role key to bypass RLS,
-- so we don't need additional policies for now.
