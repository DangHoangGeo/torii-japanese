import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as snapshotOf, m as useLearner, o as compactStats, p as todayKey } from "./store-C65o9to-.mjs";
import { t as PageHeader } from "./page-header-CgFiPcUT.mjs";
import { t as Button } from "./button-DwrQ7J1j.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CIRS-Ga3.mjs";
import { t as analyzeProgress } from "./ai-2EZJHCUZ.mjs";
import { a as suggestNextMoves, t as analysisParagraph } from "./advisor-SbArqqS5.mjs";
import { t as SkillBars } from "./skill-bars-BSwLoJwS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-XDZzzHT1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function lastDays(n) {
	const out = [];
	const now = /* @__PURE__ */ new Date();
	for (let i = n - 1; i >= 0; i--) {
		const d = new Date(now);
		d.setDate(now.getDate() - i);
		out.push(todayKey(d));
	}
	return out;
}
function StatsPage() {
	const state = useLearner();
	const snap = snapshotOf(state);
	const stats = compactStats(snap);
	const moves = suggestNextMoves(snap);
	const [ai, setAi] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const series = (0, import_react.useMemo)(() => {
		return lastDays(14).map((d) => {
			const log = state.daily[d];
			return {
				day: d.slice(5),
				xp: log?.xp ?? 0,
				reviews: log?.reviews ?? 0,
				minutes: log?.minutes ?? 0
			};
		});
	}, [state.daily]);
	async function run() {
		setBusy(true);
		try {
			const res = await analyzeProgress({ data: { stats } });
			if (!res.ok) {
				toast.error(res.error);
				return;
			}
			setAi(res.analysis);
		} catch {
			toast.error("The sensei could not be reached.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Record",
			title: "Stats",
			description: "Accuracy, volume, and skill bars. Ask the sensei only when you want a fresh reading.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				disabled: busy,
				onClick: () => void run(),
				children: busy ? "Analyzing…" : "Analyze with sensei"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				["Streak", `${state.streak} days`],
				["Accuracy", `${stats.accuracy}%`],
				["Due now", String(stats.dueCount)],
				["Readings", String(stats.completedReadings)]
			].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display mt-1 text-xl tabular-nums",
					children: v
				})]
			}, k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "XP · 14 days" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: series,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-border)",
									strokeDasharray: "3 3",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "day",
									tick: {
										fill: "var(--color-muted)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fill: "var(--color-muted)",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false,
									width: 28
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--color-surface)",
									border: "1px solid var(--color-border)",
									borderRadius: 8,
									fontSize: 12
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "xp",
									fill: "var(--color-primary)",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Skills" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBars, { skills: stats.skills }) })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "Reading of the record"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: ai ?? analysisParagraph(snap)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2",
					children: moves.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: m.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" — ", m.reason]
						})]
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					className: "mt-6",
					onClick: () => {
						if (window.confirm("Reset all progress on this device? This cannot be undone.")) useLearner.getState().resetAll();
					},
					children: "Reset this device"
				})
			]
		})
	] });
}
//#endregion
export { StatsPage as component };
