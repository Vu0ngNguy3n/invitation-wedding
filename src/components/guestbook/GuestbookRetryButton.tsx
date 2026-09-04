"use client";

import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";

type GuestbookRetryButtonProps = {
  label: string;
};

export function GuestbookRetryButton({ label }: GuestbookRetryButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        router.refresh();
      }}
      className="foil-border inline-flex min-h-11 items-center justify-center gap-2 px-4 py-2 text-accent-gold transition-opacity hover:opacity-80"
    >
      <RotateCw aria-hidden="true" className="size-4" strokeWidth={1.25} />
      <span className="type-overline">{label}</span>
    </button>
  );
}
