import { invitationEase, invitationMotion } from "@/lib/motion";

export type OpeningState = "closed" | "opening" | "cardReveal" | "complete";

export const openingTiming = {
  press: 0.2,
  seal: 0.32,
  flap: 0.86,
  pause: 0.2,
  card: 0.96,
  forward: 0.42,
  overlayExit: 0.9,
} as const;

export const openingDurationMs = {
  opening: Math.round(
    (openingTiming.press +
      openingTiming.seal +
      openingTiming.flap +
      openingTiming.pause) *
      1000,
  ),
  cardReveal: Math.round(
    (openingTiming.card + openingTiming.forward) * 1000,
  ),
} as const;

export const openingEase = invitationEase;

export const openingMicroDuration = invitationMotion.micro;
