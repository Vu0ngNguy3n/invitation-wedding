import Image from "next/image";
import type { PersonProfile } from "@/types/wedding";
import { BotanicalDecoration } from "@/components/decorative/BotanicalDecoration";
import { cn } from "@/utils/cn";
import { existingPublicAsset } from "@/utils/publicAsset";
import { filledText } from "@/utils/text";

function parentLine(parents: PersonProfile["parents"]): string | undefined {
  const father = filledText(parents?.father);
  const mother = filledText(parents?.mother);

  if (father && mother) {
    return `${father} & ${mother}`;
  }

  return father ?? mother;
}

type CoupleProfileProps = {
  profile: PersonProfile;
  reverse?: boolean;
};

export function CoupleProfile({
  profile,
  reverse = false,
}: CoupleProfileProps) {
  const displayName = filledText(profile.fullName) ?? filledText(profile.name);
  const description = filledText(profile.description);
  const quote = filledText(profile.quote);
  const family = parentLine(profile.parents);
  const imageAlt = displayName ?? "";
  const photo = existingPublicAsset(profile.photo);

  const Root = displayName ? "article" : "div";

  return (
    <Root className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-24">
      <BotanicalDecoration
        className={cn(
          "mx-auto w-full max-w-[min(100%,260px)] p-3 sm:max-w-[300px] sm:p-4 lg:max-w-md",
          reverse && "lg:order-2",
        )}
      >
        <figure className="foil-border relative aspect-[3/4] overflow-hidden bg-surface">
          {photo ? (
            <Image
              src={photo}
              alt={imageAlt}
              fill
              sizes="(max-width: 639px) 260px, (max-width: 1023px) 300px, 28vw"
              className="object-cover object-center"
            />
          ) : null}
        </figure>
      </BotanicalDecoration>

      <div
        className={cn(
          "flex min-w-0 flex-col items-center px-1 text-center",
          reverse
            ? "lg:order-1 lg:items-end lg:text-right"
            : "lg:items-start lg:text-left",
        )}
      >
        {displayName ? (
          <h3 className="type-heading text-balance break-words text-paper-cream">
            {displayName}
          </h3>
        ) : null}

        {family ? (
          <p className="type-caption mt-3 max-w-sm text-muted">{family}</p>
        ) : null}

        {description ? (
          <p className="type-body mt-5 max-w-md text-pretty text-muted">
            {description}
          </p>
        ) : null}

        {quote ? (
          <blockquote className="mt-6 max-w-sm">
            <p className="type-script break-words text-accent-gold">{quote}</p>
          </blockquote>
        ) : null}
      </div>
    </Root>
  );
}
