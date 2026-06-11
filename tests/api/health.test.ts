import { describe, it, expect, vi, beforeEach } from 'vitest';

const counts = { robot: 22, manufacturer: 18 };

// vi.mock is hoisted to the top of the file, so the factory cannot reference
// values declared later in module scope. vi.hoisted() runs the factory in the
// same hoisted phase, giving us a stable reference both the mock and tests
// can use.
const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    robot: { count: vi.fn() },
    manufacturer: { count: vi.fn() },
  },
}));

vi.mock('@/lib/db', () => ({ default: prismaMock, prisma: prismaMock }));

// Import AFTER vi.mock so the route picks up the mocked client.
import { GET } from '@/app/api/health/route';

describe('GET /api/health', () => {
  beforeEach(() => {
    prismaMock.robot.count.mockClear();
    prismaMock.manufacturer.count.mockClear();
    prismaMock.robot.count.mockResolvedValue(counts.robot);
    prismaMock.manufacturer.count.mockResolvedValue(counts.manufacturer);
  });

  it('returns 200 + healthy when both count queries succeed', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('healthy');
    expect(body.database.connected).toBe(true);
    expect(body.database.robots).toBe(22);
    expect(body.database.manufacturers).toBe(18);
    expect(body.database.responseMs).toBeGreaterThanOrEqual(0);
    expect(typeof body.timestamp).toBe('string');
  });

  it('returns 503 + unhealthy when the DB throws', async () => {
    prismaMock.robot.count.mockRejectedValueOnce(new Error('connection refused'));
    const res = await GET();
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.status).toBe('unhealthy');
    expect(body.database.connected).toBe(false);
    expect(body.database.error).toBe('connection refused');
  });

  it('redacts non-Error rejections behind a generic message', async () => {
    prismaMock.robot.count.mockRejectedValueOnce('boom');
    const res = await GET();
    const body = await res.json();
    expect(res.status).toBe(503);
    expect(body.database.error).toBe('Unknown error');
  });
});
