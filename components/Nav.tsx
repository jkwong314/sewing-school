import Link from "next/link";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/stitches", label: "Stitches" },
  { href: "/setup", label: "Setup" },
  { href: "/reference", label: "Reference" },
  { href: "/about", label: "About" },
];

export function Nav() {
  return (
    <header className="dashed-bottom">
      <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-3">
        <Link
          href="/"
          className="font-mono font-bold text-brown text-lg tracking-tight"
          aria-label="Sewing School home"
        >
          <span aria-hidden="true">✿ </span>sewing.school
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap gap-x-6 gap-y-2 text-ink-soft text-base">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-brown-deep underline-offset-4 hover:underline decoration-blush decoration-2 py-1 min-h-[44px] flex items-center"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
