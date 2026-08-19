import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn, f as snapshotOf, m as useLearner, o as compactStats } from "./store-C65o9to-.mjs";
import { t as PageHeader } from "./page-header-CgFiPcUT.mjs";
import { t as Button } from "./button-DwrQ7J1j.mjs";
import { t as Card } from "./card-CIRS-Ga3.mjs";
import { n as askSensei } from "./ai-2EZJHCUZ.mjs";
import { i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { t as ToriiMark } from "./torii-mark-Dc1sR92X.mjs";
import { t as Route$13 } from "./practice._kind-MvXFxWMs.mjs";
import { t as auth } from "./server-C21KxFE5.mjs";
import { t as Textarea } from "./textarea-DCOvBwJJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BiglXw11.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "seigaiha flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				className: "size-10 text-primary",
				strokeWidth: 1.75,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-lg font-medium",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
/**
* Whether `origin` is a known Grok embedder. Exported for tests.
* Do not list internal staging hosts here — this file ships in download/export.
*/
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
/** Public preview zone. Staging embedders frame this host via the proxy CSP. */
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
/** Resolve the parent origin to post to, or null when the bridge must noop. */
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	const candidates = [referrer, ancestorOrigin ?? ""].filter(Boolean);
	for (const candidate of candidates) try {
		const origin = candidate.includes("://") ? new URL(candidate).origin : candidate;
		if (isGrokEmbedderOrigin(origin)) return origin;
		if (!isSandboxPreviewGuestHost(guestHostname)) continue;
		const parsed = new URL(origin.includes("://") ? origin : `https://${origin}`);
		if (parsed.protocol === "https:" || parsed.protocol === "http:") return parsed.origin;
	} catch {}
	return null;
}
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-BUjZUyy5.css";
var APP_NAME = "Torii";
var Route$12 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Torii — Japanese from first kana to JLPT N2 in one year. SRS, a 365-day path, and a sensei that reads your stats."
			},
			{
				name: "apple-mobile-web-app-title",
				content: APP_NAME
			},
			{
				name: "theme-color",
				content: "#9a3324"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				property: "og:title",
				content: APP_NAME
			},
			{
				property: "og:type",
				content: "website"
			},
			...[]
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Serif+JP:wght@500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootComponent,
	notFoundComponent: NotFound
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "top-center",
					toastOptions: {
						className: "font-sans text-sm",
						style: {
							background: "var(--color-surface)",
							color: "var(--color-fg)",
							border: "1px solid var(--color-border)"
						}
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "seigaiha grid min-h-screen place-items-center px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToriiMark, { className: "mx-auto size-12" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-display text-4xl text-primary",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "This path does not exist."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 inline-block text-sm text-primary underline-offset-4 hover:underline",
				children: "Return to the gate"
			})
		] })
	});
}
var $$splitComponentImporter$9 = () => import("./routes-v4ExazZ5.mjs");
var Route$11 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./route-BzZEa0ri.mjs");
var Route$10 = createFileRoute("/app")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./login-wHlBdLJt.mjs");
var Route$9 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./onboard-Cz_x8OyM.mjs");
var Route$8 = createFileRoute("/onboard")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./app-IvJklYi7.mjs");
var Route$7 = createFileRoute("/app/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./plan-Cw86IiG9.mjs");
var Route$6 = createFileRoute("/app/plan")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./practice-DaWOutP9.mjs");
var Route$5 = createFileRoute("/app/practice")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var Route$4 = createFileRoute("/app/sensei")({ component: Sensei });
function Sensei() {
	const chat = useLearner((s) => s.chat);
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const endRef = (0, import_react.useRef)(null);
	async function send() {
		const message = text.trim();
		if (!message || busy) return;
		setText("");
		useLearner.getState().addChat({
			role: "user",
			content: message,
			at: (/* @__PURE__ */ new Date()).toISOString()
		});
		setBusy(true);
		try {
			const state = useLearner.getState();
			const res = await askSensei({ data: {
				stats: compactStats(snapshotOf(state)),
				history: state.chat,
				message
			} });
			if (!res.ok) {
				toast.error(res.error);
				useLearner.getState().addChat({
					role: "sensei",
					content: "I could not answer just now. Try again in a moment.",
					at: (/* @__PURE__ */ new Date()).toISOString()
				});
				return;
			}
			useLearner.getState().addChat({
				role: "sensei",
				content: res.text,
				at: (/* @__PURE__ */ new Date()).toISOString()
			});
			endRef.current?.scrollIntoView({ behavior: "smooth" });
		} catch {
			toast.error("The sensei could not be reached.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Sensei",
		title: "Ask with your stats in the room",
		description: "Every question is sent with streak, due cards, skill bars, and weak item ids. Keep it concrete."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex min-h-[28rem] flex-col p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 space-y-3 overflow-y-auto p-5",
			children: [
				chat.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Try: “What should I study in the next twenty minutes?” or “Explain てしまう with two examples.”"
				}) : chat.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("max-w-[85%] rounded-md px-3 py-2 text-sm whitespace-pre-wrap", t.role === "user" ? "ml-auto bg-primary text-primary-fg" : "bg-surface-2 text-fg"),
					children: t.content
				}, `${t.at}-${i}`)),
				busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-faint",
					children: "Sensei is writing…"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "border-t border-border p-4",
			onSubmit: (e) => {
				e.preventDefault();
				send();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: "Ask the sensei",
				className: "min-h-20",
				onKeyDown: (e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						send();
					}
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "mt-3",
				disabled: busy || !text.trim(),
				children: "Send"
			})]
		})]
	})] });
}
var $$splitComponentImporter$2 = () => import("./stats-XDZzzHT1.mjs");
var Route$3 = createFileRoute("/app/stats")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./today-EMRbmD8x.mjs");
var Route$2 = createFileRoute("/app/today")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./write-BksHbnrx.mjs");
var Route$1 = createFileRoute("/app/write")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var AppRouteRoute = Route$10.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$12
});
var LoginRoute = Route$9.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$12
});
var OnboardRoute = Route$8.update({
	id: "/onboard",
	path: "/onboard",
	getParentRoute: () => Route$12
});
var AppIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRouteRoute
});
var AppPlanRoute = Route$6.update({
	id: "/plan",
	path: "/plan",
	getParentRoute: () => AppRouteRoute
});
var AppPracticeRoute = Route$5.update({
	id: "/practice",
	path: "/practice",
	getParentRoute: () => AppRouteRoute
});
var AppSenseiRoute = Route$4.update({
	id: "/sensei",
	path: "/sensei",
	getParentRoute: () => AppRouteRoute
});
var AppStatsRoute = Route$3.update({
	id: "/stats",
	path: "/stats",
	getParentRoute: () => AppRouteRoute
});
var AppTodayRoute = Route$2.update({
	id: "/today",
	path: "/today",
	getParentRoute: () => AppRouteRoute
});
var AppWriteRoute = Route$1.update({
	id: "/write",
	path: "/write",
	getParentRoute: () => AppRouteRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$12
});
var AppPracticeRouteChildren = { AppPracticeKindRoute: Route$13.update({
	id: "/$kind",
	path: "/$kind",
	getParentRoute: () => AppPracticeRoute
}) };
var AppRouteRouteChildren = {
	AppPlanRoute,
	AppPracticeRoute: AppPracticeRoute._addFileChildren(AppPracticeRouteChildren),
	AppSenseiRoute,
	AppStatsRoute,
	AppTodayRoute,
	AppWriteRoute,
	AppIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRouteRoute: AppRouteRoute._addFileChildren(AppRouteRouteChildren),
	LoginRoute,
	OnboardRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { getRouter };
