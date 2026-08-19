import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as VOCAB, m as useLearner, n as GRAMMAR, r as KANJI, t as ALL_KANA } from "./store-C65o9to-.mjs";
import { t as PageHeader } from "./page-header-CgFiPcUT.mjs";
import { t as Card } from "./card-CIRS-Ga3.mjs";
import { f as Ear, h as BookOpen, r as Type, s as PenLine, t as WholeWord, u as Languages } from "../_libs/lucide-react.mjs";
import { t as READINGS } from "./readings-Fa8Pb2fW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-DaWOutP9.js
var import_jsx_runtime = require_jsx_runtime();
var MODES = [
	{
		kind: "kana",
		title: "Kana",
		body: "Hiragana and katakana, typed romaji plus multiple choice. Chart included.",
		icon: Type,
		count: `${ALL_KANA.length} characters`
	},
	{
		kind: "kanji",
		title: "Kanji",
		body: "Meaning, on/kun, and an example compound at N5–N2.",
		icon: Languages,
		count: `${KANJI.length} characters`
	},
	{
		kind: "vocab",
		title: "Vocabulary",
		body: "Core words from greetings through N2 abstract nouns.",
		icon: WholeWord,
		count: `${VOCAB.length} words`
	},
	{
		kind: "grammar",
		title: "Grammar",
		body: "Patterns with a tip, an example, and SRS scheduling.",
		icon: BookOpen,
		count: `${GRAMMAR.length} patterns`
	},
	{
		kind: "listen",
		title: "Listening",
		body: "Audio first. Identify the kana you heard.",
		icon: Ear,
		count: "Kana ear training"
	},
	{
		kind: "read",
		title: "Reading",
		body: "Graded passages with questions. Ask the sensei for a new one.",
		icon: PenLine,
		count: `${READINGS.length} built-in + generate`
	}
];
function PracticeHub() {
	const cards = useLearner((s) => s.cards);
	const readings = useLearner((s) => s.completedReadings.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Dojo",
		title: "Practice",
		description: "Pick a skill. Reviews you miss here still feed the same SRS deck as Today."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2",
		children: MODES.map((m) => {
			const seen = Object.values(cards).filter((c) => c.kind === m.kind && c.reps > 0).length;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app/practice/$kind",
				params: { kind: m.kind },
				className: "block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "h-full p-5 transition-colors hover:bg-surface-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, {
							className: "size-5 text-primary",
							strokeWidth: 1.75
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-3 text-xl",
							children: m.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: m.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-faint",
							children: [m.count, m.kind !== "read" && m.kind !== "listen" ? ` · ${seen} seen` : m.kind === "read" ? ` · ${readings} finished` : null]
						})
					]
				})
			}, m.kind);
		})
	})] });
}
//#endregion
export { PracticeHub as component };
