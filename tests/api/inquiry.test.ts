import { describe, it, expect, vi, beforeEach } from 'vitest';

// Prisma mock — only inquiry.create is touched. vi.hoisted() lets the factory
// and the tests share the same mock fn (vi.mock is hoisted above plain const).
const { inquiryCreate } = vi.hoisted(() => ({ inquiryCreate: vi.fn() }));
vi.mock('@/lib/db', () => ({
  default: { inquiry: { create: inquiryCreate } },
  prisma: { inquiry: { create: inquiryCreate } },
}));

// Reset the in-memory rate limiter between tests by using fresh keys
// (the module-internal Map keys off the ip; we vary `x-forwarded-for`).
import { POST } from '@/app/api/inquiry/route';

function makeReq(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request('http://localhost/api/inquiry', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

describe('POST /api/inquiry', () => {
  beforeEach(() => {
    inquiryCreate.mockReset();
    inquiryCreate.mockResolvedValue({ id: 'inq_1' });
  });

  it('creates an inquiry on a valid payload', async () => {
    const res = await POST(
      makeReq(
        { name: 'Pavlo', email: 'pavlo@example.com', city: 'Calgary' },
        { 'x-forwarded-for': '10.0.0.1' }
      ) as never
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(inquiryCreate).toHaveBeenCalledOnce();
    expect(inquiryCreate.mock.calls[0][0].data).toMatchObject({
      name: 'Pavlo',
      email: 'pavlo@example.com',
      city: 'Calgary',
    });
  });

  it('rejects missing required fields with 400', async () => {
    const res = await POST(
      makeReq({ name: 'Pavlo' }, { 'x-forwarded-for': '10.0.0.2' }) as never
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.message).toMatch(/required/i);
    expect(inquiryCreate).not.toHaveBeenCalled();
  });

  it('rejects malformed email with 400', async () => {
    const res = await POST(
      makeReq(
        { name: 'Pavlo', email: 'not-an-email', city: 'Calgary' },
        { 'x-forwarded-for': '10.0.0.3' }
      ) as never
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.message).toMatch(/valid email/i);
    expect(inquiryCreate).not.toHaveBeenCalled();
  });

  it('blocks cross-origin POSTs (CSRF guard)', async () => {
    const res = await POST(
      makeReq(
        { name: 'Pavlo', email: 'pavlo@example.com', city: 'Calgary' },
        {
          'x-forwarded-for': '10.0.0.4',
          origin: 'https://attacker.example',
          host: 'robonorth.ca',
        }
      ) as never
    );
    expect(res.status).toBe(403);
    expect(inquiryCreate).not.toHaveBeenCalled();
  });

  it('silently swallows honeypot submissions (returns 200, never hits DB)', async () => {
    const res = await POST(
      makeReq(
        { name: 'Bot', email: 'bot@example.com', city: 'Calgary', _hp: 'filled-by-bot' },
        { 'x-forwarded-for': '10.0.0.5' }
      ) as never
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(inquiryCreate).not.toHaveBeenCalled();
  });

  it('returns 429 after exceeding 5 requests per minute from one IP', async () => {
    const ip = '10.0.0.6';
    for (let i = 0; i < 5; i++) {
      const ok = await POST(
        makeReq(
          { name: 'Pavlo', email: 'p@example.com', city: 'Calgary' },
          { 'x-forwarded-for': ip }
        ) as never
      );
      expect(ok.status).toBe(200);
    }
    const blocked = await POST(
      makeReq(
        { name: 'Pavlo', email: 'p@example.com', city: 'Calgary' },
        { 'x-forwarded-for': ip }
      ) as never
    );
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get('Retry-After')).toBeTruthy();
  });
});
