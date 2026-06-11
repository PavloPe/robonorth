# Changelog

All notable changes to the RoboNorth project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added — Test foundation
- Vitest harness (`vitest.config.ts`, `npm test` / `test:run` / `test:coverage`).
- 29 starter tests across 5 files: `rate-limit`, `queries.toRobot`, `/api/health`, `/api/robots`, `/api/inquiry`. All mock the data layer — no real DB.
- `docs/TESTING.md` documenting the harness, mocking patterns, and what's in/out of scope.

### Fixed
- `checkRateLimit` parameter signature widened from literal `5`/`60000` to plain `number`, so callers can pass custom limits without a type assertion.

---

## [4.0.0] — 2026-02-20 — E-commerce & Canadian Marketplace

The biggest release yet — RoboNorth evolves from a catalog into a full Canadian robotics marketplace with e-commerce capabilities, trust infrastructure, and deep Canadian regulatory content.

### Added — E-commerce Core
- **Cart & checkout flow** — full Add to Cart → Cart page → Checkout experience
- **Buy Now page** (`/buy`) — streamlined purchase entry point
- **Order tracking page** (`/orders`) — post-purchase order status
- **Enterprise inquiry page** (`/enterprise`) — dedicated B2B inquiry flow
- **Seller registration portal** (`/sell`) — third-party seller onboarding
- **Cart page client component** (`CartPageClient.tsx`) — interactive cart with quantity controls
- **Payment methods badges** component showing accepted payment options
- **Phone number integration** — added contact number across key pages

### Added — Canadian Advantage
- **Why Canada page** (`/why-canada`) — Canadian robotics advantage overview
- **CUSMA page** (`/cusma`) — Canada-United States-Mexico Agreement tariff benefits
- **Compliance guide** (`/compliance`) — Canadian regulatory compliance for robotics
- **Provincial robotics pages** — dedicated pages for Alberta, BC, Ontario, and Quebec
- **Provincial tax calculator** component — real-time tax calculations by province
- **Compare International page** (`/compare-international`) — Canada vs. US vs. EU robotics pricing
- **Cross-border comparison** component for pricing differences

### Added — Trust & Community
- **Affiliate program page** (`/affiliates`) — partner referral program
- **Trade-in program** (`/trade-in`) — robot trade-in and upgrade program
- **Warranty plans** (`/warranty-plans`) — tiered warranty options
- **Installation services** (`/services/installation`) — professional setup
- **Awards & recognition** (`/awards`) — industry awards showcase
- **Certification page** (`/certification`) — RoboNorth certifications and standards
- **Referral program** (`/referral`) — customer referral rewards
- **Community hub** (`/community`) — robotics community features
- **Login page** (`/login`) — user authentication placeholder
- **Register page** (`/register`) — user registration placeholder
- **Wishlist page** (`/wishlist`) — persistent wishlist with client-side storage
- **Wishlist client component** (`WishlistClient.tsx`) — interactive wishlist management

### Added — Policies & Legal
- **Shipping policy** (`/shipping-policy`) — detailed shipping terms and timelines
- **Return policy** (`/return-policy`) — 30-day return policy
- **Refund policy** (`/refund-policy`) — refund processing terms

### Added — Homepage & Layout
- Winter shipping banner component across all pages
- CCA (Capital Cost Allowance) tax deduction blog post for Canadian businesses
- Social share buttons on product pages
- Homepage enhancements — new sections, improved layout
- Footer overhaul — expanded link columns, social integration

---

## [3.0.0] — 2026-02-20 — Data Update & Reviews

Major data expansion with 8 new robots, comprehensive reviews, and a scoring system to help buyers make informed decisions.

### Added — New Robots (8)
- Fourier GR-2 — enterprise rehabilitation robot
- UBTECH Walker X — tall-form commercial humanoid
- Kepler Forerunner K2 — Chinese industrial humanoid
- Agility Digit V3 — warehouse logistics specialist
- Sanctuary AI Phoenix Gen 8 — carbon-based general AI
- PAL Robotics TALOS — European research platform
- Apptronik Astra — enterprise manufacturing humanoid
- LimX Dynamics CL-1 — dynamic locomotion research bot

### Added — Review System
- **13 in-depth robot reviews** (1,500–2,000 words each) at `/reviews/[slug]`
- **Reviews index page** (`/reviews`) — browsable review catalog
- **Robot scoring system** — 5 criteria (Deployment, Capability, Availability, Value, Impact)
- **Score display UI** on robot detail pages with radar-style visualization
- **Category winner badges** — "Best Value", "Best for Research", etc.
- **Review data module** (`src/data/reviews.ts`) — structured review content

### Added — Robot Variants
- **Variant system** for robots with multiple configurations
- **Unitree G1 with 6 variants** — EDU, Standard, DEX, Pro, Research, Enterprise
- **Variants table UI** on robot detail pages showing specs and pricing per variant

### Changed — Updated Robots (10)
- Tesla Optimus Gen 3, Unitree G1, Unitree H1-2, 1X NEO Beta, Figure 04 — refreshed to February 2026 data
- Boston Dynamics Atlas, Agility Digit, Apptronik Apollo, Sanctuary AI Phoenix, UBTECH Walker S — updated specs and pricing

### Added — Content Pages
- **What Is a Humanoid Robot** guide (`/what-is-humanoid-robot`) — comprehensive explainer
- **Day in the Life** page (`/day-in-the-life`) — narrative content
- 3 additional content/blog pages (tasks 46–50)

---

## [2.5.0] — 2026-02-20 — SEO & Conversion Optimization

Focused on driving organic traffic and converting visitors with comparison content, calculators, and conversion optimization.

### Added — Head-to-Head Comparisons
- **5 comparison pages** at `/compare/[slug]`:
  - Tesla Optimus vs Unitree G1
  - Figure 04 vs 1X NEO
  - Boston Dynamics Atlas vs Agility Digit
  - Unitree H1 vs Apptronik Apollo
  - UBTECH Walker S vs Sanctuary AI Phoenix
- Comparison data module (`src/data/comparisons.ts`) with pros/cons, verdicts, and use case recommendations

### Added — SEO Content Pages
- **Best Humanoid Robots** ranked list (`/best-humanoid-robots`) — high-intent keyword target
- **Pricing guide** (`/pricing-guide`) — comprehensive pricing breakdown by category
- **Industry landing pages** for vertical targeting:
  - Manufacturing (`/robots-for/manufacturing`)
  - Healthcare (`/robots-for/healthcare`)
  - Education (`/robots-for/education`)
  - Logistics (`/robots-for/logistics`)
  - Agriculture (`/robots-for/agriculture`)
- **Canadian Robotics overview** (`/canadian-robotics`)
- **Canada Robotics Report** (`/canada-robotics-report`)
- **Robotics-as-a-Service** page (`/raas`)
- **Why RoboNorth** page (`/why-robonorth`)

### Added — Interactive Tools & Calculators
- **TCO Calculator** (`/tco-calculator`) — Total Cost of Ownership analysis
- **Import Duty Calculator** (`/import-calculator`) — Canadian import duties and taxes
- **Size Comparison Tool** (`/size-compare`) — visual robot height/weight comparison
- **Currency toggle** (CAD/USD) — site-wide currency switching component
- **Shipping estimator widget** — delivery time and cost estimates

### Added — Blog & Content
- **Toyota/Agility Ontario case study** (`/case-studies/toyota-agility`)
- Additional blog articles (v3 and v4 article sets)
- CCA tax deduction blog post

### Added — Conversion Optimization
- **Financing calculator** component — monthly payment estimates
- **Fleet discount calculator** — volume pricing tool
- **Education pricing** page (`/education-pricing`)
- **Demo request** page (`/demo`)

### Added — French Language (i18n)
- French homepage (`/fr`) — translated hero and content
- French about page (`/fr/about`)
- French robots page (`/fr/robots`)
- i18n data module (`src/data/i18n/fr.ts`)
- `hreflang` tags linking en-CA and fr-CA versions

### Added — Technical SEO & Trust
- **RSS feed** (`/feed.xml`) — blog post syndication
- **Accessibility statement** (`/accessibility`)
- **Trust badges** component — SSL, Canadian-owned, secure checkout indicators
- **Security headers** — `poweredByHeader: false`, ETags, compression
- Media mentions component
- Partner logo banner

---

## [2.0.0] — 2026-02-20 — Parts Catalog & Inquiry System

Introduced a full parts catalog with 71 real components and an inquiry basket system for multi-item quotes.

### Added — Parts Catalog
- **71 real parts** across 7 categories with proper `Part` database model:
  - Actuators (servo motors, linear actuators)
  - Sensors (LiDAR, IMU, force/torque, cameras)
  - Controllers (compute boards, PLCs, motor drivers)
  - Power (batteries, BMS, chargers)
  - Structural (frames, joints, carbon fiber)
  - Hands/Grippers (dexterous hands, parallel grippers)
  - Software (ROS packages, simulation, ML frameworks)
- **Parts catalog page** (`/parts`) with sidebar filters (category, price, stock, manufacturer)
- **Part detail pages** (`/parts/[slug]`) with full specs, compatible robots, datasheets
- **Part card component** — consistent card design for part listings
- **Parts sidebar filters** — category, price range, stock status, manufacturer
- **Parts mobile filters** — responsive filter drawer for mobile
- **Parts sort select** — sort by price, name, stock status
- **Parts data module** (`src/data/parts-catalog.ts`) — 71 parts with specs, pricing (CAD/USD), compatibility

### Added — Inquiry Basket System
- **Inquiry basket provider** — React context for basket state management
- **Inquiry basket drawer** — slide-out basket panel with item management
- **Inquiry basket icon** — header icon with item count badge
- **Add to basket button** — available on robot and part pages
- **Basket inquiry form** — multi-item inquiry submission
- **Basket API endpoint** (`/api/inquiry/basket`) — handles basket inquiries with reference numbers
- **Live inquiry widget** — floating inquiry prompt

### Added — Database Changes
- New `Part` model in Prisma schema with full specs (CAD/USD pricing, compatibility array, specifications JSON)
- New `InquiryItem` model — line items linked to inquiries
- Added `company`, `type`, `contactMethod`, `referenceNumber` fields to `Inquiry` model
- Database indexes on `Part` (category, manufacturer, price, featured, stock)

### Added — Homepage Integration
- Featured parts section on homepage
- Sitemap includes all part slugs
- Global search integration for parts

---

## [1.5.0] — 2026-02-19 — Visual & Interactive Overhaul

Two major rounds of improvements: 50 visual enhancements and 50 interactive features, growing the site to 132 static pages.

### Added — Visual Design (50 improvements)
- Gradient backgrounds with animated hero section
- 3D card hover effects with perspective transforms
- Custom 404 page with animated robot illustration
- Animated RoboNorth logo
- Premium card designs with glass morphism effects
- Enhanced badge system with color-coded availability
- Responsive image component with lazy loading and fade-in
- Loading skeleton cards for content placeholders
- FadeIn section component for scroll-reveal animations
- Sticky header with backdrop blur
- Modern footer with 6-column layout
- Print stylesheet for robot detail pages
- Enhanced typography with tight tracking
- Dark mode refinements for all components

### Added — Interactive Features (50 features)
- **ROI Calculator** (`/roi-calculator`) — return on investment analysis
- **Fleet Builder** (`/fleet-builder`) — multi-robot fleet configuration tool
- **Timeline** (`/timeline`) — humanoid robotics history timeline
- **Industry Map** (`/industry-map`) — Canadian robotics industry visualization
- **Admin Dashboard** (`/admin`) — basic admin panel with stats
- **Robot quiz wizard** (`/quiz`) — 5-question recommendation engine
- **Delivery estimator** component — province-based delivery estimates
- **Price alert signup** — notify on price changes
- **Robot of the Month** highlight component
- **Stats counter** — animated number counters on homepage
- **Social feed** component — social media integration
- **Customer reviews** component — testimonial display
- **Radar chart** component — visual spec comparison
- **3D viewer placeholder** — future AR/3D model integration point
- **Recently viewed** tracker — localStorage-based browsing history
- **Robot detail tracker** — view analytics component

### Added — Content Pages
- 6 use case pages (Manufacturing, Healthcare, Education, Hospitality, Agriculture, overview)
- Webinars page, Events page, Resources page
- Education pricing, Support plans
- Newsletter archive, Jobs board
- Universities/research page
- Submit a robot page, Used robots marketplace
- Getting Started guide, Safety information
- Grants & funding page

### Changed
- Grew from ~80 pages to **132 static pages**

---

## [1.2.0] — 2026-02-19 — UX & Feature Expansion

Major UX overhaul with dark mode, search, PWA support, and dozens of new interactive features.

### Added — Core UX
- **Dark mode** with system preference detection and manual toggle
- **Global search** (⌘K / Ctrl+K) across robots, manufacturers, and articles
- **PWA support** — service worker, manifest.json, offline capability
- **Breadcrumbs** on about and detail pages
- **Pagination** component for long lists
- **Top progress bar** — NProgress-style loading indicator

### Added — Interactive Components
- **Quick view modal** — preview robot details without navigation
- **Compare bar** — persistent comparison selection from any page
- **Image gallery** — multi-image viewer on detail pages
- **Video embeds** — YouTube integration on robot pages
- **Cookie consent** banner — GDPR/PIPEDA compliance
- **Newsletter signup** — footer email subscription
- **Social proof** section — testimonials and partner logos
- **Exit intent popup** — engagement retention on leave
- **Back to top** button — smooth scroll to top

### Added — Pages
- **Legal pages**: Privacy Policy, Terms of Service
- **Category pages**: `/robots/category/[category]`
- **Use case pages**: `/robots/use-case/[usecase]`
- **Press & media** page
- **Warranty** information page
- **Manufacturer badges** — verified/featured indicators

### Added — Technical
- `rel="prev/next"` pagination links
- Dark mode styles for compare table and sidebar filters
- Lazy loading with Intersection Observer
- Fade-in animations on scroll
- Responsive image optimization
- Mobile layout fixes

---

## [1.0.0] — 2026-02-19 — Architecture & Data Foundation

Infrastructure overhaul establishing production-ready architecture, data pipeline, and content foundation.

### Added — Infrastructure (Tasks 1–8)
- **Environment configuration** (`src/lib/env.ts`) — typed env validation for dev/staging/production
- **Rate limiting** (`src/lib/rate-limit.ts`) — in-memory rate limiter (5 req/min per IP)
- **Structured logging** (`src/lib/logger.ts`) — contextual log levels with timestamps
- **Shared constants** (`src/lib/constants.ts`) — site name, URLs, social links, nav structure
- **JSON-LD module** (`src/lib/jsonld.ts`) — Product, Organization, BreadcrumbList, FAQ schema generators
- **Honeypot protection** — hidden form field to catch bot submissions
- **CSRF protection** — origin header validation on API routes
- **Input validation** — email format, required fields, error messages

### Added — Data & Content (Tasks 9–17)
- 10 new robots added to catalog (1X NEO Beta, Apptronik Apollo 2, Figure 04, Unitree H1-2, and more)
- Robot extras data (`src/data/robot-extras.ts`) — FAQ, CAD pricing, video URLs, shipping info per robot
- Blog articles v2 (`src/data/blog-articles-v2.ts`) — comprehensive buying guide (2,500+ words)
- Manufacturer founding stories (`src/data/manufacturer-stories.ts`)
- Enhanced meta descriptions for all pages

### Added — Parts Catalog Foundation
- **60+ real products** from 10+ manufacturers
- PartCategory model expanded with pricing data
- Parts data module (`src/data/parts.ts`) — 7 categories with popular items

### Changed
- Refactored inquiry API with rate limiting, logging, and honeypot
- Upgraded metadata strategy — template-based titles, OG images, Twitter cards
- Improved sitemap with all dynamic routes

---

## [0.5.0] — 2026-02-19 — Design & Polish

Visual polish, SEO foundation, and reliability improvements.

### Added
- **Blog system** — 3 full articles with list and detail pages
- **XML sitemap** (`/sitemap.xml`) — all robots, manufacturers, and pages
- **robots.txt** — search engine crawl directives
- **JSON-LD structured data** — Product and Organization schema
- **Enhanced meta tags** — per-page OG, Twitter Card, canonical URLs
- **Loading skeletons** — placeholder cards during data fetches
- **Error boundaries** — graceful error handling with retry
- **404 page** — custom not-found with navigation links
- **Page transitions** — subtle fade animations

### Changed
- **Compare page redesign** — visual diff highlighting, better layout
- Improved filter UX — search within filters, sort options
- Enhanced card designs — hover effects, shadow depth

---

## [0.1.0] — 2026-02-19 — Initial Release

The foundation of RoboNorth — Canada's first humanoid robot marketplace.

### Added
- **Next.js 15.5** with App Router and React Server Components
- **React 19** for latest concurrent features
- **Tailwind CSS 4** via PostCSS plugin
- **Prisma 7** with `@prisma/adapter-better-sqlite3` (client-side query compiler)
- **SQLite database** with seed script
- **22 humanoid robots** from 18 manufacturers with full specs
- **Robot catalog** with sidebar filters (category, availability, price, Canada shipping)
- **Robot detail pages** with specifications, pricing, and availability
- **Manufacturer directory** — 18 brands with detail pages
- **Side-by-side comparison** tool (up to 4 robots)
- **Parts & components** catalog — 7 categories
- **Early access inquiry form** with database persistence
- **About page** with company information
- **Responsive design** — mobile-first with 1/2/3/4 column grids
- **Inter font** with optimized loading
- **TypeScript strict mode** throughout

---

[4.0.0]: https://github.com/robonorth/robonorth/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/robonorth/robonorth/compare/v2.5.0...v3.0.0
[2.5.0]: https://github.com/robonorth/robonorth/compare/v2.0.0...v2.5.0
[2.0.0]: https://github.com/robonorth/robonorth/compare/v1.5.0...v2.0.0
[1.5.0]: https://github.com/robonorth/robonorth/compare/v1.2.0...v1.5.0
[1.2.0]: https://github.com/robonorth/robonorth/compare/v1.0.0...v1.2.0
[1.0.0]: https://github.com/robonorth/robonorth/compare/v0.5.0...v1.0.0
[0.5.0]: https://github.com/robonorth/robonorth/compare/v0.1.0...v0.5.0
[0.1.0]: https://github.com/robonorth/robonorth/releases/tag/v0.1.0
