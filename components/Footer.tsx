import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24">
      <div className="dashed-bottom" />
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-3 text-ink-soft">
        <div>
          <div className="font-mono font-bold text-brown mb-2"><span aria-hidden="true">✿ </span>sewing.school</div>
          <p className="text-sm leading-relaxed">A friendly, project-first guide to using a sewing machine. Built for total beginners and useful for returning sewists.</p>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <h2 className="font-mono uppercase text-xs tracking-widest text-brown-deep mb-3">Browse</h2>
          <ul className="space-y-2">
            <li><Link href="/projects" className="hover:underline">Projects</Link></li>
            <li><Link href="/stitches" className="hover:underline">Stitches</Link></li>
            <li><Link href="/setup" className="hover:underline">Setup</Link></li>
            <li><Link href="/reference" className="hover:underline">Reference</Link></li>
          </ul>
        </nav>
        <div className="text-sm">
          <h2 className="font-mono uppercase text-xs tracking-widest text-brown-deep mb-3">About</h2>
          <p className="leading-relaxed">Made with care. Content grows over time — see <Link href="/projects" className="underline">Projects</Link> for what&rsquo;s ready and what&rsquo;s coming.</p>
        </div>
      </div>
    </footer>
  );
}
