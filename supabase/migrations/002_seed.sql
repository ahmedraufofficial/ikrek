-- Lang App — starter Hungarian content (5 questions).
-- Run after 001_init.sql. Add more content the same way.

with q as (
  insert into public.questions (position, prompt_en, prompt_hu)
  values (1, 'How are you?', 'Hogy vagy?')
  returning id
)
insert into public.responses (question_id, position, text_hu, text_en)
select q.id, r.position, r.hu, r.en
from q, (values
  (1, 'Jól vagyok.', 'I''m well.'),
  (2, 'Köszönöm, jól.', 'Fine, thank you.'),
  (3, 'Megvagyok.', 'I''m okay / getting by.'),
  (4, 'Fáradt vagyok.', 'I''m tired.'),
  (5, 'Nem túl jól.', 'Not too well.')
) as r(position, hu, en);

with q as (
  insert into public.questions (position, prompt_en, prompt_hu)
  values (2, 'What is your name?', 'Hogy hívnak?')
  returning id
)
insert into public.responses (question_id, position, text_hu, text_en)
select q.id, r.position, r.hu, r.en
from q, (values
  (1, 'Anna vagyok.', 'I am Anna.'),
  (2, 'A nevem Péter.', 'My name is Péter.'),
  (3, 'Úgy hívnak, hogy Kata.', 'They call me Kata.'),
  (4, 'Én Márk vagyok.', 'I am Márk.'),
  (5, 'Bence a nevem.', 'Bence is my name.')
) as r(position, hu, en);

with q as (
  insert into public.questions (position, prompt_en, prompt_hu)
  values (3, 'Where are you from?', 'Honnan jöttél?')
  returning id
)
insert into public.responses (question_id, position, text_hu, text_en)
select q.id, r.position, r.hu, r.en
from q, (values
  (1, 'Magyarországról jöttem.', 'I come from Hungary.'),
  (2, 'Budapestről jöttem.', 'I come from Budapest.'),
  (3, 'Angliából jöttem.', 'I come from England.'),
  (4, 'Németországból jöttem.', 'I come from Germany.'),
  (5, 'Itt születtem.', 'I was born here.')
) as r(position, hu, en);

with q as (
  insert into public.questions (position, prompt_en, prompt_hu)
  values (4, 'What would you like to drink?', 'Mit kérsz inni?')
  returning id
)
insert into public.responses (question_id, position, text_hu, text_en)
select q.id, r.position, r.hu, r.en
from q, (values
  (1, 'Egy kávét kérek.', 'A coffee, please.'),
  (2, 'Egy teát kérek.', 'A tea, please.'),
  (3, 'Vizet kérek.', 'Water, please.'),
  (4, 'Egy sört kérek.', 'A beer, please.'),
  (5, 'Semmit, köszönöm.', 'Nothing, thank you.')
) as r(position, hu, en);

with q as (
  insert into public.questions (position, prompt_en, prompt_hu)
  values (5, 'Where do you live?', 'Hol laksz?')
  returning id
)
insert into public.responses (question_id, position, text_hu, text_en)
select q.id, r.position, r.hu, r.en
from q, (values
  (1, 'Budapesten lakom.', 'I live in Budapest.'),
  (2, 'Londonban lakom.', 'I live in London.'),
  (3, 'A belvárosban lakom.', 'I live in the city centre.'),
  (4, 'Egy kis faluban lakom.', 'I live in a small village.'),
  (5, 'A szüleimmel lakom.', 'I live with my parents.')
) as r(position, hu, en);
