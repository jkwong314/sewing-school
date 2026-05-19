import { notFound } from "next/navigation";
import { PageStub } from "@/components/PageStub";

const setup: Record<string, { title: string; blurb: string }> = {
  threading: { title: "Threading your machine", blurb: "Step-by-step: top thread path from spool to needle, then loading and inserting the bobbin." },
  "tension-and-stitch-length": { title: "Tension & stitch length", blurb: "What the dials do, how to test on scrap fabric, and how to read a balanced stitch." },
};

export function generateStaticParams() {
  return Object.keys(setup).map((slug) => ({ slug }));
}

export default async function SetupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = setup[slug];
  if (!s) notFound();
  return <PageStub eyebrow="Setup" title={s.title} blurb={s.blurb} />;
}
