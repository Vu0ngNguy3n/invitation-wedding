import type { MetadataRoute } from "next";
import { weddingData } from "@/config/weddingData";
import { invitationCanonicalUrl } from "@/utils/seo";

export default function robots(): MetadataRoute.Robots {
  const canonical = invitationCanonicalUrl(weddingData);

  if (!canonical) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    host: canonical.origin,
    sitemap: new URL("/sitemap.xml", canonical.origin).href,
  };
}
