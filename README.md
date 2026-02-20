# 🤖 RoboNorth — Canada's Humanoid Robot Marketplace

> Browse, compare, and buy humanoid robots and parts from the world's leading manufacturers. Canada's first dedicated humanoid robot marketplace.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Prisma 7](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://prisma.io)

---

## 📊 Project Stats

| Metric | Count |
|--------|-------|
| 🤖 Robot Models | **40** |
| 🏭 Manufacturers | **26** |
| 🔩 Parts & Components | **71** |
| 📄 Total Pages | **299+** |
| 📝 In-depth Reviews | **13** |
| ⚔️ Head-to-Head Comparisons | **5** |
| 🌍 Languages | **2** (EN, FR) |
| 🛠️ Interactive Tools | **7** |

---

## ✨ Features

### 🛒 E-commerce
- **Add to Cart / Buy Now** — full cart and checkout flow
- **Inquiry basket** — multi-item quote requests for robots and parts
- **Order tracking** — post-purchase order status page
- **Enterprise inquiry** — dedicated B2B flow
- **Seller registration** — third-party seller onboarding portal
- **Financing calculator** — monthly payment estimates
- **Fleet discount calculator** — volume pricing tool
- **Rental & used marketplace** — alternative purchase options

### 🇨🇦 Canadian Focus
- **CAD/USD currency toggle** — site-wide pricing in both currencies
- **Provincial tax calculator** — real-time tax by province
- **Import duty calculator** — Canadian customs duties and fees
- **CUSMA trade benefits** — tariff-free imports under trade agreement
- **Provincial robotics pages** — Alberta, BC, Ontario, Quebec
- **Canadian grants & funding** — government incentive directory
- **Cross-border pricing comparison** — Canada vs. US vs. EU
- **CCA tax deduction guide** — Capital Cost Allowance for businesses
- **Regulatory compliance guide** — Canadian robotics regulations

### 🤖 Robot Catalog
- **40 humanoid robots** from 26 manufacturers with detailed specs, pricing, and availability
- **Side-by-side comparison** — up to 4 robots with radar charts and highlighted best values
- **5 head-to-head matchups** — in-depth Tesla vs Unitree, Figure vs 1X, and more
- **13 expert reviews** — 1,500–2,000 word in-depth robot reviews with scoring
- **Robot scoring system** — 5 criteria (Deployment, Capability, Availability, Value, Impact)
- **Variant system** — e.g., Unitree G1 with 6 variants (EDU, Standard, DEX, Pro, Research, Enterprise)
- **Category winner badges** — "Best Value", "Best for Research", etc.
- **Robot quiz** — 5-question recommendation engine
- **Size comparison tool** — visual height/weight comparison

### 🔩 Parts Catalog
- **71 real parts** across 7 categories: Actuators, Sensors, Controllers, Power, Structural, Hands, Software
- **Detailed specs** — technical specifications, compatible robots, datasheets
- **Dual pricing** — CAD and USD prices for every part
- **Sidebar filters** — category, price range, stock status, manufacturer
- **Compatible robots** — see which robots each part works with

### 📊 Tools & Calculators
- **TCO Calculator** — Total Cost of Ownership analysis
- **ROI Calculator** — Return on Investment projections
- **Import Duty Calculator** — Canadian import duties and taxes
- **Fleet Builder** — multi-robot fleet configuration
- **Size Comparison** — visual robot size comparison
- **Pricing Calculator** — CAD/USD with taxes
- **Financing Calculator** — monthly payment estimates

### 🎨 UI/UX
- **Dark mode** with system preference detection
- **PWA support** — installable, offline-capable
- **Global search** (⌘K) across robots, brands, parts, and articles
- **Responsive design** — mobile-first with slide-in menu
- **Quick view** modals on robot cards
- **Toast notifications** for user actions
- **Top progress bar** for page transitions
- **Favorites/wishlist** with localStorage persistence
- **Recently viewed** robot tracking
- **Cookie consent** banner (GDPR/PIPEDA)
- **Exit intent popup** for engagement retention
- **Animated elements** — fade-in sections, gradient backgrounds, 3D cards

### 📈 SEO & Performance
- **JSON-LD structured data** (Product, Organization, BreadcrumbList, FAQ, Article, Review)
- **XML sitemap** with all 299+ pages
- **Open Graph / Twitter Card** meta tags on every page
- **Canonical URLs** and hreflang tags (en-CA, fr-CA)
- **RSS feed** for blog syndication
- **Static generation** (SSG) for all catalog pages
- **React Server Components** by default
- **Image optimization** (AVIF/WebP, responsive sizes, 30-day cache)
- **Inter font** with optimized loading (swap + preload)

### ♿ Accessibility
- **Skip-to-content** link
- **ARIA labels** on interactive elements
- **Focus rings** with `:focus-visible`
- **Reduced motion** support (`prefers-reduced-motion`)
- **Form validation** with `aria-live` error announcements
- **Proper heading hierarchy** (h1→h2→h3)
- **Print stylesheet** for robot detail pages
- **Accessibility statement** page

### 📰 Content
- **Blog** with industry articles, buying guides, and case studies
- **Comprehensive buying guide** (2,500+ words)
- **"What Is a Humanoid Robot"** explainer guide
- **Robotics glossary** (30+ terms)
- **Humanoid robotics timeline**
- **Manufacturer founding stories**
- **Industry landing pages** (Manufacturing, Healthcare, Education, Logistics, Agriculture)
- **Canadian robotics report**
- **Robotics-as-a-Service (RaaS)** overview

### 🛡️ Trust & Community
- **Affiliate program** — partner referral system
- **Trade-in program** — robot upgrade path
- **Warranty plans** — tiered warranty options
- **Installation services** — professional setup
- **Awards & certifications** — industry recognition
- **Customer success stories**
- **Community hub**
- **Trust badges** — SSL, Canadian-owned, secure checkout

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 22+** ([download](https://nodejs.org))
- **npm** (included with Node.js)

### Setup

```bash
# Clone the repository
git clone https://github.com/robonorth/robonorth.git
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

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | [Next.js](https://nextjs.org) (App Router, RSC) | 15.5 |
| React | [React](https://react.dev) | 19.1 |
| Styling | [Tailwind CSS](https://tailwindcss.com) (PostCSS plugin) | 4.1 |
| ORM | [Prisma](https://prisma.io) (client-side query compiler) | 7.4 |
| Database | SQLite (via `@prisma/adapter-better-sqlite3`) | — |
| Language | TypeScript (strict) | 5.8 |

---

## 📁 Project Structure

```
robonorth/
├── prisma/
│   ├── schema.prisma          # Database schema (6 models)
│   ├── seed.ts                # Seed script (40 robots, 26 manufacturers, 71 parts)
│   ├── dev.db                 # SQLite database
│   └── migrations/            # Prisma migrations
├── src/
│   ├── app/                   # Next.js App Router (111 route files, 299+ pages)
│   │   ├── layout.tsx         # Root layout — providers, header, footer
│   │   ├── page.tsx           # Homepage
│   │   ├── robots/            # Robot catalog & detail pages
│   │   ├── manufacturers/     # Brand pages
│   │   ├── parts/             # Parts catalog & detail pages
│   │   ├── compare/           # Comparison tools (general + head-to-head)
│   │   ├── reviews/           # In-depth robot reviews
│   │   ├── blog/              # Blog articles
│   │   ├── fr/                # French language pages
│   │   ├── cart/              # Shopping cart
│   │   ├── inquiry/           # Inquiry system
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # 75+ reusable UI components
│   │   └── layout/            # Header, Footer
│   ├── data/                  # Static data (robots, manufacturers, parts, reviews)
│   ├── lib/                   # Database, queries, utilities, JSON-LD
│   └── types/                 # TypeScript types
├── docs/                      # Documentation
│   ├── API.md                 # API reference
│   ├── DATABASE.md            # Schema & seed reference
│   ├── DEPLOYMENT.md          # Deployment guide
│   └── CONTRIBUTING.md        # Contribution guidelines
├── ARCHITECTURE.md            # System architecture
├── CHANGELOG.md               # Version history
└── README.md                  # This file
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture, data flow, component hierarchy |
| [CHANGELOG.md](./CHANGELOG.md) | Complete version history (v0.1.0 → v4.0.0) |
| [docs/API.md](./docs/API.md) | API endpoint reference |
| [docs/DATABASE.md](./docs/DATABASE.md) | Database schema, seed process, migration guide |
| [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Deployment guide (Vercel, VPS, Docker) |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | How to contribute, code style, PR process |

---

## 🗄️ Database

SQLite via Prisma 7. Six models:

- **Robot** — 40 robots with specs, pricing, scoring, variants, reviews
- **Manufacturer** — 26 manufacturers with metadata
- **Part** — 71 parts with dual-currency pricing, specs, compatibility
- **PartCategory** — 7 component categories
- **Inquiry** — Contact/inquiry submissions
- **InquiryItem** — Line items for basket inquiries

```bash
npm run db:seed           # Seed database
npx prisma studio         # GUI browser
npx prisma migrate dev    # Create migration
```

---

## 🌐 API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/robots` | GET | All robots with full specs |
| `/api/inquiry` | POST | Submit inquiry (rate limited) |
| `/api/inquiry/basket` | POST | Submit basket inquiry with items |
| `/api/health` | GET | Health check with DB stats |
| `/feed.xml` | GET | RSS feed (blog posts) |

See [docs/API.md](./docs/API.md) for full documentation.

---

## 🤝 Contributing

We welcome contributions! See [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) for the full guide.

Quick start:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feat/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feat/amazing-feature`)
5. **Open** a Pull Request

### Key Conventions

- **Server-first**: Default to React Server Components. Only use `"use client"` for interactivity.
- **Type safety**: All code in TypeScript. No `any` types.
- **No UI libraries**: Pure Tailwind CSS. No Shadcn, MUI, etc.
- **Slug IDs**: Robot and manufacturer IDs are URL-friendly slugs.
- **Query layer**: All DB access through `src/lib/queries.ts` — pages never import Prisma.
- **Data pipeline**: Edit `src/data/*.ts` → `npm run db:seed` → verify.

---

## 📸 Screenshots

*Screenshots section — add screenshots of the homepage, robot detail, comparison, parts catalog, and review pages here.*

---

## 📄 License

© 2026 RoboNorth. All rights reserved.

---

Built with ❤️ in Alberta, Canada 🇨🇦
