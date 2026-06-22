import React from 'react';

interface LeftPanelProps {
  eyebrow: string;
  headline: string;
  body: string;
  progressLabel?: string;
}

export function LeftPanel({ eyebrow, headline, body }: LeftPanelProps) {
  return (
    <div className="w-[280px] shrink-0 bg-[#0e0020] px-7 py-8 flex flex-col justify-between relative overflow-hidden">
      {/* Ambient glow — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -60, right: -60,
          width: 260, height: 260,
          background: 'radial-gradient(circle, rgba(120,0,211,0.35) 0%, transparent 70%)',
        }}
      />
      {/* Ambient glow — bottom left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -40, left: -40,
          width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <div className="flex items-center relative z-10">
        <div className="w-7 h-7 bg-[#7800D3] rounded-[7px] flex items-center justify-center shrink-0">
          <span className="font-sora text-[11px] font-bold text-white">T</span>
        </div>
        <span className="font-sora text-[13px] font-semibold text-white ml-2">Talentou</span>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <p className="text-[10px] font-medium text-[#c084fc] uppercase tracking-[0.1em] mb-3">
          {eyebrow}
        </p>
        <h2
          className="font-sora text-[22px] font-bold text-white leading-[1.25] mb-[14px]"
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        <p className="text-[12px] text-white/[0.45] leading-[1.6]">{body}</p>
      </div>

      {/* Spacer keeps the headline block vertically centered (steps moved to top bar) */}
      <div className="relative z-10" />
    </div>
  );
}
