import Link from "next/link";
import { ComponentFrame } from "@/components/ComponentFrame";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight, SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { demos } from "@/lib/registry";

export default function Home() {
  return (
    <div className="wrap">
      <SiteHeader />

      <section className="intro">
        <Reveal as="p" className="hey">Hey,</Reveal>
        <Reveal as="h1" delay={70}>
          I build small interfaces <em>that feel alive.</em>
        </Reveal>
        <Reveal as="p" className="lede" delay={140}>
          A quiet corner for interface experiments: clean layouts, careful depth, and the tiny moving parts that make a
          product feel considered. Two of them live here, and you can use both.
        </Reveal>
        <Reveal as="p" className="contact" delay={210}>
          <span className="pill">{demos.length} components</span>
          <a href="https://github.com/WebDevAmey" target="_blank" rel="noopener noreferrer">
            github.com/WebDevAmey
          </a>
        </Reveal>
      </section>

      <main id="work">
        <Reveal as="h2" className="label">
          <span>Components</span>
          <span>{String(demos.length).padStart(2, "0")}</span>
        </Reveal>

        {demos.map((demo) => (
          <Reveal as="article" className="piece" id={demo.slug} key={demo.slug}>
            <header>
              <h2>
                {demo.title} <small>{demo.index}</small>
              </h2>
              <Link className="open" href={`/components/${demo.slug}`}>
                Open full <ArrowUpRight />
              </Link>
              <p>{demo.blurb}</p>
              <div className="tags">
                {demo.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </header>
            <ComponentFrame demo={demo} />
          </Reveal>
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}
