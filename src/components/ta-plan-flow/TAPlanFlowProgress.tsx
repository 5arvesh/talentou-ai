import React from 'react';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const stages = [
  { id: 0, title: 'Company USP', number: 1, key: 'companyUSP' as const },
  { id: 1, title: 'Talent Pool', number: 2, key: 'talentPool' as const },
  { id: 2, title: 'Team Invitation', number: 3, key: 'teamInvitation' as const },
  { id: 3, title: 'Recruitment Channels', number: 4, key: 'recruitmentChannels' as const },
  { id: 4, title: 'Success Metrics', number: 5, key: 'successMetrics' as const },
];

interface TAPlanFlowProgressProps {
  scrollToStageRef?: React.MutableRefObject<((stage: number) => void) | undefined>;
}

export function TAPlanFlowProgress({ scrollToStageRef }: TAPlanFlowProgressProps) {
  const { currentStage, stages: stageData, progressPercentage, setCurrentStage, getSectionScore } = useTAPlanFlow();

  const getStageStatus = (stageIndex: number) => {
    const stageKey = stages[stageIndex].key;
    if (stageData[stageKey].completed) return 'completed';
    if (stageIndex === currentStage) return 'in-progress';
    if (stageIndex >= 3) return 'coming-soon'; // Sections 3 & 4 are coming soon
    return 'upcoming';
  };

  const getMotivationalText = (progress: number) => {
    if (progress === 0) return "Let's begin your TA journey!";
    if (progress < 40) return "Great start! Keep going!";
    if (progress < 70) return "You're making excellent progress!";
    if (progress < 100) return "Almost there! Stay focused!";
    return "Congratulations! Your TA Plan is complete!";
  };

  const handleStageClick = (stageIndex: number) => {
    const status = getStageStatus(stageIndex);
    if (status !== 'upcoming' && status !== 'coming-soon') {
      setCurrentStage(stageIndex);
      scrollToStageRef?.current?.(stageIndex);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - aligned with other panels */}
      <div className="p-6 border-b border-[#7800D3]/15">
        <h2 className="text-xl font-bold text-[#7800D3]">Create TA Plan</h2>
        <p className="text-xs text-muted-foreground mt-1">Track your progress</p>
      </div>

      {/* Stages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {stages.map((stage) => {
          const status = getStageStatus(stage.id);

          return (
            <Card
              key={stage.id}
              onClick={() => handleStageClick(stage.id)}
              className={`
                p-4 transition-all duration-200
                ${status === 'completed' ? 'border-[#4ead3b] bg-[#4ead3b]/5 hover:bg-[#4ead3b]/10 cursor-pointer' : ''}
                ${status === 'in-progress' ? 'border-[#7800D3] bg-gradient-to-br from-[#7800D3]/10 to-transparent shadow-md cursor-pointer' : ''}
                ${status === 'upcoming' ? 'border-black bg-white text-black opacity-100 cursor-not-allowed' : ''}
                ${status === 'coming-soon' ? 'border-border bg-muted/30 opacity-60 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-lg
                    ${status === 'completed' ? 'bg-[#4ead3b] text-white' : ''}
                    ${status === 'in-progress' ? 'bg-[#7800D3] text-white' : ''}
                    ${status === 'upcoming' ? 'bg-black text-white' : ''}
                    ${status === 'coming-soon' ? 'bg-muted text-muted-foreground' : ''}
                  `}
                >
                  {status === 'completed' ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    stage.number
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={`
                        font-semibold text-sm
                        ${status === 'completed' ? 'text-[#4ead3b] font-bold' : ''}
                        ${status === 'in-progress' ? 'text-[#7800D3]' : ''}
                        ${status === 'upcoming' ? 'text-black' : ''}
                        ${status === 'coming-soon' ? 'text-muted-foreground' : ''}
                      `}
                    >
                      {stage.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                      {status === 'completed' && 'Completed ✓'}
                      {status === 'in-progress' && 'In Progress...'}
                      {status === 'upcoming' && 'Upcoming'}
                      {status === 'coming-soon' && 'Coming Soon'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Progress Bar - BOTTOM */}
      <div className="p-6 border-t border-[#7800D3]/15">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-2xl font-bold text-[#7800D3]">{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2 mb-3" />
        <p className="text-sm font-medium text-foreground mb-2">{getMotivationalText(progressPercentage)}</p>
        {progressPercentage < 100 && (
          <p className="text-xs text-muted-foreground">
            Next: {stages.find((s) => getStageStatus(s.id) === 'in-progress')?.title}
          </p>
        )}
      </div>
    </div>
  );
}
