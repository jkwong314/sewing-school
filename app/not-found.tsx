import Link from "next/link";

export const metadata = { title: "Page not found · Sewing School" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-brown mb-3">404</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
        We couldn&rsquo;t find that page.
      </h1>
      <p className="mt-4 text-ink-soft text-lg leading-relaxed">
        It may have moved, or it may not exist yet. Try the homepage or one of the sections below.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center bg-blush-deep text-white px-5 py-3 rounded-full font-mono text-sm font-bold hover:bg-brown-deep min-h-[44px]"
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center border-2 border-border-warm text-ink px-5 py-3 rounded-full font-mono text-sm font-bold hover:bg-cream-deep min-h-[44px]"
        >
          Projects
        </Link>
        <Link
          href="/reference"
          className="inline-flex items-center border-2 border-border-warm text-ink px-5 py-3 rounded-full font-mono text-sm font-bold hover:bg-cream-deep min-h-[44px]"
        >
          Reference
        </Link>
      </div>
    </div>
  );
}
