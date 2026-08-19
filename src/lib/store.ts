import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ALL_KANA,
  GRAMMAR,
  KANJI,
  VOCAB,
  type JlptLevel,
  type SkillKind,
} from "@/lib/curriculum";
import { type Grade, type SrsCard, isDue, newCard, reviewCard } from "@/lib/srs";
import { todayKey } from "@/lib/utils";

export type DailyLog = {
  minutes: number;
  reviews: number;
  newItems: number;
  xp: number;
  correct: number;
  attempts: number;
};

export type Profile = {
  name: string;
  startLevel: JlptLevel;
  goalLevel: JlptLevel;
  dailyMinutes: number;
  startedAt: string;
  onboardingDone: boolean;
  placementScore: number;
  updatedAt: string;
};

export type ChatTurn = { role: "user" | "sensei"; content: string; at: string };

export type InsightMove = { title: string; reason: string; href: string; minutes: number };

export type Insight = {
  analysis: string;
  moves: InsightMove[];
  at: string;
};

export type LearnerSnapshot = {
  profile: Profile;
  cards: Record<string, SrsCard>;
  daily: Record<string, DailyLog>;
  completedReadings: string[];
  writings: { at: string; text: string; feedback: string }[];
  chat: ChatTurn[];
  lastStreakDate: string | null;
  streak: number;
  lastInsight: Insight | null;
};

export type LearnerState = LearnerSnapshot & {
  completeOnboarding: (p: Partial<Profile> & { startLevel: JlptLevel }) => void;
  recordReview: (id: string, kind: string, grade: Grade, isNew: boolean) => void;
  completeReading: (id: string, correct: number, total: number) => void;
  addMinutes: (m: number) => void;
  addChat: (turn: ChatTurn) => void;
  addWriting: (text: string, feedback: string) => void;
  setInsight: (insight: Insight) => void;
  hydrateRemote: (snap: LearnerSnapshot) => void;
  resetAll: () => void;
};

const defaultProfile = (): Profile => ({
  name: "",
  startLevel: "pre",
  goalLevel: "N2",
  dailyMinutes: 30,
  startedAt: new Date().toISOString(),
  onboardingDone: false,
  placementScore: 0,
  updatedAt: new Date().toISOString(),
});

function emptyDay(): DailyLog {
  return { minutes: 0, reviews: 0, newItems: 0, xp: 0, correct: 0, attempts: 0 };
}

function bumpStreak(state: LearnerState, day: string, now: Date) {
  let streak = state.streak;
  let lastStreakDate = state.lastStreakDate;
  if (lastStreakDate !== day) {
    const yesterday = todayKey(new Date(now.getTime() - 86_400_000));
    streak = lastStreakDate === yesterday ? streak + 1 : 1;
    lastStreakDate = day;
  }
  return { streak, lastStreakDate };
}

export const useLearner = create<LearnerState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile(),
      cards: {},
      daily: {},
      completedReadings: [],
      writings: [],
      chat: [],
      lastStreakDate: null,
      streak: 0,
      lastInsight: null,
      completeOnboarding: (p) => {
        set({
          profile: {
            ...defaultProfile(),
            ...p,
            startedAt: new Date().toISOString(),
            onboardingDone: true,
            goalLevel: p.goalLevel ?? "N2",
            dailyMinutes: p.dailyMinutes ?? 30,
            name: p.name ?? "",
            placementScore: p.placementScore ?? 0,
            updatedAt: new Date().toISOString(),
          },
          cards: {},
          daily: {},
          completedReadings: [],
          writings: [],
          chat: [],
          streak: 0,
          lastStreakDate: null,
          lastInsight: null,
        });
      },
      recordReview: (id, kind, grade, isNew) => {
        const state = get();
        const now = new Date();
        const day = todayKey(now);
        const prev = state.cards[id] ?? newCard(id, kind, now);
        const nextCard = reviewCard(prev, grade, now);
        const dayLog = { ...(state.daily[day] ?? emptyDay()) };
        dayLog.attempts += 1;
        dayLog.reviews += 1;
        if (isNew) dayLog.newItems += 1;
        if (grade > 0) {
          dayLog.correct += 1;
          dayLog.xp += grade === 3 ? 15 : grade === 2 ? 10 : 6;
        } else {
          dayLog.xp += 2;
        }
        const { streak, lastStreakDate } = bumpStreak(state, day, now);
        set({
          cards: { ...state.cards, [id]: nextCard },
          daily: { ...state.daily, [day]: dayLog },
          streak,
          lastStreakDate,
          profile: { ...state.profile, updatedAt: now.toISOString() },
        });
      },
      completeReading: (id, correct, total) => {
        const state = get();
        if (state.completedReadings.includes(id)) return;
        const now = new Date();
        const day = todayKey(now);
        const dayLog = { ...(state.daily[day] ?? emptyDay()) };
        dayLog.attempts += total;
        dayLog.correct += correct;
        dayLog.xp += 20 + correct * 5;
        dayLog.minutes += 6;
        const { streak, lastStreakDate } = bumpStreak(state, day, now);
        set({
          completedReadings: [...state.completedReadings, id],
          daily: { ...state.daily, [day]: dayLog },
          streak,
          lastStreakDate,
          profile: { ...state.profile, updatedAt: now.toISOString() },
        });
      },
      addMinutes: (m) => {
        const day = todayKey();
        const state = get();
        const dayLog = { ...(state.daily[day] ?? emptyDay()) };
        dayLog.minutes += m;
        set({
          daily: { ...state.daily, [day]: dayLog },
          profile: { ...state.profile, updatedAt: new Date().toISOString() },
        });
      },
      addChat: (turn) => {
        const state = get();
        const chat = [...state.chat, turn].slice(-40);
        set({ chat, profile: { ...state.profile, updatedAt: new Date().toISOString() } });
      },
      addWriting: (text, feedback) => {
        const state = get();
        const writings = [...state.writings, { at: new Date().toISOString(), text, feedback }].slice(
          -20,
        );
        set({ writings, profile: { ...state.profile, updatedAt: new Date().toISOString() } });
      },
      setInsight: (insight) => {
        set({
          lastInsight: insight,
          profile: { ...get().profile, updatedAt: new Date().toISOString() },
        });
      },
      hydrateRemote: (snap) => {
        const local = get().profile.updatedAt;
        if (snap.profile.updatedAt && snap.profile.updatedAt < local) return;
        set({
          profile: snap.profile,
          cards: snap.cards ?? {},
          daily: snap.daily ?? {},
          completedReadings: snap.completedReadings ?? [],
          writings: snap.writings ?? [],
          chat: snap.chat ?? [],
          lastStreakDate: snap.lastStreakDate,
          streak: snap.streak ?? 0,
          lastInsight: snap.lastInsight ?? null,
        });
      },
      resetAll: () =>
        set({
          profile: defaultProfile(),
          cards: {},
          daily: {},
          completedReadings: [],
          writings: [],
          chat: [],
          streak: 0,
          lastStreakDate: null,
          lastInsight: null,
        }),
    }),
    { name: "torii-learner-v1" },
  ),
);

export function snapshotOf(s: LearnerSnapshot): LearnerSnapshot {
  return {
    profile: s.profile,
    cards: s.cards,
    daily: s.daily,
    completedReadings: s.completedReadings,
    writings: s.writings,
    chat: s.chat,
    lastStreakDate: s.lastStreakDate,
    streak: s.streak,
    lastInsight: s.lastInsight ?? null,
  };
}

export function getSkillScores(
  cards: Record<string, SrsCard>,
  readingDone = 0,
  writingDone = 0,
) {
  const scoreFor = (ids: string[]) => {
    if (!ids.length) return 0;
    let sum = 0;
    for (const id of ids) {
      const c = cards[id];
      if (!c) continue;
      if (c.reps === 0) sum += 8;
      else if (c.interval >= 21) sum += 100;
      else if (c.interval >= 7) sum += 78;
      else if (c.interval >= 2) sum += 52;
      else sum += 28;
    }
    return Math.round(sum / ids.length);
  };
  return {
    kana: scoreFor(ALL_KANA.map((k) => k.id)),
    kanji: scoreFor(KANJI.map((k) => k.id)),
    vocab: scoreFor(VOCAB.map((v) => v.id)),
    grammar: scoreFor(GRAMMAR.map((g) => g.id)),
    reading: Math.min(100, readingDone * 12),
    writing: Math.min(100, writingDone * 18),
  } as Record<SkillKind, number>;
}

export function estimateLevel(
  startLevel: JlptLevel,
  skills: Record<SkillKind, number>,
): JlptLevel {
  if (startLevel === "pre" && skills.kana < 72) return "pre";
  const avg =
    (skills.kana + skills.kanji + skills.vocab + skills.grammar + skills.reading) / 5;
  if (avg < 32) return "N5";
  if (avg < 52) return "N4";
  if (avg < 72) return "N3";
  return "N2";
}

export function dueCount(cards: Record<string, SrsCard>) {
  return Object.values(cards).filter((c) => isDue(c)).length;
}

export function accuracyOf(daily: Record<string, DailyLog>) {
  const a = Object.values(daily).reduce((s, d) => s + d.attempts, 0);
  const c = Object.values(daily).reduce((s, d) => s + d.correct, 0);
  return a ? Math.round((c / a) * 100) : 0;
}

export function compactStats(s: LearnerSnapshot) {
  const skills = getSkillScores(s.cards, s.completedReadings.length, s.writings.length);
  const weak = Object.values(s.cards)
    .filter((c) => c.lapses >= 2 || (c.lastGrade === 0 && c.reps <= 1))
    .slice(0, 8)
    .map((c) => c.id);
  return {
    name: s.profile.name,
    startLevel: s.profile.startLevel,
    goalLevel: s.profile.goalLevel,
    dailyMinutes: s.profile.dailyMinutes,
    day: Math.max(
      1,
      Math.round(
        (Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) -
          Date.UTC(
            new Date(s.profile.startedAt).getFullYear(),
            new Date(s.profile.startedAt).getMonth(),
            new Date(s.profile.startedAt).getDate(),
          )) /
          86_400_000,
      ) + 1,
    ),
    streak: s.streak,
    skills,
    dueCount: dueCount(s.cards),
    accuracy: accuracyOf(s.daily),
    totalReviews: Object.values(s.daily).reduce((n, d) => n + d.reviews, 0),
    completedReadings: s.completedReadings.length,
    weakItems: weak,
  };
}
