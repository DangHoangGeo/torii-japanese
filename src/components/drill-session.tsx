import { useEffect, useMemo, useState } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { romajiMatch, type DrillItem } from "@/lib/curriculum";
import { speakJapanese } from "@/lib/speech";
import { type Grade } from "@/lib/srs";
import { useLearner } from "@/lib/store";
import { cn } from "@/lib/utils";

export type DrillResult = { correct: number; total: number };

export function DrillSession({
  items,
  title,
  listenFirst = false,
  onDone,
}: {
  items: DrillItem[];
  title: string;
  listenFirst?: boolean;
  onDone?: (result: DrillResult) => void;
}) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"ask" | "reveal">("ask");
  const [picked, setPicked] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const item = items[index];
  const total = items.length;

  useEffect(() => {
    if (!item) return;
    if (listenFirst && item.speak) speakJapanese(item.speak);
  }, [item, listenFirst]);

  const isCorrect = useMemo(() => {
    if (!item) return false;
    if (item.kind === "kana" && typed.trim()) return romajiMatch(typed, item.answer);
    if (picked) return picked === item.answer;
    return false;
  }, [item, picked, typed]);

  if (!item) {
    return (
      <Card className="p-8 text-center">
        <p className="font-display text-xl">No cards in this set</p>
        <p className="mt-2 text-sm text-muted">Try another practice mode.</p>
      </Card>
    );
  }

  function reveal(choice?: string) {
    if (phase !== "ask" || !item) return;
    if (choice) setPicked(choice);
    const ok =
      item.kind === "kana" && typed.trim()
        ? romajiMatch(typed, item.answer)
        : (choice ?? picked) === item.answer;
    if (ok) setCorrectCount((c) => c + 1);
    setPhase("reveal");
  }

  function grade(g: Grade) {
    if (!item) return;
    const existing = useLearner.getState().cards[item.id];
    const isNew = !existing || existing.reps === 0;
    useLearner.getState().recordReview(item.id, item.kind, g, isNew);
    const next = index + 1;
    if (next >= total) {
      setFinished(true);
      onDone?.({ correct: correctCount, total });
      return;
    }
    setIndex(next);
    setPhase("ask");
    setPicked(null);
    setTyped("");
  }

  if (finished) {
    const pct = total ? Math.round((correctCount / total) * 100) : 0;
    return (
      <Card className="p-8 text-center">
        <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">Session complete</p>
        <h2 className="font-display mt-2 text-3xl">{pct}%</h2>
        <p className="mt-2 text-muted">
          {correctCount} of {total} recalled correctly in {title.toLowerCase()}.
        </p>
        <div className="mx-auto mt-6 max-w-xs">
          <Progress value={pct} />
        </div>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3 text-sm text-muted">
        <span>
          {title} · {index + 1} / {total}
        </span>
        <span className="tabular-nums">{correctCount} correct</span>
      </div>
      <Progress value={((index + (phase === "reveal" ? 1 : 0)) / total) * 100} className="mb-5" />

      <Card className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">{item.sub}</p>
          {item.speak ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Play audio"
              onClick={() => speakJapanese(item.speak!)}
            >
              <Volume2 />
            </Button>
          ) : null}
        </div>

        <p
          className={cn(
            "font-display mt-4 text-center leading-none text-fg",
            listenFirst && phase === "ask" ? "text-lg text-muted" : "text-6xl md:text-7xl",
          )}
        >
          {listenFirst && phase === "ask" ? "Listen, then choose" : item.prompt}
        </p>

        {item.kind === "kana" && !listenFirst ? (
          <form
            className="mx-auto mt-8 max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              reveal();
            }}
          >
            <Input
              autoFocus
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="Type romaji"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              disabled={phase === "reveal"}
            />
          </form>
        ) : null}

        {item.options ? (
          <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {item.options.map((opt) => {
              const show = phase === "reveal";
              const right = opt === item.answer;
              const chosen = picked === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={phase === "reveal"}
                  onClick={() => reveal(opt)}
                  className={cn(
                    "min-h-12 rounded-md border px-4 py-3 text-left text-sm transition-colors duration-150",
                    show && right && "border-ok bg-ok/10 text-ok",
                    show && chosen && !right && "border-primary bg-primary/10 text-primary",
                    !show && "border-border bg-surface hover:bg-surface-2",
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : null}

        {phase === "reveal" ? (
          <div className="mt-8 border-t border-border pt-6">
            <p className={cn("text-sm font-medium", isCorrect ? "text-ok" : "text-primary")}>
              {isCorrect ? "Correct" : `Answer · ${item.answer}`}
            </p>
            {item.extra ? <p className="mt-2 text-sm text-muted">{item.extra}</p> : null}
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(
                [
                  [0, "Again"],
                  [1, "Hard"],
                  [2, "Good"],
                  [3, "Easy"],
                ] as const
              ).map(([g, label]) => (
                <Button
                  key={g}
                  type="button"
                  variant={g === 0 ? "secondary" : g === 2 || g === 3 ? "default" : "ink"}
                  onClick={() => grade(g)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        ) : item.kind === "kana" && typed.trim() ? (
          <div className="mt-6 flex justify-center">
            <Button type="button" onClick={() => reveal()}>
              Check
            </Button>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
