import React from 'react';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { RecruiterOption } from '@/context/PositionApprovalContext';

interface RecruiterSelectorProps {
  recruiters: RecruiterOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function bandwidthColor(pct: number) {
  if (pct < 60) return '#3B6D11';
  if (pct <= 85) return '#854F0B';
  return '#A32D2D';
}

export function RecruiterSelector({ recruiters, selectedId, onSelect }: RecruiterSelectorProps) {
  return (
    <div className="space-y-[5px]">
      <span className="text-[10px] text-muted-foreground">Select recruiter</span>

      {recruiters.map((rec) => {
        const isSelected = rec.id === selectedId;
        return (
          <div
            key={rec.id}
            onClick={() => onSelect(rec.id)}
            className={cn(
              'flex items-start gap-2 p-[7px_10px] border rounded-lg cursor-pointer transition-colors',
              isSelected ? 'border-primary bg-[#EEEDFE]' : 'border-border hover:bg-muted'
            )}
          >
            {/* Selection dot */}
            <div className={cn(
              'mt-[3px] w-[7px] h-[7px] rounded-full shrink-0 border',
              isSelected ? 'bg-primary border-primary' : 'border-border'
            )} />

            {/* Avatar */}
            <div className={cn(
              'w-6 h-6 rounded-full shrink-0 flex items-center justify-center font-sora text-[10px] font-semibold',
              isSelected ? 'bg-primary text-white' : 'bg-[#EEEDFE] text-[#3C3489]'
            )}>
              {rec.initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-medium text-foreground">{rec.name}</span>
                {rec.aiPick && (
                  <span className="text-[9px] bg-[#0e0020] text-[#c084fc] rounded-full px-[5px] py-px shrink-0">
                    ✦ AI pick
                  </span>
                )}
              </div>
              <div className="text-[10px] text-muted-foreground">{rec.title}</div>
              <div
                className="text-[10px] font-medium mt-0.5"
                style={{ color: bandwidthColor(rec.bandwidthPct) }}
              >
                {rec.bandwidthPct}% bandwidth · {rec.closedRoles}
              </div>
            </div>
          </div>
        );
      })}

      {/* Invite row */}
      <div
        onClick={() => toast.success("Invite sent — they'll appear here once they accept.")}
        className="flex items-center gap-2 p-[7px_10px] border border-dashed border-border rounded-lg text-primary text-[11px] cursor-pointer hover:bg-primary/5 transition-colors"
      >
        <UserPlus className="h-3.5 w-3.5 shrink-0" />
        Invite a new recruiter by email
      </div>
    </div>
  );
}

export default RecruiterSelector;
