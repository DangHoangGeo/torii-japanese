import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn } from "./store-C65o9to-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-BE3SiGoe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = (0, import_react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40", className),
	...props
}));
Input.displayName = "Input";
//#endregion
export { Input as t };
