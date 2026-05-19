import Link from "next/link";
import { ProjectCard, ComingSoonCard } from "@/components/ProjectCard";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <section className="dashed-border bg-white p-8 md:p-12 mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-brown mb-3">
          Sewing School
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight max-w-2xl">
          What do you want to make today?
        </h1>
        <p className="mt-4 text-ink-soft max-w-xl leading-relaxed">
          Pick a project below. We&rsquo;ll walk you through the stitches, the
          materials, and the setup — everything a beginner needs to finish a real thing.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/setup/threading"
            className="inline-flex items-center bg-blush-deep text-white px-5 py-3 rounded-full font-mono text-sm font-bold hover:bg-brown-deep min-h-[44px]"
          >
            New to the machine? Start with Threading →
          </Link>
        </div>
      </section>

      <section aria-labelledby="projects-heading" className="mb-12">
        <h2 id="projects-heading" className="font-display text-2xl text-ink mb-5">
          Projects
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            href="/projects/hem-jeans"
            title="Hem jeans (keep original hem)"
            difficulty="Beginner"
            time="30 min"
            swatch="linear-gradient(135deg,#3b5d8a,#6789b3)"
          />
          <ProjectCard
            href="/projects/ruffle-skirt"
            title="Ruffle skirt"
            difficulty="Beginner"
            time="2 hours"
            swatch="linear-gradient(135deg,#e8a5a0,#f0b8b3)"
          />
          <ComingSoonCard title="Basic hem" />
          <ComingSoonCard title="Pillow cover" />
          <ComingSoonCard title="Tote bag" />
          <ComingSoonCard title="Insert a zipper" />
        </div>
      </section>

      <section aria-labelledby="stitches-heading" className="mb-12">
        <h2 id="stitches-heading" className="font-display text-2xl text-ink mb-5">
          Stitches
        </h2>
        <p className="text-ink-soft mb-5 max-w-2xl">
          Each stitch has an interactive simulator that shows exactly how it forms — top-down and as a cross-section.
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          <ProjectCard
            href="/stitches/straight"
            title="Straight stitch"
            difficulty="Foundational"
            time="2 min read"
            swatch="#faf6ee"
          />
          <ProjectCard
            href="/stitches/zigzag"
            title="Zigzag"
            difficulty="Beginner"
            time="3 min read"
            swatch="#faf6ee"
          />
          <ProjectCard
            href="/stitches/buttonhole"
            title="Buttonhole"
            difficulty="Intermediate"
            time="4 min read"
            swatch="#faf6ee"
          />
        </div>
      </section>
    </div>
  );
}
