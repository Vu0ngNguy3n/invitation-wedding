import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { CoupleProfile } from "@/components/couple/CoupleProfile";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CoupleSection() {
  const { bride, groom } = weddingData.couple;
  const heading = weddingData.navigation.find(
    (item) => item.id === "story",
  )?.label;

  return (
    <SectionContainer
      id="story"
      tone="ivory"
      labelledBy={heading ? "story-heading" : undefined}
    >
      <MotionReveal variant="fadeReveal">
        {heading ? (
          <SectionHeading title={heading} headingId="story-heading" />
        ) : null}

        <div className="mx-auto mt-6 max-w-xs sm:mt-8">
          <DecorativeDivider />
        </div>
      </MotionReveal>

      <div className="mt-14 flex flex-col gap-20 sm:mt-20 lg:mt-28 lg:gap-32">
        <CoupleProfile profile={bride} />
        <CoupleProfile profile={groom} reverse />
      </div>
    </SectionContainer>
  );
}
