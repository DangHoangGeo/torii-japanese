import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { getRuntimeStatus } from "@/lib/server/status";
import { useLearner } from "@/lib/store";

export const Route = createFileRoute("/app/settings")({ component: Settings });

type Status = {
  firebase: boolean;
  firebaseProjectId: string | null;
  postgres: boolean;
  ai: boolean;
  aiProvider: string;
  aiModel: string;
};

function Settings() {
  const [status, setStatus] = useState<Status | null>(null);
  const reviews = useLearner((s) => Object.keys(s.cards).length);
  const writings = useLearner((s) => s.writings.length);
  const chat = useLearner((s) => s.chat.length);

  useEffect(() => {
    getRuntimeStatus()
      .then(setStatus)
      .catch(() =>
        setStatus({
          firebase: false,
          firebaseProjectId: null,
          postgres: false,
          ai: false,
          aiProvider: "xai",
          aiModel: "grok-4.5",
        }),
      );
  }, []);

  return (
    <div>
      <PageHeader
        kicker="Account"
        title="Data and models"
        description="Progress lives on this device, in Postgres when you sign in, and in Firebase when a project is connected."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>This device</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Cards" value={String(reviews)} />
            <Row label="Writings" value={String(writings)} />
            <Row label="Sensei turns" value={String(chat)} />
            <p className="pt-2 text-muted">
              Guests keep a local snapshot. Sign in to also write Postgres and Firebase under your
              account.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cloud</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <StatusLine
              label="Postgres"
              on={Boolean(status?.postgres)}
              detail={status?.postgres ? "Neon / DATABASE_URL" : "Local preview database"}
            />
            <StatusLine
              label="Firebase"
              on={Boolean(status?.firebase)}
              detail={
                status?.firebase
                  ? `Project ${status.firebaseProjectId}`
                  : "Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY"
              }
            />
            <SignedOut>
              <Button asChild variant="secondary" size="sm">
                <Link to="/login">Sign in to sync</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <p className="text-muted">
                Signed-in snapshots write to both stores. Guests write to Firebase when it is
                connected.
              </p>
            </SignedIn>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Sensei model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">{status?.aiProvider ?? "xai"}</Badge>
              <span className="tabular-nums text-muted">{status?.aiModel}</span>
              <Badge variant={status?.ai ? "default" : "outline"}>
                {status?.ai ? "Ready" : "Needs a key"}
              </Badge>
            </div>
            <p className="text-muted">
              The sensei uses the Vercel AI SDK. Default is xAI Grok. To switch later, set
              <code className="mx-1 rounded bg-surface-2 px-1.5 py-0.5">AI_PROVIDER</code>
              to <code className="rounded bg-surface-2 px-1.5 py-0.5">openai</code> (needs
              OPENAI_API_KEY) or <code className="rounded bg-surface-2 px-1.5 py-0.5">google</code>{" "}
              (needs GOOGLE_GENERATIVE_AI_API_KEY). Optional model overrides: OPENAI_MODEL,
              GOOGLE_MODEL, XAI_MODEL.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

function StatusLine({ label, on, detail }: { label: string; on: boolean; detail: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <Badge variant={on ? "primary" : "outline"}>{on ? "Connected" : "Not set"}</Badge>
      </div>
      <p className="mt-1 text-muted">{detail}</p>
    </div>
  );
}
