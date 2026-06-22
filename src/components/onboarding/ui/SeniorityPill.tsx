import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SeniorityPillProps {
  icon: LucideIcon;
  label: string;
  sub: string;
  selected: boolean;
  onToggle: () => void;
}

export function SeniorityPill({ icon: Icon, label, sub, selected, onToggle }: SeniorityPillProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-[7px] px-4 py-[9px] rounded-[99px] border-[1.5px] cursor-pointer transition-all ${
        selected
          ? 'border-[#7800D3] bg-[#EEEDFE]'
          : 'border-[#eee] bg-white hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
      }`}
    >
      <Icon className={`h-3.5 w-3.5 shrink-0 ${selected ? 'text-[#7800D3]' : 'text-[#bbb]'}`} />
      <div className="flex flex-col text-left">
        <span className={`font-sora text-[12px] font-medium leading-none ${selected ? 'text-[#7800D3]' : 'text-[#555]'}`}>
          {label}
        </span>
        <span className={`text-[10px] leading-none mt-[3px] ${selected ? 'text-[rgba(120,0,211,0.5)]' : 'text-[#bbb]'}`}>
          {sub}
        </span>
      </div>
    </button>
  );
}
