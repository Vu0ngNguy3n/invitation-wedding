import { ChevronDown } from "lucide-react";
import { weddingData } from "@/config/weddingData";
import { BotanicalDecoration } from "@/components/decorative/BotanicalDecoration";
import { HeroCover } from "@/components/hero/HeroCover";
import { HeroIdentity } from "@/components/hero/HeroIdentity";
import { MotionReveal } from "@/components/ui/MotionReveal";
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
    <div className="relative flex w-full flex-1 flex-col items-center justify-center px-5 py-8 sm:px-10 sm:py-9 lg:px-16 lg:pt-10 lg:pb-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 border border-accent-gold/22 sm:inset-6 lg:inset-7"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-5 border border-accent-gold/10 sm:inset-7 lg:inset-8"
      />

      <BotanicalDecoration
        density="cover"
        ornamentInsetClassName="lg:inset-[6%]"
        className="invitation-stack w-full min-w-0 max-w-3xl px-4 py-7 sm:px-8 sm:py-8 lg:max-w-4xl lg:py-9"
      >
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
          className="mt-7 w-full overflow-hidden sm:mt-8 lg:mt-9"
          delay={0.36}
          duration={0.9}
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
          className="mt-6 sm:mt-7"
          delay={0.44}
          duration={0.7}
        >
          <a
            href="#story"
            className="inline-flex min-h-11 flex-col items-center justify-center text-accent-gold/55 hover:text-accent-gold/85"
            aria-label={storyLabel ?? "story"}
          >
            <ChevronDown
              aria-hidden="true"
              className="hero-scroll-hint size-5"
              strokeWidth={1.15}
            />
          </a>
        </MotionReveal>
      </BotanicalDecoration>
    </div>
  );
}
