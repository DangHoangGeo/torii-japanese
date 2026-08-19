import { ALL_KANA, GRAMMAR, KANJI, VOCAB, newPool, toDrill, type DrillItem, type JlptLevel } from "@/lib/curriculum";
import { planDayNumber } from "@/lib/curriculum/plan";
import {
  accuracyOf,
  compactStats,
  dueCount,
  getSkillScores,
  type LearnerSnapshot,
} from "@/lib/store";
import { isDue, type SrsCard } from "@/lib/srs";
import { shuffle } from "@/lib/utils";

export type NextMove = {
  id: string;
  title: string;
  reason: string;
  href: string;
  minutes: number;
  priority: "high" | "medium" | "low";
};

export function suggestNextMoves(state: LearnerSnapshot): NextMove[] {
  const moves: NextMove[] = [];
  const skills = getSkillScores(state.cards, state.completedReadings.length);
  const due = dueCount(state.cards);
  const day = planDayNumber(state.profile.startedAt);
  const level = state.profile.startLevel;

  if (state.streak === 0) {
    moves.push({
      id: "open",
      title: "Open the gate today",
      reason: "A ten-minute session is enough to start a streak and give the sensei real data.",
      href: "/app/today",
      minutes: 10,
      priority: "high",
    });
  }

  if (level === "pre" && skills.kana < 85) {
    const remaining = ALL_KANA.filter((k) => (state.cards[k.id]?.reps ?? 0) < 2).length;
    moves.push({
      id: "kana",
      title: "Clear the kana gate",
      reason: `${remaining} characters still need stable recall. Finish both scripts before heavy kanji.`,
      href: "/app/practice/kana",
      minutes: Math.min(20, state.profile.dailyMinutes),
      priority: "high",
    });
  }

  if (due >= 8) {
    moves.push({
      id: "reviews",
      title: `Clear ${due} due reviews`,
      reason: "Overdue cards decay fast. Protect what you already learned before adding more.",
      href: "/app/today",
      minutes: Math.min(18, Math.ceil(due * 0.55)),
      priority: "high",
    });
  }

  const weakest = (Object.entries(skills) as [string, number][])
    .filter(([k]) => k !== "reading" && k !== "writing")
    .sort((a, b) => a[1] - b[1])[0];

  if (weakest && weakest[1] < 62) {
    const map: Record<string, { title: string; href: string; reason: string }> = {
      kana: {
        title: "Strengthen kana accuracy",
        href: "/app/practice/kana",
        reason: "Kana is the foundation for every reading and listening item.",
      },
      kanji: {
        title: "Drill weak kanji",
        href: "/app/practice/kanji",
        reason: `Kanji mastery sits at ${weakest[1]}%. Pair meaning with a reading every time.`,
      },
      vocab: {
        title: "Expand active vocabulary",
        href: "/app/practice/vocab",
        reason: "You recognize less than you need for the next JLPT band.",
      },
      grammar: {
        title: "Repair grammar patterns",
        href: "/app/practice/grammar",
        reason: "Pattern gaps block reading and writing more than missing words.",
      },
    };
    const m = map[weakest[0]];
    if (m && !moves.find((x) => x.href === m.href)) {
      moves.push({
        id: `weak-${weakest[0]}`,
        title: m.title,
        reason: m.reason,
        href: m.href,
        minutes: 12,
        priority: moves.some((x) => x.priority === "high") ? "medium" : "high",
      });
    }
  }

  if (state.completedReadings.length < 3) {
    moves.push({
      id: "read",
      title: "One short reading",
      reason: "Reading ties kanji, vocab, and grammar together under light pressure.",
      href: "/app/practice/read",
      minutes: 8,
      priority: "medium",
    });
  }

  if (state.writings.length < 1 && (level === "N4" || level === "N3" || level === "N2")) {
    moves.push({
      id: "write",
      title: "Write three sentences",
      reason: "Production exposes holes that multiple choice hides. The sensei will mark it.",
      href: "/app/write",
      minutes: 10,
      priority: "medium",
    });
  }

  if (moves.length < 3) {
    moves.push({
      id: "today-path",
      title: day <= 28 ? "Today’s guided session" : "Keep the year path moving",
      reason: `Day ${day} of 365. Consistency beats intensity on the road to ${state.profile.goalLevel}.`,
      href: "/app/today",
      minutes: state.profile.dailyMinutes,
      priority: "low",
    });
  }

  const seen = new Set<string>();
  const unique: NextMove[] = [];
  for (const m of moves) {
    if (seen.has(m.title)) continue;
    seen.add(m.title);
    unique.push(m);
    if (unique.length >= 3) break;
  }
  return unique;
}

export function analysisParagraph(state: LearnerSnapshot): string {
  const stats = compactStats(state);
  if (stats.totalReviews < 6) {
    return `You are on day ${stats.day}. The sensei does not have enough review data yet — complete one Today session so weak spots can be measured. Start gate ${stats.startLevel}, goal ${stats.goalLevel}, ${stats.dailyMinutes} minutes a day.`;
  }
  return `Day ${stats.day} · streak ${stats.streak} · ${stats.dueCount} cards due · accuracy ${stats.accuracy}%. Snapshot — kana ${stats.skills.kana}%, kanji ${stats.skills.kanji}%, vocab ${stats.skills.vocab}%, grammar ${stats.skills.grammar}%, reading ${stats.skills.reading}%. Focus the next block on the lowest bar and clear overdue reviews before adding new material.`;
}

export function pickDue(cards: Record<string, SrsCard>, limit: number) {
  return Object.values(cards)
    .filter((c) => isDue(c))
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
    .slice(0, limit);
}

export function buildTodayQueue(state: LearnerSnapshot, size = 12): DrillItem[] {
  const items: DrillItem[] = [];
  const known = new Set<string>();
  for (const c of pickDue(state.cards, size)) {
    const d = toDrill(c.id, c.kind as DrillItem["kind"]);
    if (d) {
      items.push(d);
      known.add(d.id);
    }
  }
  const pool = shuffle(newPool(state.profile.startLevel as JlptLevel));
  for (const n of pool) {
    if (items.length >= size) break;
    if (known.has(n.id) || state.cards[n.id]) continue;
    const d = toDrill(n.id, n.kind);
    if (d) {
      items.push(d);
      known.add(d.id);
    }
  }
  if (items.length < 8) {
    for (const k of shuffle(ALL_KANA).slice(0, 8 - items.length)) {
      const d = toDrill(k.id, "kana");
      if (d && !known.has(d.id)) items.push(d);
    }
  }
  return items;
}

export function kindQueue(kind: "kana" | "kanji" | "vocab" | "grammar", n = 12): DrillItem[] {
  const ids =
    kind === "kana"
      ? ALL_KANA.map((x) => x.id)
      : kind === "kanji"
        ? KANJI.map((x) => x.id)
        : kind === "vocab"
          ? VOCAB.map((x) => x.id)
          : GRAMMAR.map((x) => x.id);
  return shuffle(ids)
    .slice(0, n)
    .map((id) => toDrill(id, kind))
    .filter((x): x is DrillItem => Boolean(x));
}

export { accuracyOf };
