export * from "./types";
export * from "./kana";
export * from "./kanji";
export * from "./vocab";
export * from "./grammar";
export * from "./readings";
export * from "./placement";
export * from "./plan";

import { ALL_KANA } from "./kana";
import { KANJI } from "./kanji";
import { VOCAB } from "./vocab";
import { GRAMMAR } from "./grammar";
import type { DrillItem, JlptLevel, SkillKind } from "./types";
import { shuffle } from "@/lib/utils";

const ROMAJI_ALTS: Record<string, string[]> = {
  shi: ["si"],
  chi: ["ti"],
  tsu: ["tu"],
  fu: ["hu"],
  ji: ["zi", "di"],
  zu: ["du"],
  sha: ["sya"],
  shu: ["syu"],
  sho: ["syo"],
  cha: ["tya"],
  chu: ["tyu"],
  cho: ["tyo"],
  ja: ["zya", "dya"],
  ju: ["zyu", "dyu"],
  jo: ["zyo", "dyo"],
  wo: ["o"],
};

export function normalizeRomaji(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, "");
}

export function romajiMatch(input: string, target: string): boolean {
  const a = normalizeRomaji(input);
  const t = normalizeRomaji(target);
  if (a === t) return true;
  return (ROMAJI_ALTS[t] ?? []).includes(a);
}

export function itemById(id: string) {
  return (
    ALL_KANA.find((x) => x.id === id) ||
    KANJI.find((x) => x.id === id) ||
    VOCAB.find((x) => x.id === id) ||
    GRAMMAR.find((x) => x.id === id)
  );
}

export function toDrill(id: string, kind: SkillKind): DrillItem | null {
  if (kind === "kana") {
    const k = ALL_KANA.find((x) => x.id === id);
    if (!k) return null;
    const distractors = shuffle(ALL_KANA.filter((x) => x.romaji !== k.romaji).map((x) => x.romaji)).slice(0, 3);
    return {
      id,
      kind,
      prompt: k.glyph,
      answer: k.romaji,
      sub: k.script === "hira" ? "Hiragana" : "Katakana",
      speak: k.glyph,
      options: shuffle([k.romaji, ...distractors]),
    };
  }
  if (kind === "kanji") {
    const k = KANJI.find((x) => x.id === id);
    if (!k) return null;
    return {
      id,
      kind,
      prompt: k.glyph,
      answer: k.meaning,
      sub: `${k.onyomi} / ${k.kunyomi}`,
      speak: k.example,
      extra: `${k.example}（${k.exampleReading}） ${k.exampleMeaning}`,
      options: shuffle([
        k.meaning,
        ...shuffle(KANJI.filter((x) => x.id !== k.id).map((x) => x.meaning)).slice(0, 3),
      ]),
    };
  }
  if (kind === "vocab") {
    const v = VOCAB.find((x) => x.id === id);
    if (!v) return null;
    return {
      id,
      kind,
      prompt: v.jp,
      answer: v.meaning,
      sub: `${v.reading} · ${v.pos} · ${v.level}`,
      speak: v.jp,
      options: shuffle([
        v.meaning,
        ...shuffle(VOCAB.filter((x) => x.id !== v.id).map((x) => x.meaning)).slice(0, 3),
      ]),
    };
  }
  if (kind === "grammar") {
    const g = GRAMMAR.find((x) => x.id === id);
    if (!g) return null;
    return {
      id,
      kind,
      prompt: g.pattern,
      answer: g.meaning,
      sub: g.example,
      speak: g.example,
      extra: g.tip,
      options: shuffle([
        g.meaning,
        ...shuffle(GRAMMAR.filter((x) => x.id !== g.id).map((x) => x.meaning)).slice(0, 3),
      ]),
    };
  }
  return null;
}

export function newPool(level: JlptLevel): { id: string; kind: SkillKind }[] {
  if (level === "pre") return ALL_KANA.map((k) => ({ id: k.id, kind: "kana" as const }));
  const kanji = KANJI.filter((k) =>
    level === "N5" ? k.level === "N5" : ["N5", "N4", "N3", "N2"].includes(k.level),
  ).map((k) => ({ id: k.id, kind: "kanji" as const }));
  const vocab = VOCAB.filter((v) =>
    level === "N5" ? v.level === "N5" : true,
  ).map((v) => ({ id: v.id, kind: "vocab" as const }));
  const grammar = GRAMMAR.filter((g) =>
    level === "N5" ? g.level === "N5" : true,
  ).map((g) => ({ id: g.id, kind: "grammar" as const }));
  const kana = ALL_KANA.map((k) => ({ id: k.id, kind: "kana" as const }));
  return [...kana, ...kanji, ...vocab, ...grammar];
}
