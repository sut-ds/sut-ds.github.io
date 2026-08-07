import localFont from "next/font/local";

/**
 * Self-hosted via @fontsource (OFL) so builds/dev work without Google Fonts access.
 * Display: Fraunces · Sans: Source Sans 3 · Mono: IBM Plex Mono
 */
export const fraunces = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/fraunces/files/fraunces-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/fraunces/files/fraunces-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../node_modules/@fontsource/fraunces/files/fraunces-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
});

export const sourceSans3 = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-source-sans-3",
  display: "swap",
  fallback: ["Segoe UI", "Helvetica Neue", "sans-serif"],
});

export const ibmPlexMono = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "Consolas", "monospace"],
});
