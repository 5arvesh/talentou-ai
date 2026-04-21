
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "./OnboardingLayout";

export default function OnboardingStep4_Hiring_Lead() {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      localStorage.setItem('onboarding_completed_hiring_lead', 'true');
      navigate("/hiring-lead-plan");
    }, 2000);
  };

  const handleBack = () => {
    navigate("/onboarding-hiring-lead/step3");
  };

  return (
    <OnboardingLayout step={4} role="hiring-lead">
      <div className="space-y-6 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl res-1200:text-xl font-bold text-gray-900 mb-2">
            You're all set!
          </h1>
          <p className="text-gray-600 res-1200:text-sm">
            Ready to create your personalized hiring strategy
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 text-left">
          <h2 className="font-semibold text-gray-900 mb-3">What's next?</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              Build your company's unique value proposition
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              Define your ideal candidate profiles
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              Set up multi-channel recruitment strategies
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              Track and measure hiring success
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={handleBack}
            variant="outline"
            className="flex-1 h-12 res-1200:h-8"
            disabled={isProcessing}
          >
            Back
          </Button>
          <Button 
            onClick={handleFinish}
            disabled={isProcessing}
            style={{ backgroundColor: "#4ead3b", color: "black" }}
            className="flex-1 h-12 font-medium rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 res-1200:h-8 res-1200:text-xs"
          >
            {isProcessing ? "Setting up..." : "Start Building"}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
