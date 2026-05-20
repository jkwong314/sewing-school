import { ProjectCard } from "@/components/ProjectCard";
import { NeedleIcon, ThreadSpoolIcon, FabricIcon, ToolboxIcon } from "@/components/Illustrations";

export const metadata = { title: "Reference" };

export default function ReferenceIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-brown mb-2">Reference</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">Look it up.</h1>
      <p className="mt-4 text-ink-soft max-w-2xl leading-relaxed">
        Needle sizes, thread types, fabric pairings, and troubleshooting — the parts of the manual you actually want.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard href="/reference/needles" title="Needles" difficulty="Reference" time="Lookup" art={<NeedleIcon />} />
        <ProjectCard href="/reference/threads" title="Threads" difficulty="Reference" time="Lookup" art={<ThreadSpoolIcon />} />
        <ProjectCard href="/reference/fabrics" title="Fabrics" difficulty="Reference" time="Lookup" art={<FabricIcon />} />
        <ProjectCard href="/reference/troubleshooting" title="Troubleshooting" difficulty="Reference" time="Lookup" art={<ToolboxIcon />} />
      </div>
    </div>
  );
}
