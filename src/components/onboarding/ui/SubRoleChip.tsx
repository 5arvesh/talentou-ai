import React from 'react';

interface SubRoleChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function SubRoleChip({ label, selected, onToggle }: SubRoleChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1 px-3 py-[6px] rounded-[99px] text-[11px] font-medium border-[1.5px] cursor-pointer transition-all ${
        selected
          ? 'border-[#7800D3] bg-[#EEEDFE] text-[#7800D3]'
          : 'border-[#eee] bg-white text-[#666] hover:border-[rgba(120,0,211,0.3)] hover:text-[#7800D3]'
      }`}
    >
      {selected && <span>✓</span>}
      {label}
    </button>
  );
}
