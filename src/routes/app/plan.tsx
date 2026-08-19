import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { buildYearPlan, planDayNumber } from "@/lib/curriculum/plan";
import { useLearner } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/plan")({ component: PlanPage });

function PlanPage() {
  const profile = useLearner((s) => s.profile);
  const day = planDayNumber(profile.startedAt);
  const week = Math.min(52, Math.max(1, Math.ceil(day / 7)));
  const plan = buildYearPlan(profile.startLevel, profile.dailyMinutes);
  const current = plan[week - 1];

  return (
    <div>
      <PageHeader
        kicker="365 days"
        title="Year path"
        description={`Gate ${profile.startLevel} → ${profile.goalLevel}. Week ${week} of 52.`}
      />
      <Card className="mb-6 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs text-muted">This week</p>
            <h2 className="font-display text-xl">{current?.title}</h2>
          </div>
          <Badge variant="primary">{current?.phase}</Badge>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {current?.focus.map((f) => (
            <li key={f}>
              <Badge variant="outline">{f}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-muted">
            <span>Year</span>
            <span className="tabular-nums">
              {day} / 365
            </span>
          </div>
          <Progress value={Math.min(100, (day / 365) * 100)} />
        </div>
      </Card>

      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {plan.map((w) => {
          const isNow = w.week === week;
          const past = w.week < week;
          return (
            <li
              key={w.week}
              className={cn(
                "rounded-md border px-3 py-3",
                isNow ? "border-primary bg-primary/5" : "border-border bg-surface",
                past && "opacity-70",
              )}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs tabular-nums text-faint">W{w.week}</span>
                <span className="text-xs text-muted">{w.phase}</span>
              </div>
              <p className="mt-1 text-sm font-medium">{w.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted">{w.focus.join(" · ")}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
