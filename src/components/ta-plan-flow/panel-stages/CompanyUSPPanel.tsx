import React from "react";
import { useTAPlanFlow } from "@/context/TAPlanFlowContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function CompanyUSPPanel() {
  const { planData, updatePlanData, completeStage, setCurrentStage } = useTAPlanFlow();

  const handleNext = () => {
    completeStage("companyUSP");
    setCurrentStage(1);
  };

  const charCount = planData.companyUSP.elevatorPitch.length;
  const isFormValid = charCount >= 50;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-bold text-[#6474a9]">Company USP & Value Propositions</Label>
        <p className="text-sm text-muted-foreground">
          Paste your company website URL in the chat to auto-extract USPs, or type them manually below.
        </p>

        {/* Elevator Pitch Textarea */}
        <div className="space-y-2">
          <Label className="text-sm font-bold text-[#6474a9]">Elevator Pitch</Label>
          <Textarea
            value={planData.companyUSP.elevatorPitch}
            onChange={(e) => updatePlanData("companyUSP", { elevatorPitch: e.target.value })}
            placeholder="Write your company elevator pitch covering: work culture, perks & benefits, performance-based rewards/recognition, awards won by the company, etc."
            className="min-h-[200px] resize-none bg-[#f3eeff] border-[#7800D3]/20 font-bold text-black placeholder:font-normal placeholder:text-muted-foreground"
            maxLength={1000}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              {charCount < 50
                ? `Minimum 50 characters required (${50 - charCount} more needed)`
                : `${charCount}/1000 characters`}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 flex flex-col items-end gap-2">
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white rounded-full px-6 py-2 h-auto text-base font-medium border-0"
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
        {!isFormValid && (
          <p className="text-xs text-muted-foreground">
            Please write at least 50 characters to continue
          </p>
        )}
      </div>
    </div>
  );
}
