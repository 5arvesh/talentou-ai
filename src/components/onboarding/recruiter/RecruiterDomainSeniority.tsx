import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Info, ArrowRight,
  Code2, BarChart2, Layout, Palette, TrendingUp, Megaphone, Receipt, Settings,
  Leaf, Sprout, Trees, TreePine, Star, Users, Crown,
} from 'lucide-react';
import { OnboardingShell } from '../OnboardingShell';
import { SeniorityCard } from '../ui/SeniorityCard';

const DOMAINS = [
  { icon: Code2, label: 'Tech' },
  { icon: BarChart2, label: 'Data' },
  { icon: Layout, label: 'Product' },
  { icon: Palette, label: 'Design' },
  { icon: TrendingUp, label: 'Sales' },
  { icon: Megaphone, label: 'Marketing' },
  { icon: Receipt, label: 'Finance' },
  { icon: Settings, label: 'Operations' },
];

const SENIORITY = [
  { icon: Leaf, label: 'Intern / Trainee', sub: '0–1 yr' },
  { icon: Sprout, label: 'Junior', sub: '1–3 yrs' },
  { icon: Trees, label: 'Mid-level', sub: '3–5 yrs' },
  { icon: TreePine, label: 'Senior', sub: '5–8 yrs' },
  { icon: Star, label: 'Lead / Staff', sub: '8–12 yrs' },
  { icon: Users, label: 'Manager', sub: 'People manager' },
  { icon: Crown, label: 'Director+', sub: 'Leadership' },
];

const sectionLabel = 'block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#bbb] mb-[10px]';

export function RecruiterDomainSeniority() {
  const navigate = useNavigate();
  const [domains, setDomains] = useState<string[]>([]);
  const [seniority, setSeniority] = useState<string[]>([]);

  const toggleDomain = (label: string) =>
    setDomains((prev) => prev.includes(label) ? prev.filter((d) => d !== label) : [...prev, label]);

  const toggleSeniority = (label: string) =>
    setSeniority((prev) => prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]);

  const handleContinue = () => {
    const prev = JSON.parse(localStorage.getItem('recruiterStep1') || '{}');
    localStorage.setItem('recruiterStep2', JSON.stringify({ domains, seniority }));
    navigate('/onboarding/recruiter/job-type');
  };

  return (
    <OnboardingShell
      progressPct={66}
      leftPanel={{
        eyebrow: 'Step 2 of 3',
        headline: 'What do you <span class="text-[#c084fc]">recruit for?</span>',
        body: 'Pick the domains and seniority levels you work with most. This shapes every AI recommendation you see.',
        steps: [
          { label: 'Region & Industry', status: 'done' },
          { label: 'Domain & Seniority', status: 'current' },
          { label: 'Job type', status: 'locked' },
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
            onClick={handleContinue}
            className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ),
      }}
    >
      <div className="max-w-xl">
        <p className="text-[10px] font-semibold text-[#c084fc] uppercase tracking-[0.1em] mb-[10px]">
          STEP 2 — DOMAIN & SENIORITY
        </p>
        <h1 className="font-sora text-[20px] font-semibold text-[#0e0020] mb-1">
          What do you recruit for?
        </h1>
        <p className="flex items-center gap-1 text-[11px] text-[#bbb] mb-6">
          <Info className="h-3 w-3 shrink-0" />
          You can skip any step — add more detail later from your profile.
        </p>

        <div className="grid grid-cols-2 gap-5">
          {/* Domain column */}
          <div>
            <label className={sectionLabel}>RECRUITMENT DOMAIN</label>
            <div className="grid grid-cols-2 gap-[7px]">
              {DOMAINS.map(({ icon: Icon, label }, i) => {
                const selected = domains.includes(label);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleDomain(label)}
                    className={`border-[1.5px] rounded-[12px] p-[12px_8px] text-center cursor-pointer transition-all animate-in fade-in slide-in-from-bottom-1 ${
                      selected
                        ? 'border-[#7800D3] bg-[#EEEDFE]'
                        : 'border-[#eee] bg-white hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
                    }`}
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <Icon
                      className={`h-5 w-5 mx-auto mb-[5px] ${selected ? 'text-[#7800D3]' : 'text-[#bbb]'}`}
                    />
                    <div
                      className={`font-sora text-[11px] font-medium ${selected ? 'text-[#7800D3]' : 'text-[#555]'}`}
                    >
                      {label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seniority column */}
          <div>
            <label className={sectionLabel}>SENIORITY LEVELS</label>
            <div className="flex flex-col gap-[6px]">
              {SENIORITY.map(({ icon, label, sub }) => (
                <SeniorityCard
                  key={label}
                  icon={icon}
                  label={label}
                  sub={sub}
                  selected={seniority.includes(label)}
                  onToggle={() => toggleSeniority(label)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
}

export default RecruiterDomainSeniority;
