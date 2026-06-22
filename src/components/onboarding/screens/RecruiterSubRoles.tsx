import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Plus } from 'lucide-react';
import { OnboardingShell } from '../OnboardingShell';
import { AIResponseBar } from '../AIResponseBar';
import { SubRoleChip } from '../ui/SubRoleChip';

const SUB_ROLES: Record<string, { preSelected: string[]; available: string[] }> = {
  Tech: {
    preSelected: ['Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer', 'DevOps / SRE'],
    available: ['ML / AI Engineer', 'Mobile (iOS/Android)', 'QA / Testing', 'Security Engineer', 'Cloud / Infrastructure'],
  },
  Data: {
    preSelected: ['Data Engineer', 'Data Analyst', 'Data Scientist'],
    available: ['ML Engineer', 'Analytics Engineer', 'BI Developer'],
  },
  Product: { preSelected: ['Product Manager', 'Product Analyst', 'Growth PM'], available: [] },
  Design: { preSelected: ['UX Designer', 'UI Designer', 'Product Designer'], available: [] },
  Sales: { preSelected: ['Account Executive', 'SDR / BDR', 'Sales Manager'], available: [] },
  Marketing: { preSelected: ['Growth Marketer', 'Content Marketer', 'Performance Marketing'], available: [] },
  Finance: { preSelected: ['Financial Analyst', 'FP&A', 'Controller'], available: [] },
  Operations: { preSelected: ['Operations Manager', 'Chief of Staff', 'BizOps'], available: [] },
};

export function RecruiterSubRoles() {
  const navigate = useNavigate();
  const categories: string[] = JSON.parse(localStorage.getItem('onboardingCategories') || '[]');

  const initialSelected = Array.from(
    new Set(categories.flatMap((c) => SUB_ROLES[c]?.preSelected ?? []))
  );
  const initialAvailable = Array.from(
    new Set(categories.flatMap((c) => SUB_ROLES[c]?.available ?? []))
  ).filter((r) => !initialSelected.includes(r));

  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [available, setAvailable] = useState<string[]>(initialAvailable);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showCustomInput) inputRef.current?.focus();
  }, [showCustomInput]);

  const toggle = (role: string, isSelected: boolean) => {
    if (isSelected) {
      setSelected((prev) => prev.filter((r) => r !== role));
      setAvailable((prev) => [...prev, role]);
    } else {
      setAvailable((prev) => prev.filter((r) => r !== role));
      setSelected((prev) => [...prev, role]);
    }
  };

  const addCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed && !selected.includes(trimmed) && !available.includes(trimmed)) {
      setSelected((prev) => [...prev, trimmed]);
    }
    setCustomInput('');
    setShowCustomInput(false);
  };

  return (
    <OnboardingShell
      leftPanel={{
        eyebrow: 'Your profile · Step 2',
        headline: 'Almost <span class="text-[#c084fc]">there.</span>',
        body: "Confirm the specific roles you work with. We've pre-selected the most common ones — just remove anything that doesn't fit.",
      }}
      footer={{
        left: (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-[#ddd] rounded-[10px] px-5 py-[10px] text-[13px] text-[#888] bg-transparent hover:bg-[#fafafa] transition-colors"
          >
            Back
          </button>
        ),
        right: (
          <button
            type="button"
            onClick={() => navigate('/ta-associate-plan')}
            className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            <Check className="h-3.5 w-3.5" />
            All done
          </button>
        ),
      }}
    >
      <div className="max-w-lg">
        <AIResponseBar categories={categories} />

        <h1 className="font-sora text-[17px] font-semibold text-[#0e0020] mb-1">Confirm your role specialities</h1>
        <p className="text-[13px] text-[#888] mb-4">Tap to deselect roles you don't recruit for.</p>

        <div className="flex flex-wrap gap-[6px]">
          {selected.map((role) => (
            <SubRoleChip key={role} label={role} selected onToggle={() => toggle(role, true)} />
          ))}
          {available.map((role) => (
            <SubRoleChip key={role} label={role} selected={false} onToggle={() => toggle(role, false)} />
          ))}

          {showCustomInput ? (
            <input
              ref={inputRef}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addCustom(); if (e.key === 'Escape') setShowCustomInput(false); }}
              onBlur={addCustom}
              placeholder="Role name…"
              className="px-3 py-[6px] rounded-[99px] text-[11px] border border-[#7800D3] outline-none w-32"
            />
          ) : (
            <button
              type="button"
              onClick={() => setShowCustomInput(true)}
              className="inline-flex items-center gap-1 px-3 py-[6px] rounded-[99px] text-[11px] text-[#7800D3] border border-dashed border-[rgba(120,0,211,0.3)] cursor-pointer hover:border-[#7800D3] transition-colors"
            >
              <Plus className="h-3 w-3" />
              Add a role
            </button>
          )}
        </div>
      </div>
    </OnboardingShell>
  );
}

export default RecruiterSubRoles;
