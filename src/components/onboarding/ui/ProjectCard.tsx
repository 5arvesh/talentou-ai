import React from 'react';

interface ProjectCardProps {
  name: string;
  client: string;
  selected: boolean;
  onClick: () => void;
}

export function ProjectCard({ name, client, selected, onClick }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-[10px] border-[1.5px] rounded-[10px] px-3 py-[10px] cursor-pointer transition-all text-left ${
        selected
          ? 'border-[#7800D3] bg-[#EEEDFE]'
          : 'border-[#eee] bg-white hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full shrink-0 ${selected ? 'bg-[#7800D3]' : 'bg-[#ddd]'}`}
      />
      <div className="min-w-0">
        <div
          className={`font-sora text-[13px] font-medium leading-none truncate ${
            selected ? 'text-[#7800D3]' : 'text-[#333]'
          }`}
        >
          {name}
        </div>
        <div className="font-dm-sans text-[11px] text-[#aaa] mt-[3px]">{client}</div>
      </div>
    </button>
  );
}
