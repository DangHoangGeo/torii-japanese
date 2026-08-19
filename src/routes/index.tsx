import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarRange, MessageSquare, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToriiMark } from "@/components/torii-mark";
import { useHydrated } from "@/lib/use-hydrated";
import { useLearner } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const hydrated = useHydrated();
  const onboarded = useLearner((s) => s.profile.onboardingDone);

  return (
    <div className="seigaiha min-h-screen text-fg">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Link to="/" className="flex items-center gap-2">
          <ToriiMark className="size-8" />
          <span className="font-display text-lg">Torii</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link to={hydrated && onboarded ? "/app" : "/onboard"}>
              {hydrated && onboarded ? "Continue" : "Begin"}
            </Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">鳥居 · Japanese</p>
          <h1 className="font-display mt-3 text-4xl leading-[1.15] tracking-tight md:text-5xl">
            From first kana to N2 in one year.
          </h1>
          <p className="mt-4 max-w-md text-muted">
            Torii is a full study path — placement, spaced repetition, readings, writing, and a
            sensei that reads your stats and names the next move. Guests can start immediately.
            Sign in to keep a cloud snapshot.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={hydrated && onboarded ? "/app" : "/onboard"}>
                {hydrated && onboarded ? "Open the desk" : "Take the placement"}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/login">Sign in with Google or X</Link>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-border paper-shadow">
          <img
            src="/og.jpg"
            alt="Torii — a vermillion gate on washi"
            className="aspect-16/9 w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: Target,
            title: "Place, then path",
            body: "Sixteen questions set your gate. A 52-week plan then runs from that level to N2.",
          },
          {
            icon: BookOpen,
            title: "SRS that protects memory",
            body: "Kana, kanji, vocab, and grammar cards use SM-2. Due reviews always come before new items.",
          },
          {
            icon: MessageSquare,
            title: "A sensei with your numbers",
            body: "Ask Grok to analyze streak, accuracy, and weak ids — then drill the named next move.",
          },
          {
            icon: CalendarRange,
            title: "One sitting a day",
            body: "Today builds a mixed queue. Reading, listening, and writing sit beside the flashcards.",
          },
        ].map((f) => (
          <article key={f.title} className="rounded-xl border border-border bg-surface p-5 paper-shadow">
            <f.icon className="size-5 text-primary" strokeWidth={1.75} />
            <h2 className="font-display mt-3 text-lg">{f.title}</h2>
            <p className="mt-1.5 text-sm text-muted">{f.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">The year</p>
        <h2 className="font-display mt-2 text-3xl">Four phases to N2</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-4">
          {[
            ["Foundation", "Hiragana, katakana, sound. Four weeks if you start from zero."],
            ["N5 → N4", "Everyday Japanese, て-form, commute language, short reading."],
            ["N3 bridge", "News-lite text, writing desk, weak-skill repair."],
            ["N2 readiness", "Opinion reading, exam timing, active production."],
          ].map(([title, body], i) => (
            <li key={title} className="rounded-xl border border-border bg-surface p-5">
              <span className="text-xs tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-2 text-lg">{title}</h3>
              <p className="mt-1 text-sm text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="border-t border-border px-5 py-8 text-center text-sm text-faint">
        Torii · 鳥居 · Study Japanese every day.
      </footer>
    </div>
  );
}
