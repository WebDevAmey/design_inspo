import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ComponentFrame } from "@/components/ComponentFrame";
import { ArrowUpRight, SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { demos, getDemo } from "@/lib/registry";

export const Route = createFileRoute("/components/$slug")({
  loader: ({ params }) => {
    const demo = getDemo(params.slug);
    if (!demo) throw notFound();
    return demo;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.title} — amey.` }, { name: "description", content: loaderData.blurb }]
      : [],
  }),
  component: ComponentPage,
  notFoundComponent: () => (
    <div className="wrap wide">
      <SiteHeader />
      <section className="detail">
        <Link className="back" to="/" hash="work">
          ← All components
        </Link>
        <h1>Component not found</h1>
      </section>
    </div>
  ),
});

function ComponentPage() {
  const demo = Route.useLoaderData();
  const i = demos.findIndex((d) => d.slug === demo.slug);
  const prev = demos[(i - 1 + demos.length) % demos.length];
  const next = demos[(i + 1) % demos.length];

  return (
    <div className="wrap wide">
      <SiteHeader />

      <section className="detail">
        <Link className="back" to="/" hash="work">
          ← All components
        </Link>
        <h1>
          {demo.title} <small>{demo.index}</small>
        </h1>
        <p className="lede">{demo.blurb}</p>
        <div className="tags">
          {demo.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      <ComponentFrame key={demo.slug} demo={demo} full />

      <nav className="pager" aria-label="More components">
        <Link to="/components/$slug" params={{ slug: prev.slug }}>
          ← {prev.title}
        </Link>
        <a href={demo.src} target="_blank" rel="noopener noreferrer" className="raw">
          Raw page <ArrowUpRight />
        </a>
        <Link to="/components/$slug" params={{ slug: next.slug }}>
          {next.title} →
        </Link>
      </nav>

      <SiteFooter />
    </div>
  );
}
