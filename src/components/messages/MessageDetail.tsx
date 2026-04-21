
import { Lightbulb, FolderClosed, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { Badge } from "@/components/ui/badge";

export function MessageDetail() {
  const navigate = useNavigate();
  const { isValuePropositionAligned, isCollateralsAligned } = useAlignment();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="sr-only">Message / USP</h1>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Value Proposition Card */}
        <Card className={cn(
          "border border-gray-200 dark:border-gray-700 transition-all duration-200",
          isValuePropositionAligned 
            ? "hover:border-green-300 dark:hover:border-green-700"
            : "hover:border-orange-300 dark:hover:border-orange-700"
        )}>
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start w-full">
              <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                <Lightbulb size={24} className="text-orange-500 dark:text-orange-400" />
              </div>
              
              {isValuePropositionAligned && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 flex items-center gap-1">
                  <Check size={14} className="text-green-600 dark:text-green-400" />
                  <span>Aligned</span>
                </Badge>
              )}
            </div>
            
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Value Proposition</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
              This section outlines the core message that differentiates your offering in the market
              and communicates how you solve customer challenges better than anyone else.
            </p>
            
            {isValuePropositionAligned ? (
              <Button 
                onClick={() => navigate("/value-proposition")}
                className="bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border border-green-500 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 mt-auto self-start flex items-center gap-2"
              >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
                View
              </Button>
            ) : (
              <Button 
                onClick={() => navigate("/value-proposition")}
                className="bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 border border-orange-500 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 mt-auto self-start"
              >
                View
              </Button>
            )}
          </CardContent>
        </Card>
        
        {/* Collaterals Card - With orange styling */}
        <Card className={cn(
          "border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-200",
          isCollateralsAligned 
            ? "hover:border-green-300 dark:hover:border-green-700" 
            : "hover:border-orange-300 dark:hover:border-orange-700"
        )}>
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start w-full">
              <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                <FolderClosed size={24} className="text-orange-500 dark:text-orange-400" />
              </div>
              
              {isCollateralsAligned && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 flex items-center gap-1">
                  <Check size={14} className="text-green-600 dark:text-green-400" />
                  <span>Aligned</span>
                </Badge>
              )}
            </div>
            
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">Collaterals</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
              This section includes decks, brochures, case studies, and other materials that
              reinforce your message and help drive consistent, impactful communication.
            </p>
            
            {isCollateralsAligned ? (
              <Button 
                onClick={() => navigate("/collaterals")}
                className="bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border border-green-500 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 mt-auto self-start flex items-center gap-2"
              >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
                View
              </Button>
            ) : (
              <Button 
                onClick={() => navigate("/collaterals")}
                className="bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 border border-orange-500 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 mt-auto self-start"
              >
                View
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Import cn if not already imported
import { cn } from "@/lib/utils";
