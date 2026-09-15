"use client";

import { logoutAdmin } from "@/app/admin/actions";
import { invitationActionClassName } from "@/components/ui/invitationAction";
import { rsvpAdminLabels } from "@/components/admin/rsvpAdminUi";
import { cn } from "@/utils/cn";

export function AdminLogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className={cn(invitationActionClassName, "text-deep-forest")}
      >
        <span className="type-overline">{rsvpAdminLabels.logout}</span>
      </button>
    </form>
  );
}
