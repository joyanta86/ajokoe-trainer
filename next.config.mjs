import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site: the app is 100% client-side (localStorage/Zustand),
  // so it exports to plain HTML/JS in `out/` and hosts on any static CDN
  // (Cloudflare Pages, Netlify, GitHub Pages) with no server or adapter.
  output: 'export',
  images: { unoptimized: true },
  // Emit `path/index.html` so clean URLs resolve on static hosts.
  trailingSlash: true,
  // Pin the workspace root so a lockfile elsewhere on the machine is not inferred.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
