import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn } from "./store-C65o9to-.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-DjewRClg.js
var import_jsx_runtime = require_jsx_runtime();
function Progress({ className, value = 0, ...props }) {
	const v = Math.max(0, Math.min(100, value ?? 0));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("relative h-1.5 w-full overflow-hidden rounded-full bg-surface-2", className),
		value: v,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			className: "h-full bg-primary transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
			style: { transform: `translateX(-${100 - v}%)` }
		})
	});
}
//#endregion
export { Progress as t };
