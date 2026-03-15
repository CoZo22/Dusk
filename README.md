# 🌑 DUSK — Deploy Guide

## 1. Supabase Setup (5 minute)

1. Mergi la **supabase.com** → New Project
2. SQL Editor → New Query → copiaza tot din `supabase_schema.sql` → Run
3. Settings → API → copiaza **Project URL** si **anon key**

## 2. Deploy pe Vercel (2 minute)

### Metoda A — GitHub (recomandat)
1. Creeaza repo pe **github.com** → upload acest folder
2. Mergi la **vercel.com** → New Project → Import din GitHub
3. La "Environment Variables" adauga:
   - `VITE_SUPABASE_URL` = url-ul tau
   - `VITE_SUPABASE_ANON_KEY` = cheia ta
4. Click **Deploy** ✓

### Metoda B — Vercel CLI
```bash
npm install -g vercel
cd dusk-app
vercel
# La prompts: set env vars VITE_SUPABASE_URL si VITE_SUPABASE_ANON_KEY
```

## 3. Creeaza contul Admin

Dupa deploy, inregistreaza-te cu codul `DUSK-WELCOME`, apoi in Supabase SQL Editor:
```sql
update public.profiles 
set role = 'admin', approved = true 
where id = (select id from auth.users where email = 'YOUR_EMAIL');
```

## 4. Configureaza Email Auth in Supabase

- Authentication → Providers → Email → **Enable**
- (Optonal pentru testare) dezactiveaza "Confirm email"

---

**Stack:** React 18 + Vite + Supabase (PostgreSQL + Realtime + Auth)
