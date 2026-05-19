import { notFound } from "next/navigation";
import Link from "next/link";
import { PageStub } from "@/components/PageStub";
import { MdxContent } from "@/components/MdxContent";
import { readDoc, listSlugs } from "@/lib/content";

const stubs: Record<string, { title: string; blurb: string }> = {
  threading: { title: "Threading your machine", blurb: "Step-by-step: top thread path and bobbin loading." },
  "tension-and-stitch-length": { title: "Tension & stitch length", blurb: "What the dials do and how to test on scrap fabric." },
};

export function generateStaticParams() {
  const fromContent = listSlugs("setup");
  const all = new Set([...fromContent, ...Object.keys(stubs)]);
  return Array.from(all).map((slug) => ({ slug }));
}

export default async function SetupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = readDoc("setup", slug);

  if (doc) {
    const fm = doc.frontmatter;
    return (
      <article className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/setup" className="font-mono text-xs uppercase tracking-widest text-brown hover:text-brown-deep inline-flex items-center mb-6">
          ← All setup guides
        </Link>
        <p className="font-mono text-xs uppercase tracking-widest text-brown mb-2">Setup</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">{fm.title}</h1>
        {fm.summary && <p className="mt-4 text-ink-soft text-lg leading-relaxed">{fm.summary}</p>}
        <div className="mt-6"><MdxContent source={doc.body} /></div>
      </article>
    );
  }

  const stub = stubs[slug];
  if (!stub) notFound();
  return <PageStub eyebrow="Setup" title={stub.title} blurb={stub.blurb} />;
}
