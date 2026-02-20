# API Reference — RoboNorth

> All API endpoints available in the RoboNorth application.

**Base URL:** `https://robonorth.ca` (production) · `http://localhost:3000` (development)

---

## Table of Contents

- [GET /api/robots](#get-apirobots)
- [POST /api/inquiry](#post-apiinquiry)
- [POST /api/inquiry/basket](#post-apiinquirybasket)
- [GET /api/health](#get-apihealth)
- [GET /feed.xml](#get-feedxml)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)

---

## GET /api/robots

Returns all robots in the database with full specs.

### Request

```
GET /api/robots
```

No parameters required.

### Response

```json
[
  {
    "id": "unitree-g1",
    "name": "Unitree G1",
    "manufacturer": "Unitree Robotics",
    "manufacturerSlug": "unitree",
    "price": "From $13,500 USD",
    "priceMin": 13500,
    "availability": "shipping",
    "category": "consumer",
    "useCase": ["education", "research", "entertainment"],
    "description": "The Unitree G1 is the world's most affordable humanoid robot...",
    "country": "China",
    "imageUrl": "https://...",
    "featured": true,
    "canadaAvailable": true,
    "specs": {
      "height": 1.27,
      "weight": 35,
      "dof": 23,
      "battery": "2–3 hours",
      "payload": 3,
      "speed": 2.0
    },
    "scores": {
      "deployment": 9,
      "capability": 7,
      "availability": 10,
      "value": 10,
      "impact": 8
    },
    "categoryWinners": ["Best Value"],
    "reviewSlug": "unitree-g1"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique slug identifier |
| `name` | string | Display name |
| `manufacturer` | string | Manufacturer name |
| `manufacturerSlug` | string | Manufacturer URL slug |
| `price` | string | Display price string |
| `priceMin` | number | Minimum price (USD) for sorting |
| `availability` | string | One of: `shipping`, `preorder`, `pilot`, `announced`, `prototype` |
| `category` | string | One of: `consumer`, `enterprise`, `research`, `announced` |
| `useCase` | string[] | Array of use case identifiers |
| `specs` | object | Technical specifications |
| `scores` | object \| null | Scoring data (5 criteria, 1–10 scale) |
| `categoryWinners` | string[] | Winner badge labels |
| `reviewSlug` | string \| null | Slug of linked review page |

---

## POST /api/inquiry

Submit a general inquiry or contact form.

### Request

```
POST /api/inquiry
Content-Type: application/json
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Full name |
| `email` | string | ✅ | Email address (validated) |
| `city` | string | ✅ | City/location |
| `phone` | string | ❌ | Phone number |
| `company` | string | ❌ | Company name |
| `robot` | string | ❌ | Robot of interest (slug) |
| `message` | string | ❌ | Additional message |
| `type` | string | ❌ | `general` (default), `quick` |
| `contactMethod` | string | ❌ | `email` (default), `phone`, `either` |
| `_hp` | string | ❌ | Honeypot field (must be empty) |

### Example

```bash
curl -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "city": "Toronto",
    "robot": "unitree-g1",
    "message": "Interested in purchasing for our lab."
  }'
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Thank you! We'll be in touch within 24 hours."
}
```

### Error Responses

| Status | Condition |
|--------|-----------|
| 400 | Missing required fields (name, email, city) |
| 400 | Invalid email format |
| 403 | CSRF origin mismatch |
| 429 | Rate limit exceeded (5/min) |
| 500 | Server error |

```json
{
  "success": false,
  "message": "Name, email, and city are required."
}
```

---

## POST /api/inquiry/basket

Submit a multi-item inquiry from the inquiry basket.

### Request

```
POST /api/inquiry/basket
Content-Type: application/json
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Full name |
| `email` | string | ✅ | Email address |
| `city` | string | ✅ | City/location |
| `phone` | string | ❌ | Phone number |
| `company` | string | ❌ | Company name |
| `message` | string | ❌ | Additional notes |
| `contactMethod` | string | ❌ | `email`, `phone`, `either` |
| `items` | array | ✅ | Array of items (min 1) |
| `items[].itemType` | string | ✅ | `robot` or `part` |
| `items[].itemId` | string | ✅ | Slug of the robot or part |
| `items[].itemName` | string | ✅ | Display name |
| `items[].quantity` | number | ❌ | Quantity (default: 1) |

### Example

```bash
curl -X POST http://localhost:3000/api/inquiry/basket \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@company.ca",
    "city": "Calgary",
    "company": "RoboCo Ltd",
    "items": [
      { "itemType": "robot", "itemId": "unitree-g1", "itemName": "Unitree G1", "quantity": 2 },
      { "itemType": "part", "itemId": "dynamixel-xm540", "itemName": "Dynamixel XM540-W270", "quantity": 6 }
    ]
  }'
```

### Success Response (200)

```json
{
  "success": true,
  "referenceNumber": "RN-2K3F8A-X9B2",
  "message": "Thank you! We'll be in touch within 24 hours."
}
```

The `referenceNumber` is a unique identifier for tracking the inquiry (format: `RN-{timestamp}-{random}`).

### Error Responses

| Status | Condition |
|--------|-----------|
| 400 | Missing required fields |
| 400 | Invalid email format |
| 400 | Empty items array |
| 403 | CSRF origin mismatch |
| 429 | Rate limit exceeded |
| 500 | Server error |

---

## GET /api/health

Health check endpoint returning server status and database connectivity.

### Request

```
GET /api/health
```

### Response (Healthy — 200)

```json
{
  "status": "healthy",
  "timestamp": "2026-02-20T12:00:00.000Z",
  "uptime": 3600.5,
  "database": {
    "connected": true,
    "robots": 40,
    "manufacturers": 26,
    "responseMs": 3
  },
  "version": "0.1.0",
  "environment": "production"
}
```

### Response (Unhealthy — 503)

```json
{
  "status": "unhealthy",
  "timestamp": "2026-02-20T12:00:00.000Z",
  "database": {
    "connected": false,
    "error": "Database file not found",
    "responseMs": 15
  },
  "version": "0.1.0",
  "environment": "production"
}
```

---

## GET /feed.xml

RSS 2.0 feed of blog posts for syndication and feed readers.

### Request

```
GET /feed.xml
Accept: application/rss+xml
```

### Response

Returns XML with `Content-Type: application/rss+xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>RoboNorth Blog</title>
    <link>https://robonorth.ca/blog</link>
    <description>Latest articles from Canada's humanoid robot marketplace</description>
    <item>
      <title>Article Title</title>
      <link>https://robonorth.ca/blog/article-slug</link>
      <description>Article excerpt...</description>
      <pubDate>Thu, 20 Feb 2026 00:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>
```

---

## Rate Limiting

All POST endpoints are rate-limited to **5 requests per minute per IP address**.

### Headers

Successful requests include:
```
X-RateLimit-Remaining: 4
```

Rate-limited requests return:
```
HTTP/1.1 429 Too Many Requests
Retry-After: 45
X-RateLimit-Remaining: 0
```

### Implementation

The rate limiter is in-memory (resets on server restart). It uses the client IP from `x-forwarded-for`, `x-real-ip`, or falls back to `127.0.0.1`.

---

## Error Handling

All API errors follow a consistent format:

```json
{
  "success": false,
  "message": "Human-readable error description."
}
```

### Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request — invalid or missing input |
| 403 | Forbidden — CSRF origin mismatch |
| 429 | Too Many Requests — rate limit exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable — database unhealthy |

### Security

- **CSRF Protection**: POST routes validate `Origin` header matches `Host`
- **Honeypot**: Forms include a hidden `_hp` field; if filled, the submission is silently discarded
- **Input Validation**: Email format regex, required field checks, array type validation
