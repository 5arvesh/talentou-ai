import { create } from "zustand";

const STORAGE_KEY = "talentou:matching-settings";

interface MatchingSettings {
  highThreshold: number;
  lowThreshold: number;
  tieBreakGap: number;
  autoStepC: boolean;
}

const DEFAULTS: MatchingSettings = {
  highThreshold: 80,
  lowThreshold: 40,
  tieBreakGap: 10,
  autoStepC: true,
};

function readPersisted(): MatchingSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function writePersisted(settings: MatchingSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // localStorage unavailable/full — settings simply won't persist
  }
}

interface MatchingSettingsStore extends MatchingSettings {
  setHighThreshold: (value: number) => void;
  setLowThreshold: (value: number) => void;
  setTieBreakGap: (value: number) => void;
  setAutoStepC: (value: boolean) => void;
}

export const useMatchingSettingsStore = create<MatchingSettingsStore>((set, get) => ({
  ...readPersisted(),

  setHighThreshold: (value) => {
    set({ highThreshold: value });
    writePersisted({ ...get(), highThreshold: value });
  },
  setLowThreshold: (value) => {
    set({ lowThreshold: value });
    writePersisted({ ...get(), lowThreshold: value });
  },
  setTieBreakGap: (value) => {
    set({ tieBreakGap: value });
    writePersisted({ ...get(), tieBreakGap: value });
  },
  setAutoStepC: (value) => {
    set({ autoStepC: value });
    writePersisted({ ...get(), autoStepC: value });
  },
}));
