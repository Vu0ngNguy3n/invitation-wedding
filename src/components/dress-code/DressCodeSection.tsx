"use client";

import { motion, useReducedMotion } from "framer-motion";
import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  dressCodeCopy,
  dressCodeReveal,
  dressCodeSwatch,
  dressCodeSwatchGroup,
  dressCodeViewport,
  fadeReveal,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/utils/cn";
import { filledText } from "@/utils/text";

const reducedStagger = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
};

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
  const prefersReducedMotion = useReducedMotion();

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
  const reduceMotion = prefersReducedMotion === true;
  const containerVariants = reduceMotion ? reducedStagger : staggerContainer;
  const itemVariants = reduceMotion ? fadeReveal : dressCodeReveal;
  const copyVariants = reduceMotion ? fadeReveal : dressCodeCopy;
  const swatchGroupVariants = reduceMotion
    ? reducedStagger
    : dressCodeSwatchGroup;
  const swatchVariants = reduceMotion ? fadeReveal : dressCodeSwatch;

  return (
    <SectionContainer
      id="dress-code"
      tone="ivory"
      labelledBy={heading ? "dress-code-heading" : undefined}
      className="pt-10 sm:pt-14 lg:pt-20"
      containerClassName="flex justify-center"
    >
      <motion.div
        className="mx-auto flex w-full max-w-3xl flex-col items-center text-center [--dress-code-copy-y:10px] [--dress-code-reveal-y:12px] [--dress-code-swatch-y:10px] md:[--dress-code-copy-y:14px] md:[--dress-code-reveal-y:22px] md:[--dress-code-swatch-y:12px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="shown"
        viewport={dressCodeViewport}
      >
        {heading ? (
          <motion.div variants={itemVariants} className="w-full">
            <SectionHeading title={heading} headingId="dress-code-heading" />
          </motion.div>
        ) : null}

        {heading ? (
          <motion.div variants={itemVariants} className="mx-auto mt-6 w-full max-w-xs sm:mt-7">
            <DecorativeDivider />
          </motion.div>
        ) : null}

        {swatches.length > 0 ? (
          <motion.ul
            className="mt-8 flex w-full flex-nowrap items-center justify-center sm:mt-9"
            aria-label={accessiblePalette}
            variants={swatchGroupVariants}
          >
            {swatches.map((color, index) => (
              <motion.li
                key={`${color.name}-${color.value}`}
                className={cn("shrink-0", index > 0 && "-ml-2.5 sm:-ml-3.5 lg:-ml-5")}
                variants={swatchVariants}
              >
                <span
                  aria-hidden="true"
                  className="block size-[clamp(4rem,15vw,4.75rem)] rounded-full shadow-[0_8px_18px_rgba(38,51,45,0.08)] ring-2 ring-ivory lg:size-24"
                  style={{ backgroundColor: color.value }}
                />
                <span className="sr-only">{color.name}</span>
              </motion.li>
            ))}
          </motion.ul>
        ) : null}

        {vietnameseNote || englishNote ? (
          <motion.div
            variants={copyVariants}
            className="mx-auto mt-8 w-full max-w-lg text-center sm:mt-9"
          >
            {vietnameseNote ? (
              <p className="type-body text-pretty text-center text-ink">
                {vietnameseNote}
              </p>
            ) : null}
            {englishNote ? (
              <p className="type-body mt-2 text-pretty text-center text-ink-muted">
                {englishNote}
              </p>
            ) : null}
          </motion.div>
        ) : null}

        {accessiblePalette ? (
          <motion.p
            variants={copyVariants}
            className="type-caption mx-auto mt-5 w-full max-w-lg text-pretty text-center text-muted sm:mt-6"
          >
            {accessiblePalette}
          </motion.p>
        ) : null}
      </motion.div>
    </SectionContainer>
  );
}
