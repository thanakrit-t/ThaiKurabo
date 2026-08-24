# Supabase integration

The app uses cookie-based Supabase Auth through `@supabase/ssr`. It intentionally keeps the existing preview data available when environment variables are empty, so the UI can still be developed before a Supabase project is configured.

## 1. Configure the project

Create `.env.local` from `.env.example` and add values from **Supabase Dashboard → Connect**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The publishable key is designed for browser use and is protected by RLS. Never put a secret/service-role key in a `NEXT_PUBLIC_*` variable. This phase does not require a service-role key.

## 2. Apply the database

With the Supabase CLI installed and authenticated:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

The migrations create the Phase 1 schema from `database.md`: profiles and roles, multilingual page and careers content, contact and recruitment workflows, private storage buckets, audit/outbox foundations, indexes, triggers, and RLS policies.

## 3. Configure Auth URLs

In **Authentication → URL Configuration** set:

- Site URL: the value of `NEXT_PUBLIC_SITE_URL`
- Redirect URL (local): `http://localhost:3000/auth/callback`
- Add the production callback URL before deployment.

Email/password sign-up, sign-in, email confirmation, password-reset email requests, session refresh, member protection, and admin role protection are wired. Password update UI after the recovery callback is a later task.

## 4. First administrator

Register the first account normally, then assign the admin role from the SQL editor while signed in as the project owner:

```sql
insert into public.user_roles (user_id, role_id)
select 'USER_UUID'::uuid, id from public.roles where code = 'admin';
```

Do not expose this operation through a browser client.

## Current fallback behavior

Without environment variables, public careers shows preview jobs and member/admin screens remain available for UI development. Once both public Supabase variables are present, Auth guards and live jobs queries become active automatically.
