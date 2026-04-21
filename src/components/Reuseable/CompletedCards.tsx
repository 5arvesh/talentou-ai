import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ButtonWthIcon } from "./ButtonWthIcon";

interface CompletedCardsProps {
  title: string;
  description: string;
  score?: number;
  viewPlanPath?: string;
  enhanceScorePath?: string;
  className?: string;
}

export const CompletedCards = ({
  title,
  description,
  score = 75,
  viewPlanPath,
  enhanceScorePath,
  className,
}: CompletedCardsProps) => {
  return (
    <Card
      className={cn(
        "border border-green-500 bg-white dark:bg-gray-800 h-[450px] overflow-hidden res-1200:h-[320px] res-1400:h-[380px]",
        className
      )}
    >
      <CardContent className="p-4">
        {/* Header with green check icon */}
        <div className="mb-4 res-1200:mb-2 res-1400:mb-2">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center res-1200:w-9 res-1200:h-9 res-1400:w-12 res-1400:h-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600 res-1200:h-4 res-1200:w-4 res-1400:w-6 res-1400:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        {/* Title and description */}
        <h3 className="text-xl font-bold mb-3 res-1200:text-md res-1200:mb-2 res-1400:mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed min-h-[3.5rem] res-1200:min-h-[2.5rem] res-1200:text-xs res-1200:mb-2 res-1400:text-sm">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6 res-1200:gap-2 res-1200:mb-3 res-1400:mb-2">
          <ButtonWthIcon text="View Plan" path={viewPlanPath} />
          <ButtonWthIcon text="Enhance Score" path={enhanceScorePath} />
        </div>

        {/* Score section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 res-1200:mt-2 res-1200:pt-2 res-1400:mt-2 res-1400:pt-2">
          <h4 className="text-center font-medium text-lg mb-4 res-1200:text-sm res-1200:mb-1">
            Score
          </h4>
          <div className="flex items-center gap-4 res-1200:gap-2">
            {/* Score circle */}
            <div className="relative flex-shrink-0">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                className="text-[#1A1A1C] dark:text-white"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="26"
                  strokeWidth="6"
                  stroke="#eee"
                  fill="none"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="26"
                  strokeWidth="6"
                  stroke="#FF7D34"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 100) * 163.36} 163.36`}
                  strokeDashoffset="0"
                  transform="rotate(-90 30 30)"
                />
                <text
                  x="30"
                  y="30"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="bold"
                  fill="currentColor"
                >
                  {score}
                </text>
              </svg>
            </div>

            {/* Score description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed res-1200:text-xs res-1400:text-[13px]">
              Your {title} {title === "Company USP" ? "has" : "have"} been
              scored.{" "}
              {title === "Company USP"
                ? "Revise your content"
                : title === "Talent Pool"
                ? "Refine your criteria"
                : title === "Recruitment Channels"
                ? "Optimize your strategy"
                : "Refine your metrics"}{" "}
              to improve the result.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletedCards;
