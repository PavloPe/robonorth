# 🤖 RoboNorth — Canada's Humanoid Robot Marketplace

> Browse, compare, and pre-order humanoid robots from the world's leading manufacturers. Canada's first dedicated humanoid robot marketplace.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Prisma 7](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://prisma.io)

---

## ✨ Features

### Core
- **32+ humanoid robots** from 21 manufacturers with detailed specs, pricing, and availability
- **Side-by-side comparison** with radar/spider charts and highlighted best values
- **Robot quiz** — answer 5 questions to get personalized recommendations
- **Global search** (⌘K) across robots, brands, and articles
- **Canadian focus** — CAD pricing, shipping info, customs duties, trade agreements

### UI/UX
- **Dark mode** with system preference detection
- **PWA support** — installable, works offline
- **Responsive design** — mobile-first with slide-in menu
- **Quick view** modals on robot cards
- **Toast notifications** for user actions
- **Top progress bar** (NProgress-style) for page transitions
- **Favorites/wishlist** with localStorage persistence
- **Share button** with Web Share API
- **Image gallery** and YouTube video embeds

### SEO & Performance
- **JSON-LD structured data** (Product, Organization, BreadcrumbList, FAQ)
- **XML sitemap** with all pages, robots, manufacturers, and blog posts
- **Open Graph / Twitter Card** meta tags on all pages
- **Canonical URLs** and hreflang tags
- **Resource hints** (dns-prefetch, preconnect)
- **Static generation** (SSG) for robot and manufacturer pages
- **React Server Components** by default (client components only where needed)

### Accessibility
- **Skip-to-content** link
- **ARIA labels** on interactive elements
- **Focus rings** with :focus-visible
- **Reduced motion** support (prefers-reduced-motion)
- **Form validation** with aria-live error announcements
- **Proper heading hierarchy** (h1→h2→h3)
- **Print stylesheet** for robot detail pages

### Content
- **Blog** with industry articles, buying guides, and case studies
- **Comprehensive buying guide** (2,500+ words)
- **Robot FAQ sections** with structured data
- **Robotics glossary** (30+ terms)
- **Manufacturer founding stories**

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 22+** ([download](https://nodejs.org))
- **npm** (included with Node.js)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/robonorth.git
cd robonorth

# Install dependencies
npm install

# Seed the database
npm run db:seed

# Start development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build   # Build for production
npm start       # Start production server
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15.5](https://nextjs.org) (App Router, RSC) |
| React | [React 19](https://react.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) (PostCSS plugin) |
| ORM | [Prisma 7](https://prisma.io) (client-side query compiler) |
| Database | SQLite (via `@prisma/adapter-better-sqlite3`) |
| Language | TypeScript 5.8 (strict) |

---

## 📁 Project Structure

```
robonorth/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Seed script (32 robots, 21 manufacturers)
│   ├── dev.db                 # SQLite database
│   └── migrations/            # Prisma migrations
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   ├── robots/            # Robot catalog & detail pages
│   │   ├── manufacturers/     # Brand pages
│   │   ├── compare/           # Comparison tool
│   │   ├── quiz/              # Robot recommendation quiz
│   │   ├── blog/              # Blog articles
│   │   ├── contact/           # Contact form
│   │   ├── careers/           # Job listings
│   │   ├── partners/          # Partner directory
│   │   ├── financing/         # Leasing & financing info
│   │   ├── api-docs/          # API documentation
│   │   ├── changelog/         # Version history
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   └── layout/            # Header, Footer
│   ├── data/                  # Static data (robots, manufacturers, blog)
│   ├── i18n/                  # Internationalization (en/fr)
│   ├── lib/                   # Database, queries, utilities
│   ├── hooks/                 # Custom React hooks
│   └── types/                 # TypeScript types
├── public/                    # Static assets
└── package.json
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feat/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feat/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- **Server-first**: Default to React Server Components. Only use `"use client"` when interactivity is needed.
- **Type safety**: All code must be TypeScript. No `any` types.
- **No external CSS**: Pure Tailwind CSS. No component libraries.
- **Slug IDs**: Robot and manufacturer IDs are URL-friendly slugs.
- **Query layer**: All DB access through `src/lib/queries.ts`.

### Adding a New Robot

1. Add the entry to `src/data/robots.ts`
2. Add extras (FAQ, CAD pricing, video) to `src/data/robot-extras.ts`
3. Run `npm run db:seed`
4. Verify on `/robots` and `/robots/[slug]`

### Adding a New Page

1. Create `src/app/<route>/page.tsx`
2. Add metadata export for SEO
3. Add to Header nav (if primary) and Footer links
4. Add to `src/app/sitemap.ts`

---

## 📊 Database

SQLite via Prisma 7. Four models:

- **Robot** — 32 robots with specs, pricing, availability
- **Manufacturer** — 21 manufacturers with metadata
- **PartCategory** — 9 component categories
- **Inquiry** — Contact/inquiry submissions

```bash
npm run db:seed           # Seed database
npx prisma studio         # GUI browser
npx prisma migrate dev    # Create migration
```

---

## 🌐 API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/robots` | GET | All robots with specs |
| `/api/health` | GET | Health check |
| `/api/inquiry` | POST | Submit inquiry |

See [/api-docs](https://robonorth.ca/api-docs) for full documentation.

---

## 📸 Screenshots

*Screenshots section — add screenshots of the homepage, robot detail, comparison, and quiz pages here.*

---

## 📄 License

© 2026 RoboNorth. All rights reserved.

---

Built with ❤️ in Alberta, Canada 🇨🇦
