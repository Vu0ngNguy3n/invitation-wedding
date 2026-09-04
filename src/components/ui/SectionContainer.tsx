import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type SectionContainerProps = {
  id?: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function SectionContainer({
  id,
  labelledBy,
  children,
  className,
  containerClassName,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative w-full scroll-mt-6 py-14 sm:scroll-mt-8 sm:py-20 lg:py-24",
        className,
      )}
    >
      <div className={cn("mx-auto w-full min-w-0 max-w-6xl", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
