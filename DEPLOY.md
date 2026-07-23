# Deploying to Cloudflare Pages

The app is a **fully static export** (`output: 'export'` in `next.config.mjs`). `npm run build`
produces a self-contained `out/` directory of HTML/JS/CSS with no server, so Cloudflare Pages
serves it directly — no adapter, no Workers, no runtime cost.

Target domain: **`taxiexam.joyanta.fi`**

There are two ways to deploy. **Option A (GitHub integration) is recommended** — it redeploys
automatically on every push and needs no local tooling.

---

## Option A — Connect the GitHub repo (recommended)

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** →
   **Create** → **Pages** → **Connect to Git**.
2. Select the repository **`joyanta86/ajokoe-trainer`** and the `main` branch.
3. Set the build configuration:
   - **Framework preset:** `Next.js (Static HTML Export)` — or "None", the values below are what matter
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** 20 (set env var `NODE_VERSION=20` if the default is older)
4. **Save and Deploy.** The first build gives you a `*.pages.dev` URL to verify.

### Point `taxiexam.joyanta.fi` at it

1. In the new Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter `taxiexam.joyanta.fi`.
3. If `joyanta.fi` is already a zone on this same Cloudflare account, the required **CNAME**
   record (`taxiexam` → `<project>.pages.dev`, proxied) is created automatically. Otherwise add
   that CNAME wherever `joyanta.fi`'s DNS is managed.
4. TLS is issued automatically; the domain is live within a few minutes.

Every later `git push` to `main` triggers a fresh deploy.

---

## Option B — Deploy from your machine with Wrangler

Use this for a one-off manual deploy.

```bash
# One-time: authenticate (opens a browser)
npx wrangler login

# Build and deploy the static output
npm run build
npx wrangler pages deploy out --project-name=taxiexam --branch=main
```

Then attach the domain once:

```bash
npx wrangler pages domain add taxiexam.joyanta.fi --project-name=taxiexam
```

(or add it via the dashboard as in Option A). Convenience scripts are wired in `package.json`:

```bash
npm run deploy   # build + wrangler pages deploy out
```

---

## Notes

- **`public/_headers`** sets security headers (`X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`) and long-lived caching for hashed `/_next/static`
  assets. Cloudflare Pages applies it automatically.
- **No environment variables** are required — all state is client-side in `localStorage`.
- **`wrangler.toml`** pins the Pages project name and output directory for the CLI.
- The domain name suggests the taxi track, but the deployed site is the full two-track app; it
  opens on the landing page where the visitor picks a track. To land visitors straight on the
  taxi exam instead, change the redirect target — ask and it can be wired up.
