import type { ReactNode } from "react";
import { BotanicalDecoration } from "@/components/decorative/BotanicalDecoration";

type InvitationShellProps = {
  children: ReactNode;
};

export function InvitationShell({ children }: InvitationShellProps) {
  return (
    <div className="relative isolate flex min-h-full flex-1 flex-col overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 foil-border sm:inset-5 lg:inset-7"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 border border-accent-gold/20 sm:inset-6 lg:inset-8"
      />
      <BotanicalDecoration className="relative z-10 flex min-h-full min-w-0 flex-1 flex-col px-5 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
        {children}
      </BotanicalDecoration>
    </div>
  );
}
