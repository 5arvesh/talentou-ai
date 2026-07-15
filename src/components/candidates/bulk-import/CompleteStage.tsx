import React from 'react';
import { PartyPopper, HelpCircle } from 'lucide-react';

interface CompleteStageProps {
  imported: number;
  unassigned: number;
  merged: number;
  onDone: () => void;
}

function Stat({ value, label, color }: { value: number; label: string; color?: string }) {
  return (
    <div className="rounded-[12px] border border-[#ECE7F5] bg-white px-6 py-4 text-center min-w-[110px]">
      <div className="font-sora text-[22px] font-bold leading-none" style={{ color: color ?? '#1A0B2E' }}>{value}</div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8A879A] mt-1.5">{label}</div>
    </div>
  );
}

export function CompleteStage({ imported, unassigned, merged, onDone }: CompleteStageProps) {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center" style={{ background: '#DCEFC8' }}>
        <PartyPopper className="h-7 w-7" style={{ color: '#1F4A0A' }} />
      </div>
      <p className="font-sora text-[18px] font-semibold mt-3" style={{ color: '#1A0B2E' }}>Import complete!</p>
      <p className="text-[12px] text-[#888] mt-1 text-center">Your candidates have been added and assigned to their matched positions.</p>

      <div className="flex gap-2.5 flex-wrap justify-center mt-5">
        <Stat value={imported} label="Imported" />
        <Stat value={unassigned} label="Unassigned" color="#9A6A0A" />
        <Stat value={merged} label="Merged dupes" />
      </div>

      {unassigned > 0 && (
        <div data-tour-id="bulk-unassigned-summary" className="flex items-start gap-2.5 rounded-[10px] px-3.5 py-3 mt-5 w-full" style={{ background: '#F6F3FC' }}>
          <HelpCircle className="h-4 w-4 shrink-0 mt-px" style={{ color: '#A02020' }} />
          <p className="text-[12px] leading-[1.5]" style={{ color: '#5A2A9E' }}>
            {unassigned} {unassigned === 1 ? 'candidate' : 'candidates'} didn't have a clear position match or were missing key details —
            they've been added to your <span className="font-semibold">Unassigned Candidates</span> pool so you can review and assign them later.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={onDone}
        className="w-full rounded-[10px] h-12 text-[14px] font-semibold text-white mt-5"
        style={{ background: '#2F7A10' }}
      >
        Done
      </button>
    </div>
  );
}

export default CompleteStage;
