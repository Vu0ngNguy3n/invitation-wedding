import type { ReactNode } from "react";
import { BotanicalMark } from "@/components/decorative/BotanicalMark";
import { cn } from "@/utils/cn";

export type SectionTone = "forest" | "ivory" | "paper" | "mist" | "gallery";
export type SectionEdge = "ivory" | "paper" | "mist" | "forest";

type SectionContainerProps = {
  id?: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: SectionTone;
  backdrop?: ReactNode;
  seam?: boolean;
  edgeTop?: SectionEdge;
  edgeBottom?: SectionEdge;
};

const toneClassName: Record<SectionTone, string> = {
  forest: "section-forest",
  ivory: "section-ivory",
  paper: "section-paper",
  mist: "section-mist",
  gallery: "section-gallery",
};

const edgeClassName: Record<SectionEdge, string> = {
  ivory: "text-ivory",
  paper: "text-paper-cream",
  mist: "text-sage-mist",
  forest: "text-deep-forest",
};

export function SectionContainer({
  id,
  labelledBy,
  children,
  className,
  containerClassName,
  tone = "ivory",
  backdrop,
  seam = true,
  edgeTop,
  edgeBottom,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative w-full scroll-mt-6 px-5 py-16 sm:scroll-mt-8 sm:px-10 sm:py-24 lg:px-16 lg:py-32 xl:py-36",
        toneClassName[tone],
        className,
      )}
    >
      {edgeTop ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 z-[1] h-6 -translate-y-[calc(100%-1px)] sm:h-8",
            edgeClassName[edgeTop],
          )}
        >
          <BotanicalMark
            asset="edge"
            className="h-full w-full rotate-180"
          />
        </div>
      ) : null}

      {seam ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 z-[1] w-36 -translate-x-1/2 -translate-y-1/2 text-botanical-green/45 in-[.section-forest]:text-accent-gold/40 sm:w-44"
        >
          <BotanicalMark asset="branch" className="h-7 w-full sm:h-8" />
        </div>
      ) : null}

      {backdrop}
      <div className={cn("relative mx-auto w-full min-w-0 max-w-6xl", containerClassName)}>
        {children}
      </div>

      {edgeBottom ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-6 translate-y-[calc(100%-1px)] sm:h-8",
            edgeClassName[edgeBottom],
          )}
        >
          <BotanicalMark asset="edge" className="h-full w-full" />
        </div>
      ) : null}
    </section>
  );
}
