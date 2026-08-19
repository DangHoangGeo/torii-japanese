export type JlptLevel = "pre" | "N5" | "N4" | "N3" | "N2" | "N1";
export type SkillKind = "kana" | "kanji" | "vocab" | "grammar" | "reading" | "writing";

export type KanaItem = {
  id: string;
  glyph: string;
  romaji: string;
  script: "hira" | "kata";
  group: string;
};

export type KanjiItem = {
  id: string;
  glyph: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  level: JlptLevel;
  example: string;
  exampleReading: string;
  exampleMeaning: string;
};

export type VocabItem = {
  id: string;
  jp: string;
  reading: string;
  meaning: string;
  level: JlptLevel;
  pos: string;
};

export type GrammarItem = {
  id: string;
  pattern: string;
  meaning: string;
  level: JlptLevel;
  example: string;
  exampleReading: string;
  exampleMeaning: string;
  tip: string;
};

export type ReadingItem = {
  id: string;
  title: string;
  level: JlptLevel;
  text: string;
  translation: string;
  questions: { q: string; options: string[]; answer: number }[];
};

export type PlacementQ = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  level: JlptLevel;
  skill: SkillKind;
};

export type PlanWeek = {
  week: number;
  phase: string;
  title: string;
  focus: string[];
  minutesHint: number;
};

export type DrillItem = {
  id: string;
  kind: SkillKind;
  prompt: string;
  answer: string;
  sub?: string;
  speak?: string;
  options?: string[];
  extra?: string;
};
