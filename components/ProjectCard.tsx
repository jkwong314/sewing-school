import Link from "next/link";

type Props = {
  href: string;
  title: string;
  difficulty: string;
  time: string;
  swatch: string; // CSS background value
};

export function ProjectCard({ href, title, difficulty, time, swatch }: Props) {
  return (
    <Link
      href={href}
      className="group dashed-border bg-white p-4 flex flex-col gap-3 hover:shadow-md transition-shadow min-h-[180px]"
    >
      <div
        className="rounded h-32"
        style={{ background: swatch }}
        aria-hidden="true"
      />
      <div>
        <h3 className="font-display text-xl text-ink leading-tight group-hover:text-brown-deep">{title}</h3>
        <div className="font-mono text-xs text-ink-soft mt-1 uppercase tracking-wider">
          {difficulty} · {time}
        </div>
      </div>
    </Link>
  );
}

export function ComingSoonCard({ title }: { title: string }) {
  return (
    <div
      className="dashed-border bg-cream-deep p-4 flex flex-col gap-3 min-h-[180px] opacity-70"
      aria-label={`${title} — coming soon`}
    >
      <div className="rounded h-32 bg-paper-dot" aria-hidden="true" />
      <div>
        <h3 className="font-display text-xl text-ink-soft leading-tight">{title}</h3>
        <div className="font-mono text-xs text-brown mt-1 uppercase tracking-wider">Coming soon</div>
      </div>
    </div>
  );
}
