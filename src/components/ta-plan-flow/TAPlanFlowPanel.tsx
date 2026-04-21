import React from 'react';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { CompanyUSPPanel } from './panel-stages/CompanyUSPPanel';
import { TalentPoolPanel } from './panel-stages/TalentPoolPanel';
import { RecruitmentChannelsPanel } from './panel-stages/RecruitmentChannelsPanel';
import { TeamInvitationPanel } from './panel-stages/TeamInvitationPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check } from 'lucide-react';

const sections = [
  { id: 0, title: 'Company USP', key: 'companyUSP' as const, component: CompanyUSPPanel },
  { id: 1, title: 'Talent Pool', key: 'talentPool' as const, component: TalentPoolPanel },
  { id: 2, title: 'Team Invitation', key: 'teamInvitation' as const, component: TeamInvitationPanel },
  { id: 3, title: 'Recruitment Channels', key: 'recruitmentChannels' as const, component: RecruitmentChannelsPanel },
  { id: 4, title: 'Success Metrics', key: 'successMetrics' as const, component: () => <div>Coming Soon</div> },
];

export function TAPlanFlowPanel() {
  const { currentStage, stages, setCurrentStage, getSectionScore } = useTAPlanFlow();

  const getSectionStatus = (sectionId: number) => {
    const section = sections[sectionId];
    if (stages[section.key].completed) return 'completed';
    if (sectionId === currentStage) return 'in-progress';
    if (sectionId >= 3) return 'upcoming'; // Sections 3 & 4 are coming soon
    return 'upcoming';
  };

  const getScoreColor = (score: number) => {
    if (score < 40) return {
      text: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-300'
    };
    if (score < 70) return {
      text: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-300'
    };
    return {
      text: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-300'
    };
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - aligned with other panels */}
      <div className="p-6 border-b border-[#7800D3]/15">
        <h2 className="text-xl font-bold text-[#6474a9]">TA Plan Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Fill in the details for each section</p>
      </div>

      {/* Accordion Sections */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <Accordion
            type="single"
            collapsible
            value={`section-${currentStage}`}
            onValueChange={(value) => {
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
              const showScore = section.id < 2; // Only sections 0 & 1 show scores
              const score = showScore ? getSectionScore(section.key as 'companyUSP' | 'talentPool' | 'recruitmentChannels') : 0;

              // Don't render upcoming sections as accordions
              if (status === 'upcoming') return null;

              const Component = section.component;

              return (
                <AccordionItem
                  key={section.id}
                  value={`section-${section.id}`}
                  className={`
                    border-2 rounded-lg overflow-hidden transition-all bg-gradient-to-r from-[#faf5ff] to-white
                    ${status === 'in-progress' ? 'border-[#7800D3]/30 shadow-sm' : 'border-transparent'}
                  `}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-[#6474a9]">
                          {section.title}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
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
