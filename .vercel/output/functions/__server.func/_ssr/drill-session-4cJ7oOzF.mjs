import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn, m as useLearner } from "./store-C65o9to-.mjs";
import { t as Button } from "./button-DwrQ7J1j.mjs";
import { t as Card } from "./card-CIRS-Ga3.mjs";
import { i as romajiMatch } from "./advisor-SbArqqS5.mjs";
import { t as Progress } from "./progress-DjewRClg.mjs";
import { n as Volume2 } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-BE3SiGoe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drill-session-4cJ7oOzF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function speakJapanese(text) {
	if (typeof window === "undefined" || !window.speechSynthesis) return;
	window.speechSynthesis.cancel();
	const u = new SpeechSynthesisUtterance(text);
	u.lang = "ja-JP";
	u.rate = .9;
	const ja = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("ja"));
	if (ja) u.voice = ja;
	window.speechSynthesis.speak(u);
}
function DrillSession({ items, title, listenFirst = false, onDone }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [phase, setPhase] = (0, import_react.useState)("ask");
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [correctCount, setCorrectCount] = (0, import_react.useState)(0);
	const [finished, setFinished] = (0, import_react.useState)(false);
	const item = items[index];
	const total = items.length;
	(0, import_react.useEffect)(() => {
		if (!item) return;
		if (listenFirst && item.speak) speakJapanese(item.speak);
	}, [item, listenFirst]);
	const isCorrect = (0, import_react.useMemo)(() => {
		if (!item) return false;
		if (item.kind === "kana" && typed.trim()) return romajiMatch(typed, item.answer);
		if (picked) return picked === item.answer;
		return false;
	}, [
		item,
		picked,
		typed
	]);
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl",
			children: "No cards in this set"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Try another practice mode."
		})]
	});
	function reveal(choice) {
		if (phase !== "ask" || !item) return;
		if (choice) setPicked(choice);
		if (item.kind === "kana" && typed.trim() ? romajiMatch(typed, item.answer) : (choice ?? picked) === item.answer) setCorrectCount((c) => c + 1);
		setPhase("reveal");
	}
	function grade(g) {
		if (!item) return;
		const existing = useLearner.getState().cards[item.id];
		const isNew = !existing || existing.reps === 0;
		useLearner.getState().recordReview(item.id, item.kind, g, isNew);
		const next = index + 1;
		if (next >= total) {
			setFinished(true);
			onDone?.({
				correct: correctCount,
				total
			});
			return;
		}
		setIndex(next);
		setPhase("ask");
		setPicked(null);
		setTyped("");
	}
	if (finished) {
		const pct = total ? Math.round(correctCount / total * 100) : 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.16em] text-primary uppercase",
					children: "Session complete"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display mt-2 text-3xl",
					children: [pct, "%"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted",
					children: [
						correctCount,
						" of ",
						total,
						" recalled correctly in ",
						title.toLowerCase(),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-6 max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: pct })
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between gap-3 text-sm text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				title,
				" · ",
				index + 1,
				" / ",
				total
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums",
				children: [correctCount, " correct"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
			value: (index + (phase === "reveal" ? 1 : 0)) / total * 100,
			className: "mb-5"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.14em] text-muted uppercase",
						children: item.sub
					}), item.speak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "Play audio",
						onClick: () => speakJapanese(item.speak),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {})
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("font-display mt-4 text-center leading-none text-fg", listenFirst && phase === "ask" ? "text-lg text-muted" : "text-6xl md:text-7xl"),
					children: listenFirst && phase === "ask" ? "Listen, then choose" : item.prompt
				}),
				item.kind === "kana" && !listenFirst ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					className: "mx-auto mt-8 max-w-sm",
					onSubmit: (e) => {
						e.preventDefault();
						reveal();
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						value: typed,
						onChange: (e) => setTyped(e.target.value),
						placeholder: "Type romaji",
						autoCapitalize: "off",
						autoCorrect: "off",
						spellCheck: false,
						disabled: phase === "reveal"
					})
				}) : null,
				item.options ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2",
					children: item.options.map((opt) => {
						const show = phase === "reveal";
						const right = opt === item.answer;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: phase === "reveal",
							onClick: () => reveal(opt),
							className: cn("min-h-12 rounded-md border px-4 py-3 text-left text-sm transition-colors duration-150", show && right && "border-ok bg-ok/10 text-ok", show && picked === opt && !right && "border-primary bg-primary/10 text-primary", !show && "border-border bg-surface hover:bg-surface-2"),
							children: opt
						}, opt);
					})
				}) : null,
				phase === "reveal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 border-t border-border pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("text-sm font-medium", isCorrect ? "text-ok" : "text-primary"),
							children: isCorrect ? "Correct" : `Answer · ${item.answer}`
						}),
						item.extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: item.extra
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4",
							children: [
								[0, "Again"],
								[1, "Hard"],
								[2, "Good"],
								[3, "Easy"]
							].map(([g, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: g === 0 ? "secondary" : g === 2 || g === 3 ? "default" : "ink",
								onClick: () => grade(g),
								children: label
							}, g))
						})
					]
				}) : item.kind === "kana" && typed.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => reveal(),
						children: "Check"
					})
				}) : null
			]
		})
	] });
}
//#endregion
export { speakJapanese as n, DrillSession as t };
