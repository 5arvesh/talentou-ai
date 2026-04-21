
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TalentPlanCardProps_Hiring_Lead {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  isCompleted?: boolean;
  isActive?: boolean;
  ctaText?: string;
  className?: string;
}

export const TalentPlanCard_Hiring_Lead = ({ 
  title, 
  description, 
  icon: Icon, 
  path, 
  isCompleted = false, 
  isActive = true,
  ctaText = "Get Started",
  className 
}: TalentPlanCardProps_Hiring_Lead) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isActive) {
      navigate(path);
    }
  };

  return (
    <Card className={cn(
      "h-[450px] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border-2 res-1200:h-[320px] res-1400:h-[380px]",
      isActive ? "border-purple-200 hover:border-purple-300" : "border-gray-200 opacity-50 cursor-not-allowed",
      isCompleted ? "bg-green-50 border-green-200" : "bg-white dark:bg-gray-800",
      className
    )} onClick={handleClick}>
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-center mb-4">
          <div className={cn(
            "p-3 rounded-lg mr-4 res-1200:p-2 res-1400:p-3",
            isCompleted ? "bg-green-100" : "bg-purple-100"
          )}>
            <Icon className={cn(
              "h-6 w-6 res-1200:h-4 res-1200:w-4 res-1400:h-5 res-1400:w-5",
              isCompleted ? "text-green-600" : "text-purple-600"
            )} />
          </div>
          {isCompleted && (
            <div className="ml-auto">
              <svg className="h-6 w-6 text-green-600 res-1200:h-4 res-1200:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-3 res-1200:text-md res-1200:mb-2 res-1400:text-lg res-1400:mb-3" style={{ color: "#7800D3" }}>
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-sm leading-relaxed res-1200:text-xs res-1200:mb-3 res-1400:text-sm res-1400:mb-4">
          {description}
        </p>
        
        <Button 
          className={cn(
            "w-full h-12 font-medium res-1200:h-8 res-1200:text-xs res-1400:h-10 res-1400:text-sm",
            isActive ? "hover:opacity-90" : "cursor-not-allowed"
          )}
          disabled={!isActive}
          style={{ backgroundColor: isActive ? "#4ead3b" : "#E5E7EB", color: isActive ? "black" : "#9CA3AF" }}
        >
          {isCompleted ? "View Details" : ctaText}
        </Button>
      </CardContent>
    </Card>
  );
};
