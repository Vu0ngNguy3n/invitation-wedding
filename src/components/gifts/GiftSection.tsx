import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { GiftRecipient } from "@/components/gifts/GiftRecipient";
import type { GiftFieldLabels } from "@/components/gifts/giftUi";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { WeddingGift } from "@/types/wedding";
import { hasGiftContent } from "@/utils/sectionVisibility";
import { filledText } from "@/utils/text";

function giftLabels(): GiftFieldLabels {
  const copy = weddingData.copy.gift;

  return {
    bank: copy.bank,
    accountName: copy.accountName,
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
      labelledBy={headingTitle ? "gift-heading" : undefined}
    >
      <MotionReveal>
        {headingTitle ? (
          <SectionHeading
            title={headingTitle}
            description={title ? description : undefined}
            headingId="gift-heading"
          />
        ) : null}

        {title ? (
          <div className="mx-auto mt-6 w-28 sm:mt-8 sm:w-36">
            <DecorativeDivider />
          </div>
        ) : null}

        <div
          className={
            gifts.length === 1
              ? "mx-auto mt-10 max-w-md sm:mt-14"
              : "mt-10 grid min-w-0 gap-8 sm:mt-14 lg:grid-cols-2 lg:gap-12"
          }
        >
          {gifts.map((gift) => (
            <GiftRecipient
              key={gift.id}
              gift={gift}
              labels={labels}
              qrAlt={qrAlt(gift, labels)}
            />
          ))}
        </div>
      </MotionReveal>
    </SectionContainer>
  );
}
