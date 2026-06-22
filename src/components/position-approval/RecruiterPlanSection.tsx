import React from 'react';
import { Info, List, Sparkles, UserCheck } from 'lucide-react';
import { BriefSection } from './BriefSection';
import { RecruiterSelector } from './RecruiterSelector';
import { PlanStepEditor } from './PlanStepEditor';
import { usePositionApproval, RECRUITER_LIST } from '@/context/PositionApprovalContext';

function bandwidthColor(pct: number) {
  if (pct < 60) return '#639922';
  if (pct <= 85) return '#BA7517';
  return '#E24B4A';
}

export function RecruiterPlanSection() {
  const {
    brief, editSourceMap, editingSection,
    recruiterList,
    editSelectedRecruiterId, editPlanSteps, editingPlanStepIndex, editPlanStepDraft,
    selectRecruiter, startEditingPlanStep, savePlanStep, cancelPlanStepEdit, setPlanStepDraft,
    addPlanStep, removePlanStep,
    startEditing, saveEdit, cancelEdit,
  } = usePositionApproval();

  if (!brief) return null;

  const { recruiter } = brief;
  const isEditing = editingSection === 'recruiter';
  const bwColor = bandwidthColor(recruiter.bandwidthPct);
  const src = editSourceMap['recruiter'];

  const recruiterChanged = editSelectedRecruiterId && editSelectedRecruiterId !== brief.recruiter.id;
  const changedRecruiterName = recruiterList.find((r) => r.id === editSelectedRecruiterId)?.name;

  return (
    <BriefSection
      eyebrowIcon={UserCheck}
      eyebrow="Assigned recruiter & plan"
      editLabel="Reassign"
      isEdited={!!src}
      editSource={src}
      editMode={isEditing}
      onEdit={() => startEditing('recruiter')}
      onSave={saveEdit}
      onCancel={cancelEdit}
      animationDelay={180}
      editContent={
        <div className="space-y-3">
          <RecruiterSelector
            recruiters={recruiterList}
            selectedId={editSelectedRecruiterId || brief.recruiter.id}
            onSelect={selectRecruiter}
          />

          <div className="border-t border-border pt-3">
            {recruiterChanged && changedRecruiterName && (
              <div className="flex items-center gap-1.5 mb-2 text-[10px] text-info">
                <Info className="h-3 w-3 shrink-0" />
                Plan steps updated for {changedRecruiterName} — review before saving.
              </div>
            )}
            <p className="text-[10px] text-muted-foreground mb-2">Edit plan steps</p>
            <PlanStepEditor
              steps={editPlanSteps}
              editingIndex={editingPlanStepIndex}
              draft={editPlanStepDraft}
              onStartEdit={startEditingPlanStep}
              onDraftChange={setPlanStepDraft}
              onSave={savePlanStep}
              onCancel={cancelPlanStepEdit}
              onRemove={removePlanStep}
              onAdd={addPlanStep}
            />
          </div>
        </div>
      }
    >
      <div>
        {/* Recruiter block */}
        <div className="flex gap-2.5 items-start">
          <div className="w-[30px] h-[30px] rounded-full bg-[#EEEDFE] text-[#3C3489] flex items-center justify-center text-[10px] font-semibold font-sora shrink-0">
            {recruiter.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-medium text-foreground">{recruiter.name}</span>
              <span className="text-[10px] text-muted-foreground">· {recruiter.title}</span>
              {recruiter.aiPick && (
                <span className="inline-flex items-center gap-1 bg-[#0e0020] text-[#c084fc] text-[9px] rounded-full px-[5px] py-px">
                  <Sparkles className="h-2 w-2" />
                  AI pick
                </span>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Bangalore · {recruiter.closesCount} React/Node closes · avg {recruiter.avgCloseDays}d
            </p>
          </div>
        </div>

        {/* Bandwidth */}
        <div className="mt-2">
          <div className="h-[3px] rounded-full bg-muted w-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${recruiter.bandwidthPct}%`, backgroundColor: bwColor }}
            />
          </div>
          <p className="text-[9px] mt-0.5" style={{ color: bwColor }}>
            {recruiter.bandwidthPct}% bandwidth · {recruiter.activeReqs} active reqs
          </p>
        </div>

        {/* Other active positions */}
        {recruiter.otherActivePositions.length > 0 && (
          <div className="border-t border-border pt-1.5 mt-2 flex items-start gap-1 text-[10px] text-muted-foreground">
            <List className="h-3 w-3 shrink-0 mt-0.5" />
            <span>Other active: {recruiter.otherActivePositions.join(' · ')}</span>
          </div>
        )}

        {/* Plan steps */}
        <div className="border-t border-border my-2.5" />
        <p className="text-[10px] text-muted-foreground mb-1.5">
          AI's suggested approach for {recruiter.name.split(' ')[0]} — accounting for their active positions
        </p>
        <div className="space-y-2">
          {recruiter.planSteps.map((step, i) => (
            <div key={i} className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-[#EEEDFE] text-[#3C3489] text-[9px] font-semibold font-sora flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-[11px] text-muted-foreground leading-[1.45]">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </BriefSection>
  );
}

export default RecruiterPlanSection;
