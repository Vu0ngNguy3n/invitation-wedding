import { TimelineGlyph } from "@/components/timeline/timelineIcons";
import type { WeddingTimelineItem } from "@/types/wedding";
import { filledText } from "@/utils/text";

type TimelineItemProps = {
  item: WeddingTimelineItem;
};

export function TimelineItem({ item }: TimelineItemProps) {
  const time = filledText(item.time);
  const title = filledText(item.title);
  const description = filledText(item.description);

  return (
    <>
      <span className="foil-border relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-vintage-green text-accent-gold lg:size-14">
        <TimelineGlyph icon={item.icon} className="size-4 lg:size-5" />
      </span>

      <div className="min-w-0 flex-1 pt-1 lg:flex-none lg:pt-0">
        {time ? (
          <p className="type-overline text-accent-gold">{time}</p>
        ) : null}
        {title ? (
          <h3 className="type-body mt-1 text-pretty break-words text-paper-cream">
            {title}
          </h3>
        ) : null}
        {description ? (
          <p className="type-caption mt-1.5 text-pretty break-words text-sage-light/90">
            {description}
          </p>
        ) : null}
      </div>
    </>
  );
}
