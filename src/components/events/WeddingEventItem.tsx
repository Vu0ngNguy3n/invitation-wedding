"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { weddingData } from "@/config/weddingData";
import { BotanicalDecoration } from "@/components/decorative/BotanicalDecoration";
import { PaperSurface } from "@/components/ui/PaperSurface";
import { invitationActionClassName } from "@/components/ui/invitationAction";
import {
  eventCardCopy,
  eventCardLeft,
  eventCardRight,
  fadeReveal,
} from "@/lib/motion";
import type { WeddingEvent, WeddingEventType } from "@/types/wedding";
import { formatEventWhen } from "@/utils/datetime";
import { filledText } from "@/utils/text";
import { cn } from "@/utils/cn";

export type EventCardReserve = {
  intro: boolean;
  when: boolean;
  venueLabel: boolean;
  venue: boolean;
  maps: boolean;
};

type WeddingEventItemProps = {
  event: WeddingEvent;
  image?: string;
  entrance: "left" | "right";
  reduceMotion: boolean;
  paired?: boolean;
  reserve?: EventCardReserve;
};

export function collectEventCardReserve(
  events: { event: WeddingEvent; image?: string }[],
): EventCardReserve {
  return {
    intro: events.some(({ event }) => Boolean(filledText(event.intro))),
    when: events.some(
      ({ event }) =>
        Boolean(filledText(event.date)) || Boolean(filledText(event.time)),
    ),
    venueLabel: events.some(({ event }) => Boolean(filledText(event.venueLabel))),
    venue: events.some(({ event }) => Boolean(filledText(event.venue))),
    maps: events.some(({ event }) => Boolean(filledText(event.mapsUrl))),
  };
}

function EventCardSlot({
  show,
  reserveOnDesktop,
  className,
  as: Component = "div",
  children,
}: {
  show: boolean;
  reserveOnDesktop: boolean;
  className?: string;
  as?: "div" | "p";
  children?: ReactNode;
}) {
  if (show) {
    return <Component className={className}>{children}</Component>;
  }

  if (reserveOnDesktop) {
    return (
      <div
        aria-hidden="true"
        className={cn(className, "invisible max-md:hidden")}
      />
    );
  }

  return null;
}

export function WeddingEventItem({
  event,
  image,
  entrance,
  reduceMotion,
  paired = false,
  reserve,
}: WeddingEventItemProps) {
  const copy = weddingData.copy.events;
  const eventTypeLabel: Record<WeddingEventType, string> = {
    bride: copy.typeBride,
    groom: copy.typeGroom,
    ceremony: copy.typeCeremony,
    reception: copy.typeReception,
  };
  const title = filledText(event.title);
  const intro = filledText(event.intro);
  const when = formatEventWhen(
    event.date,
    event.time,
    weddingData.wedding.timezone,
  );
  const venueLabel = filledText(event.venueLabel);
  const venue = filledText(event.venue);
  const address = filledText(event.address);
  const description = filledText(event.description);
  const mapsUrl = filledText(event.mapsUrl);
  const dressCode = filledText(event.dressCode);
  const typeLabel = eventTypeLabel[event.type];
  const imageAlt = title ?? typeLabel;
  const cardVariants = reduceMotion
    ? fadeReveal
    : entrance === "left"
      ? eventCardLeft
      : eventCardRight;
  const copyVariants = reduceMotion ? fadeReveal : eventCardCopy;
  const reserveOnDesktop = paired;
  const hasIdentity = Boolean(title || intro || when);
  const hasDetails = Boolean(
    image ||
      venueLabel ||
      venue ||
      address ||
      description ||
      dressCode ||
      mapsUrl,
  );
  const showIdentity =
    hasIdentity ||
    (reserveOnDesktop &&
      Boolean(reserve?.intro || reserve?.when || title));
  const showDetails =
    hasDetails ||
    (reserveOnDesktop &&
      Boolean(reserve?.venueLabel || reserve?.venue || reserve?.maps));

  return (
    <motion.div className="h-full min-w-0" variants={cardVariants}>
      <PaperSurface
        as="article"
        className="invitation-stack h-full min-w-0 px-5 pt-12 pb-10 sm:px-8 sm:pt-16 sm:pb-12"
      >
        <BotanicalDecoration className="invitation-stack h-full w-full px-1 pt-8 pb-5 sm:px-2 sm:pt-10 sm:pb-7">
          {showIdentity ? (
            <motion.div
              variants={copyVariants}
              className="invitation-stack w-full"
            >
              {title ? (
                <h3 className="type-heading max-w-full text-balance break-words text-ink text-[clamp(1.7rem,0.95rem+1.6vw,2.2rem)]">
                  {title}
                </h3>
              ) : (
                <h3 className="sr-only">{typeLabel}</h3>
              )}

              <EventCardSlot
                as="p"
                show={Boolean(intro)}
                reserveOnDesktop={Boolean(reserveOnDesktop && reserve?.intro)}
                className="type-caption mt-5 min-h-[1lh] w-full max-w-sm text-pretty text-ink-muted"
              >
                {intro}
              </EventCardSlot>

              {when ? (
                <time
                  dateTime={when.dateTime}
                  className={cn(
                    "flex min-h-[calc(2lh+0.375rem)] w-full flex-col items-center justify-center gap-1.5",
                    intro || (reserveOnDesktop && reserve?.intro)
                      ? "mt-2"
                      : "mt-5",
                  )}
                >
                  {when.timeLine ? (
                    <span className="font-display numeral-lining text-xl tracking-wide text-ink sm:text-2xl">
                      {when.timeLine}
                    </span>
                  ) : null}
                  {when.dateLine ? (
                    <span className="type-caption text-ink-muted">
                      {when.dateLine}
                    </span>
                  ) : null}
                </time>
              ) : reserveOnDesktop && reserve?.when ? (
                <div
                  aria-hidden="true"
                  className={cn(
                    "invisible flex min-h-[calc(2lh+0.375rem)] w-full max-md:hidden",
                    reserve.intro ? "mt-2" : "mt-5",
                  )}
                />
              ) : null}
            </motion.div>
          ) : null}

          {showDetails ? (
            <motion.div
              variants={copyVariants}
              className="invitation-stack w-full flex-1"
            >
              <span
                aria-hidden="true"
                className="mt-8 h-px w-12 bg-accent-gold/50"
              />

              {image ? (
                <figure className="foil-border relative mt-6 aspect-[4/5] w-full max-w-[min(100%,180px)] overflow-hidden bg-kraft sm:max-w-[200px]">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 639px) 180px, 200px"
                    className="object-cover object-center"
                  />
                </figure>
              ) : null}

              {venueLabel ||
              venue ||
              (reserveOnDesktop && (reserve?.venueLabel || reserve?.venue)) ? (
                <div className="mt-6 invitation-stack w-full">
                  <EventCardSlot
                    as="p"
                    show={Boolean(venueLabel)}
                    reserveOnDesktop={Boolean(
                      reserveOnDesktop && reserve?.venueLabel,
                    )}
                    className="type-overline min-h-[1lh] text-accent-gold"
                  >
                    {venueLabel}
                  </EventCardSlot>
                  <EventCardSlot
                    as="p"
                    show={Boolean(venue)}
                    reserveOnDesktop={Boolean(
                      reserveOnDesktop && reserve?.venue,
                    )}
                    className={cn(
                      "type-body max-w-full text-pretty break-words text-ink",
                      paired && "md:min-h-[2lh]",
                      (venueLabel ||
                        (reserveOnDesktop && reserve?.venueLabel)) &&
                        "mt-2",
                    )}
                  >
                    {venue}
                  </EventCardSlot>
                </div>
              ) : null}

              {address ? (
                <p className="type-caption mt-2 max-w-sm text-pretty break-words text-ink-muted">
                  {address}
                </p>
              ) : null}

              {description ? (
                <p className="type-body mt-5 max-w-sm text-pretty text-ink-muted">
                  {description}
                </p>
              ) : null}

              {dressCode ? (
                <p className="type-caption mt-5 max-w-xs text-ink-muted">
                  {dressCode}
                </p>
              ) : null}

              <EventCardSlot
                show={Boolean(mapsUrl)}
                reserveOnDesktop={Boolean(reserveOnDesktop && reserve?.maps)}
                className="mt-auto flex min-h-11 items-center justify-center pt-8"
              >
                {mapsUrl ? (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={invitationActionClassName}
                  >
                    <MapPin
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.25}
                    />
                    <span className="type-overline">{copy.mapsLabel}</span>
                    <span className="sr-only">{copy.mapsNewTab}</span>
                  </a>
                ) : null}
              </EventCardSlot>
            </motion.div>
          ) : null}
        </BotanicalDecoration>
      </PaperSurface>
    </motion.div>
  );
}
