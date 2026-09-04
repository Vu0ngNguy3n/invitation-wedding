import type { MetadataRoute } from "next";
import { weddingData } from "@/config/weddingData";
import { invitationCanonicalUrl } from "@/utils/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const canonical = invitationCanonicalUrl(weddingData);

  if (!canonical) {
    return [];
  }

  return [
    {
      url: canonical.href,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
