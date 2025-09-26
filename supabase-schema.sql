create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  level integer default 1,
  total_xp integer default 0,
  eco_coins integer default 100,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Create policies
drop policy if exists "Public profiles are viewable by everyone." on profiles;
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

drop policy if exists "Users can insert their own profile." on profiles;
create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile." on profiles;
create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create function to handle user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, username, full_name)
  values (
    new.id, 
    new.email,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
drop trigger if exists profiles_updated_at on profiles;
create trigger profiles_updated_at
  before update on profiles
  for each row execute procedure public.handle_updated_at();

-- Optional: Add institution (school/college) for leaderboard scoping
alter table if exists profiles
  add column if not exists institution text;

-- Index to speed up leaderboard ordering by XP
create index if not exists idx_profiles_total_xp on profiles(total_xp desc);

-- Enable realtime on profiles
do $$
begin
  begin
    alter publication supabase_realtime add table profiles;
  exception when duplicate_object then
    null;
  end;
end;
$$;

-- Create courses catalog table
create table if not exists courses (
  id text primary key,
  title text not null,
  description text,
  difficulty text not null check (difficulty in ('beginner','intermediate','advanced')),
  lessons integer not null default 0,
  duration text,
  topics text[] default '{}',
  icon text,
  color text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table courses enable row level security;

drop policy if exists "Everyone can view courses" on courses;
create policy "Everyone can view courses" on courses
  for select using (true);

drop policy if exists "Only service role can modify courses" on courses;
create policy "Only service role can modify courses" on courses
  for all using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

drop trigger if exists courses_updated_at on courses;
create trigger courses_updated_at
  before update on courses
  for each row execute procedure public.handle_updated_at();

-- Create course progress table (per-user progress records)
create table if not exists course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  course_id text references courses(id) on delete cascade,
  progress integer not null default 0 check (progress between 0 and 100),
  completed boolean not null default false,
  started_at timestamp with time zone default now(),
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (user_id, course_id)
);

alter table course_progress enable row level security;

drop policy if exists "Users can view own course progress" on course_progress;
create policy "Users can view own course progress" on course_progress
  for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own course progress" on course_progress;
create policy "Users can insert own course progress" on course_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own course progress" on course_progress;
create policy "Users can update own course progress" on course_progress
  for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own course progress" on course_progress;
create policy "Users can delete own course progress" on course_progress
  for delete using (auth.uid() = user_id);

drop trigger if exists course_progress_updated_at on course_progress;
create trigger course_progress_updated_at
  before update on course_progress
  for each row execute procedure public.handle_updated_at();

create index if not exists idx_course_progress_user on course_progress(user_id);
create index if not exists idx_course_progress_course on course_progress(course_id);
