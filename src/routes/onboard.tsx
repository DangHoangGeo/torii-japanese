import { Link, Navigate, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ToriiMark } from "@/components/torii-mark";
import { PLACEMENT, scoreToLevel, type JlptLevel } from "@/lib/curriculum";
import { useLearner } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboard")({ component: Onboard });

const MINUTES = [15, 25, 40, 60];
const GOALS: JlptLevel[] = ["N3", "N2"];

function Onboard() {
  const hydrated = useHydrated();
  const onboarded = useLearner((s) => s.profile.onboardingDone);
  const navigate = useNavigate();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState(25);
  const [goal, setGoal] = useState<JlptLevel>("N2");
  const [q, setQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  if (hydrated && onboarded) return <Navigate to="/app" />;

  const correct = answers.reduce((n, a, i) => n + (a === PLACEMENT[i].answer ? 1 : 0), 0);
  const startLevel = scoreToLevel(correct, PLACEMENT.length);

  function pick(i: number) {
    const next = [...answers, i];
    setAnswers(next);
    if (q + 1 >= PLACEMENT.length) setStep(2);
    else setQ(q + 1);
  }

  function finish(level: JlptLevel, score: number) {
    useLearner.getState().completeOnboarding({
      name: name.trim(),
      startLevel: level,
      goalLevel: goal,
      dailyMinutes: minutes,
      placementScore: score,
    });
    void navigate({ to: "/app" });
  }

  return (
    <main className="seigaiha min-h-screen px-5 py-10">
      <div className="mx-auto max-w-lg">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <ToriiMark className="size-8" />
          <span className="font-display text-lg">Torii</span>
        </Link>

        {step === 0 ? (
          <Card className="p-6 md:p-8">
            <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Step 1 of 3</p>
            <h1 className="font-display mt-2 text-2xl">Set the gate</h1>
            <p className="mt-2 text-sm text-muted">
              Name is optional. Minutes and goal shape the year path. You can skip the quiz and
              start from kana.
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <Label htmlFor="name">What should the sensei call you?</Label>
                <Input
                  id="name"
                  className="mt-1.5"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Daily minutes</p>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {MINUTES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMinutes(m)}
                      className={cn(
                        "h-11 rounded-md border text-sm tabular-nums",
                        minutes === m
                          ? "border-primary bg-primary text-primary-fg"
                          : "border-border bg-surface hover:bg-surface-2",
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Goal in twelve months</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {GOALS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={cn(
                        "h-11 rounded-md border text-sm",
                        goal === g
                          ? "border-primary bg-primary text-primary-fg"
                          : "border-border bg-surface hover:bg-surface-2",
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-2 sm:flex-row">
              <Button className="flex-1" onClick={() => setStep(1)}>
                Take the placement
              </Button>
              <Button variant="secondary" className="flex-1" onClick={() => finish("pre", 0)}>
                Start from kana
              </Button>
            </div>
          </Card>
        ) : null}

        {step === 1 ? (
          <Card className="p-6 md:p-8">
            <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">
              Question {q + 1} of {PLACEMENT.length}
            </p>
            <Progress className="mt-3" value={(q / PLACEMENT.length) * 100} />
            <h1 className="font-display mt-6 text-2xl">{PLACEMENT[q].prompt}</h1>
            <p className="mt-1 text-xs text-faint">
              {PLACEMENT[q].level} · {PLACEMENT[q].skill}
            </p>
            <div className="mt-6 grid gap-2">
              {PLACEMENT[q].options.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => pick(i)}
                  className="min-h-12 rounded-md border border-border bg-surface px-4 py-3 text-left text-sm hover:bg-surface-2"
                >
                  {opt}
                </button>
              ))}
            </div>
          </Card>
        ) : null}

        {step === 2 ? (
          <Card className="p-6 md:p-8">
            <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Placement</p>
            <h1 className="font-display mt-2 text-3xl">Start at {startLevel}</h1>
            <p className="mt-2 text-sm text-muted">
              {correct} of {PLACEMENT.length} correct. The year path will open at this gate and aim
              for {goal}, {minutes} minutes a day.
            </p>
            <Button className="mt-7 w-full" size="lg" onClick={() => finish(startLevel, correct)}>
              Open the desk
            </Button>
          </Card>
        ) : null}
      </div>
    </main>
  );
}
