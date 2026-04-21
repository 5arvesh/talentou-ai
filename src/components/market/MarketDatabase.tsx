
import { Globe, Building2, DollarSign, Users, Check, ArrowRight, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function MarketDatabase() {
  const navigate = useNavigate();
  const { 
    isMarketCriteriaAligned,
    isValuePropositionAligned,
    isCollateralsAligned,
    isOutreachTimelineAligned,
    isMilestonesAligned
  } = useAlignment();

  // Check if ALL steps are aligned
  const isFullyAligned = isValuePropositionAligned && isCollateralsAligned && 
                         isMarketCriteriaAligned && isOutreachTimelineAligned && 
                         isMilestonesAligned;

  // Score for the Market/Database section - can be set dynamically based on criteria
  const marketDatabaseScore = 78;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="sr-only">Market / Database</h1>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Market Criteria Card - With green styling when completed */}
        {isMarketCriteriaAligned ? (
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
              <h3 className="text-2xl font-semibold mb-2">Market / Database</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Not all leads shine - focus on the ones that do. Dig into the right market and strike gold by engaging the best-fit prospects.
              </p>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/market-criteria")}
                  className="justify-between border-green-500 text-green-500 hover:bg-green-900/20"
                >
                  View Plan <Eye className="ml-1 h-5 w-5" />
                </Button>
                
                <Button
                  onClick={() => navigate("/market-database-chat")}
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
                        strokeDasharray={`${marketDatabaseScore * 1.64} 164`}
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
                        {marketDatabaseScore}
                      </text>
                    </svg>
                  </div>
                  
                  {/* Score description */}
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Your Market / Database has been scored. Refine your criteria to improve the result.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className={cn(
            "border transition-all duration-200",
            "border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600"
          )}>
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start w-full">
                <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                  <Globe size={24} className="text-orange-500 dark:text-orange-400" />
                </div>
                
                {isMarketCriteriaAligned && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 flex items-center gap-1">
                    <Check size={14} className="text-green-600 dark:text-green-400" />
                    <span>Aligned</span>
                  </Badge>
                )}
              </div>
              
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Market Criteria</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                This section captures the strategic targeting parameters defined for your outreach efforts. 
                It includes geographical focus areas, priority industry groups, ideal company attributes, 
                and key contact personas — all curated to help your team align on the most relevant 
                opportunities and engage with the right audience at the right time.
              </p>
              
              <Button 
                onClick={() => navigate("/market-criteria")}
                className="bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 border border-orange-500 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
              >
                View
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Company Details Card - Show only if not showing the completed card */}
        {!isMarketCriteriaAligned && (
          <Card className={cn(
            "border transition-all duration-200",
            isFullyAligned
              ? "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              : "border-gray-200 dark:border-gray-700 opacity-70"
          )}>
            <CardContent className="p-6 flex flex-col h-full">
              <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-4">
                <Building2 size={24} className="text-gray-500 dark:text-gray-400" />
              </div>
              
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Company Details</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                This section offers a comprehensive view of the organization, including foundational details, 
                strategic fit, and alignment with your ideal customer profile. It brings together company 
                background, fitment scores, and value alignment insights — helping your teams quickly 
                assess relevance and tailor outreach with precision.
              </p>
              
              <Button 
                onClick={() => navigate("/database-builder")}
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
        )}
      </div>
    </div>
  );
}
