import { notFound } from "next/navigation";
import Link from "next/link";
import { PageStub } from "@/components/PageStub";
import { MdxContent } from "@/components/MdxContent";
import { MaterialsTable } from "@/components/MaterialsTable";
import { readDoc, listSlugs } from "@/lib/content";

const stubs: Record<string, { title: string; blurb: string }> = {
  "hem-jeans": {
    title: "Hem jeans — keep the original hem",
    blurb: "The classic trick: shorten store-bought jeans while keeping the factory hem intact.",
  },
  "ruffle-skirt": {
    title: "Ruffle skirt",
    blurb: "A two-rectangle skirt with a gathered top edge and an elastic waistband.",
  },
};

export function generateStaticParams() {
  const fromContent = listSlugs("projects");
  const all = new Set([...fromContent, ...Object.keys(stubs)]);
  return Array.from(all).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = readDoc("projects", slug);

  if (doc) {
    const fm = doc.frontmatter;
    return (
      <article className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/projects" className="font-mono text-xs uppercase tracking-widest text-brown hover:text-brown-deep inline-flex items-center mb-6">
          ← All projects
        </Link>
        <p className="font-mono text-xs uppercase tracking-widest text-brown mb-2">Project</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">{fm.title}</h1>
        {fm.summary && <p className="mt-4 text-ink-soft text-lg leading-relaxed">{fm.summary}</p>}
        <div className="font-mono text-xs uppercase tracking-widest text-ink-soft mt-4">
          {fm.difficulty && <>{fm.difficulty}</>}
          {fm.timeMinutes && <> · {fm.timeMinutes} min</>}
        </div>
        {fm.materials && <MaterialsTable materials={fm.materials} />}
        <div className="mt-6"><MdxContent source={doc.body} /></div>
      </article>
    );
  }

  const stub = stubs[slug];
  if (!stub) notFound();
  return <PageStub eyebrow="Project" title={stub.title} blurb={stub.blurb} />;
}
