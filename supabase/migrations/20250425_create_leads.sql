create table public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  person text,
  block text,
  plan text,
  created_at timestamptz default now()
);
