import React from 'react';
import { useHiringLeadConversation } from '@/context/HiringLeadConversationContext';
import { JobDetailsForm } from './panel-stages/JobDetailsForm';
import { SkillsResponsibilitiesPanel } from './panel-stages/SkillsResponsibilitiesPanel';
import { ScreeningQuestionsPanel } from './panel-stages/ScreeningQuestionsPanel';
import { InterviewSetupPanel } from './panel-stages/InterviewSetupPanel';
import { JDPreviewPanel } from './panel-stages/JDPreviewPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Check, CheckCircle2 } from 'lucide-react';

const sections = [
  { id: 0, title: 'Job Details', key: 'jobDetails' as const, component: JobDetailsForm },
  { id: 1, title: 'Skills & Responsibilities', key: 'skillsResponsibilities' as const, component: SkillsResponsibilitiesPanel },
  { id: 2, title: 'Screening Questions', key: 'screeningSetup' as const, component: ScreeningQuestionsPanel },
  { id: 3, title: 'View Job Description', key: 'viewJD' as const, component: JDPreviewPanel },
  { id: 4, title: 'Interview Setup', key: 'interviewSetup' as const, component: InterviewSetupPanel },
];

export function HiringLeadConversationPanel() {
  const { currentStage, jobDetails, stages, addChatMessage, completeStage, setCurrentStage, updateJobDetails } = useHiringLeadConversation();

  const getSectionStatus = (sectionId: number) => {
    const section = sections[sectionId];
    if (stages[section.key].completed) return 'completed';
    if (sectionId === currentStage) return 'in-progress';
    return 'upcoming';
  };

  const isCurrentStageComplete = () => {
    switch (currentStage) {
      case 0:
        return jobDetails.title.trim() !== '' &&
               jobDetails.location.trim() !== '' &&
               jobDetails.startDate.trim() !== '' &&
               jobDetails.ctcAmount.trim() !== '' &&
               jobDetails.minExperience.trim() !== '' &&
               jobDetails.sampleProfiles.length > 0;
      case 1:
        return jobDetails.keySkills.length > 0 && jobDetails.responsibilities.length > 0;
      default:
        return true;
    }
  };

  const handleNextStage = () => {
    if (currentStage === 0) {
      updateJobDetails({
        keySkills: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
        desiredSkills: ['AWS', 'Docker', 'Kubernetes', 'GraphQL'],
        responsibilities: [
          'Design and develop scalable web applications',
          'Collaborate with cross-functional teams',
          'Write clean, maintainable code',
          'Participate in code reviews',
        ],
      });
      addChatMessage({
        id: Date.now(), sender: 'ai',
        content: "Great! I've generated the required skills, preferred skills, and responsibilities based on your job details. You can review and edit them in the right panel.",
        name: 'Talentou Agent', stageIndex: 1,
      });
      completeStage('jobDetails');
      setCurrentStage(1);
    } else if (currentStage === 1) {
      addChatMessage({
        id: Date.now(), sender: 'ai',
        content: "Perfect! Now let's add any pre-application screening questions for candidates. These are optional — you can skip to continue.",
        name: 'Talentou Agent', stageIndex: 2,
      });
      completeStage('skillsResponsibilities');
      setCurrentStage(2);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F8F7FF]">
      {/* Header */}
      <div className="px-5 py-4">
        <h2 className="text-base font-medium tracking-tight text-gray-900">Position Details</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Fill in the details for each section</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {/* Completed section banners */}
          {sections.map((section) => {
            if (getSectionStatus(section.id) !== 'completed') return null;
            return (
              <div key={section.id} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-sm font-semibold text-emerald-700">{section.title}</span>
                <span className="ml-auto text-xs text-emerald-600 font-medium">Completed</span>
              </div>
            );
          })}

          {/* Active section — rendered directly */}
          {sections.map((section) => {
            if (getSectionStatus(section.id) !== 'in-progress') return null;
            const Component = section.component;
            return (
              <div key={section.id} className="rounded-2xl bg-white border border-border p-6 shadow-sm">
                <h3 className="text-base font-medium tracking-tight text-gray-800 mb-4">{section.title}</h3>
                <Component />
                {(section.id === 0 || section.id === 1) && (
                  <div className="mt-6 flex flex-col items-center gap-1.5">
                    {isCurrentStageComplete() ? (
                      <Button
                        onClick={handleNextStage}
                        className="px-8 h-11 rounded-full bg-gradient-to-r from-[#7800D3] to-[#5600ad] hover:from-[#6a00bb] hover:to-[#5000a0] text-white font-semibold text-sm border-0"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        {section.id === 0 ? 'Generate Skills & Responsibilities' : 'Next: Screening Questions'}
                      </Button>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {section.id === 0 ? 'Fill in all required fields to continue' : 'Add at least one skill and responsibility to continue'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
