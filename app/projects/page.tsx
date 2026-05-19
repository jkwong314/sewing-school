import { ProjectCard, ComingSoonCard } from "@/components/ProjectCard";

export const metadata = { title: "Projects · Sewing School" };

export default function ProjectsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-brown mb-2">Projects</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">Make something real.</h1>
      <p className="mt-4 text-ink-soft max-w-2xl leading-relaxed">
        Each project is a beginner-friendly walkthrough. You&rsquo;ll learn the stitches and materials as you go.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard href="/projects/hem-jeans" title="Hem jeans (keep original hem)" difficulty="Beginner" time="30 min" swatch="linear-gradient(135deg,#3b5d8a,#6789b3)" />
        <ProjectCard href="/projects/ruffle-skirt" title="Ruffle skirt" difficulty="Beginner" time="2 hours" swatch="linear-gradient(135deg,#e8a5a0,#f0b8b3)" />
        <ComingSoonCard title="Basic hem" />
        <ComingSoonCard title="Pillow cover" />
        <ComingSoonCard title="Tote bag" />
        <ComingSoonCard title="Insert a zipper" />
        <ComingSoonCard title="Sew on a button" />
        <ComingSoonCard title="Patch a tear" />
      </div>
    </div>
  );
}
