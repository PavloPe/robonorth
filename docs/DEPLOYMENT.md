# Deployment Guide — RoboNorth

> Step-by-step instructions for deploying RoboNorth to various hosting platforms.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Production Hosting (robonorth.ca)](#production-hosting-robonorthca)
- [Option 1: Vercel](#option-1-vercel)
- [Option 2: VPS / Bare Metal](#option-2-vps--bare-metal)
- [Option 3: Docker](#option-3-docker)
- [Database Considerations](#database-considerations)
- [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

- **Node.js 22+** — required for Next.js 15.5
- **npm** — package manager
- **Git** — for deployment

### Build Steps (All Platforms)

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Run database migrations
npx prisma migrate deploy

# 4. Seed the database
npm run db:seed

# 5. Build for production
npm run build

# 6. Start (production server)
npm start
```

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | No | `file:./prisma/dev.db` | Path to SQLite database |
| `SITE_URL` | Recommended | `http://localhost:3000` | Canonical site URL (used in sitemap, meta tags) |
| `NODE_ENV` | Auto | `development` | `production` for deployed environments |
| `GA_MEASUREMENT_ID` | No | — | Google Analytics 4 measurement ID |
| `SMTP_HOST` | No | — | Email server for notifications |
| `SMTP_PORT` | No | `587` | Email server port |
| `SMTP_USER` | No | — | Email username |
| `SMTP_PASS` | No | — | Email password |
| `SMTP_FROM` | No | — | Sender email address |
| `SENTRY_DSN` | No | — | Sentry DSN for server + edge error reporting. Unset = Sentry is a complete no-op (no init, no network). |
| `NEXT_PUBLIC_SENTRY_DSN` | No | — | Sentry DSN for browser error reporting. Unset = no client Sentry. |
| `SENTRY_AUTH_TOKEN` | No | — | Only needed to upload source maps at build time (`SENTRY_ORG` + `SENTRY_PROJECT` too). Unset = no upload. |

> **Sentry** is gated entirely on the DSN env vars. With them unset the SDK never initializes — safe to deploy before provisioning the DSN. Set `SENTRY_DSN` (and `NEXT_PUBLIC_SENTRY_DSN` for the browser) in the PM2 runtime `.env` on the droplet, then `pm2 restart robonorth --update-env` to activate. `environment` is taken from `NODE_ENV`.

### Example `.env`

```bash
DATABASE_URL="file:./prisma/dev.db"
SITE_URL="https://robonorth.ca"
GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

---

## Production Hosting (robonorth.ca)

> **This is the authoritative description of how RoboNorth runs in production today.**
> Options 1–3 below are supported alternatives, not the live setup.

### Topology — direct DNS → origin, no edge layer

```
robonorth.ca        (A)        ─┐
www.robonorth.ca    (A)        ─┼─► 159.203.37.78  (DigitalOcean droplet "robonorth")
                                │      nginx :80/:443  ──►  127.0.0.1:3000
                                │                           (PM2 "robonorth", `next start`)
```

| Item | Value |
|------|-------|
| Origin droplet | DigitalOcean `robonorth` — `159.203.37.78` |
| Process manager | PM2 process `robonorth` (`pm2 restart robonorth --update-env`) |
| Reverse proxy | nginx — `:80`/`:443` → `127.0.0.1:3000` |
| Public URL | `https://robonorth.ca` |
| Registrar | Namecheap (Go Get Canada registrar for `.ca`); registry expiry `2027-05-08` |
| DNS | Namecheap-managed (`dns101.registrar-servers.com` / `dns102.registrar-servers.com`); **A records point straight at the origin** |
| TLS | Let's Encrypt via certbot on the origin droplet (HTTP-01 over port 80) |
| Edge / CDN | **None** |

### Edge-layer decision

Edge products were evaluated for this story (**Linode NodeBalancer** vs **Akamai Edge-Compute** vs a generic CDN). **Decision: no edge layer** — DNS A records resolve directly to the origin droplet and TLS is terminated by nginx + certbot on that droplet.

Rationale:

- The catalog is small and mostly static (22 robots + 18 manufacturers prerender as `○`/`●`), so a single $12/mo droplet serves it comfortably. A NodeBalancer / edge product adds monthly cost and an extra failure surface with no current need.
- The transient Akamai/Linode IPs (`172.234.24.211`, `172.239.57.117`) that briefly appeared in DNS were **not** an intentional edge — they were the Namecheap expired-domain **parking proxy** (`openresty` / ParkLogic) that grabbed the domain when a registrar renewal payment did not settle. That was the seq:54 outage, now resolved; see the "PROTOCOL_ERROR / parking" entry in the deploy skill for the detection + fix playbook.

Revisit this decision only if traffic or multi-region latency requirements grow.

Health check that production is served by the origin (not a parking proxy):

```bash
dig +short robonorth.ca            # expect: 159.203.37.78
curl -sI https://robonorth.ca | grep -i server
# expect: Server: nginx/1.24.0 (Ubuntu)
# parking signature: server: openresty   (= Namecheap parking / billing problem)
```

### www → apex redirect

nginx serves a dedicated 301 redirect for the `www` host so there is a single canonical origin (`SITE_URL=https://robonorth.ca`):

```nginx
# Redirect www → apex (301)
server {
    listen 80;
    listen 443 ssl;
    server_name www.robonorth.ca;

    ssl_certificate     /etc/letsencrypt/live/robonorth.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/robonorth.ca/privkey.pem;

    return 301 https://robonorth.ca$request_uri;
}

# Apex → Next.js app
server {
    listen 80;
    listen 443 ssl;
    server_name robonorth.ca;

    ssl_certificate     /etc/letsencrypt/live/robonorth.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/robonorth.ca/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Verify:

```bash
curl -sI https://www.robonorth.ca | grep -i location
# expect: location: https://robonorth.ca/
```

### TLS certificate + automated renewal

The Let's Encrypt cert (`CN=robonorth.ca`, with the `www` SAN) is issued and renewed by certbot on the origin droplet. Renewal is automated — no manual step:

- certbot installs the `certbot.timer` systemd unit, which runs `certbot renew` twice daily and only acts when a cert is within 30 days of expiry.
- A deploy hook reloads nginx after a successful renewal: `/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh` → `systemctl reload nginx`.

```bash
systemctl list-timers certbot.timer    # confirm the renewal timer is active
sudo certbot renew --dry-run           # verify the full renewal path works
sudo certbot certificates              # show expiry + SANs for robonorth.ca
```

### Uptime monitoring (`/api/health`)

`GET /api/health` returns `200` with `{ status: "healthy", database: { connected, robots, manufacturers, responseMs }, version, environment }`, or `503` with `status: "unhealthy"` when the database is unreachable. It is a cheap, dependency-aware liveness probe.

Wire it into the fleet uptime monitor the same way as the other sites (helpbuddy / innovationcoders / expenseai cloud health probes):

- Poll `https://robonorth.ca/api/health` on an interval; alert on any non-`200` response or `status != "healthy"`.
- A `claude.ai/code/scheduled` routine can probe it hourly and `TELEGRAM_ALERT` on failure, mirroring `innovationcoders-uptime-check`.

> The alert/dashboard wiring itself lives in the **main-dashboard** project (and/or a scheduled cloud routine), not in this repo — this repo only owns the `/api/health` endpoint it probes.

### CI/CD for the origin droplet

**Decision: deploy via GitHub Actions over SSH** (fleet policy: no manual SSH deploys). Intended pipeline, triggered on push to `main` (or a release tag):

1. Build + test (reuse the existing `ci.yml` steps: `npm ci`, `prisma generate`, `migrate deploy`, `db:seed`, `build`).
2. SSH to the droplet with a dedicated deploy key and run the update sequence: fetch the new build, `npx prisma migrate deploy`, `npm run db:seed`, `npm run build`, `pm2 restart robonorth --update-env`.
3. Health-check `https://robonorth.ca/api/health`; roll back to the previous release on failure.

> **`db:seed` is inquiry-safe.** `prisma/seed.ts` refreshes the static catalog (robots, manufacturers, part categories, parts) from `src/data/*.ts` on every run but **never** deletes `Inquiry` / `InquiryItem` rows, so running it on each deploy preserves all captured customer leads. Migrations (`migrate deploy`) carry the schema forward; the seed only keeps the reference catalog in sync with the committed data.

One-time human setup is required before the deploy workflow can be added (it needs secrets this unattended run must not create):

- Generate an `ed25519` deploy key; add the public key to the droplet deploy user's `~/.ssh/authorized_keys`.
- Add repo secrets `DEPLOY_SSH_KEY` (private key), `DEPLOY_HOST`, `DEPLOY_USER`.

Until those secrets exist the deploy workflow is intentionally **not** committed. The current `.github/workflows/ci.yml` continues to build + test every PR and push to `dev`.

---

## Option 1: Vercel

The recommended deployment platform for Next.js applications.

### Steps

1. **Push to GitHub**

```bash
git push origin main
```

2. **Connect to Vercel**

- Go to [vercel.com](https://vercel.com) and sign in
- Click "New Project" → Import your GitHub repository
- Framework will be auto-detected as Next.js

3. **Configure Environment Variables**

In the Vercel dashboard, add:
- `SITE_URL` = `https://robonorth.ca`
- `GA_MEASUREMENT_ID` = your GA4 ID

4. **Configure Build Settings**

Vercel auto-detects most settings. Ensure:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

5. **Add Build Script for Database**

Create or update `vercel-build.sh`:

```bash
#!/bin/bash
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run build
```

Or set the build command in Vercel to:
```
npx prisma generate && npx prisma migrate deploy && npm run db:seed && next build
```

6. **Deploy**

Vercel deploys automatically on push to `main`.

### ⚠️ SQLite on Vercel

Vercel serverless functions are stateless — the SQLite file (`dev.db`) is recreated on each deploy. This means:

- **Catalog data** is fine — it's re-seeded from `src/data/*.ts` on every build
- **Inquiries** will be lost on deploy — use an external database for production inquiries

**Alternatives for production:**
- Turso (SQLite-compatible, serverless) — `@prisma/adapter-libsql`
- PlanetScale / Neon / Supabase — requires schema migration to MySQL/PostgreSQL
- Vercel Postgres — native integration

---

## Option 2: VPS / Bare Metal

Deploy on any Linux server (Ubuntu, Debian, etc.) with Node.js.

### 1. Server Setup

```bash
# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

### 2. Clone & Build

```bash
cd /var/www
git clone https://github.com/robonorth/robonorth.git
cd robonorth

npm install
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run build
```

### 3. Start with PM2

```bash
# Start the production server
pm2 start npm --name "robonorth" -- start

# Auto-restart on boot
pm2 save
pm2 startup
```

### 4. Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/robonorth
server {
    listen 80;
    server_name robonorth.ca www.robonorth.ca;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/robonorth /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d robonorth.ca -d www.robonorth.ca
```

### 6. Updating

```bash
cd /var/www/robonorth
git pull origin main
npm install
npx prisma migrate deploy
npm run db:seed   # catalog refresh only — inquiries are preserved (see note in Production Hosting)
npm run build
pm2 restart robonorth
```

---

## Option 3: Docker

### Dockerfile

```dockerfile
FROM node:22-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Seed database
RUN npx prisma migrate deploy
RUN npm run db:seed

# Build Next.js
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  robonorth:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=file:./prisma/dev.db
      - SITE_URL=https://robonorth.ca
      - NODE_ENV=production
    volumes:
      - robonorth-data:/app/prisma  # Persist SQLite database
    restart: unless-stopped

volumes:
  robonorth-data:
```

### Build & Run

```bash
# Build the image
docker build -t robonorth .

# Run the container
docker run -p 3000:3000 \
  -e SITE_URL=https://robonorth.ca \
  -v robonorth-data:/app/prisma \
  robonorth

# Or with docker compose
docker compose up -d
```

---

## Database Considerations

### Development
SQLite works perfectly — single file, no setup, fast reads.

### Production
For a catalog-focused site with low write volume, SQLite is viable:

- **Pros**: Zero ops, fast reads, no connection pool, portable
- **Cons**: Single writer, no remote connections, file-based persistence needed

### Scaling Path

If you outgrow SQLite:

1. **Turso** — SQLite-compatible, serverless, edge replication
   - Change adapter: `@prisma/adapter-better-sqlite3` → `@prisma/adapter-libsql`
   - Minimal code changes

2. **PostgreSQL** (Neon, Supabase, Vercel Postgres)
   - Update `schema.prisma`: `provider = "postgresql"`
   - Update JSON fields to use native JSON type
   - Run `npx prisma migrate dev` to regenerate

---

## Post-Deployment Checklist

- [ ] **SITE_URL** set to production domain
- [ ] **SSL** certificate configured (HTTPS)
- [ ] **Database seeded** — verify at `/api/health`
- [ ] **Sitemap** accessible at `/sitemap.xml`
- [ ] **robots.txt** accessible
- [ ] **Open Graph** meta tags verified (use [opengraph.xyz](https://www.opengraph.xyz))
- [ ] **Google Analytics** configured (`GA_MEASUREMENT_ID`)
- [ ] **DNS** configured (A record → server IP, or CNAME → Vercel)
- [ ] **Google Search Console** — submit sitemap
- [ ] **Performance** — run Lighthouse audit (target 90+ on all categories)
- [ ] **Email notifications** — configure SMTP for inquiry alerts (optional)
- [ ] **Backup schedule** — daily database backups for VPS/Docker setups
- [ ] **Monitoring** — `/api/health` endpoint for uptime checks
