import type { ReactNode } from "react";

export function PageHeader({
  kicker,
  title,
  description,
  action,
}: {
  kicker?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        {kicker ? (
          <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">{kicker}</p>
        ) : null}
        <h1 className="font-display mt-1 text-2xl font-medium tracking-tight md:text-3xl">{title}</h1>
        {description ? <p className="mt-1.5 max-w-xl text-sm text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
