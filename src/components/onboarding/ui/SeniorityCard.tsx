import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SeniorityCardProps {
  icon: LucideIcon;
  label: string;
  sub: string;
  selected: boolean;
  onToggle: () => void;
}

export function SeniorityCard({ icon: Icon, label, sub, selected, onToggle }: SeniorityCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full flex items-center gap-[10px] border-[1.5px] rounded-[10px] px-3 py-[10px] cursor-pointer transition-all text-left ${
        selected
          ? 'border-[#7800D3] bg-[#EEEDFE]'
          : 'border-[#eee] bg-white hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
      }`}
    >
      <Icon
        className={`h-4 w-4 shrink-0 ${selected ? 'text-[#7800D3]' : 'text-[#ddd]'}`}
      />
      <div className="min-w-0">
        <div
          className={`font-sora text-[12px] font-medium leading-none ${
            selected ? 'text-[#7800D3]' : 'text-[#444]'
          }`}
        >
          {label}
        </div>
        <div
          className={`font-dm-sans text-[11px] mt-[3px] ${
            selected ? 'text-[rgba(120,0,211,0.5)]' : 'text-[#aaa]'
          }`}
        >
          {sub}
        </div>
      </div>
    </button>
  );
}
