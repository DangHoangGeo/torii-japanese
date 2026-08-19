import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as estimateLevel, l as getSkillScores, m as useLearner } from "./store-C65o9to-.mjs";
import { t as PageHeader } from "./page-header-CgFiPcUT.mjs";
import { t as Button } from "./button-DwrQ7J1j.mjs";
import { t as Card } from "./card-CIRS-Ga3.mjs";
import { i as gradeWriting } from "./ai-2EZJHCUZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-DCOvBwJJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/write-BksHbnrx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PROMPTS = [
	"Write three sentences about your morning.",
	"Describe a place you like in your town.",
	"Explain why you are studying Japanese.",
	"Write a short message to a coworker about being late."
];
function WritePage() {
	const writings = useLearner((s) => s.writings);
	const profile = useLearner((s) => s.profile);
	const cards = useLearner((s) => s.cards);
	const readings = useLearner((s) => s.completedReadings.length);
	const skills = getSkillScores(cards, readings, writings.length);
	const level = estimateLevel(profile.startLevel, skills);
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [prompt] = (0, import_react.useState)(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
	async function submit() {
		const body = text.trim();
		if (!body || busy) return;
		setBusy(true);
		try {
			const res = await gradeWriting({ data: {
				text: body,
				level
			} });
			if (!res.ok) {
				toast.error(res.error);
				return;
			}
			useLearner.getState().addWriting(body, res.text);
			useLearner.getState().addMinutes(8);
			setText("");
		} catch {
			toast.error("The sensei could not mark this yet.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Production",
			title: "Writing desk",
			description: `Level ${level}. Three sentences is enough. The sensei returns a score, a rewrite, and notes.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["Prompt · ", prompt]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-3 min-h-40 font-display text-lg",
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "日本語で書いてください"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					disabled: busy || !text.trim(),
					onClick: () => void submit(),
					children: busy ? "Marking…" : "Ask the sensei to mark"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-3",
			children: writings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Marked pages will appear here."
			}) : [...writings].reverse().map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-faint",
						children: new Date(w.at).toLocaleString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display mt-2 text-lg whitespace-pre-wrap",
						children: w.text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-3 overflow-x-auto whitespace-pre-wrap font-sans text-sm text-muted",
						children: w.feedback
					})
				]
			}, w.at))
		})
	] });
}
//#endregion
export { WritePage as component };
