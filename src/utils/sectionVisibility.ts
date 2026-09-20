import { weddingData } from "@/config/weddingData";
import type { WeddingEvent, WeddingTimelineItem } from "@/types/wedding";
import { existingPublicAsset } from "@/utils/publicAsset";
import { filledText } from "@/utils/text";

function hasSaveTheDateContent(): boolean {
  const { wedding, copy } = weddingData;

  return Boolean(
    filledText(copy.saveTheDate.title) ||
      filledText(copy.saveTheDate.description) ||
      filledText(wedding.date.display) ||
      filledText(wedding.date.iso) ||
      filledText(wedding.date.day) ||
      filledText(wedding.date.month) ||
      filledText(wedding.date.year),
  );
}

function hasEventContent(event: WeddingEvent): boolean {
  return Boolean(
    filledText(event.title) ||
      filledText(event.date) ||
      filledText(event.time) ||
      filledText(event.intro) ||
      filledText(event.venueLabel) ||
      filledText(event.venue) ||
      filledText(event.address) ||
      filledText(event.description) ||
      filledText(event.image) ||
      filledText(event.mapsUrl) ||
      filledText(event.dressCode),
  );
}

function hasTimelineItemContent(item: WeddingTimelineItem): boolean {
  return Boolean(filledText(item.time) || filledText(item.title));
}

export function isInvitationAnchorAvailable(id: string): boolean {
  switch (id) {
    case "home":
    case "story":
    case "guestbook":
    case "rsvp":
      return true;
    case "save-the-date":
      return hasSaveTheDateContent();
    case "events":
      return weddingData.events.some(hasEventContent);
    case "timeline":
      return weddingData.timeline.items.some(hasTimelineItemContent);
    case "gallery":
      return weddingData.gallery.some((image) =>
        Boolean(existingPublicAsset(image.src)),
      );
    default:
      return false;
  }
}

export { hasEventContent };
