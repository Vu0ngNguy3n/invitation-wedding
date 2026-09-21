import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { weddingData } from "@/config/weddingData";
import { invitationDocumentTitle } from "@/utils/seo";
import { existingPublicAsset } from "@/utils/publicAsset";
import { filledText } from "@/utils/text";

// Art-direction via getImageProps + <picture>, not two priority next/image nodes.

const HERO_SIZES = "100vw";

// The cover is a tall portrait frame: mobile shows the full composition, while
// wider viewports crop from the lower half so the couple keeps the bottom of
// the screen and the canopy stays free for the invitation typography.
const HERO_POSITION_CLASSNAME =
  "object-[50%_50%] sm:object-[50%_56%] lg:object-[50%_48%]";

function coverAlt(brideName?: string, groomName?: string, title?: string) {
  if (brideName && groomName) {
    return `${brideName} và ${groomName}`;
  }

  return brideName ?? groomName ?? title ?? "";
}

export function HeroBackdrop() {
  const { couple, wedding } = weddingData;
  const alt =
    coverAlt(
      filledText(couple.bride.name),
      filledText(couple.groom.name),
      filledText(wedding.title),
    ) || invitationDocumentTitle(weddingData);
  const mobileAsset = existingPublicAsset(wedding.cover.mobileImage);
  const desktopAsset = existingPublicAsset(wedding.cover.desktopImage);

  const {
    props: { srcSet: desktopSrcSet, src: desktopHref },
  } = getImageProps({
    alt,
    src: desktopAsset ?? mobileAsset ?? wedding.cover.desktopImage,
    width: 1920,
    height: 2998,
    quality: 85,
    sizes: HERO_SIZES,
  });

  const {
    props: { srcSet: mobileSrcSet, src: mobileHref },
  } = getImageProps({
    alt,
    src: mobileAsset ?? desktopAsset ?? wedding.cover.mobileImage,
    width: 1080,
    height: 1686,
    quality: 85,
    sizes: HERO_SIZES,
  });

  const hasPhoto = Boolean(mobileAsset || desktopAsset);

  if (hasPhoto && mobileHref && mobileSrcSet) {
    preload(mobileHref, {
      as: "image",
      imageSrcSet: mobileSrcSet,
      imageSizes: HERO_SIZES,
      media: "(max-width: 639px)",
      fetchPriority: "high",
    });
  }

  if (hasPhoto && desktopHref && desktopSrcSet) {
    preload(desktopHref, {
      as: "image",
      imageSrcSet: desktopSrcSet,
      imageSizes: HERO_SIZES,
      media: "(min-width: 640px)",
      fetchPriority: "high",
    });
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {hasPhoto ? (
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
            width={1080}
            height={1686}
            decoding="async"
            fetchPriority="high"
            className={`absolute inset-0 h-full w-full object-cover ${HERO_POSITION_CLASSNAME}`}
          />
        </picture>
      ) : null}

      <span aria-hidden="true" className="hero-scrim absolute inset-0" />

      {/* Single hairline: the nav, invitation copy, scroll hint and the music
          control all sit inside it, so nothing crosses the printed edge. */}
      <span
        aria-hidden="true"
        className="absolute inset-5 border border-accent-gold/40 sm:inset-7 lg:inset-8"
      />
    </div>
  );
}
