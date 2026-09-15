"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import {
  attendanceText,
  guestOfText,
  rsvpAdminLabels,
  summaryItems,
} from "@/components/admin/rsvpAdminUi";
import { invitationActionClassName } from "@/components/ui/invitationAction";
import {
  attendanceFilterFromValue,
  filterRsvpSubmissions,
  guestOfFilterFromValue,
  rsvpExportSearch,
  type RsvpAttendanceFilter,
  type RsvpGuestOfFilter,
} from "@/lib/rsvp/query";
import type { RsvpSummary } from "@/lib/rsvp/summary";
import type { RsvpSubmission } from "@/types/rsvp";
import { cn } from "@/utils/cn";

type RsvpAdminViewProps = {
  submissions: RsvpSubmission[];
  summary: RsvpSummary;
  timeZone: string;
  brideName?: string;
  groomName?: string;
};

function formatSubmittedAt(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone,
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));
}

function guestOfFilterLabel(
  value: RsvpGuestOfFilter,
  brideName?: string,
  groomName?: string,
): string {
  if (value === "bride") {
    return brideName
      ? `${rsvpAdminLabels.guestOfBride} · ${brideName}`
      : rsvpAdminLabels.guestOfBride;
  }

  if (value === "groom") {
    return groomName
      ? `${rsvpAdminLabels.guestOfGroom} · ${groomName}`
      : rsvpAdminLabels.guestOfGroom;
  }

  if (value === "both") {
    return rsvpAdminLabels.guestOfBoth;
  }

  return rsvpAdminLabels.guestOfAll;
}

export function RsvpAdminView({
  submissions,
  summary,
  timeZone,
  brideName,
  groomName,
}: RsvpAdminViewProps) {
  const [query, setQuery] = useState("");
  const [attendance, setAttendance] = useState<RsvpAttendanceFilter>("all");
  const [guestOf, setGuestOf] = useState<RsvpGuestOfFilter>("all");
  const labels = rsvpAdminLabels;

  const filtered = useMemo(
    () =>
      filterRsvpSubmissions(submissions, {
        query,
        attendance,
        guestOf,
      }),
    [submissions, query, attendance, guestOf],
  );

  const exportHref = `/admin/rsvp/export${rsvpExportSearch({
    query,
    attendance,
    guestOf,
  })}`;

  const stats = summaryItems(summary, labels);

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="rsvp-summary-heading" className="flex flex-col gap-4">
        <h2 id="rsvp-summary-heading" className="type-overline text-accent-gold">
          Tóm tắt
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((item) => (
            <li
              key={item.label}
              className="foil-border bg-soft-white/60 px-4 py-4"
            >
              <p className="type-caption text-muted">{item.label}</p>
              <p className="font-display mt-1 text-2xl leading-none text-deep-forest">
                {item.value}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="rsvp-list-heading" className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="rsvp-list-heading" className="type-overline text-accent-gold">
            {labels.subtitle}
          </h2>
          <p className="type-caption text-muted">
            {labels.showing} {filtered.length}/{submissions.length}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="rsvp-search" className="type-caption text-deep-forest">
              {labels.searchLabel}
            </label>
            <input
              id="rsvp-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="type-body stationery-field"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="rsvp-attendance" className="type-caption text-deep-forest">
              {labels.attendanceLabel}
            </label>
            <select
              id="rsvp-attendance"
              value={attendance}
              onChange={(event) =>
                setAttendance(attendanceFilterFromValue(event.target.value))
              }
              className="type-body stationery-field appearance-none pr-10"
            >
              <option value="all">{labels.attendanceAll}</option>
              <option value="attending">{labels.attendanceAttending}</option>
              <option value="declined">{labels.attendanceDeclined}</option>
            </select>
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="rsvp-guest-of" className="type-caption text-deep-forest">
              {labels.guestOfLabel}
            </label>
            <select
              id="rsvp-guest-of"
              value={guestOf}
              onChange={(event) =>
                setGuestOf(guestOfFilterFromValue(event.target.value))
              }
              className="type-body stationery-field appearance-none pr-10"
            >
              <option value="all">{guestOfFilterLabel("all")}</option>
              <option value="bride">
                {guestOfFilterLabel("bride", brideName, groomName)}
              </option>
              <option value="groom">
                {guestOfFilterLabel("groom", brideName, groomName)}
              </option>
              <option value="both">{guestOfFilterLabel("both")}</option>
            </select>
          </div>

          <a
            href={exportHref}
            className={cn(
              invitationActionClassName,
              "w-full text-deep-forest hover:bg-vintage-green hover:text-ivory hover:opacity-100 md:w-auto",
            )}
          >
            <Download aria-hidden="true" className="size-4" strokeWidth={1.5} />
            <span className="type-overline">{labels.exportCsv}</span>
          </a>
        </div>

        {filtered.length === 0 ? (
          <div className="foil-border bg-soft-white/50 px-5 py-10 text-center">
            <p className="type-body text-deep-forest">
              {submissions.length === 0 ? labels.empty : labels.emptyFiltered}
            </p>
            {submissions.length === 0 ? (
              <p className="type-caption mt-2 text-muted">{labels.emptyHint}</p>
            ) : null}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-accent-gold/30">
                    <th scope="col" className="type-caption px-3 py-3 text-deep-forest">
                      {labels.guest}
                    </th>
                    <th scope="col" className="type-caption px-3 py-3 text-deep-forest">
                      {labels.status}
                    </th>
                    <th scope="col" className="type-caption px-3 py-3 text-deep-forest">
                      {labels.guests}
                    </th>
                    <th scope="col" className="type-caption px-3 py-3 text-deep-forest">
                      {labels.side}
                    </th>
                    <th scope="col" className="type-caption px-3 py-3 text-deep-forest">
                      {labels.message}
                    </th>
                    <th scope="col" className="type-caption px-3 py-3 text-deep-forest">
                      {labels.submitted}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((submission) => (
                    <tr
                      key={submission.id}
                      className="border-b border-accent-gold/15 align-top"
                    >
                      <td className="type-body px-3 py-3 text-pretty text-ink">
                        {submission.guestName}
                      </td>
                      <td className="px-3 py-3">
                        <span className="type-caption text-deep-forest">
                          {attendanceText(submission.attendance, labels)}
                        </span>
                      </td>
                      <td className="type-body px-3 py-3">{submission.attendeeCount}</td>
                      <td className="type-body px-3 py-3">
                        {guestOfText(submission.guestOf, labels)}
                      </td>
                      <td className="max-w-xs px-3 py-3">
                        {submission.message ? (
                          <details>
                            <summary className="type-caption cursor-pointer text-deep-forest">
                              {labels.viewMessage}
                            </summary>
                            <p className="type-body mt-2 whitespace-pre-wrap text-pretty">
                              {submission.message}
                            </p>
                          </details>
                        ) : (
                          <span className="type-caption text-muted">
                            {labels.noMessage}
                          </span>
                        )}
                      </td>
                      <td className="type-caption px-3 py-3 text-muted">
                        <time dateTime={submission.createdAt}>
                          {formatSubmittedAt(submission.createdAt, timeZone)}
                        </time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="flex flex-col gap-3 md:hidden">
              {filtered.map((submission) => (
                <li
                  key={submission.id}
                  className="foil-border bg-soft-white/50 px-4 py-4"
                >
                  <p className="font-display text-xl leading-snug text-pretty text-deep-forest">
                    {submission.guestName}
                  </p>
                  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
                    <div>
                      <dt className="type-caption text-muted">{labels.status}</dt>
                      <dd className="type-body text-ink">
                        {attendanceText(submission.attendance, labels)}
                      </dd>
                    </div>
                    <div>
                      <dt className="type-caption text-muted">{labels.guests}</dt>
                      <dd className="type-body text-ink">{submission.attendeeCount}</dd>
                    </div>
                    <div>
                      <dt className="type-caption text-muted">{labels.side}</dt>
                      <dd className="type-body text-ink">
                        {guestOfText(submission.guestOf, labels)}
                      </dd>
                    </div>
                    <div>
                      <dt className="type-caption text-muted">{labels.submitted}</dt>
                      <dd className="type-caption text-ink">
                        <time dateTime={submission.createdAt}>
                          {formatSubmittedAt(submission.createdAt, timeZone)}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  {submission.message ? (
                    <details className="mt-3">
                      <summary className="type-caption cursor-pointer text-deep-forest">
                        {labels.viewMessage}
                      </summary>
                      <p className="type-body mt-2 whitespace-pre-wrap text-pretty">
                        {submission.message}
                      </p>
                    </details>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
