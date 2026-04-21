import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TAPlanCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  isCompleted: boolean;
  isActive: boolean;
  ctaText?: string;
}

export const TalentPlanCard = ({
  title,
  description,
  icon: Icon,
  path,
  isCompleted,
  isActive,
  ctaText = "Start Plan",
}: TAPlanCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (title === "Company USP" && isActive && !isCompleted) {
      navigate("/sales-plan/message-plan-chat");
    } else if (title === "Talent Pool" && isActive && !isCompleted) {
      navigate("/sales-plan/market-database-chat");
    } else if (title === "Recruitment Channels" && isActive && !isCompleted) {
      navigate("/sales-plan/media-outreach-chat");
    } else if (title === "Success Metrics" && isActive && !isCompleted) {
      navigate("/sales-plan/measure-kpi-chat");
    } else if (title === "Company USP" && isCompleted) {
      navigate("/sales-plan/view-companyusp");
    }else{
      navigate(path);
    }
  };

  return (
    <Card
      className={cn(
        "relative mt-8 overflow-hidden res-1200:mt-8",
        isCompleted
          ? "border-2 border-green-500 shadow-lg shadow-green-100 dark:shadow-green-900/20 h-1/4"
          : isActive
          ? "border-2 shadow-lg shadow-purple-100 dark:shadow-purple-900/20"
          : "border border-gray-200 dark:border-gray-700 shadow-sm"
      )}
      style={isActive && !isCompleted ? { borderColor: "#7800D3" } : {}}
    >
      <div className="p-6 res-1200:p-3 res-1400:p-6 ">
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mb-5 res-1200:w-10 res-1200:h-10 res-1200:mb:1 res-1400:h-5 res-1400:w-5",
            isCompleted
              ? "bg-green-100 dark:bg-green-900/20"
              : isActive
              ? "bg-purple-100 dark:bg-purple-900/20"
              : "bg-gray-100 dark:bg-gray-800"
          )}
        >
          {isCompleted ? (
            <Check className="h-8 w-8 text-green-500 res-1400:h-20 res-1400:w-20" />
          ) : (
            <Icon
              className={cn(
                "h-8 w-8 res-1200:w-4 res-1200:h-4 res-1400:w-5 res-1400:h-5",
                isActive
                  ? "text-purple-500 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400"
              )}
              style={isActive ? { color: "#7800D3" } : {}}
            />
          )}
        </div>

        <h3 className="text-xl font-bold mb-3 res-1200:text-md res-1200:mb-2">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed res-1200:text-xs res-1200:mb-2 res-1400:text-sm">
          {description}
        </p>

        {isActive && !isCompleted && (
          <Button
            style={{ backgroundColor: "#4ead3b", color: "black" }}
            className="hover:opacity-90 res-1200:text-xs"
            onClick={handleClick}
          >
            {ctaText}{" "}
            <ArrowRight className="ml-1 h-4 w-4 res-1200:-ml-0.5 res-1200:w-3 res-1200:h-3" />
          </Button>
        )}

        {isCompleted && (
          <Button
            className="bg-white hover:bg-green-50 text-green-600 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-green-900/20 border border-green-500 res-1200:text-xs"
            onClick={() => navigate(path)}
          >
            View Plan{" "}
            <ArrowRight className="ml-1 h-3 w-3 res-1200:h-2 res-1200:w-2 res-1200:-ml-0.5" />
          </Button>
        )}
      </div>
    </Card>
  );
};
