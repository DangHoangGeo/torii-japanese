import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as useLearner } from "./store-C65o9to-.mjs";
import { t as Button } from "./button-DwrQ7J1j.mjs";
import { a as Target, c as MessageSquare, g as ArrowRight, h as BookOpen, m as CalendarRange } from "../_libs/lucide-react.mjs";
import { t as ToriiMark } from "./torii-mark-Dc1sR92X.mjs";
import { t as useHydrated } from "./use-hydrated-DcbUM-dq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-v4ExazZ5.js
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	const hydrated = useHydrated();
	const onboarded = useLearner((s) => s.profile.onboardingDone);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "seigaiha min-h-screen text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToriiMark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg",
						children: "Torii"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Sign in"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: hydrated && onboarded ? "/app" : "/onboard",
							children: hydrated && onboarded ? "Continue" : "Begin"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.2em] text-primary uppercase",
						children: "鳥居 · Japanese"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-3 text-4xl leading-[1.15] tracking-tight md:text-5xl",
						children: "From first kana to N2 in one year."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-muted",
						children: "Torii is a full study path — placement, spaced repetition, readings, writing, and a sensei that reads your stats and names the next move. Guests can start immediately. Sign in to keep a cloud snapshot."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: hydrated && onboarded ? "/app" : "/onboard",
								children: [hydrated && onboarded ? "Open the desk" : "Take the placement", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Sign in with Google or X"
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl border border-border paper-shadow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/og.jpg",
						alt: "Torii — a vermillion gate on washi",
						className: "aspect-16/9 w-full object-cover"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto grid max-w-6xl gap-4 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						icon: Target,
						title: "Place, then path",
						body: "Sixteen questions set your gate. A 52-week plan then runs from that level to N2."
					},
					{
						icon: BookOpen,
						title: "SRS that protects memory",
						body: "Kana, kanji, vocab, and grammar cards use SM-2. Due reviews always come before new items."
					},
					{
						icon: MessageSquare,
						title: "A sensei with your numbers",
						body: "Ask Grok to analyze streak, accuracy, and weak ids — then drill the named next move."
					},
					{
						icon: CalendarRange,
						title: "One sitting a day",
						body: "Today builds a mixed queue. Reading, listening, and writing sit beside the flashcards."
					}
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-surface p-5 paper-shadow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, {
							className: "size-5 text-primary",
							strokeWidth: 1.75
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-3 text-lg",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted",
							children: f.body
						})
					]
				}, f.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.16em] text-primary uppercase",
						children: "The year"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-2 text-3xl",
						children: "Four phases to N2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-6 grid gap-3 md:grid-cols-4",
						children: [
							["Foundation", "Hiragana, katakana, sound. Four weeks if you start from zero."],
							["N5 → N4", "Everyday Japanese, て-form, commute language, short reading."],
							["N3 bridge", "News-lite text, writing desk, weak-skill repair."],
							["N2 readiness", "Opinion reading, exam timing, active production."]
						].map(([title, body], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-border bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs tabular-nums text-faint",
									children: String(i + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display mt-2 text-lg",
									children: title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: body
								})
							]
						}, title))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border px-5 py-8 text-center text-sm text-faint",
				children: "Torii · 鳥居 · Study Japanese every day."
			})
		]
	});
}
//#endregion
export { Landing as component };
