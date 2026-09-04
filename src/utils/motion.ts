export const invitationEase = [0.22, 1, 0.36, 1] as const;

export const invitationMotion = {
  ease: invitationEase,
  duration: 0.8,
  enterDuration: 0.9,
  lightboxDuration: 0.4,
  y: 12,
  stagger: 0.16,
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
