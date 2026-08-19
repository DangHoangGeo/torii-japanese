export type Grade = 0 | 1 | 2 | 3;

export type SrsCard = {
  id: string;
  kind: string;
  ease: number;
  interval: number;
  reps: number;
  lapses: number;
  dueAt: string;
  lastGrade?: Grade;
};

export function newCard(id: string, kind: string, now = new Date()): SrsCard {
  return {
    id,
    kind,
    ease: 2.5,
    interval: 0,
    reps: 0,
    lapses: 0,
    dueAt: now.toISOString(),
  };
}

export function reviewCard(card: SrsCard, grade: Grade, now = new Date()): SrsCard {
  const next: SrsCard = { ...card, lastGrade: grade };
  if (grade === 0) {
    next.reps = 0;
    next.lapses += 1;
    next.interval = 0;
    next.dueAt = new Date(now.getTime() + 10 * 60_000).toISOString();
    next.ease = Math.max(1.3, next.ease - 0.2);
    return next;
  }
  next.ease = Math.max(
    1.3,
    next.ease + (0.1 - (3 - grade) * (0.08 + (3 - grade) * 0.02)),
  );
  if (next.reps === 0) next.interval = grade === 1 ? 0.5 : 1;
  else if (next.reps === 1) next.interval = grade === 1 ? 1 : grade === 2 ? 3 : 4;
  else {
    const mult = grade === 1 ? 0.8 : grade === 2 ? 1 : 1.3;
    next.interval = Math.max(1, Math.round(next.interval * next.ease * mult * 10) / 10);
  }
  next.reps += 1;
  next.dueAt = new Date(now.getTime() + next.interval * 86_400_000).toISOString();
  return next;
}

export function isDue(card: SrsCard, now = new Date()): boolean {
  return new Date(card.dueAt).getTime() <= now.getTime();
}
