
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "./OnboardingLayout";

export default function OnboardingStep3_Hiring_Lead() {
  const [formData, setFormData] = useState({
    positions: "",
    timeline: "",
    priorities: "",
    budget: ""
  });
  
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    localStorage.setItem('onboarding_step3_hiring_lead', JSON.stringify(formData));
    navigate("/onboarding-hiring-lead/step4");
  };

  const handleBack = () => {
    navigate("/onboarding-hiring-lead/step2");
  };

  const isFormValid = formData.positions && formData.timeline && formData.priorities && formData.budget;

  return (
    <OnboardingLayout step={3} role="hiring-lead">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl res-1200:text-xl font-bold text-gray-900 mb-2">
            Hiring needs and goals
          </h1>
          <p className="text-gray-600 res-1200:text-sm">
            Help us understand your current hiring requirements
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="positions">Key Positions to Fill *</Label>
            <Textarea
              id="positions"
              value={formData.positions}
              onChange={(e) => handleInputChange("positions", e.target.value)}
              placeholder="List the main roles you're looking to hire for"
              className="mt-1 min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="timeline">Hiring Timeline *</Label>
            <Input
              id="timeline"
              value={formData.timeline}
              onChange={(e) => handleInputChange("timeline", e.target.value)}
              placeholder="e.g., Next 3 months, Q1 2024"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="priorities">Top Hiring Priorities *</Label>
            <Textarea
              id="priorities"
              value={formData.priorities}
              onChange={(e) => handleInputChange("priorities", e.target.value)}
              placeholder="What are your most important hiring objectives?"
              className="mt-1 min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="budget">Budget Considerations *</Label>
            <Input
              id="budget"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
              placeholder="e.g., Budget range, constraints, flexibility"
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={handleBack}
            variant="outline"
            className="flex-1 h-12 res-1200:h-8"
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!isFormValid}
            style={{ backgroundColor: "#4ead3b", color: "black" }}
            className="flex-1 h-12 font-medium rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 res-1200:h-8 res-1200:text-xs"
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
