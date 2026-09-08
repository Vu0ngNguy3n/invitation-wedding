import { ChevronDown } from "lucide-react";
import { weddingData } from "@/config/weddingData";
import { BotanicalDecoration } from "@/components/decorative/BotanicalDecoration";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { HeroCover } from "@/components/hero/HeroCover";
import { HeroIdentity } from "@/components/hero/HeroIdentity";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { invitationMotion } from "@/lib/motion";
import { invitationDocumentTitle } from "@/utils/seo";
import { filledText, givenInitial } from "@/utils/text";

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

function coverAlt(brideName?: string, groomName?: string, title?: string) {
  if (brideName && groomName) {
    return `${brideName} và ${groomName}`;
  }

  return brideName ?? groomName ?? title ?? "";
}

export function HeroSection() {
  const { couple, wedding } = weddingData;
  const brideName = filledText(couple.bride.name);
  const groomName = filledText(couple.groom.name);
  const title = filledText(wedding.title);
  const phrase = filledText(wedding.phrase);
  const heading = coupleHeading(brideName, groomName, title);
  const displayedDate = dateLabel(
    wedding.date.display,
    wedding.date.day,
    wedding.date.month,
    wedding.date.year,
  );
  const dateTime = filledText(wedding.date.iso);
  const documentTitle = invitationDocumentTitle(weddingData);
  const imageAlt = coverAlt(brideName, groomName, title) || documentTitle;
  const mobileImage = wedding.cover.mobileImage;
  const desktopImage = wedding.cover.desktopImage;
  const showTitleKicker = Boolean(title && heading && heading !== title);
  const storyLabel = weddingData.navigation.find(
    (item) => item.id === "story",
  )?.label;

  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center px-5 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 foil-border sm:inset-6 lg:inset-8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-5 border border-accent-gold/20 sm:inset-7 lg:inset-9"
      />

      <BotanicalDecoration
        density="cover"
        className="flex w-full min-w-0 max-w-3xl flex-col items-center px-4 py-8 text-center sm:px-8 sm:py-10"
      >
        <MotionReveal
          mode="enter"
          variant="fadeReveal"
          className="mb-8 w-full max-w-xs sm:mb-10"
        >
          <DecorativeDivider />
        </MotionReveal>

        <HeroIdentity
          title={title}
          heading={heading}
          brideName={brideName}
          groomName={groomName}
          brideInitial={givenInitial(brideName)}
          groomInitial={givenInitial(groomName)}
          phrase={phrase}
          displayedDate={displayedDate}
          dateTime={dateTime}
          showTitleKicker={showTitleKicker}
          documentTitle={documentTitle}
        />

        <MotionReveal
          mode="enter"
          variant="imageReveal"
          className="mt-8 w-full overflow-hidden sm:mt-10 lg:mt-12"
          delay={invitationMotion.heroStagger * 6}
        >
          <HeroCover
            alt={imageAlt}
            mobileSrc={mobileImage}
            desktopSrc={desktopImage}
          />
        </MotionReveal>

        <MotionReveal
          mode="enter"
          variant="fadeReveal"
          className="mt-8 sm:mt-10"
          delay={invitationMotion.heroStagger * 7}
        >
          <a
            href="#story"
            className="invitation-action inline-flex min-h-11 flex-col items-center justify-center text-accent-gold/70 hover:text-accent-gold hover:opacity-100"
            aria-label={storyLabel ?? "story"}
          >
            <ChevronDown
              aria-hidden="true"
              className="size-5"
              strokeWidth={1.15}
            />
          </a>
        </MotionReveal>
      </BotanicalDecoration>
    </div>
  );
}
