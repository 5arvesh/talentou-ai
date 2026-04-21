
import { MessageSquare, Database, Volume2, BarChart3, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { Badge } from "@/components/ui/badge";

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlighted?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  isAligned?: boolean;
}

const ActionCard = ({ 
  title, 
  description, 
  icon, 
  highlighted = false,
  isDisabled = false,
  isActive = true,
  actionButton,
  isAligned = false
}: ActionCardProps) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-md p-6 h-full flex flex-col",
      "border transition-all duration-200 shadow-sm",
      highlighted 
        ? "border-orange-500 border-2" 
        : isAligned
          ? "border-green-500 dark:border-green-600 border-2"
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
      isDisabled && "opacity-60 pointer-events-none"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center",
          highlighted 
            ? "bg-orange-50 dark:bg-orange-900/20" 
            : isAligned
              ? "bg-green-50 dark:bg-green-900/20"
              : "bg-gray-50 dark:bg-gray-700"
        )}>
          {isAligned ? (
            <Check size={28} className="text-green-500 dark:text-green-400" />
          ) : icon}
        </div>
        
        {isAligned && (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 flex items-center gap-1">
            <Check size={14} className="text-green-600 dark:text-green-400" />
            <span>Aligned</span>
          </Badge>
        )}
      </div>
      
      <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{description}</p>
      
      {actionButton && isActive && (
        <Button 
          onClick={actionButton.onClick}
          className={cn(
            "mt-auto self-start",
            isAligned 
              ? "bg-white hover:bg-green-50 text-green-600 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-green-900/20 border border-green-500 dark:border-green-600 flex items-center gap-2"
              : highlighted 
                ? "bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
          )}
        >
          {isAligned && (
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Check size={14} className="text-white" />
            </div>
          )}
          {isAligned ? "Continue" : actionButton.label} {!isAligned && <ArrowRight size={16} className="ml-1" />}
        </Button>
      )}
    </div>
  );
};

export function ActionCards() {
  const navigate = useNavigate();
  const { 
    isValuePropositionAligned, 
    isCollateralsAligned, 
    isMarketCriteriaAligned, 
    isOutreachTimelineAligned, 
    isMilestonesAligned 
  } = useAlignment();
  
  const isMessageAligned = isValuePropositionAligned && isCollateralsAligned;
  const isMarketAligned = isMarketCriteriaAligned;
  const isMediaAligned = isOutreachTimelineAligned;
  const isMeasureAligned = isMilestonesAligned;

  // Determine which card is currently active
  const activeCardIndex = 
    !isMessageAligned ? 0 :
    !isMarketAligned ? 1 :
    !isMediaAligned ? 2 :
    !isMeasureAligned ? 3 : 4;
  
  const handleViewMessage = () => {
    navigate("/message");
  };

  const handleViewCriteria = () => {
    navigate("/market-database");
  };

  const handleViewOutreach = () => {
    navigate("/media-outreach");
  };

  const handleViewKPI = () => {
    navigate("/measure-kpi");
  };

  return (
    <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex items-center ">
      <ActionCard
        title="Message / USP"
        description="Great outreach starts with great messaging. Align your pitch, personalize your touch, and amplify your impact with every interaction."
        icon={<MessageSquare size={28} className="text-orange-500 dark:text-orange-400" />}
        highlighted={activeCardIndex === 0}
        isActive={true}
        actionButton={{
          label: "View Message",
          onClick: handleViewMessage
        }}
        isAligned={isMessageAligned}
      />
      
      <ActionCard
        title="Market / Database"
        description="Not all leads shine - focus on the ones that do. Dig into the right market and strike gold by engaging the best-fit prospects."
        icon={<Database size={28} className={activeCardIndex === 1 ? "text-orange-500 dark:text-orange-400" : "text-gray-500 dark:text-gray-400"} />}
        highlighted={activeCardIndex === 1}
        isDisabled={activeCardIndex < 1}
        isActive={activeCardIndex >= 1}
        actionButton={{
          label: "View Criteria",
          onClick: handleViewCriteria
        }}
        isAligned={isMarketAligned}
      />
      
      <ActionCard
        title="Media / Outreach"
        description="Momentum and media are everything! Engage, connect, and keep the energy high - your next breakthrough is just a message away."
        icon={<Volume2 size={28} className={activeCardIndex === 2 ? "text-orange-500 dark:text-orange-400" : "text-gray-500 dark:text-gray-400"} />}
        highlighted={activeCardIndex === 2}
        isDisabled={activeCardIndex < 2}
        isActive={activeCardIndex >= 2}
        actionButton={{
          label: "View Outreach",
          onClick: handleViewOutreach
        }}
        isAligned={isMediaAligned}
      />
      
      <ActionCard
        title="Measure / KPI"
        description="Every conversation teaches you something. Track, tweak, and measure your outreach to improve and outperform every single day."
        icon={<BarChart3 size={28} className={activeCardIndex === 3 ? "text-orange-500 dark:text-orange-400" : "text-gray-500 dark:text-gray-400"} />}
        highlighted={activeCardIndex === 3}
        isDisabled={activeCardIndex < 3}
        isActive={activeCardIndex >= 3}
        actionButton={{
          label: "View KPIs",
          onClick: handleViewKPI
        }}
        isAligned={isMeasureAligned}
      />
    </div>
  );
}
