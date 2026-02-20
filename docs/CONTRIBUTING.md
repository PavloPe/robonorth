# Contributing to RoboNorth

> How to contribute, code style, and PR process for the RoboNorth project.

Thank you for your interest in contributing to RoboNorth! This guide covers everything you need to get started.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Architecture Conventions](#architecture-conventions)
- [Common Tasks](#common-tasks)
- [Pull Request Process](#pull-request-process)
- [Commit Convention](#commit-convention)

---

## Getting Started

### Prerequisites

- **Node.js 22+** — [download](https://nodejs.org)
- **Git** — version control
- A code editor (VS Code recommended)

### Setup

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/robonorth.git
cd robonorth

# Install dependencies
npm install

# Seed the database
npm run db:seed

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to verify everything works.

### Useful Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint check
npm run db:seed      # Seed database (destructive!)
npx prisma studio    # Database GUI (http://localhost:5555)
```

---

## Development Workflow

1. **Create a branch** from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/your-feature
   ```

2. **Make changes** and test locally

3. **Lint** your code:
   ```bash
   npm run lint
   ```

4. **Build** to check for errors:
   ```bash
   npm run build
   ```

5. **Commit** with a descriptive message (see [Commit Convention](#commit-convention))

6. **Push** and open a PR against `dev`

---

## Code Style

### TypeScript

- **Strict mode** — `tsconfig.json` has `strict: true`
- **No `any` types** — use proper types or `unknown`
- **Explicit return types** on exported functions
- **Path aliases** — use `@/` for `src/` imports:
  ```typescript
  import { getAllRobots } from '@/lib/queries';  // ✅
  import { getAllRobots } from '../../lib/queries';  // ❌
  ```

### File Naming

- **Pages**: `src/app/route-name/page.tsx` (kebab-case directories)
- **Components**: `src/components/ui/ComponentName.tsx` (PascalCase files)
- **Utilities**: `src/lib/utility-name.ts` (kebab-case files)
- **Data**: `src/data/data-name.ts` (kebab-case files)
- **Types**: `src/types/index.ts` (centralized)

### Tailwind CSS

- **No external CSS** — all styling via Tailwind utilities
- **No component libraries** (Shadcn, MUI, etc.)
- **Responsive-first** — use `sm:`, `md:`, `lg:` breakpoints
- **Dark mode** — always add `dark:` variants for colors
- **Consistent spacing** — prefer `px-4 sm:px-6 py-10`

```tsx
// ✅ Good
<div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Title</h1>
</div>

// ❌ Bad — inline styles, missing dark mode
<div style={{ maxWidth: '1280px', margin: '0 auto' }}>
  <h1 className="text-3xl font-bold text-gray-900">Title</h1>
</div>
```

### Component Patterns

```tsx
// Server Component (default — no directive needed)
export default function MyComponent({ data }: { data: Robot }) {
  return <div>{data.name}</div>;
}

// Client Component (only when needed)
'use client';

import { useState } from 'react';

export default function InteractiveWidget() {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(!open)}>Toggle</button>;
}
```

---

## Architecture Conventions

### 1. Server-First

Default to React Server Components. Only add `"use client"` when you need:
- `useState`, `useEffect`, or other hooks
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`localStorage`, `window`, etc.)
- Third-party client-side libraries

### 2. Slugs as IDs

Robot, manufacturer, and part IDs are URL-friendly slugs:
```
unitree-g1, boston-dynamics, dynamixel-xm540-w270
```

### 3. Query Layer

All database access goes through `src/lib/queries.ts`. Pages never import Prisma directly:

```typescript
// ✅ Good
import { getRobotBySlug } from '@/lib/queries';

// ❌ Bad
import prisma from '@/lib/db';
const robot = await prisma.robot.findUnique({ where: { id: slug } });
```

### 4. Data Pipeline

Content lives in TypeScript files, not the database directly:

```
src/data/robots.ts → prisma/seed.ts → SQLite → queries.ts → pages
```

To add/update content: edit `src/data/*.ts`, then `npm run db:seed`.

### 5. Type Safety

All shared types live in `src/types/index.ts`. Database row types are mapped to app types in `src/lib/queries.ts`:

```typescript
// DB row type (raw from SQLite)
type DbRobot = { useCase: string; /* JSON string */ };

// App type (parsed, typed)
interface Robot { useCase: string[]; /* array */ }

// Mapper function
function toRobot(r: DbRobot): Robot { ... }
```

### 6. Metadata

Every page must export metadata for SEO:

```typescript
export const metadata: Metadata = {
  title: 'Page Title',  // Template: "Page Title | RoboNorth"
  description: 'Page description for search results.',
  alternates: { canonical: 'https://robonorth.ca/page-url' },
};
```

---

## Common Tasks

### Add a New Robot

1. Add to `src/data/robots.ts`
2. Add extras (FAQ, CAD pricing, video) to `src/data/robot-extras.ts`
3. Run `npm run db:seed`
4. Verify at `/robots` and `/robots/[slug]`

### Add a New Part

1. Add to `src/data/parts-catalog.ts`
2. Run `npm run db:seed`
3. Verify at `/parts` and `/parts/[slug]`

### Add a New Page

1. Create `src/app/<route>/page.tsx`
2. Export `metadata` for SEO
3. Add to navigation (Header/Footer) if needed
4. Add to `src/app/sitemap.ts`
5. Verify the build: `npm run build`

### Add a Blog Post

1. Add to `src/data/blog-articles-v4.ts` (or create v5)
2. Register in `src/data/blog.ts`
3. Verify at `/blog` and `/blog/[slug]`

### Modify the Database Schema

1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name describe-change`
3. Update types in `src/types/index.ts`
4. Update mappers in `src/lib/queries.ts`
5. Update seed script if needed
6. Test: `npm run db:seed && npm run build`

---

## Pull Request Process

1. **Branch** from `dev` (not `main`)
2. **One feature per PR** — keep changes focused
3. **Title** follows commit convention: `feat: add thing` or `fix: broken thing`
4. **Description** should explain:
   - What changed and why
   - How to test it
   - Screenshots for visual changes
5. **All checks pass**: lint, build, no TypeScript errors
6. **Review** — wait for at least one approval before merging

### PR Template

```markdown
## What

Brief description of what this PR does.

## Why

Motivation or issue reference.

## How to Test

1. Run `npm run dev`
2. Navigate to `/page`
3. Verify behavior

## Screenshots

(if visual changes)
```

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type: description
```

### Types

| Type | When to Use |
|------|------------|
| `feat` | New feature or page |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Visual/CSS changes (no logic) |
| `refactor` | Code restructuring (no behavior change) |
| `perf` | Performance improvement |
| `chore` | Build, deps, config changes |

### Examples

```
feat: add Unitree G1 variant system with 6 configurations
fix: correct provincial tax calculation for Quebec
docs: update README with current robot count
style: improve dark mode contrast on compare table
refactor: extract price formatting to shared utility
perf: lazy-load YouTube embeds on robot detail pages
chore: update Prisma to 7.4
```

---

## Questions?

- Check the [ARCHITECTURE.md](../ARCHITECTURE.md) for system design details
- Check the [DATABASE.md](./DATABASE.md) for schema questions
- Open an issue for anything else

Thank you for contributing to RoboNorth! 🤖🇨🇦
