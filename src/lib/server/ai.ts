import { createServerFn } from "@tanstack/react-start";

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

async function grok(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
  maxTokens = 700,
): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false, error: "AI is not available in this environment" };
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      messages,
      max_tokens: maxTokens,
      temperature: 0.4,
    }),
  });
  if (!res.ok) return { ok: false, error: `xAI API error ${res.status}` };
  const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return { ok: true, text: body.choices?.[0]?.message?.content ?? "" };
}

function statsBlock(s: StatsPayload) {
  return `Learner: ${s.name || "anonymous"}
Start: ${s.startLevel}  Goal: ${s.goalLevel}  Daily minutes: ${s.dailyMinutes}
Day of plan: ${s.day}/365  Streak: ${s.streak}
Due cards: ${s.dueCount}  Accuracy: ${s.accuracy}%  Total reviews: ${s.totalReviews}
Readings completed: ${s.completedReadings}
Skills %: kana ${s.skills.kana ?? 0}, kanji ${s.skills.kanji ?? 0}, vocab ${s.skills.vocab ?? 0}, grammar ${s.skills.grammar ?? 0}, reading ${s.skills.reading ?? 0}
Weak item ids: ${s.weakItems.join(", ") || "none yet"}`;
}

export const askSensei = createServerFn({ method: "POST" })
  .validator((input: { stats: StatsPayload; history: ChatMsg[]; message: string }) => input)
  .handler(async ({ data }) => {
    const history = data.history.slice(-8).map((m) => ({
      role: (m.role === "sensei" ? "assistant" : m.role === "assistant" ? "assistant" : m.role === "system" ? "system" : "user") as
        | "assistant"
        | "user"
        | "system",
      content: m.content,
    }));
    return grok(
      [
        {
          role: "system",
          content:
            "You are Torii Sensei, a precise Japanese teacher helping a learner reach JLPT N2 in one year. Use the stats. Be concrete: name the next drill, a grammar pattern, or a 10–20 minute action. Answer in clear English, include Japanese examples in Japanese script when useful. No emoji. Keep replies under 180 words.",
        },
        { role: "user", content: `STATS\n${statsBlock(data.stats)}` },
        ...history,
        { role: "user", content: data.message.slice(0, 1200) },
      ],
      500,
    );
  });

export const analyzeProgress = createServerFn({ method: "POST" })
  .validator((input: { stats: StatsPayload }) => input)
  .handler(async ({ data }) => {
    const result = await grok(
      [
        {
          role: "system",
          content:
            'You analyze a Japanese learner\'s stats and return JSON only: {"analysis": string, "moves": [{"title": string, "reason": string, "href": string, "minutes": number}]}. href must be one of /app/today, /app/practice/kana, /app/practice/kanji, /app/practice/vocab, /app/practice/grammar, /app/practice/read, /app/write, /app/plan. Exactly 3 moves. analysis: 2-4 sentences, no emoji.',
        },
        { role: "user", content: statsBlock(data.stats) },
      ],
      600,
    );
    if (!result.ok) return result;
    try {
      const json = JSON.parse(result.text.replace(/```json|```/g, "").trim()) as {
        analysis: string;
        moves: { title: string; reason: string; href: string; minutes: number }[];
      };
      return { ok: true as const, analysis: json.analysis, moves: json.moves.slice(0, 3) };
    } catch {
      return { ok: true as const, analysis: result.text, moves: [] as { title: string; reason: string; href: string; minutes: number }[] };
    }
  });

export const gradeWriting = createServerFn({ method: "POST" })
  .validator((input: { text: string; level: string }) => input)
  .handler(async ({ data }) => {
    return grok(
      [
        {
          role: "system",
          content:
            "You are a Japanese writing tutor. Correct the learner's Japanese. Reply in this structure:\nScore: n/10\nCorrected:\n(native rewrite)\nNotes:\n- short bullet issues (particles, tense, word choice)\nNatural alternative:\n(one more natural version)\nEnglish meaning:\n...\nNo emoji. Keep it under 220 words.",
        },
        {
          role: "user",
          content: `Learner level: ${data.level}\nText:\n${data.text.slice(0, 1500)}`,
        },
      ],
      700,
    );
  });

export const generateReading = createServerFn({ method: "POST" })
  .validator((input: { level: string; topic?: string }) => input)
  .handler(async ({ data }) => {
    const result = await grok(
      [
        {
          role: "system",
          content:
            'Create one original Japanese reading passage. JSON only: {"title": string, "text": string, "translation": string, "questions": [{"q": string, "options": [string, string, string, string], "answer": 0-3}]}. text 80-140 Japanese characters for N5, 140-220 for N4, 220-320 for N3, 280-400 for N2. Two questions. No emoji.',
        },
        {
          role: "user",
          content: `Level: ${data.level}. Topic: ${data.topic || "everyday life in Japan"}.`,
        },
      ],
      800,
    );
    if (!result.ok) return result;
    try {
      const json = JSON.parse(result.text.replace(/```json|```/g, "").trim()) as {
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
