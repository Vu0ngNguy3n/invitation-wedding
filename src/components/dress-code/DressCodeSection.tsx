import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { invitationMotion } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { filledText } from "@/utils/text";

function hasDressCodeContent(): boolean {
  const dressCode = weddingData.dressCode;

  return Boolean(
    filledText(dressCode.title) ||
      filledText(dressCode.noteVi) ||
      filledText(dressCode.noteEn) ||
      filledText(dressCode.paletteLabel) ||
      dressCode.colors.some(
        (color) => filledText(color.name) && filledText(color.value),
      ),
  );
}

export function DressCodeSection() {
  if (!hasDressCodeContent()) {
    return null;
  }

  const { title, noteVi, noteEn, paletteLabel, colors } = weddingData.dressCode;
  const heading = filledText(title);
  const vietnameseNote = filledText(noteVi);
  const englishNote = filledText(noteEn);
  const accessiblePalette = filledText(paletteLabel);
  const swatches = colors.filter(
    (color) => filledText(color.name) && filledText(color.value),
  );

  return (
    <SectionContainer
      id="dress-code"
      tone="ivory"
      labelledBy={heading ? "dress-code-heading" : undefined}
      className="pt-10 sm:pt-14 lg:pt-20"
    >
      <MotionReveal variant="fadeReveal">
        {heading ? (
          <SectionHeading title={heading} headingId="dress-code-heading" />
        ) : null}

        {heading ? (
          <div className="mx-auto mt-6 max-w-xs sm:mt-8">
            <DecorativeDivider />
          </div>
        ) : null}
      </MotionReveal>

      {swatches.length > 0 ? (
        <ul
          className="mt-10 flex items-center justify-center sm:mt-12"
          aria-label={accessiblePalette}
        >
          {swatches.map((color, index) => (
            <li
              key={`${color.name}-${color.value}`}
              className={cn(index > 0 && "-ml-3 sm:-ml-4")}
            >
              <MotionReveal
                variant="fadeScale"
                delay={invitationMotion.stagger * 0.6 * index}
              >
                <span
                  aria-hidden="true"
                  className="block size-16 rounded-full shadow-[0_8px_18px_rgba(38,51,45,0.08)] ring-2 ring-ivory sm:size-[4.75rem] lg:size-24"
                  style={{ backgroundColor: color.value }}
                />
                <span className="sr-only">{color.name}</span>
              </MotionReveal>
            </li>
          ))}
        </ul>
      ) : null}

      <MotionReveal variant="softReveal" className="mx-auto mt-8 max-w-md sm:mt-10">
        {vietnameseNote ? (
          <p className="type-body text-pretty text-ink">{vietnameseNote}</p>
        ) : null}
        {englishNote ? (
          <p className="type-body mt-1 text-pretty text-ink-muted">
            {englishNote}
          </p>
        ) : null}
        {accessiblePalette ? (
          <p className="type-caption mt-4 text-pretty text-muted">
            {accessiblePalette}
          </p>
        ) : null}
      </MotionReveal>
    </SectionContainer>
  );
}
