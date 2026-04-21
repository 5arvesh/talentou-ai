
import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { AuthHeader } from "@/Reusable/AuthHeader/AuthHeader";
import { AuthRightLayout } from "@/Layout/AuthLayout/AuthRightLayout";

interface OnboardingLayoutProps {
  children: ReactNode;
  step: number;
  title?: string;
  checklistItems?: readonly string[];
  nextRoute?: string;
  role: 'talent-lead' | 'ta-associate' | 'hiring-lead';
  isLastStep?: boolean;
  onNext?: () => void;
}

export function OnboardingLayout({ 
  children, 
  step, 
  title, 
  checklistItems, 
  nextRoute,
  role,
  isLastStep = false,
  onNext
}: OnboardingLayoutProps) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(role === 'ta-associate' ? "User" : "User");
  const progressValue = (step / 4) * 100;
  
  // Hiring lead has different step labels
  const hiringLeadSteps = [
    "Company Info",
    "Your Role", 
    "Hiring Needs",
    "Get Started"
  ];
  
  useEffect(() => {
    // Get the user name from localStorage
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);
  
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (nextRoute) {
      navigate(nextRoute);
    }
  };

  // Render hiring lead layout
  if (role === 'hiring-lead') {
    return (
      <div className="flex min-h-screen">
        {/* Left side - Onboarding form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-7 py-8">
          <AuthHeader />

          {/* Progress indicator */}
          <div className="max-w-md mx-auto w-full mt-6 mb-8 res-1200:max-w-xs res-1400:max-w-md">
            <div className="flex items-center justify-between mb-2">
              {hiringLeadSteps.map((stepLabel, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium res-1200:w-6 res-1200:h-6 res-1200:text-xs ${
                      index + 1 <= step 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < hiringLeadSteps.length - 1 && (
                    <div 
                      className={`w-12 h-0.5 mx-2 res-1200:w-8 ${
                        index + 1 < step ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 res-1200:text-[10px]">
              {hiringLeadSteps.map((stepLabel, index) => (
                <span key={index} className="text-center max-w-[60px] res-1200:max-w-[45px]">
                  {stepLabel}
                </span>
              ))}
            </div>
          </div>

          {/* Form content */}
          <div className="max-w-md mx-auto w-full res-1200:max-w-xs res-1400:max-w-md">
            {children}
          </div>
        </div>
        
        {/* Right side - Gradient background with content */}
        <AuthRightLayout />
      </div>
    );
  }

  // Render talent-lead and ta-associate layout
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto px-6 pt-6 pb-8 dark:text-gray-100 res-1200:pt-3 res-1200:px-3 res-1200:pb-4">
          <div className="max-w-5xl mx-auto res-1200:max-w-3xl">
            <div className="mb-6 res-1200:mb-3">
              <h1 className="text-2xl font-bold mb-1 res-1200:text-lg" style={{ color: "#7800D3" }}>Hi {userName} 👋</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg res-1200:text-sm">
                {role === 'ta-associate' ? 'Welcome to your recruitment launchpad!' : 'Welcome to your recruitment management hub!'}
              </p>
            </div>
            
            {title && checklistItems && (
              <>
                <h2 className="text-xl font-semibold mb-6 res-1200:text-lg">Here's what you need to focus on today:</h2>
                
                <Card className="shadow-md border border-gray-200 dark:border-gray-700 mb-8 res-1200:mb-2">
                  <CardContent className="p-6 res-1200:p-4">
                    <h3 className="text-xl font-bold mb-4 res-1200:mb-2 res-1200:text-[18px]" style={{ color: "#0A92FF" }}>{title}</h3>
                    
                    <div className="space-y-4 res-1200:space-y-2">
                      {checklistItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <span className="flex items-center justify-center w-5 h-5 bg-emerald-500 text-white rounded-sm res-1200:w-4 res-1200:h-4">
                              <Check size={16} />
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 res-1200:text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            
            <div className="flex flex-col space-y-4">
              {children}
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={progressValue} className="h-2" />
                  <style>
                    {`
                      .progress-indicator {
                        background-color: #7800D3 !important;
                      }
                    `}
                  </style>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap res-1200:text-xs">
                  Step {step} of 4
                </span>
              </div>
              
              {nextRoute && (
                <div className="flex justify-end">
                  <Button 
                    onClick={handleNext} 
                    style={{ backgroundColor: "#4ead3b", color: "black" }}
                    className="font-medium px-8 hover:opacity-90 res-1200:h-8 res-1200:text-xs"
                  >
                    {isLastStep ? "Let's Start Winning" : "Next"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
