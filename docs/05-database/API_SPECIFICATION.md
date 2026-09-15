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

## POST /api/rsvp

### Purpose
Persist a private attendance confirmation. This is not Guestbook.

### Request

```json
{
  "guestName": "Guest Name",
  "attendance": "attending",
  "attendeeCount": 2,
  "guestOf": "bride",
  "message": "Optional note"
}
```

Stable values:

- `attendance`: `attending` | `declined`
- `guestOf`: `bride` | `groom` | `both`
- `attendeeCount`: `0` when declined; `1`–`4` when attending

### Validation

- JSON body required
- `Origin` must match the request host
- trim text values
- guest name required, 1–80 characters
- attendance required and typed
- attendee count required and consistent with attendance
- guest-of required and typed
- optional message, at most 1000 characters
- enforce a server-side body size limit

### Success

HTTP 201 with the stored submission (`id`, `guestName`, `attendance`, `attendeeCount`, `guestOf`, optional `message`, `createdAt`).

There is no public GET list. RSVP rows are not displayed on the invitation.

### Client Error

HTTP 400 with a safe validation message.

### Rate Limit

HTTP 429 with a generic retry message.

### Server Error

HTTP 500 with a generic user-facing message.

