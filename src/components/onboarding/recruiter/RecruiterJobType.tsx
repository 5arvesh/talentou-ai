import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Check, Briefcase, FileText, Clock, Rocket } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { OnboardingShell } from '../OnboardingShell';

const JOB_TYPES: { icon: LucideIcon; label: string; desc: string }[] = [
  {
    icon: Briefcase,
    label: 'Full-time',
    desc: 'Permanent employment. Standard contracts with salary and benefits.',
  },
  {
    icon: FileText,
    label: 'Contract',
    desc: 'Fixed-term engagement. Project-based with a defined end date.',
  },
  {
    icon: Clock,
    label: 'Part-time',
    desc: 'Flexible hours. Typically 20–30 hrs/week with reduced scope.',
  },
  {
    icon: Rocket,
    label: 'Freelance',
    desc: 'Independent work. Milestone or hourly billing, no employment contract.',
  },
];

export function RecruiterJobType() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (label: string) =>
    setSelected((prev) => prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]);

  const handleDone = () => {
    const step1 = JSON.parse(localStorage.getItem('recruiterStep1') || '{}');
    const step2 = JSON.parse(localStorage.getItem('recruiterStep2') || '{}');
    localStorage.setItem(
      'recruiterProfile',
      JSON.stringify({
        regions: step1.regions || [],
        industries: step1.industries || [],
        domains: step2.domains || [],
        seniority: step2.seniority || [],
        jobTypes: selected,
      })
    );
    navigate('/onboarding/recruiter/done');
  };

  return (
    <OnboardingShell
      progressPct={95}
      leftPanel={{
        eyebrow: 'Step 3 of 3',
        headline: 'Permanent or <span class="text-[#c084fc]">contract?</span>',
        body: 'Tell us what kinds of roles you place. This helps the AI generate the right brief and outreach templates.',
        steps: [
          { label: 'Region & Industry', status: 'done' },
          { label: 'Domain & Seniority', status: 'done' },
          { label: 'Job type', status: 'current' },
        ],
        progressLabel: 'Your profile',
      }}
      footer={{
        left: (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-[#ddd] rounded-[10px] px-5 py-[10px] text-[13px] text-[#888] bg-transparent hover:bg-[#fafafa] transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => navigate('/ta-associate-plan')}
              className="text-[12px] text-[#bbb] bg-transparent border-none cursor-pointer hover:text-[#888] transition-colors"
            >
              Skip for now
            </button>
          </div>
        ),
        right: (
          <button
            type="button"
            onClick={handleDone}
            className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            <Check className="h-3.5 w-3.5" />
            All done
          </button>
        ),
      }}
    >
      <div className="max-w-lg">
        <p className="text-[10px] font-semibold text-[#c084fc] uppercase tracking-[0.1em] mb-[10px]">
          STEP 3 — JOB TYPE
        </p>
        <h1 className="font-sora text-[20px] font-semibold text-[#0e0020] mb-1">
          What kinds of positions do you fill?
        </h1>
        <p className="flex items-center gap-1 text-[11px] text-[#bbb] mb-6">
          <Info className="h-3 w-3 shrink-0" />
          You can skip any step — add more detail later from your profile.
        </p>

        <div className="grid grid-cols-2 gap-[10px]">
          {JOB_TYPES.map(({ icon: Icon, label, desc }) => {
            const isSelected = selected.includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggle(label)}
                className={`border-[1.5px] rounded-[14px] p-[20px_18px] cursor-pointer transition-all bg-white text-left ${
                  isSelected
                    ? 'border-[#7800D3] bg-[#EEEDFE]'
                    : 'border-[#eee] hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <Icon className={`h-5 w-5 shrink-0 mt-[1px] ${isSelected ? 'text-[#7800D3]' : 'text-[#bbb]'}`} />
                  <span className={`font-sora text-[14px] font-medium ${isSelected ? 'text-[#7800D3]' : 'text-[#333]'}`}>
                    {label}
                  </span>
                  <div
                    className={`ml-auto w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#7800D3] border-[#7800D3]' : 'border-[#ddd]'
                    }`}
                  >
                    {isSelected && <Check className="h-[11px] w-[11px] text-white" />}
                  </div>
                </div>
                <p className={`text-[12px] leading-[1.5] ${isSelected ? 'text-[rgba(120,0,211,0.5)]' : 'text-[#aaa]'}`}>
                  {desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </OnboardingShell>
  );
}

export default RecruiterJobType;
