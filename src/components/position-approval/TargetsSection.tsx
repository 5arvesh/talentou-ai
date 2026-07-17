import React from 'react';
import { Check, Info, Sparkles, Target } from 'lucide-react';
import { BriefSection } from './BriefSection';
import { DatePickerSplit, DEFAULT_QUICK_OPTIONS } from './DatePickerSplit';
import { usePositionApproval } from '@/context/PositionApprovalContext';

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function formatCloseDate(days: number): string {
  const d = addDays(new Date(), days);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function TargetsSection({ bare }: { bare?: boolean }) {
  const {
    brief, editSourceMap, editingSection,
    editCloseDays, editDailySourcing,
    setEditCloseDays, setEditDailySourcing,
    startEditing, saveEdit, cancelEdit,
  } = usePositionApproval();

  if (!brief) return null;

  const { targets } = brief;
  const isEditing = editingSection === 'targets';
  const src = editSourceMap['targets'];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const closeDate = addDays(today, editCloseDays);
  const aiDate = addDays(today, targets.closeDays);

  return (
    <BriefSection
      bare={bare}
      eyebrowIcon={Target}
      eyebrow="Targets"
      isEdited={!!src}
      editSource={src}
      editMode={isEditing}
      onEdit={() => startEditing('targets')}
      onSave={saveEdit}
      onCancel={cancelEdit}
      animationDelay={240}
      editContent={
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Left — date picker */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">Close date</span>
                <span className="bg-[#0e0020] text-[#c084fc] rounded-full text-[9px] px-[5px] py-px">
                  ✦ AI: {formatCloseDate(targets.closeDays)}
                </span>
              </div>
              <DatePickerSplit
                value={closeDate}
                aiSuggestedDate={aiDate}
                onChange={(d) => {
                  const diff = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  setEditCloseDays(diff);
                }}
                quickOptions={DEFAULT_QUICK_OPTIONS}
              />
            </div>

            {/* Right — stepper */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">Daily sourcing</span>
                <span className="bg-[#0e0020] text-[#c084fc] rounded-full text-[9px] px-[5px] py-px">
                  ✦ AI: {targets.dailySourcingGoal}/day
                </span>
              </div>
              <div className="border border-border rounded-lg p-3 flex flex-col items-center gap-2 bg-background">
                <p className="font-sora text-2xl font-semibold text-foreground">{editDailySourcing}</p>
                <p className="text-[9px] text-muted-foreground">candidates/day</p>
                <div className="flex items-center gap-[10px] mt-1">
                  <button
                    onClick={() => setEditDailySourcing(Math.max(1, editDailySourcing - 1))}
                    className="w-7 h-7 rounded-full border border-primary/30 text-primary text-base flex items-center justify-center hover:bg-primary/6 transition-colors"
                  >
                    −
                  </button>
                  <button
                    onClick={() => setEditDailySourcing(Math.min(20, editDailySourcing + 1))}
                    className="w-7 h-7 rounded-full border border-primary/30 text-primary text-base flex items-center justify-center hover:bg-primary/6 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Confidence note */}
          <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <Check className="h-3 w-3 text-success" />
              {targets.confidence}% confidence · based on 4 past React hires
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-primary" />
              Recruiter can request target changes after reviewing
            </div>
          </div>
        </div>
      }
    >
      <div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-background border border-border rounded-md p-3">
            <p className="font-sora text-lg font-semibold text-foreground">{formatCloseDate(targets.closeDays)}</p>
            <p className="text-xs text-muted-foreground mt-1">Close date</p>
            <span className="mt-1.5 inline-block bg-[#0e0020] text-[#c084fc] rounded-full text-[10px] px-2 py-0.5">
              ✦ {targets.confidence}% conf
            </span>
          </div>
          <div className="bg-background border border-border rounded-md p-3">
            <p className="font-sora text-lg font-semibold text-foreground">{targets.dailySourcingGoal}/day</p>
            <p className="text-xs text-muted-foreground mt-1">Daily goal</p>
            <span className="mt-1.5 inline-block bg-[#0e0020] text-[#c084fc] rounded-full text-[10px] px-2 py-0.5">
              ✦ AI suggest
            </span>
          </div>
        </div>

        <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>
            {targets.confidence}% confidence — based on 4 past React hires. Recruiter can request changes after reviewing.
          </span>
        </div>
      </div>
    </BriefSection>
  );
}

export default TargetsSection;
