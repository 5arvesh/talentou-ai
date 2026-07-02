import React, { useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePositionApproval } from '@/context/PositionApprovalContext';
import type { SectionKey } from '@/context/PositionApprovalContext';
import { CompanyUSPSection } from './CompanyUSPSection';
import { TalentPoolSection } from './TalentPoolSection';
import { ChannelListSection } from './ChannelListSection';
import { RecruiterPlanSection } from './RecruiterPlanSection';
import { TargetsSection } from './TargetsSection';

const SECTION_LABELS: Record<SectionKey, string> = {
  usp: 'Company pitch',
  talentPool: 'Talent pool',
  channels: 'Channels',
  recruiter: 'Recruiter & plan',
  targets: 'Targets',
};

export function RecruitmentBrief() {
  const navigate = useNavigate();
  const { viewState, brief, selected, editSourceMap, appliedPlaybookName, discardEditMode, confirmSend } = usePositionApproval();
  const [jdOpen, setJdOpen] = useState(false);

  if (viewState === 'approved' && brief && selected?.position) {
    return (
      <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 bg-muted/10 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 text-center max-w-xs w-full animate-in fade-in slide-in-from-bottom-1">
            <CheckCircle2 className="h-5 w-5 text-success mx-auto" />
            <p className="font-sora text-[13px] font-semibold text-foreground mt-2">Plan sent ✓</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Sent to {brief.recruiter.name} for {selected.position.jobTitle}
            </p>
            <button
              onClick={() => navigate(`/sales-plan/jobs/${brief.relatedJobId}/dashboard`)}
              className="mt-4 bg-primary text-white rounded-md px-3 py-1.5 text-[11px] font-medium inline-flex items-center gap-1.5 hover:bg-primary/90 transition-colors"
            >
              View job dashboard
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const editedKeys = (Object.keys(editSourceMap) as SectionKey[]).filter((k) => !!editSourceMap[k]);

  return (
    <div className="flex-1 min-w-0 flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-2 duration-300 ease-out motion-reduce:animate-none">
      {/* Sticky header */}
      <div className="shrink-0 border-b border-border bg-background px-4 py-2.5 flex items-center justify-between">
        <div>
          <p className="font-sora text-[13px] font-medium text-foreground">Recruitment brief</p>
          <p className="text-[10px] text-muted-foreground">AI-generated · click the pencil to edit any section</p>
        </div>
        {editedKeys.length > 0 && (
          <div className="flex items-center gap-1.5">
            {editedKeys.map((key) => (
              <span
                key={key}
                className="w-[5px] h-[5px] rounded-full bg-[#639922] block"
                title={`${SECTION_LABELS[key]} edited`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-4 bg-muted/10">
        <div className="w-full">
          {/* Context banner */}
          <div className="bg-[#EEEDFE] rounded-md p-[7px_10px] mb-3 flex items-start gap-[7px] animate-in fade-in slide-in-from-bottom-1">
            <Sparkles className="h-[13px] w-[13px] text-primary shrink-0 mt-px" />
            <p className="text-[11px] text-[#3C3489] leading-[1.45]">
              {appliedPlaybookName
                ? <>Started from Playbook: <span className="font-semibold">{appliedPlaybookName}</span> — review and adjust what's different.</>
                : 'Chat or edit directly — changes from either show up here in real time.'}
            </p>
          </div>

          {/* 2-column brief grid */}
          <div className="grid grid-cols-2 gap-3 items-start res-1200:grid-cols-1">
            <CompanyUSPSection />
            <TalentPoolSection />
            <ChannelListSection />
            <RecruiterPlanSection />
            <div className="col-span-2 res-1200:col-span-1">
              <TargetsSection />
            </div>
          </div>
        </div>
      </div>

      {/* Edit-mode footer */}
      {viewState === 'edit' && (
        <div className="shrink-0 border-t border-border px-4 py-3 flex items-center gap-2 bg-background">
          <button
            onClick={() => setJdOpen(true)}
            className="inline-flex items-center gap-1 border border-border text-[11px] text-muted-foreground rounded-[9px] px-4 py-[9px] hover:bg-muted transition-colors"
          >
            View JD
          </button>
          <button
            onClick={discardEditMode}
            className="inline-flex items-center gap-1 border text-[11px] rounded-[9px] px-4 py-[9px] text-[#A32D2D] border-[rgba(163,45,45,0.2)] hover:bg-red-50 transition-colors"
          >
            <X className="h-3 w-3" />
            Discard
          </button>
          <button
            onClick={confirmSend}
            className="ml-auto inline-flex items-center gap-1.5 bg-[#7800D3] text-white text-[11px] font-medium rounded-[9px] px-4 py-[9px] hover:opacity-90 transition-opacity"
          >
            <Check className="h-3 w-3" />
            Approve recruitment plan
          </button>
        </div>
      )}

      {/* JD Dialog */}
      {selected?.position && (
        <Dialog open={jdOpen} onOpenChange={setJdOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selected.position.jobTitle} — Job Description</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto whitespace-pre-line text-[12.5px] leading-relaxed text-foreground/90">
              {selected.position.jdFull}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default RecruitmentBrief;
