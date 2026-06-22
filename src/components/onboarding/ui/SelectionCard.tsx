import React from 'react';

interface SelectionCardProps {
  icon: string;
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function SelectionCard({ icon, label, selected, onToggle }: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`border-[1.5px] rounded-[12px] p-[14px_10px] text-center cursor-pointer transition-all w-full ${
        selected
          ? 'border-[#7800D3] bg-[#EEEDFE]'
          : 'border-[#eee] bg-white hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
      }`}
    >
      <div className="text-[22px] mb-[6px]">{icon}</div>
      <div className={`font-sora text-[11px] font-medium ${selected ? 'text-[#7800D3]' : 'text-[#444]'}`}>
        {label}
      </div>
    </button>
  );
}
