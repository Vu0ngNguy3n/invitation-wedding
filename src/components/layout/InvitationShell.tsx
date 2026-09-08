import type { ReactNode } from "react";

type InvitationShellProps = {
  children: ReactNode;
};

export function InvitationShell({ children }: InvitationShellProps) {
  return (
    <div className="relative isolate flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip">
      {children}
    </div>
  );
}
