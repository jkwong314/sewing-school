import { ProjectCard, ComingSoonCard } from "@/components/ProjectCard";

export const metadata = { title: "Setup · Sewing School" };

export default function SetupIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-brown mb-2">Setup</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">Get your machine ready.</h1>
      <p className="mt-4 text-ink-soft max-w-2xl leading-relaxed">
        Two walkthroughs cover the essentials every beginner needs before their first project.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard href="/setup/threading" title="Threading walkthrough" difficulty="Essential" time="5 min" swatch="#faf6ee" />
        <ProjectCard href="/setup/tension-and-stitch-length" title="Tension & stitch length" difficulty="Essential" time="6 min" swatch="#faf6ee" />
        <ComingSoonCard title="Machine anatomy tour" />
        <ComingSoonCard title="Maintenance & cleaning" />
      </div>
    </div>
  );
}
