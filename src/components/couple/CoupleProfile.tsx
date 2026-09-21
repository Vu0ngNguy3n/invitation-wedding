import type { PersonProfile } from "@/types/wedding";
import { StoryPhotoFrame } from "@/components/couple/StoryPhotoFrame";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { cn } from "@/utils/cn";
import { existingPublicAsset } from "@/utils/publicAsset";
import { filledText } from "@/utils/text";

type CouplePlacement = "bride" | "groom";

type CoupleProfileProps = {
  profile: PersonProfile;
  placement: CouplePlacement;
  roleLabel?: string;
};

export function CoupleProfile({
  profile,
  placement,
  roleLabel,
}: CoupleProfileProps) {
  const displayName = filledText(profile.fullName) ?? filledText(profile.name);
  const role = filledText(roleLabel);
  const imageAlt = displayName ?? "";
  const photo = existingPublicAsset(profile.photo);
  const isGroom = placement === "groom";
  const Root = displayName ? "article" : "div";

  return (
    <Root className="grid min-w-0 grid-cols-1 items-center gap-14 sm:gap-16 lg:grid-cols-12 lg:gap-x-20 lg:gap-y-0 xl:gap-x-28">
      <MotionReveal
        variant={isGroom ? "storyPhotoRight" : "storyPhotoLeft"}
        className={cn(
          "mx-auto w-full min-w-0 px-3 py-4 sm:px-4 sm:py-5 lg:col-span-6 lg:max-w-none lg:px-5 lg:py-6",
          isGroom && "lg:order-2 lg:col-start-7",
        )}
      >
        <StoryPhotoFrame
          photo={photo}
          alt={imageAlt}
          restRotateClassName={
            isGroom
              ? "rotate-[1.4deg] lg:rotate-[3.2deg]"
              : "-rotate-[1.4deg] lg:-rotate-[3.2deg]"
          }
        />
      </MotionReveal>

      <MotionReveal
        variant="storyNameReveal"
        delay={0.18}
        className={cn(
          "flex w-full min-w-0 flex-col items-center self-center overflow-visible px-2 text-center lg:col-span-5",
          isGroom
            ? "lg:col-start-1 lg:row-start-1 lg:items-start lg:pr-4 lg:pl-2 lg:text-left xl:pr-6"
            : "lg:col-start-8 lg:items-end lg:pl-4 lg:pr-8 lg:text-right xl:pl-6 xl:pr-10",
        )}
      >
        {role ? (
          <p className="font-script max-w-full overflow-visible px-[0.35em] py-[0.28em] text-[clamp(2.2rem,9.8vw,3.35rem)] leading-[1.42] text-accent-gold lg:text-[clamp(2.85rem,3.6vw,4rem)]">
            {role}
          </p>
        ) : null}

        {role && displayName ? (
          <span
            aria-hidden="true"
            className="mt-5 mb-6 block h-px w-8 bg-accent-gold/70 lg:mt-6 lg:mb-8"
          />
        ) : null}

        {displayName ? (
          <h3 className="font-display max-w-full overflow-visible px-1 py-[0.14em] text-[clamp(1.35rem,4.8vw,1.85rem)] leading-[1.28] font-medium tracking-[0.035em] text-pretty break-words text-deep-forest lg:text-[clamp(1.7rem,2.15vw,2.4rem)]">
            {displayName}
          </h3>
        ) : null}
      </MotionReveal>
    </Root>
  );
}
