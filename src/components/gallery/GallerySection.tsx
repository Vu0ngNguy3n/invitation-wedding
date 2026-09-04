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
  const heading = weddingData.navigation.find((item) => item.id === "gallery")?.label;

  if (images.length === 0) {
    return null;
  }

  return (
    <SectionContainer id="gallery" labelledBy={heading ? "gallery-heading" : undefined}>
      <MotionReveal>
        {heading ? (
          <SectionHeading title={heading} headingId="gallery-heading" />
        ) : null}

        <div className="mx-auto mt-6 w-28 sm:mt-8 sm:w-36">
          <DecorativeDivider />
        </div>

        <div className="mt-10 sm:mt-14">
          <GalleryViewer images={images}>
            <ul className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6">
              {images.map((image, imageIndex) => (
                <li
                  key={image.id}
                  className="mb-4 break-inside-avoid sm:mb-5 lg:mb-6"
                >
                  <GalleryOpenButton
                    index={imageIndex}
                    label={
                      filledText(image.alt)
                        ? `Xem ảnh lớn: ${image.alt}`
                        : `Xem ảnh lớn ${imageIndex + 1}`
                    }
                  >
                    <Image
                      src={image.src}
                      alt=""
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 639px) 90vw, (max-width: 1023px) 44vw, 30vw"
                      className="h-auto w-full object-cover"
                    />
                  </GalleryOpenButton>
                </li>
              ))}
            </ul>
          </GalleryViewer>
        </div>
      </MotionReveal>
    </SectionContainer>
  );
}
