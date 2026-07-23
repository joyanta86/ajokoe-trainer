-- Ajokoe Trainer — Supabase schema
--
-- One row per user holds their entire study state as a JSON blob, kept in sync
-- from the browser. Row Level Security ensures a user can only ever read or
-- write their own row, so the public anon key is safe to ship to the client.
--
-- Run this in the Supabase dashboard → SQL Editor once, on your project.

create table if not exists public.user_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_state enable row level security;

-- A user may read their own row.
create policy "user_state_select_own"
  on public.user_state
  for select
  using (auth.uid() = user_id);

-- A user may create their own row.
create policy "user_state_insert_own"
  on public.user_state
  for insert
  with check (auth.uid() = user_id);

-- A user may update their own row.
create policy "user_state_update_own"
  on public.user_state
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
