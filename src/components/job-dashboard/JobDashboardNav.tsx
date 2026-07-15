import React, { useLayoutEffect, useRef, useState } from 'react';
import { ClipboardList, Radio, TrendingUp, RotateCw, Zap, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RoleType } from '@/components/shared/ModernJobList';
import { useRecruitmentPlan, ZoneKey } from '@/context/RecruitmentPlanContext';

interface JobDashboardNavProps {
  role: RoleType;
}

const NAV_ITEMS: { key: ZoneKey; label: string; icon: LucideIcon }[] = [
  { key: 'plan', label: 'Recruitment plan', icon: ClipboardList },
  { key: 'sourcing', label: 'Sourcing performance', icon: Radio },
  { key: 'pace', label: 'Pace tracker', icon: TrendingUp },
  { key: 'resurfaced', label: 'Resurfaced candidates', icon: RotateCw },
  { key: 'activity', label: 'AI activity feed', icon: Zap },
];

export function JobDashboardNav({ role }: JobDashboardNavProps) {
  const { activeZone, setActiveZone } = useRecruitmentPlan();
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const items = NAV_ITEMS.filter((item) => {
    if (role === 'hiring-lead' && (item.key === 'resurfaced' || item.key === 'activity')) return false;
    return true;
  });

  useLayoutEffect(() => {
    const activeEl = tabRefs.current.get(activeZone);
    if (activeEl) {
      setIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    }
  }, [activeZone, items.length]);

  return (
    <div data-tour-id="jd-tab-bar" role="tablist" aria-label="Job dashboard sections" className="relative flex items-center gap-1 border-b border-border px-1 overflow-x-auto">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeZone === item.key;

        return (
          <button
            key={item.key}
            ref={(el) => {
              if (el) tabRefs.current.set(item.key, el);
              else tabRefs.current.delete(item.key);
            }}
            role="tab"
            id={`tab-${item.key}`}
            aria-selected={isActive}
            aria-controls={`panel-${item.key}`}
            onClick={() => setActiveZone(item.key)}
            className={cn(
              'flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-[12.5px] font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-t-sm',
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </button>
        );
      })}
      <div
        className="absolute bottom-0 h-0.5 bg-primary transition-all duration-200 ease-out"
        style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
      />
    </div>
  );
}

export default JobDashboardNav;
