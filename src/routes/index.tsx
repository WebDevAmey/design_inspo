import { Link, createFileRoute } from "@tanstack/react-router";
import { ComponentFrame } from "@/components/ComponentFrame";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight, SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { demos } from "@/lib/registry";

export const Route = createFileRoute("/")({ component: Home });

/** A portfolio page: a short note about me, then the components in a bento grid with no labels. */
function Home() {
  return (
    <div className="wrap home">
      <SiteHeader />

      <section className="intro">
        <Reveal as="p" className="hey">Hey,</Reveal>
        <Reveal as="h1" delay={70}>
          I build small interfaces <em>that feel alive.</em>
        </Reveal>
        <Reveal as="p" className="lede" delay={140}>
          A quiet corner for interface experiments: clean layouts, careful depth, and the tiny moving parts that make a
          product feel considered. Everything below is live, so go ahead and use it.
        </Reveal>
        <Reveal as="p" className="contact" delay={210}>
          <a href="https://github.com/WebDevAmey" target="_blank" rel="noopener noreferrer">
            github.com/WebDevAmey
          </a>
        </Reveal>
      </section>

      <main id="work" className="bento">
        {demos.map((demo, i) => (
          <Reveal as="section" className={`tile tile-${demo.slug}`} id={demo.slug} key={demo.slug} delay={i * 60}>
            <h2 className="sr-only">{demo.title}</h2>
            <ComponentFrame demo={demo} bare />
            <Link className="tile-open" to="/components/$slug" params={{ slug: demo.slug }} aria-label={`Open ${demo.title}`}>
              <ArrowUpRight />
            </Link>
          </Reveal>
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}
