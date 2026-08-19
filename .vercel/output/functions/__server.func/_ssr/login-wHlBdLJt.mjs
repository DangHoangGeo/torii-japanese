import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as useLearner } from "./store-C65o9to-.mjs";
import { t as Button } from "./button-DwrQ7J1j.mjs";
import { t as Card } from "./card-CIRS-Ga3.mjs";
import { r as signIn } from "./client-kg1JE--1.mjs";
import { t as GROK_PROVIDERS } from "./providers-B-AR6wJz.mjs";
import { t as ToriiMark } from "./torii-mark-Dc1sR92X.mjs";
import { t as useHydrated } from "./use-hydrated-DcbUM-dq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-wHlBdLJt.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const hydrated = useHydrated();
	const onboarded = useLearner((s) => s.profile.onboardingDone);
	const next = hydrated && onboarded ? "/app" : "/onboard";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "seigaiha grid min-h-screen place-items-center px-5 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-sm p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToriiMark, { className: "size-10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-4 text-2xl",
					children: "Sign in to Torii"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Google or X saves a cloud snapshot of your path. You can also study as a guest on this device."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 space-y-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "secondary",
						className: "w-full",
						onClick: () => signIn(p.providerId, { callbackURL: next }),
						children: ["Continue with ", p.label]
					}, p.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ink",
					className: "mt-3 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: next,
						children: onboarded ? "Continue as guest" : "Begin as guest"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-center text-xs text-faint",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "underline-offset-4 hover:underline",
						children: "Back to the gate"
					})
				})
			]
		})
	});
}
//#endregion
export { Login as component };
