import React from 'react';
import { Check } from 'lucide-react';

interface OnboardingDoneStateProps {
  tags: string[];
}

export function OnboardingDoneState({ tags }: OnboardingDoneStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <div className="w-14 h-14 rounded-full bg-[#EEEDFE] flex items-center justify-center mx-auto mb-4">
        <Check className="h-6 w-6 text-[#7800D3]" />
      </div>
      <h2 className="font-sora text-[20px] font-semibold text-[#0e0020] mb-[6px]">
        Profile complete
      </h2>
      <p className="text-[13px] text-[#888] leading-[1.55] max-w-[300px] mx-auto mb-5">
        Your preferences are saved. The AI will use them from the moment you start working on positions.
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-[5px] justify-center max-w-sm">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#EEEDFE] text-[#3C3489] text-[12px] font-medium px-[10px] py-[5px] rounded-[99px]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
