import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteHeader";
import { Tile } from "@/components/Tile";
import { demos } from "@/lib/registry";

export const Route = createFileRoute("/")({ component: Home });

/** A portfolio page: a short note about me, then each component in an equal card that expands on click. */
function Home() {
  return (
    <div className="wrap home">
      <section className="intro">
        <Reveal as="p" className="hey">Hey,</Reveal>
        <Reveal as="h1" delay={70}>
          I build small interfaces <em>that feel alive.</em>
        </Reveal>
        <Reveal as="p" className="lede" delay={140}>
          A quiet corner for interface experiments: clean layouts, careful depth, and the tiny moving parts that make a
          product feel considered. Everything below is live, so go ahead and use it.
        </Reveal>
      </section>

      <main id="work" className="tiles">
        {demos.map((demo, i) => (
          <Reveal as="section" className={`tile tile-${demo.slug}`} id={demo.slug} key={demo.slug} delay={i * 60}>
            <h2 className="sr-only">{demo.title}</h2>
            <Tile demo={demo} />
          </Reveal>
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}
