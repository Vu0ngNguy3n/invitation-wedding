"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { invitationMotion, invitationTransition } from "@/utils/motion";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "view" | "enter";
};

const hidden = { opacity: 0, y: invitationMotion.y };
const shown = { opacity: 1, y: 0 };

export function MotionReveal({
  children,
  className,
  delay = 0,
  mode = "view",
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const transition = invitationTransition(prefersReducedMotion, {
    delay,
    duration:
      mode === "enter"
        ? invitationMotion.enterDuration
        : invitationMotion.duration,
  });
  const from = reduceMotion ? shown : hidden;

  if (mode === "enter") {
    return (
      <motion.div
        className={cn(className)}
        initial={from}
        animate={shown}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={from}
      whileInView={shown}
      viewport={{ once: true, amount: 0.14, margin: "0px 0px -8% 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
