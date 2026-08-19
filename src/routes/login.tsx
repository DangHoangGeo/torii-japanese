import { Link, createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ToriiMark } from "@/components/torii-mark";
import { useHydrated } from "@/lib/use-hydrated";
import { useLearner } from "@/lib/store";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const hydrated = useHydrated();
  const onboarded = useLearner((s) => s.profile.onboardingDone);
  const next = hydrated && onboarded ? "/app" : "/onboard";

  return (
    <main className="seigaiha grid min-h-screen place-items-center px-5 py-12">
      <Card className="w-full max-w-sm p-7">
        <ToriiMark className="size-10" />
        <h1 className="font-display mt-4 text-2xl">Sign in to Torii</h1>
        <p className="mt-2 text-sm text-muted">
          Google or X saves a cloud snapshot of your path. You can also study as a guest on this
          device.
        </p>
        <div className="mt-6 space-y-2">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: next })}
              >
                Continue with {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>
        <Button asChild variant="ink" className="mt-3 w-full">
          <Link to={next}>{onboarded ? "Continue as guest" : "Begin as guest"}</Link>
        </Button>
        <p className="mt-5 text-center text-xs text-faint">
          <Link to="/" className="underline-offset-4 hover:underline">
            Back to the gate
          </Link>
        </p>
      </Card>
    </main>
  );
}
