export type Demo = {
  slug: string;
  index: string;
  title: string;
  blurb: string;
  tags: string[];
  /** Standalone HTML page rendered inside a sandboxed frame. */
  src: string;
  /** The size the demo is laid out at. Cards show it scaled down; the expanded view scales it to fit the screen. */
  size: { w: number; h: number };
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
    size: { w: 900, h: 760 },
    hint: "Press Send",
  },
  {
    slug: "cassette-deck",
    index: "02",
    title: "Cassette Deck",
    blurb:
      "A cream cassette deck you load by hand. Eject a tape, pull it out of the side slot, set it down anywhere and slide another one in. Spring-driven motion, piano-key sounds, and your own audio played through the deck's hiss and wow.",
    tags: ["skeuomorphic", "springs and drag", "web audio"],
    src: "/demos/cassette-deck.html",
    size: { w: 1240, h: 660 },
    hint: "Press the first brown key",
  },
  {
    slug: "morph-navbar",
    index: "03",
    title: "Morphing Navbar",
    blurb:
      "One dark shell that morphs between Work, Services and Studio. Work types its pictures in as ASCII and opens them where the pointer enters, Services attaches a connected box, and Studio squeezes gooey cards out of the shell's edge.",
    tags: ["morphing", "gooey springs", "ASCII reveal"],
    src: "/demos/morph-navbar.html",
    size: { w: 1240, h: 760 },
    hint: "Hover Studio",
  },
];

export const getDemo = (slug: string) => demos.find((d) => d.slug === slug);
