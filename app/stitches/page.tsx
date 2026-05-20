import { ProjectCard, ComingSoonCard } from "@/components/ProjectCard";
import { StitchPreview } from "@/components/Illustrations";

export const metadata = { title: "Stitches" };

export default function StitchesIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-brown mb-2">Stitches</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">See how every stitch is made.</h1>
      <p className="mt-4 text-ink-soft max-w-2xl leading-relaxed">
        Each stitch has an interactive simulator — watch the needle move and see the lockstitch form from above and in cross-section.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard href="/stitches/straight" title="Straight stitch" difficulty="Foundational" time="2 min read" art={<StitchPreview kind="straight" />} />
        <ProjectCard href="/stitches/zigzag" title="Zigzag" difficulty="Beginner" time="3 min read" art={<StitchPreview kind="zigzag" />} />
        <ProjectCard href="/stitches/buttonhole" title="Buttonhole" difficulty="Intermediate" time="4 min read" art={<StitchPreview kind="buttonhole" />} />
        <ComingSoonCard title="Backstitch / reinforcement" />
        <ComingSoonCard title="Stretch / lightning" />
        <ComingSoonCard title="Overlock / overcast" />
        <ComingSoonCard title="Blind hem" />
        <ComingSoonCard title="Basting" />
      </div>
    </div>
  );
}
