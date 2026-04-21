import React from 'react';
import { CheckCircle2, Circle, Users, Target, MessageSquare, BarChart3, UserPlus } from 'lucide-react';
import { useTAPlan } from '@/context/TAPlanContext';
import { cn } from '@/lib/utils';

const stages = [
  { id: 0, title: 'Company USP', icon: MessageSquare, key: 'companyUSP' },
  { id: 1, title: 'Talent Pool', icon: Users, key: 'talentPool' },
  { id: 2, title: 'Recruitment Channels', icon: Target, key: 'recruitmentChannels' },
  { id: 3, title: 'Success Metrics', icon: BarChart3, key: 'successMetrics' },
  { id: 4, title: 'Team Invitation', icon: UserPlus, key: 'teamInvitation' },
];

interface TAPlanProgressSidebarProps {
  scrollToStageRef?: React.MutableRefObject<((stage: number) => void) | undefined>;
}

export function TAPlanProgressSidebar({ scrollToStageRef }: TAPlanProgressSidebarProps) {
  const { currentStage, stages: stageData, progressPercentage, setCurrentStage } = useTAPlan();

  const getStageStatus = (stageIndex: number) => {
    const stageKey = stages[stageIndex].key as keyof typeof stageData;
    if (stageData[stageKey].completed) return 'completed';
    if (currentStage === stageIndex) return 'in-progress';
    return 'upcoming';
  };

  const getMotivationalText = (progress: number) => {
    if (progress === 0) return "Just getting started! Keep going 🚀";
    if (progress <= 20) return "Great start! Building momentum 💪";
    if (progress <= 50) return "Halfway there! You're doing great 🎯";
    if (progress <= 80) return "Almost there! Final stretch 🏁";
    if (progress < 100) return "So close! One more step 🌟";
    return "Plan complete! Ready to recruit 🎉";
  };

  const handleStageClick = (stageIndex: number) => {
    const status = getStageStatus(stageIndex);
    if (status !== 'upcoming') {
      setCurrentStage(stageIndex);
      // Scroll to the stage in the chat
      if (scrollToStageRef?.current) {
        scrollToStageRef.current(stageIndex);
      }
    }
  };

  return (
    <div className="w-80 h-full bg-background border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Your Progress</h2>
        <p className="text-sm text-muted-foreground mt-1">TA Plan Journey</p>
      </div>

      {/* Stages List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const status = getStageStatus(stage.id);
            const Icon = stage.icon;
            const isClickable = status !== 'upcoming';

            return (
              <div key={stage.id}>
                <button
                  onClick={() => handleStageClick(stage.id)}
                  disabled={!isClickable}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg transition-all",
                    isClickable && "hover:bg-accent cursor-pointer",
                    !isClickable && "opacity-50 cursor-not-allowed",
                    status === 'in-progress' && "bg-accent"
                  )}
                >
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-[#58bb6b]" />
                    ) : status === 'in-progress' ? (
                      <div className="w-6 h-6 rounded-full border-2 border-[#58bb6b] bg-[#58bb6b]/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#58bb6b] animate-pulse" />
                      </div>
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* Stage Content */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <Icon className={cn(
                        "w-4 h-4",
                        status === 'completed' && "text-[#58bb6b]",
                        status === 'in-progress' && "text-[#58bb6b]",
                        status === 'upcoming' && "text-muted-foreground"
                      )} />
                      <h3 className={cn(
                        "font-medium",
                        status === 'completed' && "text-foreground",
                        status === 'in-progress' && "text-[#58bb6b]",
                        status === 'upcoming' && "text-muted-foreground"
                      )}>
                        {stage.title}
                      </h3>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="mt-1">
                      {status === 'completed' && (
                        <span className="text-xs text-[#58bb6b] font-medium">✓ Completed</span>
                      )}
                      {status === 'in-progress' && (
                        <span className="text-xs text-[#58bb6b] font-medium">● In Progress</span>
                      )}
                      {status === 'upcoming' && (
                        <span className="text-xs text-muted-foreground">Upcoming</span>
                      )}
                    </div>
                  </div>
                </button>

                {/* Connecting Line */}
                {index < stages.length - 1 && (
                  <div className={cn(
                    "ml-[21px] w-0.5 h-4 my-1",
                    status === 'completed' ? "bg-[#58bb6b]" : "bg-border"
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Pulse */}
      <div className="p-6 border-t border-border">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm font-semibold text-primary">{Math.round(progressPercentage)}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-[#58bb6b] transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Motivational Text */}
          <p className="text-xs text-muted-foreground text-center">
            {getMotivationalText(progressPercentage)}
          </p>

          {/* Next Step */}
          {progressPercentage < 100 && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Next: </span>
                {stages[currentStage]?.title || 'Complete your plan'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
