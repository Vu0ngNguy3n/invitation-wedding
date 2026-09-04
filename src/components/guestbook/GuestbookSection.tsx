import { Suspense, type ReactNode } from "react";
import { weddingData } from "@/config/weddingData";
import { GuestbookBook } from "@/components/guestbook/GuestbookBook";
import type { GuestbookUiLabels } from "@/components/guestbook/guestbookUi";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listApprovedWishesCached } from "@/lib/guestbook/cached-wishes";
import {
  GUESTBOOK_MESSAGE_MAX,
  GUESTBOOK_NAME_MAX,
  type GuestbookWish,
} from "@/types/guestbook";
import { filledText } from "@/utils/text";

function textOrFallback(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function guestbookHeading(): { title: string; description?: string } {
  const copy = weddingData.copy.guestbook;

  return {
    title: textOrFallback(
      copy.title,
      weddingData.navigation.find((item) => item.id === "guestbook")?.label ??
        "Lời chúc",
    ),
    description: filledText(copy.description),
  };
}

function guestbookLabels(): GuestbookUiLabels {
  const copy = weddingData.copy.guestbook;

  return {
    nameLabel: "Họ và tên",
    messageLabel: "Lời chúc",
    namePlaceholder: textOrFallback(copy.namePlaceholder, ""),
    messagePlaceholder: textOrFallback(copy.messagePlaceholder, ""),
    nameRequired: "Vui lòng nhập họ và tên.",
    nameTooLong: `Họ và tên tối đa ${GUESTBOOK_NAME_MAX} ký tự.`,
    messageRequired: "Vui lòng viết lời chúc.",
    messageTooLong: `Lời chúc tối đa ${GUESTBOOK_MESSAGE_MAX} ký tự.`,
    submitLabel: textOrFallback(copy.submitLabel, "Gửi lời chúc"),
    submittingLabel: "Đang ghi vào sổ...",
    successMessage: textOrFallback(
      copy.successMessage,
      "Lời chúc đã được ghi vào sổ. Cảm ơn bạn.",
    ),
    errorMessage: textOrFallback(
      copy.errorMessage,
      "Chưa gửi được lời chúc. Vui lòng thử lại sau.",
    ),
    rateLimitMessage: "Bạn gửi hơi nhanh. Vui lòng thử lại sau một lát.",
    listLoading: "Đang mở sổ lưu bút...",
    listEmpty: "Sổ còn đang trống. Hãy là người đầu tiên viết lời chúc.",
    listError: "Không mở được sổ lời chúc lúc này.",
    listRetry: "Thử mở lại",
    listTitle: "Những lời đã ghi",
  };
}

function GuestbookFrame({ children }: { children: ReactNode }) {
  const heading = guestbookHeading();

  return (
    <SectionContainer id="guestbook" labelledBy="guestbook-heading">
      <MotionReveal>
        <SectionHeading
          title={heading.title}
          description={heading.description}
          headingId="guestbook-heading"
        />

        <div className="mx-auto mt-6 w-28 sm:mt-8 sm:w-36">
          <DecorativeDivider />
        </div>

        <div className="mt-2">{children}</div>
      </MotionReveal>
    </SectionContainer>
  );
}

async function GuestbookBookLoader({ labels }: { labels: GuestbookUiLabels }) {
  let initialWishes: GuestbookWish[] = [];
  let loadFailed = false;

  try {
    initialWishes = await listApprovedWishesCached();
  } catch {
    loadFailed = true;
  }

  return (
    <GuestbookBook
      timeZone={weddingData.wedding.timezone}
      labels={labels}
      initialWishes={initialWishes}
      loadFailed={loadFailed}
    />
  );
}

export function GuestbookSection() {
  const labels = guestbookLabels();

  return (
    <GuestbookFrame>
      <Suspense
        fallback={
          <p className="type-body mt-10 text-muted sm:mt-14" role="status">
            {labels.listLoading}
          </p>
        }
      >
        <GuestbookBookLoader labels={labels} />
      </Suspense>
    </GuestbookFrame>
  );
}
