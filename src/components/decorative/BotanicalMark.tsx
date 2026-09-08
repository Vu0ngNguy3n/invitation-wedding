import { cn } from "@/utils/cn";

export const botanicalAssets = {
  corner: "/decorations/botanical-corner.svg",
  divider: "/decorations/botanical-divider.svg",
  branch: "/decorations/olive-branch.svg",
  wreath: "/decorations/monogram-frame.svg",
  frame: "/decorations/floral-frame.svg",
  edge: "/decorations/paper-edge.svg",
} as const;

export type BotanicalAsset = keyof typeof botanicalAssets;

const maskClassName: Record<BotanicalAsset, string> = {
  corner: "[mask-image:url(/decorations/botanical-corner.svg)]",
  divider: "[mask-image:url(/decorations/botanical-divider.svg)]",
  branch: "[mask-image:url(/decorations/olive-branch.svg)]",
  wreath: "[mask-image:url(/decorations/monogram-frame.svg)]",
  frame: "[mask-image:url(/decorations/floral-frame.svg)]",
  edge: "[mask-image:url(/decorations/paper-edge.svg)]",
};

type BotanicalMarkProps = {
  asset: BotanicalAsset;
  className?: string;
};

export function BotanicalMark({ asset, className }: BotanicalMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]",
        maskClassName[asset],
        className,
      )}
    />
  );
}
