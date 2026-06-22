import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OnboardingShell } from '../OnboardingShell';
import { SelectionCard } from '../ui/SelectionCard';

const CATEGORIES = [
  { icon: '💻', label: 'Tech' },
  { icon: '📊', label: 'Data' },
  { icon: '🎯', label: 'Product' },
  { icon: '🎨', label: 'Design' },
  { icon: '📈', label: 'Sales' },
  { icon: '📣', label: 'Marketing' },
  { icon: '💰', label: 'Finance' },
  { icon: '⚙️', label: 'Operations' },
];

export function RecruiterCategories() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleContinue = () => {
    localStorage.setItem('onboardingCategories', JSON.stringify(selected));
    navigate('/onboarding/sub-roles');
  };

  return (
    <OnboardingShell
      leftPanel={{
        eyebrow: 'Your profile · Step 1',
        headline: 'What do you <span class="text-[#c084fc]">recruit for?</span>',
        body: 'Pick the areas you work in. Select as many as apply — the AI uses this to match you to positions that fit your expertise.',
      }}
      footer={{
        dots: { total: 2, active: 2 },
        right: (
          <button
            type="button"
            onClick={handleContinue}
            disabled={selected.length === 0}
            className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ),
      }}
    >
      <div className="max-w-lg">
        <h1 className="font-sora text-[22px] font-semibold text-[#0e0020] mb-1">Pick your speciality areas</h1>
        <p className="text-[13px] text-[#888] mb-6">Select all that apply. You can update this anytime from your profile.</p>

        <div className="grid grid-cols-4 gap-2 mb-5">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.label}
              className="animate-in fade-in slide-in-from-bottom-1"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <SelectionCard
                icon={cat.icon}
                label={cat.label}
                selected={selected.includes(cat.label)}
                onToggle={() => toggle(cat.label)}
              />
            </div>
          ))}
        </div>

        <p className={`text-[12px] text-center ${selected.length > 0 ? 'text-[#7800D3]' : 'text-[#aaa]'}`}>
          {selected.length > 0 ? `${selected.length} area${selected.length > 1 ? 's' : ''} selected` : 'Select at least one area to continue'}
        </p>
      </div>
    </OnboardingShell>
  );
}

export default RecruiterCategories;
