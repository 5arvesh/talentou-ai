
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

// Define the progress keys
export type ComponentProgressType = {
  companyUSP: number;
  talentPool: number;
  recruitmentChannels: number;
  successMetrics: number;
};

// Define the context type
interface AlignmentContextType {
  isValuePropositionAligned: boolean;
  isCollateralsAligned: boolean;
  isMarketCriteriaAligned: boolean;
  isOutreachTimelineAligned: boolean;
  isMilestonesAligned: boolean;
  setValuePropositionAligned: (value: boolean) => void;
  setCollateralsAligned: (value: boolean) => void;
  setMarketCriteriaAligned: (value: boolean) => void;
  setOutreachTimelineAligned: (value: boolean) => void;
  setMilestonesAligned: (value: boolean) => void;

  componentProgress: ComponentProgressType;
  setComponentProgress: (
    component: keyof ComponentProgressType,
    progress: number
  ) => void;
}

// Create context
const AlignmentContext = createContext<AlignmentContextType | undefined>(
  undefined
);

// Provider component
export const AlignmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State for each alignment flag
  const [isValuePropositionAligned, setValuePropositionAligned] = useState(false);
  const [isCollateralsAligned, setCollateralsAligned] = useState(false);
  const [isMarketCriteriaAligned, setMarketCriteriaAligned] = useState(false);
  const [isOutreachTimelineAligned, setOutreachTimelineAligned] = useState(false);
  const [isMilestonesAligned, setMilestonesAligned] = useState(false);

  // Component progress state
  const [componentProgress, setComponentProgressState] = useState<ComponentProgressType>({
    companyUSP: 0,
    talentPool: 0,
    recruitmentChannels: 0,
    successMetrics: 0,
  });

  // Callback to set individual component progress
  const setComponentProgress = useCallback(
    (component: keyof ComponentProgressType, progress: number) => {
      setComponentProgressState((prev) => {
        // ⛔ Don't update if progress is already same or greater
        if (prev[component] >= progress) return prev;

        return {
          ...prev,
          [component]: progress,
        };
      });
    },
    []
  );

  // Memoized context value
  const alignmentContextValue = useMemo(
    () => ({
      isValuePropositionAligned,
      isCollateralsAligned,
      isMarketCriteriaAligned,
      isOutreachTimelineAligned,
      isMilestonesAligned,
      setValuePropositionAligned,
      setCollateralsAligned,
      setMarketCriteriaAligned,
      setOutreachTimelineAligned,
      setMilestonesAligned,
      componentProgress,
      setComponentProgress, // ✅ MUST include this
    }),
    [
      isValuePropositionAligned,
      isCollateralsAligned,
      isMarketCriteriaAligned,
      isOutreachTimelineAligned,
      isMilestonesAligned,
      componentProgress,
      setComponentProgress, // ✅ Included here
    ]
  );

  return (
    <AlignmentContext.Provider value={alignmentContextValue}>
      {children}
    </AlignmentContext.Provider>
  );
};

// Hook to use context
export const useAlignment = () => {
  const context = useContext(AlignmentContext);
  if (!context) {
    throw new Error("useAlignment must be used within an AlignmentProvider");
  }
  return context;
};
