# Guestbook API Specification

## GET /api/guestbook

### Purpose
Return publicly displayable guestbook wishes.

### Response 200

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Guest Name",
      "message": "Congratulations!",
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

### Empty

Return:
```json
{
  "data": []
}
```

### Errors

Do not expose raw database errors.

## POST /api/guestbook

### Request

```json
{
  "name": "Guest Name",
  "message": "Wedding wishes..."
}
```

### Validation

- JSON body required
- `Origin` must match the request host
- name required
- message required
- trim whitespace
- name 1–80 chars
- message 1–1000 chars
- reject obviously invalid payloads
- enforce a server-side body size limit (header and actual body)

### Success

HTTP 201:

```json
{
  "data": {
    "id": "uuid",
    "name": "Guest Name",
    "message": "Wedding wishes...",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
```

### Client Error

HTTP 400 with safe validation message.

### Rate Limit

If abuse protection is implemented, return HTTP 429 with a generic retry
message.

### Server Error

HTTP 500 with a generic user-facing message.

Never return:
- database connection strings
- Supabase secret keys
- stack traces
- SQL statements
