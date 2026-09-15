import type { RsvpSubmission, RsvpWriteInput } from "@/types/rsvp";

export class RsvpRequestError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "RsvpRequestError";
    this.status = status;
    this.code = code;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSubmission(value: unknown): value is RsvpSubmission {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    value.id.length > 0 &&
    typeof value.guestName === "string" &&
    (value.attendance === "attending" || value.attendance === "declined") &&
    typeof value.attendeeCount === "number" &&
    (value.guestOf === "bride" ||
      value.guestOf === "groom" ||
      value.guestOf === "both") &&
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

export async function createRsvpSubmission(
  input: RsvpWriteInput,
): Promise<RsvpSubmission> {
  let response: Response;

  try {
    response = await fetch("/api/rsvp", {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guestName: input.guestName,
        attendance: input.attendance,
        attendeeCount: input.attendeeCount,
        guestOf: input.guestOf,
        ...(input.message ? { message: input.message } : {}),
      }),
    });
  } catch {
    throw new RsvpRequestError(0, "SERVER_ERROR", "NETWORK_ERROR");
  }

  const body = await readBody(response);

  if (!response.ok) {
    throw new RsvpRequestError(response.status, errorCode(body), "POST_FAILED");
  }

  if (!isRecord(body) || !isSubmission(body.data)) {
    throw new RsvpRequestError(response.status, "SERVER_ERROR", "POST_FAILED");
  }

  return body.data;
}
