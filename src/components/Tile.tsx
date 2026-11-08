import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ComponentFrame } from "@/components/ComponentFrame";
import type { Demo } from "@/lib/registry";

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

/**
 * A component card that expands in place to fill the screen. The card itself becomes fixed and is
 * animated from its old box with a FLIP transform, so the live component inside never reloads.
 */
export function Tile({ demo }: { demo: Demo }) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef<DOMRect | null>(null);
  const [open, setOpen] = useState(false);

  const toggle = useCallback((next: boolean) => {
    if (ref.current) first.current = ref.current.getBoundingClientRect();
    setOpen(next);
  }, []);

  // FLIP: measure the new box, invert to the old one, then play to identity (transform only)
  useLayoutEffect(() => {
    const el = ref.current, a = first.current;
    if (!el || !a) return;
    first.current = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const b = el.getBoundingClientRect();
    const dx = a.left - b.left, dy = a.top - b.top, sx = a.width / b.width, sy = a.height / b.height;
    el.animate(
      [{ transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` }, { transform: "none" }],
      { duration: open ? 380 : 260, easing: EASE_OUT },
    );
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && toggle(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lock");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lock");
    };
  }, [open, toggle]);

  return (
    <>
      {open && <div className="tile-scrim" onClick={() => toggle(false)} aria-hidden="true" />}
      <div className="tile-slot">
        <div ref={ref} className={`tile-card${open ? " is-open" : ""}`} role={open ? "dialog" : undefined} aria-modal={open || undefined} aria-label={demo.title}>
          <ComponentFrame demo={demo} bare />
          <button
            type="button"
            className="tile-expand"
            onClick={() => toggle(!open)}
            aria-label={open ? `Close ${demo.title}` : `Expand ${demo.title}`}
            aria-expanded={open}
          >
            {open ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M3 3l6 6M9 3 3 9" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 1.5h3.5V5M5 10.5H1.5V7M10.5 1.5 7 5M1.5 10.5 5 7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
