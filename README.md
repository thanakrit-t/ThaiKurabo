# Thai Kurabo Website

Corporate website and member/admin portal for Thai Kurabo, built with Next.js 16 App Router, TypeScript, Tailwind CSS, and Supabase.

## Development

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The public UI remains available with preview data until Supabase environment variables are configured.

## Supabase

See [`supabase/README.md`](supabase/README.md) for environment variables, migrations, Auth callback URLs, and first-admin setup.

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Never commit `.env.local` or a Supabase service-role key.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```
