
import React, { useState } from "react";
import { SalesPlanProgress } from "../media/chat/SalesPlanProgress";
import { StatusButtons } from "../media/chat/StatusButtons";
import { MilestoneSchedule } from "./MilestoneSchedule";

export function MeasureSidebar() {
  const [collapsePlan, setCollapsePlan] = useState(false);

  return (
    <div className="w-96 h-full p-4 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
      {/* Sales Plan Summary Card */}
      <SalesPlanProgress 
        isCollapsed={collapsePlan} 
        toggleCollapse={() => setCollapsePlan(!collapsePlan)} 
      />

      {/* Status Buttons */}
      {!collapsePlan && <StatusButtons />}

      {/* Milestones Schedule */}
      {!collapsePlan && <MilestoneSchedule />}
    </div>
  );
}
