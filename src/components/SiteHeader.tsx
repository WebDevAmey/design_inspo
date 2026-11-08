import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="top">
      <Link className="mark" to="/" aria-label="amey, home">
        <i aria-hidden="true" />
        amey.
      </Link>
      <nav className="nav" aria-label="Primary">
        <Link to="/" hash="work">
          Components
        </Link>
        <a href="https://github.com/WebDevAmey" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="foot">
      <span className="hand">more soon.</span>
      <span>Built by Amey</span>
    </footer>
  );
}

export const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 8.5 8.5 3.5M4 3.5h4.5V8" />
  </svg>
);
