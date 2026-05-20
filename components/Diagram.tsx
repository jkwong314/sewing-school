import type { ReactNode } from "react";

type Props = {
  caption?: string;
  children: ReactNode;
  /** Force a specific aspect ratio for the SVG box (default 16/9) */
  aspect?: string;
};

export function Diagram({ caption, children, aspect = "16/9" }: Props) {
  return (
    <figure className="my-8 dashed-border bg-white overflow-hidden">
      <div
        className="bg-cream-deep flex items-center justify-center"
        style={{ aspectRatio: aspect }}
      >
        {children}
      </div>
      {caption && (
        <figcaption className="px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink-soft text-center dashed-bottom border-t-2 border-t-border-warm/40">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
