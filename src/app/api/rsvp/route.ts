import { NextResponse } from "next/server";
import { isSameOriginPost } from "@/lib/http/origin";
import {
  clientRateLimitKey,
  consumePostRateLimit,
} from "@/lib/http/rate-limit";
import { insertRsvpSubmission } from "@/lib/rsvp/submissions";
import {
  isRsvpBodyTooLarge,
  validateRsvpContentLength,
  validateRsvpWrite,
} from "@/lib/rsvp/validation";
import type { RsvpErrorCode, RsvpErrorResponse } from "@/types/rsvp";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function errorResponse(status: number, code: RsvpErrorCode, message: string) {
  const body: RsvpErrorResponse = { error: { code, message } };
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  try {
    if (!isSameOriginPost(request)) {
      return errorResponse(
        403,
        "VALIDATION_ERROR",
        "Request origin is not allowed.",
      );
    }

    const key = clientRateLimitKey(request);
    if (!key || !consumePostRateLimit(`rsvp:${key}`)) {
      return errorResponse(
        429,
        "RATE_LIMITED",
        "Too many requests. Please try again later.",
      );
    }

    const tooLargeHeader = validateRsvpContentLength(request);
    if (tooLargeHeader && !tooLargeHeader.ok) {
      return errorResponse(400, "VALIDATION_ERROR", tooLargeHeader.message);
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return errorResponse(
        400,
        "VALIDATION_ERROR",
        "Request body must be JSON.",
      );
    }

    const rawBody = await request.text();
    if (isRsvpBodyTooLarge(new TextEncoder().encode(rawBody).byteLength)) {
      return errorResponse(400, "VALIDATION_ERROR", "Request is too large.");
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return errorResponse(
        400,
        "VALIDATION_ERROR",
        "Request body must be JSON.",
      );
    }

    const parsed = validateRsvpWrite(payload);
    if (!parsed.ok) {
      return errorResponse(400, "VALIDATION_ERROR", parsed.message);
    }

    const data = await insertRsvpSubmission(parsed.value);
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    console.error("rsvp POST failed");
    return errorResponse(
      500,
      "SERVER_ERROR",
      "Unable to save your RSVP right now.",
    );
  }
}
