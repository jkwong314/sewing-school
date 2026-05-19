import { notFound } from "next/navigation";
import { PageStub } from "@/components/PageStub";

const projects: Record<string, { title: string; blurb: string }> = {
  "hem-jeans": {
    title: "Hem jeans — keep the original hem",
    blurb: "The classic trick: shorten store-bought jeans while keeping the factory hem intact. Looks like they always fit you.",
  },
  "ruffle-skirt": {
    title: "Ruffle skirt",
    blurb: "A two-rectangle skirt with a gathered top edge and an elastic waistband. The fastest way to learn ruffles.",
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects[slug];
  if (!p) notFound();
  return <PageStub eyebrow="Project" title={p.title} blurb={p.blurb} />;
}
