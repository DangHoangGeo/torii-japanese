import { ALL_KANA, type KanaItem } from "@/lib/curriculum";
import { speakJapanese } from "@/lib/speech";
import { useLearner } from "@/lib/store";
import { cn } from "@/lib/utils";

const COLS = ["a", "i", "u", "e", "o"] as const;

function cellFor(script: "hira" | "kata", group: string, vowel: string): KanaItem | undefined {
  const want = vowel === "n" ? "n" : group === "vowels" ? vowel : group + vowel;
  return ALL_KANA.find((k) => k.script === script && k.romaji === want);
}

const ROWS: { group: string; label: string }[] = [
  { group: "vowels", label: "" },
  { group: "k", label: "k" },
  { group: "s", label: "s" },
  { group: "t", label: "t" },
  { group: "n", label: "n" },
  { group: "h", label: "h" },
  { group: "m", label: "m" },
  { group: "y", label: "y" },
  { group: "r", label: "r" },
  { group: "w", label: "w" },
];

export function KanaChart({ script }: { script: "hira" | "kata" }) {
  const cards = useLearner((s) => s.cards);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[20rem] border-collapse text-center">
        <thead>
          <tr>
            <th className="w-8 p-1 text-xs font-medium text-faint" />
            {COLS.map((c) => (
              <th key={c} className="p-1 text-xs font-medium text-faint">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.group}>
              <th className="p-1 text-xs font-medium text-faint">{row.label}</th>
              {COLS.map((vowel) => {
                if (row.group === "y" && (vowel === "i" || vowel === "e")) {
                  return <td key={vowel} className="p-0.5" />;
                }
                if (row.group === "w" && vowel !== "a" && vowel !== "o") {
                  return <td key={vowel} className="p-0.5" />;
                }
                const k = cellFor(script, row.group, vowel);
                if (!k) return <td key={vowel} className="p-0.5" />;
                const learned = (cards[k.id]?.reps ?? 0) >= 2;
                return (
                  <td key={vowel} className="p-0.5">
                    <button
                      type="button"
                      onClick={() => speakJapanese(k.glyph)}
                      className={cn(
                        "flex h-12 w-full flex-col items-center justify-center rounded-sm border text-fg",
                        learned ? "border-ok/30 bg-ok/5" : "border-border bg-surface hover:bg-surface-2",
                      )}
                    >
                      <span className="font-display text-lg leading-none">{k.glyph}</span>
                      <span className="text-[10px] text-faint">{k.romaji}</span>
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            <th className="p-1 text-xs font-medium text-faint">n</th>
            <td className="p-0.5" colSpan={5}>
              {(() => {
                const k = ALL_KANA.find((x) => x.script === script && x.romaji === "n");
                if (!k) return null;
                const learned = (cards[k.id]?.reps ?? 0) >= 2;
                return (
                  <button
                    type="button"
                    onClick={() => speakJapanese(k.glyph)}
                    className={cn(
                      "flex h-12 w-20 flex-col items-center justify-center rounded-sm border",
                      learned ? "border-ok/30 bg-ok/5" : "border-border bg-surface hover:bg-surface-2",
                    )}
                  >
                    <span className="font-display text-lg leading-none">{k.glyph}</span>
                    <span className="text-[10px] text-faint">n</span>
                  </button>
                );
              })()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
