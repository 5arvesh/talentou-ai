import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ClipboardList,
  Filter,
  Radio,
  TrendingUp,
  RotateCw,
  Zap,
  MapPin,
  UserCheck,
  User,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
  MoreVertical,
  LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RoleType } from '@/components/shared/ModernJobList';
import { useRecruitmentPlan, ZoneKey, StatusPill } from '@/context/RecruitmentPlanContext';

interface JobDashboardNavProps {
  jobId: string;
  role: RoleType;
}

const NAV_ITEMS: { key: ZoneKey; label: string; icon: LucideIcon; group: number }[] = [
  { key: 'today', label: "Today's focus", icon: Sparkles, group: 0 },
  { key: 'plan', label: 'Recruitment plan', icon: ClipboardList, group: 1 },
  { key: 'funnel', label: 'Pipeline funnel', icon: Filter, group: 2 },
  { key: 'sourcing', label: 'Sourcing performance', icon: Radio, group: 2 },
  { key: 'pace', label: 'Pace tracker', icon: TrendingUp, group: 2 },
  { key: 'resurfaced', label: 'Resurfaced candidates', icon: RotateCw, group: 3 },
  { key: 'activity', label: 'AI activity feed', icon: Zap, group: 3 },
];

const STATUS_PILL_CONFIG: Record<StatusPill, { label: string; className: string; icon: LucideIcon }> = {
  on_track: { label: 'On track', className: 'bg-success/10 text-success', icon: CheckCircle2 },
  at_risk: { label: 'At risk', className: 'bg-warning/10 text-warning', icon: AlertTriangle },
  critical: { label: 'Critical', className: 'bg-destructive/10 text-destructive', icon: AlertCircle },
};

function basePathForRole(role: RoleType) {
  return role === 'ta-leader' ? '/sales-plan' : role === 'recruiter' ? '/ta-associate' : '/hiring-lead';
}

export function JobDashboardNav({ jobId, role }: JobDashboardNavProps) {
  const navigate = useNavigate();
  const { data, activeZone, setActiveZone } = useRecruitmentPlan();

  const statusConfig = STATUS_PILL_CONFIG[data.statusPill];
  const StatusIcon = statusConfig.icon;
  const RecruiterIcon = data.recruiter.assignedByAI ? UserCheck : User;

  const items = NAV_ITEMS.filter((item) => {
    if (role === 'hiring-lead' && (item.key === 'resurfaced' || item.key === 'activity')) return false;
    return true;
  });

  const goToPipeline = () => {
    navigate(`${basePathForRole(role)}/jobs/${jobId}/pipeline`);
  };

  return (
    <div className="h-full flex flex-col w-[340px] flex-shrink-0 border-r border-border">
      <div className="border-b border-border p-3.5 space-y-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {data.approvalMethod === 'auto' ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0e0020] text-[#c084fc] text-[10px] font-medium">
              <Sparkles className="h-3 w-3" />
              AI-handled
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-medium">
              <CheckCircle2 className="h-3 w-3" />
              Manually approved
            </span>
          )}
          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium', statusConfig.className)}>
            <StatusIcon className="h-3 w-3" />
            {statusConfig.label}
          </span>
        </div>

        <h2 className="font-sora text-[15px] font-semibold text-foreground leading-tight">{data.jobTitle}</h2>

        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {data.location}
          </span>
          <span>Day {data.dayOfPlan} of {data.totalDays}</span>
          <span className="inline-flex items-center gap-1">
            <RecruiterIcon className="h-3 w-3" />
            {data.recruiter.name}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button
            size="sm"
            className="bg-primary text-white hover:bg-primary/90 h-8 text-[11px] gap-1.5 flex-1"
            onClick={goToPipeline}
          >
            Go to pipeline
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" disabled>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {items.map((item, index) => {
          const prevGroup = index > 0 ? items[index - 1].group : item.group;
          const showSeparator = index > 0 && item.group !== prevGroup;
          const Icon = item.icon;
          const isActive = activeZone === item.key;

          return (
            <React.Fragment key={item.key}>
              {showSeparator && <div className="border-t border-border my-1" />}
              <button
                onClick={() => setActiveZone(item.key)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-btn text-[12.5px] text-left transition-colors',
                  isActive ? 'bg-[#EEEDFE] text-[#3C3489] font-medium' : 'text-muted-foreground hover:bg-muted/60'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}

export default JobDashboardNav;
