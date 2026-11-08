import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="top">
      <Link className="mark" to="/" aria-label="amey, home">
        <i aria-hidden="true" />
        amey.
      </Link>
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
