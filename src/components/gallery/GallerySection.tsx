import Image from "next/image";
import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import {
  GalleryOpenButton,
  GalleryViewer,
} from "@/components/gallery/GalleryViewer";
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
          <ul className="columns-1 gap-5 sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-7">
            {images.slice(0, 8).map((image, imageIndex) => (
              <li
                key={image.id}
                className="mb-5 break-inside-avoid sm:mb-6 lg:mb-7"
              >
                <GalleryOpenButton
                  index={imageIndex}
                  label={
                    filledText(image.alt)
                      ? `${galleryCopy.openLabeled}${image.alt}`
                      : `${galleryCopy.openIndexed}${imageIndex + 1}`
                  }
                >
                  <Image
                    src={image.src}
                    alt=""
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 639px) 90vw, (max-width: 1023px) 44vw, 30vw"
                    className="h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                  />
                </GalleryOpenButton>
              </li>
            ))}
          </ul>
        </GalleryViewer>
      </MotionReveal>
    </SectionContainer>
  );
}
