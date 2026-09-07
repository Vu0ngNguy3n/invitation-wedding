"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  invitationMotion,
  invitationTransition,
  invitationViewport,
  revealVariantMap,
  type RevealVariantName,
} from "@/lib/motion";
import { cn } from "@/utils/cn";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "view" | "enter";
  variant?: RevealVariantName;
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  mode = "view",
  variant = "softReveal",
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = revealVariantMap[variant];
  const duration =
    mode === "enter"
      ? invitationMotion.heroDuration
      : variant === "imageReveal"
        ? invitationMotion.imageDuration
        : variant === "fadeReveal"
          ? 0.7
          : variant === "fadeScale"
            ? 0.85
            : invitationMotion.duration;
  const transition = invitationTransition(prefersReducedMotion, {
    delay,
    duration,
  });

  if (mode === "enter") {
    return (
      <motion.div
        className={cn(className)}
        variants={variants}
        initial="hidden"
        animate="shown"
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={invitationViewport}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
