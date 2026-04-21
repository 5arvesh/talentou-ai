import React, { useEffect } from 'react';
import {Database, Megaphone, ChartBar, UserPlus, Users, MessageSquareText, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { TalentPlanCard } from "./TalentPlanCard";
import { CompletedCards } from "@/components/Reuseable/CompletedCards";
import { Button } from "@/components/ui/button";

export const SalesPlanDashboard = () => {
  const navigate = useNavigate();
  const {
    isValuePropositionAligned,
    isCollateralsAligned,
    isMarketCriteriaAligned,
    isOutreachTimelineAligned,
    isMilestonesAligned,
    setComponentProgress
  } = useAlignment();

  const isMessageFullyAligned = isValuePropositionAligned && isCollateralsAligned;
  const isMediaOutreachFullyAligned = isOutreachTimelineAligned;
  const allPlansCompleted = isMessageFullyAligned && isMarketCriteriaAligned && isMediaOutreachFullyAligned && isMilestonesAligned;

  const handleAssignTATeam = () => {
    setComponentProgress('companyUSP', 100);
    setComponentProgress('talentPool', 100);
    setComponentProgress('recruitmentChannels', 100);
    setComponentProgress('successMetrics', 100);
    navigate("/sales-plan/assign-ta-team");
  };

  useEffect(() => {
    localStorage.setItem("CollateralsAligned", "false");
    localStorage.setItem("MilestonesAligned", "false");
    localStorage.setItem("OutreachTimelineAligned", "false");
    localStorage.setItem("MarketCriteriaAligned", "false");
  }, []);

  const cardData = [
    {
      key: "companyUSP",
      title: "Company USP",
      description: "Your employer brand deserves the spotlight. Align recruitment messaging to showcase what makes your company stand out and attract top talent.",
      completedDescription: "Brand positioning aligned, messaging strategy ready, content templates created",
      icon: MessageSquareText,
      path: "/sales-plan/message-plan-chat",
      isCompleted: isMessageFullyAligned,
      isActive: true,
      viewPlanPath:"/sales-plan/view-companyusp"
    },
    {
      key: "talentPool",
      title: "Talent Pool",
      description: "The right candidates, the right results. Identify your target profiles and ensure your team is focused on the highest-impact talent segments.",
      completedDescription: "Target profiles defined, skill requirements set, market segments identified",
      icon: Database,
      path: "/sales-plan/market-database-chat",
      isCompleted: isMarketCriteriaAligned,
      isActive: isMessageFullyAligned,
      viewPlanPath:"/sales-plan/view-talent-pool"
    },
    {
      key: "recruitmentChannels",
      title: "Recruitment Channels",
      description: "Multi-channel, maximum results. Set the right outreach cadence using email, LinkedIn, and calls to engage and convert top candidates.",
      completedDescription: "Multi-channel strategy set, outreach cadences defined, templates ready to use",
      icon: Megaphone,
      path: "/sales-plan/media-outreach-chat",
      isCompleted: isMediaOutreachFullyAligned,
      isActive: isMessageFullyAligned && isMarketCriteriaAligned,
      viewPlanPath:"/sales-plan/view-recruitment-channel"
    },
    {
      key: "successMetrics",
      title: "Success Metrics",
      description: "What gets tracked, gets optimized. Define TA Team KPIs that drive progress, turning consistent efforts into repeatable hiring success.",
      completedDescription: "KPIs established, target metrics set, tracking system ready",
      icon: ChartBar,
      path: "/sales-plan/measure-kpi-chat",
      isCompleted: isMilestonesAligned,
      isActive: isMessageFullyAligned && isMarketCriteriaAligned && isMediaOutreachFullyAligned,
      viewPlanPath:"/sales-plan/view-success-metrics"
    },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">
      {!allPlansCompleted && (
        <div className="mb-6">
          <Button
            onClick={() => navigate("/sales-plan/create-plan")}
            className="h-14 px-8 text-lg"
            style={{ backgroundColor: "#4ead3b", color: "black" }}
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New TA Plan
          </Button>
        </div>
      )}
      
      <div className="mb-6 res-1200:mb-4 res-1400:mb-5 res-1600:mb-6 flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl res-1200:text-xl res-1400:text-2xl res-1600:text-3xl font-bold mb-2 res-1200:mb-1 res-1400:mb-2" style={{ color: "#7800D3" }}>
            Hi Roney Soloman 👋
          </h1>
          {allPlansCompleted ? (
            <>
              <p className="text-gray-700 dark:text-gray-300 text-lg res-1200:text-sm res-1400:text-md">
                Your talent strategy is live – let's refine and win! Talentou AI will provide real-time insights, uncover sourcing patterns, and suggest optimizations to keep you ahead in recruiting top talent.
              </p>
              <p className="text-gray-800 dark:text-gray-200 text-lg res-1200:text-sm res-1400:text-md res-1600:text-xl font-medium pr-4">
                As the TA Lead, you have defined your TA Plan. Let's get the TA team excited and onboarded.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-700 dark:text-gray-300 text-lg res-1200:text-sm res-1400:text-md">
                Welcome to your hiring launchpad! Create Strong messages, define your ideal candidate, set your recruitment channels, and track key metrics. With Talentou Ai, hiring is smarter and teams perform better.
              </p>
              <p className="text-gray-800 dark:text-gray-200 text-xl font-medium mt-2 res-1200:text-sm res-1400:text-md">
                As a TA Lead, your mission is to build a winning hiring strategy:
              </p>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-1/2 items-center mt-[80px] res-1200:mt-[8px] res-1400:mt-[30px] res-1600:mt-[40px] res-1200:gap-4">
        {cardData.map((card) =>
          card.isCompleted ? (
            <CompletedCards
              key={card.key}
              title={card.title}
              description={card.completedDescription}
              viewPlanPath={card.viewPlanPath}
              enhanceScorePath={card.path}
              className="lg:col-span-1 res-1200:mt-[30px] res-1200:md:col-span-1"
            />
          ) : (
            <TalentPlanCard
              key={card.key}
              title={card.title}
              description={card.description}
              icon={card.icon}
              path={card.path}
              isCompleted={card.isCompleted}
              isActive={card.isActive}
              ctaText="Start Now"
            />
          )
        )}
      </div>

      {allPlansCompleted && (
        <div className="mt-8 res-1200:mt-2 res-1400:mt-7 res-1600:mt-10 flex justify-center gap-4">
          <Button
            onClick={handleAssignTATeam}
            className="py-4 h-12 res-1200:py-0 res-1200:h-8 res-1400:h-8 res-1400:py-3 res-1600:py-6 px-6 res-1200:px-2 res-1400:px-6 res-1600:px-8 text-base res-1200:text-xs res-1400:text-base res-1600:text-lg flex items-center gap-2 text-black"
            style={{ backgroundColor: "#4ead3b" }}
            size="lg"
          >
            <UserPlus size={20} className="w-4 h-4 res-1200:w-1 res-1200:h-1 res-1400:w-5 res-1400:h-5 res-1600:w-6 res-1600:h-6" />
            Assign Recruiter
          </Button>

          <Button
            disabled
            className="py-4 h-12 res-1200:py-0 res-1200:h-8 res-1400:h-8 res-1400:py-3 res-1600:py-6 px-6 res-1200:px-2 res-1400:px-6 res-1600:px-8 text-base res-1200:text-xs res-1400:text-base res-1600:text-lg flex items-center gap-2 text-gray-500 bg-gray-300 cursor-not-allowed opacity-50"
            size="lg"
          >
            <Users size={20} className="w-4 h-4 res-1200:w-1 res-1200:h-1 res-1400:w-5 res-1400:h-5 res-1600:w-6 res-1600:h-6" />
            Onboard Hiring Lead
          </Button>
        </div>
      )}
    </div>
  );
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    