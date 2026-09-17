import Image from "next/image";
import { weddingData } from "@/config/weddingData";
import { TimelineList } from "@/components/timeline/TimelineList";
import { SectionContainer } from "@/components/ui/SectionContainer";
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
      <TimelineList
        items={items}
        title={title}
        subtitle={subtitle}
        headingId={title ? "timeline-heading" : undefined}
      />
    </SectionContainer>
  );
}
