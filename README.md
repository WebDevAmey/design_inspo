# design_inspo

A small showcase for interface components, built with Next.js (App Router), React and TypeScript.

| Component | Demo page | What it is |
|---|---|---|
| Paper Plane | `public/demos/paper-plane.html` | A message composer. Sending collapses the card, prints the note, folds it into a paper plane and flies it into the Send button. Plain HTML, CSS and JS. |
| Pocket Player | `public/demos/pocket-player.html` | A pill-shaped music player with brushed-metal buttons and a pixel LCD. React (loaded from a CDN) and the Web Audio API. |

## How it fits together

- `lib/registry.ts` lists every component (title, blurb, tags, demo path, frame height). The home page and the `/components/[slug]` pages are generated from it.
- `components/ComponentFrame.tsx` renders a demo in a sandboxed frame, so each component keeps its own CSS, fixed layers and scripts, with a loading state and a Replay button.
- `app/` holds the pages. `/` is the showcase and `/components/<slug>` shows one component large.

To add a component, drop its standalone HTML in `public/demos/` and add one entry to `lib/registry.ts`.

## Run it

```sh
npm install
npm run dev
```

## Deploy

Vercel detects Next.js automatically. Push to `main` to update the production deployment.
