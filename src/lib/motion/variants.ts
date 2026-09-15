import type { Variants } from "framer-motion";
import { invitationMotion } from "@/lib/motion/transitions";

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

export const heroStaggerContainer: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: invitationMotion.heroStagger,
      delayChildren: 0.08,
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
} as const;

export type RevealVariantName = keyof typeof revealVariantMap;
