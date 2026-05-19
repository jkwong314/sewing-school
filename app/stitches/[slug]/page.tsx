import { notFound } from "next/navigation";
import { PageStub } from "@/components/PageStub";

const stitches: Record<string, { title: string; blurb: string }> = {
  straight: { title: "Straight stitch", blurb: "The foundation of machine sewing. A single line of evenly spaced stitches — used for seams, topstitching, and most construction." },
  zigzag: { title: "Zigzag stitch", blurb: "A side-to-side stitch that flexes with stretchy fabric and finishes raw edges." },
  buttonhole: { title: "Buttonhole", blurb: "A tight rectangle of zigzag stitching with reinforced bartacks at each end — the slit is cut between them after sewing." },
};

export function generateStaticParams() {
  return Object.keys(stitches).map((slug) => ({ slug }));
}

export default async function StitchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stitches[slug];
  if (!s) notFound();
  return <PageStub eyebrow="Stitch" title={s.title} blurb={s.blurb} />;
}
