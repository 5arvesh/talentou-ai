import { useEffect } from "react";
import { useTourStore, TourStep } from "@/store/tour-store";

/**
 * Starts a role/screen-namespaced tour, persisted at talentou:tour-seen:{role}:{screen}
 * with resumable step-index progress (see tour-store.ts).
 */
export function useScreenTour(role: string, screen: string, steps: TourStep[]) {
  const { startTour } = useTourStore();

  useEffect(() => {
    startTour(`${role}:${screen}`, steps, {
      storageKey: `talentou:tour-seen:${role}:${screen}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
