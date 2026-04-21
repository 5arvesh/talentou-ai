
import React from "react";

interface YourTAPlanSoFarProps_TA_Associate {
  stepLabels?: string[];
}

export function YourTAPlanSoFar_TA_Associate({ stepLabels = ["Company USP", "Talent Pool", "Recruitment Channels", "Success Metrics"] }: YourTAPlanSoFarProps_TA_Associate) {
  const progressItems = [
    { label: stepLabels[0], percentage: 100, color: "bg-green-500" },
    { label: stepLabels[1], percentage: 0, color: "bg-gray-300" },
    { label: stepLabels[2], percentage: 0, color: "bg-gray-300" },
    { label: stepLabels[3], percentage: 0, color: "bg-gray-300" },
  ];

  return (
    <div className="space-y-3 res-1200:space-y-1 res-1400:space-y-2 res-1600:space-y-3">
      {progressItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 res-1200:text-[10px] res-1400:text-xs res-1600:text-sm">
            {item.label}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-gray-200 rounded-full res-1200:w-12 res-1200:h-1.5 res-1400:w-14 res-1600:w-16">
              <div 
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 res-1200:text-[8px] res-1400:text-[10px] res-1600:text-xs">
              {item.percentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
