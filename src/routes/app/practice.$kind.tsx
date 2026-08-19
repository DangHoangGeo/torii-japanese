import { Link, Navigate, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DrillSession } from "@/components/drill-session";
import { KanaChart } from "@/components/kana-chart";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { kindQueue } from "@/lib/advisor";
import { ALL_KANA, READINGS, toDrill, type DrillItem, type ReadingItem } from "@/lib/curriculum";
import { generateReading } from "@/lib/server/ai";
import { speakJapanese } from "@/lib/speech";
import { useLearner } from "@/lib/store";
import { shuffle } from "@/lib/utils";

export const Route = createFileRoute("/app/practice/$kind")({
  component: PracticeKind,
});

const TITLES: Record<string, { kicker: string; title: string; description: string }> = {
  kana: {
    kicker: "Script",
    title: "Kana",
    description: "Type romaji or tap a choice. Green cells on the chart have two successful reviews.",
  },
  kanji: {
    kicker: "Characters",
    title: "Kanji",
    description: "Match the glyph to its meaning. Open extra for the compound.",
  },
  vocab: {
    kicker: "Words",
    title: "Vocabulary",
    description: "Japanese prompt, English meaning. Audio on every card.",
  },
  grammar: {
    kicker: "Patterns",
    title: "Grammar",
    description: "See the pattern, recall the meaning, read the tip after you grade.",
  },
  listen: {
    kicker: "Ear",
    title: "Listening",
    description: "The glyph stays hidden until you answer. Replay as often as you need.",
  },
  read: {
    kicker: "Text",
    title: "Reading",
    description: "Short passages from N5 to N2, plus a sensei-generated text on demand.",
  },
};

function PracticeKind() {
  const { kind } = Route.useParams();
  const meta = TITLES[kind];
  const items = useMemo(() => {
    if (kind === "listen") {
      return shuffle(ALL_KANA)
        .slice(0, 12)
        .map((k) => toDrill(k.id, "kana"))
        .filter((x): x is DrillItem => Boolean(x));
    }
    if (kind === "kana" || kind === "kanji" || kind === "vocab" || kind === "grammar") {
      return kindQueue(kind, 12);
    }
    return kindQueue("kana", 12);
  }, [kind]);

  if (!meta) return <Navigate to="/app/practice" />;
  if (kind === "read") return <ReadingStudio meta={meta} />;

  return (
    <div>
      <PageHeader kicker={meta.kicker} title={meta.title} description={meta.description} />
      {kind === "kana" ? (
        <div className="mb-8 grid gap-4 lg:grid-cols-2">
          <Card className="p-4">
            <p className="mb-3 text-sm font-medium">Hiragana</p>
            <KanaChart script="hira" />
          </Card>
          <Card className="p-4">
            <p className="mb-3 text-sm font-medium">Katakana</p>
            <KanaChart script="kata" />
          </Card>
        </div>
      ) : null}
      <DrillSession title={meta.title} items={items} listenFirst={kind === "listen"} />
    </div>
  );
}

function ReadingStudio({
  meta,
}: {
  meta: { kicker: string; title: string; description: string };
}) {
  const completed = useLearner((s) => s.completedReadings);
  const level = useLearner((s) => s.profile.startLevel);
  const [active, setActive] = useState<ReadingItem | null>(null);
  const [generated, setGenerated] = useState<ReadingItem[]>([]);
  const [busy, setBusy] = useState(false);

  const all = [...READINGS, ...generated];

  async function makeOne() {
    setBusy(true);
    try {
      const res = await generateReading({
        data: { level: level === "pre" ? "N5" : level, topic: "everyday life in Japan" },
      });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      const passage: ReadingItem = {
        id: `gen-${Date.now()}`,
        title: res.passage.title,
        level: level === "pre" ? "N5" : level,
        text: res.passage.text,
        translation: res.passage.translation,
        questions: res.passage.questions,
      };
      setGenerated((g) => [passage, ...g]);
      setActive(passage);
    } catch {
      toast.error("Could not generate a reading.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        kicker={meta.kicker}
        title={meta.title}
        description={meta.description}
        action={
          <Button type="button" variant="secondary" disabled={busy} onClick={() => void makeOne()}>
            {busy ? "Writing…" : "Generate a passage"}
          </Button>
        }
      />
      {active ? (
        <ReadingView
          item={active}
          onBack={() => setActive(null)}
        />
      ) : (
        <ul className="grid gap-3">
          {all.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => setActive(r)}
                className="w-full rounded-xl border border-border bg-surface p-5 text-left paper-shadow hover:bg-surface-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-lg">{r.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{r.level}</Badge>
                    {completed.includes(r.id) ? <Badge variant="primary">Done</Badge> : null}
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 font-display text-sm text-muted">{r.text}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ReadingView({ item, onBack }: { item: ReadingItem; onBack: () => void }) {
  const done = useLearner((s) => s.completedReadings.includes(item.id));
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [showTr, setShowTr] = useState(false);
  const q = item.questions[qi];
  const finished = qi >= item.questions.length;

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setCorrect((c) => c + 1);
  }

  function next() {
    if (qi + 1 >= item.questions.length) {
      setQi(item.questions.length);
      if (!done) useLearner.getState().completeReading(item.id, correct, item.questions.length);
      return;
    }
    setQi(qi + 1);
    setPicked(null);
  }

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={onBack}>
        All passages
      </Button>
      <Card className="mt-3 p-6 md:p-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="outline">{item.level}</Badge>
            <h2 className="font-display mt-2 text-2xl">{item.title}</h2>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={() => speakJapanese(item.text)}>
            Listen
          </Button>
        </div>
        <p className="font-display mt-6 text-lg leading-relaxed">{item.text}</p>
        <button
          type="button"
          className="mt-4 text-sm text-primary underline-offset-4 hover:underline"
          onClick={() => setShowTr((v) => !v)}
        >
          {showTr ? "Hide translation" : "Show translation"}
        </button>
        {showTr ? <p className="mt-2 text-sm text-muted">{item.translation}</p> : null}
      </Card>

      {!finished && q ? (
        <Card className="mt-4 p-6">
          <p className="text-xs text-faint">
            Question {qi + 1} of {item.questions.length}
          </p>
          <p className="mt-2 font-medium">{q.q}</p>
          <div className="mt-4 grid gap-2">
            {q.options.map((opt, i) => {
              const show = picked !== null;
              const right = i === q.answer;
              const chosen = i === picked;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => choose(i)}
                  className={`min-h-11 rounded-md border px-4 py-2.5 text-left text-sm ${
                    show && right
                      ? "border-ok bg-ok/10 text-ok"
                      : show && chosen
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-surface hover:bg-surface-2"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {picked !== null ? (
            <Button className="mt-4" onClick={next}>
              {qi + 1 >= item.questions.length ? "Finish" : "Next"}
            </Button>
          ) : null}
        </Card>
      ) : finished ? (
        <Card className="mt-4 p-6">
          <p className="font-display text-xl">
            {correct} / {item.questions.length} correct
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={onBack}>Back to list</Button>
            <Button asChild variant="secondary">
              <Link to="/app/today">Today</Link>
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
