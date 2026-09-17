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
  children: ReactNode;
};

export function GalleryReveal({
  heading,
  headingId = "gallery-heading",
  children,
}: GalleryRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const containerVariants = reduceMotion ? reducedStagger : albumContainer;
  const headingVariants = reduceMotion ? fadeReveal : albumHeading;
  const dividerVariants = reduceMotion ? fadeReveal : albumDivider;

  return (
    <motion.div
      className="flex w-full min-w-0 flex-col [--album-image-y:12px] [--album-thumb-y:7px] md:[--album-image-y:22px] md:[--album-thumb-y:9px]"
      variants={containerVariants}
      initial="hidden"
      whileInView="shown"
      viewport={albumViewport}
    >
      {heading ? (
        <motion.div variants={headingVariants}>
          <SectionHeading title={heading} headingId={headingId} />
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
