import { ArrowLeft, LineChart, ArrowRight, Check, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAlignment } from "@/context/AlignmentContext";
import { cn } from "@/lib/utils";

export function MediaOutreach() {
  const navigate = useNavigate();
  const { 
    isOutreachTimelineAligned,
    isValuePropositionAligned,
    isCollateralsAligned,
    isMarketCriteriaAligned,
    isMilestonesAligned 
  } = useAlignment();

  // Check if ALL steps are aligned
  const isFullyAligned = isValuePropositionAligned && isCollateralsAligned && 
                         isMarketCriteriaAligned && isOutreachTimelineAligned && 
                         isMilestonesAligned;
                         
  // Score for the Media/Outreach section - can be set dynamically based on criteria
  const mediaOutreachScore = 82;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="sr-only">Media / Outreach</h1>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {isOutreachTimelineAligned ? (
          <Card className="border-2 border-green-500 bg-white dark:bg-gray-800 md:col-span-2">
            <CardContent className="p-6">
              {/* Header with green check icon */}
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              
              {/* Title and description */}
              <h3 className="text-2xl font-semibold mb-2">Media / Outreach</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Momentum and media are everything! Engage, connect, and keep the energy high - your next breakthrough is just a message away.
              </p>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/outreach-timeline")}
                  className="justify-between border-green-500 text-green-500 hover:bg-green-900/20"
                >
                  View Plan <Eye className="ml-1 h-5 w-5" />
                </Button>
                
                <Button
                  onClick={() => navigate("/media-outreach-chat")}
                  className="justify-between bg-green-500 hover:bg-green-600 text-white"
                >
                  Enhance Score <Star className="ml-1 h-5 w-5" />
                </Button>
              </div>
              
              {/* Score section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <h4 className="text-center font-medium text-xl mb-4">Score</h4>
                <div className="flex items-center gap-6">
                  {/* Score circle */}
                  <div className="relative">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <circle 
                        cx="30" cy="30" r="26" 
                        strokeWidth="6" 
                        stroke="#eee" 
                        fill="none" 
                      />
                      <circle 
                        cx="30" cy="30" r="26" 
                        strokeWidth="6" 
                        stroke="#22c55e" 
                        fill="none" 
                        strokeLinecap="round"
                        strokeDasharray={`${mediaOutreachScore * 1.64} 164`}
                        strokeDashoffset="41"
                        transform="rotate(-90 30 30)"
                      />
                      <text 
                        x="30" y="30" 
                        dominantBaseline="middle" 
                        textAnchor="middle" 
                        fontSize="16" 
                        fontWeight="bold"
                        fill="#22c55e"
                      >
                        {mediaOutreachScore}
                      </text>
                    </svg>
                  </div>
                  
                  {/* Score description */}
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Your Media / Outreach has been scored. Refine your approach to improve the result.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // ... keep existing code (the non-completed view with Indicative Outreach Timeline and Template cards)
          <>
            <Card className={cn(
              "border transition-all duration-200",
              isOutreachTimelineAligned
                ? "border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600"
                : "border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600"
            )}>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start w-full">
                  <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                    <LineChart size={24} className="text-orange-500 dark:text-orange-400" />
                  </div>
                  
                  {isOutreachTimelineAligned && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 flex items-center gap-1">
                      <Check size={14} className="text-green-600 dark:text-green-400" />
                      <span>Aligned</span>
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Indicative Outreach Timeline</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  This section outlines the recommended timeline and sequence for engaging prospects
                  throughout the SDR journey. From the initial cold email and follow-up communications
                  to LinkedIn connection requests and scheduled calls, it provides a structured outreach
                  flow to help sales teams build momentum, maintain consistency, and improve
                  response rates across every touchpoint.
                </p>
                
                <Button 
                  onClick={() => navigate("/outreach-timeline")}
                  className={cn(
                    isOutreachTimelineAligned
                      ? "bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border border-green-500 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-2"
                      : "bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 border border-orange-500 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  )}
                >
                  {isOutreachTimelineAligned && (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                  View
                </Button>
              </CardContent>
            </Card>
            
            <Card className={cn(
              "border transition-all duration-200",
              isFullyAligned
                ? "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                : "border-gray-200 dark:border-gray-700 opacity-70"
            )}>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 border-2 border-gray-400 dark:border-gray-500"></div>
                </div>
                
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Template</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  This section contains pre-approved messaging templates crafted to support each
                  stage of the outreach process. Whether it's cold emails, follow-ups, LinkedIn
                  messages, or call scripts, these templates help ensure clarity, consistency, and
                  relevance — enabling SDRs to communicate effectively while staying aligned with the
                  company's tone and positioning.
                </p>
                
                <Button 
                  onClick={() => navigate("/template")}
                  className={cn(
                    "bg-white dark:bg-gray-800 border mt-auto self-start", 
                    isFullyAligned
                      ? "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      : "text-gray-400 border-gray-300 dark:border-gray-600 opacity-70 cursor-not-allowed"
                  )}
                  disabled={!isFullyAligned}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="flex justify-start mt-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/sales-plan")} 
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>Back to Sales Plan</span>
        </Button>
      </div>
    </div>
  );
}
