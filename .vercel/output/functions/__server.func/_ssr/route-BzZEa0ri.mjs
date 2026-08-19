import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, m as Outlet, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { a as cn, f as snapshotOf, m as useLearner } from "./store-C65o9to-.mjs";
import { t as Button } from "./button-DwrQ7J1j.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D75-wYbG.mjs";
import { c as MessageSquare, d as House, h as BookOpen, l as Menu, m as CalendarRange, o as Sunrise, p as ChartNoAxesColumn, s as PenLine } from "../_libs/lucide-react.mjs";
import { i as signOut, t as authClient } from "./client-kg1JE--1.mjs";
import { t as authMiddleware } from "./middleware-BLpY-Ok_.mjs";
import { t as ToriiMark } from "./torii-mark-Dc1sR92X.mjs";
import { t as useHydrated } from "./use-hydrated-DcbUM-dq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-BzZEa0ri.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled (default) -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
/** Render children only when a user is present (real session, or the disabled-auth dev user). */
function SignedIn({ children }) {
	const { user } = useCurrentUserState();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
}
/**
* Render children only once we KNOW the visitor is signed out (`isPending` has
* cleared and there is no user). Hidden while the session is still loading.
*/
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of).
*/
function UserButton() {
	const user = useCurrentUser();
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-sm font-medium",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void signOut(),
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline",
				children: "Sign out"
			})
		]
	});
}
var PRIMARY = [
	{
		to: "/app",
		label: "Home",
		icon: House,
		exact: true
	},
	{
		to: "/app/today",
		label: "Today",
		icon: Sunrise,
		exact: false
	},
	{
		to: "/app/practice",
		label: "Practice",
		icon: BookOpen,
		exact: false
	},
	{
		to: "/app/sensei",
		label: "Sensei",
		icon: MessageSquare,
		exact: false
	},
	{
		to: "/app/stats",
		label: "Stats",
		icon: ChartNoAxesColumn,
		exact: false
	}
];
var SECONDARY = [{
	to: "/app/plan",
	label: "Year path",
	icon: CalendarRange
}, {
	to: "/app/write",
	label: "Writing",
	icon: PenLine
}];
function NavLink({ to, label, icon: Icon, exact, dense }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const active = exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex items-center gap-2.5 rounded-md px-3 text-sm transition-colors duration-150", dense ? "h-11 flex-col justify-center gap-0.5 px-2 text-[11px]" : "h-10", active ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface-2 hover:text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: dense ? "size-4" : "size-4",
			strokeWidth: 1.75
		}), label]
	});
}
function AuthSlot() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-24 animate-pulse rounded-full bg-surface-2" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: "secondary",
		size: "sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			children: "Sign in"
		})
	});
}
function AppShell() {
	const [more, setMore] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "seigaiha min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-20 hidden w-56 flex-col border-r border-border bg-surface/90 px-3 py-5 backdrop-blur-sm md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app",
						className: "mb-6 flex items-center gap-2 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToriiMark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg",
							children: "Torii"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-1 flex-col gap-0.5",
						children: [
							PRIMARY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { ...item }, item.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-px bg-border" }),
							SECONDARY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { ...item }, item.to))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-1 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 px-2 text-xs text-faint",
								children: "Progress is saved on this device. Sign in to keep it across devices."
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 px-2 text-xs text-faint",
								children: "Cloud snapshot is on."
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex items-center justify-between border-b border-border bg-bg/90 px-4 py-3 backdrop-blur-sm md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToriiMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base",
						children: "Torii"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "More",
						onClick: () => setMore((v) => !v),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					})]
				})]
			}),
			more ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border bg-surface px-3 py-2 md:hidden",
				children: SECONDARY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { ...item }, item.to))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "px-4 py-6 pb-28 md:ml-56 md:px-8 md:pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-5xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden",
				children: PRIMARY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
					...item,
					dense: true
				}, item.to))
			})
		]
	});
}
var loadRemoteSnapshot = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("a37a5755eb18b6df4de309963600f27b8f4309eb5048f10d9f95543dbc519a20"));
var saveRemoteSnapshot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("c55d598bff5a7c4c15a14f37cb28c7b1f3b061b0498163f1b5193387cfa035cb"));
function useCloudHydration() {
	const { user, isPending } = useCurrentUserState();
	const [ready, setReady] = (0, import_react.useState)(false);
	const updatedAt = useLearner((s) => s.profile.updatedAt);
	const loadedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		if (isPending) return;
		if (!user) {
			loadedRef.current = true;
			setReady(true);
			return;
		}
		loadRemoteSnapshot().then((snap) => {
			if (!cancelled && snap) useLearner.getState().hydrateRemote(snap);
		}).catch(() => {}).finally(() => {
			if (!cancelled) {
				loadedRef.current = true;
				setReady(true);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	(0, import_react.useEffect)(() => {
		if (!user || !loadedRef.current) return;
		const handle = window.setTimeout(() => {
			const s = useLearner.getState();
			if (!s.profile.onboardingDone) return;
			saveRemoteSnapshot({ data: snapshotOf(s) }).catch(() => {});
		}, 1400);
		return () => window.clearTimeout(handle);
	}, [updatedAt, user]);
	return ready && !isPending;
}
function AppLayout() {
	const hydrated = useHydrated();
	const cloudReady = useCloudHydration();
	const onboarded = useLearner((s) => s.profile.onboardingDone);
	if (!hydrated || !cloudReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "seigaiha grid min-h-screen place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-40 animate-pulse rounded-full bg-surface-2" })
	});
	if (!onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboard" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { AppLayout as component };
