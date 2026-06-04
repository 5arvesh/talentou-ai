import React from 'react';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { Check, MessageSquareText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import mascotImg from '@/assets/talentou-mascot-new.png';
import { useChatPanelStore } from '@/store/chat-panel-store';

const stages = [
  { id: 0, title: 'Company USP', number: 1, key: 'companyUSP' as const },
  { id: 1, title: 'Talent Pool', number: 2, key: 'talentPool' as const },
  { id: 2, title: 'Team Invitation', number: 3, key: 'teamInvitation' as const },
  { id: 3, title: 'Success Metrics', number: 4, key: 'successMetrics' as const },
];

interface TAPlanFlowProgressProps {
  scrollToStageRef?: React.MutableRefObject<((stage: number) => void) | undefined>;
}

export function TAPlanFlowProgress({ scrollToStageRef }: TAPlanFlowProgressProps) {
  const { currentStage, stages: stageData, setCurrentStage } = useTAPlanFlow();
  const { isChatOpen, toggleChat } = useChatPanelStore();

  const getStageStatus = (stageIndex: number) => {
    const stageKey = stages[stageIndex].key;
    if (stageData[stageKey].completed) return 'completed';
    if (stageIndex === currentStage) return 'in-progress';
    return 'upcoming';
  };

  const handleStageClick = (stageIndex: number) => {
    const status = getStageStatus(stageIndex);
    if (status !== 'upcoming') {
      setCurrentStage(stageIndex);
      scrollToStageRef?.current?.(stageIndex);
    }
  };

  const stepsLeft = stages.filter((s) => {
    const st = getStageStatus(s.id);
    return st === 'in-progress' || st === 'upcoming';
  }).length;

  const rawName = localStorage.getItem('userName') ?? 'there';
  const userName = rawName.split(' ')[0];

  return (
    <div className="h-full flex flex-col bg-[#F8F7FF]">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-gray-900">Planning Desk</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Navigate your planning journey</p>
        </div>
        {!isChatOpen && (
          <button
            onClick={toggleChat}
            className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors"
            title="Open chat"
          >
            <MessageSquareText className="h-4 w-4" />
          </button>
        )}
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
                rounded-card transition-all duration-200
                ${status === 'completed' ? 'p-4 bg-white border-2 border-emerald-500 cursor-pointer hover:shadow-md' : ''}
                ${status === 'in-progress' ? 'p-4 bg-white border-2 border-primary shadow-sm cursor-pointer hover:shadow-md' : ''}
                ${status === 'upcoming' ? 'p-4 bg-white border border-border opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-lg
                    ${status === 'completed' ? 'bg-emerald-500 text-white' : ''}
                    ${status === 'in-progress' ? 'bg-primary text-white' : ''}
                    ${status === 'upcoming' ? 'bg-muted text-muted-foreground' : ''}
                  `}
                >
                  {status === 'completed' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stage.number
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`
                      text-sm
                      ${status === 'completed' ? 'text-gray-700 font-semibold' : ''}
                      ${status === 'in-progress' ? 'text-gray-900 font-semibold' : ''}
                      ${status === 'upcoming' ? 'text-gray-400 font-medium' : ''}
                    `}
                  >
                    {stage.title}
                  </h3>
                  <p
                    className={`
                      text-xs mt-0.5
                      ${status === 'completed' ? 'text-emerald-600' : ''}
                      ${status === 'in-progress' ? 'text-primary/70' : ''}
                      ${status === 'upcoming' ? 'text-muted-foreground' : ''}
                    `}
                  >
                    {status === 'completed' && '✓ Completed'}
                    {status === 'in-progress' && 'In Progress...'}
                    {status === 'upcoming' && 'Upcoming'}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Steps left pill */}
      <div className="p-4">
        {stepsLeft > 0 ? (
          <div className="flex items-center gap-3 bg-white border border-border rounded-full px-4 py-2.5 shadow-sm">
            <span className="text-xs text-gray-600 font-medium flex-1">
              Hi {userName}, Just{' '}
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold mx-0.5">
                {stepsLeft}
              </span>{' '}
              steps left
            </span>
            <img src={mascotImg} alt="" className="h-7 w-auto object-contain" />
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2.5">
            <span className="text-xs text-emerald-700 font-medium flex-1">Plan complete! 🎉</span>
            <img src={mascotImg} alt="" className="h-7 w-auto object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}
