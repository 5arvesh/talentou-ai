
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Clock } from "lucide-react";

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
        <h3 className="text-lg font-bold text-foreground">Milestone Tracker</h3>
        <span className="text-sm text-gray-500">Q2 2025</span>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {milestone.progress >= 100 ? (
                  <Check size={16} className="text-success" />
                ) : (
                  <Clock size={16} className="text-warning" />
                )}
                <span className="font-medium text-sm text-foreground">{milestone.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">Target: {milestone.target}</span>
            </div>

            <div className="flex items-center gap-2">
              <Progress
                value={milestone.progress}
                className="h-2 flex-1 bg-muted"
                style={{
                  background: "hsl(var(--muted))",
                  backgroundImage: milestone.progress >= 100
                    ? "linear-gradient(to right, hsl(var(--success)), hsl(var(--success) / 0.7))"
                    : `linear-gradient(to right, hsl(var(--warning)), hsl(var(--warning) / 0.6) ${milestone.progress}%, hsl(var(--muted)) ${milestone.progress}%)`
                }}
              />
              <span className="text-xs font-semibold w-8 text-right text-muted-foreground">
                {milestone.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
