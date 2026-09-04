import type { GuestbookWish } from "@/types/guestbook";

export class GuestbookRequestError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "GuestbookRequestError";
    this.status = status;
    this.code = code;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isWish(value: unknown): value is GuestbookWish {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    value.id.length > 0 &&
    typeof value.name === "string" &&
    typeof value.message === "string" &&
    typeof value.createdAt === "string"
  );
}

async function readBody(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function errorCode(body: unknown): string {
  if (
    isRecord(body) &&
    isRecord(body.error) &&
    typeof body.error.code === "string"
  ) {
    return body.error.code;
  }

  return "SERVER_ERROR";
}

export async function createGuestbookWish(input: {
  name: string;
  message: string;
}): Promise<GuestbookWish> {
  let response: Response;

  try {
    response = await fetch("/api/guestbook", {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input.name,
        message: input.message,
      }),
    });
  } catch {
    throw new GuestbookRequestError(0, "SERVER_ERROR", "NETWORK_ERROR");
  }

  const body = await readBody(response);

  if (!response.ok) {
    throw new GuestbookRequestError(response.status, errorCode(body), "POST_FAILED");
  }

  if (!isRecord(body) || !isWish(body.data)) {
    throw new GuestbookRequestError(response.status, "SERVER_ERROR", "POST_FAILED");
  }

  return body.data;
}
