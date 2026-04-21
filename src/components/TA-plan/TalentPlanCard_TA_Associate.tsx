
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TAPlanCardProps_TA_Associate {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  isCompleted: boolean;
  isActive: boolean;
  ctaText?: string;
}

export const TalentPlanCard_TA_Associate = ({
  title,
  description,
  icon: Icon,
  path,
  isCompleted,
  isActive,
  ctaText = "View Plan",
}: TAPlanCardProps_TA_Associate) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (title === "Company USP" && isActive && !isCompleted) {
      navigate("/ta-associate-plan/message-plan-chat");
    } else if (title === "Talent Pool" && isActive && !isCompleted) {
      navigate("/ta-associate-plan/talent-pool");
    } else if (title === "Recruitment Channels" && isActive && !isCompleted) {
      navigate("/ta-associate-plan/recruitment-channel");
    } else if (title === "Success Metrics" && isActive && !isCompleted) {
      navigate("/ta-associate-plan/success-metrics");
    } else {
      navigate(path);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    isCompleted === true;
  };

  return (
    <Card
      className={cn(
        "relative mt-8 overflow-hidden res-1200:mt-8 h-[280px] flex flex-col",
        isCompleted
          ? "border-2 border-green-500 shadow-lg shadow-green-100 dark:shadow-green-900/20"
          : isActive
          ? "border-2 shadow-lg shadow-purple-100 dark:shadow-purple-900/20"
          : "border border-gray-200 dark:border-gray-700 shadow-sm"
      )}
      style={isActive && !isCompleted ? { borderColor: "#7800D3" } : {}}
    >
      <div className="p-6 res-1200:p-3 res-1400:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-5 res-1200:mb-1">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center res-1200:w-8 res-1200:h-8 res-1400:h-10 res-1400:w-10",
              isCompleted
                ? "hidden"
                : isActive
                ? "bg-purple-100 dark:bg-purple-900/20"
                : "bg-gray-100 dark:bg-gray-800"
            )}
          >
            {!isCompleted && (
              <Icon
                className={cn(
                  "h-6 w-6 res-1200:w-4 res-1200:h-4 res-1400:w-5 res-1400:h-5",
                  isActive
                    ? "text-purple-500 dark:text-purple-400"
                    : "text-gray-500 dark:text-gray-400"
                )}
                style={isActive ? { color: "#7800D3" } : {}}
              />
            )}
          </div>
          
          {isCompleted && (
            <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium px-3 py-2 rounded-full flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Aligned
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold mb-3 res-1200:text-md res-1200:mb-2">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed res-1200:text-xs res-1200:mb-2 res-1400:text-sm flex-1">
          {description}
        </p>

        {isActive && !isCompleted && (
          <Button
            style={{ backgroundColor: "#4ead3b", color: "black" }}
            className="hover:opacity-90 res-1200:text-xs mt-auto"
            onClick={handleClick}
          >
            {ctaText}{" "}
            <ArrowRight className="ml-1 h-4 w-4 res-1200:-ml-0.5 res-1200:w-3 res-1200:h-3" />
          </Button>
        )}

        {isCompleted && (
          <div className="flex justify-start">
            <Button
              className="bg-white hover:bg-green-50 text-green-600 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-green-900/20 border border-green-500 res-1200:text-xs px-4 py-2 text-sm"
              onClick={() => handleNavigate(path)}
            >
              View Plan{" "}
              <ArrowRight className="ml-1 h-3 w-3 res-1200:h-2 res-1200:w-2 res-1200:-ml-0.5" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
