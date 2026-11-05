# design_inspo

A small showcase page for two interface components.

| Component | File | What it is |
|---|---|---|
| Paper Plane | `components/paper-plane.html` | A message composer. Sending collapses the card, prints the note, folds it into a paper plane and flies it into the Send button. Plain HTML, CSS and JS. |
| Pocket Player | `components/pocket-player.html` | A pill-shaped music player with brushed-metal buttons and a pixel LCD. React (loaded from a CDN) and the Web Audio API. |

`index.html` is the showcase. It embeds both components in frames and links to each one on its own.

## Run it

It is static, so any file server works:

```sh
npx serve .
```

To host it on GitHub Pages, open the repository's Settings, then Pages, and publish from the `main` branch root.
