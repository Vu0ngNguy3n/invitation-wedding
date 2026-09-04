"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/utils/cn";

type CopyAccountButtonProps = {
  accountNumber: string;
  copyLabel: string;
  copiedLabel: string;
  failedLabel: string;
};

type CopyStatus = "idle" | "copied" | "failed";

export function CopyAccountButton({
  accountNumber,
  copyLabel,
  copiedLabel,
  failedLabel,
}: CopyAccountButtonProps) {
  const statusId = useId();
  const resetRef = useRef<number | null>(null);
  const [status, setStatus] = useState<CopyStatus>("idle");

  useEffect(() => {
    return () => {
      if (resetRef.current !== null) {
        window.clearTimeout(resetRef.current);
      }
    };
  }, []);

  function scheduleReset() {
    if (resetRef.current !== null) {
      window.clearTimeout(resetRef.current);
    }

    resetRef.current = window.setTimeout(() => {
      setStatus("idle");
      resetRef.current = null;
    }, 2500);
  }

  async function handleCopy() {
    if (!accountNumber) {
      return;
    }

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("clipboard unavailable");
      }

      await navigator.clipboard.writeText(accountNumber);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }

    scheduleReset();
  }

  const statusMessage =
    status === "copied" ? copiedLabel : status === "failed" ? failedLabel : "";

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => {
          void handleCopy();
        }}
        className="foil-border inline-flex min-h-11 max-w-full items-center justify-center gap-2 px-3 py-2 text-center text-accent-gold transition-opacity hover:opacity-80 sm:px-4"
      >
        {status === "copied" ? (
          <Check aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.25} />
        ) : (
          <Copy aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.25} />
        )}
        <span className="type-overline text-center leading-snug">{copyLabel}</span>
      </button>
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={cn(
          "type-caption min-h-5 max-w-full px-2 text-center text-pretty",
          status === "copied" && "text-success",
          status === "failed" && "text-error",
          status === "idle" && "sr-only",
        )}
      >
        {statusMessage}
      </p>
    </div>
  );
}
