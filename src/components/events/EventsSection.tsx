import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { WeddingEventItem } from "@/components/events/WeddingEventItem";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { hasEventContent } from "@/utils/sectionVisibility";

export function EventsSection() {
  const events = weddingData.events.filter(hasEventContent);
  const heading = weddingData.navigation.find((item) => item.id === "events")?.label;

  if (events.length === 0) {
    return null;
  }

  return (
    <SectionContainer id="events" labelledBy={heading ? "events-heading" : undefined}>
      <MotionReveal>
        {heading ? (
          <SectionHeading title={heading} headingId="events-heading" />
        ) : null}

        <div className="mx-auto mt-6 w-28 sm:mt-8 sm:w-36">
          <DecorativeDivider />
        </div>

        <div className="mx-auto mt-10 max-w-xl sm:mt-14">
          <div className="flex flex-col">
            {events.map((event) => (
              <WeddingEventItem key={event.id} event={event} />
            ))}
          </div>
        </div>
      </MotionReveal>
    </SectionContainer>
  );
}
