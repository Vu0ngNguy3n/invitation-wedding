import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export type SectionTone = "forest" | "ivory" | "paper" | "mist" | "gallery";

type SectionContainerProps = {
  id?: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: SectionTone;
  backdrop?: ReactNode;
};

const toneClassName: Record<SectionTone, string> = {
  forest: "section-forest",
  ivory: "section-ivory",
  paper: "section-paper",
  mist: "section-mist",
  gallery: "section-gallery",
};

export function SectionContainer({
  id,
  labelledBy,
  children,
  className,
  containerClassName,
  tone = "ivory",
  backdrop,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative w-full scroll-mt-6 px-5 py-16 sm:scroll-mt-8 sm:px-10 sm:py-24 lg:px-16 lg:py-28",
        toneClassName[tone],
        className,
      )}
    >
      {backdrop}
      <div className={cn("relative mx-auto w-full min-w-0 max-w-6xl", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
