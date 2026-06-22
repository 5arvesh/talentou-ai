import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { OnboardingShell } from '../OnboardingShell';
import { WelcomeAvatar } from '../ui/WelcomeAvatar';
import { SelectionCard } from '../ui/SelectionCard';
import { SeniorityPill } from '../ui/SeniorityPill';

const DEPT_OPTIONS = [
  { icon: '💻', label: 'Engineering' },
  { icon: '🎯', label: 'Product' },
  { icon: '🎨', label: 'Design' },
  { icon: '📈', label: 'Sales' },
  { icon: '📣', label: 'Marketing' },
  { icon: '⚙️', label: 'Operations' },
  { icon: '💰', label: 'Finance' },
  { icon: '👥', label: 'People / HR' },
  { icon: '🔧', label: 'Other' },
];

const SENIORITY_OPTIONS = [
  'Intern / Trainee', 'Junior', 'Mid-level', 'Senior', 'Lead / Staff', 'Manager', 'Director+',
];

const VOLUME_OPTIONS = [
  { number: '1–5', sub: 'hires / year' },
  { number: '6–15', sub: 'hires / year' },
  { number: '15+', sub: 'hires / year' },
];

export function HiringLeadProfile() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem('firstName') || 'there';
  const lastName = localStorage.getItem('lastName') || '';
  const initials = `${firstName[0] ?? '?'}${lastName[0] ?? ''}`.toUpperCase();
  const company = localStorage.getItem('tenantName') || 'Talentou';

  const [dept, setDept] = useState<string | null>(null);
  const [seniority, setSeniority] = useState<string[]>([]);
  const [volume, setVolume] = useState<string | null>(null);

  const toggleSeniority = (s: string) =>
    setSeniority((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const sectionLabel = 'block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#444] mb-2';

  return (
    <OnboardingShell
      leftPanel={{
        eyebrow: "You've been invited",
        headline: 'Let\'s get you <span class="text-[#c084fc]">set up.</span>',
        body: "Takes under a minute. This helps the AI understand your team's hiring needs before you even create your first position.",
      }}
      footer={{
        left: (
          <button
            type="button"
            onClick={() => navigate('/hiring-lead-plan/dashboard')}
            className="text-[12px] text-[#aaa] bg-transparent border-none cursor-pointer hover:text-[#888] transition-colors"
          >
            Skip for now
          </button>
        ),
        right: (
          <button
            type="button"
            onClick={() => navigate('/hiring-lead-plan/dashboard')}
            className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            <Check className="h-3.5 w-3.5" />
            Go to dashboard
          </button>
        ),
      }}
    >
      <div className="max-w-lg">
        {/* Welcome block */}
        <div className="text-center mb-8">
          <WelcomeAvatar initials={initials} gradient="blue" />
          <h1 className="font-sora text-[18px] font-semibold text-[#0e0020] mb-1">
            Welcome, {firstName} 👋
          </h1>
          <span className="inline-block bg-[#E6F1FB] text-[#0C447C] rounded-[99px] text-[11px] px-[10px] py-[3px]">
            Hiring Lead · {company}
          </span>
        </div>

        {/* Department */}
        <div className="mb-5">
          <label className={sectionLabel}>Your department</label>
          <div className="grid grid-cols-3 gap-2">
            {DEPT_OPTIONS.map((d) => (
              <SelectionCard
                key={d.label}
                icon={d.icon}
                label={d.label}
                selected={dept === d.label}
                onToggle={() => setDept(dept === d.label ? null : d.label)}
              />
            ))}
          </div>
        </div>

        {/* Seniority */}
        <div className="mb-4">
          <label className={sectionLabel}>Seniority you hire for</label>
          <div className="flex flex-wrap gap-[6px]">
            {SENIORITY_OPTIONS.map((s) => (
              <SeniorityPill
                key={s}
                label={s}
                selected={seniority.includes(s)}
                onClick={() => toggleSeniority(s)}
              />
            ))}
          </div>
        </div>

        {/* Hiring volume */}
        <div className="mb-5">
          <label className={sectionLabel}>Hiring volume per year</label>
          <div className="grid grid-cols-3 gap-2">
            {VOLUME_OPTIONS.map((v) => (
              <button
                key={v.number}
                type="button"
                onClick={() => setVolume(volume === v.number ? null : v.number)}
                className={`border-[1.5px] rounded-[12px] p-[14px_10px] text-center cursor-pointer transition-all ${
                  volume === v.number
                    ? 'border-[#7800D3] bg-[#EEEDFE]'
                    : 'border-[#eee] bg-white hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
                }`}
              >
                <div className={`font-sora text-[20px] font-bold ${volume === v.number ? 'text-[#7800D3]' : 'text-[#0e0020]'}`}>
                  {v.number}
                </div>
                <div className="text-[10px] text-[#888] mt-[3px]">{v.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
}

export default HiringLeadProfile;
