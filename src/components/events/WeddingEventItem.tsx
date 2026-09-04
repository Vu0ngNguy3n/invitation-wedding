import Image from "next/image";
import { MapPin } from "lucide-react";
import type { WeddingEvent, WeddingEventType } from "@/types/wedding";
import { existingPublicAsset } from "@/utils/publicAsset";
import { filledText } from "@/utils/text";

const eventTypeLabel: Record<WeddingEventType, string> = {
  bride: "Nhà gái",
  groom: "Nhà trai",
  ceremony: "Lễ cưới",
  reception: "Tiệc cưới",
};

type WeddingEventItemProps = {
  event: WeddingEvent;
};

export function WeddingEventItem({ event }: WeddingEventItemProps) {
  const title = filledText(event.title);
  const date = filledText(event.date);
  const time = filledText(event.time);
  const venue = filledText(event.venue);
  const address = filledText(event.address);
  const description = filledText(event.description);
  const image = existingPublicAsset(event.image);
  const mapsUrl = filledText(event.mapsUrl);
  const dressCode = filledText(event.dressCode);
  const typeLabel = eventTypeLabel[event.type];
  const imageAlt = title ?? typeLabel;

  return (
    <article className="flex min-w-0 flex-col items-center border-t border-accent-gold/20 py-10 text-center first:border-t-0 first:pt-0 sm:py-12">
      {title ? (
        <>
          <p className="type-overline text-accent-gold">{typeLabel}</p>
          <h3 className="type-heading mt-3 max-w-full text-balance break-words text-paper-cream">
            {title}
          </h3>
        </>
      ) : (
        <h3 className="type-overline text-accent-gold">{typeLabel}</h3>
      )}

      {date || time ? (
        <p className="type-caption mt-3 text-muted">
          {[date, time].filter(Boolean).join(" · ")}
        </p>
      ) : null}

      {image ? (
        <figure className="foil-border relative mt-6 aspect-[4/5] w-full max-w-[min(100%,200px)] overflow-hidden bg-surface sm:max-w-[240px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 639px) 200px, 240px"
            className="object-cover object-center"
          />
        </figure>
      ) : null}

      {venue ? (
        <p className="type-body mt-6 max-w-full text-pretty break-words text-paper-cream">{venue}</p>
      ) : null}

      {address ? (
        <p className="type-caption mt-2 max-w-md text-pretty break-words text-muted">{address}</p>
      ) : null}

      {description ? (
        <p className="type-body mt-5 max-w-md text-pretty text-muted">{description}</p>
      ) : null}

      {dressCode ? (
        <p className="type-caption mt-4 text-muted">{dressCode}</p>
      ) : null}

      {mapsUrl ? (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="foil-border mt-6 inline-flex min-h-11 max-w-full items-center justify-center gap-2 px-4 py-2 text-accent-gold transition-opacity hover:opacity-80"
        >
          <MapPin aria-hidden="true" className="size-4" strokeWidth={1.25} />
          <span className="type-overline">Xem bản đồ</span>
          <span className="sr-only"> (mở tab mới)</span>
        </a>
      ) : null}
    </article>
  );
}
