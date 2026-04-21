
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function MilestoneSchedule() {
  // Sample milestones data
  const milestones = [
    { name: "Database Growth", target: "500 companies", progress: 85 },
    { name: "Target Companies", target: "200", progress: 70 },
    { name: "Contacts Added", target: "1000", progress: 60 },
    { name: "Emails Sent", target: "2500", progress: 50 },
    { name: "LinkedIn Touchpoints", target: "750", progress: 40 },
    { name: "Calls Made", target: "300", progress: 30 },
    { name: "Meetings Booked", target: "100", progress: 20 },
  ];

  return (
    <Card className="p-4 rounded-xl shadow-[rgba(0,0,0,0.05)_0px_4px_12px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#111827] dark:text-gray-100">Milestone Tracker</h3>
        <span className="text-sm text-gray-500">Q2 2025</span>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {milestone.progress >= 100 ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Clock size={16} className="text-[#FA6400]" />
                )}
                <span className="font-medium text-sm text-[#111827] dark:text-gray-100">{milestone.name}</span>
              </div>
              <span className="text-xs text-[#6B7280] dark:text-gray-400">Target: {milestone.target}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Progress
                value={milestone.progress}
                className={cn(
                  "h-2 flex-1 bg-[#E5E7EB] dark:bg-gray-700",
                )}
                style={{
                  background: "#E5E7EB",
                  backgroundImage: milestone.progress >= 100 
                    ? "linear-gradient(to right, #22c55e, #4ade80)"
                    : `linear-gradient(to right, #FA6400, #fdba74 ${milestone.progress}%, #E5E7EB ${milestone.progress}%)`
                }}
              />
              <span className="text-xs font-semibold w-8 text-right text-[#6B7280] dark:text-gray-400">
                {milestone.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
