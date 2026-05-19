import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  blurb?: string;
  status?: "ready" | "coming-soon";
};

export function PageStub({ eyebrow, title, blurb, status = "coming-soon" }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-widest text-brown hover:text-brown-deep inline-flex items-center mb-6"
      >
        ← Back home
      </Link>
      <p className="font-mono text-xs uppercase tracking-widest text-brown mb-2">{eyebrow}</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">{title}</h1>
      {blurb && <p className="mt-4 text-ink-soft text-lg leading-relaxed">{blurb}</p>}
      {status === "coming-soon" && (
        <div className="mt-8 dashed-border bg-white p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-blush-deep mb-2">Coming soon</p>
          <p className="text-ink-soft">
            This page is part of the next content batch. The site structure is in place — content is on its way.
          </p>
        </div>
      )}
    </div>
  );
}
