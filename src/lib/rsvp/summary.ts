import type { RsvpSubmission } from "@/types/rsvp";

export type RsvpSummary = {
  totalResponses: number;
  attendingResponses: number;
  declinedResponses: number;
  totalAttendees: number;
  brideSideResponses: number;
  groomSideResponses: number;
  bothSideResponses: number;
  withMessage: number;
};

export function summarizeRsvp(submissions: RsvpSubmission[]): RsvpSummary {
  return submissions.reduce<RsvpSummary>(
    (summary, submission) => {
      summary.totalResponses += 1;
      summary.totalAttendees += submission.attendeeCount;

      if (submission.attendance === "attending") {
        summary.attendingResponses += 1;
      } else {
        summary.declinedResponses += 1;
      }

      if (submission.guestOf === "bride") {
        summary.brideSideResponses += 1;
      } else if (submission.guestOf === "groom") {
        summary.groomSideResponses += 1;
      } else {
        summary.bothSideResponses += 1;
      }

      if (submission.message) {
        summary.withMessage += 1;
      }

      return summary;
    },
    {
      totalResponses: 0,
      attendingResponses: 0,
      declinedResponses: 0,
      totalAttendees: 0,
      brideSideResponses: 0,
      groomSideResponses: 0,
      bothSideResponses: 0,
      withMessage: 0,
    },
  );
}
