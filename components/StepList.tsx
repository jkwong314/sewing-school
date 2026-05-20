import { Children, isValidElement, type ReactNode } from "react";

export function StepList({ children }: { children: ReactNode }) {
  const steps = Children.toArray(children).filter(isValidElement);
  return (
    <ol className="my-8 space-y-6">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span
            aria-hidden="true"
            className="flex-shrink-0 w-10 h-10 rounded-full bg-blush-deep text-white font-mono font-bold flex items-center justify-center text-base"
          >
            {i + 1}
          </span>
          <div className="flex-1 pt-1.5 text-ink leading-relaxed">{step}</div>
        </li>
      ))}
    </ol>
  );
}

export function Step({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
