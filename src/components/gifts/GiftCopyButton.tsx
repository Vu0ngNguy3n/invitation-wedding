"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { invitationActionClassName } from "@/components/ui/invitationAction";
import { cn } from "@/utils/cn";

type GiftCopyButtonProps = {
  value: string;
  copyLabel: string;
  copiedLabel: string;
  failedLabel: string;
};

export function GiftCopyButton({
  value,
  copyLabel,
  copiedLabel,
  failedLabel,
}: GiftCopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("failed");
    }
  }

  const feedback =
    status === "copied"
      ? copiedLabel
      : status === "failed"
        ? failedLabel
        : null;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className={cn(invitationActionClassName)}
      >
        {status === "copied" ? (
          <Check aria-hidden="true" className="size-4" strokeWidth={1.25} />
        ) : (
          <Copy aria-hidden="true" className="size-4" strokeWidth={1.25} />
        )}
        <span className="type-overline">{copyLabel}</span>
      </button>
      <p
        className={cn(
          "type-caption min-h-5",
          status === "copied" && "text-success",
          status === "failed" && "text-error",
        )}
        role="status"
        aria-live="polite"
      >
        {feedback}
      </p>
    </div>
  );
}
