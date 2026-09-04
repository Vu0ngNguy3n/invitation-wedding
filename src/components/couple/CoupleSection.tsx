import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { CoupleProfile } from "@/components/couple/CoupleProfile";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CoupleSection() {
  const { bride, groom } = weddingData.couple;
  const heading = weddingData.navigation.find((item) => item.id === "story")?.label;

  return (
    <SectionContainer id="story" labelledBy={heading ? "story-heading" : undefined}>
      <MotionReveal>
        {heading ? (
          <SectionHeading title={heading} headingId="story-heading" />
        ) : null}

        <div className="mx-auto mt-6 w-28 sm:mt-8 sm:w-36">
          <DecorativeDivider />
        </div>

        <div className="mt-12 flex flex-col gap-16 sm:mt-16 lg:mt-20 lg:gap-24">
          <CoupleProfile profile={bride} />
          <CoupleProfile profile={groom} reverse />
        </div>
      </MotionReveal>
    </SectionContainer>
  );
}
