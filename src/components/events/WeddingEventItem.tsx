import Image from "next/image";
import { MapPin } from "lucide-react";
import { weddingData } from "@/config/weddingData";
import { BotanicalDecoration } from "@/components/decorative/BotanicalDecoration";
import { PaperSurface } from "@/components/ui/PaperSurface";
import { invitationActionClassName } from "@/components/ui/invitationAction";
import type { WeddingEvent, WeddingEventType } from "@/types/wedding";
import { existingPublicAsset } from "@/utils/publicAsset";
import { formatEventWhen } from "@/utils/datetime";
import { filledText } from "@/utils/text";
import { cn } from "@/utils/cn";

type WeddingEventItemProps = {
  event: WeddingEvent;
};

export function WeddingEventItem({ event }: WeddingEventItemProps) {
  const copy = weddingData.copy.events;
  const eventTypeLabel: Record<WeddingEventType, string> = {
    bride: copy.typeBride,
    groom: copy.typeGroom,
    ceremony: copy.typeCeremony,
    reception: copy.typeReception,
  };
  const title = filledText(event.title);
  const when = formatEventWhen(
    event.date,
    event.time,
    weddingData.wedding.timezone,
  );
  const venue = filledText(event.venue);
  const address = filledText(event.address);
  const description = filledText(event.description);
  const image = existingPublicAsset(event.image);
  const mapsUrl = filledText(event.mapsUrl);
  const dressCode = filledText(event.dressCode);
  const typeLabel = eventTypeLabel[event.type];
  const imageAlt = title ?? typeLabel;

  return (
    <PaperSurface
      as="article"
      className="flex h-full min-w-0 flex-col items-center px-5 py-9 text-center sm:px-8 sm:py-11"
    >
      <BotanicalDecoration className="flex w-full flex-col items-center px-1 py-2">
        {title ? (
          <>
            <p className="type-overline text-accent-gold">{typeLabel}</p>
            <h3 className="type-heading mt-3 max-w-full text-balance break-words text-ink">
              {title}
            </h3>
          </>
        ) : (
          <h3 className="type-overline text-accent-gold">{typeLabel}</h3>
        )}

        {when ? (
          <time
            dateTime={when.dateTime}
            className="mt-5 flex flex-col items-center gap-1"
          >
            {when.timeLine ? (
              <span className="font-display text-xl tracking-wide text-ink sm:text-2xl">
                {when.timeLine}
              </span>
            ) : null}
            {when.dateLine ? (
              <span className="type-caption text-ink-muted">{when.dateLine}</span>
            ) : null}
          </time>
        ) : null}

        <span
          aria-hidden="true"
          className="mt-6 h-px w-12 bg-accent-gold/50"
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

        {venue ? (
          <p className="type-body mt-6 max-w-full text-pretty break-words text-ink">
            {venue}
          </p>
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
          <p className="type-caption mt-4 text-ink-muted">{dressCode}</p>
        ) : null}

        {mapsUrl ? (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(invitationActionClassName, "mt-7")}
          >
            <MapPin aria-hidden="true" className="size-4" strokeWidth={1.25} />
            <span className="type-overline">{copy.mapsLabel}</span>
            <span className="sr-only">{copy.mapsNewTab}</span>
          </a>
        ) : null}
      </BotanicalDecoration>
    </PaperSurface>
  );
}
