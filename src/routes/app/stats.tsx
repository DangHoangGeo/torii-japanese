import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { SkillBars } from "@/components/skill-bars";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analysisParagraph, suggestNextMoves } from "@/lib/advisor";
import { analyzeProgress } from "@/lib/server/ai";
import { compactStats, snapshotOf, useLearner } from "@/lib/store";
import { todayKey } from "@/lib/utils";

export const Route = createFileRoute("/app/stats")({ component: StatsPage });

function lastDays(n: number) {
  const out: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    out.push(todayKey(d));
  }
  return out;
}

function StatsPage() {
  const state = useLearner();
  const snap = snapshotOf(state);
  const stats = compactStats(snap);
  const moves = suggestNextMoves(snap);
  const [ai, setAi] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const series = useMemo(() => {
    return lastDays(14).map((d) => {
      const log = state.daily[d];
      return {
        day: d.slice(5),
        xp: log?.xp ?? 0,
        reviews: log?.reviews ?? 0,
        minutes: log?.minutes ?? 0,
      };
    });
  }, [state.daily]);

  async function run() {
    setBusy(true);
    try {
      const res = await analyzeProgress({ data: { stats } });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setAi(res.analysis);
    } catch {
      toast.error("The sensei could not be reached.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        kicker="Record"
        title="Stats"
        description="Accuracy, volume, and skill bars. Ask the sensei only when you want a fresh reading."
        action={
          <Button type="button" variant="secondary" disabled={busy} onClick={() => void run()}>
            {busy ? "Analyzing…" : "Analyze with sensei"}
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Streak", `${state.streak} days`],
          ["Accuracy", `${stats.accuracy}%`],
          ["Due now", String(stats.dueCount)],
          ["Readings", String(stats.completedReadings)],
        ].map(([k, v]) => (
          <Card key={k} className="p-4">
            <p className="text-xs text-muted">{k}</p>
            <p className="font-display mt-1 text-xl tabular-nums">{v}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>XP · 14 days</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={series}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="xp" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillBars skills={stats.skills} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4 p-5">
        <h2 className="font-display text-lg">Reading of the record</h2>
        <p className="mt-2 text-sm text-muted">{ai ?? analysisParagraph(snap)}</p>
        <ul className="mt-4 space-y-2">
          {moves.map((m) => (
            <li key={m.id} className="text-sm">
              <span className="font-medium">{m.title}</span>
              <span className="text-muted"> — {m.reason}</span>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant="ghost"
          className="mt-6"
          onClick={() => {
            if (window.confirm("Reset all progress on this device? This cannot be undone.")) {
              useLearner.getState().resetAll();
            }
          }}
        >
          Reset this device
        </Button>
      </Card>
    </div>
  );
}
