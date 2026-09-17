import { weddingData } from "@/config/weddingData";
import { EventsReveal } from "@/components/events/EventsReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { existingPublicAsset } from "@/utils/publicAsset";
import { hasEventContent } from "@/utils/sectionVisibility";

export function EventsSection() {
  const events = weddingData.events.filter(hasEventContent).map((event) => ({
    event,
    image: existingPublicAsset(event.image),
  }));
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
      edgeTop="paper"
      edgeBottom="mist"
    >
      <EventsReveal heading={heading} events={events} />
    </SectionContainer>
  );
}
