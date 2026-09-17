"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { WeddingTimelineItem } from "@/types/wedding";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { TimelineItem } from "@/components/timeline/TimelineItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  fadeReveal,
  invitationViewportMid,
  reducedStagger,
  timelineContainer,
  timelineHeading,
  timelineItem,
  timelineItemGroup,
  timelineLineX,
  timelineLineY,
} from "@/lib/motion";

type TimelineListProps = {
  items: WeddingTimelineItem[];
  title?: string;
  subtitle?: string;
  headingId?: string;
};

export function TimelineList({
  items,
  title,
  subtitle,
  headingId,
}: TimelineListProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const containerVariants = reduceMotion ? reducedStagger : timelineContainer;
  const headingVariants = reduceMotion ? fadeReveal : timelineHeading;
  const structureVariants = reduceMotion ? reducedStagger : timelineContainer;
  const lineGroupVariants = reducedStagger;
  const lineXVariants = reduceMotion ? fadeReveal : timelineLineX;
  const lineYVariants = reduceMotion ? fadeReveal : timelineLineY;
  const itemGroupVariants = reduceMotion ? reducedStagger : timelineItemGroup;
  const itemVariants = reduceMotion ? fadeReveal : timelineItem;

  return (
    <motion.div
      className="[--timeline-item-y:16px] lg:[--timeline-item-y:22px]"
      variants={containerVariants}
      initial="hidden"
      whileInView="shown"
      viewport={invitationViewportMid}
    >
      {title ? (
        <motion.div variants={headingVariants}>
          <SectionHeading
            title={title}
            description={subtitle}
            headingId={headingId}
          />
          <div className="mx-auto mt-6 max-w-xs sm:mt-8">
            <DecorativeDivider />
          </div>
        </motion.div>
      ) : null}

      <motion.div
        className="relative mt-14 sm:mt-16 lg:mt-20"
        variants={structureVariants}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          variants={lineGroupVariants}
        >
          <motion.span
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-[1.375rem] w-px origin-top bg-accent-gold/40 lg:hidden"
            variants={lineYVariants}
          />
          <motion.span
            aria-hidden="true"
            className="absolute top-7 right-[6%] left-[6%] hidden h-px origin-left bg-accent-gold/40 lg:block"
            variants={lineXVariants}
          />
        </motion.div>

        <motion.ol
          className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-6 xl:gap-8"
          variants={itemGroupVariants}
        >
          {items.map((item) => (
            <motion.li
              key={item.id}
              className="relative flex min-w-0 gap-5 lg:flex-1 lg:flex-col lg:items-center lg:gap-5 lg:text-center"
              variants={itemVariants}
            >
              <TimelineItem item={item} reduceMotion={reduceMotion} />
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </motion.div>
  );
}
