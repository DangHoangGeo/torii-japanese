import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { gradeWriting } from "@/lib/server/ai";
import { estimateLevel, getSkillScores, useLearner } from "@/lib/store";

export const Route = createFileRoute("/app/write")({ component: WritePage });

const PROMPTS = [
  "Write three sentences about your morning.",
  "Describe a place you like in your town.",
  "Explain why you are studying Japanese.",
  "Write a short message to a coworker about being late.",
];

function WritePage() {
  const writings = useLearner((s) => s.writings);
  const profile = useLearner((s) => s.profile);
  const cards = useLearner((s) => s.cards);
  const readings = useLearner((s) => s.completedReadings.length);
  const skills = getSkillScores(cards, readings, writings.length);
  const level = estimateLevel(profile.startLevel, skills);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [prompt] = useState(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);

  async function submit() {
    const body = text.trim();
    if (!body || busy) return;
    setBusy(true);
    try {
      const res = await gradeWriting({ data: { text: body, level } });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      useLearner.getState().addWriting(body, res.text);
      useLearner.getState().addMinutes(8);
      setText("");
    } catch {
      toast.error("The sensei could not mark this yet.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        kicker="Production"
        title="Writing desk"
        description={`Level ${level}. Three sentences is enough. The sensei returns a score, a rewrite, and notes.`}
      />
      <Card className="p-5">
        <p className="text-sm text-muted">Prompt · {prompt}</p>
        <Textarea
          className="mt-3 min-h-40 font-display text-lg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="日本語で書いてください"
        />
        <Button className="mt-4" disabled={busy || !text.trim()} onClick={() => void submit()}>
          {busy ? "Marking…" : "Ask the sensei to mark"}
        </Button>
      </Card>

      <div className="mt-6 space-y-3">
        {writings.length === 0 ? (
          <p className="text-sm text-muted">Marked pages will appear here.</p>
        ) : (
          [...writings].reverse().map((w) => (
            <Card key={w.at} className="p-5">
              <p className="text-xs text-faint">{new Date(w.at).toLocaleString()}</p>
              <p className="font-display mt-2 text-lg whitespace-pre-wrap">{w.text}</p>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-sans text-sm text-muted">
                {w.feedback}
              </pre>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
