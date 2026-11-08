import { useState, type CSSProperties } from "react";
import type { Demo } from "@/lib/registry";

/**
 * Renders a demo in its own sandboxed document, so each component keeps its own CSS,
 * fixed layers and scripts without leaking into the page. Replay remounts the frame.
 */
export function ComponentFrame({ demo, full = false, bare = false }: { demo: Demo; full?: boolean; bare?: boolean }) {
  const [run, setRun] = useState(0);
  const [ready, setReady] = useState(false);

  return (
    <div
      className={`frame${full ? " frame-full" : ""}${bare ? " frame-bare" : ""}`}
      style={{ "--h": `${demo.height.desktop}px`, "--hm": `${demo.height.mobile}px` } as CSSProperties}
    >
      {!ready && <div className="frame-load" aria-hidden="true" />}
      <iframe
        key={run}
        src={demo.src}
        title={demo.title}
        loading={full ? "eager" : "lazy"}
        allow="autoplay"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onLoad={() => setReady(true)}
      />
      <div className="frame-bar">
        {demo.hint && !bare && <span className="chip-hint">{demo.hint}</span>}
        <button
          type="button"
          className="replay"
          onClick={() => {
            setReady(false);
            setRun((n) => n + 1);
          }}
          aria-label={`Replay ${demo.title}`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 6a4 4 0 1 0 1.2-2.85M2 1.5v2.2h2.2" />
          </svg>
          {!bare && "Replay"}
        </button>
      </div>
    </div>
  );
}
