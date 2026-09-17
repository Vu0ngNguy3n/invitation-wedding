import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { CoupleProfile } from "@/components/couple/CoupleProfile";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { filledText } from "@/utils/text";

export function CoupleSection() {
  const { bride, groom } = weddingData.couple;
  const heading = weddingData.navigation.find(
    (item) => item.id === "story",
  )?.label;
  const brideRole = filledText(weddingData.copy.story.brideRole);
  const groomRole = filledText(weddingData.copy.story.groomRole);

  return (
    <SectionContainer
      id="story"
      tone="ivory"
      labelledBy={heading ? "story-heading" : undefined}
      className="lg:py-36 xl:py-44"
    >
      <MotionReveal variant="storyHeading">
        {heading ? (
          <SectionHeading
            title={heading}
            headingId="story-heading"
            className="text-deep-forest"
          />
        ) : null}

        <div className="mx-auto mt-6 max-w-xs sm:mt-8">
          <DecorativeDivider />
        </div>
      </MotionReveal>

      <div className="mt-24 flex flex-col gap-32 sm:mt-28 sm:gap-36 lg:mt-32 lg:gap-40 xl:mt-36 xl:gap-44">
        <CoupleProfile
          profile={bride}
          placement="bride"
          roleLabel={brideRole}
        />
        <CoupleProfile
          profile={groom}
          placement="groom"
          roleLabel={groomRole}
        />
      </div>
    </SectionContainer>
  );
}
