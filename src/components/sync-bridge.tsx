import { useEffect, useRef, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getDeviceId } from "@/lib/device";
import {
  loadGuestSnapshot,
  loadRemoteSnapshot,
  saveGuestSnapshot,
  saveRemoteSnapshot,
} from "@/lib/server/learner";
import { snapshotOf, useLearner } from "@/lib/store";

export function useCloudHydration() {
  const { user, isPending } = useCurrentUserState();
  const [ready, setReady] = useState(false);
  const updatedAt = useLearner((s) => s.profile.updatedAt);
  const loadedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    if (isPending) return;

    const finish = () => {
      if (!cancelled) {
        loadedRef.current = true;
        setReady(true);
      }
    };

    if (user) {
      loadRemoteSnapshot()
        .then((snap) => {
          if (!cancelled && snap) useLearner.getState().hydrateRemote(snap);
        })
        .catch(() => {})
        .finally(finish);
      return () => {
        cancelled = true;
      };
    }

    const deviceId = getDeviceId();
    if (!deviceId) {
      finish();
      return () => {
        cancelled = true;
      };
    }
    loadGuestSnapshot({ data: { deviceId } })
      .then((snap) => {
        if (!cancelled && snap) useLearner.getState().hydrateRemote(snap);
      })
      .catch(() => {})
      .finally(finish);
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  useEffect(() => {
    if (!loadedRef.current) return;
    const handle = window.setTimeout(() => {
      const s = useLearner.getState();
      if (!s.profile.onboardingDone) return;
      const snap = snapshotOf(s);
      if (user) {
        void saveRemoteSnapshot({ data: snap }).catch(() => {});
        return;
      }
      const deviceId = getDeviceId();
      if (!deviceId) return;
      void saveGuestSnapshot({ data: { deviceId, snapshot: snap } }).catch(() => {});
    }, 1400);
    return () => window.clearTimeout(handle);
  }, [updatedAt, user]);

  return ready && !isPending;
}
