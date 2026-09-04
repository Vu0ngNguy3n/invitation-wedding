import { Suspense, type ReactNode } from "react";
import { weddingData } from "@/config/weddingData";
import { GuestbookBook } from "@/components/guestbook/GuestbookBook";
import type { GuestbookUiLabels } from "@/components/guestbook/guestbookUi";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listApprovedWishesCached } from "@/lib/guestbook/cached-wishes";
import type { GuestbookWish } from "@/types/guestbook";
import { filledText } from "@/utils/text";

function guestbookHeading(): { title: string; description?: string } {
  const copy = weddingData.copy.guestbook;

  return {
    title:
      filledText(copy.title) ??
      weddingData.navigation.find((item) => item.id === "guestbook")?.label ??
      copy.nameLabel,
    description: filledText(copy.description),
  };
}

function guestbookLabels(): GuestbookUiLabels {
  const copy = weddingData.copy.guestbook;

  return {
    nameLabel: copy.nameLabel,
    messageLabel: copy.messageLabel,
    namePlaceholder: copy.namePlaceholder,
    messagePlaceholder: copy.messagePlaceholder,
    nameRequired: copy.nameRequired,
    nameTooLong: copy.nameTooLong,
    messageRequired: copy.messageRequired,
    messageTooLong: copy.messageTooLong,
    submitLabel: copy.submitLabel,
    submittingLabel: copy.submittingLabel,
    successMessage: copy.successMessage,
    errorMessage: copy.errorMessage,
    rateLimitMessage: copy.rateLimitMessage,
    listLoading: copy.listLoading,
    listEmpty: copy.listEmpty,
    listError: copy.listError,
    listRetry: copy.listRetry,
    listTitle: copy.listTitle,
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
