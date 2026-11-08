import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { Demo } from "@/lib/registry";

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const PAD = 28; // breathing room around the miniature inside its card

type Box = { left: number; top: number; width: number; height: number; scale: number };

/**
 * A miniature of a live component. The demo is always laid out at its own design size and scaled
 * with a transform, so the card shows the real thing, small. Clicking lifts the same element out of
 * the card into the middle of the screen (FLIP, transform only), so it never reloads and keeps its state.
 */
export function Tile({ demo }: { demo: Demo }) {
  const { w: W, h: H } = demo.size;
  const cardRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const first = useRef<DOMRect | null>(null);
  const [open, setOpen] = useState(false);
  const [moving, setMoving] = useState(false);
  const [thumb, setThumb] = useState<Box | null>(null);
  const [full, setFull] = useState<Box | null>(null);
  const [ready, setReady] = useState(false);
  const [run, setRun] = useState(0);

  // Miniature: fit the design size inside the card
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const measure = () => {
      const cw = card.clientWidth, ch = card.clientHeight;
      const s = Math.min((cw - PAD * 2) / W, (ch - PAD * 2) / H);
      setThumb({ width: W * s, height: H * s, left: (cw - W * s) / 2, top: (ch - H * s) / 2, scale: s });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(card);
    return () => ro.disconnect();
  }, [W, H]);

  // Expanded: as large as fits in the middle of the screen, never above its design size
  const fitScreen = useCallback(() => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const s = Math.min(1, (vw - 32) / W, (vh * 0.88) / H);
    setFull({ width: W * s, height: H * s, left: (vw - W * s) / 2, top: (vh - H * s) / 2, scale: s });
  }, [W, H]);

  const toggle = useCallback(
    (next: boolean) => {
      if (stageRef.current) first.current = stageRef.current.getBoundingClientRect();
      if (next) fitScreen();
      setOpen(next);
    },
    [fitScreen],
  );

  // FLIP between the card and the centre of the screen. Uniform scale, because both boxes share the demo's aspect ratio.
  useLayoutEffect(() => {
    const el = stageRef.current, a = first.current;
    if (!el || !a) return;
    first.current = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const b = el.getBoundingClientRect();
    setMoving(true);
    const anim = el.animate(
      [{ transform: `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width})` }, { transform: "none" }],
      { duration: open ? 420 : 300, easing: EASE_OUT },
    );
    anim.onfinish = anim.oncancel = () => setMoving(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && toggle(false);
    window.addEventListener("resize", fitScreen);
    document.addEventListener("keydown", onKey);
    // Escape must also work while the pointer or focus is inside the component's own document
    let inner: Window | null = null;
    try { inner = frameRef.current?.contentWindow ?? null; inner?.addEventListener("keydown", onKey); } catch { inner = null; }
    document.documentElement.classList.add("lock");
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("resize", fitScreen);
      document.removeEventListener("keydown", onKey);
      try { inner?.removeEventListener("keydown", onKey); } catch { /* frame gone */ }
      document.documentElement.classList.remove("lock");
      cardRef.current?.focus({ preventScroll: true });
    };
  }, [open, toggle, fitScreen]);

  const box = open ? full : thumb;
  const stageStyle: CSSProperties | undefined = box
    ? { position: open ? "fixed" : "absolute", left: box.left, top: box.top, width: box.width, height: box.height }
    : undefined;

  return (
    <>
      <div className={`scrim${open ? " on" : ""}`} onClick={() => toggle(false)} aria-hidden="true" />
      <div className="tile-cell">
        <button ref={cardRef} type="button" className="card" onClick={() => toggle(true)} aria-label={`Open ${demo.title}`} disabled={open} />
        <div
          ref={stageRef}
          className={`stage${open ? " is-open" : ""}${moving ? " is-moving" : ""}`}
          style={stageStyle}
          role={open ? "dialog" : undefined}
          aria-modal={open || undefined}
          aria-label={open ? demo.title : undefined}
          aria-hidden={!open || undefined}
        >
          {!ready && <div className="stage-load" aria-hidden="true" />}
          <iframe
            key={run}
            ref={frameRef}
            src={demo.src}
            title={demo.title}
            tabIndex={open ? 0 : -1}
            allow="autoplay"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={() => setReady(true)}
            style={{ width: W, height: H, transform: `scale(${box?.scale ?? 0.0001})` }}
          />
          {open && (
            <div className="stage-tools">
              <button
                type="button"
                className="tool"
                onClick={() => {
                  setReady(false);
                  setRun((n) => n + 1);
                }}
                aria-label={`Replay ${demo.title}`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 6a4 4 0 1 0 1.2-2.85M2 1.5v2.2h2.2" />
                </svg>
              </button>
              <button ref={closeRef} type="button" className="tool" onClick={() => toggle(false)} aria-label={`Close ${demo.title}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 3l6 6M9 3 3 9" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
