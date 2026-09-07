export const invitationEase = [0.16, 1, 0.3, 1] as const;

export const invitationMotion = {
  ease: invitationEase,
  micro: 0.28,
  duration: 0.75,
  enterDuration: 1.1,
  lightboxDuration: 0.42,
  imageDuration: 0.9,
  heroDuration: 1.15,
  y: 14,
  scaleFrom: 0.985,
  imageScaleFrom: 1.035,
  stagger: 0.1,
  heroStagger: 0.12,
} as const;

type InvitationTransition = {
  duration: number;
  delay: number;
  ease?: readonly [number, number, number, number];
};

export function invitationTransition(
  prefersReducedMotion: boolean | null,
  options?: {
    delay?: number;
    duration?: number;
  },
): InvitationTransition {
  if (prefersReducedMotion === true) {
    return { duration: 0, delay: 0 };
  }

  return {
    duration: options?.duration ?? invitationMotion.duration,
    delay: options?.delay ?? 0,
    ease: invitationEase,
  };
}
