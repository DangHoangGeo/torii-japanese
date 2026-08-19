import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Progress } from "./progress-DjewRClg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skill-bars-BSwLoJwS.js
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	kana: "Kana",
	kanji: "Kanji",
	vocab: "Vocab",
	grammar: "Grammar",
	reading: "Reading",
	writing: "Writing"
};
function SkillBars({ skills }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-3",
		children: [
			"kana",
			"kanji",
			"vocab",
			"grammar",
			"reading",
			"writing"
		].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex items-baseline justify-between text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: LABELS[k] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums text-muted",
				children: [skills[k], "%"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: skills[k] })] }, k))
	});
}
//#endregion
export { SkillBars as t };
