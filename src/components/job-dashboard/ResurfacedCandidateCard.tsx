import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { getInitials, getAvatarColor } from '@/lib/avatar';
import { RoleType } from '@/components/shared/ModernJobList';
import { ResurfacedCandidate } from '@/context/RecruitmentPlanContext';

function basePathForRole(role: RoleType) {
  return role === 'ta-leader' ? '/sales-plan' : role === 'recruiter' ? '/ta-associate' : '/hiring-lead';
}

interface ResurfacedCandidateCardProps {
  candidate: ResurfacedCandidate;
  role: RoleType;
}

export function ResurfacedCandidateCard({ candidate, role }: ResurfacedCandidateCardProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-card border border-border bg-card p-3 shadow-card">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'h-9 w-9 rounded-full flex items-center justify-center text-white font-sora text-[12px] font-semibold bg-gradient-to-br shrink-0',
            getAvatarColor(candidate.name)
          )}
        >
          {getInitials(candidate.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-sora text-[13px] font-semibold text-foreground truncate">{candidate.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">{candidate.title}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="font-sora text-[12px] font-semibold text-foreground">{candidate.fitScore}%</span>
          <div className="w-12 h-1 rounded-full bg-muted overflow-hidden">
            <div
              className={cn('h-full rounded-full', candidate.fitScore >= 80 ? 'bg-success' : 'bg-warning')}
              style={{ width: `${candidate.fitScore}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground mt-2">
        Applied for: {candidate.appliedFor} · {candidate.appliedDate}
      </p>

      <div className="flex items-start gap-1.5 mt-2 rounded-btn bg-[#EEEDFE] text-[#3C3489] text-[10px] p-1.5">
        <Sparkles className="h-3 w-3 mt-0.5 shrink-0" />
        <span>{candidate.aiNote}</span>
      </div>

      <div className="flex items-start gap-1.5 mt-1.5 rounded-btn bg-info/10 text-info text-[10px] p-1.5">
        <Info className="h-3 w-3 mt-0.5 shrink-0" />
        <span>Last contact {candidate.lastContactDays} days ago — consider re-consent before outreach.</span>
      </div>

      <div className="flex gap-2 mt-2.5">
        <Button
          variant="outline"
          size="sm"
          className="h-9 text-[10px]"
          onClick={() => navigate(`${basePathForRole(role)}/candidate-profile/${candidate.id}`)}
        >
          View profile
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" disabled className="h-9 text-[10px] opacity-50 cursor-not-allowed">
                Reach out
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Outreach integration coming soon</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ResurfacedCandidateCard;
