import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
  headingId?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  headingId,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex w-full max-w-2xl flex-col gap-3 px-1",
        align === "center" && "mx-auto items-center text-center",
        align === "left" && "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="type-script text-accent-gold">{eyebrow}</p>
      ) : null}
      <h2 id={headingId} className="type-heading text-balance text-paper-cream">
        {title}
      </h2>
      {description ? (
        <p className="type-body max-w-prose text-pretty text-muted">{description}</p>
      ) : null}
    </header>
  );
}
