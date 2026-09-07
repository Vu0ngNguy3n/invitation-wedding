import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { WeddingEventItem } from "@/components/events/WeddingEventItem";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { invitationMotion } from "@/lib/motion";
import { hasEventContent } from "@/utils/sectionVisibility";

export function EventsSection() {
  const events = weddingData.events.filter(hasEventContent);
  const heading = weddingData.navigation.find(
    (item) => item.id === "events",
  )?.label;

  if (events.length === 0) {
    return null;
  }

  return (
    <SectionContainer
      id="events"
      tone="forest"
      labelledBy={heading ? "events-heading" : undefined}
    >
      <MotionReveal variant="fadeReveal">
        {heading ? (
          <SectionHeading title={heading} headingId="events-heading" />
        ) : null}

        <div className="mx-auto mt-6 w-24 sm:mt-8 sm:w-32">
          <DecorativeDivider />
        </div>
      </MotionReveal>

      <div
        className={
          events.length === 1
            ? "mx-auto mt-10 max-w-md sm:mt-14"
            : "mx-auto mt-10 grid max-w-4xl gap-6 sm:mt-14 md:grid-cols-2 md:gap-8"
        }
      >
        {events.map((event, index) => (
          <MotionReveal
            key={event.id}
            variant="softReveal"
            delay={invitationMotion.stagger * index}
          >
            <WeddingEventItem event={event} />
          </MotionReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
