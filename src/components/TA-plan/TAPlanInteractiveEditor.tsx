import React from 'react';
import { FileDown, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTAPlan } from '@/context/TAPlanContext';
import { CompanyUSPSection } from './sections/CompanyUSPSection';
import { TalentPoolSection } from './sections/TalentPoolSection';
import { ChannelsSection } from './sections/ChannelsSection';
import { MetricsSection } from './sections/MetricsSection';
import { TeamMembersSection } from './sections/TeamMembersSection';

export function TAPlanInteractiveEditor() {
  const { stages, currentStage } = useTAPlan();

  const handleExportPlan = () => {
    console.log('Exporting plan as PDF...');
    // TODO: Implement PDF export
  };

  return (
    <div className="w-[600px] h-full bg-gradient-to-br from-background via-background to-accent/5 border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-foreground">Your TA Plan</h2>
          <CheckCircle2 className="w-5 h-5 text-[#58bb6b]" />
        </div>
        <p className="text-sm text-muted-foreground">Your Personalized TA Plan - Powered by AI, Perfected by You.</p>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Company USP */}
        {stages.companyUSP.completed && (
          <div className="animate-fade-in border-2 border-[#58bb6b]/30 rounded-lg">
            <CompanyUSPSection />
          </div>
        )}

        {/* Talent Pool */}
        {stages.talentPool.completed && (
          <div className="animate-fade-in border-2 border-[#58bb6b]/30 rounded-lg">
            <TalentPoolSection />
          </div>
        )}

        {/* Recruitment Channels */}
        {stages.recruitmentChannels.completed && (
          <div className="animate-fade-in border-2 border-[#58bb6b]/30 rounded-lg">
            <ChannelsSection />
          </div>
        )}

        {/* Success Metrics */}
        {stages.successMetrics.completed && (
          <div className="animate-fade-in border-2 border-[#58bb6b]/30 rounded-lg">
            <MetricsSection />
          </div>
        )}

        {/* Team Members */}
        {stages.teamInvitation.completed && (
          <div className="animate-fade-in border-2 border-[#58bb6b]/30 rounded-lg">
            <TeamMembersSection />
          </div>
        )}
      </div>

      {/* Export Button */}
      <div className="p-6 border-t border-border bg-background/80 backdrop-blur-sm">
        <Button 
          onClick={handleExportPlan}
          className="w-full bg-[#58bb6b] hover:bg-[#4aa75c] text-white"
        >
          <FileDown className="w-4 h-4 mr-2" />
          Export Plan as PDF
        </Button>
      </div>
    </div>
  );
}
