
import React from 'react';
import { MessageCircle, Database, Megaphone, ChartBar, UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { TalentPlanCard_Hiring_Lead } from "./TalentPlanCard_Hiring_Lead";
import { CompletedMessageCard_Hiring_Lead } from "@/components/messages/CompletedMessageCard_Hiring_Lead";
import { CompletedMarketCard_Hiring_Lead } from "@/components/market/CompletedMarketCard_Hiring_Lead";
import { CompletedMediaCard_Hiring_Lead } from "@/components/media/CompletedMediaCard_Hiring_Lead";
import { CompletedMeasureCard_Hiring_Lead } from "@/components/measure/CompletedMeasureCard_Hiring_Lead";
import { Button } from "@/components/ui/button";

export const SalesPlanDashboard_Hiring_Lead = () => {
  const navigate = useNavigate();
  const { 
    isValuePropositionAligned, 
    isCollateralsAligned, 
    isMarketCriteriaAligned,
    isOutreachTimelineAligned,
    isMilestonesAligned,
    setComponentProgress
  } = useAlignment();
  
  // Check if Message/USP is fully aligned
  const isMessageFullyAligned = isValuePropositionAligned && isCollateralsAligned;
  
  // Check if Media/Outreach is fully aligned
  const isMediaOutreachFullyAligned = isOutreachTimelineAligned;

  // Check if all plans are aligned/completed
  const allPlansCompleted = isMessageFullyAligned && isMarketCriteriaAligned && isMediaOutreachFullyAligned && isMilestonesAligned;

  const handleAssignTATeam = () => {
    // Set all progress to 100% when navigating to assign TA team
    setComponentProgress('companyUSP', 100);
    setComponentProgress('talentPool', 100);
    setComponentProgress('recruitmentChannels', 100);
    setComponentProgress('successMetrics', 100);
    navigate("/hiring-lead-plan/assign-ta-team");
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="mb-6 res-1200:mb-4 res-1400:mb-5 res-1600:mb-6 flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl res-1200:text-xl res-1400:text-2xl res-1600:text-3xl font-bold mb-2 res-1200:mb-1 res-1400:mb-2" style={{ color: "#7800D3" }}>
            Hi Ananthan Gambhiram 👋
          </h1>
          {allPlansCompleted ? (
            <>
              <p className="text-gray-700 dark:text-gray-300 text-lg res-1200:text-sm res-1400:text-md">
                Your talent strategy is live – let's refine and win! Talentou AI will provide real-time insights, uncover sourcing patterns, and suggest optimizations to keep you ahead in recruiting top talent.
              </p>
              <p className="text-gray-800 dark:text-gray-200 text-lg res-1200:text-sm res-1400:text-md res-1600:text-xl font-medium pr-4">
                As the Hiring Lead, you have defined your TA Plan. Let's get the TA team excited and onboarded.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-700 dark:text-gray-300 text-lg res-1200:text-sm res-1400:text-md">
                Welcome to your hiring command center! Build compelling messages, define your ideal candidate profiles, set your recruitment channels, and track key metrics. With Talentou AI, hiring excellence is within reach.
              </p>
              <p className="text-gray-800 dark:text-gray-200 text-xl font-medium mt-2 res-1200:text-sm res-1400:text-md">As a Hiring Lead, your mission is to build a winning hiring strategy:</p>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-1/2 items-center mt-[80px] res-1200:mt-[8px] res-1400:mt-[30px] res-1600:mt-[40px] res-1200:gap-4">
        {/* Message/USP Card - Replace with CompletedMessageCard if aligned */}
        {isMessageFullyAligned ? (
          <CompletedMessageCard_Hiring_Lead className="lg:col-span-1 res-1200:mt-[30px] res-1200:md:col-span-1" />
        ) : (
          <TalentPlanCard_Hiring_Lead
            title="Company USP"
            description="Your employer brand deserves the spotlight. Align recruitment messaging to showcase what makes your company stand out and attract top talent."
            icon={MessageCircle}
            path="/hiring-lead-plan/message"
            isCompleted={isMessageFullyAligned}
            isActive={true}
          />
        )}
        
        {/* Market/Database Card */}
        {isMarketCriteriaAligned ? (
          <CompletedMarketCard_Hiring_Lead className="lg:col-span-1 res-1200:mt-[30px] res-1200:md:col-span-1 "/>
        ) : (
          <TalentPlanCard_Hiring_Lead
            title="Talent Pool"
            description="The right candidates, the right results. Identify your target profiles and ensure your team is focused on the highest-impact talent segments."
            icon={Database}
            path="/hiring-lead-plan/market-database"
            isCompleted={isMarketCriteriaAligned}
            isActive={isMessageFullyAligned}
            ctaText="Start Now"
          />
        )}
        
        {/* Media/Outreach Card - Show CompletedMediaCard when aligned */}
        {isMediaOutreachFullyAligned ? (
          <CompletedMediaCard_Hiring_Lead className="lg:col-span-1 res-1200:mt-[30px] res-1200:md:col-span-1"/>
        ) : (
          <TalentPlanCard_Hiring_Lead
            title="Recruitment Channels"
            description="Multi-channel, maximum results. Set the right outreach cadence using email, LinkedIn, and calls to engage and convert top candidates."
            icon={Megaphone}
            path="/hiring-lead-plan/media-outreach"
            isCompleted={isMediaOutreachFullyAligned}
            isActive={isMessageFullyAligned && isMarketCriteriaAligned}
            ctaText="Start Now"
          />
        )}
        
        {/* Measure/KPI Card - Show CompletedMeasureCard when aligned */}
        {isMilestonesAligned ? (
          <CompletedMeasureCard_Hiring_Lead className="lg:col-span-1 res-1200:mt-[30px] res-1200:md:col-span-1"/>
        ) : (
          <TalentPlanCard_Hiring_Lead
            title="Success Metrics"
            description="What gets tracked, gets optimized. Define TA Team KPIs that drive progress, turning consistent efforts into repeatable hiring success."
            icon={ChartBar}
            path="/hiring-lead-plan/measure-kpi"
            isCompleted={isMilestonesAligned}
            isActive={isMessageFullyAligned && isMarketCriteriaAligned && isMediaOutreachFullyAligned}
            ctaText="Start Now"
          />
        )}
      </div>
      
      {/* Button section - only visible when all plans are completed */}
      {allPlansCompleted && (
        <div className="mt-8 res-1200:mt-2 res-1400:mt-7 res-1600:mt-10 flex justify-center gap-4">
          <Button 
            onClick={handleAssignTATeam} 
            className="py-4 h-12 res-1200:py-0 res-1200:h-8 res-1400:h-8 res-1400:py-3 res-1600:py-6 px-6 res-1200:px-2 res-1400:px-6 res-1600:px-8 text-base res-1200:text-xs res-1400:text-base res-1600:text-lg flex items-center gap-2 text-black"
            style={{ backgroundColor: "#4ead3b" }}
            size="lg"
          >
            <UserPlus size={20} className="w-4 h-4 res-1200:w-1 res-1200:h-1 res-1400:w-5 res-1400:h-5 res-1600:w-6 res-1600:h-6" />
            Assign TA Team
          </Button>
          
          <Button 
            disabled
            className="py-4 h-12 res-1200:py-0 res-1200:h-8 res-1400:h-8 res-1400:py-3 res-1600:py-6 px-6 res-1200:px-2 res-1400:px-6 res-1600:px-8 text-base res-1200:text-xs res-1400:text-base res-1600:text-lg flex items-center gap-2 text-gray-500 bg-gray-300 cursor-not-allowed opacity-50"
            size="lg"
          >
            <Users size={20} className="w-4 h-4 res-1200:w-1 res-1200:h-1 res-1400:w-5 res-1400:h-5 res-1600:w-6 res-1600:h-6" />
            Deploy Strategy
          </Button>
        </div>
      )}
    </div>
  );
};
