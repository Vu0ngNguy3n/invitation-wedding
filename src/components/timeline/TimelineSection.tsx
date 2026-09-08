import Image from "next/image";
import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { TimelineList } from "@/components/timeline/TimelineList";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { existingPublicAsset } from "@/utils/publicAsset";
import { filledText } from "@/utils/text";

export function TimelineSection() {
  const { timeline } = weddingData;
  const items = timeline.items.filter(
    (item) => Boolean(filledText(item.time)) || Boolean(filledText(item.title)),
  );
  const navLabel = weddingData.navigation.find(
    (item) => item.id === "timeline",
  )?.label;
  const title = filledText(timeline.title) ?? navLabel;
  const subtitle = filledText(timeline.subtitle);
  const backgroundImage = existingPublicAsset(timeline.backgroundImage);
  const backgroundAlt = filledText(timeline.backgroundAlt) ?? "";

  if (items.length === 0) {
    return null;
  }

  return (
    <SectionContainer
      id="timeline"
      tone="mist"
      labelledBy={title ? "timeline-heading" : undefined}
      className="overflow-hidden"
      backdrop={
        backgroundImage ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.14]">
            <Image
              src={backgroundImage}
              alt={backgroundAlt}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ) : undefined
      }
    >
      <MotionReveal variant="fadeReveal">
        {title ? (
          <SectionHeading
            title={title}
            description={subtitle}
            headingId="timeline-heading"
          />
        ) : null}

        {title ? (
          <div className="mx-auto mt-6 max-w-xs sm:mt-8">
            <DecorativeDivider />
          </div>
        ) : null}
      </MotionReveal>

      <TimelineList items={items} />
    </SectionContainer>
  );
}
