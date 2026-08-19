import type { JlptLevel, PlanWeek } from "./types";

export function buildYearPlan(startLevel: JlptLevel, dailyMinutes: number): PlanWeek[] {
  const phases: { phase: string; title: string; weeks: number; focus: string[] }[] = [];
  if (startLevel === "pre") {
    phases.push({
      phase: "Foundation",
      title: "Kana mastery",
      weeks: 4,
      focus: ["Hiragana gojūon", "Katakana", "Dakuten & yōon", "Listening the sounds"],
    });
  }
  if (startLevel === "pre" || startLevel === "N5") {
    phases.push({
      phase: "N5",
      title: "Everyday Japanese",
      weeks: 10,
      focus: ["Core kanji", "N5 vocab", "です・ます", "て-form", "Short reading"],
    });
  }
  if (["pre", "N5", "N4"].includes(startLevel)) {
    phases.push({
      phase: "N4",
      title: "Daily fluency base",
      weeks: 12,
      focus: ["N4 kanji", "Obligation forms", "〜たら / ば", "Email & commute Japanese"],
    });
  }
  if (["pre", "N5", "N4", "N3"].includes(startLevel)) {
    phases.push({
      phase: "N3",
      title: "Intermediate bridge",
      weeks: 13,
      focus: ["N3 grammar", "News-lite reading", "Writing desk", "Weak-skill repair"],
    });
  }
  phases.push({
    phase: "N2",
    title: "N2 readiness",
    weeks: 13,
    focus: ["N2 patterns", "Opinion reading", "Exam timing", "Active production"],
  });

  let week = 1;
  const plan: PlanWeek[] = [];
  for (const p of phases) {
    for (let i = 0; i < p.weeks && week <= 52; i++) {
      plan.push({
        week,
        phase: p.phase,
        title: `${p.title} · week ${i + 1}`,
        focus: p.focus,
        minutesHint: dailyMinutes,
      });
      week += 1;
    }
  }
  while (plan.length < 52) {
    plan.push({
      week: plan.length + 1,
      phase: "N2",
      title: "N2 polish",
      focus: ["Weak-skill repair", "Mock reading", "Speed reviews"],
      minutesHint: dailyMinutes,
    });
  }
  return plan;
}

export function planDayNumber(startedAt: string): number {
  const from = new Date(startedAt);
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const to = new Date();
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.max(1, Math.round((b - a) / 86_400_000) + 1);
}
