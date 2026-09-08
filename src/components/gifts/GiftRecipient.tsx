import Image from "next/image";
import type { WeddingGift } from "@/types/wedding";
import type { GiftFieldLabels } from "@/components/gifts/giftUi";
import { GiftCopyButton } from "@/components/gifts/GiftCopyButton";
import { BotanicalDecoration } from "@/components/decorative/BotanicalDecoration";
import { PaperSurface } from "@/components/ui/PaperSurface";
import { existingPublicAsset } from "@/utils/publicAsset";
import { filledText } from "@/utils/text";

type GiftRecipientProps = {
  gift: WeddingGift;
  labels: GiftFieldLabels;
  qrAlt: string;
};

function GiftDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="type-overline text-accent-gold">{label}</p>
      <p className="type-body mt-1 text-pretty break-words text-ink">{value}</p>
    </div>
  );
}

export function GiftRecipient({ gift, labels, qrAlt }: GiftRecipientProps) {
  const recipientName = filledText(gift.name);
  const bankName = filledText(gift.bankName);
  const accountName = filledText(gift.accountName);
  const accountNumber = filledText(gift.accountNumber);
  const transferNote = filledText(gift.transferNote);
  const qrImage = existingPublicAsset(gift.qrImage);
  const role = gift.person === "bride" ? labels.brideRole : labels.groomRole;

  return (
    <PaperSurface
      as="article"
      className="flex h-full min-w-0 flex-col items-center px-5 py-9 text-center sm:px-8 sm:py-11"
    >
      <BotanicalDecoration className="flex w-full flex-col items-center px-1 py-2">
        {recipientName ? (
          <>
            <p className="type-overline text-ink-muted">{role}</p>
            <h3 className="type-script mt-2 max-w-full break-words text-accent-gold">
              {recipientName}
            </h3>
          </>
        ) : (
          <h3 className="type-overline text-ink-muted">{role}</h3>
        )}

        {qrImage ? (
          <figure className="foil-border mt-8 w-full max-w-[min(100%,200px)] bg-ivory p-3 sm:max-w-[220px]">
            <div className="relative aspect-square">
              <Image
                src={qrImage}
                alt={qrAlt}
                fill
                sizes="(max-width: 639px) 176px, 196px"
                className="object-contain"
              />
            </div>
          </figure>
        ) : null}

        <div className="mt-8 flex w-full min-w-0 max-w-sm flex-col items-center gap-5 px-1">
          {bankName ? <GiftDetail label={labels.bank} value={bankName} /> : null}
          {accountName ? (
            <GiftDetail label={labels.accountName} value={accountName} />
          ) : null}
          {accountNumber ? (
            <GiftDetail label={labels.accountNumber} value={accountNumber} />
          ) : null}
          {transferNote ? (
            <GiftDetail label={labels.transferNote} value={transferNote} />
          ) : null}
        </div>

        {accountNumber ? (
          <div className="mt-8">
            <GiftCopyButton
              value={accountNumber}
              copyLabel={labels.copy}
              copiedLabel={labels.copied}
              failedLabel={labels.copyFailed}
            />
          </div>
        ) : null}
      </BotanicalDecoration>
    </PaperSurface>
  );
}
