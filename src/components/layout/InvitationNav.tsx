import { InvitationNavMenu } from "@/components/layout/InvitationNavMenu";
import { weddingData } from "@/config/weddingData";
import { isInvitationAnchorAvailable } from "@/utils/sectionVisibility";
import { givenInitial } from "@/utils/text";

type InvitationNavProps = {
  className?: string;
};

export function InvitationNav({ className }: InvitationNavProps) {
  const items = weddingData.navigation.filter((item) =>
    isInvitationAnchorAvailable(item.id),
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <InvitationNavMenu
      items={items}
      brideInitial={givenInitial(weddingData.couple.bride.name)}
      groomInitial={givenInitial(weddingData.couple.groom.name)}
      className={className}
    />
  );
}
