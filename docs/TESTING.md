# Testing

RoboNorth uses [Vitest](https://vitest.dev) for unit and integration tests.
The harness is intentionally lightweight: pure-logic tests run in-process, and
route-handler tests mock the Prisma client so the suite never touches a real
database. Total runtime is well under 1 second.

## Running tests

```bash
npm run test          # watch mode (interactive)
npm run test:run      # single run (CI-style)
npm run test:coverage # single run + v8 coverage in HTML + text
```

The coverage report is written to `coverage/` (gitignored via `/coverage`).

## Layout

```
tests/
├── api/          # route-handler tests (mock @/lib/db or @/lib/queries)
│   ├── health.test.ts
│   ├── inquiry.test.ts
│   └── robots.test.ts
└── lib/          # pure-logic / transform tests, no mocks
    ├── queries.test.ts
    └── rate-limit.test.ts
```

`vitest.config.ts` aliases `@/` to `src/` (matches `tsconfig.json`), restricts
collection to `tests/**/*.test.ts`, and excludes `tests/e2e/**` (reserved for a
future Playwright suite).

## Patterns

### Mocking the Prisma client

`@/lib/db` exports a singleton Prisma client. Route handlers depend on it
directly; tests replace it with a `vi.hoisted` mock so the factory and the
test body share the same `vi.fn()`:

```ts
const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    robot: { count: vi.fn() },
    manufacturer: { count: vi.fn() },
  },
}));
vi.mock('@/lib/db', () => ({ default: prismaMock, prisma: prismaMock }));

import { GET } from '@/app/api/health/route'; // import AFTER vi.mock
```

`vi.mock` is hoisted above ordinary `const`, so plain top-level variables can't
be referenced inside the factory — `vi.hoisted` is the supported workaround.

### Mocking the query layer

If a route only uses one or two functions from `@/lib/queries`, mock the
query layer rather than Prisma. It keeps the test focused on the HTTP surface:

```ts
const { getAllRobots } = vi.hoisted(() => ({ getAllRobots: vi.fn() }));
vi.mock('@/lib/queries', () => ({ getAllRobots }));
import { GET } from '@/app/api/robots/route';
```

### Rate-limit module's setInterval

`src/lib/rate-limit.ts` installs a `setInterval` on import. Call
`vi.useFakeTimers()` BEFORE the import so the interval is registered against
fake timers and the suite exits cleanly:

```ts
vi.useFakeTimers();
import { checkRateLimit } from '@/lib/rate-limit';
```

## What's covered today

| Module                        | Coverage notes                                  |
| ----------------------------- | ----------------------------------------------- |
| `lib/rate-limit.ts`           | Bucketing, window reset, key isolation, IP parsing |
| `lib/queries.ts` (`toRobot`)  | JSON parsing, spec packing, nullable columns       |
| `api/health`                  | Healthy, 503-on-DB-failure, error redaction        |
| `api/robots`                  | Happy path, error wrapping, empty catalog          |
| `api/inquiry`                 | Validation, CSRF, honeypot, rate limit             |

This is a starter foundation — the QA epic
([`QA & Test Coverage`](https://pensum.zirkabot.com/projects/47689648-107d-4936-b146-105b1afbfda8/board))
tracks expanding it to the rest of the surface (basket route, admin login,
manufacturers/parts query helpers, components).

## Out of scope (for now)

- E2E browser flows → see `[QA Website] Playwright e2e on critical user paths`.
- Real-Prisma integration tests → see `[QA API] Prisma migration + seed smoke`.
- React component tests (jsdom) → not wired; the current critical surface is
  the server, not the UI.
