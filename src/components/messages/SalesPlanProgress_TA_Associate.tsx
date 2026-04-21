
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAlignment } from "@/context/AlignmentContext";

export const SalesPlanProgress_TA_Associate = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { 
    isValuePropositionAligned, 
    isCollateralsAligned, 
    isMarketCriteriaAligned,
    isOutreachTimelineAligned,
    isMilestonesAligned 
  } = useAlignment();

  const steps = [
    { name: "Company USP", completed: isValuePropositionAligned && isCollateralsAligned },
    { name: "Talent Pool", completed: isMarketCriteriaAligned },
    { name: "Recruitment Channels", completed: isOutreachTimelineAligned },
    { name: "Success Metrics", completed: isMilestonesAligned }
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <Card className="h-fit sticky top-4 m-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-lg">Your TA Plan So Far</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{completedSteps}/{steps.length} completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step.name} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-sm ${
                    step.completed ? 'text-green-600 font-medium' : 'text-gray-600'
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
