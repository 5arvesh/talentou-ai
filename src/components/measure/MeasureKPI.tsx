
import { ArrowLeft, Flag, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useAlignment } from "@/context/AlignmentContext";
import { cn } from "@/lib/utils";

export function MeasureKPI() {
  const navigate = useNavigate();
  const { isMilestonesAligned } = useAlignment();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="sr-only">Measure / KPI</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Milestones Card */}
        <Card className={cn(
          "border transition-all duration-200",
          isMilestonesAligned
            ? "border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600"
            : "border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600"
        )}>
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start w-full">
              <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                <Flag size={24} className="text-orange-500 dark:text-orange-400" />
              </div>
              
              {isMilestonesAligned && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 flex items-center gap-1">
                  <Check size={14} className="text-green-600 dark:text-green-400" />
                  <span>Aligned</span>
                </Badge>
              )}
            </div>
            
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Milestones</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
              This section tracks key activity milestones that define your outreach progress and
              performance benchmarks. From database growth and target companies to contacts
              added, emails sent, LinkedIn touchpoints, calls made, and meetings booked — these
              indicators help your team stay aligned, measure momentum, and ensure every stage of
              the sales journey is executed with precision.
            </p>
            
            {isMilestonesAligned ? (
              <Button 
                onClick={() => navigate("/milestones")}
                className="bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border border-green-500 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 mt-auto self-start flex items-center gap-2"
              >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
                View
              </Button>
            ) : (
              <Button 
                onClick={() => navigate("/milestones")}
                className="bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 border border-orange-500 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 mt-auto self-start"
              >
                View
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Performance Analytics Card */}
        <Card className="border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <TrendingUp size={24} className="text-gray-500 dark:text-gray-400" />
            </div>
            
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Performance Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
              This section offers AI-driven insights into the individual performance of each SDR. Dive
              into detailed KPIs and assess the effectiveness of various outreach methods—emails,
              LinkedIn, calls, and more. These analytics help identify winning approaches, track
              productivity, and guide continuous improvement across every stage of the outreach
              process.
            </p>
            
            <Button 
              onClick={() => navigate("/performance-analytics")}
              className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 mt-auto self-start"
            >
              View
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
