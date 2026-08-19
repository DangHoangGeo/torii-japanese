create table if not exists learner_profiles (
  user_id text primary key,
  display_name text,
  start_level text not null default 'unplaced',
  goal_level text not null default 'N2',
  daily_minutes integer not null default 30,
  started_at timestamptz not null default now(),
  onboarding_done boolean not null default false,
  placement_score integer,
  target_date date,
  snapshot jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists sensei_messages (
  id serial primary key,
  user_id text not null,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);
create index if not exists sensei_messages_user_id_idx on sensei_messages (user_id, created_at);

create table if not exists ai_insights (
  user_id text primary key,
  analysis text not null,
  next_moves jsonb not null,
  generated_at timestamptz not null default now()
);
