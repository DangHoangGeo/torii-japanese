import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { a as cn, m as useLearner } from "./store-C65o9to-.mjs";
import { t as Button } from "./button-DwrQ7J1j.mjs";
import { t as Card } from "./card-CIRS-Ga3.mjs";
import { t as Progress } from "./progress-DjewRClg.mjs";
import { t as ToriiMark } from "./torii-mark-Dc1sR92X.mjs";
import { t as useHydrated } from "./use-hydrated-DcbUM-dq.mjs";
import { t as Input } from "./input-BE3SiGoe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboard-Cz_x8OyM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PLACEMENT = [
	{
		id: "p1",
		prompt: "What is the romaji for あ?",
		options: [
			"a",
			"i",
			"u",
			"e"
		],
		answer: 0,
		level: "pre",
		skill: "kana"
	},
	{
		id: "p2",
		prompt: "What is the romaji for し?",
		options: [
			"si",
			"chi",
			"shi",
			"tsu"
		],
		answer: 2,
		level: "pre",
		skill: "kana"
	},
	{
		id: "p3",
		prompt: "Katakana カ is…",
		options: [
			"sa",
			"ka",
			"ta",
			"na"
		],
		answer: 1,
		level: "pre",
		skill: "kana"
	},
	{
		id: "p4",
		prompt: "「こんにちは」 means…",
		options: [
			"Good night",
			"Thank you",
			"Hello",
			"Excuse me"
		],
		answer: 2,
		level: "N5",
		skill: "vocab"
	},
	{
		id: "p5",
		prompt: "Select the object particle: 本___読む",
		options: [
			"は",
			"が",
			"を",
			"に"
		],
		answer: 2,
		level: "N5",
		skill: "grammar"
	},
	{
		id: "p6",
		prompt: "Meaning of 食べる",
		options: [
			"to drink",
			"to eat",
			"to sleep",
			"to run"
		],
		answer: 1,
		level: "N5",
		skill: "vocab"
	},
	{
		id: "p7",
		prompt: "Kanji 山 means…",
		options: [
			"river",
			"mountain",
			"tree",
			"fire"
		],
		answer: 1,
		level: "N5",
		skill: "kanji"
	},
	{
		id: "p8",
		prompt: "The て-form of 食べる is…",
		options: [
			"食べて",
			"食べた",
			"食べない",
			"食べます"
		],
		answer: 0,
		level: "N5",
		skill: "grammar"
	},
	{
		id: "p9",
		prompt: "仕事 means…",
		options: [
			"school",
			"work / job",
			"holiday",
			"friend"
		],
		answer: 1,
		level: "N4",
		skill: "vocab"
	},
	{
		id: "p10",
		prompt: "〜なければならない expresses…",
		options: [
			"desire",
			"permission",
			"obligation",
			"hearsay"
		],
		answer: 2,
		level: "N4",
		skill: "grammar"
	},
	{
		id: "p11",
		prompt: "Kanji 使 in 使う means…",
		options: [
			"wait",
			"use",
			"make",
			"know"
		],
		answer: 1,
		level: "N4",
		skill: "kanji"
	},
	{
		id: "p12",
		prompt: "確認 means…",
		options: [
			"reservation",
			"confirmation",
			"experience",
			"proposal"
		],
		answer: 1,
		level: "N3",
		skill: "vocab"
	},
	{
		id: "p13",
		prompt: "〜ことにする means…",
		options: [
			"decide to",
			"look like",
			"must not",
			"while doing"
		],
		answer: 0,
		level: "N3",
		skill: "grammar"
	},
	{
		id: "p14",
		prompt: "状況 is closest to…",
		options: [
			"method",
			"situation",
			"priority",
			"efficiency"
		],
		answer: 1,
		level: "N3",
		skill: "vocab"
	},
	{
		id: "p15",
		prompt: "〜につれて is closest to…",
		options: [
			"in spite of",
			"as / in proportion to",
			"instead of",
			"only"
		],
		answer: 1,
		level: "N2",
		skill: "grammar"
	},
	{
		id: "p16",
		prompt: "優先 means…",
		options: [
			"proposal",
			"continuation",
			"priority",
			"premise"
		],
		answer: 2,
		level: "N2",
		skill: "vocab"
	}
];
function scoreToLevel(correct, total) {
	const r = total === 0 ? 0 : correct / total;
	if (r < .25) return "pre";
	if (r < .45) return "N5";
	if (r < .65) return "N4";
	if (r < .85) return "N3";
	return "N2";
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-sm font-medium text-fg", className),
		...props
	});
}
var MINUTES = [
	15,
	25,
	40,
	60
];
var GOALS = ["N3", "N2"];
function Onboard() {
	const hydrated = useHydrated();
	const onboarded = useLearner((s) => s.profile.onboardingDone);
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [name, setName] = (0, import_react.useState)("");
	const [minutes, setMinutes] = (0, import_react.useState)(25);
	const [goal, setGoal] = (0, import_react.useState)("N2");
	const [q, setQ] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)([]);
	if (hydrated && onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/app" });
	const correct = answers.reduce((n, a, i) => n + (a === PLACEMENT[i].answer ? 1 : 0), 0);
	const startLevel = scoreToLevel(correct, PLACEMENT.length);
	function pick(i) {
		const next = [...answers, i];
		setAnswers(next);
		if (q + 1 >= PLACEMENT.length) setStep(2);
		else setQ(q + 1);
	}
	function finish(level, score) {
		useLearner.getState().completeOnboarding({
			name: name.trim(),
			startLevel: level,
			goalLevel: goal,
			dailyMinutes: minutes,
			placementScore: score
		});
		navigate({ to: "/app" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "seigaiha min-h-screen px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-8 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToriiMark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg",
						children: "Torii"
					})]
				}),
				step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.16em] text-primary uppercase",
							children: "Step 1 of 3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display mt-2 text-2xl",
							children: "Set the gate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Name is optional. Minutes and goal shape the year path. You can skip the quiz and start from kana."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "What should the sensei call you?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									className: "mt-1.5",
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "Optional"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Daily minutes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 grid grid-cols-4 gap-2",
									children: MINUTES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setMinutes(m),
										className: cn("h-11 rounded-md border text-sm tabular-nums", minutes === m ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface hover:bg-surface-2"),
										children: m
									}, m))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Goal in twelve months"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 grid grid-cols-2 gap-2",
									children: GOALS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setGoal(g),
										className: cn("h-11 rounded-md border text-sm", goal === g ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface hover:bg-surface-2"),
										children: g
									}, g))
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1",
								onClick: () => setStep(1),
								children: "Take the placement"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								className: "flex-1",
								onClick: () => finish("pre", 0),
								children: "Start from kana"
							})]
						})
					]
				}) : null,
				step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-medium tracking-[0.16em] text-primary uppercase",
							children: [
								"Question ",
								q + 1,
								" of ",
								PLACEMENT.length
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							className: "mt-3",
							value: q / PLACEMENT.length * 100
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display mt-6 text-2xl",
							children: PLACEMENT[q].prompt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-faint",
							children: [
								PLACEMENT[q].level,
								" · ",
								PLACEMENT[q].skill
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-2",
							children: PLACEMENT[q].options.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => pick(i),
								className: "min-h-12 rounded-md border border-border bg-surface px-4 py-3 text-left text-sm hover:bg-surface-2",
								children: opt
							}, opt))
						})
					]
				}) : null,
				step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.16em] text-primary uppercase",
							children: "Placement"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display mt-2 text-3xl",
							children: ["Start at ", startLevel]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								correct,
								" of ",
								PLACEMENT.length,
								" correct. The year path will open at this gate and aim for ",
								goal,
								", ",
								minutes,
								" minutes a day."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-7 w-full",
							size: "lg",
							onClick: () => finish(startLevel, correct),
							children: "Open the desk"
						})
					]
				}) : null
			]
		})
	});
}
//#endregion
export { Onboard as component };
