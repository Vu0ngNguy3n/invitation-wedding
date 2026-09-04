import Image from "next/image";
import type { WeddingGift } from "@/types/wedding";
import { CopyAccountButton } from "@/components/gifts/CopyAccountButton";
import type { GiftFieldLabels } from "@/components/gifts/giftUi";
import { PaperSurface } from "@/components/ui/PaperSurface";
import { existingPublicAsset } from "@/utils/publicAsset";
import { filledText } from "@/utils/text";

type GiftRecipientProps = {
  gift: WeddingGift;
  labels: GiftFieldLabels;
  qrAlt: string;
};

function GiftDetail({
  label,
  value,
  large,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div>
      <p className="type-overline text-accent-gold">{label}</p>
      <p
        className={
          large
            ? "type-heading mt-2 w-full break-all px-1 tracking-wide text-paper-cream select-all sm:tracking-widest"
            : "type-body mt-1 text-pretty break-words text-paper-cream"
        }
      >
        {value}
      </p>
    </div>
  );
}

export function GiftRecipient({
  gift,
  labels,
  qrAlt,
}: GiftRecipientProps) {
  const recipientName = filledText(gift.name);
  const bankName = filledText(gift.bankName);
  const accountName = filledText(gift.accountName);
  const accountNumber = filledText(gift.accountNumber);
  const qrImage = existingPublicAsset(gift.qrImage);
  const transferNote = filledText(gift.transferNote);
  const role = gift.person === "bride" ? labels.brideRole : labels.groomRole;

  return (
    <PaperSurface
      as="article"
      className="flex h-full min-w-0 flex-col items-center px-4 py-8 text-center sm:px-8 sm:py-10"
    >
        {recipientName ? (
          <>
            <p className="type-overline text-muted">{role}</p>
            <h3 className="type-script mt-2 max-w-full break-words text-accent-gold">
              {recipientName}
            </h3>
          </>
        ) : (
          <h3 className="type-overline text-muted">{role}</h3>
        )}

      {qrImage ? (
        <figure className="foil-border mt-8 w-full max-w-[min(100%,220px)] bg-paper-cream p-3 sm:max-w-[240px]">
          <div className="relative aspect-square">
            <Image
              src={qrImage}
              alt={qrAlt}
              fill
              sizes="(max-width: 639px) 196px, 216px"
              className="object-contain"
            />
          </div>
        </figure>
      ) : null}

      <div className="mt-8 flex w-full min-w-0 max-w-sm flex-col items-center gap-5 px-1">
        {bankName ? (
          <GiftDetail label={labels.bank} value={bankName} />
        ) : null}
        {accountName ? (
          <GiftDetail label={labels.accountName} value={accountName} />
        ) : null}
        {accountNumber ? (
          <>
            <GiftDetail
              label={labels.accountNumber}
              value={accountNumber}
              large
            />
            <CopyAccountButton
              accountNumber={accountNumber}
              copyLabel={labels.copy}
              copiedLabel={labels.copied}
              failedLabel={labels.copyFailed}
            />
          </>
        ) : null}
        {transferNote ? (
          <GiftDetail label={labels.transferNote} value={transferNote} />
        ) : null}
      </div>
    </PaperSurface>
  );
}
