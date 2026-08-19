import { useEffect, useState } from "react";
import { useLearner } from "@/lib/store";

export function useHydrated() {
  const [hydrated, setHydrated] = useState(() =>
    typeof window === "undefined" ? false : useLearner.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsub = useLearner.persist.onFinishHydration(() => setHydrated(true));
    if (useLearner.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  return hydrated;
}
