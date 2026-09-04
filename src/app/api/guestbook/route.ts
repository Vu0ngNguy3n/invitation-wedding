import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { GUESTBOOK_CACHE_TAG } from "@/lib/guestbook/constants";
import {
  clientRateLimitKey,
  consumePostRateLimit,
} from "@/lib/guestbook/rate-limit";
import {
  isGuestbookBodyTooLarge,
  validateContentLength,
  validateGuestbookWrite,
} from "@/lib/guestbook/validation";
import { insertWish } from "@/lib/guestbook/wishes";
import { listApprovedWishesCached } from "@/lib/guestbook/cached-wishes";
import type {
  GuestbookErrorCode,
  GuestbookErrorResponse,
} from "@/types/guestbook";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function errorResponse(
  status: number,
  code: GuestbookErrorCode,
  message: string,
) {
  const body: GuestbookErrorResponse = { error: { code, message } };
  return NextResponse.json(body, { status });
}

function hostnameFrom(value: string | undefined): string | undefined {
  const raw = value?.split(",")[0]?.trim();
  if (!raw) {
    return undefined;
  }

  try {
    const url = raw.includes("://") ? new URL(raw) : new URL(`https://${raw}`);
    const hostname = url.hostname.trim().toLowerCase();
    return hostname.length > 0 ? hostname : undefined;
  } catch {
    return undefined;
  }
}

function isSameOriginPost(request: Request): boolean {
  const originHost = hostnameFrom(request.headers.get("origin") ?? undefined);
  if (!originHost) {
    return false;
  }

  return [
    hostnameFrom(request.headers.get("x-forwarded-host") ?? undefined),
    hostnameFrom(request.headers.get("host") ?? undefined),
    hostnameFrom(request.url),
  ].some((candidate) => candidate === originHost);
}

export async function GET() {
  try {
    const data = await listApprovedWishesCached();
    return NextResponse.json({ data });
  } catch {
    console.error("guestbook GET failed");
    return errorResponse(
      500,
      "SERVER_ERROR",
      "Unable to load wishes right now.",
    );
  }
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
    if (!key || !consumePostRateLimit(key)) {
      return errorResponse(
        429,
        "RATE_LIMITED",
        "Too many requests. Please try again later.",
      );
    }

    const tooLargeHeader = validateContentLength(request);
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
    if (isGuestbookBodyTooLarge(new TextEncoder().encode(rawBody).byteLength)) {
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

    const parsed = validateGuestbookWrite(payload);
    if (!parsed.ok) {
      return errorResponse(400, "VALIDATION_ERROR", parsed.message);
    }

    const data = await insertWish(parsed.value);
    revalidateTag(GUESTBOOK_CACHE_TAG, "max");
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    console.error("guestbook POST failed");
    return errorResponse(
      500,
      "SERVER_ERROR",
      "Unable to save your message right now.",
    );
  }
}
