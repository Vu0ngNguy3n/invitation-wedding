import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  variant?: "heading" | "script";
  className?: string;
  headingId?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "heading",
  className,
  headingId,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "invitation-stack max-w-2xl gap-4 px-1",
        align === "center" && "mx-auto",
        align === "left" && "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="type-script text-accent-gold">{eyebrow}</p>
      ) : null}
      <h2
        id={headingId}
        className={cn(
          "text-balance",
          variant === "script"
            ? "type-script text-accent-gold"
            : "type-heading text-current",
          align === "center" && "w-full text-center",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="type-body max-w-[38rem] text-pretty text-muted">
          {description}
        </p>
      ) : null}
    </header>
  );
}
