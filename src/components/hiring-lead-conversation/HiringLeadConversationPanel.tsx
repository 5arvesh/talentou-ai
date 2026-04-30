import React from 'react';
import { useHiringLeadConversation } from '@/context/HiringLeadConversationContext';
import { JobDetailsForm } from './panel-stages/JobDetailsForm';
import { SkillsResponsibilitiesPanel } from './panel-stages/SkillsResponsibilitiesPanel';
import { ScreeningQuestionsPanel } from './panel-stages/ScreeningQuestionsPanel';
import { InterviewSetupPanel } from './panel-stages/InterviewSetupPanel';
import { JDPreviewPanel } from './panel-stages/JDPreviewPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check } from 'lucide-react';

const sections = [
  { id: 0, title: 'Job Details', key: 'jobDetails' as const, component: JobDetailsForm },
  { id: 1, title: 'Skills & Responsibilities', key: 'skillsResponsibilities' as const, component: SkillsResponsibilitiesPanel },
  { id: 2, title: 'Screening Questions', key: 'screeningSetup' as const, component: ScreeningQuestionsPanel },
  { id: 3, title: 'Interview Setup', key: 'interviewSetup' as const, component: InterviewSetupPanel },
  { id: 4, title: 'View Job Description', key: 'viewJD' as const, component: JDPreviewPanel },
];

export function HiringLeadConversationPanel() {
  const { currentStage, jobDetails, stages, addChatMessage, completeStage, setCurrentStage, updateJobDetails } = useHiringLeadConversation();
  const [openSection, setOpenSection] = React.useState<string>(`section-${currentStage}`);

  // Auto-switch accordion when stage changes
  React.useEffect(() => {
    setOpenSection(`section-${currentStage}`);
  }, [currentStage]);

  const getSectionStatus = (sectionId: number) => {
    const section = sections[sectionId];
    if (stages[section.key].completed) return 'completed';
    if (sectionId === currentStage) return 'in-progress';
    return 'upcoming';
  };

  // Check if all required fields are filled for current stage
  const isCurrentStageComplete = () => {
    switch (currentStage) {
      case 0:
        return jobDetails.title.trim() !== '' &&
               jobDetails.location.trim() !== '' &&
               jobDetails.startDate.trim() !== '' &&
               jobDetails.maxBudget.trim() !== '' &&
               jobDetails.minExperience.trim() !== '' &&
               jobDetails.sampleProfiles.length > 0;
      case 1:
        return jobDetails.keySkills.length > 0 &&
               jobDetails.responsibilities.length > 0;
      case 2: // Screening Questions — optional, always completable
        return true;
      case 3: // Interview Setup — always completable
        return true;
      case 4: // View JD
        return true;
      default:
        return false;
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
          'Participate in code reviews'
        ]
      });
      addChatMessage({
        id: Date.now(),
        sender: 'ai',
        content: "Great! I've generated the required skills, preferred skills, and responsibilities based on your job details. You can review and edit them in the right panel.",
        name: 'Talentou AI',
        stageIndex: 1
      });
      completeStage('jobDetails');
      setCurrentStage(1);
    } else if (currentStage === 1) {
      addChatMessage({
        id: Date.now(),
        sender: 'ai',
        content: "Perfect! Now let's add any pre-application screening questions for candidates. These are optional — you can skip to continue.",
        name: 'Talentou AI',
        stageIndex: 2
      });
      completeStage('skillsResponsibilities');
      setCurrentStage(2);
    } else if (currentStage === 2) {
      addChatMessage({
        id: Date.now(),
        sender: 'ai',
        content: "Got it! Now let's set up the interview — add your preset questions, choose AI assistance, and set the duration.",
        name: 'Talentou AI',
        stageIndex: 3
      });
      completeStage('screeningSetup');
      setCurrentStage(3);
    } else if (currentStage === 3) {
      addChatMessage({
        id: Date.now(),
        sender: 'ai',
        content: "Excellent! I've generated a complete Job Description based on your inputs. Please review it in the panel on the right.",
        name: 'Talentou AI',
        stageIndex: 4
      });
      completeStage('interviewSetup');
      setCurrentStage(4);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - aligned with other panels */}
      <div className="p-6 border-b border-[#7800D3]/15">
        <h2 className="text-xl font-bold text-[#6474a9]">Position Details</h2>
        <p className="text-xs text-muted-foreground mt-1">Fill in the details for each section</p>
      </div>

      {/* Accordion Sections */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <Accordion
            type="single"
            collapsible
            value={openSection}
            onValueChange={(value) => {
              setOpenSection(value);
              if (value) {
                const sectionId = parseInt(value.split('-')[1]);
                if (getSectionStatus(sectionId) !== 'upcoming') {
                  setCurrentStage(sectionId);
                }
              }
            }}
            className="space-y-4"
          >
            {sections.map((section) => {
              const status = getSectionStatus(section.id);
              
              if (status === 'upcoming') return null;

              const Component = section.component;

              return (
                <AccordionItem
                  key={section.id}
                  value={`section-${section.id}`}
                  className={`
                    border-2 rounded-lg overflow-hidden transition-all bg-gradient-to-r from-[#faf5ff] to-white
                    ${status === 'completed' ? 'border-[#4ead3b]/30' : ''}
                    ${status === 'in-progress' ? 'border-[#7800D3]/30 shadow-sm' : 'border-transparent'}
                  `}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      {status === 'completed' && (
                        <div className="w-6 h-6 rounded-full bg-[#4ead3b] flex items-center justify-center">
                          <Check className="h-4 w-4 text-black" />
                        </div>
                      )}
                      <h3
                        className={`
                          text-lg font-bold
                          ${status === 'completed' ? 'text-[#4ead3b]' : 'text-[#6474a9]'}
                        `}
                      >
                        {section.title}
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 bg-white/50">
                    <Component />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}
