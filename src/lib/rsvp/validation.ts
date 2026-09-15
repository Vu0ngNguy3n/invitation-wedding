import {
  RSVP_ATTENDANCE_VALUES,
  RSVP_ATTENDEE_MAX,
  RSVP_ATTENDEE_MIN,
  RSVP_GUEST_OF_VALUES,
  RSVP_MESSAGE_MAX,
  RSVP_NAME_MAX,
  RSVP_NAME_MIN,
  type RsvpAttendance,
  type RsvpGuestOf,
  type RsvpWriteInput,
} from "@/types/rsvp";

export type RsvpValidationResult =
  | { ok: true; value: RsvpWriteInput }
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

function isAttendance(value: unknown): value is RsvpAttendance {
  return (
    typeof value === "string" &&
    (RSVP_ATTENDANCE_VALUES as readonly string[]).includes(value)
  );
}

function isGuestOf(value: unknown): value is RsvpGuestOf {
  return (
    typeof value === "string" &&
    (RSVP_GUEST_OF_VALUES as readonly string[]).includes(value)
  );
}

export function isRsvpBodyTooLarge(byteLength: number): boolean {
  return !Number.isFinite(byteLength) || byteLength > MAX_BODY_BYTES;
}

export function validateRsvpContentLength(
  request: Request,
): RsvpValidationResult | null {
  const header = request.headers.get("content-length");
  if (!header) {
    return null;
  }

  const length = Number(header);
  if (isRsvpBodyTooLarge(length)) {
    return { ok: false, message: "Request is too large." };
  }

  return null;
}

function validateGuestName(value: string): string | null {
  const guestName = value.trim();

  if (containsNul(guestName)) {
    return "Guest name is invalid.";
  }

  const nameLength = characterCount(guestName);
  if (nameLength < RSVP_NAME_MIN || nameLength > RSVP_NAME_MAX) {
    return `Guest name must be between ${RSVP_NAME_MIN} and ${RSVP_NAME_MAX} characters.`;
  }

  return null;
}

function validateOptionalMessage(value: unknown): string | null | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    return null;
  }

  const message = value.trim();
  if (message.length === 0) {
    return undefined;
  }

  if (containsNul(message)) {
    return null;
  }

  const messageLength = characterCount(message);
  if (messageLength > RSVP_MESSAGE_MAX) {
    return null;
  }

  return message;
}

export function validateRsvpWrite(payload: unknown): RsvpValidationResult {
  if (!asRecord(payload)) {
    return { ok: false, message: "Request body must be a JSON object." };
  }

  if (typeof payload.guestName !== "string") {
    return { ok: false, message: "Guest name is required." };
  }

  const nameError = validateGuestName(payload.guestName);
  if (nameError) {
    return { ok: false, message: nameError };
  }

  if (!isAttendance(payload.attendance)) {
    return { ok: false, message: "Attendance is required." };
  }

  if (!isGuestOf(payload.guestOf)) {
    return { ok: false, message: "Guest side is required." };
  }

  if (
    typeof payload.attendeeCount !== "number" ||
    !Number.isInteger(payload.attendeeCount)
  ) {
    return { ok: false, message: "Attendee count is invalid." };
  }

  const { attendance, attendeeCount } = payload;

  if (attendance === "declined" && attendeeCount !== 0) {
    return { ok: false, message: "Declined responses must have 0 attendees." };
  }

  if (
    attendance === "attending" &&
    (attendeeCount < RSVP_ATTENDEE_MIN || attendeeCount > RSVP_ATTENDEE_MAX)
  ) {
    return {
      ok: false,
      message: `Attendee count must be between ${RSVP_ATTENDEE_MIN} and ${RSVP_ATTENDEE_MAX}.`,
    };
  }

  const message = validateOptionalMessage(payload.message);
  if (message === null) {
    return {
      ok: false,
      message: `Message must be at most ${RSVP_MESSAGE_MAX} characters.`,
    };
  }

  return {
    ok: true,
    value: {
      guestName: payload.guestName.trim(),
      attendance,
      attendeeCount,
      guestOf: payload.guestOf,
      ...(message ? { message } : {}),
    },
  };
}
