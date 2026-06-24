create extension if not exists pgcrypto;

create type lead_status as enum (
  'new',
  'contacted',
  'demo_scheduled',
  'joined',
  'not_interested',
  'follow_up'
);

create type learning_mode as enum ('online', 'offline', 'both');

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  course_interest text not null,
  learning_mode learning_mode not null default 'both',
  message text,
  status lead_status not null default 'new',
  follow_up_date date,
  notes text,
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists lead_followups (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  note text not null,
  next_follow_up_date date,
  created_by uuid,
  created_at timestamptz not null default now()
);

create index if not exists leads_status_idx on leads(status);
create index if not exists leads_created_at_idx on leads(created_at desc);
create index if not exists leads_follow_up_date_idx on leads(follow_up_date);

alter table leads enable row level security;
alter table lead_followups enable row level security;

-- Public website submissions are handled through the server API route.
-- Admin reads/writes should use Supabase Auth plus service-role server calls.
