import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-CgFiPcUT.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ kicker, title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.16em] text-primary uppercase",
					children: kicker
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-2xl font-medium tracking-tight md:text-3xl",
					children: title
				}),
				description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 max-w-xl text-sm text-muted",
					children: description
				}) : null
			]
		}), action]
	});
}
//#endregion
export { PageHeader as t };
