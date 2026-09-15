import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { GallerySlider } from "@/components/gallery/GallerySlider";
import { GalleryViewer } from "@/components/gallery/GalleryViewer";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { existingPublicAsset } from "@/utils/publicAsset";
import { filledText } from "@/utils/text";

export function GallerySection() {
  const images = weddingData.gallery.filter((image) =>
    Boolean(existingPublicAsset(image.src)),
  );
  const heading = weddingData.navigation.find(
    (item) => item.id === "gallery",
  )?.label;

  const galleryCopy = weddingData.copy.gallery;

  if (images.length === 0) {
    return null;
  }

  return (
    <SectionContainer
      id="gallery"
      tone="gallery"
      labelledBy={heading ? "gallery-heading" : undefined}
    >
      <MotionReveal variant="fadeReveal">
        {heading ? (
          <SectionHeading title={heading} headingId="gallery-heading" />
        ) : null}

        <div className="mx-auto mt-6 max-w-xs sm:mt-8">
          <DecorativeDivider />
        </div>
      </MotionReveal>

      <MotionReveal variant="sectionReveal" className="mt-10 sm:mt-16">
        <GalleryViewer
          images={images}
          labels={{
            close: galleryCopy.close,
            previous: galleryCopy.previous,
            next: galleryCopy.next,
          }}
        >
          <GallerySlider
            images={images}
            labels={{
              region: filledText(galleryCopy.region) ?? heading ?? "Album",
              previous: galleryCopy.previous,
              next: galleryCopy.next,
              openLabeled: galleryCopy.openLabeled,
              openIndexed: galleryCopy.openIndexed,
              selectLabeled: galleryCopy.selectLabeled,
              selectIndexed: galleryCopy.selectIndexed,
            }}
          />
        </GalleryViewer>
      </MotionReveal>
    </SectionContainer>
  );
}
