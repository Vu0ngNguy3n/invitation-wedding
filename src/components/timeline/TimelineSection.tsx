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
      labelledBy={title ? "timeline-heading" : undefined}
      className="overflow-hidden py-0"
      containerClassName="max-w-none"
    >
      <div className="relative px-0 py-14 sm:py-20 lg:py-24">
        {backgroundImage ? (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={backgroundImage}
                alt={backgroundAlt}
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-vintage-green/82"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-vintage-green/55 via-transparent to-vintage-green/70"
            />
          </>
        ) : null}

        <div className="relative mx-auto w-full min-w-0 max-w-6xl">
          <MotionReveal>
            {title ? (
              <SectionHeading
                title={title}
                description={subtitle}
                headingId="timeline-heading"
              />
            ) : null}

            {title ? (
              <div className="mx-auto mt-6 w-28 sm:mt-8 sm:w-36">
                <DecorativeDivider />
              </div>
            ) : null}
          </MotionReveal>

          <TimelineList items={items} />
        </div>
      </div>
    </SectionContainer>
  );
}
