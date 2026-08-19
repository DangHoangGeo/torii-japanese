import type { SkillKind } from "@/lib/curriculum";
import { Progress } from "@/components/ui/progress";

const LABELS: Record<SkillKind, string> = {
  kana: "Kana",
  kanji: "Kanji",
  vocab: "Vocab",
  grammar: "Grammar",
  reading: "Reading",
  writing: "Writing",
};

export function SkillBars({ skills }: { skills: Record<SkillKind, number> }) {
  const keys: SkillKind[] = ["kana", "kanji", "vocab", "grammar", "reading", "writing"];
  return (
    <ul className="space-y-3">
      {keys.map((k) => (
        <li key={k}>
          <div className="mb-1 flex items-baseline justify-between text-sm">
            <span>{LABELS[k]}</span>
            <span className="tabular-nums text-muted">{skills[k]}%</span>
          </div>
          <Progress value={skills[k]} />
        </li>
      ))}
    </ul>
  );
}
