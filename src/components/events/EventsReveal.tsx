"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { WeddingEventItem } from "@/components/events/WeddingEventItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  eventCardGroup,
  eventHeading,
  eventSection,
  fadeReveal,
  invitationViewportMid,
  reducedStagger,
} from "@/lib/motion";
import type { WeddingEvent } from "@/types/wedding";

type EventsRevealProps = {
  heading?: string;
  events: {
    event: WeddingEvent;
    image?: string;
  }[];
};

export function EventsReveal({ heading, events }: EventsRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const sectionVariants = reduceMotion ? reducedStagger : eventSection;
  const headingVariants = reduceMotion ? fadeReveal : eventHeading;
  const cardGroupVariants = reduceMotion ? reducedStagger : eventCardGroup;

  return (
    <motion.div
      className="[--event-card-x:0px] [--event-card-y:20px] md:[--event-card-x:60px] md:[--event-card-y:16px]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="shown"
      viewport={invitationViewportMid}
    >
      <motion.div variants={headingVariants}>
        {heading ? (
          <SectionHeading title={heading} headingId="events-heading" />
        ) : null}

        <div className="mx-auto mt-6 max-w-xs sm:mt-8">
          <DecorativeDivider />
        </div>
      </motion.div>

      <motion.div
        className={
          events.length === 1
            ? "mx-auto mt-12 max-w-md sm:mt-16"
            : "mx-auto mt-12 grid max-w-4xl gap-8 sm:mt-16 md:grid-cols-2 md:gap-10"
        }
        variants={cardGroupVariants}
      >
        {events.map(({ event, image }, index) => (
          <WeddingEventItem
            key={event.id}
            event={event}
            image={image}
            entrance={index % 2 === 0 ? "left" : "right"}
            reduceMotion={reduceMotion}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
