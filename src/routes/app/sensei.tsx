import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { askSensei } from "@/lib/server/ai";
import { compactStats, snapshotOf, useLearner } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/sensei")({ component: Sensei });

export function Sensei() {
  const chat = useLearner((s) => s.chat);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  async function send() {
    const message = text.trim();
    if (!message || busy) return;
    setText("");
    useLearner.getState().addChat({ role: "user", content: message, at: new Date().toISOString() });
    setBusy(true);
    try {
      const state = useLearner.getState();
      const res = await askSensei({
        data: {
          stats: compactStats(snapshotOf(state)),
          history: state.chat,
          message,
        },
      });
      if (!res.ok) {
        toast.error(res.error);
        useLearner.getState().addChat({
          role: "sensei",
          content: "I could not answer just now. Try again in a moment.",
          at: new Date().toISOString(),
        });
        return;
      }
      useLearner.getState().addChat({
        role: "sensei",
        content: res.text,
        at: new Date().toISOString(),
      });
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch {
      toast.error("The sensei could not be reached.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        kicker="Sensei"
        title="Ask with your stats in the room"
        description="Every question is sent with streak, due cards, skill bars, and weak item ids. Keep it concrete."
      />
      <Card className="flex min-h-[28rem] flex-col p-0">
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {chat.length === 0 ? (
            <p className="text-sm text-muted">
              Try: “What should I study in the next twenty minutes?” or “Explain てしまう with two
              examples.”
            </p>
          ) : (
            chat.map((t, i) => (
              <div
                key={`${t.at}-${i}`}
                className={cn(
                  "max-w-[85%] rounded-md px-3 py-2 text-sm whitespace-pre-wrap",
                  t.role === "user"
                    ? "ml-auto bg-primary text-primary-fg"
                    : "bg-surface-2 text-fg",
                )}
              >
                {t.content}
              </div>
            ))
          )}
          {busy ? <p className="text-sm text-faint">Sensei is writing…</p> : null}
          <div ref={endRef} />
        </div>
        <form
          className="border-t border-border p-4"
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask the sensei"
            className="min-h-20"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <Button type="submit" className="mt-3" disabled={busy || !text.trim()}>
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
}
