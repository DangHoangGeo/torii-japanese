import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DrillSession } from "@/components/drill-session";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildTodayQueue } from "@/lib/advisor";
import { planDayNumber } from "@/lib/curriculum/plan";
import { snapshotOf, useLearner } from "@/lib/store";
import { todayKey } from "@/lib/utils";

export const Route = createFileRoute("/app/today")({ component: Today });

function Today() {
  const state = useLearner();
  const [queue] = useState(() => buildTodayQueue(snapshotOf(useLearner.getState()), 12));
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const day = planDayNumber(state.profile.startedAt);
  const today = state.daily[todayKey()];

  return (
    <div>
      <PageHeader
        kicker={`Day ${day}`}
        title="Today’s sitting"
        description="Due reviews first, then new items at your gate. Twelve cards is a full pass."
      />

      {!started ? (
        <Card className="p-6 md:p-8">
          <p className="text-sm text-muted">
            Queue of {queue.length} · already {today?.reviews ?? 0} reviews today ·{" "}
            {today?.minutes ?? 0} minutes logged.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
            {["kana", "kanji", "vocab", "grammar"].map((k) => (
              <li key={k} className="rounded-md border border-border px-3 py-2 capitalize">
                {k} · {queue.filter((q) => q.kind === k).length}
              </li>
            ))}
          </ul>
          <Button className="mt-6" size="lg" onClick={() => setStarted(true)}>
            Begin the sitting
          </Button>
        </Card>
      ) : (
        <DrillSession
          title="Today"
          items={queue}
          onDone={(r) => {
            setDone(true);
            useLearner.getState().addMinutes(Math.max(4, Math.round(r.total * 0.45)));
          }}
        />
      )}

      {done ? (
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/app">Back to the desk</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/app/practice">More practice</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
