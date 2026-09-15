import Image from "next/image";
import type { PersonProfile } from "@/types/wedding";
import { MotionReveal } from "@/components/ui/MotionReveal";
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
    <Root className="grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-16">
      <MotionReveal
        variant={reverse ? "editorialImageAlt" : "editorialImage"}
        className={cn(
          "mx-auto w-full max-w-[min(100%,300px)] overflow-hidden sm:max-w-[380px] lg:col-span-5 lg:max-w-none xl:col-span-5",
          reverse && "lg:order-2 lg:col-start-8",
        )}
      >
        <figure className="group foil-border relative aspect-[3/4] overflow-hidden bg-kraft">
          {photo ? (
            <Image
              src={photo}
              alt={imageAlt}
              fill
              sizes="(max-width: 639px) 300px, (max-width: 1023px) 380px, 38vw"
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
            />
          ) : null}
        </figure>
      </MotionReveal>

      <MotionReveal
        variant={reverse ? "editorialLeft" : "editorialRight"}
        delay={0.12}
        className={cn(
          "flex min-w-0 flex-col items-center px-1 text-center lg:col-span-6",
          reverse
            ? "lg:col-start-1 lg:row-start-1 lg:items-end lg:pr-6 lg:text-right xl:pr-10"
            : "lg:col-start-7 lg:items-start lg:pl-6 lg:text-left xl:pl-10",
        )}
      >
        {displayName ? (
          <h3 className="type-heading text-balance break-words">
            {displayName}
          </h3>
        ) : null}

        {family ? (
          <p className="type-caption mt-4 max-w-sm text-muted">{family}</p>
        ) : null}

        {description
          ? description.split(". ")?.map((sentence, index) => (
              <p
                key={index}
                className="type-body mt-5 max-w-md text-pretty text-muted"
              >
                {sentence}
              </p>
            ))
          : null}

        {quote ? (
          <blockquote className="mt-8 max-w-sm">
            <p className="type-body text-pretty break-words text-accent-gold italic">
              {quote}
            </p>
          </blockquote>
        ) : null}
      </MotionReveal>
    </Root>
  );
}
