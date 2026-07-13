-- Lang App — initial schema
-- Paste this into the Supabase SQL Editor and run it.

-- A question shown to the learner, in both languages.
create table public.questions (
  id uuid primary key default gen_random_uuid(),
  position int not null unique,
  prompt_en text not null,
  prompt_hu text not null,
  created_at timestamptz not null default now()
);

-- The ~5 Hungarian ways to respond to a question.
create table public.responses (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  position int not null,
  text_hu text not null,
  text_en text,
  created_at timestamptz not null default now(),
  unique (question_id, position)
);

-- Per-user learning state. stage starts at 'introduced'; later stages
-- (e.g. 'review', 'known') can be added without a schema change.
create table public.user_question_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  stage text not null default 'introduced',
  introduced_on date not null default current_date,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

alter table public.questions enable row level security;
alter table public.responses enable row level security;
alter table public.user_question_progress enable row level security;

-- Course content is readable by any signed-in user; it is only written
-- via the dashboard/SQL editor (service role bypasses RLS).
create policy "questions are readable by authenticated users"
  on public.questions for select to authenticated using (true);

create policy "responses are readable by authenticated users"
  on public.responses for select to authenticated using (true);

-- Progress rows are private to their owner.
create policy "read own progress"
  on public.user_question_progress for select to authenticated
  using (auth.uid() = user_id);

create policy "insert own progress"
  on public.user_question_progress for insert to authenticated
  with check (auth.uid() = user_id);

create policy "update own progress"
  on public.user_question_progress for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
