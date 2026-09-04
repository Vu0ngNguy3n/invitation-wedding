import {
  GUESTBOOK_MESSAGE_MAX,
  GUESTBOOK_MESSAGE_MIN,
  GUESTBOOK_NAME_MAX,
  GUESTBOOK_NAME_MIN,
} from "@/types/guestbook";

export type GuestbookWriteInput = {
  name: string;
  message: string;
};

export type GuestbookValidationResult =
  | { ok: true; value: GuestbookWriteInput }
  | { ok: false; message: string };

const MAX_BODY_BYTES = 8_192;

function characterCount(value: string): number {
  return [...value].length;
}

function containsNul(value: string): boolean {
  return value.includes("\0");
}

function asRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isGuestbookBodyTooLarge(byteLength: number): boolean {
  return !Number.isFinite(byteLength) || byteLength > MAX_BODY_BYTES;
}

export function validateContentLength(request: Request): GuestbookValidationResult | null {
  const header = request.headers.get("content-length");
  if (!header) {
    return null;
  }

  const length = Number(header);
  if (isGuestbookBodyTooLarge(length)) {
    return { ok: false, message: "Request is too large." };
  }

  return null;
}

export function validateName(value: string): string | null {
  const name = value.trim();

  if (containsNul(name)) {
    return "Name or message is invalid.";
  }

  const nameLength = characterCount(name);
  if (nameLength < GUESTBOOK_NAME_MIN || nameLength > GUESTBOOK_NAME_MAX) {
    return `Name must be between ${GUESTBOOK_NAME_MIN} and ${GUESTBOOK_NAME_MAX} characters.`;
  }

  return null;
}

export function validateMessage(value: string): string | null {
  const message = value.trim();

  if (containsNul(message)) {
    return "Name or message is invalid.";
  }

  const messageLength = characterCount(message);
  if (
    messageLength < GUESTBOOK_MESSAGE_MIN ||
    messageLength > GUESTBOOK_MESSAGE_MAX
  ) {
    return `Message must be between ${GUESTBOOK_MESSAGE_MIN} and ${GUESTBOOK_MESSAGE_MAX} characters.`;
  }

  return null;
}

export function validateGuestbookWrite(payload: unknown): GuestbookValidationResult {
  if (!asRecord(payload)) {
    return { ok: false, message: "Request body must be a JSON object." };
  }

  if (typeof payload.name !== "string" || typeof payload.message !== "string") {
    return {
      ok: false,
      message: "Name and message are required.",
    };
  }

  const nameError = validateName(payload.name);
  const messageError = validateMessage(payload.message);

  if (nameError) {
    return { ok: false, message: nameError };
  }

  if (messageError) {
    return { ok: false, message: messageError };
  }

  return {
    ok: true,
    value: {
      name: payload.name.trim(),
      message: payload.message.trim(),
    },
  };
}
