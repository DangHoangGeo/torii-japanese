import { Navigate, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useCloudHydration } from "@/components/sync-bridge";
import { useHydrated } from "@/lib/use-hydrated";
import { useLearner } from "@/lib/store";

export const Route = createFileRoute("/app")({ component: AppLayout });

function AppLayout() {
  const hydrated = useHydrated();
  const cloudReady = useCloudHydration();
  const onboarded = useLearner((s) => s.profile.onboardingDone);

  if (!hydrated || !cloudReady) {
    return (
      <div className="seigaiha grid min-h-screen place-items-center">
        <div className="h-8 w-40 animate-pulse rounded-full bg-surface-2" />
      </div>
    );
  }
  if (!onboarded) return <Navigate to="/onboard" />;
  return <AppShell />;
}
