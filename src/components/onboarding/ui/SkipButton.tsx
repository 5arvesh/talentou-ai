import React from 'react';
import { SkipForward } from 'lucide-react';

interface SkipButtonProps {
  label?: string;
  onClick: () => void;
}

export function SkipButton({ label = 'Skip for now', onClick }: SkipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-[5px] px-[18px] py-[10px] rounded-[10px] border-[0.5px] border-[#e4ddff] bg-[#f6f4ff] text-[#7800D3] text-[12px] font-medium font-dm-sans hover:bg-[#EEEDFE] transition-colors"
    >
      <SkipForward className="h-[13px] w-[13px]" />
      {label}
    </button>
  );
}
