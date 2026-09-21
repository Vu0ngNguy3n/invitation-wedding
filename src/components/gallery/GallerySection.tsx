import { weddingData } from "@/config/weddingData";
import { GalleryReveal } from "@/components/gallery/GalleryReveal";
import { GallerySlider } from "@/components/gallery/GallerySlider";
import { GalleryViewer } from "@/components/gallery/GalleryViewer";
import { SectionContainer } from "@/components/ui/SectionContainer";
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
      <GalleryViewer
        images={images}
        labels={{
          close: galleryCopy.close,
          previous: galleryCopy.previous,
          next: galleryCopy.next,
        }}
      >
        <GalleryReveal
          heading={heading}
          description={filledText(galleryCopy.description)}
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
        </GalleryReveal>
      </GalleryViewer>
    </SectionContainer>
  );
}
