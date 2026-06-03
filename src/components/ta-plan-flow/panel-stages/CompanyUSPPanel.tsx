import React from "react";
import { useTAPlanFlow } from "@/context/TAPlanFlowContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CompanyUSPPanel() {
  const { planData, updatePlanData } = useTAPlanFlow();

  const charCount = planData.companyUSP.elevatorPitch.length;

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-700">Company USP & Value Propositions</Label>
        <p className="text-sm text-muted-foreground">
          Paste your company website URL in the chat to auto-extract USPs, or type them manually below.
        </p>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">Elevator Pitch</Label>
          <Textarea
            value={planData.companyUSP.elevatorPitch}
            onChange={(e) => updatePlanData("companyUSP", { elevatorPitch: e.target.value })}
            placeholder="Write your company elevator pitch covering: work culture, perks & benefits, performance-based rewards/recognition, awards won by the company, etc."
            className="min-h-[200px] resize-none bg-[#f3eeff] border-[#7800D3]/20 text-gray-800 placeholder:font-normal placeholder:text-muted-foreground"
            maxLength={1000}
          />
          <p className="text-xs text-muted-foreground">
            {charCount < 50
              ? `Minimum 50 characters required (${50 - charCount} more needed)`
              : `${charCount}/1000 characters`}
          </p>
        </div>
      </div>
    </div>
  );
}
