import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { HeroCover } from "@/components/hero/HeroCover";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { invitationMotion } from "@/utils/motion";
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

  return (
    <header
      id="home"
      aria-labelledby="home-heading"
      className="relative flex min-h-[calc(100svh-9.5rem)] w-full scroll-mt-6 flex-col items-center justify-center py-6 sm:min-h-[calc(100svh-11rem)] sm:scroll-mt-8 sm:py-8 lg:min-h-[calc(100svh-13rem)] lg:py-10"
    >
      <div className="flex w-full min-w-0 max-w-3xl flex-col items-center text-center">
        <MotionReveal
          mode="enter"
          className="flex w-full flex-col items-center"
        >
          {showTitleKicker ? (
            <p className="type-overline text-accent-gold">{title}</p>
          ) : null}

          {heading ? (
            <h1
              id="home-heading"
              className={
                showTitleKicker
                  ? "mt-5 max-w-full px-1 text-balance break-words text-paper-cream sm:mt-6"
                  : "max-w-full px-1 text-balance break-words text-paper-cream"
              }
            >
              {brideName && groomName ? (
                <>
                  <span className="type-display block">{brideName}</span>
                  <span
                    aria-hidden="true"
                    className="type-script mt-1 mb-1 block text-accent-gold"
                  >
                    &
                  </span>
                  <span className="type-display block">{groomName}</span>
                </>
              ) : (
                <span className="type-display block">{heading}</span>
              )}
            </h1>
          ) : (
            <h1 id="home-heading" className="sr-only">
              {documentTitle}
            </h1>
          )}

          {phrase ? (
            <p
              className={
                title || heading
                  ? "type-script mt-5 max-w-md px-1 text-pretty break-words text-paper-cream sm:mt-6"
                  : "type-script max-w-md px-1 text-pretty break-words text-paper-cream"
              }
            >
              {phrase}
            </p>
          ) : null}

          <div
            className={
              title || heading || phrase
                ? "mt-6 w-28 sm:mt-8 sm:w-36"
                : "w-28 sm:w-36"
            }
          >
            <DecorativeDivider />
          </div>

          {displayedDate ? (
            dateTime ? (
              <time
                dateTime={dateTime}
                className="type-overline mt-5 text-accent-gold sm:mt-6"
              >
                {displayedDate}
              </time>
            ) : (
              <p className="type-overline mt-5 text-accent-gold sm:mt-6">
                {displayedDate}
              </p>
            )
          ) : null}
        </MotionReveal>

        <MotionReveal
          mode="enter"
          className="mt-8 w-full sm:mt-10 lg:mt-12"
          delay={invitationMotion.stagger}
        >
          <HeroCover
            alt={imageAlt}
            mobileSrc={mobileImage}
            desktopSrc={desktopImage}
          />
        </MotionReveal>
      </div>
    </header>
  );
}
