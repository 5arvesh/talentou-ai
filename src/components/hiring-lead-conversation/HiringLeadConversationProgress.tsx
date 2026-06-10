import React from "react";
import { useHiringLeadConversation } from "@/context/HiringLeadConversationContext";
import { Check, MessageSquareText } from "lucide-react";
import { Card } from "@/components/ui/card";
import mascotImg from '@/assets/talentou-mascot-new.png';
import { useChatPanelStore } from '@/store/chat-panel-store';

const sections = [
  { id: 0, title: 'Job Details', number: 1, key: 'jobDetails' as const },
  { id: 1, title: 'Skills & Responsibilities', number: 2, key: 'skillsResponsibilities' as const },
  { id: 2, title: 'Screening Questions', number: 3, key: 'screeningSetup' as const },
  { id: 3, title: 'View Job Description', number: 4, key: 'viewJD' as const },
  { id: 4, title: 'Interview Setup', number: 5, key: 'interviewSetup' as const },
];

interface HiringLeadConversationProgressProps {
  scrollToStageRef?: React.MutableRefObject<((stage: number) => void) | undefined>;
}

export function HiringLeadConversationProgress({ scrollToStageRef }: HiringLeadConversationProgressProps) {
  const { currentStage, stages, setCurrentStage } = useHiringLeadConversation();
  const { isChatOpen, toggleChat } = useChatPanelStore();

  const getSectionStatus = (sectionIndex: number): "completed" | "in-progress" | "upcoming" => {
    const section = sections[sectionIndex];
    if (stages[section.key].completed) return "completed";
    if (currentStage === sectionIndex) return "in-progress";
    return "upcoming";
  };

  const handleSectionClick = (sectionIndex: number) => {
    const status = getSectionStatus(sectionIndex);
    if (status !== 'upcoming') {
      setCurrentStage(sectionIndex);
      scrollToStageRef?.current?.(sectionIndex);
    }
  };

  const stepsLeft = sections.filter((s) => {
    const st = getSectionStatus(s.id);
    return st === 'in-progress' || st === 'upcoming';
  }).length;

  const rawName = localStorage.getItem('userName') ?? 'there';
  const userName = rawName.split(' ')[0];

  return (
    <div className="h-full flex flex-col bg-[#F8F7FF]">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium tracking-tight text-gray-900">Create Position</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Track your progress</p>
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
        {sections.map((section) => {
          const status = getSectionStatus(section.id);
          return (
            <Card
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`
                rounded-card transition-all duration-300
                ${status === 'completed' ? 'p-4 bg-white border-2 border-emerald-500 cursor-pointer hover:shadow-md' : ''}
                ${status === 'in-progress' ? 'p-4 bg-white border-2 border-primary shadow-sm cursor-pointer hover:shadow-md' : ''}
                ${status === 'upcoming' ? 'p-4 bg-white border border-border opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-base
                    ${status === 'completed' ? 'bg-emerald-500 text-white' : ''}
                    ${status === 'in-progress' ? 'bg-primary text-white' : ''}
                    ${status === 'upcoming' ? 'bg-muted text-muted-foreground' : ''}
                  `}
                >
                  {status === 'completed' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    section.number
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
                    {section.title}
                  </h3>
                  <p
                    className={`
                      text-xs mt-0.5
                      ${status === 'completed' ? 'text-emerald-600' : ''}
                      ${status === 'in-progress' ? 'text-primary/70' : ''}
                      ${status === 'upcoming' ? 'text-muted-foreground' : ''}
                    `}
                  >
                    {status === 'completed' && 'Completed'}
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
              <span key={stepsLeft} className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold mx-0.5 animate-in fade-in duration-300">
                {stepsLeft}
              </span>{' '}
              steps left
            </span>
            <img src={mascotImg} alt="" className="h-7 w-auto object-contain" />
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2.5">
            <span className="text-xs text-emerald-700 font-medium flex-1">Position ready!</span>
            <img src={mascotImg} alt="" className="h-7 w-auto object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}
