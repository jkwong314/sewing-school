export const metadata = { title: "About · Sewing School" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-brown mb-2">About</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">A friendlier sewing manual.</h1>
      <div className="mt-6 text-ink-soft text-lg leading-relaxed space-y-4">
        <p>
          Sewing School is a project-first guide to using a sewing machine. It&rsquo;s built for total beginners — someone who just got their first machine and would rather learn by making something than by reading the manual cover to cover.
        </p>
        <p>
          Every stitch has an interactive simulator that shows exactly how the needle and thread form the stitch — including a cross-section view of the lockstitch forming with the bobbin underneath. The goal isn&rsquo;t to replace practice; it&rsquo;s to make the mechanics visible so the practice makes sense.
        </p>
        <p>
          Content grows over time. The first eleven pages are the foundation; the rest will follow.
        </p>
      </div>
    </div>
  );
}
