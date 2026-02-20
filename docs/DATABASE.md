# Database Reference — RoboNorth

> Schema reference, seed process, and migration guide for the RoboNorth SQLite database.

---

## Table of Contents

- [Overview](#overview)
- [Schema](#schema)
- [Seed Process](#seed-process)
- [Querying Data](#querying-data)
- [JSON Fields](#json-fields)
- [Migrations](#migrations)
- [Backup & Restore](#backup--restore)
- [Prisma 7 Adapter Pattern](#prisma-7-adapter-pattern)

---

## Overview

| Property | Value |
|----------|-------|
| Database | SQLite 3 |
| ORM | Prisma 7 (client-side query compiler) |
| Adapter | `@prisma/adapter-better-sqlite3` |
| DB File | `prisma/dev.db` |
| Schema | `prisma/schema.prisma` |
| Seed | `prisma/seed.ts` |
| Models | 6 (Robot, Manufacturer, Part, PartCategory, Inquiry, InquiryItem) |

### Why SQLite?

- Zero configuration — no database server needed
- Single-file database — easy to backup, deploy, and version
- Fast reads — ideal for a read-heavy catalog site
- Prisma 7 support via `@prisma/adapter-better-sqlite3`

---

## Schema

### Robot

The core model — 40 humanoid robots with full specifications.

```prisma
model Robot {
  id               String   @id          // URL slug (e.g., "unitree-g1")
  name             String
  manufacturer     String
  manufacturerSlug String                // Links to Manufacturer.id
  price            String                // Display: "From $13,500 USD"
  priceMin         Int                   // Numeric for sorting/filtering
  availability     String                // shipping|preorder|pilot|announced|prototype
  category         String                // consumer|enterprise|research|announced
  useCase          String                // JSON array: '["warehouse","delivery"]'
  description      String
  country          String
  imageUrl         String
  featured         Boolean  @default(false)
  canadaAvailable  Boolean  @default(true)

  // Flattened specs (no nested objects in SQLite)
  specHeight       Float?               // Height in meters
  specWeight       Float?               // Weight in kg
  specDof          Int?                  // Degrees of freedom
  specBattery      String?              // Battery life description
  specPayload      Float?               // Payload in kg
  specSpeed        Float?               // Max speed in m/s

  // v3.0 additions
  variants         String?              // JSON array of variant configs
  scores           String?              // JSON: {deployment,capability,availability,value,impact}
  categoryWinners  String?              // JSON array of badge strings
  reviewSlug       String?              // Slug of linked review page

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@index([category])
  @@index([availability])
  @@index([manufacturerSlug])
  @@index([priceMin])
  @@index([featured])
}
```

### Manufacturer

26 robotics companies with metadata.

```prisma
model Manufacturer {
  id          String   @id              // URL slug
  name        String
  country     String
  founded     String                    // Year as string
  description String
  website     String
  robotIds    String                    // JSON array of robot slugs
  imageUrl    String
  featured    Boolean  @default(false)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Part

71 individual parts with dual-currency pricing.

```prisma
model Part {
  id               String   @id         // URL slug
  name             String
  description      String
  manufacturer     String
  manufacturerSlug String
  category         String               // actuators|sensors|controllers|power|structural|hands|software
  subcategory      String   @default("")
  priceCAD         Float
  priceUSD         Float
  inStock          Boolean  @default(true)
  leadTimeDays     Int?
  specifications   String   @default("{}") // JSON key-value object
  compatibility    String   @default("[]") // JSON array of robot slugs
  imageUrl         String   @default("")
  datasheetUrl     String   @default("")
  featured         Boolean  @default(false)

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@index([category])
  @@index([manufacturerSlug])
  @@index([priceCAD])
  @@index([featured])
  @@index([inStock])
}
```

### PartCategory

7 high-level component categories.

```prisma
model PartCategory {
  id           String @id               // URL slug
  name         String
  description  String
  itemCount    Int
  imageUrl     String
  popularItems String                   // JSON array of {name, priceRange, description}

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### Inquiry

User-submitted inquiries with support for general, quick, and basket types.

```prisma
model Inquiry {
  id              String   @id @default(cuid())
  name            String
  email           String
  phone           String?
  company         String?
  city            String
  robot           String?
  message         String?
  type            String   @default("general") // general|quick|basket
  contactMethod   String   @default("email")   // email|phone|either
  referenceNumber String?

  createdAt       DateTime @default(now())

  items           InquiryItem[]

  @@index([email])
  @@index([createdAt])
  @@index([referenceNumber])
}
```

### InquiryItem

Line items for basket inquiries (robots and/or parts).

```prisma
model InquiryItem {
  id          String  @id @default(cuid())
  inquiryId   String
  inquiry     Inquiry @relation(fields: [inquiryId], references: [id], onDelete: Cascade)
  itemType    String                    // robot|part
  itemId      String                    // Slug of robot or part
  itemName    String
  quantity    Int     @default(1)

  @@index([inquiryId])
}
```

---

## Seed Process

The seed script (`prisma/seed.ts`) is the single source of truth for all catalog data.

### Running the Seed

```bash
npm run db:seed
# Equivalent to: npx tsx prisma/seed.ts
```

### What It Does

1. **Deletes** all existing data (InquiryItem → Inquiry → Part → PartCategory → Robot → Manufacturer)
2. **Creates** manufacturers from `src/data/manufacturers.ts` (26 records)
3. **Creates** robots from `src/data/robots.ts` (40 records)
4. **Creates** part categories from `src/data/parts.ts` (7 records)
5. **Creates** parts from `src/data/parts-catalog.ts` (71 records)

### Data Sources

| File | Records | Description |
|------|---------|-------------|
| `src/data/robots.ts` | 40 | Robot specs, pricing, availability |
| `src/data/manufacturers.ts` | 26 | Manufacturer metadata |
| `src/data/parts.ts` | 7 | Part category overviews |
| `src/data/parts-catalog.ts` | 71 | Individual parts with specs |

### Adding Data

To add a new robot:

```typescript
// 1. Edit src/data/robots.ts — add entry to array
{
  id: 'my-new-robot',
  name: 'My New Robot',
  manufacturer: 'Company Name',
  manufacturerSlug: 'company-name',
  // ... full spec object
}

// 2. Re-seed the database
npm run db:seed

// 3. Verify
// Visit /robots/my-new-robot
```

⚠️ **Warning:** `npm run db:seed` deletes ALL existing data (including inquiries) before re-seeding. Back up the database first if you have production data.

---

## Querying Data

All database access goes through `src/lib/queries.ts`. Pages never import Prisma directly.

### Available Query Functions

#### Robots
```typescript
getAllRobots(): Promise<Robot[]>                    // All 40 robots, sorted by name
getFeaturedRobots(): Promise<Robot[]>               // Featured robots (max 6)
getRobotBySlug(slug: string): Promise<Robot | null> // Single robot by slug
getRelatedRobots(robot: Robot, limit?: number): Promise<Robot[]>  // Related by manufacturer/category
getAllRobotSlugs(): Promise<string[]>               // All slugs (for SSG)
```

#### Manufacturers
```typescript
getAllManufacturers(): Promise<Manufacturer[]>               // All 26 manufacturers
getFeaturedManufacturers(): Promise<Manufacturer[]>          // Featured (max 6)
getManufacturerBySlug(slug: string): Promise<Manufacturer | null>
getAllManufacturerSlugs(): Promise<string[]>                 // For SSG
```

#### Parts
```typescript
getAllParts(): Promise<Part[]>                       // All 71 parts
getFeaturedParts(limit?: number): Promise<Part[]>    // Featured parts
getPartBySlug(slug: string): Promise<Part | null>
getRelatedParts(part: Part, limit?: number): Promise<Part[]>
getPartsByCategory(category: string): Promise<Part[]>
getCompatibleParts(robotSlug: string): Promise<Part[]>  // Parts compatible with a robot
getAllPartSlugs(): Promise<string[]>                 // For SSG
getPartsCount(): Promise<number>
```

#### Part Categories
```typescript
getAllPartCategories(): Promise<PartCategory[]>
```

---

## JSON Fields

SQLite has no native JSON column type. Complex data is stored as JSON strings and parsed in query mappers.

### Pattern

```typescript
// Storage: JSON.stringify(array) → SQLite TEXT column
// Retrieval: Query mapper parses back to typed objects

type DbRobot = {
  useCase: string;     // '["warehouse","delivery"]'
  scores: string | null; // '{"deployment":9,"capability":7,...}'
};

function toRobot(r: DbRobot): Robot {
  return {
    ...r,
    useCase: JSON.parse(r.useCase),       // → string[]
    scores: r.scores ? JSON.parse(r.scores) : null,  // → RobotScores | null
  };
}
```

### JSON Fields by Model

| Model | Field | Stored As | Parsed To |
|-------|-------|-----------|-----------|
| Robot | `useCase` | `'["a","b"]'` | `string[]` |
| Robot | `variants` | JSON array | `RobotVariant[]` |
| Robot | `scores` | JSON object | `RobotScores` |
| Robot | `categoryWinners` | JSON array | `string[]` |
| Manufacturer | `robotIds` | JSON array | `string[]` |
| PartCategory | `popularItems` | JSON array | `PartItem[]` |
| Part | `specifications` | JSON object | `Record<string, string>` |
| Part | `compatibility` | JSON array | `string[]` |

---

## Migrations

### Creating a Migration

```bash
# After editing prisma/schema.prisma:
npx prisma migrate dev --name add-robot-variants
```

This will:
1. Generate a new migration SQL file in `prisma/migrations/`
2. Apply it to `prisma/dev.db`
3. Regenerate the Prisma client

### Applying Migrations (Production)

```bash
npx prisma migrate deploy
```

### Resetting the Database

```bash
# Delete database and re-run all migrations
npx prisma migrate reset

# Then re-seed
npm run db:seed
```

### Viewing the Database

```bash
# Prisma Studio — browser-based GUI
npx prisma studio
# Opens at http://localhost:5555
```

---

## Backup & Restore

### Backup

```bash
# Using the built-in script
npm run db:backup

# Or manually
cp prisma/dev.db prisma/dev.db.backup.$(date +%Y%m%d)
```

### Restore

```bash
cp prisma/dev.db.backup prisma/dev.db
```

---

## Prisma 7 Adapter Pattern

Prisma 7 uses a client-side query compiler (no binary engine). This requires a driver adapter:

```typescript
// src/lib/db.ts
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Singleton pattern — prevents multiple clients in development (hot reload)
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
```

### Key Differences from Prisma 5/6

- No binary engine (smaller deployment)
- Requires explicit driver adapter
- Client-side query compilation
- Uses `@prisma/adapter-better-sqlite3` instead of built-in SQLite support
