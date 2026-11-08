import { Link, createFileRoute } from "@tanstack/react-router";
import { ComponentFrame } from "@/components/ComponentFrame";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/SiteHeader";
import { demos } from "@/lib/registry";

export const Route = createFileRoute("/")({ component: Home });

/** The home page is only the components, laid out as a bento grid. Each tile opens its full page. */
function Home() {
  return (
    <main className="bento">
      <h1 className="sr-only">Interface components by Amey</h1>
      {demos.map((demo, i) => (
        <Reveal as="section" className={`tile tile-${demo.slug}`} id={demo.slug} key={demo.slug} delay={i * 60}>
          <ComponentFrame demo={demo} bare />
          <Link className="tile-open" to="/components/$slug" params={{ slug: demo.slug }} aria-label={`Open ${demo.title}`}>
            <ArrowUpRight />
          </Link>
        </Reveal>
      ))}
    </main>
  );
}
