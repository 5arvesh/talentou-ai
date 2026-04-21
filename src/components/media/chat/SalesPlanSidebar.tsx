
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { SalesPlanProgress } from "./SalesPlanProgress";
import { StatusButtons } from "./StatusButtons";
import { OutreachSchedule } from "./OutreachSchedule";

export function SalesPlanSidebar() {
  const [collapsePlan, setCollapsePlan] = useState(false);

  return (
    <div className="w-96 h-full p-4 border-l border-gray-200 dark:border-gray-700 overflow-y-auto flex flex-col">
      {/* Main content area */}
      <div className="flex-1">
        {/* Status Buttons (Tab Navigation) */}
        {!collapsePlan && <StatusButtons />}

        {/* Weekly Outreach Schedule */}
        {!collapsePlan && <OutreachSchedule />}
      </div>

      {/* Sales Plan Progress Card - moved to bottom */}
      <div className="mt-auto">
        <SalesPlanProgress isCollapsed={collapsePlan} toggleCollapse={() => setCollapsePlan(!collapsePlan)} />
      </div>
    </div>
  );
}
