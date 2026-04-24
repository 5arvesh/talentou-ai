import React from "react";
import { useHiringLeadConversation } from "@/context/HiringLeadConversationContext";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
const sections = [
  { id: 0, title: 'Job Details', number: 1, key: 'jobDetails' as const },
  { id: 1, title: 'Skills & Responsibilities', number: 2, key: 'skillsResponsibilities' as const },
  { id: 2, title: 'Interview Setup', number: 3, key: 'interviewSetup' as const },
  { id: 3, title: 'View Job Description', number: 4, key: 'viewJD' as const },
];
interface HiringLeadConversationProgressProps {
  scrollToStageRef?: React.MutableRefObject<((stage: number) => void) | undefined>;
}
export function HiringLeadConversationProgress({ scrollToStageRef }: HiringLeadConversationProgressProps) {
  const { currentStage, stages, progressPercentage, setCurrentStage } = useHiringLeadConversation();
  const getSectionStatus = (sectionIndex: number): "completed" | "in-progress" | "upcoming" => {
    const section = sections[sectionIndex];
    if (stages[section.key].completed) return "completed";
    if (currentStage === sectionIndex) return "in-progress";
    return "upcoming";
  };
  const handleSectionClick = (sectionIndex: number) => {
    setCurrentStage(sectionIndex);
    if (scrollToStageRef?.current) {
      scrollToStageRef.current(sectionIndex);
    }
  };
  const getMotivationalText = (progress: number) => {
    if (progress === 0) return "Let's create your first position!";
    if (progress < 40) return "Great start! Keep going!";
    if (progress < 70) return "You're making excellent progress!";
    if (progress < 100) return "Almost there! Stay focused!";
    return "Congratulations! Position ready to publish!";
  };
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - aligned with other panels */}
      <div className="p-6 border-b border-[#7800D3]/15">
        <h2 className="text-xl font-bold text-[#7800D3]">Create Position</h2>
        <p className="text-xs text-muted-foreground mt-1">Track your progress</p>
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
                p-4 transition-all duration-200
                ${status === 'completed' ? 'border-[#4ead3b] bg-background hover:bg-muted/30 cursor-pointer' : ''}
                ${status === 'in-progress' ? 'border-[#7800D3] bg-background shadow-md cursor-pointer' : ''}
                ${status === 'upcoming' ? 'border-border bg-background opacity-60 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-lg
                    ${status === 'completed' ? 'bg-[#4ead3b] text-white' : ''}
                    ${status === 'in-progress' ? 'bg-[#7800D3] text-white' : ''}
                    ${status === 'upcoming' ? 'bg-muted text-muted-foreground' : ''}
                  `}
                >
                  {status === 'completed' ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    section.number
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`
                      font-semibold text-sm
                      ${status === 'completed' ? 'text-[#4ead3b] font-bold' : ''}
                      ${status === 'in-progress' ? 'text-[#7800D3]' : ''}
                      ${status === 'upcoming' ? 'text-muted-foreground' : ''}
                    `}
                  >
                    {section.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {status === 'completed' && 'Completed ✓'}
                    {status === 'in-progress' && 'In Progress...'}
                    {status === 'upcoming' && 'Upcoming'}
                  </p>
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
          <span className="text-2xl font-bold text-foreground">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2 mb-3" />
        <p className="text-sm font-medium text-foreground mb-2">{getMotivationalText(progressPercentage)}</p>
        {progressPercentage < 100 && (
          <p className="text-xs text-muted-foreground">
            Next: {sections.find((s) => getSectionStatus(s.id) === 'in-progress')?.title}
          </p>
        )}
      </div>
    </div>
  );
}
