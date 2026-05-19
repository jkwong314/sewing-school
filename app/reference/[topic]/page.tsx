import { notFound } from "next/navigation";
import Link from "next/link";
import { PageStub } from "@/components/PageStub";
import { MdxContent } from "@/components/MdxContent";
import { readDoc, listSlugs } from "@/lib/content";

const stubs: Record<string, { title: string; blurb: string }> = {
  needles: { title: "Needle guide", blurb: "Sizes, types, and which fabrics they pair with." },
  threads: { title: "Thread guide", blurb: "All-purpose polyester, cotton, silk, heavy-duty — what each is for." },
  fabrics: { title: "Fabric guide", blurb: "Weight, stretch, and recommended needle + thread combos." },
  troubleshooting: { title: "Troubleshooting", blurb: "Skipped stitches, puckering, thread breaks — what each symptom usually means." },
};

export function generateStaticParams() {
  const fromContent = listSlugs("reference");
  const all = new Set([...fromContent, ...Object.keys(stubs)]);
  return Array.from(all).map((topic) => ({ topic }));
}

export default async function ReferencePage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const doc = readDoc("reference", topic);

  if (doc) {
    const fm = doc.frontmatter;
    return (
      <article className="mx-auto max-w-4xl px-6 py-12">
        <Link href="/reference" className="font-mono text-xs uppercase tracking-widest text-brown hover:text-brown-deep inline-flex items-center mb-6">
          ← All reference
        </Link>
        <p className="font-mono text-xs uppercase tracking-widest text-brown mb-2">Reference</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">{fm.title}</h1>
        {fm.summary && <p className="mt-4 text-ink-soft text-lg leading-relaxed">{fm.summary}</p>}
        <div className="mt-6"><MdxContent source={doc.body} /></div>
      </article>
    );
  }

  const stub = stubs[topic];
  if (!stub) notFound();
  return <PageStub eyebrow="Reference" title={stub.title} blurb={stub.blurb} />;
}
