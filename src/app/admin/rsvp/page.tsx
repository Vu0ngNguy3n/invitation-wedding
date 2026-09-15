import { RsvpAdminView } from "@/components/admin/RsvpAdminView";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { rsvpAdminLabels } from "@/components/admin/rsvpAdminUi";
import { weddingData } from "@/config/weddingData";
import { requireAdminSession } from "@/lib/admin/guard";
import { summarizeRsvp } from "@/lib/rsvp/summary";
import { listRsvpSubmissions } from "@/lib/rsvp/submissions";
import type { RsvpSubmission } from "@/types/rsvp";
import { filledText } from "@/utils/text";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function personName(profile: { name: string; fullName?: string }): string | undefined {
  return filledText(profile.name) ?? filledText(profile.fullName);
}

export default async function AdminRsvpPage() {
  await requireAdminSession();

  let submissions: RsvpSubmission[] = [];
  let loadFailed = false;

  try {
    submissions = await listRsvpSubmissions();
  } catch {
    console.error("admin rsvp list failed");
    submissions = [];
    loadFailed = true;
  }

  const summary = summarizeRsvp(submissions);
  const labels = rsvpAdminLabels;

  return (
    <main
      id="admin-content"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-10 sm:px-8 sm:py-14"
    >
      <header className="flex flex-col gap-4 border-b border-accent-gold/25 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="type-overline text-accent-gold">Private</p>
          <h1 className="type-heading mt-2 text-deep-forest">{labels.title}</h1>
          <p className="type-body mt-2 max-w-xl text-pretty text-muted">
            {labels.subtitle}
          </p>
        </div>
        <AdminLogoutButton />
      </header>

      <div className="mt-8">
        {loadFailed ? (
          <div className="foil-border bg-soft-white/50 px-5 py-10 text-center" role="alert">
            <p className="type-body text-error">{labels.error}</p>
            <a
              href="/admin/rsvp"
              className="type-overline mt-4 inline-flex min-h-11 items-center text-deep-forest"
            >
              {labels.retry}
            </a>
          </div>
        ) : (
          <RsvpAdminView
            submissions={submissions}
            summary={summary}
            timeZone={weddingData.wedding.timezone}
            brideName={personName(weddingData.couple.bride)}
            groomName={personName(weddingData.couple.groom)}
          />
        )}
      </div>
    </main>
  );
}
