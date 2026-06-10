import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { CompanyUSPPanel } from './panel-stages/CompanyUSPPanel';
import { TalentPoolPanel } from './panel-stages/TalentPoolPanel';
import { TeamInvitationPanel } from './panel-stages/TeamInvitationPanel';
import { SuccessMetricsPanel } from './panel-stages/SuccessMetricsPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Check, CheckCircle2 } from 'lucide-react';

const sections = [
  { id: 0, title: 'Company USP', key: 'companyUSP' as const, component: CompanyUSPPanel },
  { id: 1, title: 'Talent Pool', key: 'talentPool' as const, component: TalentPoolPanel },
  { id: 2, title: 'Team Invitation', key: 'teamInvitation' as const, component: TeamInvitationPanel },
  { id: 3, title: 'Success Metrics', key: 'successMetrics' as const, component: SuccessMetricsPanel },
];

const stageSubtitles = [
  "Define your company's unique selling points",
  'Target the right talent pool and locations',
  'Build your recruiting team',
  'Set your performance benchmarks',
];

const validationHints = [
  'Write at least 50 characters to continue',
  'Select a work mode and add at least one city',
  'Invite at least one team member to continue',
  'Fill in all metric fields to complete your plan',
];

const stageKeys = ['companyUSP', 'talentPool', 'teamInvitation', 'successMetrics'] as const;

export function TAPlanFlowPanel() {
  const navigate = useNavigate();
  const { currentStage, stages, setCurrentStage, completeStage, planData } = useTAPlanFlow();

  const getSectionStatus = (sectionId: number) => {
    const section = sections[sectionId];
    if (stages[section.key].completed) return 'completed';
    if (sectionId === currentStage) return 'in-progress';
    return 'upcoming';
  };

  const isCurrentStageValid = (() => {
    switch (currentStage) {
      case 0: return planData.companyUSP.elevatorPitch.length >= 50;
      case 1: return planData.talentPool.workMode.length > 0 && planData.talentPool.cities.length > 0;
      case 2: return planData.teamInvitations.members.length > 0;
      case 3: {
        const s = planData.successMetrics;
        return s.timeToCloseHigh > 0 && s.timeToCloseMedium > 0 && s.timeToCloseLow > 0
          && s.maxConcurrentPositions > 0 && s.weeklySourceTarget > 0
          && s.interviewAdvancementRate > 0 && s.jdQualityScoreMin > 0;
      }
      default: return false;
    }
  })();

  const handleNext = () => {
    completeStage(stageKeys[currentStage]);
    if (currentStage === 3) navigate('/sales-plan/dashboard');
    else setCurrentStage(currentStage + 1);
  };

  return (
    <div className="h-full flex flex-col bg-[#F8F7FF]">
      {/* Header */}
      <div className="px-5 py-4">
        <h2 className="text-base font-medium tracking-tight text-gray-900">Your Workspace</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{stageSubtitles[currentStage]}</p>
      </div>

      {/* Content */}
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

          {/* Current section — rendered directly */}
          {sections.map((section) => {
            if (getSectionStatus(section.id) !== 'in-progress') return null;
            const Component = section.component;
            return (
              <div key={section.id} className="rounded-2xl bg-white border border-border p-6 shadow-sm">
                <h3 className="text-base font-medium tracking-tight text-gray-800 mb-4">{section.title}</h3>
                <Component />
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Pinned Next button */}
      <div className="px-6 py-4 bg-[#F8F7FF] flex flex-col items-center gap-1.5">
        {isCurrentStageValid ? (
          <Button
            onClick={handleNext}
            className="px-8 h-11 rounded-full bg-gradient-to-r from-[#7800D3] to-[#5600ad] hover:from-[#6a00bb] hover:to-[#5000a0] text-white font-semibold text-sm border-0"
          >
            <Check className="h-4 w-4 mr-2" />
            {currentStage === 3 ? 'Finish Plan' : 'Next'}
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">{validationHints[currentStage]}</p>
        )}
      </div>
    </div>
  );
}
