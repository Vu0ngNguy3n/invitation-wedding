"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import {
  collectEventCardReserve,
  WeddingEventItem,
} from "@/components/events/WeddingEventItem";
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
  const paired = events.length > 1;
  const reserve = collectEventCardReserve(events);

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
          <h2 id="events-heading" className="sr-only">
            {heading}
          </h2>
        ) : null}

        <DecorativeDivider />
      </motion.div>

      <motion.div
        className={
          events.length === 1
            ? "mx-auto mt-10 max-w-md sm:mt-12"
            : "mx-auto mt-10 grid max-w-4xl gap-8 sm:mt-12 md:grid-cols-2 md:gap-10"
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
            paired={paired}
            reserve={reserve}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
