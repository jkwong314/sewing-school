import { notFound } from "next/navigation";
import { PageStub } from "@/components/PageStub";

const topics: Record<string, { title: string; blurb: string }> = {
  needles: { title: "Needle guide", blurb: "Sizes (60/8 to 110/18), types (universal, ballpoint, denim, leather, microtex), and which fabrics they pair with." },
  threads: { title: "Thread guide", blurb: "All-purpose polyester, cotton, silk, heavy-duty — what each is for and which to keep on hand." },
  fabrics: { title: "Fabric guide", blurb: "Weight, stretch, and recommended needle + thread combos for everything from chiffon to denim." },
  troubleshooting: { title: "Troubleshooting", blurb: "Skipped stitches, puckering, thread breaks, bird&rsquo;s nests — what each symptom usually means and how to fix it." },
};

export function generateStaticParams() {
  return Object.keys(topics).map((topic) => ({ topic }));
}

export default async function ReferencePage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = topics[topic];
  if (!t) notFound();
  return <PageStub eyebrow="Reference" title={t.title} blurb={t.blurb} />;
}
