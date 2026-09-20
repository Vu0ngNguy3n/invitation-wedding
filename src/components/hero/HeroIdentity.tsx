"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { InvitationMonogram } from "@/components/decorative/InvitationMonogram";
import { InvitationNames } from "@/components/decorative/InvitationNames";

const heroEase = [0.22, 1, 0.36, 1] as const;

const heroStagger: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const crestReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  shown: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: heroEase },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: heroEase },
  },
};

const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.01 } },
};

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
  const reduceMotion = prefersReducedMotion === true;
  const item = reduceMotion ? reducedReveal : textReveal;
  const crest = reduceMotion ? reducedReveal : crestReveal;

  return (
    <motion.div
      className="invitation-stack"
      variants={reduceMotion ? reducedReveal : heroStagger}
      initial="hidden"
      animate="shown"
    >
      {brideInitial || groomInitial ? (
        <motion.div variants={crest}>
          <InvitationMonogram
            brideInitial={brideInitial}
            groomInitial={groomInitial}
            framed
            className="size-[6.6rem] sm:size-[8.8rem]"
          />
        </motion.div>
      ) : null}

      {showTitleKicker ? (
        <motion.p
          variants={item}
          className="mt-4 block w-full text-center text-[0.5625rem] font-medium tracking-[0.22em] text-accent-gold/90 uppercase sm:mt-5 sm:text-[0.6875rem] sm:tracking-[0.24em]"
        >
          {title}
        </motion.p>
      ) : null}

      {heading ? (
        <motion.h1
          id="home-heading"
          variants={item}
          className={
            showTitleKicker || brideInitial || groomInitial
              ? "mt-3 w-full max-w-full text-balance break-words sm:mt-4"
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
            variants={item}
            className="type-overline mt-3.5 block w-full text-center text-accent-gold/88 sm:mt-4"
          >
            {displayedDate}
          </motion.time>
        ) : (
          <motion.p
            variants={item}
            className="type-overline mt-3.5 block w-full text-center text-accent-gold/88 sm:mt-4"
          >
            {displayedDate}
          </motion.p>
        )
      ) : null}

      {phrase ? (
        <motion.p
          variants={item}
          className="font-display mt-3 max-w-md px-1 text-center text-[1.0625rem] font-normal leading-[1.7] text-pretty break-words text-paper-cream/88 italic sm:mt-3.5 sm:text-[1.125rem]"
        >
          {phrase}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
