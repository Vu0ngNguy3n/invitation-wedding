import type { RsvpGuestOf } from "@/types/rsvp";

export type RsvpFormStatus =
  | "idle"
  | "validating"
  | "submitting"
  | "success"
  | "error";

export type RsvpGuestOfOption = {
  value: RsvpGuestOf;
  label: string;
};

export type RsvpUiLabels = {
  nameLabel: string;
  namePlaceholder: string;
  nameRequired: string;
  nameTooLong: string;
  messageLabel: string;
  messagePlaceholder: string;
  messageTooLong: string;
  attendanceLabel: string;
  attendancePlaceholder: string;
  attendanceRequired: string;
  attendanceAttending: string;
  attendanceDeclined: string;
  attendeeCountLabel: string;
  attendeeCountPlaceholder: string;
  attendeeCountRequired: string;
  guestOfLabel: string;
  guestOfPlaceholder: string;
  guestOfRequired: string;
  submitLabel: string;
  submittingLabel: string;
  successAttending: string;
  successDeclined: string;
  errorMessage: string;
  rateLimitMessage: string;
  privacyNote: string;
};
