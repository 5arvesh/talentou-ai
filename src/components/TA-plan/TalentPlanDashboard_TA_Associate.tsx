import React from 'react';
import { MessageCircle, Database, Megaphone, ChartBar, UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";
import { TalentPlanCard_TA_Associate } from "./TalentPlanCard_TA_Associate";
import { CompletedCardsTAAssociate } from "@/components/Reuseable/CompletedCardsTAAssociate";
import { Button } from "@/components/ui/button";

export const SalesPlanDashboard_TA_Associate = () => {
  const navigate = useNavigate();
  const {
    isValuePropositionAligned,
    isMarketCriteriaAligned,
    isOutreachTimelineAligned,
    isMilestonesAligned,
    setComponentProgress
  } = useAlignment();

  const allPlansCompleted = isValuePropositionAligned && isMarketCriteriaAligned && isOutreachTimelineAligned && isMilestonesAligned;

  const handleAssignTATeam = () => {
    setComponentProgress('companyUSP', 100);
    setComponentProgress('talentPool', 100);
    setComponentProgress('recruitmentChannels', 100);
    setComponentProgress('successMetrics', 100);
    navigate("/recruiter/jobs");
  };

  const cardData = [
    {
      key: "companyUSP",
      title: "Company USP",
      icon: MessageCircle,
      path: "/ta-associate-plan/message-plan-chat",
      isCompleted: isValuePropositionAligned,
      isActive: true,
      description: "Make your reachout count—stick to the tone, highlight what makes your company great, and personalize every message.",
      completedDescription: [
        "Make your reachout count—stick to the tone, highlight what makes your company great, and personalize every message."
      ],
    },
    {
      key: "talentPool",
      title: "Talent Pool",
      icon: Database,
      path: "/ta-associate-plan/talent-pool",
      isCompleted: isMarketCriteriaAligned,
      isActive: isValuePropositionAligned,
      description: "Work smart, not wide. Target only the candidates who match the plan and bring the most value.",
      completedDescription: [
        "Work smart, not wide. Target only the candidates who match the plan and bring the most value."
      ],
    },
    {
      key: "recruitmentChannels",
      title: "Recruitment Channels",
      icon: Megaphone,
      path: "/ta-associate-plan/recruitment-channel",
      isCompleted: isOutreachTimelineAligned,
      isActive: isValuePropositionAligned && isMarketCriteriaAligned,
      description: "Drive momentum across email, LinkedIn, and calls. Keep the conversation flowing.",
      completedDescription: [
        "Drive momentum across email, LinkedIn, and calls. Keep the conversation flowing."
      ],
    },
    {
      key: "successMetrics",
      title: "Success Metrics",
      icon: ChartBar,
      path: "/ta-associate-plan/success-metrics",
      isCompleted: isMilestonesAligned,
      isActive: isValuePropositionAligned && isMarketCriteriaAligned && isOutreachTimelineAligned,
      description: "Track every result. Talentou AI gives you real-time feedback—learn, tweak, repeat.",
      completedDescription: [
        "Track every result. Talentou AI gives you real-time feedback—learn, tweak, repeat."
      ],
    }
  ];

  return (
    <div className="w-full max-w-full overflow-hidden px-6 mt-6">
      <div className="mb-6 res-1200:mb-4 res-1400:mb-5 res-1600:mb-6 flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl res-1200:text-xl res-1400:text-2xl res-1600:text-3xl font-bold mb-2 res-1200:mb-1 res-1400:mb-2" style={{ color: "#7800D3" }}>
            Hi Darshana 👋
          </h1>
          {allPlansCompleted ? (
            <>
              <p className="text-gray-700 dark:text-gray-300 text-lg res-1200:text-sm res-1400:text-md">
                Your talent strategy is live – let's refine and win! Talentou AI will provide real-time insights, uncover sourcing patterns, and suggest optimizations to keep you ahead in recruiting top talent.
              </p>
              <p className="text-gray-800 dark:text-gray-200 text-lg res-1200:text-sm res-1400:text-md res-1600:text-xl font-medium pr-4">
                As the Recruiter, you have defined your TA Plan. Let's get started with execution.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-700 dark:text-gray-300 text-lg res-1200:text-sm res-1400:text-md">
                <strong>Welcome to your launchpad!</strong><br />
                Your TA Lead has set the hiring strategy—now it's your turn to bring it to life. Nail your reach-outs, engage the right candidates, and track your results. With <strong>Talentou AI</strong>, every interaction counts—stay focused, move fast, and hire smarter!
              </p>
              <p className="text-gray-800 dark:text-gray-200 text-xl font-medium mt-2 res-1200:text-sm res-1400:text-md">
                As a TA Team, your role is to execute the recruitment plan with precision:
              </p>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-1/2 items-center mt-[80px] res-1200:mt-[8px] res-1400:mt-[30px] res-1600:mt-[40px] res-1200:gap-4">
        {cardData.map((card) =>
          card.isCompleted ? (
            <CompletedCardsTAAssociate
              key={card.key}
              title={card.title}
              description={card.completedDescription}
              path={card.path}
              className="lg:col-span-1 res-1200:mt-[30px] res-1200:md:col-span-1"
            />
          ) : (
            <TalentPlanCard_TA_Associate
              key={card.key}
              title={card.title}
              description={card.description}
              icon={card.icon}
              path={card.path}
              isCompleted={card.isCompleted}
              isActive={card.isActive}
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
            Start Recruiting
          </Button>

          <Button
            disabled
            className="py-4 h-12 res-1200:py-0 res-1200:h-8 res-1400:h-8 res-1400:py-3 res-1600:py-6 px-6 res-1200:px-2 res-1400:px-6 res-1600:px-8 text-base res-1200:text-xs res-1400:text-base res-1600:text-lg flex items-center gap-2 text-gray-500 bg-gray-300 cursor-not-allowed opacity-50"
            size="lg"
          >
            <Users size={20} className="w-4 h-4 res-1200:w-1 res-1200:h-1 res-1400:w-5 res-1400:h-5 res-1600:w-6 res-1600:h-6" />
            View Team Progress
          </Button>
        </div>
      )}
    </div>
  );
};
