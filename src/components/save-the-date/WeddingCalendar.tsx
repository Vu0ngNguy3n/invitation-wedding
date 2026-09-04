import type { CalendarMonth } from "@/utils/datetime";
import { cn } from "@/utils/cn";

type WeddingCalendarProps = {
  month: CalendarMonth;
};

export function WeddingCalendar({ month }: WeddingCalendarProps) {
  return (
    <table className="mx-auto w-full max-w-sm table-fixed border-collapse text-center">
      <caption className="type-overline mb-5 px-1 text-accent-gold">
        {month.caption}
      </caption>
      <thead>
        <tr>
          {month.weekdayLabels.map((label, index) => (
            <th
              key={`${label}-${index}`}
              scope="col"
              className="type-caption px-0 pb-3 font-normal text-muted"
            >
              <span className="block truncate">{label}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {month.weeks.map((week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((cell, dayIndex) => (
              <td key={`${weekIndex}-${dayIndex}`} className="p-0.5 sm:p-1.5">
                {cell ? (
                  <span
                    className={cn(
                      "mx-auto flex size-7 items-center justify-center text-xs sm:size-9 sm:text-base",
                      cell.isWeddingDay
                        ? "foil-border text-accent-gold"
                        : "text-paper-cream/85",
                    )}
                    aria-current={cell.isWeddingDay ? "date" : undefined}
                    aria-label={
                      cell.isWeddingDay
                        ? `${month.caption}, ${cell.day}`
                        : undefined
                    }
                  >
                    {cell.day}
                  </span>
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
