import type { PlacementQ } from "./types";

export const PLACEMENT: PlacementQ[] = [
  { id: "p1", prompt: "What is the romaji for あ?", options: ["a", "i", "u", "e"], answer: 0, level: "pre", skill: "kana" },
  { id: "p2", prompt: "What is the romaji for し?", options: ["si", "chi", "shi", "tsu"], answer: 2, level: "pre", skill: "kana" },
  { id: "p3", prompt: "Katakana カ is…", options: ["sa", "ka", "ta", "na"], answer: 1, level: "pre", skill: "kana" },
  { id: "p4", prompt: "「こんにちは」 means…", options: ["Good night", "Thank you", "Hello", "Excuse me"], answer: 2, level: "N5", skill: "vocab" },
  { id: "p5", prompt: "Select the object particle: 本___読む", options: ["は", "が", "を", "に"], answer: 2, level: "N5", skill: "grammar" },
  { id: "p6", prompt: "Meaning of 食べる", options: ["to drink", "to eat", "to sleep", "to run"], answer: 1, level: "N5", skill: "vocab" },
  { id: "p7", prompt: "Kanji 山 means…", options: ["river", "mountain", "tree", "fire"], answer: 1, level: "N5", skill: "kanji" },
  { id: "p8", prompt: "The て-form of 食べる is…", options: ["食べて", "食べた", "食べない", "食べます"], answer: 0, level: "N5", skill: "grammar" },
  { id: "p9", prompt: "仕事 means…", options: ["school", "work / job", "holiday", "friend"], answer: 1, level: "N4", skill: "vocab" },
  { id: "p10", prompt: "〜なければならない expresses…", options: ["desire", "permission", "obligation", "hearsay"], answer: 2, level: "N4", skill: "grammar" },
  { id: "p11", prompt: "Kanji 使 in 使う means…", options: ["wait", "use", "make", "know"], answer: 1, level: "N4", skill: "kanji" },
  { id: "p12", prompt: "確認 means…", options: ["reservation", "confirmation", "experience", "proposal"], answer: 1, level: "N3", skill: "vocab" },
  { id: "p13", prompt: "〜ことにする means…", options: ["decide to", "look like", "must not", "while doing"], answer: 0, level: "N3", skill: "grammar" },
  { id: "p14", prompt: "状況 is closest to…", options: ["method", "situation", "priority", "efficiency"], answer: 1, level: "N3", skill: "vocab" },
  { id: "p15", prompt: "〜につれて is closest to…", options: ["in spite of", "as / in proportion to", "instead of", "only"], answer: 1, level: "N2", skill: "grammar" },
  { id: "p16", prompt: "優先 means…", options: ["proposal", "continuation", "priority", "premise"], answer: 2, level: "N2", skill: "vocab" },
];

export function scoreToLevel(correct: number, total: number): import("./types").JlptLevel {
  const r = total === 0 ? 0 : correct / total;
  if (r < 0.25) return "pre";
  if (r < 0.45) return "N5";
  if (r < 0.65) return "N4";
  if (r < 0.85) return "N3";
  return "N2";
}
