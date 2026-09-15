import { redirect } from "next/navigation";
import { ADMIN_LOGIN_PATH } from "@/lib/admin/constants";
import { hasAdminSession } from "@/lib/admin/guard";
import { rsvpCsvFilename, rsvpSubmissionsToCsv } from "@/lib/rsvp/csv";
import { filterRsvpSubmissions, parseRsvpListFilter } from "@/lib/rsvp/query";
import { listRsvpSubmissions } from "@/lib/rsvp/submissions";
import { weddingData } from "@/config/weddingData";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!(await hasAdminSession())) {
    redirect(ADMIN_LOGIN_PATH);
  }

  let submissions: Awaited<ReturnType<typeof listRsvpSubmissions>> = [];

  try {
    submissions = await listRsvpSubmissions();
  } catch {
    console.error("admin rsvp export failed");
    return new Response("Unable to export RSVP data right now.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const filter = parseRsvpListFilter(new URL(request.url).searchParams);
  const rows = filterRsvpSubmissions(submissions, filter);
  const csv = rsvpSubmissionsToCsv(rows);
  const filename = rsvpCsvFilename(new Date(), weddingData.wedding.timezone);

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
