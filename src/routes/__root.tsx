/// <reference types="vite/client" />
import type { ReactNode } from "react";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import "@fontsource-variable/public-sans";
import "@fontsource-variable/geist-mono";
import "@fontsource/caveat/500.css";
import styles from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#fbfbfb" },
      { name: "color-scheme", content: "light" },
      { title: "amey. — design inspo" },
      {
        name: "description",
        content: "A small collection of interface experiments: a paper plane send animation, a pocket music player and a cassette deck.",
      },
      { property: "og:title", content: "amey. — design inspo" },
      { property: "og:description", content: "Interface experiments with small moving parts." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
