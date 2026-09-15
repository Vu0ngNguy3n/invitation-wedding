import type { RsvpSubmission } from "@/types/rsvp";

function csvField(value: string): string {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}

function attendanceLabel(value: RsvpSubmission["attendance"]): string {
  return value === "attending" ? "attending" : "declined";
}

export function rsvpSubmissionsToCsv(submissions: RsvpSubmission[]): string {
  const header = [
    "Guest Name",
    "Attendance",
    "Attendee Count",
    "Guest Side",
    "Message",
    "Submitted At",
  ];

  const lines = [
    header.map(csvField).join(","),
    ...submissions.map((submission) =>
      [
        submission.guestName,
        attendanceLabel(submission.attendance),
        String(submission.attendeeCount),
        submission.guestOf,
        submission.message ?? "",
        submission.createdAt,
      ]
        .map(csvField)
        .join(","),
    ),
  ];

  return `\uFEFF${lines.join("\r\n")}\r\n`;
}

export function rsvpCsvFilename(now: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00";

  return `wedding-rsvp-${read("year")}-${read("month")}-${read("day")}.csv`;
}
