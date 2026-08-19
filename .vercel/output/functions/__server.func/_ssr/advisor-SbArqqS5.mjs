import { d as shuffle, i as VOCAB, l as getSkillScores, n as GRAMMAR, o as compactStats, r as KANJI, s as dueCount, t as ALL_KANA, u as isDue } from "./store-C65o9to-.mjs";
import { n as planDayNumber } from "./plan-VdXzvysS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advisor-SbArqqS5.js
var ROMAJI_ALTS = {
	shi: ["si"],
	chi: ["ti"],
	tsu: ["tu"],
	fu: ["hu"],
	ji: ["zi", "di"],
	zu: ["du"],
	sha: ["sya"],
	shu: ["syu"],
	sho: ["syo"],
	cha: ["tya"],
	chu: ["tyu"],
	cho: ["tyo"],
	ja: ["zya", "dya"],
	ju: ["zyu", "dyu"],
	jo: ["zyo", "dyo"],
	wo: ["o"]
};
function normalizeRomaji(s) {
	return s.trim().toLowerCase().replace(/\s+/g, "");
}
function romajiMatch(input, target) {
	const a = normalizeRomaji(input);
	const t = normalizeRomaji(target);
	if (a === t) return true;
	return (ROMAJI_ALTS[t] ?? []).includes(a);
}
function toDrill(id, kind) {
	if (kind === "kana") {
		const k = ALL_KANA.find((x) => x.id === id);
		if (!k) return null;
		const distractors = shuffle(ALL_KANA.filter((x) => x.romaji !== k.romaji).map((x) => x.romaji)).slice(0, 3);
		return {
			id,
			kind,
			prompt: k.glyph,
			answer: k.romaji,
			sub: k.script === "hira" ? "Hiragana" : "Katakana",
			speak: k.glyph,
			options: shuffle([k.romaji, ...distractors])
		};
	}
	if (kind === "kanji") {
		const k = KANJI.find((x) => x.id === id);
		if (!k) return null;
		return {
			id,
			kind,
			prompt: k.glyph,
			answer: k.meaning,
			sub: `${k.onyomi} / ${k.kunyomi}`,
			speak: k.example,
			extra: `${k.example}（${k.exampleReading}） ${k.exampleMeaning}`,
			options: shuffle([k.meaning, ...shuffle(KANJI.filter((x) => x.id !== k.id).map((x) => x.meaning)).slice(0, 3)])
		};
	}
	if (kind === "vocab") {
		const v = VOCAB.find((x) => x.id === id);
		if (!v) return null;
		return {
			id,
			kind,
			prompt: v.jp,
			answer: v.meaning,
			sub: `${v.reading} · ${v.pos} · ${v.level}`,
			speak: v.jp,
			options: shuffle([v.meaning, ...shuffle(VOCAB.filter((x) => x.id !== v.id).map((x) => x.meaning)).slice(0, 3)])
		};
	}
	if (kind === "grammar") {
		const g = GRAMMAR.find((x) => x.id === id);
		if (!g) return null;
		return {
			id,
			kind,
			prompt: g.pattern,
			answer: g.meaning,
			sub: g.example,
			speak: g.example,
			extra: g.tip,
			options: shuffle([g.meaning, ...shuffle(GRAMMAR.filter((x) => x.id !== g.id).map((x) => x.meaning)).slice(0, 3)])
		};
	}
	return null;
}
function newPool(level) {
	if (level === "pre") return ALL_KANA.map((k) => ({
		id: k.id,
		kind: "kana"
	}));
	const kanji = KANJI.filter((k) => level === "N5" ? k.level === "N5" : [
		"N5",
		"N4",
		"N3",
		"N2"
	].includes(k.level)).map((k) => ({
		id: k.id,
		kind: "kanji"
	}));
	const vocab = VOCAB.filter((v) => level === "N5" ? v.level === "N5" : true).map((v) => ({
		id: v.id,
		kind: "vocab"
	}));
	const grammar = GRAMMAR.filter((g) => level === "N5" ? g.level === "N5" : true).map((g) => ({
		id: g.id,
		kind: "grammar"
	}));
	return [
		...ALL_KANA.map((k) => ({
			id: k.id,
			kind: "kana"
		})),
		...kanji,
		...vocab,
		...grammar
	];
}
function suggestNextMoves(state) {
	const moves = [];
	const skills = getSkillScores(state.cards, state.completedReadings.length);
	const due = dueCount(state.cards);
	const day = planDayNumber(state.profile.startedAt);
	const level = state.profile.startLevel;
	if (state.streak === 0) moves.push({
		id: "open",
		title: "Open the gate today",
		reason: "A ten-minute session is enough to start a streak and give the sensei real data.",
		href: "/app/today",
		minutes: 10,
		priority: "high"
	});
	if (level === "pre" && skills.kana < 85) {
		const remaining = ALL_KANA.filter((k) => (state.cards[k.id]?.reps ?? 0) < 2).length;
		moves.push({
			id: "kana",
			title: "Clear the kana gate",
			reason: `${remaining} characters still need stable recall. Finish both scripts before heavy kanji.`,
			href: "/app/practice/kana",
			minutes: Math.min(20, state.profile.dailyMinutes),
			priority: "high"
		});
	}
	if (due >= 8) moves.push({
		id: "reviews",
		title: `Clear ${due} due reviews`,
		reason: "Overdue cards decay fast. Protect what you already learned before adding more.",
		href: "/app/today",
		minutes: Math.min(18, Math.ceil(due * .55)),
		priority: "high"
	});
	const weakest = Object.entries(skills).filter(([k]) => k !== "reading" && k !== "writing").sort((a, b) => a[1] - b[1])[0];
	if (weakest && weakest[1] < 62) {
		const m = {
			kana: {
				title: "Strengthen kana accuracy",
				href: "/app/practice/kana",
				reason: "Kana is the foundation for every reading and listening item."
			},
			kanji: {
				title: "Drill weak kanji",
				href: "/app/practice/kanji",
				reason: `Kanji mastery sits at ${weakest[1]}%. Pair meaning with a reading every time.`
			},
			vocab: {
				title: "Expand active vocabulary",
				href: "/app/practice/vocab",
				reason: "You recognize less than you need for the next JLPT band."
			},
			grammar: {
				title: "Repair grammar patterns",
				href: "/app/practice/grammar",
				reason: "Pattern gaps block reading and writing more than missing words."
			}
		}[weakest[0]];
		if (m && !moves.find((x) => x.href === m.href)) moves.push({
			id: `weak-${weakest[0]}`,
			title: m.title,
			reason: m.reason,
			href: m.href,
			minutes: 12,
			priority: moves.some((x) => x.priority === "high") ? "medium" : "high"
		});
	}
	if (state.completedReadings.length < 3) moves.push({
		id: "read",
		title: "One short reading",
		reason: "Reading ties kanji, vocab, and grammar together under light pressure.",
		href: "/app/practice/read",
		minutes: 8,
		priority: "medium"
	});
	if (state.writings.length < 1 && (level === "N4" || level === "N3" || level === "N2")) moves.push({
		id: "write",
		title: "Write three sentences",
		reason: "Production exposes holes that multiple choice hides. The sensei will mark it.",
		href: "/app/write",
		minutes: 10,
		priority: "medium"
	});
	if (moves.length < 3) moves.push({
		id: "today-path",
		title: day <= 28 ? "Today’s guided session" : "Keep the year path moving",
		reason: `Day ${day} of 365. Consistency beats intensity on the road to ${state.profile.goalLevel}.`,
		href: "/app/today",
		minutes: state.profile.dailyMinutes,
		priority: "low"
	});
	const seen = /* @__PURE__ */ new Set();
	const unique = [];
	for (const m of moves) {
		if (seen.has(m.title)) continue;
		seen.add(m.title);
		unique.push(m);
		if (unique.length >= 3) break;
	}
	return unique;
}
function analysisParagraph(state) {
	const stats = compactStats(state);
	if (stats.totalReviews < 6) return `You are on day ${stats.day}. The sensei does not have enough review data yet — complete one Today session so weak spots can be measured. Start gate ${stats.startLevel}, goal ${stats.goalLevel}, ${stats.dailyMinutes} minutes a day.`;
	return `Day ${stats.day} · streak ${stats.streak} · ${stats.dueCount} cards due · accuracy ${stats.accuracy}%. Snapshot — kana ${stats.skills.kana}%, kanji ${stats.skills.kanji}%, vocab ${stats.skills.vocab}%, grammar ${stats.skills.grammar}%, reading ${stats.skills.reading}%. Focus the next block on the lowest bar and clear overdue reviews before adding new material.`;
}
function pickDue(cards, limit) {
	return Object.values(cards).filter((c) => isDue(c)).sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime()).slice(0, limit);
}
function buildTodayQueue(state, size = 12) {
	const items = [];
	const known = /* @__PURE__ */ new Set();
	for (const c of pickDue(state.cards, size)) {
		const d = toDrill(c.id, c.kind);
		if (d) {
			items.push(d);
			known.add(d.id);
		}
	}
	const pool = shuffle(newPool(state.profile.startLevel));
	for (const n of pool) {
		if (items.length >= size) break;
		if (known.has(n.id) || state.cards[n.id]) continue;
		const d = toDrill(n.id, n.kind);
		if (d) {
			items.push(d);
			known.add(d.id);
		}
	}
	if (items.length < 8) for (const k of shuffle(ALL_KANA).slice(0, 8 - items.length)) {
		const d = toDrill(k.id, "kana");
		if (d && !known.has(d.id)) items.push(d);
	}
	return items;
}
function kindQueue(kind, n = 12) {
	const ids = kind === "kana" ? ALL_KANA.map((x) => x.id) : kind === "kanji" ? KANJI.map((x) => x.id) : kind === "vocab" ? VOCAB.map((x) => x.id) : GRAMMAR.map((x) => x.id);
	return shuffle(ids).slice(0, n).map((id) => toDrill(id, kind)).filter((x) => Boolean(x));
}
//#endregion
export { suggestNextMoves as a, romajiMatch as i, buildTodayQueue as n, toDrill as o, kindQueue as r, analysisParagraph as t };
