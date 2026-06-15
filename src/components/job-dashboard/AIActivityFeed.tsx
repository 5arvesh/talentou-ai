import React from 'react';
import { Sparkles, ClipboardList, Radio, UserCheck, AlertTriangle, Check, Info, RotateCw, LucideIcon } from 'lucide-react';
import { ActivityIconType, useRecruitmentPlan } from '@/context/RecruitmentPlanContext';

const ICON_MAP: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  clipboard: ClipboardList,
  radio: Radio,
  'user-check': UserCheck,
  'alert-triangle': AlertTriangle,
  check: Check,
  info: Info,
  'rotate-cw': RotateCw,
};

const TYPE_COLOR: Record<ActivityIconType, string> = {
  ai: '#7800D3',
  alert: '#BA7517',
  complete: '#639922',
  info: '#185FA5',
  resurface: '#7800D3',
};

export function AIActivityFeed() {
  const { data } = useRecruitmentPlan();

  return (
    <div className="rounded-card border border-border bg-card p-3.5 shadow-card">
      <p className="text-[11px] font-medium text-muted-foreground mb-1">AI actions & suggestions</p>
      {data.activityFeed.map((group) => (
        <div key={group.day}>
          <p className="text-[10px] font-semibold uppercase text-muted-foreground py-1.5">{group.day}</p>
          {group.items.map((item, index) => {
            const Icon = ICON_MAP[item.icon];
            const color = TYPE_COLOR[item.type];
            return (
              <div key={index} className="border-t border-border py-1.5 flex gap-2">
                <span className="font-sora text-[10px] text-muted-foreground w-[34px] shrink-0">{item.time}</span>
                <Icon className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color }} />
                <span className="text-[11px] text-muted-foreground leading-[1.45]">{item.text}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default AIActivityFeed;
