export type Demo = {
  slug: string;
  index: string;
  title: string;
  blurb: string;
  tags: string[];
  /** Standalone HTML page rendered inside a sandboxed frame. */
  src: string;
  /** Frame height in px on desktop and on phones. */
  height: { desktop: number; mobile: number };
  hint?: string;
};

export const demos: Demo[] = [
  {
    slug: "paper-plane",
    index: "01",
    title: "Paper Plane",
    blurb:
      "A message composer that sends itself like a letter. The card collapses to a bar, prints the note, folds it into a paper plane and flies it into the Send button.",
    tags: ["micro-interaction", "3D transforms", "canvas trail"],
    src: "/demos/paper-plane.html",
    height: { desktop: 760, mobile: 720 },
    hint: "Press Send",
  },
  {
    slug: "pocket-player",
    index: "02",
    title: "Pocket Player",
    blurb:
      "A pill-shaped digital music player with brushed-metal buttons and a pixel LCD whose cover art resolves on every track change. Plays built-in tracks, or drop in your own audio.",
    tags: ["skeuomorphic", "web audio", "pixel art"],
    src: "/demos/pocket-player.html",
    height: { desktop: 400, mobile: 300 },
  },
];

export const getDemo = (slug: string) => demos.find((d) => d.slug === slug);
