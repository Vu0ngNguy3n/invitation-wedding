import {
  Camera,
  Church,
  Heart,
  Music,
  PartyPopper,
  UtensilsCrossed,
} from "lucide-react";
import type { WeddingTimelineIcon } from "@/types/wedding";

type TimelineGlyphProps = {
  icon: WeddingTimelineIcon;
  className?: string;
};

export function TimelineGlyph({ icon, className }: TimelineGlyphProps) {
  switch (icon) {
    case "church":
      return (
        <Church
          aria-hidden="true"
          className={className}
          strokeWidth={1.25}
        />
      );
    case "camera":
      return (
        <Camera
          aria-hidden="true"
          className={className}
          strokeWidth={1.25}
        />
      );
    case "utensils":
      return (
        <UtensilsCrossed
          aria-hidden="true"
          className={className}
          strokeWidth={1.25}
        />
      );
    case "party":
      return (
        <PartyPopper
          aria-hidden="true"
          className={className}
          strokeWidth={1.25}
        />
      );
    case "music":
      return (
        <Music aria-hidden="true" className={className} strokeWidth={1.25} />
      );
    case "heart":
    case "rings":
      return (
        <Heart aria-hidden="true" className={className} strokeWidth={1.25} />
      );
    default:
      return (
        <Heart aria-hidden="true" className={className} strokeWidth={1.25} />
      );
  }
}
