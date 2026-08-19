import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn, m as useLearner } from "./store-C65o9to-.mjs";
import { t as PageHeader } from "./page-header-CgFiPcUT.mjs";
import { t as Card } from "./card-CIRS-Ga3.mjs";
import { n as planDayNumber, t as buildYearPlan } from "./plan-VdXzvysS.mjs";
import { t as Progress } from "./progress-DjewRClg.mjs";
import { t as Badge } from "./badge-DNlTHOLa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plan-Cw86IiG9.js
var import_jsx_runtime = require_jsx_runtime();
function PlanPage() {
	const profile = useLearner((s) => s.profile);
	const day = planDayNumber(profile.startedAt);
	const week = Math.min(52, Math.max(1, Math.ceil(day / 7)));
	const plan = buildYearPlan(profile.startLevel, profile.dailyMinutes);
	const current = plan[week - 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "365 days",
			title: "Year path",
			description: `Gate ${profile.startLevel} → ${profile.goalLevel}. Week ${week} of 52.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "This week"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: current?.title
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "primary",
						children: current?.phase
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-wrap gap-2",
					children: current?.focus.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: f
					}) }, f))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex justify-between text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Year" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [day, " / 365"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: Math.min(100, day / 365 * 100) })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
			children: plan.map((w) => {
				const isNow = w.week === week;
				const past = w.week < week;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("rounded-md border px-3 py-3", isNow ? "border-primary bg-primary/5" : "border-border bg-surface", past && "opacity-70"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs tabular-nums text-faint",
								children: ["W", w.week]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: w.phase
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-medium",
							children: w.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-xs text-muted",
							children: w.focus.join(" · ")
						})
					]
				}, w.week);
			})
		})
	] });
}
//#endregion
export { PlanPage as component };
