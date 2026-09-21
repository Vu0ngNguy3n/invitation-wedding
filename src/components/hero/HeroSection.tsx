import { ChevronDown } from "lucide-react";
import { weddingData } from "@/config/weddingData";
import { HeroIdentity } from "@/components/hero/HeroIdentity";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { invitationDocumentTitle } from "@/utils/seo";
import { filledText } from "@/utils/text";

function coupleHeading(brideName?: string, groomName?: string, title?: string) {
  if (brideName && groomName) {
    return `${brideName} & ${groomName}`;
  }

  return brideName ?? groomName ?? title;
}

function dateLabel(display: string, day: string, month: string, year: string) {
  const explicit = filledText(display);
  if (explicit) {
    return explicit;
  }

  const parts = [day, month, year]
    .map(filledText)
    .filter((part) => part !== undefined);
  return parts.length > 0 ? parts.join(" · ") : undefined;
}

export function HeroSection() {
  const { couple, wedding, copy } = weddingData;
  const brideName = filledText(couple.bride.name);
  const groomName = filledText(couple.groom.name);
  const title = filledText(wedding.title);
  const kicker = filledText(copy.hero.kicker);
  const heading = coupleHeading(brideName, groomName, title);
  const displayedDate = dateLabel(
    wedding.date.display,
    wedding.date.day,
    wedding.date.month,
    wedding.date.year,
  );
  const dateTime = filledText(wedding.date.iso);
  const documentTitle = invitationDocumentTitle(weddingData);
  const storyLabel = weddingData.navigation.find(
    (item) => item.id === "story",
  )?.label;

  return (
    <div className="relative z-10 flex w-full flex-1 flex-col items-center px-8 pt-[5svh] pb-9 sm:px-12 sm:pt-[6svh] sm:pb-10 lg:px-16 lg:pt-[6svh] lg:pb-12">
      <HeroIdentity
        kicker={kicker}
        heading={heading}
        brideName={brideName}
        groomName={groomName}
        displayedDate={displayedDate}
        dateTime={dateTime}
        documentTitle={documentTitle}
      />

      <MotionReveal
        mode="enter"
        variant="fadeReveal"
        className="mt-auto pt-10"
        delay={0.52}
        duration={0.7}
      >
        <a
          href="#story"
          className="inline-flex min-h-11 flex-col items-center justify-center text-paper-cream/75 hover:text-paper-cream"
          aria-label={storyLabel ?? "story"}
        >
          <ChevronDown
            aria-hidden="true"
            className="hero-scroll-hint size-5 drop-shadow-[0_1px_6px_rgb(12_28_23/0.65)]"
            strokeWidth={1.15}
          />
        </a>
      </MotionReveal>
    </div>
  );
}
