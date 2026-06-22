import React from 'react';
import { Sparkles } from 'lucide-react';

export function AIScapeIndicator({ domain }: { domain: string }) {
  return (
    <div className="flex gap-3 bg-gradient-to-br from-[#0e0020] to-[#1a0040] rounded-[12px] p-[14px_16px] mt-2 animate-in fade-in slide-in-from-bottom-1">
      <div className="w-8 h-8 rounded-full bg-[rgba(120,0,211,0.4)] flex items-center justify-center animate-ai-pulse shrink-0">
        <Sparkles className="h-3.5 w-3.5 text-[#c084fc]" />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <span className="text-[12px] text-[#c084fc] font-medium">
            AI is learning about {domain}
          </span>
          <span className="dot-bounce-1 w-1 h-1 rounded-full bg-[#c084fc] inline-block mx-px" />
          <span className="dot-bounce-2 w-1 h-1 rounded-full bg-[#c084fc] inline-block mx-px" />
          <span className="dot-bounce-3 w-1 h-1 rounded-full bg-[#c084fc] inline-block mx-px" />
        </div>
        <p className="text-[11px] text-white/70 leading-[1.5] mt-1">
          Scanning {domain} to build your company pitch. This takes about 10 seconds.
        </p>
      </div>
    </div>
  );
}
