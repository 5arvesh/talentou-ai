import React, { useState, useEffect } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAlignment } from "@/context/AlignmentContext";

interface Stage {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

interface YourTAPlanSoFarProps {
  currentStageIndex?: number;
  onStageClick?: (stageIndex: number) => void;
  planName?: String;
}

const YourTAPlanSoFar = ({
  currentStageIndex = 0,
  onStageClick,
  planName,
}: YourTAPlanSoFarProps) => {
  const { componentProgress } = useAlignment();

  // Define the 4 stages
  const allStages = [
    { id: "company-usp", label: "Company USP" },
    { id: "talent-pool", label: "Talent Pool" },
    { id: "recruitment-channel", label: "Recruitment Channels" },
    { id: "success-metrics", label: "Success Metrics" },
  ];
  const progressKeys = [
    "companyUSP",
    "talentPool",
    "recruitmentChannels",
    "successMetrics",
  ] as const;
  // Get status for each stage based on component progress
  const getStageStatus = (stageIndex: number) => {
    const progressKey = progressKeys[stageIndex];
    const progress = componentProgress[progressKey];

    if (progress === 100) return "completed";
    if (progress > 0) return "current";
    return "upcoming";
  };

  // Calculate which stages are clickable (completed or current)
  const isStageClickable = (stageIndex: number) => {
    const status = getStageStatus(stageIndex);
    return status === "completed" || stageIndex === currentStageIndex;
  };

  const handleStageClick = (stageIndex: number) => {
    if (isStageClickable(stageIndex)) {
      onStageClick?.(stageIndex);
    }
  };

  // Calculate overall progress percentage
  const completedStages = progressKeys.filter(
    (key) => componentProgress[key] === 100
  ).length;
  const progressPercentage = completedStages * 25; // 4 stages, 25% each

  // Stage circle styling based on status
  const getStageCircleStyle = (stageIndex: number) => {
    const status = getStageStatus(stageIndex);
    const isClickable = isStageClickable(stageIndex);

    let baseClasses =
      "w-10 h-10 rounded-full border-2 flex items-center justify-center font-medium text-sm transition-all duration-300 relative z-10 bg-white dark:bg-gray-800 res-1200:text-[9px] res-1200:w-7 res-1200:h-7 res-1400:text-xs res-1400:w-8 res-1400:h-8";

    if (status === "completed") {
      baseClasses += " dark:bg-green-500 border-green-500 text-green-500";
    } else if (status === "current") {
      baseClasses += " border-blue-500 text-blue-500 dark:border-blue-500 dark:bg-blue-500  dark:text-white";
    }
    else {
      baseClasses += " border-gray-300 bg-gray-100 text-gray-500";
    }

    if (isClickable) {
      baseClasses += " cursor-pointer hover:scale-105";
    } else {
      baseClasses += " cursor-not-allowed";
    }

    return baseClasses;
  };

  // Stage label styling based on status
  const getStageLabelStyle = (stageIndex: number) => {
    const status = getStageStatus(stageIndex);
    const isClickable = isStageClickable(stageIndex);

    let baseClasses = "mt-2 text-sm dark:text-white text-center transition-colors duration-300 res-1200:mt-1 res-1200:text-[8px] res-1400:text-[11px] res-1600:text-[12px]";

    if (status === "completed") {
      baseClasses += " text-gray-700 font-medium";
    } else if (status === "current") {
      baseClasses += " text-black font-bold";
    } else {
      baseClasses += " text-gray-400 font-normal";
    }

    if (isClickable) {
      baseClasses += " cursor-pointer";
    }

    return baseClasses;
  };

// Get the last completed stage index (from left to right)
let lastCompletedIndex = -1;
for (let i = allStages.length - 1; i >= 0; i--) {
    if (getStageStatus(i) === "current") {
    lastCompletedIndex = i;
    break;
  }
  if (getStageStatus(i) === "completed") {
    lastCompletedIndex = i;
    break;
  }
}

// Progress width spans from center of first circle to center of last completed circle
const progressWidth =
  lastCompletedIndex > 0
    ? (lastCompletedIndex / (allStages.length)) * 100
    : 0;


  return (
    <div className="bg-white dark:bg-gray-900 px-4 py-2 res-1200:px-5 res-1200:py-2 res-1400:px-7 res-1400:py-2">
      {/* Stage Navigation */}
  <div className="flex items-center justify-center mb-5 res-1200:mb-3 res-1400:mb-6">
        <div className="relative w-full max-w-lg res-1400:max-w-sm res-1200:max-w-xs">
          {/* Continuous Background Line - from center of first to center of last stage */}
          <div
            className="absolute top-5 h-0.5 bg-gray-200 z-0 res-1200:top-3 res-1400:top-4"
            style={{
              left: `${50 / (allStages.length * 2)}%`,
              right: `${55 / (allStages.length * 2)}%`,
           
            }}
          ></div>

          {/* Progress Line Overlay - from center of first to progress point */}
          <div
            className="absolute top-5 h-0.5 bg-green-500 z-0 transition-all duration-500 res-1200:top-3 res-1400:top-4"
            style={{
             left: `${90 / (allStages.length * 2)}%`,
            //  right: `${10 / (allStages.length * 2)}%`,
              width: `${progressWidth}%`,
           
            }}
          ></div>

          {/* Stages Container */}
          <div className="flex items-center justify-between relative z-10">
            {allStages.map((stage, index) => (
              <div key={stage.id} className="flex flex-col items-center">
                {/* Stage Circle */}
                <div
                  className={getStageCircleStyle(index)}
                  onClick={() => handleStageClick(index)}
                >
                  {getStageStatus(index) === "completed" ? (
                    <Check className="w-5 h-5 text-green-500 dark:text-white res-1200:w-3.5 res-1200:h-3.5 res-1400:w-4 res-1400:h-4 res-1600:w-4 res-1600:h-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Stage Label */}
                <span
                  className={getStageLabelStyle(index)} 
                  onClick={() => handleStageClick(index)}
                >
                  {stage.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="flex justify-center w-full items-center">
        <div className="w-full max-w-lg h-4  bg-gray-200 rounded-full overflow-hidden res-1200:h-3 res-1400:h-[13px] res-1600:h-3.5">
        <div
          className="h-full bg-[#7E00FC] flex items-center justify-end pr-2 transition-all duration-500 ease-in-out rounded-full relative"
          style={{ width: `${Math.max(progressPercentage, 0)}%` }}
        >
          <span className="text-xs text-white font-bold res-1200:text-[10px] res-1400:text-xs res-1600:text-xs">
            {progressPercentage}%
          </span>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default YourTAPlanSoFar;
