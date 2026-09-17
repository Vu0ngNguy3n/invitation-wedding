"use client";

import { motion } from "framer-motion";
import { TimelineGlyph } from "@/components/timeline/timelineIcons";
import {
  fadeReveal,
  timelineMarker,
  timelineText,
  timelineTextGroup,
} from "@/lib/motion";
import type { WeddingTimelineItem } from "@/types/wedding";
import { filledText } from "@/utils/text";

type TimelineItemProps = {
  item: WeddingTimelineItem;
  reduceMotion: boolean;
};

export function TimelineItem({ item, reduceMotion }: TimelineItemProps) {
  const time = filledText(item.time);
  const title = filledText(item.title);
  const description = filledText(item.description);
  const markerVariants = reduceMotion ? fadeReveal : timelineMarker;
  const textGroupVariants = reduceMotion ? fadeReveal : timelineTextGroup;
  const textVariants = reduceMotion ? fadeReveal : timelineText;

  return (
    <>
      <motion.span
        variants={markerVariants}
        className="foil-border relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-ivory text-accent-gold lg:size-14"
      >
        <TimelineGlyph icon={item.icon} className="size-4 lg:size-5" />
      </motion.span>

      <motion.div
        variants={textGroupVariants}
        className="min-w-0 flex-1 pt-1 lg:flex-none lg:pt-0"
      >
        {time ? (
          <motion.p
            variants={textVariants}
            className="type-overline text-accent-gold"
          >
            {time}
          </motion.p>
        ) : null}
        {title ? (
          <motion.h3
            variants={textVariants}
            className="type-heading mt-2 text-pretty break-words lg:text-[1.65rem]"
          >
            {title}
          </motion.h3>
        ) : null}
        {description ? (
          <motion.p
            variants={textVariants}
            className="type-caption mt-2 text-pretty break-words text-muted"
          >
            {description}
          </motion.p>
        ) : null}
      </motion.div>
    </>
  );
}
