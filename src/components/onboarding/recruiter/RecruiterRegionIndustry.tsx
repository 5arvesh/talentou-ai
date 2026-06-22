import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, ArrowRight } from 'lucide-react';
import { OnboardingShell } from '../OnboardingShell';
import { PredictiveSearchInput } from '../ui/PredictiveSearchInput';

const REGION_SUGGESTIONS = [
  'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Mumbai', 'Delhi', 'Kolkata',
  'Ahmedabad', 'Jaipur', 'Surat', 'Remote (India)', 'Singapore', 'London',
  'New York', 'San Francisco', 'Dubai', 'Toronto',
];

const INDUSTRY_SUGGESTIONS = [
  'SaaS / B2B', 'Fintech', 'HR Tech', 'E-commerce', 'EdTech', 'HealthTech',
  'Gaming', 'Cybersecurity', 'Cloud / DevOps', 'InsurTech', 'BFSI',
  'Media & Entertainment', 'Logistics', 'Real Estate Tech',
];

const sectionLabel = 'block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#bbb] mb-[10px]';

export function RecruiterRegionIndustry() {
  const navigate = useNavigate();
  const [regions, setRegions] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);

  const handleContinue = () => {
    localStorage.setItem('recruiterStep1', JSON.stringify({ regions, industries }));
    navigate('/onboarding/recruiter/domain-seniority');
  };

  return (
    <OnboardingShell
      progressPct={33}
      leftPanel={{
        eyebrow: 'Step 1 of 3',
        headline: 'Where do you <span class="text-[#c084fc]">source from?</span>',
        body: 'Your region and industry focus help the AI match you to the right positions and surface the most relevant candidates.',
        steps: [
          { label: 'Region & Industry', status: 'current' },
          { label: 'Domain & Seniority', status: 'locked' },
          { label: 'Job type', status: 'locked' },
        ],
        progressLabel: 'Your profile',
      }}
      footer={{
        left: (
          <button
            type="button"
            onClick={() => navigate('/ta-associate-plan')}
            className="text-[12px] text-[#bbb] bg-transparent border-none cursor-pointer hover:text-[#888] transition-colors"
          >
            Skip for now
          </button>
        ),
        right: (
          <button
            type="button"
            onClick={handleContinue}
            className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ),
      }}
    >
      <div className="max-w-lg">
        <p className="text-[10px] font-semibold text-[#c084fc] uppercase tracking-[0.1em] mb-[10px]">
          STEP 1 — REGION & INDUSTRY
        </p>
        <h1 className="font-sora text-[20px] font-semibold text-[#0e0020] mb-1">
          Where do you source from?
        </h1>
        <p className="flex items-center gap-1 text-[11px] text-[#bbb] mb-6">
          <Info className="h-3 w-3 shrink-0" />
          You can skip any step — add more detail later from your profile.
        </p>

        <label className={sectionLabel}>SOURCING REGIONS</label>
        <PredictiveSearchInput
          placeholder="Search cities, regions, or type your own..."
          selected={regions}
          suggestions={REGION_SUGGESTIONS}
          onAdd={(item) => setRegions((prev) => [...prev, item])}
          onRemove={(item) => setRegions((prev) => prev.filter((r) => r !== item))}
        />

        <div className="border-t border-[#f0eeff] my-5" />

        <label className={sectionLabel}>TARGET INDUSTRIES</label>
        <PredictiveSearchInput
          placeholder="Search industries or type your own..."
          selected={industries}
          suggestions={INDUSTRY_SUGGESTIONS}
          onAdd={(item) => setIndustries((prev) => [...prev, item])}
          onRemove={(item) => setIndustries((prev) => prev.filter((i) => i !== item))}
        />
      </div>
    </OnboardingShell>
  );
}

export default RecruiterRegionIndustry;
