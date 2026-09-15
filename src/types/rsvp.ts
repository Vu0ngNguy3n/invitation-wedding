export const RSVP_NAME_MIN = 1;
export const RSVP_NAME_MAX = 80;
export const RSVP_MESSAGE_MAX = 1000;
export const RSVP_ATTENDEE_MIN = 1;
export const RSVP_ATTENDEE_MAX = 4;

export const RSVP_ATTENDANCE_VALUES = ["attending", "declined"] as const;
export const RSVP_GUEST_OF_VALUES = ["bride", "groom", "both"] as const;

export type RsvpAttendance = (typeof RSVP_ATTENDANCE_VALUES)[number];
export type RsvpGuestOf = (typeof RSVP_GUEST_OF_VALUES)[number];

export type RsvpWriteInput = {
  guestName: string;
  attendance: RsvpAttendance;
  attendeeCount: number;
  guestOf: RsvpGuestOf;
  message?: string;
};

export type RsvpSubmission = {
  id: string;
  guestName: string;
  attendance: RsvpAttendance;
  attendeeCount: number;
  guestOf: RsvpGuestOf;
  message?: string;
  createdAt: string;
};

export type RsvpCreateResponse = {
  data: RsvpSubmission;
};

export type RsvpErrorCode =
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "SERVER_ERROR";

export type RsvpErrorResponse = {
  error: {
    code: RsvpErrorCode;
    message: string;
  };
};
