import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/public-sans";
import "@fontsource/caveat/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "amey. — design inspo", template: "%s — amey." },
  description:
    "A small collection of interface experiments: a paper plane send animation and a pocket music player.",
  openGraph: {
    title: "amey. — design inspo",
    description: "Interface experiments with small moving parts.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfbfb",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body>{children}</body>
    </html>
  );
}
