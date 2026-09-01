import type { Metadata } from "next";

const siteUrl = "https://sut-ds.github.io";
const ogImageUrl = "/og.png";

/**
 * Helper to generate complete metadata with canonical URL, description, and OG tags for a page.
 * Includes hreflang support for multi-language variants.
 * Uses the given pathname (without leading/trailing slashes for normalization).
 */
export function generatePageMetadata(
  title: string,
  description?: string,
  pathname = "/"
): Metadata {
  // Ensure pathname starts with /
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const fullUrl = `${siteUrl}${normalizedPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: fullUrl,
      languages: {
        "en-US": fullUrl,
        // Add additional language versions here when multi-language support is implemented
        // Example: "fa": `${siteUrl}/fa${normalizedPath}`,
      },
    },
    openGraph: {
      type: "website",
      url: fullUrl,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
