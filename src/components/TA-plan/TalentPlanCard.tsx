import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type TAPlanRole = "ta-leader" | "ta-associate" | "hiring-lead";

interface TalentPlanCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  isCompleted: boolean;
  isActive: boolean;
  ctaText?: string;
  role?: TAPlanRole;
  className?: string;
}

export const TalentPlanCard = ({
  title,
  description,
  icon: Icon,
  path,
  isCompleted,
  isActive,
  ctaText,
  role = "ta-leader",
  className,
}: TalentPlanCardProps) => {
  const navigate = useNavigate();

  const defaultCta = role === "hiring-lead" ? "Get Started" : role === "ta-associate" ? "View Plan" : "Start Plan";
  const resolvedCta = ctaText ?? defaultCta;

  const handleClick = () => {
    if (isActive) navigate(path);
  };

  // Hiring Lead variant: tall card with horizontal header and full-width button
  if (role === "hiring-lead") {
    return (
      <Card
        className={cn(
          "h-[450px] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border-2 res-1200:h-[320px] res-1400:h-[380px]",
          isActive ? "border-purple-200 hover:border-purple-300" : "border-gray-200 opacity-50 cursor-not-allowed",
          isCompleted ? "bg-green-50 border-green-200" : "bg-white dark:bg-gray-800",
          className
        )}
        onClick={handleClick}
      >
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

          <h3 className="text-xl font-bold mb-3 res-1200:text-md res-1200:mb-2 res-1400:text-lg res-1400:mb-3" style={{ color: "hsl(var(--primary))" }}>
            {title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-sm leading-relaxed res-1200:text-xs res-1200:mb-3 res-1400:text-sm res-1400:mb-4">
            {description}
          </p>

          <Button
            className={cn(
              "w-full h-12 font-medium res-1200:h-8 res-1200:text-xs res-1400:h-10 res-1400:text-sm",
              isActive
                ? "bg-gradient-to-r from-[#7800D3] to-[#5600ad] hover:from-[#6a00bb] hover:to-[#5000a0] text-white"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            )}
            disabled={!isActive}
          >
            {isCompleted ? "View Details" : resolvedCta}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // TA Associate variant: fixed-height flex card with "Aligned" badge
  if (role === "ta-associate") {
    return (
      <Card
        className={cn(
          "relative mt-8 overflow-hidden res-1200:mt-8 h-[280px] flex flex-col",
          isCompleted
            ? "border-2 border-green-500 shadow-lg shadow-green-100 dark:shadow-green-900/20"
            : isActive
            ? "border-2 shadow-lg shadow-purple-100 dark:shadow-purple-900/20"
            : "border border-gray-200 dark:border-gray-700 shadow-sm",
          className
        )}
        style={isActive && !isCompleted ? { borderColor: "hsl(var(--primary))" } : {}}
      >
        <div className="p-6 res-1200:p-3 res-1400:p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-5 res-1200:mb-1">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center res-1200:w-8 res-1200:h-8 res-1400:h-10 res-1400:w-10",
              isCompleted ? "hidden" : isActive ? "bg-purple-100 dark:bg-purple-900/20" : "bg-gray-100 dark:bg-gray-800"
            )}>
              {!isCompleted && (
                <Icon
                  className={cn(
                    "h-6 w-6 res-1200:w-4 res-1200:h-4 res-1400:w-5 res-1400:h-5",
                    isActive ? "text-purple-500 dark:text-purple-400" : "text-gray-500 dark:text-gray-400"
                  )}
                  style={isActive ? { color: "hsl(var(--primary))" } : {}}
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

          <h3 className="text-xl font-bold mb-3 res-1200:text-md res-1200:mb-2">{title}</h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed res-1200:text-xs res-1200:mb-2 res-1400:text-sm flex-1">
            {description}
          </p>

          {isActive && !isCompleted && (
            <Button
              className="bg-gradient-to-r from-[#7800D3] to-[#5600ad] hover:from-[#6a00bb] hover:to-[#5000a0] text-white hover:opacity-90 res-1200:text-xs mt-auto"
              onClick={handleClick}
            >
              {resolvedCta}
              <ArrowRight className="ml-1 h-4 w-4 res-1200:-ml-0.5 res-1200:w-3 res-1200:h-3" />
            </Button>
          )}

          {isCompleted && (
            <div className="flex justify-start">
              <Button
                className="bg-white hover:bg-green-50 text-green-600 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-green-900/20 border border-green-500 res-1200:text-xs px-4 py-2 text-sm"
                onClick={handleClick}
              >
                View Plan
                <ArrowRight className="ml-1 h-3 w-3 res-1200:h-2 res-1200:w-2 res-1200:-ml-0.5" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    );
  }

  // TA Leader (default) variant
  return (
    <Card
      className={cn(
        "relative mt-8 overflow-hidden res-1200:mt-8",
        isCompleted
          ? "border-2 border-green-500 shadow-lg shadow-green-100 dark:shadow-green-900/20 h-1/4"
          : isActive
          ? "border-2 shadow-lg shadow-purple-100 dark:shadow-purple-900/20"
          : "border border-gray-200 dark:border-gray-700 shadow-sm",
        className
      )}
      style={isActive && !isCompleted ? { borderColor: "hsl(var(--primary))" } : {}}
    >
      <div className="p-6 res-1200:p-3 res-1400:p-6">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-5 res-1200:w-10 res-1200:h-10 res-1200:mb:1 res-1400:h-5 res-1400:w-5",
          isCompleted ? "bg-green-100 dark:bg-green-900/20" : isActive ? "bg-purple-100 dark:bg-purple-900/20" : "bg-gray-100 dark:bg-gray-800"
        )}>
          {isCompleted ? (
            <Check className="h-8 w-8 text-green-500 res-1400:h-20 res-1400:w-20" />
          ) : (
            <Icon
              className={cn(
                "h-8 w-8 res-1200:w-4 res-1200:h-4 res-1400:w-5 res-1400:h-5",
                isActive ? "text-purple-500 dark:text-purple-400" : "text-gray-500 dark:text-gray-400"
              )}
              style={isActive ? { color: "hsl(var(--primary))" } : {}}
            />
          )}
        </div>

        <h3 className="text-xl font-bold mb-3 res-1200:text-md res-1200:mb-2">{title}</h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed res-1200:text-xs res-1200:mb-2 res-1400:text-sm">
          {description}
        </p>

        {isActive && !isCompleted && (
          <Button
            className="bg-gradient-to-r from-[#7800D3] to-[#5600ad] hover:from-[#6a00bb] hover:to-[#5000a0] text-white hover:opacity-90 res-1200:text-xs"
            onClick={handleClick}
          >
            {resolvedCta}
            <ArrowRight className="ml-1 h-4 w-4 res-1200:-ml-0.5 res-1200:w-3 res-1200:h-3" />
          </Button>
        )}

        {isCompleted && (
          <Button
            className="bg-white hover:bg-green-50 text-green-600 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-green-900/20 border border-green-500 res-1200:text-xs"
            onClick={handleClick}
          >
            View Plan
            <ArrowRight className="ml-1 h-3 w-3 res-1200:h-2 res-1200:w-2 res-1200:-ml-0.5" />
          </Button>
        )}
      </div>
    </Card>
  );
};
