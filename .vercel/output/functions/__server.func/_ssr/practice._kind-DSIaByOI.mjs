import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn, d as shuffle, m as useLearner, t as ALL_KANA } from "./store-C65o9to-.mjs";
import { t as PageHeader } from "./page-header-CgFiPcUT.mjs";
import { t as Button } from "./button-DwrQ7J1j.mjs";
import { t as Card } from "./card-CIRS-Ga3.mjs";
import { r as generateReading } from "./ai-2EZJHCUZ.mjs";
import { o as toDrill, r as kindQueue } from "./advisor-SbArqqS5.mjs";
import { t as Badge } from "./badge-DNlTHOLa.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as READINGS } from "./readings-Fa8Pb2fW.mjs";
import { t as Route } from "./practice._kind-MvXFxWMs.mjs";
import { n as speakJapanese, t as DrillSession } from "./drill-session-4cJ7oOzF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice._kind-DSIaByOI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLS = [
	"a",
	"i",
	"u",
	"e",
	"o"
];
function cellFor(script, group, vowel) {
	const want = vowel === "n" ? "n" : group === "vowels" ? vowel : group + vowel;
	return ALL_KANA.find((k) => k.script === script && k.romaji === want);
}
var ROWS = [
	{
		group: "vowels",
		label: ""
	},
	{
		group: "k",
		label: "k"
	},
	{
		group: "s",
		label: "s"
	},
	{
		group: "t",
		label: "t"
	},
	{
		group: "n",
		label: "n"
	},
	{
		group: "h",
		label: "h"
	},
	{
		group: "m",
		label: "m"
	},
	{
		group: "y",
		label: "y"
	},
	{
		group: "r",
		label: "r"
	},
	{
		group: "w",
		label: "w"
	}
];
function KanaChart({ script }) {
	const cards = useLearner((s) => s.cards);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[20rem] border-collapse text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-8 p-1 text-xs font-medium text-faint" }), COLS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "p-1 text-xs font-medium text-faint",
				children: c
			}, c))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "p-1 text-xs font-medium text-faint",
				children: row.label
			}), COLS.map((vowel) => {
				if (row.group === "y" && (vowel === "i" || vowel === "e")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "p-0.5" }, vowel);
				if (row.group === "w" && vowel !== "a" && vowel !== "o") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "p-0.5" }, vowel);
				const k = cellFor(script, row.group, vowel);
				if (!k) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "p-0.5" }, vowel);
				const learned = (cards[k.id]?.reps ?? 0) >= 2;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "p-0.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => speakJapanese(k.glyph),
						className: cn("flex h-12 w-full flex-col items-center justify-center rounded-sm border text-fg", learned ? "border-ok/30 bg-ok/5" : "border-border bg-surface hover:bg-surface-2"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg leading-none",
							children: k.glyph
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-faint",
							children: k.romaji
						})]
					})
				}, vowel);
			})] }, row.group)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "p-1 text-xs font-medium text-faint",
				children: "n"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "p-0.5",
				colSpan: 5,
				children: (() => {
					const k = ALL_KANA.find((x) => x.script === script && x.romaji === "n");
					if (!k) return null;
					const learned = (cards[k.id]?.reps ?? 0) >= 2;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => speakJapanese(k.glyph),
						className: cn("flex h-12 w-20 flex-col items-center justify-center rounded-sm border", learned ? "border-ok/30 bg-ok/5" : "border-border bg-surface hover:bg-surface-2"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg leading-none",
							children: k.glyph
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-faint",
							children: "n"
						})]
					});
				})()
			})] })] })]
		})
	});
}
var TITLES = {
	kana: {
		kicker: "Script",
		title: "Kana",
		description: "Type romaji or tap a choice. Green cells on the chart have two successful reviews."
	},
	kanji: {
		kicker: "Characters",
		title: "Kanji",
		description: "Match the glyph to its meaning. Open extra for the compound."
	},
	vocab: {
		kicker: "Words",
		title: "Vocabulary",
		description: "Japanese prompt, English meaning. Audio on every card."
	},
	grammar: {
		kicker: "Patterns",
		title: "Grammar",
		description: "See the pattern, recall the meaning, read the tip after you grade."
	},
	listen: {
		kicker: "Ear",
		title: "Listening",
		description: "The glyph stays hidden until you answer. Replay as often as you need."
	},
	read: {
		kicker: "Text",
		title: "Reading",
		description: "Short passages from N5 to N2, plus a sensei-generated text on demand."
	}
};
function PracticeKind() {
	const { kind } = Route.useParams();
	const meta = TITLES[kind];
	const items = (0, import_react.useMemo)(() => {
		if (kind === "listen") return shuffle(ALL_KANA).slice(0, 12).map((k) => toDrill(k.id, "kana")).filter((x) => Boolean(x));
		if (kind === "kana" || kind === "kanji" || kind === "vocab" || kind === "grammar") return kindQueue(kind, 12);
		return kindQueue("kana", 12);
	}, [kind]);
	if (!meta) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/app/practice" });
	if (kind === "read") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadingStudio, { meta });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: meta.kicker,
			title: meta.title,
			description: meta.description
		}),
		kind === "kana" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm font-medium",
					children: "Hiragana"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KanaChart, { script: "hira" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm font-medium",
					children: "Katakana"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KanaChart, { script: "kata" })]
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillSession, {
			title: meta.title,
			items,
			listenFirst: kind === "listen"
		})
	] });
}
function ReadingStudio({ meta }) {
	const completed = useLearner((s) => s.completedReadings);
	const level = useLearner((s) => s.profile.startLevel);
	const [active, setActive] = (0, import_react.useState)(null);
	const [generated, setGenerated] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const all = [...READINGS, ...generated];
	async function makeOne() {
		setBusy(true);
		try {
			const res = await generateReading({ data: {
				level: level === "pre" ? "N5" : level,
				topic: "everyday life in Japan"
			} });
			if (!res.ok) {
				toast.error(res.error);
				return;
			}
			const passage = {
				id: `gen-${Date.now()}`,
				title: res.passage.title,
				level: level === "pre" ? "N5" : level,
				text: res.passage.text,
				translation: res.passage.translation,
				questions: res.passage.questions
			};
			setGenerated((g) => [passage, ...g]);
			setActive(passage);
		} catch {
			toast.error("Could not generate a reading.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: meta.kicker,
		title: meta.title,
		description: meta.description,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "secondary",
			disabled: busy,
			onClick: () => void makeOne(),
			children: busy ? "Writing…" : "Generate a passage"
		})
	}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadingView, {
		item: active,
		onBack: () => setActive(null)
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-3",
		children: all.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setActive(r),
			className: "w-full rounded-xl border border-border bg-surface p-5 text-left paper-shadow hover:bg-surface-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg",
					children: r.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: r.level
					}), completed.includes(r.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "primary",
						children: "Done"
					}) : null]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 line-clamp-2 font-display text-sm text-muted",
				children: r.text
			})]
		}) }, r.id))
	})] });
}
function ReadingView({ item, onBack }) {
	const done = useLearner((s) => s.completedReadings.includes(item.id));
	const [qi, setQi] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [correct, setCorrect] = (0, import_react.useState)(0);
	const [showTr, setShowTr] = (0, import_react.useState)(false);
	const q = item.questions[qi];
	const finished = qi >= item.questions.length;
	function choose(i) {
		if (picked !== null) return;
		setPicked(i);
		if (i === q.answer) setCorrect((c) => c + 1);
	}
	function next() {
		if (qi + 1 >= item.questions.length) {
			setQi(item.questions.length);
			if (!done) useLearner.getState().completeReading(item.id, correct, item.questions.length);
			return;
		}
		setQi(qi + 1);
		setPicked(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "sm",
			onClick: onBack,
			children: "All passages"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-3 p-6 md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: item.level
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-2 text-2xl",
						children: item.title
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "sm",
						onClick: () => speakJapanese(item.text),
						children: "Listen"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display mt-6 text-lg leading-relaxed",
					children: item.text
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-4 text-sm text-primary underline-offset-4 hover:underline",
					onClick: () => setShowTr((v) => !v),
					children: showTr ? "Hide translation" : "Show translation"
				}),
				showTr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: item.translation
				}) : null
			]
		}),
		!finished && q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4 p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-faint",
					children: [
						"Question ",
						qi + 1,
						" of ",
						item.questions.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-medium",
					children: q.q
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-2",
					children: q.options.map((opt, i) => {
						const show = picked !== null;
						const right = i === q.answer;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => choose(i),
							className: `min-h-11 rounded-md border px-4 py-2.5 text-left text-sm ${show && right ? "border-ok bg-ok/10 text-ok" : show && i === picked ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface hover:bg-surface-2"}`,
							children: opt
						}, opt);
					})
				}),
				picked !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: next,
					children: qi + 1 >= item.questions.length ? "Finish" : "Next"
				}) : null
			]
		}) : finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-xl",
				children: [
					correct,
					" / ",
					item.questions.length,
					" correct"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onBack,
					children: "Back to list"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/today",
						children: "Today"
					})
				})]
			})]
		}) : null
	] });
}
//#endregion
export { PracticeKind as component };
