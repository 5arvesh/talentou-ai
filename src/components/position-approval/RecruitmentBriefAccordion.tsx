import React, { useEffect, useRef, useState } from 'react';
import {
  Building2, ChevronDown, ChevronUp, Flag, Info, MessageCircle, Pencil, Radio, Target, UserCheck, Users, LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePositionApproval, PriorityLevel, SectionKey } from '@/context/PositionApprovalContext';
import { CompanyUSPSection } from './CompanyUSPSection';
import { TalentPoolSection } from './TalentPoolSection';
import { ChannelListSection } from './ChannelListSection';
import { RecruiterPlanSection } from './RecruiterPlanSection';
import { TargetsSection } from './TargetsSection';

type RowKey = SectionKey;

const ROW_LABELS: Record<RowKey, string> = {
  priority: 'Priority',
  usp: 'Company pitch',
  talentPool: 'Talent pool',
  channels: 'Recruitment channels',
  recruiter: 'Assigned recruiter and plan',
  targets: 'Targets',
};

const ROW_ICONS: Record<RowKey, LucideIcon> = {
  priority: Flag,
  usp: Building2,
  talentPool: Users,
  channels: Radio,
  recruiter: UserCheck,
  targets: Target,
};

const PRIORITY_LEVELS: PriorityLevel[] = ['Low', 'Medium', 'High', 'Urgent'];

function priorityButtonClass(level: PriorityLevel, selected: boolean) {
  if (!selected) return 'bg-card text-foreground/70 border-border';
  if (level === 'Low') return 'bg-muted border-border text-foreground font-medium';
  if (level === 'Urgent') return 'bg-[#FCEBEB] border-[#F09595] text-[#A32D2D] font-medium';
  if (level === 'High') return 'bg-[#FAEEDA] border-[#EF9F27] text-[#854F0B] font-semibold';
  return 'bg-[#FAEEDA] border-[#EF9F27] text-[#854F0B] font-medium';
}

function formatCloseDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

interface AccordionRowProps {
  rowKey: RowKey;
  preview?: string;
  isChatEdited: boolean;
  isExpanded: boolean;
  isFlashing: boolean;
  onToggle: () => void;
  onEditClick?: () => void;
  children: React.ReactNode;
}

function AccordionRow({ rowKey, preview, isChatEdited, isExpanded, isFlashing, onToggle, onEditClick, children }: AccordionRowProps) {
  const Icon = ROW_ICONS[rowKey];
  return (
    <div className="border-b border-border last:border-b-0 last:flex-1">
      <div
        onClick={onToggle}
        className={cn(
          'flex items-center gap-2 px-4 py-3 cursor-pointer transition-colors',
          isExpanded ? 'bg-muted/40' : isFlashing ? 'bg-[#EEEDFE]' : 'hover:bg-muted/20'
        )}
      >
        <Icon className="h-4 w-4 text-[#534AB7] shrink-0" />
        <span className="text-[13px] font-medium text-foreground">{ROW_LABELS[rowKey]}</span>
        {isChatEdited && (
          <span className="inline-flex items-center gap-[3px] text-[11px] text-[#534AB7] bg-[#EEEDFE] px-[6px] py-px rounded">
            <MessageCircle className="h-2.5 w-2.5" />
            Updated via chat
          </span>
        )}
        <span className="flex-1" />
        {!isExpanded && preview && (
          <span className="text-[12px] text-foreground/70 truncate max-w-[160px]">{preview}</span>
        )}
        {onEditClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditClick();
            }}
            className="text-muted-foreground hover:text-primary transition-colors shrink-0"
            aria-label={`Edit ${ROW_LABELS[rowKey]}`}
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
        {isExpanded ? (
          <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        )}
      </div>
      {isExpanded && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export function RecruitmentBriefAccordion() {
  const { brief, editSourceMap, highlightSection, startEditing, setPriority } = usePositionApproval();
  const [expandedRow, setExpandedRow] = useState<RowKey | null>('priority');
  const [flashRow, setFlashRow] = useState<RowKey | null>(null);
  const lastHandledNonce = useRef<number | null>(null);

  useEffect(() => {
    if (!highlightSection) return;
    if (lastHandledNonce.current === highlightSection.nonce) return;
    lastHandledNonce.current = highlightSection.nonce;

    const section = highlightSection.section;
    setExpandedRow(section);
    setFlashRow(section);
    const flashTimer = setTimeout(() => setFlashRow(null), 300);
    return () => clearTimeout(flashTimer);
  }, [highlightSection]);

  if (!brief) return null;

  const toggle = (key: RowKey) => setExpandedRow((cur) => (cur === key ? null : key));

  return (
    <div className="w-full max-w-[480px] flex-1 min-h-0 flex flex-col bg-card border-[0.5px] border-border rounded-xl overflow-hidden">
      <div className="shrink-0 px-4 py-3 border-b border-border flex items-center gap-2 flex-wrap">
        <p className="text-[15px] font-medium text-foreground">Recruitment brief</p>
        <span className="text-[12px] text-[#534AB7] bg-[#EEEDFE] rounded px-2 py-0.5">AI-generated</span>
        <span className="text-[12px] text-muted-foreground ml-auto">Click the pencil to edit any section</span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        <AccordionRow
          rowKey="priority"
          preview={brief.priority}
          isChatEdited={editSourceMap.priority === 'chat'}
          isExpanded={expandedRow === 'priority'}
          isFlashing={flashRow === 'priority'}
          onToggle={() => toggle('priority')}
        >
          <div className="flex gap-2">
            {PRIORITY_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setPriority(level)}
                className={cn(
                  'flex-1 p-2.5 rounded-lg border-[0.5px] text-center cursor-pointer text-[12px] transition-colors',
                  priorityButtonClass(level, brief.priority === level)
                )}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-2 text-[12px] text-muted-foreground">
            <Info className="h-3 w-3 shrink-0" />
            Sets recruiter's bandwidth allocation for this role.
          </div>
        </AccordionRow>

        <AccordionRow
          rowKey="usp"
          isChatEdited={editSourceMap.usp === 'chat'}
          isExpanded={expandedRow === 'usp'}
          isFlashing={flashRow === 'usp'}
          onToggle={() => toggle('usp')}
          onEditClick={() => {
            setExpandedRow('usp');
            startEditing('usp');
          }}
        >
          <CompanyUSPSection bare />
        </AccordionRow>

        <AccordionRow
          rowKey="talentPool"
          isChatEdited={editSourceMap.talentPool === 'chat'}
          isExpanded={expandedRow === 'talentPool'}
          isFlashing={flashRow === 'talentPool'}
          onToggle={() => toggle('talentPool')}
          onEditClick={() => {
            setExpandedRow('talentPool');
            startEditing('talentPool');
          }}
        >
          <TalentPoolSection bare />
        </AccordionRow>

        <AccordionRow
          rowKey="channels"
          isChatEdited={editSourceMap.channels === 'chat'}
          isExpanded={expandedRow === 'channels'}
          isFlashing={flashRow === 'channels'}
          onToggle={() => toggle('channels')}
          onEditClick={() => {
            setExpandedRow('channels');
            startEditing('channels');
          }}
        >
          <ChannelListSection bare />
        </AccordionRow>

        <AccordionRow
          rowKey="recruiter"
          preview={brief.recruiter.name}
          isChatEdited={editSourceMap.recruiter === 'chat'}
          isExpanded={expandedRow === 'recruiter'}
          isFlashing={flashRow === 'recruiter'}
          onToggle={() => toggle('recruiter')}
          onEditClick={() => {
            setExpandedRow('recruiter');
            startEditing('recruiter');
          }}
        >
          <RecruiterPlanSection bare />
        </AccordionRow>

        <AccordionRow
          rowKey="targets"
          preview={`${formatCloseDate(brief.targets.closeDays)} · ${brief.targets.dailySourcingGoal}/day`}
          isChatEdited={editSourceMap.targets === 'chat'}
          isExpanded={expandedRow === 'targets'}
          isFlashing={flashRow === 'targets'}
          onToggle={() => toggle('targets')}
          onEditClick={() => {
            setExpandedRow('targets');
            startEditing('targets');
          }}
        >
          <TargetsSection bare />
        </AccordionRow>
      </div>
    </div>
  );
}

export default RecruitmentBriefAccordion;
