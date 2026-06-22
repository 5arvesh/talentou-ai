import React from 'react';
import { PenLine, Sparkles } from 'lucide-react';

interface USPEditorProps {
  domain: string;
  value: string;
  onChange: (v: string) => void;
}

export function USPEditor({ domain, value, onChange }: USPEditorProps) {
  return (
    <div>
      <div className="border-[0.5px] border-[#e8e4f0] border-l-[3px] border-l-[#7800D3] rounded-[0_10px_10px_0] p-[12px_14px] bg-[#faf8ff]">
        <div className="flex items-center gap-1 mb-[6px]">
          <Sparkles className="h-3 w-3 text-[#7800D3]" />
          <span className="text-[10px] font-semibold text-[#7800D3] uppercase tracking-[0.06em]">
            AI-generated from {domain}
          </span>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="w-full border-none bg-transparent text-[13px] text-[#444] italic leading-[1.65] resize-none outline-none min-h-[100px]"
          placeholder="Describe what makes your company a great place to work — this will appear in every brief your recruiters send."
        />
      </div>
      <div className="flex items-center gap-1 mt-2 text-[#888]">
        <PenLine className="h-3 w-3" />
        <span className="text-[11px]">Click the text above to edit</span>
      </div>
    </div>
  );
}
