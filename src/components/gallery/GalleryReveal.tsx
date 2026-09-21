"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  albumContainer,
  albumDivider,
  albumHeading,
  albumViewport,
  fadeReveal,
  reducedStagger,
} from "@/lib/motion";

type GalleryRevealProps = {
  heading?: string;
  headingId?: string;
  description?: string;
  children: ReactNode;
};

function descriptionParagraphs(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

export function GalleryReveal({
  heading,
  headingId = "gallery-heading",
  description,
  children,
}: GalleryRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const containerVariants = reduceMotion ? reducedStagger : albumContainer;
  const headingVariants = reduceMotion ? fadeReveal : albumHeading;
  const dividerVariants = reduceMotion ? fadeReveal : albumDivider;
  const paragraphs = descriptionParagraphs(description);

  return (
    <motion.div
      className="flex w-full min-w-0 flex-col [--album-image-y:12px] [--album-thumb-y:7px] md:[--album-image-y:22px] md:[--album-thumb-y:9px]"
      variants={containerVariants}
      initial="hidden"
      whileInView="shown"
      viewport={albumViewport}
    >
      {heading ? (
        <motion.div variants={headingVariants} className="invitation-stack">
          <SectionHeading title={heading} headingId={headingId} />

          {paragraphs.length > 0 ? (
            <div className="mt-5 flex w-full max-w-[38rem] flex-col gap-3 px-3 sm:mt-6">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="type-body text-center text-pretty text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </motion.div>
      ) : null}

      <motion.div
        variants={dividerVariants}
        className="mx-auto mt-6 max-w-xs sm:mt-8"
      >
        <DecorativeDivider />
      </motion.div>

      {children}
    </motion.div>
  );
}
