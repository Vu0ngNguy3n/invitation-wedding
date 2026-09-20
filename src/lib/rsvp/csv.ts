import {
  attendanceText,
  guestOfText,
  rsvpAdminLabels,
} from "@/components/admin/rsvpAdminUi";
import type { RsvpSubmission } from "@/types/rsvp";

const EXPORT_TITLE = "Danh sách khách tham dự tiệc cưới";
const FILE_NAME = `${EXPORT_TITLE}.xls`;
const FILE_NAME_ASCII = "Danh_sach_khach_tham_du_tiec_cuoi.xls";

export type RsvpExportMeta = {
  timeZone: string;
  coupleLine?: string;
  weddingDate?: string;
};

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatSubmittedAt(iso: string, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${read("hour")}:${read("minute")} ${read("day")}/${read("month")}/${read("year")}`;
}

function stringCell(value: string, style = "Cell"): string {
  return `<Cell ss:StyleID="${style}"><Data ss:Type="String">${xmlEscape(value)}</Data></Cell>`;
}

function mergedStringCell(value: string, style: string, mergeAcross: number): string {
  return `<Cell ss:StyleID="${style}" ss:MergeAcross="${mergeAcross}"><Data ss:Type="String">${xmlEscape(value)}</Data></Cell>`;
}

function numberCell(value: number, style = "Center"): string {
  return `<Cell ss:StyleID="${style}"><Data ss:Type="Number">${value}</Data></Cell>`;
}

function row(cells: string, extra = ""): string {
  return `<Row${extra}>${cells}</Row>`;
}

export function rsvpSubmissionsToCsv(
  submissions: RsvpSubmission[],
  meta: RsvpExportMeta,
): string {
  const labels = rsvpAdminLabels;
  const subtitle = [meta.coupleLine, meta.weddingDate]
    .filter((part): part is string => Boolean(part))
    .join(" · ");

  const header = row(
    [
      stringCell("STT", "Header"),
      stringCell("Tên khách mời", "Header"),
      stringCell("Trạng thái tham dự", "Header"),
      stringCell("Số người tham dự", "Header"),
      stringCell("Phía khách", "Header"),
      stringCell("Lời nhắn", "Header"),
      stringCell("Thời gian gửi", "Header"),
    ].join(""),
    ' ss:Height="22"',
  );

  const dataRows = submissions.map((submission, index) =>
    row(
      [
        numberCell(index + 1),
        stringCell(submission.guestName),
        stringCell(attendanceText(submission.attendance, labels)),
        numberCell(submission.attendeeCount),
        stringCell(guestOfText(submission.guestOf, labels)),
        stringCell(submission.message?.trim() ?? ""),
        stringCell(formatSubmittedAt(submission.createdAt, meta.timeZone), "Center"),
      ].join(""),
    ),
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
      <Alignment ss:Vertical="Center" ss:WrapText="1"/>
      <Font ss:FontName="Calibri" ss:Size="11"/>
    </Style>
    <Style ss:ID="Title">
      <Font ss:FontName="Calibri" ss:Size="16" ss:Bold="1" ss:Color="#18392F"/>
    </Style>
    <Style ss:ID="Subtitle">
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#5C6B64"/>
    </Style>
    <Style ss:ID="Header">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
      <Borders>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#18392F"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#18392F"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#18392F"/>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#18392F"/>
      </Borders>
      <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#18392F" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="Cell">
      <Alignment ss:Vertical="Center" ss:WrapText="1"/>
      <Borders>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8DDD6"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8DDD6"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8DDD6"/>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8DDD6"/>
      </Borders>
    </Style>
    <Style ss:ID="Center">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
      <Borders>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8DDD6"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8DDD6"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8DDD6"/>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D8DDD6"/>
      </Borders>
    </Style>
  </Styles>
  <Worksheet ss:Name="Danh sách khách">
    <Table ss:DefaultRowHeight="18">
      <Column ss:Width="36"/>
      <Column ss:Width="168"/>
      <Column ss:Width="132"/>
      <Column ss:Width="108"/>
      <Column ss:Width="96"/>
      <Column ss:Width="220"/>
      <Column ss:Width="120"/>
      ${row(mergedStringCell(EXPORT_TITLE, "Title", 6), ' ss:Height="26"')}
      ${row(mergedStringCell(subtitle || " ", "Subtitle", 6))}
      ${row("")}
      ${header}
      ${dataRows.join("\n      ")}
    </Table>
    <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
      <FreezePanes/>
      <FrozenNoSplit/>
      <SplitHorizontal>4</SplitHorizontal>
      <TopRowBottomPane>4</TopRowBottomPane>
    </WorksheetOptions>
  </Worksheet>
</Workbook>
`;
}

export function rsvpCsvContentDisposition(): string {
  const encoded = encodeURIComponent(FILE_NAME);
  return `attachment; filename="${FILE_NAME_ASCII}"; filename*=UTF-8''${encoded}`;
}
