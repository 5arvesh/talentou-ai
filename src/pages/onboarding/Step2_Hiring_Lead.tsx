
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "./OnboardingLayout";

export default function OnboardingStep2_Hiring_Lead() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    experience: "",
    challenges: ""
  });
  
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    localStorage.setItem('onboarding_step2_hiring_lead', JSON.stringify(formData));
    navigate("/onboarding-hiring-lead/step3");
  };

  const handleBack = () => {
    navigate("/onboarding-hiring-lead/step1");
  };

  const isFormValid = formData.jobTitle && formData.department && formData.experience && formData.challenges;

  return (
    <OnboardingLayout step={2} role="hiring-lead">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl res-1200:text-xl font-bold text-gray-900 mb-2">
            About your role
          </h1>
          <p className="text-gray-600 res-1200:text-sm">
            Tell us about your position and hiring responsibilities
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              placeholder="e.g., Hiring Lead, Talent Acquisition Manager"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="department">Department *</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              placeholder="e.g., Human Resources, Talent Acquisition"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="experience">Years of Experience *</Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              placeholder="e.g., 5+ years in talent acquisition"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="challenges">Current Hiring Challenges *</Label>
            <Textarea
              id="challenges"
              value={formData.challenges}
              onChange={(e) => handleInputChange("challenges", e.target.value)}
              placeholder="Describe your main hiring challenges and goals"
              className="mt-1 min-h-[100px]"
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
