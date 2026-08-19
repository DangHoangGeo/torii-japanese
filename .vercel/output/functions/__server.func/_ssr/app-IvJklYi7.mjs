import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as estimateLevel, f as snapshotOf, m as useLearner, o as compactStats, p as todayKey } from "./store-C65o9to-.mjs";
import { t as PageHeader } from "./page-header-CgFiPcUT.mjs";
import { t as Button } from "./button-DwrQ7J1j.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CIRS-Ga3.mjs";
import { t as analyzeProgress } from "./ai-2EZJHCUZ.mjs";
import { n as planDayNumber } from "./plan-VdXzvysS.mjs";
import { a as suggestNextMoves, t as analysisParagraph } from "./advisor-SbArqqS5.mjs";
import { t as Progress } from "./progress-DjewRClg.mjs";
import { t as SkillBars } from "./skill-bars-BSwLoJwS.mjs";
import { t as Badge } from "./badge-DNlTHOLa.mjs";
import { g as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-IvJklYi7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const state = useLearner();
	const snap = snapshotOf(state);
	const stats = compactStats(snap);
	const day = planDayNumber(state.profile.startedAt);
	const minutes = state.daily[todayKey()]?.minutes ?? 0;
	const minuteGoal = state.profile.dailyMinutes;
	const moves = suggestNextMoves(snap);
	const localAnalysis = analysisParagraph(snap);
	const levelNow = estimateLevel(state.profile.startLevel, stats.skills);
	const [aiText, setAiText] = (0, import_react.useState)(null);
	const [aiMoves, setAiMoves] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function askAnalysis() {
		setBusy(true);
		try {
			const res = await analyzeProgress({ data: { stats } });
			if (!res.ok) {
				toast.error(res.error);
				return;
			}
			setAiText(res.analysis);
			if (res.moves.length) setAiMoves(res.moves.map((m, i) => ({
				id: `ai-${i}`,
				title: m.title,
				reason: m.reason,
				href: m.href,
				minutes: m.minutes,
				priority: i === 0 ? "high" : "medium"
			})));
		} catch {
			toast.error("The sensei could not be reached.");
		} finally {
			setBusy(false);
		}
	}
	const shownMoves = aiMoves ?? moves;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: `Day ${day} of 365`,
			title: state.profile.name ? `${state.profile.name}、今日も。` : "Open the gate today",
			description: `Working level ${levelNow} · goal ${state.profile.goalLevel} · ${minuteGoal} minutes a day.`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/today",
					children: ["Start today ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				["Streak", `${state.streak}d`],
				["Due", String(stats.dueCount)],
				["Accuracy", `${stats.accuracy}%`],
				["Reviews", String(stats.totalReviews)]
			].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display mt-1 text-2xl tabular-nums",
					children: v
				})]
			}, k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Next moves" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: aiText ?? localAnalysis
						}),
						shownMoves.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: m.href,
							className: "block rounded-md border border-border p-3 hover:bg-surface-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: m.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: m.priority === "high" ? "primary" : "outline",
									children: [m.minutes, " min"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: m.reason
							})]
						}, m.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							disabled: busy,
							onClick: () => void askAnalysis(),
							children: busy ? "Sensei is reading…" : "Ask the sensei to analyze"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Today" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-baseline justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Minutes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [
								minutes,
								" / ",
								minuteGoal
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: Math.min(100, minutes / minuteGoal * 100) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBars, { skills: stats.skills })
					})
				] })]
			})]
		})
	] });
}
//#endregion
export { Dashboard as component };
