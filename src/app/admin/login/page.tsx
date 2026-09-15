import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { PaperSurface } from "@/components/ui/PaperSurface";
import { ADMIN_RSVP_PATH } from "@/lib/admin/constants";
import { hasAdminSession } from "@/lib/admin/guard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminLoginPage() {
  if (await hasAdminSession()) {
    redirect(ADMIN_RSVP_PATH);
  }

  return (
    <main
      id="admin-content"
      className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16 sm:px-8"
    >
      <PaperSurface className="px-6 py-10 sm:px-9 sm:py-12">
        <div className="invitation-stack gap-4 text-center">
          <p className="type-overline text-accent-gold">Private</p>
          <h1 className="type-heading text-deep-forest">Quản lý RSVP</h1>
          <p className="type-body text-pretty text-muted">
            Khu vực này dành cho cô dâu, chú rể và người được ủy quyền.
          </p>
        </div>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </PaperSurface>
    </main>
  );
}
