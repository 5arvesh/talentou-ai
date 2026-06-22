import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  label: string;
  status: 'done' | 'current' | 'locked';
}

export function HorizontalStepper({ steps }: { steps: Step[] }) {
  return (
    <div className="flex items-center justify-center gap-8 w-full">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-[8px] shrink-0">
          <div
            className={`w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0 transition-colors ${
              step.status === 'done'
                ? 'bg-[#7800D3]'
                : step.status === 'current'
                ? 'border-[1.5px] border-[#7800D3] bg-[#EEEDFE]'
                : 'border-[1.5px] border-[#e0e0e0] bg-white'
            }`}
          >
            {step.status === 'done' ? (
              <Check className="h-3 w-3 text-white" />
            ) : (
              <span
                className={`font-sora text-[10px] font-semibold ${
                  step.status === 'current' ? 'text-[#7800D3]' : 'text-[#bbb]'
                }`}
              >
                {i + 1}
              </span>
            )}
          </div>
          <span
            className={`text-[12px] whitespace-nowrap ${
              step.status === 'current'
                ? 'text-[#7800D3] font-semibold'
                : step.status === 'done'
                ? 'text-[#0e0020]'
                : 'text-[#bbb]'
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default HorizontalStepper;
