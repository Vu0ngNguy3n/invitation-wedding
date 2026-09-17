import type { Variants } from "framer-motion";
import { invitationEase, invitationMotion } from "@/lib/motion/transitions";

export const softReveal: Variants = {
  hidden: { opacity: 0, y: invitationMotion.y },
  shown: { opacity: 1, y: 0 },
};

export const fadeReveal: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1 },
};

export const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(7% 7% 7% 7%)",
    scale: invitationMotion.imageScaleFrom,
  },
  shown: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
  },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: invitationMotion.scaleFrom },
  shown: { opacity: 1, scale: 1 },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  shown: { opacity: 1, y: 0 },
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: invitationMotion.stagger,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0 },
};

export const editorialLeft: Variants = {
  hidden: { opacity: 0, x: -invitationMotion.editorialX },
  shown: { opacity: 1, x: 0 },
};

export const editorialRight: Variants = {
  hidden: { opacity: 0, x: invitationMotion.editorialX },
  shown: { opacity: 1, x: 0 },
};

export const editorialImage: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(6% 6% 6% 6%)",
    scale: invitationMotion.imageScaleFrom,
    rotate: -2.8,
  },
  shown: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    rotate: 0,
  },
};

export const editorialImageAlt: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(6% 6% 6% 6%)",
    scale: invitationMotion.imageScaleFrom,
    rotate: 2.8,
  },
  shown: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    rotate: 0,
  },
};

export const lingerReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0 },
};

export const storyHeading: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0 },
};

export const storyPhotoLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -invitationMotion.storyPhotoX,
    y: invitationMotion.storyPhotoY,
    scale: invitationMotion.storyPhotoScaleFrom,
  },
  shown: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  },
};

export const storyPhotoRight: Variants = {
  hidden: {
    opacity: 0,
    x: invitationMotion.storyPhotoX,
    y: invitationMotion.storyPhotoY,
    scale: invitationMotion.storyPhotoScaleFrom,
  },
  shown: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  },
};

export const storyNameReveal: Variants = {
  hidden: { opacity: 0, y: invitationMotion.storyNameY },
  shown: { opacity: 1, y: 0 },
};

export const dressCodeReveal: Variants = {
  hidden: { opacity: 0, y: "var(--dress-code-reveal-y, 22px)" },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: invitationEase,
    },
  },
};

export const dressCodeCopy: Variants = {
  hidden: { opacity: 0, y: "var(--dress-code-copy-y, 14px)" },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: invitationEase,
    },
  },
};

export const dressCodeSwatchGroup: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

export const dressCodeSwatch: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: "var(--dress-code-swatch-y, 12px)",
  },
  shown: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: invitationEase,
    },
  },
};

export const reducedStagger: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

export const eventSection: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0,
    },
  },
};

export const eventHeading: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: invitationEase,
    },
  },
};

export const eventCardGroup: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.04,
    },
  },
};

export const eventCardLeft: Variants = {
  hidden: {
    opacity: 0,
    x: "calc(-1 * var(--event-card-x, 0px))",
    y: "var(--event-card-y, 20px)",
  },
  shown: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: invitationMotion.enterDuration,
      ease: invitationEase,
      staggerChildren: 0.09,
      delayChildren: 0.14,
    },
  },
};

export const eventCardRight: Variants = {
  hidden: {
    opacity: 0,
    x: "var(--event-card-x, 0px)",
    y: "var(--event-card-y, 20px)",
  },
  shown: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: invitationMotion.enterDuration,
      ease: invitationEase,
      staggerChildren: 0.09,
      delayChildren: 0.14,
    },
  },
};

export const eventCardCopy: Variants = {
  hidden: { opacity: 0, y: 10 },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: invitationEase,
    },
  },
};

export const timelineHeading: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: invitationEase,
    },
  },
};

export const timelineContainer: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
};

export const timelineLineY: Variants = {
  hidden: { scaleY: 0 },
  shown: {
    scaleY: 1,
    transition: {
      duration: invitationMotion.enterDuration,
      ease: invitationEase,
    },
  },
};

export const timelineLineX: Variants = {
  hidden: { scaleX: 0 },
  shown: {
    scaleX: 1,
    transition: {
      duration: invitationMotion.enterDuration,
      ease: invitationEase,
    },
  },
};

export const timelineItemGroup: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

export const timelineItem: Variants = {
  hidden: {
    opacity: 0,
    y: "var(--timeline-item-y, 18px)",
    scale: 0.98,
  },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: invitationEase,
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const timelineMarker: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  shown: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: invitationEase,
    },
  },
};

export const timelineTextGroup: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const timelineText: Variants = {
  hidden: { opacity: 0, y: 10 },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: invitationEase,
    },
  },
};

export const heroStaggerContainer: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: invitationMotion.heroStagger,
      delayChildren: 0.08,
    },
  },
};

export const albumContainer: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

export const albumHeading: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: invitationEase,
    },
  },
};

export const albumDivider: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: invitationEase,
    },
  },
};

export const albumStage: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.04,
    },
  },
};

export const albumArrows: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

export const albumMainImage: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    y: "var(--album-image-y, 22px)",
  },
  shown: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: invitationEase,
    },
  },
};

export const albumArrowLeft: Variants = {
  hidden: { opacity: 0, x: -6 },
  shown: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.52,
      ease: invitationEase,
    },
  },
};

export const albumArrowRight: Variants = {
  hidden: { opacity: 0, x: 6 },
  shown: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.52,
      ease: invitationEase,
    },
  },
};

export const albumCaption: Variants = {
  hidden: { opacity: 0, y: 6 },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: invitationEase,
    },
  },
};

export const albumThumbnail: Variants = {
  hidden: {
    opacity: 0,
    y: "var(--album-thumb-y, 9px)",
    scale: 0.97,
  },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      ease: invitationEase,
    },
  },
};

export const revealVariantMap = {
  softReveal,
  fadeReveal,
  imageReveal,
  fadeScale,
  sectionReveal,
  letterReveal,
  staggerItem,
  editorialLeft,
  editorialRight,
  editorialImage,
  editorialImageAlt,
  lingerReveal,
  storyHeading,
  storyPhotoLeft,
  storyPhotoRight,
  storyNameReveal,
  dressCodeReveal,
  dressCodeCopy,
} as const;

export type RevealVariantName = keyof typeof revealVariantMap;
