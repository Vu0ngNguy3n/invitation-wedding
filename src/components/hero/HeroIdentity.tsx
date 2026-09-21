"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BotanicalMark } from "@/components/decorative/BotanicalMark";
import { InvitationNames } from "@/components/decorative/InvitationNames";

const heroEase = [0.22, 1, 0.36, 1] as const;

const heroStagger: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: heroEase },
  },
};

const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.01 } },
};

type HeroIdentityProps = {
  kicker?: string;
  heading?: string;
  brideName?: string;
  groomName?: string;
  displayedDate?: string;
  dateTime?: string;
  documentTitle: string;
};

const dateClassName =
  "type-overline mt-5 block w-full text-center text-[0.7rem] tracking-[0.3em] text-paper-cream/88 sm:mt-6 sm:text-[0.78rem] lg:text-[0.82rem]";

export function HeroIdentity({
  kicker,
  heading,
  brideName,
  groomName,
  displayedDate,
  dateTime,
  documentTitle,
}: HeroIdentityProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const item = reduceMotion ? reducedReveal : textReveal;

  return (
    <motion.div
      className="invitation-stack max-w-xl [text-shadow:0_1px_16px_rgb(12_28_23/0.45)]"
      variants={reduceMotion ? reducedReveal : heroStagger}
      initial="hidden"
      animate="shown"
    >
      {kicker ? (
        <motion.p
          variants={item}
          className="font-display block self-center text-center text-[clamp(1.05rem,4.9vw,1.5rem)] leading-[1.45] font-normal tracking-[0.15em] whitespace-pre-line text-paper-cream uppercase [margin-inline-end:-0.15em] sm:text-[1.55rem] sm:tracking-[0.17em] lg:text-[1.7rem]"
        >
          {kicker}
        </motion.p>
      ) : null}

      {heading ? (
        <motion.h1
          id="home-heading"
          variants={item}
          className="mt-6 w-full max-w-full text-balance break-words sm:mt-7"
        >
          {brideName && groomName ? (
            <InvitationNames
              brideName={brideName}
              groomName={groomName}
              size="hero"
              separator={
                <span
                  aria-hidden="true"
                  className="my-1.5 block w-full max-w-[9rem] text-paper-cream/55 sm:my-2 sm:max-w-[11rem]"
                >
                  <BotanicalMark
                    asset="divider"
                    className="h-6 w-full sm:h-7"
                  />
                </span>
              }
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
            className={dateClassName}
          >
            {displayedDate}
          </motion.time>
        ) : (
          <motion.p variants={item} className={dateClassName}>
            {displayedDate}
          </motion.p>
        )
      ) : null}
    </motion.div>
  );
}
