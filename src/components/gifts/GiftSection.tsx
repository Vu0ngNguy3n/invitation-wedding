import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { GiftRecipient } from "@/components/gifts/GiftRecipient";
import type { GiftFieldLabels } from "@/components/gifts/giftUi";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { invitationMotion } from "@/lib/motion";
import type { WeddingGift } from "@/types/wedding";
import { hasGiftContent } from "@/utils/sectionVisibility";
import { filledText } from "@/utils/text";

function giftLabels(): GiftFieldLabels {
  const copy = weddingData.copy.gift;

  return {
    bank: copy.bank,
    accountName: copy.accountName,
    accountNumber: copy.accountNumber,
    transferNote: copy.transferNote,
    copy: copy.copy,
    copied: copy.copied,
    copyFailed: copy.copyFailed,
    brideRole: copy.brideRole,
    groomRole: copy.groomRole,
  };
}

function qrAlt(gift: WeddingGift, labels: GiftFieldLabels): string {
  const recipient = filledText(gift.name);
  const role = gift.person === "bride" ? labels.brideRole : labels.groomRole;

  if (recipient) {
    return `Mã QR chuyển khoản của ${recipient}`;
  }

  return `Mã QR chuyển khoản — ${role}`;
}

export function GiftSection() {
  const gifts = weddingData.gifts.filter(hasGiftContent);
  const labels = giftLabels();
  const title = filledText(weddingData.copy.gift.title);
  const description = filledText(weddingData.copy.gift.description);

  const navLabel = weddingData.navigation.find(
    (item) => item.id === "gift",
  )?.label;
  const headingTitle = title ?? description ?? navLabel;

  if (gifts.length === 0) {
    return null;
  }

  return (
    <SectionContainer
      id="gift"
      tone="paper"
      labelledBy={headingTitle ? "gift-heading" : undefined}
    >
      <MotionReveal variant="fadeReveal">
        {headingTitle ? (
          <SectionHeading
            title={headingTitle}
            description={title ? description : undefined}
            headingId="gift-heading"
          />
        ) : null}

        {title ? (
          <div className="mx-auto mt-6 max-w-xs sm:mt-8">
            <DecorativeDivider />
          </div>
        ) : null}
      </MotionReveal>

      <div
        className={
          gifts.length === 1
            ? "mx-auto mt-10 max-w-md sm:mt-14"
            : "mt-10 grid min-w-0 gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-10"
        }
      >
        {gifts.map((gift, index) => (
          <MotionReveal
            key={gift.id}
            variant="fadeScale"
            delay={invitationMotion.stagger * index}
          >
            <GiftRecipient
              gift={gift}
              labels={labels}
              qrAlt={qrAlt(gift, labels)}
            />
          </MotionReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
