import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RoleType } from '@/components/shared/ModernJobList';
import { RecruitmentPlanData, useRecruitmentPlan, ZoneKey } from '@/context/RecruitmentPlanContext';

interface TodaysFocusCardProps {
  role: RoleType;
  variant?: 'full' | 'compact';
}

interface FocusContent {
  text: string;
  cta?: { label: string; zone: ZoneKey };
}

function getFocusContent(data: RecruitmentPlanData, role: RoleType): FocusContent {
  const { pace, targetChangeRequest, targets } = data;

  if (pace.isEscalation) {
    const hasPendingRequest = targetChangeRequest?.status === 'pending';

    if (role === 'ta-leader') {
      return hasPendingRequest
        ? {
            text: `Pace alert: sourcing is behind target. ${targetChangeRequest!.requestedBy} has requested to extend the timeline from ${targetChangeRequest!.currentDays} to ${targetChangeRequest!.proposedDays} days. Review the request to resume pace tracking.`,
            cta: { label: 'Review request', zone: 'plan' },
          }
        : {
            text: `Pace alert: sourcing is behind target. Projected close is ${pace.projectedCloseDate} — ${pace.escalationDaysLate} days later than the ${pace.targetCloseDate} target.`,
            cta: { label: 'Review options', zone: 'pace' },
          };
    }
    if (role === 'recruiter') {
      return hasPendingRequest
        ? {
            text: `Your request to extend the timeline to ${targetChangeRequest!.proposedDays} days is awaiting Recruitment Lead approval. The pace tracker is paused until then.`,
          }
        : {
            text: `You're behind pace — sourcing is at ${Math.round((pace.todayActual / pace.dailyTarget) * 100)}% of today's target. Projected close ${pace.projectedCloseDate}, ${pace.escalationDaysLate} days later than planned.`,
            cta: { label: 'Review options', zone: 'pace' },
          };
    }
    return hasPendingRequest
      ? { text: `A timeline change is under review for this role. The recruitment plan will update once it's approved.` }
      : {
          text: `Pace alert flagged for this role — projected close ${pace.projectedCloseDate} (${pace.escalationDaysLate} days later than planned). The Recruitment Lead is reviewing options.`,
        };
  }

  if (targetChangeRequest?.status === 'pending') {
    if (role === 'ta-leader') {
      return {
        text: `${targetChangeRequest.requestedBy} has requested to extend the timeline from ${targetChangeRequest.currentDays} to ${targetChangeRequest.proposedDays} days. Review the request to resume pace tracking.`,
        cta: { label: 'Review request', zone: 'plan' },
      };
    }
    if (role === 'recruiter') {
      return {
        text: `Your request to extend the timeline to ${targetChangeRequest.proposedDays} days is awaiting Recruitment Lead approval. The pace tracker is paused until then.`,
      };
    }
    return {
      text: `A timeline change is under review for this role. The recruitment plan will update once it's approved.`,
    };
  }

  return {
    text: `Pipeline is healthy — sourcing is on pace for a ${targets.targetCloseDate} close (${pace.todayActual}/${pace.dailyTarget} today). No action needed right now.`,
  };
}

export function TodaysFocusCard({ role, variant = 'full' }: TodaysFocusCardProps) {
  const { data, setActiveZone } = useRecruitmentPlan();
  const [pulsing, setPulsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPulsing(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const content = getFocusContent(data, role);

  return (
    <div
      data-tour-id="jd-todays-focus"
      className={cn(
        'rounded-card p-3.5 bg-gradient-to-br from-[#0e0020] to-[#1a0040] border border-[rgba(192,132,252,0.2)]',
        pulsing && 'animate-focus-pulse'
      )}
    >
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-[#c084fc] font-medium">
        <Sparkles className="h-3 w-3" />
        AI · Today's focus
      </div>
      <p className="mt-2 text-[12px] text-white/85 leading-[1.55]">{content.text}</p>
      {content.cta && (
        <button
          onClick={() => setActiveZone(content.cta!.zone)}
          className="mt-3 px-3 py-1.5 rounded-btn text-[11px] font-medium bg-[rgba(120,0,211,0.6)] border border-[rgba(192,132,252,0.4)] text-[#e9d5ff] hover:bg-[rgba(120,0,211,0.8)] transition-colors animate-review-pulse"
        >
          {content.cta.label}
        </button>
      )}
      {variant === 'full' && (
        <p className="mt-3 text-[10px] text-white/30">Next check-in: Tomorrow · Generated 09:00</p>
      )}
    </div>
  );
}

export default TodaysFocusCard;
