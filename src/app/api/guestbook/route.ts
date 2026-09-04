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
import { insertWish, listApprovedWishes } from "@/lib/guestbook/wishes";
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

function isSameOriginPost(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return false;
  }

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = request.headers.get("host")?.split(",")[0]?.trim();
  let requestHost: string | undefined;
  try {
    requestHost = new URL(request.url).host;
  } catch {
    requestHost = undefined;
  }

  return [forwardedHost, host, requestHost].some(
    (candidate) => Boolean(candidate) && candidate === originHost,
  );
}

export async function GET() {
  try {
    const data = await listApprovedWishes();
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
    if (!consumePostRateLimit(key)) {
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
