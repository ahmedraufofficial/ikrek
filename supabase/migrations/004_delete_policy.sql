-- Allow users to clear their own progress (used by "Restart day").

create policy "delete own progress"
  on public.user_question_progress for delete to authenticated
  using (auth.uid() = user_id);
