import Image from "next/image";
import { weddingData } from "@/config/weddingData";
import { BotanicalDecoration } from "@/components/decorative/BotanicalDecoration";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { invitationDocumentTitle } from "@/utils/seo";
import { existingPublicAsset } from "@/utils/publicAsset";
import { filledText } from "@/utils/text";

function personName(profile: { name: string; fullName?: string }): string | undefined {
  return filledText(profile.name) ?? filledText(profile.fullName);
}

function dateLabel(
  display: string,
  day: string,
  month: string,
  year: string,
): string | undefined {
  const explicit = filledText(display);
  if (explicit) {
    return explicit;
  }

  const parts = [day, month, year]
    .map(filledText)
    .filter((part): part is string => part !== undefined);

  return parts.length > 0 ? parts.join(" · ") : undefined;
}

function closingPhotoAlt(
  configuredAlt?: string,
  brideName?: string,
  groomName?: string,
): string {
  const explicit = filledText(configuredAlt);
  if (explicit) {
    return explicit;
  }

  if (brideName && groomName) {
    return `${brideName} và ${groomName}`;
  }

  return brideName ?? groomName ?? invitationDocumentTitle(weddingData);
}

export function ThankYouSection() {
  const { couple, wedding, copy } = weddingData;
  const title = filledText(copy.thankYou.title);
  const message = filledText(copy.thankYou.message);
  const brideName = personName(couple.bride);
  const groomName = personName(couple.groom);
  const displayedDate = dateLabel(
    wedding.date.display,
    wedding.date.day,
    wedding.date.month,
    wedding.date.year,
  );
  const dateTime = filledText(wedding.date.iso);
  const image = existingPublicAsset(copy.thankYou.image);
  const imageAlt = closingPhotoAlt(
    copy.thankYou.imageAlt,
    brideName,
    groomName,
  );

  return (
    <SectionContainer
      id="thank-you"
      labelledBy={title ? "thank-you-heading" : undefined}
      className="py-20 sm:py-28 lg:py-32"
      containerClassName="max-w-2xl"
    >
      <MotionReveal>
        <BotanicalDecoration className="px-2 py-8 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="relative flex flex-col items-center px-3 py-8 text-center sm:px-8 sm:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 border border-accent-gold/25"
            />

            {title ? (
              <h2
                id="thank-you-heading"
                className="type-script max-w-full px-1 text-4xl break-words text-accent-gold sm:text-5xl lg:text-6xl"
              >
                {title}
              </h2>
            ) : null}

            {message ? (
              <p
                className={
                  title
                    ? "type-body mt-6 max-w-md text-pretty text-paper-cream sm:mt-8"
                    : "type-body max-w-md text-pretty text-paper-cream"
                }
              >
                {message}
              </p>
            ) : null}

            <div
              className={
                title || message
                  ? "mt-8 w-24 sm:mt-10 sm:w-32"
                  : "w-24 sm:w-32"
              }
            >
              <DecorativeDivider />
            </div>

            {image ? (
              <figure className="mt-10 w-full max-w-[168px] sm:mt-12 sm:max-w-[200px]">
                <div className="foil-border relative aspect-[3/4] overflow-hidden bg-surface">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 639px) 168px, 200px"
                    className="object-cover object-center"
                  />
                </div>
              </figure>
            ) : null}

            {brideName || groomName ? (
              <p
                className={
                  image
                    ? "mt-10 text-balance text-paper-cream sm:mt-12"
                    : "mt-8 text-balance text-paper-cream sm:mt-10"
                }
              >
                {brideName && groomName ? (
                  <>
                    <span className="type-script block break-words">{brideName}</span>
                    <span
                      aria-hidden="true"
                      className="type-script my-1 block text-accent-gold"
                    >
                      &
                    </span>
                    <span className="type-script block break-words">{groomName}</span>
                  </>
                ) : (
                  <span className="type-script block">
                    {brideName ?? groomName}
                  </span>
                )}
              </p>
            ) : null}

            {displayedDate ? (
              dateTime ? (
                <time
                  dateTime={dateTime}
                  className="type-overline mt-6 text-accent-gold sm:mt-8"
                >
                  {displayedDate}
                </time>
              ) : (
                <p className="type-overline mt-6 text-accent-gold sm:mt-8">
                  {displayedDate}
                </p>
              )
            ) : null}
          </div>
        </BotanicalDecoration>
      </MotionReveal>
    </SectionContainer>
  );
}
