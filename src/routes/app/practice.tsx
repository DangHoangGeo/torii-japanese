import { Link, createFileRoute } from "@tanstack/react-router";
import { BookOpen, Ear, Languages, PenLine, Type, WholeWord } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { ALL_KANA, GRAMMAR, KANJI, READINGS, VOCAB } from "@/lib/curriculum";
import { useLearner } from "@/lib/store";

export const Route = createFileRoute("/app/practice")({ component: PracticeHub });

const MODES = [
  {
    kind: "kana",
    title: "Kana",
    body: "Hiragana and katakana, typed romaji plus multiple choice. Chart included.",
    icon: Type,
    count: `${ALL_KANA.length} characters`,
  },
  {
    kind: "kanji",
    title: "Kanji",
    body: "Meaning, on/kun, and an example compound at N5–N2.",
    icon: Languages,
    count: `${KANJI.length} characters`,
  },
  {
    kind: "vocab",
    title: "Vocabulary",
    body: "Core words from greetings through N2 abstract nouns.",
    icon: WholeWord,
    count: `${VOCAB.length} words`,
  },
  {
    kind: "grammar",
    title: "Grammar",
    body: "Patterns with a tip, an example, and SRS scheduling.",
    icon: BookOpen,
    count: `${GRAMMAR.length} patterns`,
  },
  {
    kind: "listen",
    title: "Listening",
    body: "Audio first. Identify the kana you heard.",
    icon: Ear,
    count: "Kana ear training",
  },
  {
    kind: "read",
    title: "Reading",
    body: "Graded passages with questions. Ask the sensei for a new one.",
    icon: PenLine,
    count: `${READINGS.length} built-in + generate`,
  },
] as const;

function PracticeHub() {
  const cards = useLearner((s) => s.cards);
  const readings = useLearner((s) => s.completedReadings.length);

  return (
    <div>
      <PageHeader
        kicker="Dojo"
        title="Practice"
        description="Pick a skill. Reviews you miss here still feed the same SRS deck as Today."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {MODES.map((m) => {
          const seen = Object.values(cards).filter((c) => c.kind === m.kind && c.reps > 0).length;
          return (
            <Link
              key={m.kind}
              to="/app/practice/$kind"
              params={{ kind: m.kind }}
              className="block"
            >
              <Card className="h-full p-5 transition-colors hover:bg-surface-2">
                <m.icon className="size-5 text-primary" strokeWidth={1.75} />
                <h2 className="font-display mt-3 text-xl">{m.title}</h2>
                <p className="mt-1 text-sm text-muted">{m.body}</p>
                <p className="mt-3 text-xs text-faint">
                  {m.count}
                  {m.kind !== "read" && m.kind !== "listen"
                    ? ` · ${seen} seen`
                    : m.kind === "read"
                      ? ` · ${readings} finished`
                      : null}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
