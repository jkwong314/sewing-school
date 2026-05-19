import { notFound } from "next/navigation";
import Link from "next/link";
import { PageStub } from "@/components/PageStub";
import { MdxContent } from "@/components/MdxContent";
import { Simulator } from "@/components/Simulator";
import { STITCH_CONFIGS, type StitchKind } from "@/components/Simulator/stitches";
import { readDoc, listSlugs } from "@/lib/content";
import { projectsUsingStitch } from "@/lib/cross-links";

const stubs: Record<string, { title: string; blurb: string }> = {
  straight: {
    title: "Straight stitch",
    blurb: "The foundation of machine sewing. A single line of evenly spaced stitches — used for seams, topstitching, and most construction.",
  },
  zigzag: {
    title: "Zigzag stitch",
    blurb: "A side-to-side stitch that flexes with stretchy fabric and finishes raw edges.",
  },
  buttonhole: {
    title: "Buttonhole",
    blurb: "A tight rectangle of zigzag stitching with reinforced bartacks at each end — the slit is cut between them after sewing.",
  },
};

export function generateStaticParams() {
  const fromContent = listSlugs("stitches");
  const all = new Set([...fromContent, ...Object.keys(stubs)]);
  return Array.from(all).map((slug) => ({ slug }));
}

function isKnownStitch(slug: string): slug is StitchKind {
  return slug in STITCH_CONFIGS;
}

export default async function StitchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = readDoc("stitches", slug);
  const hasSimulator = isKnownStitch(slug);
  const related = hasSimulator ? projectsUsingStitch(slug) : [];

  const title = doc?.frontmatter.title ?? stubs[slug]?.title;
  const summary = doc?.frontmatter.summary ?? stubs[slug]?.blurb;

  if (!title) {
    if (hasSimulator) {
      // Fall through to a minimal page that still renders the simulator
    } else {
      notFound();
    }
  }

  // If there's no content AND no simulator, just show the stub
  if (!hasSimulator && !doc) {
    const stub = stubs[slug];
    if (!stub) notFound();
    return <PageStub eyebrow="Stitch" title={stub.title} blurb={stub.blurb} />;
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/stitches"
        className="font-mono text-xs uppercase tracking-widest text-brown hover:text-brown-deep inline-flex items-center mb-6"
      >
        ← All stitches
      </Link>
      <p className="font-mono text-xs uppercase tracking-widest text-brown mb-2">Stitch</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">{title}</h1>
      {summary && <p className="mt-4 text-ink-soft text-lg leading-relaxed">{summary}</p>}

      {hasSimulator && <Simulator stitch={slug} />}

      {doc?.body && (
        <div className="mt-6">
          <MdxContent source={doc.body} />
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-10 dashed-border bg-white p-5">
          <h2 className="font-mono text-xs uppercase tracking-widest text-brown-deep mb-3">
            Used in these projects
          </h2>
          <ul className="space-y-2">
            {related.map((p) => (
              <li key={p.frontmatter.slug}>
                <Link
                  href={`/projects/${p.frontmatter.slug}`}
                  className="text-ink hover:text-brown-deep underline decoration-blush decoration-2 underline-offset-4"
                >
                  {p.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
