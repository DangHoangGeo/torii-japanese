import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-iMDeDDXO.js
async function grok(messages, maxTokens = 700) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment"
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			messages,
			max_tokens: maxTokens,
			temperature: .4
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI API error ${res.status}`
	};
	return {
		ok: true,
		text: (await res.json()).choices?.[0]?.message?.content ?? ""
	};
}
function statsBlock(s) {
	return `Learner: ${s.name || "anonymous"}
Start: ${s.startLevel}  Goal: ${s.goalLevel}  Daily minutes: ${s.dailyMinutes}
Day of plan: ${s.day}/365  Streak: ${s.streak}
Due cards: ${s.dueCount}  Accuracy: ${s.accuracy}%  Total reviews: ${s.totalReviews}
Readings completed: ${s.completedReadings}
Skills %: kana ${s.skills.kana ?? 0}, kanji ${s.skills.kanji ?? 0}, vocab ${s.skills.vocab ?? 0}, grammar ${s.skills.grammar ?? 0}, reading ${s.skills.reading ?? 0}
Weak item ids: ${s.weakItems.join(", ") || "none yet"}`;
}
var askSensei_createServerFn_handler = createServerRpc({
	id: "2a973e3dc8d2f5c59ed9607a5badbc4c66a8e013b41fb2a82dc6df1be4f286cd",
	name: "askSensei",
	filename: "src/lib/server/ai.ts"
}, (opts) => askSensei.__executeServer(opts));
var askSensei = createServerFn({ method: "POST" }).validator((input) => input).handler(askSensei_createServerFn_handler, async ({ data }) => {
	const history = data.history.slice(-8).map((m) => ({
		role: m.role === "sensei" ? "assistant" : m.role === "assistant" ? "assistant" : m.role === "system" ? "system" : "user",
		content: m.content
	}));
	return grok([
		{
			role: "system",
			content: "You are Torii Sensei, a precise Japanese teacher helping a learner reach JLPT N2 in one year. Use the stats. Be concrete: name the next drill, a grammar pattern, or a 10–20 minute action. Answer in clear English, include Japanese examples in Japanese script when useful. No emoji. Keep replies under 180 words."
		},
		{
			role: "user",
			content: `STATS\n${statsBlock(data.stats)}`
		},
		...history,
		{
			role: "user",
			content: data.message.slice(0, 1200)
		}
	], 500);
});
var analyzeProgress_createServerFn_handler = createServerRpc({
	id: "b393e4fc11262229032734424d1471b0a073ebf8fce4aa26f1e4b6c8265e0a42",
	name: "analyzeProgress",
	filename: "src/lib/server/ai.ts"
}, (opts) => analyzeProgress.__executeServer(opts));
var analyzeProgress = createServerFn({ method: "POST" }).validator((input) => input).handler(analyzeProgress_createServerFn_handler, async ({ data }) => {
	const result = await grok([{
		role: "system",
		content: "You analyze a Japanese learner's stats and return JSON only: {\"analysis\": string, \"moves\": [{\"title\": string, \"reason\": string, \"href\": string, \"minutes\": number}]}. href must be one of /app/today, /app/practice/kana, /app/practice/kanji, /app/practice/vocab, /app/practice/grammar, /app/practice/read, /app/write, /app/plan. Exactly 3 moves. analysis: 2-4 sentences, no emoji."
	}, {
		role: "user",
		content: statsBlock(data.stats)
	}], 600);
	if (!result.ok) return result;
	try {
		const json = JSON.parse(result.text.replace(/```json|```/g, "").trim());
		return {
			ok: true,
			analysis: json.analysis,
			moves: json.moves.slice(0, 3)
		};
	} catch {
		return {
			ok: true,
			analysis: result.text,
			moves: []
		};
	}
});
var gradeWriting_createServerFn_handler = createServerRpc({
	id: "76e95ca6e7414e1e65cf960079a5c7c038e14fd4825153aec18aa94ff3228454",
	name: "gradeWriting",
	filename: "src/lib/server/ai.ts"
}, (opts) => gradeWriting.__executeServer(opts));
var gradeWriting = createServerFn({ method: "POST" }).validator((input) => input).handler(gradeWriting_createServerFn_handler, async ({ data }) => {
	return grok([{
		role: "system",
		content: "You are a Japanese writing tutor. Correct the learner's Japanese. Reply in this structure:\nScore: n/10\nCorrected:\n(native rewrite)\nNotes:\n- short bullet issues (particles, tense, word choice)\nNatural alternative:\n(one more natural version)\nEnglish meaning:\n...\nNo emoji. Keep it under 220 words."
	}, {
		role: "user",
		content: `Learner level: ${data.level}\nText:\n${data.text.slice(0, 1500)}`
	}], 700);
});
var generateReading_createServerFn_handler = createServerRpc({
	id: "84cb35e1e32160fcc381a3483bf70953c44b9ca1ab166dde94435483697033ce",
	name: "generateReading",
	filename: "src/lib/server/ai.ts"
}, (opts) => generateReading.__executeServer(opts));
var generateReading = createServerFn({ method: "POST" }).validator((input) => input).handler(generateReading_createServerFn_handler, async ({ data }) => {
	const result = await grok([{
		role: "system",
		content: "Create one original Japanese reading passage. JSON only: {\"title\": string, \"text\": string, \"translation\": string, \"questions\": [{\"q\": string, \"options\": [string, string, string, string], \"answer\": 0-3}]}. text 80-140 Japanese characters for N5, 140-220 for N4, 220-320 for N3, 280-400 for N2. Two questions. No emoji."
	}, {
		role: "user",
		content: `Level: ${data.level}. Topic: ${data.topic || "everyday life in Japan"}.`
	}], 800);
	if (!result.ok) return result;
	try {
		return {
			ok: true,
			passage: JSON.parse(result.text.replace(/```json|```/g, "").trim())
		};
	} catch {
		return {
			ok: false,
			error: "Could not parse the generated reading."
		};
	}
});
//#endregion
export { analyzeProgress_createServerFn_handler, askSensei_createServerFn_handler, generateReading_createServerFn_handler, gradeWriting_createServerFn_handler };
