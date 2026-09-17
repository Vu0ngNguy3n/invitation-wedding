import { invitationEase, invitationMotion } from "@/lib/motion";

export type OpeningState = "closed" | "opening" | "cardReveal" | "complete";

/**
 * Overlapping envelope choreography (seconds from tap):
 * 0ms     whileTap + seal release
 * ~260ms  flap begins
 * ~720ms  cardReveal (flap ~65% open)
 * ~1.67s  complete / overlay begins exiting
 */
export const openingTiming = {
  press: 0.12,
  seal: 0.24,
  flapDelay: 0.26,
  flap: 0.7,
  cardStart: 0.72,
  card: 0.82,
  forward: 0.34,
  overlayExit: 0.58,
} as const;

export const openingDurationMs = {
  opening: Math.round(openingTiming.cardStart * 1000),
  cardReveal: Math.round((openingTiming.card + 0.13) * 1000),
} as const;

export const openingEase = invitationEase;

export const openingMicroDuration = invitationMotion.micro;
