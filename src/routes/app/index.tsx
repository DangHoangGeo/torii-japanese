import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { SkillBars } from "@/components/skill-bars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { analysisParagraph, suggestNextMoves } from "@/lib/advisor";
import { planDayNumber } from "@/lib/curriculum/plan";
import { analyzeProgress } from "@/lib/server/ai";
import {
  compactStats,
  estimateLevel,
  snapshotOf,
  useLearner,
} from "@/lib/store";
import { todayKey } from "@/lib/utils";

export const Route = createFileRoute("/app/")({ component: Dashboard });

function Dashboard() {
  const state = useLearner();
  const snap = snapshotOf(state);
  const stats = compactStats(snap);
  const day = planDayNumber(state.profile.startedAt);
  const today = state.daily[todayKey()];
  const minutes = today?.minutes ?? 0;
  const minuteGoal = state.profile.dailyMinutes;
  const moves = suggestNextMoves(snap);
  const localAnalysis = analysisParagraph(snap);
  const levelNow = estimateLevel(state.profile.startLevel, stats.skills);
  const storedInsight = useLearner((s) => s.lastInsight);
  const [aiText, setAiText] = useState<string | null>(storedInsight?.analysis ?? null);
  const [aiMoves, setAiMoves] = useState<typeof moves | null>(
    storedInsight?.moves.length
      ? storedInsight.moves.map((m, i) => ({
          id: `ai-${i}`,
          title: m.title,
          reason: m.reason,
          href: m.href,
          minutes: m.minutes,
          priority: i === 0 ? ("high" as const) : ("medium" as const),
        }))
      : null,
  );
  const [busy, setBusy] = useState(false);

  async function askAnalysis() {
    setBusy(true);
    try {
      const res = await analyzeProgress({ data: { stats } });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setAiText(res.analysis);
      if (res.moves.length) {
        setAiMoves(
          res.moves.map((m, i) => ({
            id: `ai-${i}`,
            title: m.title,
            reason: m.reason,
            href: m.href,
            minutes: m.minutes,
            priority: i === 0 ? "high" : "medium",
          })),
        );
      }
      useLearner.getState().setInsight({
        analysis: res.analysis,
        moves: res.moves,
        at: new Date().toISOString(),
      });
    } catch {
      toast.error("The sensei could not be reached.");
    } finally {
      setBusy(false);
    }
  }

  const shownMoves = aiMoves ?? moves;

  return (
    <div>
      <PageHeader
        kicker={`Day ${day} of 365`}
        title={
          state.profile.name
            ? `${state.profile.name}、今日も。`
            : "Open the gate today"
        }
        description={`Working level ${levelNow} · goal ${state.profile.goalLevel} · ${minuteGoal} minutes a day.`}
        action={
          <Button asChild>
            <Link to="/app/today">
              Start today <ArrowRight />
            </Link>
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Streak", `${state.streak}d`],
          ["Due", String(stats.dueCount)],
          ["Accuracy", `${stats.accuracy}%`],
          ["Reviews", String(stats.totalReviews)],
        ].map(([k, v]) => (
          <Card key={k} className="p-4">
            <p className="text-xs text-muted">{k}</p>
            <p className="font-display mt-1 text-2xl tabular-nums">{v}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Next moves</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted">{aiText ?? localAnalysis}</p>
            {shownMoves.map((m) => (
              <Link
                key={m.id}
                to={m.href as "/app/today"}
                className="block rounded-md border border-border p-3 hover:bg-surface-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{m.title}</p>
                  <Badge variant={m.priority === "high" ? "primary" : "outline"}>
                    {m.minutes} min
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted">{m.reason}</p>
              </Link>
            ))}
            <Button type="button" variant="secondary" disabled={busy} onClick={() => void askAnalysis()}>
              {busy ? "Sensei is reading…" : "Ask the sensei to analyze"}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-baseline justify-between text-sm">
              <span>Minutes</span>
              <span className="tabular-nums text-muted">
                {minutes} / {minuteGoal}
              </span>
            </div>
            <Progress value={Math.min(100, (minutes / minuteGoal) * 100)} />
            <div className="mt-6">
              <SkillBars skills={stats.skills} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
