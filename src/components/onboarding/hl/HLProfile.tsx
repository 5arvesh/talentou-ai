import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Check, Info, Building2, Plus,
  Code2, Layout, Palette, TrendingUp, Megaphone, Settings, Receipt, Users, Wrench,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { OnboardingShell } from '../OnboardingShell';
import { HorizontalStepper } from '../HorizontalStepper';
import { ProjectCard } from '../ui/ProjectCard';
import { SkipButton } from '../ui/SkipButton';

export interface Project {
  name: string;
  client: string;
}

export const MOCK_PROJECTS: Project[] = [
  { name: 'Alpha Platform', client: 'Acme Corp' },
  { name: 'Beta Launch', client: 'TechStart' },
  { name: 'Operations Q3', client: 'GlobalOps' },
];

export const DEPTS: { icon: LucideIcon; label: string }[] = [
  { icon: Code2, label: 'Engineering' },
  { icon: Layout, label: 'Product' },
  { icon: Palette, label: 'Design' },
  { icon: TrendingUp, label: 'Sales' },
  { icon: Megaphone, label: 'Marketing' },
  { icon: Settings, label: 'Operations' },
  { icon: Receipt, label: 'Finance' },
  { icon: Users, label: 'People / HR' },
  { icon: Wrench, label: 'Other' },
];

const STEP_LABELS = ['Project', 'Department'];
const TOTAL_STEPS = STEP_LABELS.length;

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-6">
      <h1 className="font-sora text-[20px] font-semibold text-[#0e0020] mb-1">{title}</h1>
      <p className="text-[13px] text-[#888]">{subtitle}</p>
    </div>
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

export function HLProfile() {
  const navigate = useNavigate();

  const firstName = localStorage.getItem('firstName') || 'there';
  const lastName = localStorage.getItem('lastName') || '';
  const company = localStorage.getItem('tenantName') || 'Talentou';
  const initials = `${firstName[0] ?? '?'}${lastName[0] ?? ''}`.toUpperCase();

  const [stepIdx, setStepIdx] = useState(0);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newClient, setNewClient] = useState('');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const isLast = stepIdx === TOTAL_STEPS - 1;

  const addProject = () => {
    const name = newName.trim();
    if (!name) return;
    const project = { name, client: newClient.trim() || 'Internal' };
    setProjects((prev) => [project, ...prev]);
    setSelectedProject(name);
    setNewName('');
    setNewClient('');
  };

  const handleDone = () => {
    localStorage.setItem('hlProfile', JSON.stringify({ project: selectedProject, dept: selectedDept }));
    navigate('/hiring-lead/dashboard');
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
        eyebrow: "You've been invited",
        headline: "Let's get you <span class=\"text-[#c084fc]\">set up.</span>",
        body: 'Takes under a minute. This helps the AI understand your hiring context before you open your first position.',
      }}
    >
      <div className="h-full overflow-hidden">
        <div
          className="flex h-full w-[200%] transition-transform duration-[450ms] ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${stepIdx * 50}%)` }}
        >
          {/* Step 1 — Project */}
          <div className="w-1/2 h-full overflow-y-auto">
            <div className="h-full flex flex-col items-center justify-center px-8 py-8">
              <div className="w-full max-w-[640px] mb-8">
                <HorizontalStepper steps={stepsFor(0)} />
              </div>
              <div className="w-full max-w-[600px]">
                {/* Compact welcome */}
                <div className="flex items-center justify-center gap-[10px] mb-5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-sora text-[13px] font-semibold text-white shrink-0 bg-gradient-to-br from-[#185FA5] to-[#4da3f5]">
                    {initials}
                  </div>
                  <div className="text-left">
                    <p className="font-sora text-[14px] font-semibold text-[#0e0020] leading-tight">Welcome, {firstName}</p>
                    <span className="inline-flex items-center gap-[4px] text-[11px] text-[#0C447C]">
                      <Building2 className="h-3 w-3" />
                      Hiring Lead · {company}
                    </span>
                  </div>
                </div>

                <StepHeading
                  title="Which project are you hiring for?"
                  subtitle="Pick an existing project or create a new one. Optional — you can skip."
                />

                {/* Create your own project */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addProject(); } }}
                    placeholder="New project name"
                    className="flex-1 min-w-[160px] px-3 py-[10px] border border-[#ddd] rounded-[10px] text-[12px] outline-none focus:border-[#7800D3] transition-colors"
                  />
                  <input
                    type="text"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addProject(); } }}
                    placeholder="Client"
                    className="w-[140px] px-3 py-[10px] border border-[#ddd] rounded-[10px] text-[12px] outline-none focus:border-[#7800D3] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addProject}
                    disabled={!newName.trim()}
                    className="bg-[#7800D3] text-white rounded-[10px] px-4 py-[10px] text-[13px] font-medium whitespace-nowrap hover:opacity-90 transition-opacity inline-flex items-center gap-1 shrink-0 disabled:opacity-40"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </button>
                </div>

                {/* Project list */}
                <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {projects.map((p) => (
                    <ProjectCard
                      key={p.name}
                      name={p.name}
                      client={p.client}
                      selected={selectedProject === p.name}
                      onClick={() => setSelectedProject(selectedProject === p.name ? null : p.name)}
                    />
                  ))}
                </div>

                {/* Purpose note */}
                <div className="mt-3 flex items-start gap-2 bg-[#faf8ff] border border-[#e8e4f0] rounded-[10px] p-3">
                  <Info className="h-3.5 w-3.5 text-[#7800D3] shrink-0 mt-px" />
                  <p className="text-[12px] text-[#888] leading-[1.55]">
                    A project groups the roles you're hiring for a specific client, so the AI can track progress across them and link every candidate to the right client.
                  </p>
                </div>

                <StepActions onBack={goBack} onSkip={goNext} onPrimary={goNext} primaryLabel="Next" isLast={false} />
              </div>
            </div>
          </div>

          {/* Step 2 — Department */}
          <div className="w-1/2 h-full overflow-y-auto">
            <div className="h-full flex flex-col items-center justify-center px-8 py-8">
              <div className="w-full max-w-[640px] mb-8">
                <HorizontalStepper steps={stepsFor(1)} />
              </div>
              <div className="w-full max-w-[600px]">
                <StepHeading
                  title="Which department are you hiring for?"
                  subtitle="This helps the AI tailor briefs to your team. Optional."
                />
                <div className="grid grid-cols-3 gap-[10px]">
                  {DEPTS.map(({ icon: Icon, label }) => {
                    const isSelected = selectedDept === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedDept(isSelected ? null : label)}
                        className={`border-[1.5px] rounded-[12px] p-[18px_10px] text-center cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#7800D3] bg-[#EEEDFE]'
                            : 'border-[#eee] bg-white hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
                        }`}
                      >
                        <Icon className={`h-[22px] w-[22px] mx-auto mb-[7px] ${isSelected ? 'text-[#7800D3]' : 'text-[#bbb]'}`} />
                        <div className={`font-sora text-[12px] font-medium ${isSelected ? 'text-[#7800D3]' : 'text-[#555]'}`}>
                          {label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <StepActions onBack={goBack} onSkip={handleDone} onPrimary={handleDone} primaryLabel="Go to dashboard" isLast />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
}

export default HLProfile;
