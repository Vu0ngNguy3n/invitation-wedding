"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { WeddingTimelineItem } from "@/types/wedding";
import { TimelineItem } from "@/components/timeline/TimelineItem";
import { invitationMotion, invitationTransition } from "@/utils/motion";

type TimelineListProps = {
  items: WeddingTimelineItem[];
};

export function TimelineList({ items }: TimelineListProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const lineTransition = invitationTransition(prefersReducedMotion, {
    duration: invitationMotion.duration,
  });
  const itemHidden = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: invitationMotion.y };
  const itemShown = { opacity: 1, y: 0 };

  return (
    <div className="relative mt-12 sm:mt-14 lg:mt-16">
      <motion.span
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-[1.375rem] w-px origin-top bg-accent-gold/40 lg:hidden"
        initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={lineTransition}
      />
      <motion.span
        aria-hidden="true"
        className="absolute top-7 right-[6%] left-[6%] hidden h-px origin-left bg-accent-gold/40 lg:block"
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={lineTransition}
      />

      <ol className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-6 xl:gap-8">
        {items.map((item, index) => (
          <motion.li
            key={item.id}
            className="relative flex min-w-0 gap-5 lg:flex-1 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
            initial={itemHidden}
            whileInView={itemShown}
            viewport={{ once: true, amount: 0.24 }}
            transition={invitationTransition(prefersReducedMotion, {
              delay: reduceMotion ? 0 : invitationMotion.stagger * index,
            })}
          >
            <TimelineItem item={item} />
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
