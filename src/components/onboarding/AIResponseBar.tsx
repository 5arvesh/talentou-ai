import React from 'react';
import { Sparkles } from 'lucide-react';

function buildCategoryDisplay(categories: string[]): string {
  if (categories.length === 0) return '';
  if (categories.length === 1) return categories[0];
  if (categories.length === 2) return `${categories[0]} & ${categories[1]}`;
  const last = categories[categories.length - 1];
  const rest = categories.slice(0, -1).join(', ');
  return `${rest} & ${last}`;
}

export function AIResponseBar({ categories }: { categories: string[] }) {
  const display = buildCategoryDisplay(categories);

  return (
    <div className="flex items-center gap-[10px] bg-[#0e0020] rounded-[10px] px-[14px] py-[10px] mb-4 animate-fade-up">
      <Sparkles className="h-3.5 w-3.5 text-[#c084fc] shrink-0" />
      <p className="text-[11px] text-white/75 leading-[1.45]">
        Based on{' '}
        <span className="text-[#c084fc] font-semibold">{display}</span>
        , here are the roles we think you specialise in. Remove any that don't apply, or add more.
      </p>
    </div>
  );
}
