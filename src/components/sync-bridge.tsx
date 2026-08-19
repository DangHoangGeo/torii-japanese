import { useEffect, useRef, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { loadRemoteSnapshot, saveRemoteSnapshot } from "@/lib/server/learner";
import { snapshotOf, useLearner } from "@/lib/store";

export function useCloudHydration() {
  const { user, isPending } = useCurrentUserState();
  const [ready, setReady] = useState(false);
  const updatedAt = useLearner((s) => s.profile.updatedAt);
  const loadedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    if (isPending) return;
    if (!user) {
      loadedRef.current = true;
      setReady(true);
      return;
    }
    loadRemoteSnapshot()
      .then((snap) => {
        if (!cancelled && snap) useLearner.getState().hydrateRemote(snap);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) {
          loadedRef.current = true;
          setReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  useEffect(() => {
    if (!user || !loadedRef.current) return;
    const handle = window.setTimeout(() => {
      const s = useLearner.getState();
      if (!s.profile.onboardingDone) return;
      void saveRemoteSnapshot({ data: snapshotOf(s) }).catch(() => {});
    }, 1400);
    return () => window.clearTimeout(handle);
  }, [updatedAt, user]);

  return ready && !isPending;
}
