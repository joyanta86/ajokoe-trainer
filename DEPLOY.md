# Deploying to Cloudflare

The app is a **fully static export** (`output: 'export'` in `next.config.mjs`). `npm run build`
produces a self-contained `out/` directory of HTML/JS/CSS with no server, so it is served as
**static assets on a Cloudflare Worker** — no server code, no adapter, no runtime cost.

Target domain: **`taxiexam.joyanta.fi`**

The repo is connected to a Cloudflare **Workers** service named **`ajokoe-trainer`** with:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Root directory:** `/`

`npx wrangler deploy` reads [`wrangler.toml`](wrangler.toml), which points at the static
`out/` directory via `[assets]`. Every push to `main` triggers a fresh build + deploy.

> **Note on the earlier error.** The first attempt failed with *"Missing entry-point to Worker
> script or to assets directory"* because `wrangler.toml` still held a Pages-style
> `pages_build_output_dir`, which `wrangler deploy` (the Workers command) does not read. It now
> uses `[assets] directory = "./out"`, which is what `wrangler deploy` expects. Re-run the build
> (or just push) and it deploys.

---

## Point `taxiexam.joyanta.fi` at it

In the Cloudflare dashboard → **Workers & Pages** → **`ajokoe-trainer`** → **Settings** →
**Domains & Routes** → **Add** → **Custom Domain**:

1. Enter `taxiexam.joyanta.fi`.
2. If `joyanta.fi` is a zone on this same Cloudflare account, the required DNS record is created
   automatically. Otherwise add the CNAME shown wherever `joyanta.fi`'s DNS is managed.
3. TLS is issued automatically; the domain is live within a few minutes.

---

## Deploy manually from your machine (optional)

```bash
npx wrangler login          # one-time, opens a browser
npm run deploy              # = npm run build && wrangler deploy
```

---

## Notes

- **`public/_headers`** (security headers + immutable caching for hashed `/_next/static` assets)
  and **`public/_redirects`** are copied into `out/` by the build and honoured by Cloudflare
  static assets.
- **`not_found_handling = "404-page"`** serves the styled `out/404.html` for unknown paths.
- **No environment variables** are required — all state is client-side in `localStorage`.
- The domain name suggests the taxi track, but the deployed site is the full two-track app; it
  opens on the landing page where the visitor picks a track. To land visitors straight on the
  taxi exam instead, ask and the root can be redirected to `/taxi`.

### Alternative: classic Cloudflare Pages

If you would rather use Pages than a Workers service, change the project's **Deploy command** to
`npx wrangler pages deploy out` (and, for a fresh Pages project, set the output directory to
`out`). The static `out/` output works unchanged either way.
