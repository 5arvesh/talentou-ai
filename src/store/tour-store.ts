import { create } from "zustand";
import type { LucideIcon } from "lucide-react";

export interface TourScreenSequenceItem {
  key: string;
  label: string;
  /** Route to navigate to when this segment is clicked in the intro slide's progress bar. */
  path?: string;
}

export interface TourStep {
  title: string;
  description: string;
  targetSelector?: string;
  onEnter?: () => void;
  onExit?: () => void;
  hideNext?: boolean;
  /** 'intro' renders a full-bleed welcome slide instead of a coach-mark spotlight. Defaults to 'coachmark'. */
  variant?: 'intro' | 'coachmark';
  /** intro-only: role-specific icon shown with a pulse-on-mount animation */
  icon?: LucideIcon;
  /** intro-only: full ordered list of screens in this multi-screen tour, for the orientation progress bar */
  screenSequence?: TourScreenSequenceItem[];
  /** intro-only: which entry in screenSequence is "current" */
  screenKey?: string;
  /** Overrides the generic "You're all set" completion-card copy when this is the tour's last step.
   *  Falls back to the shared default when omitted. */
  completionTitle?: string;
  completionDescription?: string;
}

interface StartTourOptions {
  /** When provided, persistence is a namespaced, resumable {step, done} JSON blob under this exact key
   *  instead of the legacy flat tour_done_{key} flag. Pass the spec's talentou:tour-seen:{role}:{screen} format. */
  storageKey?: string;
}

interface NamespacedProgress {
  step: number;
  done: boolean;
}

interface TourStore {
  tourKey: string | null;
  storageKey: string | null;
  steps: TourStep[];
  currentStep: number;
  isVisible: boolean;
  justCompleted: boolean;
  startTour: (key: string, steps: TourStep[], opts?: StartTourOptions) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  exitTour: () => void;
  completeTour: () => void;
  restartTour: () => void;
  clearTour: () => void;
}

const STORAGE_PREFIX = "tour_done_";

function readNamespacedProgress(storageKey: string): NamespacedProgress | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    return JSON.parse(raw) as NamespacedProgress;
  } catch {
    return null;
  }
}

function writeNamespacedProgress(storageKey: string, progress: NamespacedProgress) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {
    // localStorage unavailable/full — progress simply won't persist
  }
}

function runCurrentStepOnExit(get: () => TourStore) {
  const { steps, currentStep } = get();
  steps[currentStep]?.onExit?.();
}

export const useTourStore = create<TourStore>((set, get) => ({
  tourKey: null,
  storageKey: null,
  steps: [],
  currentStep: 0,
  isVisible: false,
  justCompleted: false,

  startTour: (key, steps, opts) => {
    if (opts?.storageKey) {
      const progress = readNamespacedProgress(opts.storageKey);
      const done = progress?.done ?? false;
      set({
        tourKey: key,
        storageKey: opts.storageKey,
        steps,
        currentStep: done ? 0 : (progress?.step ?? 0),
        isVisible: !done,
      });
      return;
    }
    // Legacy path — unchanged from original behavior
    const alreadySeen = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    set({ tourKey: key, storageKey: null, steps, currentStep: 0, isVisible: !alreadySeen });
  },

  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else {
      get().completeTour();
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) set({ currentStep: currentStep - 1 });
  },

  skipTour: () => {
    runCurrentStepOnExit(get);
    const { tourKey, storageKey } = get();
    if (storageKey) {
      writeNamespacedProgress(storageKey, { step: 0, done: true });
    } else if (tourKey) {
      localStorage.setItem(`${STORAGE_PREFIX}${tourKey}`, "1");
    }
    set({ isVisible: false });
  },

  exitTour: () => {
    runCurrentStepOnExit(get);
    const { tourKey, storageKey, currentStep } = get();
    if (storageKey) {
      writeNamespacedProgress(storageKey, { step: currentStep, done: false });
    } else if (tourKey) {
      // Legacy tours have no resume concept — exiting behaves like skip for them
      localStorage.setItem(`${STORAGE_PREFIX}${tourKey}`, "1");
    }
    set({ isVisible: false });
  },

  completeTour: () => {
    runCurrentStepOnExit(get);
    const { tourKey, storageKey } = get();
    if (storageKey) {
      writeNamespacedProgress(storageKey, { step: 0, done: true });
    } else if (tourKey) {
      localStorage.setItem(`${STORAGE_PREFIX}${tourKey}`, "1");
    }
    set({ isVisible: false, justCompleted: true });
    setTimeout(() => set({ justCompleted: false }), 2200);
  },

  restartTour: () => {
    const { storageKey } = get();
    if (storageKey) {
      const progress = readNamespacedProgress(storageKey);
      const resumeStep = progress && !progress.done ? progress.step : 0;
      set({ currentStep: resumeStep, isVisible: true });
      return;
    }
    set({ currentStep: 0, isVisible: true });
  },

  clearTour: () => {
    set({ tourKey: null, storageKey: null, steps: [], currentStep: 0, isVisible: false });
  },
}));
