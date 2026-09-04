import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { existingPublicAsset } from "@/utils/publicAsset";

// Art-direction via getImageProps + <picture>, not two priority next/image nodes.

const HERO_SIZES =
  "(max-width: 639px) 240px, (max-width: 1023px) 320px, 380px";

type HeroCoverProps = {
  alt: string;
  mobileSrc: string;
  desktopSrc: string;
};

export function HeroCover({ alt, mobileSrc, desktopSrc }: HeroCoverProps) {
  const mobileAsset = existingPublicAsset(mobileSrc);
  const desktopAsset = existingPublicAsset(desktopSrc);

  if (!mobileAsset && !desktopAsset) {
    return (
      <figure className="mx-auto w-full max-w-[min(100%,240px)] sm:max-w-[320px] lg:max-w-[380px]">
        <div
          aria-hidden="true"
          className="foil-border relative aspect-[3/4] overflow-hidden bg-surface sm:aspect-[4/5]"
        />
      </figure>
    );
  }

  const {
    props: { srcSet: desktopSrcSet, src: desktopHref },
  } = getImageProps({
    alt,
    src: desktopAsset ?? mobileAsset ?? desktopSrc,
    width: 760,
    height: 950,
    sizes: HERO_SIZES,
  });

  const {
    props: { srcSet: mobileSrcSet, src: mobileHref },
  } = getImageProps({
    alt,
    src: mobileAsset ?? desktopAsset ?? mobileSrc,
    width: 480,
    height: 640,
    sizes: HERO_SIZES,
  });

  if (mobileHref && mobileSrcSet) {
    preload(mobileHref, {
      as: "image",
      imageSrcSet: mobileSrcSet,
      imageSizes: HERO_SIZES,
      media: "(max-width: 639px)",
      fetchPriority: "high",
    });
  }

  if (desktopHref && desktopSrcSet) {
    preload(desktopHref, {
      as: "image",
      imageSrcSet: desktopSrcSet,
      imageSizes: HERO_SIZES,
      media: "(min-width: 640px)",
      fetchPriority: "high",
    });
  }

  return (
    <figure className="mx-auto w-full max-w-[min(100%,240px)] sm:max-w-[320px] lg:max-w-[380px]">
      <div className="foil-border relative aspect-[3/4] overflow-hidden bg-surface sm:aspect-[4/5]">
        <picture>
          {desktopSrcSet ? (
            <source
              media="(min-width: 640px)"
              srcSet={desktopSrcSet}
              sizes={HERO_SIZES}
            />
          ) : null}
          <img
            alt={alt}
            src={mobileHref}
            srcSet={mobileSrcSet}
            sizes={HERO_SIZES}
            width={480}
            height={640}
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
      </div>
    </figure>
  );
}
