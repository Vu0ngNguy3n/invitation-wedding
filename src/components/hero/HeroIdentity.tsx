"use client";

import { motion, useReducedMotion } from "framer-motion";
import { InvitationMonogram } from "@/components/decorative/InvitationMonogram";
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
      className="flex w-full flex-col items-center"
      variants={heroStaggerContainer}
      initial="hidden"
      animate="shown"
    >
      {brideInitial || groomInitial ? (
        <motion.div variants={fadeScale} transition={transition}>
          <InvitationMonogram
            brideInitial={brideInitial}
            groomInitial={groomInitial}
          />
        </motion.div>
      ) : null}

      {showTitleKicker ? (
        <motion.p
          variants={staggerItem}
          transition={transition}
          className="type-overline mt-6 text-accent-gold sm:mt-7"
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
              ? "mt-5 max-w-full px-1 text-balance break-words text-paper-cream sm:mt-6"
              : "max-w-full px-1 text-balance break-words text-paper-cream"
          }
        >
          {brideName && groomName ? (
            <>
              <span className="type-display block">{brideName}</span>
              <span
                aria-hidden="true"
                className="type-script mt-1 mb-1 block text-accent-gold"
              >
                &
              </span>
              <span className="type-display block">{groomName}</span>
            </>
          ) : (
            <span className="type-display block">{heading}</span>
          )}
        </motion.h1>
      ) : (
        <h1 id="home-heading" className="sr-only">
          {documentTitle}
        </h1>
      )}

      {phrase ? (
        <motion.p
          variants={staggerItem}
          transition={transition}
          className="type-script mt-5 max-w-md px-1 text-pretty break-words text-paper-cream sm:mt-6"
        >
          {phrase}
        </motion.p>
      ) : null}

      {displayedDate ? (
        dateTime ? (
          <motion.time
            dateTime={dateTime}
            variants={staggerItem}
            transition={transition}
            className="type-overline mt-6 text-accent-gold sm:mt-7"
          >
            {displayedDate}
          </motion.time>
        ) : (
          <motion.p
            variants={staggerItem}
            transition={transition}
            className="type-overline mt-6 text-accent-gold sm:mt-7"
          >
            {displayedDate}
          </motion.p>
        )
      ) : null}
    </motion.div>
  );
}
