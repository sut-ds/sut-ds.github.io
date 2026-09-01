import type { Metadata, Viewport } from "next";

import { SchemaScripts } from "@/components/schema/SchemaScripts";
import { SiteAtmosphere } from "@/components/chrome/SiteAtmosphere";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SkipLink } from "@/components/chrome/SkipLink";
import { getCourse } from "@/lib/content";
import { fraunces, ibmPlexMono, sourceSans3 } from "@/lib/fonts";

import "@/styles/tokens.css";
import "@/styles/global.css";

const course = getCourse();
const siteUrl = "https://sut-ds.github.io";

export const viewport: Viewport = {
  themeColor: "#071528",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: course.title,
    template: `%s · ${course.title}`,
  },
  description: course.description,
  applicationName: course.shortName ?? course.title,
  authors: [{ name: course.institution }],
  creator: course.department
    ? `${course.department}, ${course.institution}`
    : course.institution,
  keywords: [
    "Foundations of Data Science",
    "Data Science",
    "Sharif University of Technology",
    "course website",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      // Add additional language versions here when multi-language support is implemented
      // Example: "fa": "https://sut-ds.github.io/fa/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: course.title,
    title: course.title,
    description: course.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${course.title} — ${course.institution}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: course.title,
    description: course.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans3.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <SchemaScripts />
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          href="/opensearch.xml"
          title={course.title}
        />
      </head>
      <body>
        <div className="site-shell">
          <SiteAtmosphere />
          <SkipLink />
          <SiteHeader />
          <main id="main-content" className="site-main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
