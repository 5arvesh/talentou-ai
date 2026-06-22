import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  label: string;
  status: 'done' | 'current' | 'locked';
}

export function ProgressSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="space-y-[10px]">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-[10px]">
          <div
            className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 ${
              step.status === 'done'
                ? 'bg-[rgba(120,0,211,0.5)] border border-[#7800D3]'
                : step.status === 'current'
                ? 'border-[0.5px] border-[#c084fc] bg-[rgba(192,132,252,0.1)]'
                : 'border-[0.5px] border-[rgba(192,132,252,0.25)]'
            }`}
          >
            {step.status === 'done' ? (
              <Check className="h-2.5 w-2.5 text-[#c084fc]" />
            ) : (
              <span
                className={`font-sora text-[9px] font-semibold ${
                  step.status === 'current'
                    ? 'text-[#c084fc]'
                    : 'text-[rgba(192,132,252,0.5)]'
                }`}
              >
                {i + 1}
              </span>
            )}
          </div>
          <span
            className={`text-[11px] ${
              step.status === 'done'
                ? 'text-white/45'
                : step.status === 'current'
                ? 'text-white/85'
                : 'text-white/30'
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
