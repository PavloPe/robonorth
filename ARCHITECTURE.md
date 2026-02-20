# Architecture — RoboNorth

> Comprehensive technical architecture reference for Canada's humanoid robot marketplace.

**Last updated:** February 2026 · **Version:** 4.0.0

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Data Architecture](#data-architecture)
- [Routing Architecture](#routing-architecture)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [SEO Architecture](#seo-architecture)
- [Performance](#performance)
- [Security](#security)
- [Deployment](#deployment)

---

## Overview

RoboNorth is a server-first, statically-generated marketplace built with Next.js 15.5 (App Router). It lets Canadian buyers browse, compare, and inquire about humanoid robots and parts from the world's leading manufacturers.

### Design Philosophy

1. **Server-first** — React Server Components by default; client components only when interactivity is required
2. **Canadian-focused** — CAD pricing, provincial tax calculations, CUSMA trade benefits, Canadian compliance
3. **Data-driven** — All content sourced from TypeScript seed files → SQLite → Prisma queries → pages
4. **SEO-optimized** — Static generation, structured data, comprehensive meta tags, sitemap
5. **Zero runtime dependencies** — No UI libraries (Shadcn, MUI, etc.); pure Tailwind CSS

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Browser / Client                          │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │Dark Mode │  │ Compare  │  │   Inquiry    │  │   Currency    │  │
│  │ Toggle   │  │ Provider │  │   Basket     │  │   Toggle      │  │
│  │(localStorage)│(Context) │  │  (Context)   │  │ (localStorage)│  │
│  └──────────┘  └──────────┘  └──────────────┘  └───────────────┘  │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ HTTP / RSC Stream
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     Next.js 15.5 (App Router)                       │
│                                                                     │
│  ┌────────────────┐  ┌───────────────┐  ┌────────────────────────┐ │
│  │  Server        │  │  API Routes   │  │  Static Generation     │ │
│  │  Components    │  │ /api/robots   │  │  generateStaticParams  │ │
│  │  (pages)       │  │ /api/inquiry  │  │  → robots/[slug]       │ │
│  │                │  │ /api/health   │  │  → manufacturers/[slug]│ │
│  └───────┬────────┘  └───────┬───────┘  │  → parts/[slug]       │ │
│          │                   │          │  → compare/[slug]      │ │
│          ▼                   ▼          │  → reviews/[slug]      │ │
│  ┌─────────────────────────────────┐    │  → blog/[slug]         │ │
│  │    src/lib/queries.ts           │    └────────────────────────┘ │
│  │    (Data access layer)          │                                │
│  │    toRobot() / toPart() mappers │                                │
│  └───────────────┬─────────────────┘                                │
│                  │                                                   │
│                  ▼                                                   │
│  ┌─────────────────────────────────┐                                │
│  │    Prisma 7 Client              │                                │
│  │    (client-side query compiler) │                                │
│  │    adapter-better-sqlite3       │                                │
│  └───────────────┬─────────────────┘                                │
│                  │                                                   │
│                  ▼                                                   │
│  ┌─────────────────────────────────┐                                │
│  │    SQLite (prisma/dev.db)       │                                │
│  │    Robot │ Manufacturer │ Part  │                                │
│  │    PartCategory │ Inquiry │     │                                │
│  │    InquiryItem                  │                                │
│  └─────────────────────────────────┘                                │
└─────────────────────────────────────────────────────────────────────┘

Data pipeline:
  src/data/*.ts  →  prisma/seed.ts  →  SQLite  →  queries.ts  →  Pages
  (static data)     (seed script)     (dev.db)    (mappers)     (RSC)
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, RSC) | 15.5 |
| UI Library | React | 19.1 |
| Styling | Tailwind CSS (PostCSS plugin) | 4.1 |
| ORM | Prisma (client-side query compiler) | 7.4 |
| DB Adapter | `@prisma/adapter-better-sqlite3` | 7.4 |
| Database | SQLite | 3.x |
| Language | TypeScript (strict) | 5.8 |
| Linting | ESLint + eslint-config-next | 9.28 |
| PostCSS | postcss + autoprefixer | 8.5 |
| Runtime | Node.js | 22+ |

### Key Dependency Choices

- **No UI component libraries** — All components hand-built with Tailwind CSS
- **No state management library** — React Context + localStorage
- **No CSS-in-JS** — Tailwind 4 via PostCSS (no `tailwind.config.ts` needed)
- **No external auth** — Placeholder login/register pages
- **No external email** — Inquiry logging only (email integration TODO)

---

## Directory Structure

```
robonorth/
│
├── prisma/                          # Database layer
│   ├── schema.prisma                # Database schema (6 models)
│   ├── seed.ts                      # Seed script — loads src/data/* into SQLite
│   ├── dev.db                       # SQLite database file (gitignored)
│   └── migrations/                  # Prisma migration history
│
├── public/                          # Static assets
│   ├── manifest.json                # PWA manifest
│   ├── sw.js                        # Service worker
│   ├── icon-192.png                 # PWA icon
│   ├── icon-512.png                 # PWA splash icon
│   ├── og-default.png               # Default Open Graph image
│   └── robots.txt                   # Search engine directives
│
├── src/
│   ├── app/                         # Next.js App Router (111 route files)
│   │   ├── layout.tsx               # Root layout — providers, header, footer, scripts
│   │   ├── page.tsx                 # Homepage — hero, featured robots, brands, parts, CTA
│   │   ├── loading.tsx              # Global loading skeleton
│   │   ├── error.tsx                # Global error boundary
│   │   ├── not-found.tsx            # Custom 404 page
│   │   ├── globals.css              # Tailwind CSS imports
│   │   ├── sitemap.ts               # Dynamic sitemap generation
│   │   │
│   │   ├── robots/                  # Robot catalog
│   │   │   ├── page.tsx             # Catalog with filters, search, pagination
│   │   │   ├── loading.tsx          # Catalog skeleton
│   │   │   ├── error.tsx            # Catalog error boundary
│   │   │   ├── [slug]/             
│   │   │   │   ├── page.tsx         # Robot detail (SSG via generateStaticParams)
│   │   │   │   └── loading.tsx      # Detail skeleton
│   │   │   ├── category/[category]/ # Category-filtered views
│   │   │   └── use-case/[usecase]/  # Use-case filtered views
│   │   │
│   │   ├── manufacturers/           # Brand directory
│   │   │   ├── page.tsx             # All manufacturers grid
│   │   │   ├── loading.tsx          # Manufacturer skeleton
│   │   │   └── [slug]/page.tsx      # Manufacturer detail (SSG)
│   │   │
│   │   ├── parts/                   # Parts catalog
│   │   │   ├── page.tsx             # Full parts catalog with sidebar filters
│   │   │   └── [slug]/page.tsx      # Part detail with specs and compatibility
│   │   │
│   │   ├── compare/                 # Comparison tools
│   │   │   ├── page.tsx             # Side-by-side comparison (up to 4)
│   │   │   └── [slug]/page.tsx      # Head-to-head comparison pages (5 matchups)
│   │   │
│   │   ├── reviews/                 # Robot reviews
│   │   │   ├── page.tsx             # Review index
│   │   │   └── [slug]/page.tsx      # Individual review (1,500–2,000 words)
│   │   │
│   │   ├── blog/                    # Blog system
│   │   │   ├── page.tsx             # Blog index
│   │   │   ├── [slug]/page.tsx      # Blog article detail
│   │   │   └── cca-tax-deduction-robots/page.tsx  # Standalone blog post
│   │   │
│   │   ├── fr/                      # French language pages
│   │   │   ├── page.tsx             # French homepage
│   │   │   ├── about/page.tsx       # French about
│   │   │   └── robots/page.tsx      # French robot catalog
│   │   │
│   │   ├── robots-for/              # Industry landing pages
│   │   │   └── [industry]/page.tsx  # Dynamic industry pages
│   │   │
│   │   ├── use-cases/               # Use case deep-dives
│   │   │   ├── page.tsx             # Use cases overview
│   │   │   ├── manufacturing/       # Manufacturing use case
│   │   │   ├── healthcare/          # Healthcare use case
│   │   │   ├── education/           # Education use case
│   │   │   ├── hospitality/         # Hospitality use case
│   │   │   └── agriculture/         # Agriculture use case
│   │   │
│   │   ├── case-studies/            # Case studies
│   │   │   └── toyota-agility/page.tsx
│   │   │
│   │   ├── services/                # Service pages
│   │   │   └── installation/page.tsx
│   │   │
│   │   ├── api/                     # API routes
│   │   │   ├── robots/route.ts      # GET — all robots JSON
│   │   │   ├── inquiry/route.ts     # POST — submit inquiry
│   │   │   ├── inquiry/basket/route.ts # POST — submit basket inquiry
│   │   │   └── health/route.ts      # GET — health check
│   │   │
│   │   ├── feed.xml/route.ts        # RSS feed generator
│   │   │
│   │   │  # ── Commerce pages ──
│   │   ├── buy/page.tsx             # Buy Now entry point
│   │   ├── cart/page.tsx            # Shopping cart
│   │   ├── orders/page.tsx          # Order tracking
│   │   ├── sell/page.tsx            # Seller registration
│   │   ├── enterprise/page.tsx      # Enterprise inquiry
│   │   ├── financing/page.tsx       # Leasing & financing
│   │   ├── rental/page.tsx          # Robot rental
│   │   ├── used-robots/page.tsx     # Used marketplace
│   │   ├── demo/page.tsx            # Demo request
│   │   ├── inquiry/                 # Inquiry system
│   │   │   ├── page.tsx             # Inquiry form
│   │   │   └── basket/page.tsx      # Basket inquiry
│   │   │
│   │   │  # ── Canadian pages ──
│   │   ├── why-canada/page.tsx      # Canadian advantage
│   │   ├── cusma/page.tsx           # CUSMA trade agreement
│   │   ├── compliance/page.tsx      # Regulatory compliance
│   │   ├── compare-international/page.tsx  # Cross-border pricing
│   │   ├── robotics-in-alberta/     # Provincial pages
│   │   ├── robotics-in-bc/
│   │   ├── robotics-in-ontario/
│   │   ├── robotics-in-quebec/
│   │   │
│   │   │  # ── Tools & calculators ──
│   │   ├── calculator/page.tsx      # CAD pricing calculator
│   │   ├── tco-calculator/page.tsx  # Total cost of ownership
│   │   ├── roi-calculator/page.tsx  # Return on investment
│   │   ├── import-calculator/page.tsx # Import duty calculator
│   │   ├── size-compare/page.tsx    # Visual size comparison
│   │   ├── fleet-builder/page.tsx   # Fleet configuration
│   │   ├── quiz/page.tsx            # Robot recommendation quiz
│   │   ├── recommend/page.tsx       # Recommendation engine
│   │   │
│   │   │  # ── Trust & community ──
│   │   ├── affiliates/page.tsx      # Affiliate program
│   │   ├── trade-in/page.tsx        # Trade-in program
│   │   ├── warranty-plans/page.tsx  # Warranty tiers
│   │   ├── awards/page.tsx          # Industry awards
│   │   ├── certification/page.tsx   # Certifications
│   │   ├── referral/page.tsx        # Referral program
│   │   ├── community/page.tsx       # Community hub
│   │   │
│   │   │  # ── Content & resources ──
│   │   ├── about/page.tsx           # About RoboNorth
│   │   ├── contact/page.tsx         # Contact form
│   │   ├── faq/page.tsx             # FAQ
│   │   ├── glossary/page.tsx        # Robotics glossary
│   │   ├── resources/page.tsx       # Resource library
│   │   ├── what-is-humanoid-robot/  # Explainer guide
│   │   ├── day-in-the-life/         # Narrative content
│   │   ├── canadian-robotics/       # Canadian robotics overview
│   │   ├── canada-robotics-report/  # Industry report
│   │   ├── timeline/page.tsx        # Robotics history
│   │   ├── industry-map/page.tsx    # Canadian industry map
│   │   ├── events/page.tsx          # Events calendar
│   │   ├── webinars/page.tsx        # Webinars
│   │   ├── getting-started/page.tsx # Beginner guide
│   │   ├── safety/page.tsx          # Safety info
│   │   ├── grants/page.tsx          # Grants & funding
│   │   ├── universities/page.tsx    # Research institutions
│   │   │
│   │   │  # ── Company pages ──
│   │   ├── careers/page.tsx         # Job listings
│   │   ├── partners/page.tsx        # Partner directory
│   │   ├── press/page.tsx           # Press & media
│   │   ├── team/page.tsx            # Team page
│   │   ├── success-stories/page.tsx # Customer stories
│   │   ├── changelog/page.tsx       # Version history (in-app)
│   │   ├── api-docs/page.tsx        # API documentation
│   │   ├── submit-robot/page.tsx    # Submit a robot
│   │   ├── newsletter-archive/      # Past newsletters
│   │   ├── jobs-board/page.tsx      # Jobs board
│   │   ├── education-pricing/       # Education pricing
│   │   ├── support-plans/page.tsx   # Support tiers
│   │   │
│   │   │  # ── Auth (placeholder) ──
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── wishlist/page.tsx
│   │   │
│   │   │  # ── Legal ──
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── warranty/page.tsx
│   │   ├── shipping-policy/page.tsx
│   │   ├── return-policy/page.tsx
│   │   ├── refund-policy/page.tsx
│   │   └── accessibility/page.tsx
│   │
│   ├── components/
│   │   ├── ui/                      # 75+ reusable UI components
│   │   │   ├── Badge.tsx            # Status badges (server)
│   │   │   ├── Button.tsx           # Button variants (server)
│   │   │   ├── HeroSection.tsx      # Homepage hero (server)
│   │   │   ├── RobotCard.tsx        # Robot listing card (server)
│   │   │   ├── PartCard.tsx         # Part listing card (server)
│   │   │   ├── ManufacturerCard.tsx # Brand card (server)
│   │   │   ├── CompareTable.tsx     # Comparison table (server)
│   │   │   ├── RobotCatalog.tsx     # Catalog with filters (client)
│   │   │   ├── SidebarFilters.tsx   # Filter checkboxes (client)
│   │   │   ├── GlobalSearch.tsx     # ⌘K search (client)
│   │   │   ├── DarkModeToggle.tsx   # Theme switcher (client)
│   │   │   ├── InquiryForm.tsx      # Form submission (client)
│   │   │   ├── CurrencyToggle.tsx   # CAD/USD toggle (client)
│   │   │   └── ... (75+ components)
│   │   └── layout/
│   │       ├── Header.tsx           # Sticky nav with mobile menu (client)
│   │       └── Footer.tsx           # 6-column footer with newsletter (server)
│   │
│   ├── lib/                         # Core libraries
│   │   ├── db.ts                    # Prisma client singleton (adapter pattern)
│   │   ├── queries.ts               # All database queries + row mappers
│   │   ├── jsonld.ts                # JSON-LD structured data generators
│   │   ├── constants.ts             # Site config, nav links, footer columns
│   │   ├── env.ts                   # Environment config with validation
│   │   ├── rate-limit.ts            # In-memory rate limiter
│   │   └── logger.ts                # Structured logger with context
│   │
│   ├── data/                        # Static data modules (seed sources)
│   │   ├── robots.ts                # 40 robots with full specs
│   │   ├── manufacturers.ts         # 26 manufacturers
│   │   ├── parts.ts                 # 7 part categories
│   │   ├── parts-catalog.ts         # 71 parts with specs and pricing
│   │   ├── reviews.ts               # 13 robot reviews (1,500–2,000 words)
│   │   ├── comparisons.ts           # 5 head-to-head comparisons
│   │   ├── blog.ts                  # Blog index and utilities
│   │   ├── blog-articles.ts         # Blog articles (v1)
│   │   ├── blog-articles-v2.ts      # Blog articles (v2 — buying guide)
│   │   ├── blog-articles-v3.ts      # Blog articles (v3)
│   │   ├── blog-articles-v4.ts      # Blog articles (v4)
│   │   ├── robot-extras.ts          # FAQ, CAD pricing, videos, shipping per robot
│   │   ├── manufacturer-stories.ts  # Founding stories
│   │   ├── industries.ts            # Industry vertical data
│   │   └── i18n/
│   │       └── fr.ts                # French translations
│   │
│   └── types/
│       ├── index.ts                 # Shared TypeScript interfaces
│       └── global.d.ts              # Global type augmentations
│
├── docs/                            # Project documentation
│   ├── API.md                       # API reference
│   ├── DATABASE.md                  # Schema & seed reference
│   ├── DEPLOYMENT.md                # Deployment guide
│   └── CONTRIBUTING.md              # Contribution guidelines
│
├── ARCHITECTURE.md                  # This file
├── CHANGELOG.md                     # Version history
├── README.md                        # Project overview
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
├── postcss.config.mjs               # PostCSS with Tailwind 4
├── package.json                     # Dependencies and scripts
└── .eslintrc.json                   # ESLint configuration
```

---

## Data Architecture

### Database Schema

RoboNorth uses SQLite via Prisma 7 with `@prisma/adapter-better-sqlite3`. The schema has 6 models:

```
┌─────────────────────────────────────────────────────────────────┐
│                        Entity Relationships                     │
│                                                                 │
│  ┌──────────────┐       ┌──────────────────┐                   │
│  │ Manufacturer │◄──────│     Robot        │                   │
│  │              │ 1:N   │                  │                   │
│  │ id (slug)    │(via   │ id (slug)        │                   │
│  │ name         │ mfr   │ name             │                   │
│  │ country      │ Slug) │ manufacturerSlug ─┼──► Manufacturer  │
│  │ founded      │       │ price / priceMin  │                   │
│  │ description  │       │ availability      │                   │
│  │ website      │       │ category          │                   │
│  │ robotIds[]   │       │ useCase (JSON)    │                   │
│  │ imageUrl     │       │ specs (flattened)  │                   │
│  │ featured     │       │ variants (JSON)    │                   │
│  └──────────────┘       │ scores (JSON)      │                   │
│                         │ reviewSlug         │                   │
│                         └──────────────────┘                   │
│                                                                 │
│  ┌──────────────┐       ┌──────────────────┐                   │
│  │ PartCategory │       │     Part         │                   │
│  │              │       │                  │                   │
│  │ id (slug)    │       │ id (slug)        │                   │
│  │ name         │       │ name             │                   │
│  │ description  │       │ category ────────┼──► PartCategory   │
│  │ itemCount    │       │ manufacturer     │                   │
│  │ imageUrl     │       │ priceCAD/priceUSD│                   │
│  │ popularItems │       │ specifications   │                   │
│  │   (JSON)     │       │   (JSON)         │                   │
│  └──────────────┘       │ compatibility    │                   │
│                         │   (JSON → Robot) │                   │
│                         │ inStock          │                   │
│                         │ featured         │                   │
│                         └──────────────────┘                   │
│                                                                 │
│  ┌──────────────┐       ┌──────────────────┐                   │
│  │   Inquiry    │       │  InquiryItem     │                   │
│  │              │ 1:N   │                  │                   │
│  │ id (cuid)    │◄──────│ id (cuid)        │                   │
│  │ name         │       │ inquiryId ───────┼──► Inquiry        │
│  │ email        │       │ itemType         │                   │
│  │ phone?       │       │ itemId           │                   │
│  │ company?     │       │ itemName         │                   │
│  │ city         │       │ quantity         │                   │
│  │ robot?       │       └──────────────────┘                   │
│  │ message?     │                                               │
│  │ type         │  Types: general | quick | basket              │
│  │ contactMethod│  Methods: email | phone | either              │
│  │ referenceNumber│                                             │
│  │ items[]      │                                               │
│  └──────────────┘                                               │
└─────────────────────────────────────────────────────────────────┘
```

### Model Details

#### Robot
| Field | Type | Notes |
|-------|------|-------|
| `id` | String (PK) | URL slug, e.g. `unitree-g1` |
| `name` | String | Display name |
| `manufacturer` | String | Display name |
| `manufacturerSlug` | String (indexed) | FK-like reference to Manufacturer |
| `price` | String | Display string, e.g. "From $13,500 USD" |
| `priceMin` | Int (indexed) | Numeric for sorting/filtering |
| `availability` | String (indexed) | shipping \| preorder \| pilot \| announced \| prototype |
| `category` | String (indexed) | consumer \| enterprise \| research \| announced |
| `useCase` | String | JSON array stored as string |
| `specHeight` through `specSpeed` | Float/Int/String? | Flattened spec fields |
| `variants` | String? | JSON array of variant objects |
| `scores` | String? | JSON object with 5 scoring criteria |
| `categoryWinners` | String? | JSON array of winner badge strings |
| `reviewSlug` | String? | Link to review page |
| `featured` | Boolean (indexed) | Show on homepage |

#### Part
| Field | Type | Notes |
|-------|------|-------|
| `id` | String (PK) | URL slug |
| `priceCAD` / `priceUSD` | Float | Dual-currency pricing |
| `specifications` | String | JSON key-value object |
| `compatibility` | String | JSON array of robot slugs |
| `inStock` | Boolean (indexed) | Stock availability |
| `leadTimeDays` | Int? | Estimated delivery time |
| `datasheetUrl` | String | Link to manufacturer datasheet |

### JSON Fields in SQLite

SQLite has no native JSON column type. Arrays and objects are stored as JSON strings and parsed in query mappers:

```typescript
// src/lib/queries.ts
function toRobot(r: DbRobot): Robot {
  return {
    ...r,
    useCase: JSON.parse(r.useCase),          // "[\"warehouse\",\"delivery\"]" → string[]
    scores: r.scores ? JSON.parse(r.scores) : null,  // JSON → RobotScores
    categoryWinners: r.categoryWinners ? JSON.parse(r.categoryWinners) : [],
    specs: {
      height: r.specHeight,   // Flattened → nested object
      weight: r.specWeight,
      dof: r.specDof,
      battery: r.specBattery,
      payload: r.specPayload,
      speed: r.specSpeed,
    },
  };
}
```

### Data Flow

```
1. AUTHOR: Edit TypeScript data files in src/data/
   └── robots.ts, manufacturers.ts, parts-catalog.ts, reviews.ts, etc.

2. SEED: Run `npm run db:seed` (npx tsx prisma/seed.ts)
   └── Reads src/data/*.ts → Inserts into SQLite via Prisma

3. QUERY: Pages call functions in src/lib/queries.ts
   └── getAllRobots(), getRobotBySlug(), getFeaturedParts(), etc.
   └── Row mappers (toRobot, toPart) parse JSON fields

4. RENDER: Server components receive typed data, render HTML
   └── No Prisma imports in pages — always through queries.ts

5. STATIC: Dynamic routes use generateStaticParams for SSG
   └── /robots/[slug], /manufacturers/[slug], /parts/[slug], etc.
```

---

## Routing Architecture

### Route Categories

RoboNorth has **111 route files** generating **299+ pages** (including dynamic routes).

#### Catalog Routes (Dynamic — SSG)
| Route | Type | Description |
|-------|------|-------------|
| `/robots` | Static | Robot catalog with filters |
| `/robots/[slug]` | SSG (40 pages) | Robot detail pages |
| `/robots/category/[category]` | Dynamic | Category-filtered view |
| `/robots/use-case/[usecase]` | Dynamic | Use case-filtered view |
| `/manufacturers` | Static | Brand directory |
| `/manufacturers/[slug]` | SSG (26 pages) | Manufacturer detail pages |
| `/parts` | Static | Parts catalog with filters |
| `/parts/[slug]` | SSG (71 pages) | Part detail pages |

#### Comparison & Review Routes
| Route | Type | Description |
|-------|------|-------------|
| `/compare` | Static | Side-by-side comparison tool |
| `/compare/[slug]` | SSG (5 pages) | Head-to-head comparisons |
| `/reviews` | Static | Review index |
| `/reviews/[slug]` | SSG (13 pages) | In-depth robot reviews |

#### Content Routes (Static)
| Route | Type | Description |
|-------|------|-------------|
| `/blog` | Static | Blog index |
| `/blog/[slug]` | SSG | Blog articles |
| `/blog/cca-tax-deduction-robots` | Static | Standalone blog post |
| `/what-is-humanoid-robot` | Static | Explainer guide |
| `/faq` | Static | FAQ |
| `/glossary` | Static | Robotics glossary |
| `/about`, `/contact`, `/team` | Static | Company info |
| `/case-studies/toyota-agility` | Static | Case study |

#### Tool & Calculator Routes
| Route | Description |
|-------|-------------|
| `/quiz` | Robot recommendation quiz |
| `/calculator` | CAD pricing calculator |
| `/tco-calculator` | Total cost of ownership |
| `/roi-calculator` | Return on investment |
| `/import-calculator` | Import duties |
| `/size-compare` | Visual size comparison |
| `/fleet-builder` | Fleet configuration |
| `/recommend` | Recommendation engine |

#### Commerce Routes
| Route | Description |
|-------|-------------|
| `/buy` | Buy Now page |
| `/cart` | Shopping cart |
| `/orders` | Order tracking |
| `/sell` | Seller registration |
| `/enterprise` | Enterprise inquiry |
| `/financing` | Leasing & financing |
| `/rental` | Robot rental |
| `/used-robots` | Used marketplace |
| `/demo` | Demo request |
| `/inquiry` | General inquiry |
| `/inquiry/basket` | Basket inquiry |

#### Canadian Routes
| Route | Description |
|-------|-------------|
| `/why-canada` | Canadian advantage |
| `/cusma` | CUSMA trade benefits |
| `/compliance` | Regulatory compliance |
| `/compare-international` | Cross-border pricing |
| `/canadian-robotics` | Canadian robotics overview |
| `/canada-robotics-report` | Industry report |
| `/robotics-in-alberta` | Provincial page |
| `/robotics-in-bc` | Provincial page |
| `/robotics-in-ontario` | Provincial page |
| `/robotics-in-quebec` | Provincial page |
| `/grants` | Canadian grants & funding |

#### French (i18n) Routes
| Route | Description |
|-------|-------------|
| `/fr` | French homepage |
| `/fr/about` | French about |
| `/fr/robots` | French robot catalog |

#### Industry Landing Pages
| Route | Description |
|-------|-------------|
| `/robots-for/[industry]` | Dynamic industry pages |
| `/use-cases` | Use cases overview |
| `/use-cases/manufacturing` | Manufacturing deep-dive |
| `/use-cases/healthcare` | Healthcare deep-dive |
| `/use-cases/education` | Education deep-dive |
| `/use-cases/hospitality` | Hospitality deep-dive |
| `/use-cases/agriculture` | Agriculture deep-dive |

#### Legal Routes
| Route | Description |
|-------|-------------|
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/warranty` | Warranty info |
| `/shipping-policy` | Shipping policy |
| `/return-policy` | Return policy |
| `/refund-policy` | Refund policy |
| `/accessibility` | Accessibility statement |

#### API Routes
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/robots` | GET | All robots as JSON |
| `/api/inquiry` | POST | Submit general inquiry |
| `/api/inquiry/basket` | POST | Submit basket inquiry with items |
| `/api/health` | GET | Health check with DB stats |
| `/feed.xml` | GET | RSS feed (blog posts) |

#### Admin / Auth Routes
| Route | Description |
|-------|-------------|
| `/admin` | Admin dashboard (stats) |
| `/login` | Login placeholder |
| `/register` | Registration placeholder |
| `/wishlist` | User wishlist |

---

## Component Architecture

### Provider Hierarchy

The root layout (`src/app/layout.tsx`) wraps the app in nested providers:

```
<html>
  <body>
    <ToastProvider>
      <CompareProvider>
        <InquiryBasketProvider>
          <TopProgressBar />
          <WinterShippingBanner />
          <Header />
          <main>{children}</main>
          <TrustBadges />
          <Footer />
          <BackToTop />
          <CookieConsent />
          <ExitIntentPopup />
          <LiveChatWidget />
          <InquiryBasketDrawer />
          <WebVitals />
          <ServiceWorkerRegistration />
        </InquiryBasketProvider>
      </CompareProvider>
    </ToastProvider>
  </body>
</html>
```

### Server Components (Default)

Most components are React Server Components — no `"use client"` directive:

| Component | Purpose |
|-----------|---------|
| `Badge` | Color-coded status badges |
| `Button` | Button variants |
| `HeroSection` | Homepage hero |
| `RobotCard` | Robot listing card |
| `PartCard` | Part listing card |
| `ManufacturerCard` | Brand card |
| `PartCategoryCard` | Part category card |
| `CompareTable` | Comparison data table |
| `FilterBar` | Static filter display |
| `MadeInCanada` | Canadian badge |
| `ResponsiveImage` | Optimized image wrapper |
| `Footer` | Site footer |
| `TrustBadges` | Trust indicators |
| `WinterShippingBanner` | Seasonal banner |
| `MediaMentions` | Press mentions |
| `PartnerLogoBanner` | Partner logos |
| `PaymentMethodsBadges` | Payment icons |

### Client Components (`"use client"`)

Interactive components that need browser APIs, state, or event handlers:

| Component | Why Client? |
|-----------|-------------|
| `Header` | Mobile menu toggle, scroll detection |
| `RobotCatalog` | Client-side filtering, sorting, search |
| `SidebarFilters` | Checkbox state, filter interaction |
| `GlobalSearch` | Keyboard shortcuts (⌘K), input focus |
| `DarkModeToggle` | localStorage theme, system preference |
| `CurrencyToggle` | localStorage currency preference |
| `InquiryForm` | Form submission, validation |
| `BasketInquiryForm` | Multi-item form submission |
| `ContactForm` | Contact form submission |
| `VendorForm` | Seller registration form |
| `EducationForm` | Education pricing form |
| `CompareBar` | Persistent comparison selection |
| `InquiryBasketProvider` | Basket state context |
| `InquiryBasketDrawer` | Slide-out basket panel |
| `InquiryBasketIcon` | Header basket count |
| `AddToBasketButton` | Add item interaction |
| `CartPageClient` | Cart quantity controls |
| `WishlistClient` | Wishlist management |
| `QuickViewModal` | Modal dialog |
| `ImageGallery` | Image carousel |
| `VideoEmbed` | YouTube player |
| `RadarChart` | Canvas-based chart |
| `SizeComparison` | Interactive comparison |
| `CookieConsent` | Banner dismiss |
| `ExitIntentPopup` | Mouse leave detection |
| `BackToTop` | Scroll position tracking |
| `TopProgressBar` | Route change detection |
| `LiveChatWidget` | Chat toggle |
| `LiveInquiryWidget` | Floating inquiry |
| `Pagination` | Page navigation state |
| `FavoritesButton` | localStorage favorites |
| `NotifyMeButton` | Alert signup |
| `PriceAlertSignup` | Price notification |
| `ShareButton` | Web Share API |
| `SocialShareButtons` | Social sharing |
| `RecentlyViewed` | localStorage history |
| `RobotDetailTracker` | View tracking |
| `StatsCounter` | Animated counters |
| `FadeInSection` | Intersection Observer |
| `LazySection` | Lazy loading |
| `Toast` / `ToastProvider` | Notification state |
| `DeliveryEstimator` | Province selection |
| `ShippingEstimatorWidget` | Shipping calculation |
| `ProvincialTaxCalculator` | Tax calculation |
| `FinancingCalculator` | Payment calculation |
| `FleetDiscount` | Volume pricing |
| `CrossBorderComparison` | Pricing comparison |
| `MobileFilters` | Mobile filter drawer |
| `PartsMobileFilters` | Parts mobile filters |
| `PartsSidebarFilters` | Parts filter checkboxes |
| `PartsSortSelect` | Parts sort dropdown |
| `SortSelect` | Robot sort dropdown |
| `SocialFeed` | Social media content |
| `CustomerReviews` | Testimonial carousel |
| `RobotOfMonth` | Featured highlight |
| `WebVitals` | Performance monitoring |
| `ServiceWorkerRegistration` | SW registration |

---

## State Management

RoboNorth uses no external state management library. State is managed through three patterns:

### 1. localStorage (Persistent Client State)

| Key | Purpose | Used By |
|-----|---------|---------|
| `robonorth-theme` | Dark mode preference (`light` \| `dark`) | `DarkModeToggle` |
| `robonorth-favorites` | Favorited robot slugs | `FavoritesButton` |
| `robonorth-recently-viewed` | Recently viewed robot slugs | `RecentlyViewed` |
| `robonorth-inquiry-basket` | Inquiry basket items (JSON) | `InquiryBasketProvider` |
| `robonorth-currency` | Currency preference (`CAD` \| `USD`) | `CurrencyToggle` |
| `robonorth-cookie-consent` | Cookie consent accepted | `CookieConsent` |
| `robonorth-exit-popup-dismissed` | Exit popup dismissed | `ExitIntentPopup` |
| `robonorth-cart` | Shopping cart items | `CartPageClient` |
| `robonorth-wishlist` | Wishlist items | `WishlistClient` |

### 2. React Context (Shared Component State)

| Provider | State | Consumers |
|----------|-------|-----------|
| `ToastProvider` | Toast notifications queue | `Toast`, any component via `useToast()` |
| `CompareProvider` | Selected robots for comparison (max 4) | `CompareBar`, `RobotCard` compare button |
| `InquiryBasketProvider` | Basket items, drawer open/close | `InquiryBasketDrawer`, `AddToBasketButton`, `InquiryBasketIcon` |

### 3. URL State (Shareable, Bookmarkable)

| Parameter | Page | Purpose |
|-----------|------|---------|
| `?category=consumer` | `/robots` | Filter by category |
| `?availability=shipping` | `/robots` | Filter by availability |
| `?search=unitree` | `/robots` | Search query |
| `?sort=price-asc` | `/robots`, `/parts` | Sort order |
| `?page=2` | `/robots`, `/parts` | Pagination |
| `?robots=slug1,slug2` | `/compare` | Robots to compare |

---

## SEO Architecture

### Metadata Strategy

Every page exports a `metadata` object or `generateMetadata()` function:

```typescript
// Static metadata
export const metadata: Metadata = {
  title: 'Robot Catalog',  // Becomes "Robot Catalog | RoboNorth" via template
  description: '...',
  alternates: { canonical: 'https://robonorth.ca/robots' },
};

// Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const robot = await getRobotBySlug(params.slug);
  return { title: robot.name, description: robot.description };
}
```

Root layout sets the template: `'%s | RoboNorth'`

### JSON-LD Structured Data

Generated by `src/lib/jsonld.ts`:

| Schema Type | Pages | Purpose |
|-------------|-------|---------|
| `WebSite` | All (root layout) | Site search, name, URL |
| `Organization` | All (root layout) | Company info, social links |
| `Product` | `/robots/[slug]` | Robot pricing, availability, brand |
| `BreadcrumbList` | Detail pages | Navigation hierarchy |
| `FAQPage` | `/faq`, robot pages | FAQ structured data |
| `Article` | `/blog/[slug]` | Blog article metadata |
| `Review` | `/reviews/[slug]` | Review structured data |

### Sitemap

Dynamic sitemap at `/sitemap.ts` includes:
- All robot detail pages (40)
- All manufacturer pages (26)
- All part pages (71)
- All blog posts
- All comparison pages (5)
- All industry pages
- All static pages (~150+)

### RSS Feed

`/feed.xml` (Route Handler) generates an RSS 2.0 feed of blog posts for syndication.

### i18n / hreflang

```html
<link rel="alternate" hreflang="en-CA" href="https://robonorth.ca" />
<link rel="alternate" hreflang="fr-CA" href="https://robonorth.ca/fr" />
```

French pages exist at `/fr`, `/fr/about`, `/fr/robots` with translations from `src/data/i18n/fr.ts`.

---

## Performance

### Static Generation (SSG)

All detail pages are pre-rendered at build time via `generateStaticParams()`:

```typescript
// src/app/robots/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = await getAllRobotSlugs();   // 40 slugs
  return slugs.map(slug => ({ slug }));
}
```

This applies to: robots, manufacturers, parts, comparisons, reviews, and blog posts.

### Image Optimization

Configured in `next.config.ts`:

```typescript
images: {
  formats: ['image/avif', 'image/webp'],          // Modern formats
  deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive breakpoints
  imageSizes: [16, 32, 48, 64, 96, 128, 256],     // Icon sizes
  minimumCacheTTL: 60 * 60 * 24 * 30,             // 30-day cache
}
```

### Font Loading

Inter font loaded via `next/font/google` with `display: 'swap'` and `preload: true` for zero FOIT.

### Bundle Optimization

- **Compression** enabled (`compress: true`)
- **ETag generation** for cache validation
- **poweredByHeader** removed for smaller response
- **DNS prefetch** for YouTube, Google Analytics, Google Fonts
- **Preconnect** to Google Fonts CDN

### Service Worker

`ServiceWorkerRegistration` component registers `/sw.js` for:
- Offline page caching
- Asset precaching
- Background sync (future)

---

## Security

### Content Security Policy

- `poweredByHeader: false` — hides Next.js version
- ETags enabled for cache integrity

### Rate Limiting

In-memory rate limiter in `src/lib/rate-limit.ts`:

```typescript
// 5 requests per minute per IP
const RATE_LIMIT = { windowMs: 60_000, maxRequests: 5 };
```

Applied to:
- `POST /api/inquiry`
- `POST /api/inquiry/basket`

Returns `429 Too Many Requests` with `Retry-After` header when exceeded.

### Honeypot Protection

Hidden `_hp` field in forms. If filled (by bots), the API returns a fake success response without saving:

```typescript
if (body._hp) {
  return NextResponse.json({ success: true, message: "Thank you!" });
}
```

### CSRF Protection

Origin header validation on all POST API routes:

```typescript
const origin = request.headers.get('origin');
const host = request.headers.get('host');
if (origin && host) {
  const originHost = new URL(origin).host;
  if (originHost !== host) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }
}
```

### Input Validation

- Required field checks (name, email, city)
- Email format regex validation
- Array validation for basket items
- Type coercion and null handling

---

## Deployment

### Build Process

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Run migrations
npx prisma migrate deploy

# 4. Seed database
npm run db:seed

# 5. Build Next.js
npm run build

# 6. Start production server
npm start
```

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | No | `file:./prisma/dev.db` | SQLite database path |
| `SITE_URL` | No | `http://localhost:3000` | Canonical site URL |
| `NODE_ENV` | No | `development` | Environment mode |
| `GA_MEASUREMENT_ID` | No | — | Google Analytics 4 ID |
| `SMTP_HOST` | No | — | Email server host |
| `SMTP_PORT` | No | `587` | Email server port |
| `SMTP_USER` | No | — | Email username |
| `SMTP_PASS` | No | — | Email password |
| `SMTP_FROM` | No | — | Sender email address |

### npm Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Development server (Turbopack) |
| `build` | `next build` | Production build |
| `start` | `next start` | Production server |
| `lint` | `next lint` | ESLint check |
| `db:seed` | `npx tsx prisma/seed.ts` | Seed database |
| `db:backup` | `bash scripts/backup-db.sh` | Backup database |
| `analyze` | `ANALYZE=true next build` | Bundle analysis |
| `bundle-check` | `node scripts/bundle-check.js` | Bundle size check |

### Hosting Options

**Vercel (Recommended)**
- Zero-config deployment
- Automatic SSG + ISR support
- Edge Functions for API routes
- Note: SQLite requires persistent storage (Vercel Blob or external DB)

**VPS / Docker**
- `npm run build && npm start`
- SQLite file persists on disk
- Use PM2 or systemd for process management
- Nginx reverse proxy recommended

**Static Export**
- Not supported (requires server for API routes and dynamic rendering)

---

*This document is maintained alongside the codebase. For questions, see the [README](./README.md) or [CONTRIBUTING](./docs/CONTRIBUTING.md) guide.*
