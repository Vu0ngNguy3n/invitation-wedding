"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { WeddingTimelineItem } from "@/types/wedding";
import { TimelineItem } from "@/components/timeline/TimelineItem";
import {
  invitationMotion,
  invitationTransition,
  invitationViewportTight,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

type TimelineListProps = {
  items: WeddingTimelineItem[];
};

export function TimelineList({ items }: TimelineListProps) {
  const prefersReducedMotion = useReducedMotion();
  const lineTransition = invitationTransition(prefersReducedMotion, {
    duration: invitationMotion.duration,
  });
  const itemTransition = invitationTransition(prefersReducedMotion);

  return (
    <div className="relative mt-14 sm:mt-16 lg:mt-20">
      <motion.span
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-[1.375rem] w-px origin-top bg-accent-gold/40 lg:hidden"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={lineTransition}
      />
      <motion.span
        aria-hidden="true"
        className="absolute top-7 right-[6%] left-[6%] hidden h-px origin-left bg-accent-gold/40 lg:block"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={lineTransition}
      />

      <motion.ol
        className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-6 xl:gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="shown"
        viewport={invitationViewportTight}
      >
        {items.map((item) => (
          <motion.li
            key={item.id}
            className="relative flex min-w-0 gap-5 lg:flex-1 lg:flex-col lg:items-center lg:gap-5 lg:text-center"
            variants={staggerItem}
            transition={itemTransition}
          >
            <TimelineItem item={item} />
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
