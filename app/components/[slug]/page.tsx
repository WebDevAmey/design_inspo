import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComponentFrame } from "@/components/ComponentFrame";
import { ArrowUpRight, SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { demos, getDemo } from "@/lib/registry";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const demo = getDemo((await params).slug);
  return demo ? { title: demo.title, description: demo.blurb } : {};
}

export default async function ComponentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  const i = demos.findIndex((d) => d.slug === slug);
  const prev = demos[(i - 1 + demos.length) % demos.length];
  const next = demos[(i + 1) % demos.length];

  return (
    <div className="wrap wide">
      <SiteHeader />

      <section className="detail">
        <Link className="back" href="/#work">
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

      <ComponentFrame demo={demo} full />

      <nav className="pager" aria-label="More components">
        <Link href={`/components/${prev.slug}`}>← {prev.title}</Link>
        <a href={demo.src} target="_blank" rel="noopener noreferrer" className="raw">
          Raw page <ArrowUpRight />
        </a>
        <Link href={`/components/${next.slug}`}>{next.title} →</Link>
      </nav>

      <SiteFooter />
    </div>
  );
}
