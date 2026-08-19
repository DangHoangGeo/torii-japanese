import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as snapshotOf, m as useLearner, p as todayKey } from "./store-C65o9to-.mjs";
import { t as PageHeader } from "./page-header-CgFiPcUT.mjs";
import { t as Button } from "./button-DwrQ7J1j.mjs";
import { t as Card } from "./card-CIRS-Ga3.mjs";
import { n as planDayNumber } from "./plan-VdXzvysS.mjs";
import { n as buildTodayQueue } from "./advisor-SbArqqS5.mjs";
import { t as DrillSession } from "./drill-session-4cJ7oOzF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/today-EMRbmD8x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Today() {
	const state = useLearner();
	const [queue] = (0, import_react.useState)(() => buildTodayQueue(snapshotOf(useLearner.getState()), 12));
	const [started, setStarted] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const day = planDayNumber(state.profile.startedAt);
	const today = state.daily[todayKey()];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: `Day ${day}`,
			title: "Today’s sitting",
			description: "Due reviews first, then new items at your gate. Twelve cards is a full pass."
		}),
		!started ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Queue of ",
						queue.length,
						" · already ",
						today?.reviews ?? 0,
						" reviews today ·",
						" ",
						today?.minutes ?? 0,
						" minutes logged."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-3",
					children: [
						"kana",
						"kanji",
						"vocab",
						"grammar"
					].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-md border border-border px-3 py-2 capitalize",
						children: [
							k,
							" · ",
							queue.filter((q) => q.kind === k).length
						]
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6",
					size: "lg",
					onClick: () => setStarted(true),
					children: "Begin the sitting"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillSession, {
			title: "Today",
			items: queue,
			onDone: (r) => {
				setDone(true);
				useLearner.getState().addMinutes(Math.max(4, Math.round(r.total * .45)));
			}
		}),
		done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app",
					children: "Back to the desk"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/practice",
					children: "More practice"
				})
			})]
		}) : null
	] });
}
//#endregion
export { Today as component };
