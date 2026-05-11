import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { CheckCircle2, Target, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Criterion {
  key: string;
  label: string;
  defaultWeight: number;
  description: string;
}

const CRITERIA: Criterion[] = [
  { key: "technicalSkills", label: "Technical Skills", defaultWeight: 30, description: "Match between candidate's technical skills and role requirements" },
  { key: "yearsOfExperience", label: "Yrs. of Experience", defaultWeight: 25, description: "Alignment between candidate's experience level and the minimum required" },
  { key: "education", label: "Education", defaultWeight: 5, description: "Relevance of educational background and qualifications" },
  { key: "dateOfJoining", label: "Date of Joining", defaultWeight: 10, description: "Candidate's availability vs. the required start date" },
  { key: "location", label: "Location", defaultWeight: 10, description: "Proximity or willingness to relocate / work remotely" },
  { key: "salaryExpectation", label: "Salary Expectation", defaultWeight: 20, description: "Alignment between expected CTC and the budgeted range" },
];

const DEFAULT_WEIGHTS = CRITERIA.reduce<Record<string, number>>((acc, c) => {
  acc[c.key] = c.defaultWeight;
  return acc;
}, {});

export function JobFitScoreSettings() {
  const [weights, setWeights] = useState<Record<string, number>>({ ...DEFAULT_WEIGHTS });

  const total = Object.values(weights).reduce((sum, w) => sum + w, 0);
  const isValid = total === 100;

  const handleWeightChange = (key: string, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast.success("Job Fit Score weightages saved successfully");
  };

  const handleReset = () => {
    setWeights({ ...DEFAULT_WEIGHTS });
    toast.info("Weightages reset to defaults");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Job Fit Score Weightages</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Adjust how much each criterion contributes to the AI-calculated Job Fit Score. All weightages must total exactly 100%.
        </p>
      </div>

      {/* Criteria sliders */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#ebdbfc] flex items-center justify-center text-[#7800D3]">
            <Target className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Scoring Criteria</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Drag each slider to set the weightage for that criterion</p>
          </div>
        </div>

        <div className="p-5 space-y-6">
          {CRITERIA.map((criterion) => (
            <div key={criterion.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-800">{criterion.label}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{criterion.description}</p>
                </div>
                <span className={cn(
                  "text-sm font-semibold tabular-nums w-12 text-right",
                  weights[criterion.key] === 0 ? "text-gray-400" : "text-[#7800D3]"
                )}>
                  {weights[criterion.key]}%
                </span>
              </div>
              <Slider
                value={[weights[criterion.key]]}
                onValueChange={([val]) => handleWeightChange(criterion.key, val)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Total indicator */}
        <div className={cn(
          "mx-5 mb-5 px-4 py-3 rounded-lg border flex items-center justify-between",
          isValid
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        )}>
          <div className="flex items-center gap-2">
            {isValid
              ? <CheckCircle2 className="h-4 w-4 text-green-600" />
              : <AlertCircle className="h-4 w-4 text-red-500" />
            }
            <span className={cn("text-sm font-medium", isValid ? "text-green-700" : "text-red-600")}>
              {isValid ? "Total is 100% — ready to save" : `Total is ${total}% — must equal 100%`}
            </span>
          </div>
          <span className={cn("text-lg font-bold tabular-nums", isValid ? "text-green-700" : "text-red-600")}>
            {total} / 100%
          </span>
        </div>
      </div>

      {/* Save / Reset */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          onClick={handleSave}
          disabled={!isValid}
          style={{ backgroundColor: isValid ? "#4ead3b" : undefined, color: isValid ? "black" : undefined }}
          className="hover:opacity-90 font-medium disabled:opacity-50"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Save Weightages
        </Button>
        <Button variant="outline" onClick={handleReset} className="text-gray-600">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}
