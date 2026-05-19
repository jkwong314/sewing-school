import Link from "next/link";
import type { Materials } from "@/lib/content";

const kinds: { key: keyof Materials; label: string; refTopic: string }[] = [
  { key: "needle", label: "Needle", refTopic: "needles" },
  { key: "thread", label: "Thread", refTopic: "threads" },
  { key: "fabric", label: "Fabric", refTopic: "fabrics" },
];

export function MaterialsTable({ materials }: { materials: Materials }) {
  return (
    <div className="dashed-border bg-white p-5 my-6">
      <h3 className="font-mono text-xs uppercase tracking-widest text-brown-deep mb-3">
        What you&rsquo;ll need
      </h3>
      <dl className="grid sm:grid-cols-3 gap-4">
        {kinds.map(({ key, label, refTopic }) => {
          const value = materials[key];
          if (!value) return null;
          return (
            <div key={key}>
              <dt className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-1">
                {label}
              </dt>
              <dd>
                <Link
                  href={`/reference/${refTopic}`}
                  className="text-ink hover:text-brown-deep underline decoration-blush decoration-2 underline-offset-4"
                >
                  {value}
                </Link>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
