import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  RSVP_ATTENDANCE_VALUES,
  RSVP_GUEST_OF_VALUES,
  type RsvpAttendance,
  type RsvpGuestOf,
  type RsvpSubmission,
  type RsvpWriteInput,
} from "@/types/rsvp";

function isRecord(value: unknown): value is Record<string, unknown> {
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

function parseSubmissionRow(value: unknown): RsvpSubmission | null {
  if (!isRecord(value)) {
    return null;
  }

  const {
    id,
    guest_name: guestName,
    attendance,
    attendee_count: attendeeCount,
    guest_of: guestOf,
    message,
    created_at: createdAt,
  } = value;

  if (
    typeof id !== "string" ||
    id.length === 0 ||
    typeof guestName !== "string" ||
    !isAttendance(attendance) ||
    typeof attendeeCount !== "number" ||
    !Number.isInteger(attendeeCount) ||
    !isGuestOf(guestOf) ||
    typeof createdAt !== "string"
  ) {
    return null;
  }

  const parsed = Date.parse(createdAt);
  if (Number.isNaN(parsed)) {
    return null;
  }

  if (message !== null && message !== undefined && typeof message !== "string") {
    return null;
  }

  return {
    id,
    guestName,
    attendance,
    attendeeCount,
    guestOf,
    ...(typeof message === "string" && message.length > 0 ? { message } : {}),
    createdAt: new Date(parsed).toISOString(),
  };
}

function requireSubmissionRow(value: unknown): RsvpSubmission {
  const submission = parseSubmissionRow(value);
  if (!submission) {
    throw new Error("RSVP_ROW_INVALID");
  }
  return submission;
}

export async function insertRsvpSubmission(
  input: RsvpWriteInput,
): Promise<RsvpSubmission> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("rsvp_submissions")
    .insert({
      guest_name: input.guestName,
      attendance: input.attendance,
      attendee_count: input.attendeeCount,
      guest_of: input.guestOf,
      message: input.message ?? null,
    })
    .select(
      "id, guest_name, attendance, attendee_count, guest_of, message, created_at",
    )
    .single();

  if (error || !data) {
    console.error("RSVP_INSERT_FAILED", {
      code: error?.code,
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
    });
    throw new Error("RSVP_INSERT_FAILED");
  }

  return requireSubmissionRow(data);
}

export async function listRsvpSubmissions(): Promise<RsvpSubmission[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("rsvp_submissions")
    .select(
      "id, guest_name, attendance, attendee_count, guest_of, message, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(2000);

  if (error) {
    console.error("RSVP_LIST_FAILED", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw new Error("RSVP_LIST_FAILED");
  }

  return (data ?? []).flatMap((row) => {
    const submission = parseSubmissionRow(row);
    return submission ? [submission] : [];
  });
}
