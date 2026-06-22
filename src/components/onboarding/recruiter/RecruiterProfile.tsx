import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Check, Code2, Briefcase,
  Leaf, Sprout, Trees, TreePine, Star, Users, Crown,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { OnboardingShell } from '../OnboardingShell';
import { HorizontalStepper } from '../HorizontalStepper';
import { PredictiveSearchInput } from '../ui/PredictiveSearchInput';
import { SeniorityPill } from '../ui/SeniorityPill';
import { SkipButton } from '../ui/SkipButton';

export const BROAD_REGIONS = [
  'APAC', 'Europe', 'North America', 'Latin America', 'Middle East', 'Africa', 'Remote / Global',
];

// Specific places scoped to each broad region — drives the "get specific" dropdown.
export const REGION_PLACES: Record<string, string[]> = {
  'APAC': ['India', 'Singapore', 'Australia', 'Japan', 'China', 'South Korea', 'Indonesia', 'Vietnam', 'Philippines', 'Malaysia', 'Bangalore', 'Pune', 'Hyderabad', 'Mumbai', 'Delhi', 'Sydney'],
  'Europe': ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Spain', 'Poland', 'Ireland', 'Sweden', 'London', 'Berlin', 'Amsterdam', 'Paris'],
  'North America': ['United States', 'Canada', 'Mexico', 'New York', 'San Francisco', 'Toronto', 'Austin', 'Seattle'],
  'Latin America': ['Brazil', 'Argentina', 'Mexico', 'Colombia', 'Chile', 'São Paulo', 'Buenos Aires'],
  'Middle East': ['UAE', 'Saudi Arabia', 'Israel', 'Qatar', 'Dubai', 'Abu Dhabi', 'Tel Aviv'],
  'Africa': ['South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Cape Town', 'Lagos', 'Nairobi'],
  'Remote / Global': ['Remote (Global)', 'Remote (APAC)', 'Remote (Europe)', 'Remote (Americas)'],
};

export const EXPERTISE_SUGGESTIONS = [
  'SaaS / B2B', 'Fintech', 'HR Tech', 'E-commerce', 'EdTech', 'HealthTech',
  'Gaming', 'Cybersecurity', 'Cloud / DevOps', 'BFSI',
];

export const TECH_SUBS = [
  'Software Engineering', 'Data / AI', 'Product', 'Design (UX/UI)', 'DevOps / Infra', 'QA / Testing', 'Security',
];
export const NONTECH_SUBS = [
  'Sales', 'Marketing', 'Finance / Accounting', 'Operations', 'HR / People', 'Customer Success', 'Legal',
];

export const SENIORITY = [
  { icon: Leaf,     label: 'Intern / Trainee', sub: '0–1 yr' },
  { icon: Sprout,   label: 'Junior',            sub: '1–3 yrs' },
  { icon: Trees,    label: 'Mid-level',         sub: '3–5 yrs' },
  { icon: TreePine, label: 'Senior',            sub: '5–8 yrs' },
  { icon: Star,     label: 'Lead / Staff',      sub: '8–12 yrs' },
  { icon: Users,    label: 'Manager',           sub: 'People manager' },
  { icon: Crown,    label: 'Director+',         sub: 'Leadership' },
];

const STEP_LABELS = ['Regions', 'Expertise', 'Domain', 'Seniority'];
const TOTAL_STEPS = STEP_LABELS.length;

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-6">
      <h1 className="font-sora text-[20px] font-semibold text-[#0e0020] mb-1">{title}</h1>
      <p className="text-[13px] text-[#888]">{subtitle}</p>
    </div>
  );
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-[9px] rounded-[99px] border-[1.5px] text-[13px] font-medium font-sora transition-all ${
        selected
          ? 'border-[#7800D3] bg-[#EEEDFE] text-[#7800D3]'
          : 'border-[#eee] bg-white text-[#555] hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
      }`}
    >
      {label}
    </button>
  );
}

function DomainCard({
  icon: Icon, label, sub, selected, onClick,
}: { icon: LucideIcon; label: string; sub: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 border-[1.5px] rounded-[14px] p-[20px] text-center transition-all ${
        selected
          ? 'border-[#7800D3] bg-[#EEEDFE]'
          : 'border-[#eee] bg-white hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
      }`}
    >
      <Icon className={`h-7 w-7 mx-auto mb-2 ${selected ? 'text-[#7800D3]' : 'text-[#bbb]'}`} />
      <div className={`font-sora text-[15px] font-semibold ${selected ? 'text-[#7800D3]' : 'text-[#333]'}`}>{label}</div>
      <div className={`text-[11px] mt-1 ${selected ? 'text-[rgba(120,0,211,0.55)]' : 'text-[#999]'}`}>{sub}</div>
    </button>
  );
}

function StepActions({
  onBack, onSkip, onPrimary, primaryLabel, isLast,
}: { onBack: () => void; onSkip: () => void; onPrimary: () => void; primaryLabel: string; isLast: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <button
        type="button"
        onClick={onBack}
        className="border border-[#ddd] rounded-[10px] px-5 py-[10px] text-[13px] text-[#888] bg-transparent hover:bg-[#fafafa] transition-colors"
      >
        Back
      </button>
      <SkipButton label="Skip" onClick={onSkip} />
      <button
        type="button"
        onClick={onPrimary}
        className="bg-[#7800D3] text-white rounded-[10px] px-6 py-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
      >
        {primaryLabel}
        {isLast ? <Check className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

export function RecruiterProfile() {
  const navigate = useNavigate();
  const [stepIdx, setStepIdx] = useState(0);

  const [broadRegions, setBroadRegions] = useState<string[]>([]);
  const [specificLocations, setSpecificLocations] = useState<string[]>([]);
  const [expertise, setExpertise] = useState<string[]>([]);
  const [domainTop, setDomainTop] = useState<Array<'tech' | 'non-tech'>>([]);
  const [domainSub, setDomainSub] = useState<string[]>([]);
  const [seniority, setSeniority] = useState<string[]>([]);
  const [othersOpen, setOthersOpen] = useState(false);
  const [otherDraft, setOtherDraft] = useState('');

  // Specific-location suggestions scoped to the selected broad region(s).
  const specificSuggestions = Array.from(
    new Set(broadRegions.flatMap((r) => REGION_PLACES[r] ?? []))
  );

  const addOther = () => {
    const v = otherDraft.trim();
    if (!v) return;
    setDomainSub((prev) => (prev.includes(v) ? prev : [...prev, v]));
    setOtherDraft('');
  };

  const toggleSet = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    label: string
  ) => setter((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));

  const toggleDomainTop = (key: 'tech' | 'non-tech') => {
    setDomainTop((prev) => {
      if (prev.includes(key)) {
        // deselecting — clear that group's sub-domains
        const groupSubs = key === 'tech' ? TECH_SUBS : NONTECH_SUBS;
        setDomainSub((subs) => subs.filter((s) => !groupSubs.includes(s)));
        return prev.filter((k) => k !== key);
      }
      return [...prev, key];
    });
  };

  const isLast = stepIdx === TOTAL_STEPS - 1;

  const handleDone = () => {
    localStorage.setItem(
      'recruiterProfile',
      JSON.stringify({ broadRegions, specificLocations, expertise, domainTop, domainSub, seniority })
    );
    navigate('/ta-associate/dashboard');
  };

  const goNext = () => (isLast ? handleDone() : setStepIdx((i) => i + 1));
  const goBack = () => (stepIdx === 0 ? navigate(-1) : setStepIdx((i) => i - 1));

  const stepsFor = (activeIdx: number) =>
    STEP_LABELS.map((label, i) => ({
      label,
      status: (i < activeIdx ? 'done' : i === activeIdx ? 'current' : 'locked') as 'done' | 'current' | 'locked',
    }));

  return (
    <OnboardingShell
      fullBleedBody
      stepperInContent
      progressPct={((stepIdx + 1) / TOTAL_STEPS) * 100}
      leftPanel={{
        eyebrow: 'Your profile',
        headline: 'Tell us how <span class="text-[#c084fc]">you recruit.</span>',
        body: 'A few quick questions — region, industry, domain, and seniority. Skip anything you\'re not sure about; you can always add it later.',
      }}
    >
      <div className="h-full overflow-hidden">
        <div
          className="flex h-full w-[400%] transition-transform duration-[450ms] ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${stepIdx * 25}%)` }}
        >
          {/* Step 1 — Sourcing regions */}
          <div className="w-1/4 h-full overflow-y-auto">
            <div className="h-full flex flex-col items-center justify-center px-8 py-8">
              <div className="w-full max-w-[640px] mb-8">
                <HorizontalStepper steps={stepsFor(0)} />
              </div>
              <div className="w-full max-w-[600px]">
                <StepHeading
                  title="Where do you source talent?"
                  subtitle="Start broad — pick the regions you recruit across. Optional, you can skip."
                />
                <div className="flex flex-wrap justify-center gap-2">
                  {BROAD_REGIONS.map((r) => (
                    <Chip key={r} label={r} selected={broadRegions.includes(r)} onClick={() => toggleSet(setBroadRegions, r)} />
                  ))}
                </div>

                {broadRegions.length > 0 && (
                  <div className="mt-6 animate-in fade-in slide-in-from-bottom-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#999] font-dm-sans mb-2 text-center">
                      Get specific (optional)
                    </p>
                    <PredictiveSearchInput
                      placeholder="Add specific countries, states, or cities..."
                      selected={specificLocations}
                      suggestions={specificSuggestions}
                      onAdd={(item) => setSpecificLocations((prev) => [...prev, item])}
                      onRemove={(item) => setSpecificLocations((prev) => prev.filter((l) => l !== item))}
                    />
                  </div>
                )}

                <StepActions onBack={goBack} onSkip={goNext} onPrimary={goNext} primaryLabel="Next" isLast={false} />
              </div>
            </div>
          </div>

          {/* Step 2 — Expertise (sectors) */}
          <div className="w-1/4 h-full overflow-y-auto">
            <div className="h-full flex flex-col items-center justify-center px-8 py-8">
              <div className="w-full max-w-[640px] mb-8">
                <HorizontalStepper steps={stepsFor(1)} />
              </div>
              <div className="w-full max-w-[600px]">
                <StepHeading
                  title="Which sectors do you specialise in?"
                  subtitle="Your areas of recruiting expertise. This helps the AI match you to the right positions. Optional."
                />
                <PredictiveSearchInput
                  placeholder="Search sectors or type your own..."
                  selected={expertise}
                  suggestions={EXPERTISE_SUGGESTIONS}
                  onAdd={(item) => setExpertise((prev) => [...prev, item])}
                  onRemove={(item) => setExpertise((prev) => prev.filter((i) => i !== item))}
                />
                <StepActions onBack={goBack} onSkip={goNext} onPrimary={goNext} primaryLabel="Next" isLast={false} />
              </div>
            </div>
          </div>

          {/* Step 3 — Recruitment domain (two-tier) */}
          <div className="w-1/4 h-full overflow-y-auto">
            <div className="h-full flex flex-col items-center justify-center px-8 py-8">
              <div className="w-full max-w-[640px] mb-8">
                <HorizontalStepper steps={stepsFor(2)} />
              </div>
              <div className="w-full max-w-[600px]">
                <StepHeading
                  title="What do you recruit for?"
                  subtitle="Pick Tech, Non-tech, or both — then narrow it down."
                />
                <div className="flex gap-3">
                  <DomainCard
                    icon={Code2}
                    label="Tech"
                    sub="Engineering, data, product & design"
                    selected={domainTop.includes('tech')}
                    onClick={() => toggleDomainTop('tech')}
                  />
                  <DomainCard
                    icon={Briefcase}
                    label="Non-tech"
                    sub="Sales, marketing, finance, ops & more"
                    selected={domainTop.includes('non-tech')}
                    onClick={() => toggleDomainTop('non-tech')}
                  />
                </div>

                {domainTop.length > 0 && (
                  <div className="mt-6 animate-in fade-in slide-in-from-bottom-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#999] font-dm-sans mb-2 text-center">
                      Narrow it down (optional)
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {domainTop.includes('tech') &&
                        TECH_SUBS.map((s) => (
                          <Chip key={s} label={s} selected={domainSub.includes(s)} onClick={() => toggleSet(setDomainSub, s)} />
                        ))}
                      {domainTop.includes('non-tech') &&
                        NONTECH_SUBS.map((s) => (
                          <Chip key={s} label={s} selected={domainSub.includes(s)} onClick={() => toggleSet(setDomainSub, s)} />
                        ))}
                      {/* Custom (typed) sub-domains */}
                      {domainSub
                        .filter((s) => !TECH_SUBS.includes(s) && !NONTECH_SUBS.includes(s))
                        .map((s) => (
                          <Chip key={s} label={s} selected onClick={() => toggleSet(setDomainSub, s)} />
                        ))}
                      {/* + Others affordance */}
                      <button
                        type="button"
                        onClick={() => setOthersOpen((v) => !v)}
                        className="px-4 py-[9px] rounded-[99px] border-[1.5px] border-dashed border-[#cbb9e8] text-[13px] font-medium font-sora text-[#7800D3] bg-white hover:bg-[#faf8ff] transition-colors"
                      >
                        + Others
                      </button>
                    </div>

                    {othersOpen && (
                      <div className="flex justify-center gap-2 mt-3 animate-in fade-in slide-in-from-bottom-1">
                        <input
                          type="text"
                          value={otherDraft}
                          onChange={(e) => setOtherDraft(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addOther(); } }}
                          placeholder="Type a domain and press Add"
                          autoFocus
                          className="w-[260px] px-3 py-[9px] border border-[#ddd] rounded-[10px] text-[12px] outline-none focus:border-[#7800D3] transition-colors"
                        />
                        <button
                          type="button"
                          onClick={addOther}
                          disabled={!otherDraft.trim()}
                          className="bg-[#7800D3] text-white rounded-[10px] px-4 py-[9px] text-[13px] font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <StepActions onBack={goBack} onSkip={goNext} onPrimary={goNext} primaryLabel="Next" isLast={false} />
              </div>
            </div>
          </div>

          {/* Step 4 — Seniority levels */}
          <div className="w-1/4 h-full overflow-y-auto">
            <div className="h-full flex flex-col items-center justify-center px-8 py-8">
              <div className="w-full max-w-[640px] mb-8">
                <HorizontalStepper steps={stepsFor(3)} />
              </div>
              <div className="w-full max-w-[600px]">
                <StepHeading
                  title="What seniority levels do you hire?"
                  subtitle="Last one — pick the levels you typically recruit for. Optional."
                />
                <div className="flex flex-wrap justify-center gap-2">
                  {SENIORITY.map(({ icon, label, sub }) => (
                    <SeniorityPill
                      key={label}
                      icon={icon}
                      label={label}
                      sub={sub}
                      selected={seniority.includes(label)}
                      onToggle={() => toggleSet(setSeniority, label)}
                    />
                  ))}
                </div>
                <StepActions onBack={goBack} onSkip={handleDone} onPrimary={handleDone} primaryLabel="All done — go to dashboard" isLast />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
}

export default RecruiterProfile;
