"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  heroStaggerContainer,
  invitationMotion,
  invitationTransition,
  invitationViewport,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/utils/cn";

type MotionStaggerProps = {
  children: ReactNode;
  className?: string;
  mode?: "view" | "enter";
  personality?: "section" | "hero";
};

export function MotionStagger({
  children,
  className,
  mode = "view",
  personality = "section",
}: MotionStaggerProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants =
    personality === "hero" ? heroStaggerContainer : staggerContainer;
  const transition = invitationTransition(prefersReducedMotion, {
    duration:
      personality === "hero"
        ? invitationMotion.heroDuration
        : invitationMotion.duration,
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
