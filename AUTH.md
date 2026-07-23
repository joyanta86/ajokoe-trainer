# Authentication & cloud sync setup

Ajokoe Trainer uses **Supabase Auth** for sign-in (email/password + Google) and a
single Supabase table to sync each user's progress across devices. It all runs
client-side, so the app stays a static export — there is no server to run.

Login is **required**: the whole app sits behind sign-in, and unauthenticated
visitors are sent to `/login`.

You need to do the account setup below once; the app code is already wired up.

---

## 1. Create a Supabase project

1. Sign up at [supabase.com](https://supabase.com) and create a new project.
2. Project Settings → **API**. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

These are public by design — data is protected by Row Level Security, not by
hiding the key.

## 2. Create the database table

Supabase dashboard → **SQL Editor** → paste and run
[`supabase/schema.sql`](supabase/schema.sql). It creates `public.user_state`
with RLS so each user can only touch their own row.

## 3. Enable email/password

Authentication → **Providers** → **Email**: enabled by default. For quick
testing you can turn off "Confirm email" (Authentication → Providers → Email);
with it on, new users must click a confirmation link before their first sign-in.

## 4. Enable Google login

1. In [Google Cloud Console](https://console.cloud.google.com): create (or pick)
   a project → **APIs & Services → Credentials → Create credentials → OAuth
   client ID → Web application**.
2. Under **Authorized redirect URIs** add the callback Supabase shows you:
   `https://YOUR-PROJECT-ref.supabase.co/auth/v1/callback`
3. Copy the **Client ID** and **Client secret** into Supabase → Authentication →
   Providers → **Google**, and enable it.

## 5. Set the site URL and redirect URLs

Supabase → Authentication → **URL Configuration**:

- **Site URL:** `https://taxiexam.joyanta.fi`
- **Redirect URLs:** add `https://taxiexam.joyanta.fi` and, for local dev,
  `http://localhost:3000`.

The app requests a redirect back to its own origin after Google sign-in, so the
origin must be on this allow-list.

## 6. Provide the env vars

**Local development** — create `.env.local` (git-ignored):

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

**Cloudflare** — the values are inlined at build time, so add them as **build
variables** on the Workers/Pages project (Settings → Variables and secrets, or
the build configuration's environment variables), then trigger a new build.

> Because these are `NEXT_PUBLIC_*`, they are read at build time and baked into
> the static output. If you change the project, rebuild.

## How sync works

- On sign-in the app pulls the user's `user_state.data` blob and hydrates the
  local Zustand stores (car + taxi progress, exam history, bookmarks).
- Any change is pushed back (debounced) to the same row.
- Last-write-wins per device. Pushing is disabled until the initial pull
  finishes, so a fresh device never overwrites existing cloud data with an
  empty local state.

## Behaviour without configuration

If the env vars are missing, the app does not crash — it shows a "Sign-in is not
configured yet" screen and `npm run build` still succeeds. This is what keeps CI
and key-less local builds green.
