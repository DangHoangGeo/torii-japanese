import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { completeObject, completeText } from "@/lib/server/model";

export type StatsPayload = {
  name: string;
  startLevel: string;
  goalLevel: string;
  dailyMinutes: number;
  day: number;
  streak: number;
  skills: Record<string, number>;
  dueCount: number;
  accuracy: number;
  totalReviews: number;
  completedReadings: number;
  weakItems: string[];
};

type ChatMsg = { role: "user" | "sensei" | "assistant" | "system"; content: string };

function statsBlock(s: StatsPayload) {
  return `Learner: ${s.name || "anonymous"}
Start: ${s.startLevel}  Goal: ${s.goalLevel}  Daily minutes: ${s.dailyMinutes}
Day of plan: ${s.day}/365  Streak: ${s.streak}
Due cards: ${s.dueCount}  Accuracy: ${s.accuracy}%  Total reviews: ${s.totalReviews}
Readings completed: ${s.completedReadings}
Skills %: kana ${s.skills.kana ?? 0}, kanji ${s.skills.kanji ?? 0}, vocab ${s.skills.vocab ?? 0}, grammar ${s.skills.grammar ?? 0}, reading ${s.skills.reading ?? 0}
Weak item ids: ${s.weakItems.join(", ") || "none yet"}`;
}

const moveSchema = z.object({
  title: z.string(),
  reason: z.string(),
  href: z.string(),
  minutes: z.number(),
});

const analysisSchema = z.object({
  analysis: z.string(),
  moves: z.array(moveSchema).min(1).max(3),
});

const readingSchema = z.object({
  title: z.string(),
  text: z.string(),
  translation: z.string(),
  questions: z
    .array(
      z.object({
        q: z.string(),
        options: z.array(z.string()).min(4).max(4),
        answer: z.number().int().min(0).max(3),
      }),
    )
    .min(2)
    .max(2),
});

export const askSensei = createServerFn({ method: "POST" })
  .validator((input: { stats: StatsPayload; history: ChatMsg[]; message: string }) => input)
  .handler(async ({ data }) => {
    const history = data.history.slice(-8).map((m) => ({
      role: (m.role === "sensei" || m.role === "assistant" ? "assistant" : "user") as
        | "assistant"
        | "user",
      content: m.content,
    }));
    return completeText({
      system:
        "You are Torii Sensei, a precise Japanese teacher helping a learner reach JLPT N2 in one year. Use the stats. Be concrete: name the next drill, a grammar pattern, or a 10–20 minute action. Answer in clear English, include Japanese examples in Japanese script when useful. No emoji. Keep replies under 180 words.",
      messages: [
        { role: "user", content: `STATS\n${statsBlock(data.stats)}` },
        ...history,
        { role: "user", content: data.message.slice(0, 1200) },
      ],
      maxOutputTokens: 500,
    });
  });

export const analyzeProgress = createServerFn({ method: "POST" })
  .validator((input: { stats: StatsPayload }) => input)
  .handler(async ({ data }) => {
    const structured = await completeObject({
      system:
        "You analyze a Japanese learner's stats. Return exactly 3 next moves. href must be one of /app/today, /app/practice/kana, /app/practice/kanji, /app/practice/vocab, /app/practice/grammar, /app/practice/read, /app/write, /app/plan. analysis: 2-4 sentences, no emoji.",
      prompt: statsBlock(data.stats),
      schema: analysisSchema,
      maxOutputTokens: 600,
    });
    if (structured.ok) {
      return {
        ok: true as const,
        analysis: structured.object.analysis,
        moves: structured.object.moves.slice(0, 3),
      };
    }
    const fallback = await completeText({
      system:
        'You analyze a Japanese learner\'s stats and return JSON only: {"analysis": string, "moves": [{"title": string, "reason": string, "href": string, "minutes": number}]}. href must be one of /app/today, /app/practice/kana, /app/practice/kanji, /app/practice/vocab, /app/practice/grammar, /app/practice/read, /app/write, /app/plan. Exactly 3 moves. analysis: 2-4 sentences, no emoji.',
      messages: [{ role: "user", content: statsBlock(data.stats) }],
      maxOutputTokens: 600,
    });
    if (!fallback.ok) return fallback;
    try {
      const json = JSON.parse(fallback.text.replace(/```json|```/g, "").trim()) as {
        analysis: string;
        moves: { title: string; reason: string; href: string; minutes: number }[];
      };
      return { ok: true as const, analysis: json.analysis, moves: json.moves.slice(0, 3) };
    } catch {
      return {
        ok: true as const,
        analysis: fallback.text,
        moves: [] as { title: string; reason: string; href: string; minutes: number }[],
      };
    }
  });

export const gradeWriting = createServerFn({ method: "POST" })
  .validator((input: { text: string; level: string }) => input)
  .handler(async ({ data }) => {
    return completeText({
      system:
        "You are a Japanese writing tutor. Correct the learner's Japanese. Reply in this structure:\nScore: n/10\nCorrected:\n(native rewrite)\nNotes:\n- short bullet issues (particles, tense, word choice)\nNatural alternative:\n(one more natural version)\nEnglish meaning:\n...\nNo emoji. Keep it under 220 words.",
      messages: [
        { role: "user", content: `Learner level: ${data.level}\nText:\n${data.text.slice(0, 1500)}` },
      ],
      maxOutputTokens: 700,
    });
  });

export const generateReading = createServerFn({ method: "POST" })
  .validator((input: { level: string; topic?: string }) => input)
  .handler(async ({ data }) => {
    const structured = await completeObject({
      system:
        "Create one original Japanese reading passage. text 80-140 Japanese characters for N5, 140-220 for N4, 220-320 for N3, 280-400 for N2. Two questions with four options each. No emoji.",
      prompt: `Level: ${data.level}. Topic: ${data.topic || "everyday life in Japan"}.`,
      schema: readingSchema,
      maxOutputTokens: 800,
    });
    if (structured.ok) return { ok: true as const, passage: structured.object };
    const fallback = await completeText({
      system:
        'Create one original Japanese reading passage. JSON only: {"title": string, "text": string, "translation": string, "questions": [{"q": string, "options": [string, string, string, string], "answer": 0-3}]}. text 80-140 Japanese characters for N5, 140-220 for N4, 220-320 for N3, 280-400 for N2. Two questions. No emoji.',
      messages: [
        { role: "user", content: `Level: ${data.level}. Topic: ${data.topic || "everyday life in Japan"}.` },
      ],
      maxOutputTokens: 800,
    });
    if (!fallback.ok) return fallback;
    try {
      const json = JSON.parse(fallback.text.replace(/```json|```/g, "").trim()) as {
        title: string;
        text: string;
        translation: string;
        questions: { q: string; options: string[]; answer: number }[];
      };
      return { ok: true as const, passage: json };
    } catch {
      return { ok: false as const, error: "Could not parse the generated reading." };
    }
  });
