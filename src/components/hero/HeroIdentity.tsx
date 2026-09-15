"use client";

import { motion, useReducedMotion } from "framer-motion";
import { InvitationMonogram } from "@/components/decorative/InvitationMonogram";
import { InvitationNames } from "@/components/decorative/InvitationNames";
import {
  fadeScale,
  heroStaggerContainer,
  invitationMotion,
  invitationTransition,
  staggerItem,
} from "@/lib/motion";

type HeroIdentityProps = {
  title?: string;
  heading?: string;
  brideName?: string;
  groomName?: string;
  brideInitial?: string;
  groomInitial?: string;
  phrase?: string;
  displayedDate?: string;
  dateTime?: string;
  showTitleKicker: boolean;
  documentTitle: string;
};

export function HeroIdentity({
  title,
  heading,
  brideName,
  groomName,
  brideInitial,
  groomInitial,
  phrase,
  displayedDate,
  dateTime,
  showTitleKicker,
  documentTitle,
}: HeroIdentityProps) {
  const prefersReducedMotion = useReducedMotion();
  const transition = invitationTransition(prefersReducedMotion, {
    duration: invitationMotion.heroDuration,
  });

  return (
    <motion.div
      className="invitation-stack"
      variants={heroStaggerContainer}
      initial="hidden"
      animate="shown"
    >
      {brideInitial || groomInitial ? (
        <motion.div variants={fadeScale} transition={transition}>
          <InvitationMonogram
            brideInitial={brideInitial}
            groomInitial={groomInitial}
            framed
          />
        </motion.div>
      ) : null}

      {showTitleKicker ? (
        <motion.p
          variants={staggerItem}
          transition={transition}
          className="type-overline mt-6 block w-full text-center text-accent-gold sm:mt-7"
        >
          {title}
        </motion.p>
      ) : null}

      {heading ? (
        <motion.h1
          id="home-heading"
          variants={staggerItem}
          transition={transition}
          className={
            showTitleKicker || brideInitial || groomInitial
              ? "mt-6 w-full max-w-full text-balance break-words sm:mt-8"
              : "w-full max-w-full text-balance break-words"
          }
        >
          {brideName && groomName ? (
            <InvitationNames
              brideName={brideName}
              groomName={groomName}
              size="hero"
            />
          ) : (
            <span className="type-hero-name block px-1 text-paper-cream">
              {heading}
            </span>
          )}
        </motion.h1>
      ) : (
        <h1 id="home-heading" className="sr-only">
          {documentTitle}
        </h1>
      )}

      {displayedDate ? (
        dateTime ? (
          <motion.time
            dateTime={dateTime}
            variants={staggerItem}
            transition={transition}
            className="type-overline mt-6 block w-full text-center text-accent-gold sm:mt-8"
          >
            {displayedDate}
          </motion.time>
        ) : (
          <motion.p
            variants={staggerItem}
            transition={transition}
            className="type-overline mt-6 block w-full text-center text-accent-gold sm:mt-8"
          >
            {displayedDate}
          </motion.p>
        )
      ) : null}

      {phrase ? (
        <motion.p
          variants={staggerItem}
          transition={transition}
          className="type-body mt-5 max-w-md px-1 text-center text-pretty break-words text-paper-cream/90 sm:mt-6"
        >
          {phrase}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
