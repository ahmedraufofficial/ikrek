-- Word/phrase alignment between Hungarian and English response text.
-- Format: {"hu": [["segment", pairId], ...], "en": [["segment", pairId], ...]}
-- Segments sharing a pairId are translations of each other and get the
-- same underline colour in the UI. Run after 002_seed.sql.

alter table public.responses add column if not exists alignment jsonb;

-- Q1: Hogy vagy?
update public.responses set alignment = '{"hu":[["Jól",0],["vagyok.",1]],"en":[["I''m",1],["well.",0]]}' where text_hu = 'Jól vagyok.';
update public.responses set alignment = '{"hu":[["Köszönöm,",0],["jól.",1]],"en":[["Fine,",1],["thank you.",0]]}' where text_hu = 'Köszönöm, jól.';
update public.responses set alignment = '{"hu":[["Megvagyok.",0]],"en":[["I''m okay / getting by.",0]]}' where text_hu = 'Megvagyok.';
update public.responses set alignment = '{"hu":[["Fáradt",0],["vagyok.",1]],"en":[["I''m",1],["tired.",0]]}' where text_hu = 'Fáradt vagyok.';
update public.responses set alignment = '{"hu":[["Nem",0],["túl",1],["jól.",2]],"en":[["Not",0],["too",1],["well.",2]]}' where text_hu = 'Nem túl jól.';

-- Q2: Hogy hívnak?
update public.responses set alignment = '{"hu":[["Anna",0],["vagyok.",1]],"en":[["I am",1],["Anna.",0]]}' where text_hu = 'Anna vagyok.';
update public.responses set alignment = '{"hu":[["A nevem",0],["Péter.",1]],"en":[["My name is",0],["Péter.",1]]}' where text_hu = 'A nevem Péter.';
update public.responses set alignment = '{"hu":[["Úgy hívnak, hogy",0],["Kata.",1]],"en":[["They call me",0],["Kata.",1]]}' where text_hu = 'Úgy hívnak, hogy Kata.';
update public.responses set alignment = '{"hu":[["Én",0],["Márk",1],["vagyok.",2]],"en":[["I",0],["am",2],["Márk.",1]]}' where text_hu = 'Én Márk vagyok.';
update public.responses set alignment = '{"hu":[["Bence",0],["a nevem.",1]],"en":[["Bence",0],["is my name.",1]]}' where text_hu = 'Bence a nevem.';

-- Q3: Honnan jöttél?
update public.responses set alignment = '{"hu":[["Magyarországról",0],["jöttem.",1]],"en":[["I come",1],["from Hungary.",0]]}' where text_hu = 'Magyarországról jöttem.';
update public.responses set alignment = '{"hu":[["Budapestről",0],["jöttem.",1]],"en":[["I come",1],["from Budapest.",0]]}' where text_hu = 'Budapestről jöttem.';
update public.responses set alignment = '{"hu":[["Angliából",0],["jöttem.",1]],"en":[["I come",1],["from England.",0]]}' where text_hu = 'Angliából jöttem.';
update public.responses set alignment = '{"hu":[["Németországból",0],["jöttem.",1]],"en":[["I come",1],["from Germany.",0]]}' where text_hu = 'Németországból jöttem.';
update public.responses set alignment = '{"hu":[["Itt",0],["születtem.",1]],"en":[["I was born",1],["here.",0]]}' where text_hu = 'Itt születtem.';

-- Q4: Mit kérsz inni?
update public.responses set alignment = '{"hu":[["Egy",0],["kávét",1],["kérek.",2]],"en":[["A",0],["coffee,",1],["please.",2]]}' where text_hu = 'Egy kávét kérek.';
update public.responses set alignment = '{"hu":[["Egy",0],["teát",1],["kérek.",2]],"en":[["A",0],["tea,",1],["please.",2]]}' where text_hu = 'Egy teát kérek.';
update public.responses set alignment = '{"hu":[["Vizet",0],["kérek.",1]],"en":[["Water,",0],["please.",1]]}' where text_hu = 'Vizet kérek.';
update public.responses set alignment = '{"hu":[["Egy",0],["sört",1],["kérek.",2]],"en":[["A",0],["beer,",1],["please.",2]]}' where text_hu = 'Egy sört kérek.';
update public.responses set alignment = '{"hu":[["Semmit,",0],["köszönöm.",1]],"en":[["Nothing,",0],["thank you.",1]]}' where text_hu = 'Semmit, köszönöm.';

-- Q5: Hol laksz?
update public.responses set alignment = '{"hu":[["Budapesten",0],["lakom.",1]],"en":[["I live",1],["in Budapest.",0]]}' where text_hu = 'Budapesten lakom.';
update public.responses set alignment = '{"hu":[["Londonban",0],["lakom.",1]],"en":[["I live",1],["in London.",0]]}' where text_hu = 'Londonban lakom.';
update public.responses set alignment = '{"hu":[["A belvárosban",0],["lakom.",1]],"en":[["I live",1],["in the city centre.",0]]}' where text_hu = 'A belvárosban lakom.';
update public.responses set alignment = '{"hu":[["Egy kis faluban",0],["lakom.",1]],"en":[["I live",1],["in a small village.",0]]}' where text_hu = 'Egy kis faluban lakom.';
update public.responses set alignment = '{"hu":[["A szüleimmel",0],["lakom.",1]],"en":[["I live",1],["with my parents.",0]]}' where text_hu = 'A szüleimmel lakom.';
