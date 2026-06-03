# Deployment Guide — RoboNorth

> Step-by-step instructions for deploying RoboNorth to various hosting platforms.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
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

### Example `.env`

```bash
DATABASE_URL="file:./prisma/dev.db"
SITE_URL="https://robonorth.ca"
GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

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
npm run db:seed
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
- [ ] **Domain auto-renewal** — Namecheap auto-renew ON + valid payment method on file (a lapsed renewal sends DNS to Namecheap/ParkLogic parking and breaks production immediately; see Troubleshooting → "Domain parked" in `.claude/skills/robonorth-deploy/SKILL.md`)
- [ ] **WHOIS-expiry alert** — uptime monitor configured to warn ≥30 days before domain expiry
