import { create } from "zustand";

export interface TourStep {
  title: string;
  description: string;
  targetSelector?: string;
  onEnter?: () => void;
  hideNext?: boolean;
}

interface TourStore {
  tourKey: string | null;
  steps: TourStep[];
  currentStep: number;
  isVisible: boolean;
  startTour: (key: string, steps: TourStep[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  completeTour: () => void;
  restartTour: () => void;
  clearTour: () => void;
}

const STORAGE_PREFIX = "tour_done_";

export const useTourStore = create<TourStore>((set, get) => ({
  tourKey: null,
  steps: [],
  currentStep: 0,
  isVisible: false,

  startTour: (key, steps) => {
    const alreadySeen = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    set({ tourKey: key, steps, currentStep: 0, isVisible: !alreadySeen });
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
    const { tourKey } = get();
    if (tourKey) localStorage.setItem(`${STORAGE_PREFIX}${tourKey}`, "1");
    set({ isVisible: false });
  },

  completeTour: () => {
    const { tourKey } = get();
    if (tourKey) localStorage.setItem(`${STORAGE_PREFIX}${tourKey}`, "1");
    set({ isVisible: false });
  },

  restartTour: () => {
    set({ currentStep: 0, isVisible: true });
  },

  clearTour: () => {
    set({ tourKey: null, steps: [], currentStep: 0, isVisible: false });
  },
}));
