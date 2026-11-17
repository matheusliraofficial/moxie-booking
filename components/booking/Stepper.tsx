import clsx from "clsx";

type Step = { id: string; label: string };

export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <ol className="flex items-center gap-3" aria-label="Booking progress">
      {steps.map((step, i) => {
        const state = i < current ? "done" : i === current ? "active" : "upcoming";
        return (
          <li key={step.id} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className={clsx(
                  "grid h-7 w-7 place-items-center rounded-full text-xs font-medium transition",
                  state === "done" && "bg-brand text-white",
                  state === "active" && "bg-brand-soft text-brand ring-2 ring-brand",
                  state === "upcoming" && "bg-card text-ink-muted ring-1 ring-border",
                )}
              >
                {i + 1}
              </span>
              <span
                className={clsx(
                  "text-xs font-medium tracking-wide",
                  state === "upcoming" ? "text-ink-muted" : "text-ink",
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden className="h-px w-6 bg-border md:w-10" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
