
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "./OnboardingLayout";

export default function OnboardingStep1_Hiring_Lead() {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    headquarters: ""
  });
  
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    // Store form data and navigate to next step
    localStorage.setItem('onboarding_step1_hiring_lead', JSON.stringify(formData));
    navigate("/onboarding-hiring-lead/step2");
  };

  const isFormValid = formData.companyName && formData.industry && formData.companySize && formData.headquarters;

  return (
    <OnboardingLayout step={1} role="hiring-lead">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl res-1200:text-xl font-bold text-gray-900 mb-2">
            Tell us about your company
          </h1>
          <p className="text-gray-600 res-1200:text-sm">
            Help us understand your organization so we can personalize your experience
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder="Enter your company name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="industry">Industry *</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
              placeholder="e.g., Technology, Healthcare, Finance"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="companySize">Company Size *</Label>
            <Input
              id="companySize"
              value={formData.companySize}
              onChange={(e) => handleInputChange("companySize", e.target.value)}
              placeholder="e.g., 50-100 employees"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="headquarters">Headquarters *</Label>
            <Input
              id="headquarters"
              value={formData.headquarters}
              onChange={(e) => handleInputChange("headquarters", e.target.value)}
              placeholder="City, Country"
              className="mt-1"
            />
          </div>
        </div>

        <Button 
          onClick={handleNext}
          disabled={!isFormValid}
          style={{ backgroundColor: "#4ead3b", color: "black" }}
          className="w-full h-12 font-medium rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 res-1200:h-8 res-1200:text-xs"
        >
          Continue
        </Button>
      </div>
    </OnboardingLayout>
  );
}
