import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Code2, Briefcase, Users, Plus, ArrowRight, LucideIcon } from 'lucide-react';
import { PredictiveSearchInput } from '@/components/onboarding/ui/PredictiveSearchInput';
import { SeniorityPill } from '@/components/onboarding/ui/SeniorityPill';
import { ProjectCard } from '@/components/onboarding/ui/ProjectCard';
import { USPEditor } from '@/components/onboarding/ui/USPEditor';
import {
  BROAD_REGIONS, REGION_PLACES, EXPERTISE_SUGGESTIONS, TECH_SUBS, NONTECH_SUBS, SENIORITY,
} from '@/components/onboarding/recruiter/RecruiterProfile';
import { DEPTS, MOCK_PROJECTS, type Project } from '@/components/onboarding/hl/HLProfile';

const DEFAULT_USP =
  `We're a team that moves fast, ships impactful work, and genuinely cares about the people we hire. Our culture is built on transparency, ownership, and continuous learning. We believe great talent deserves great opportunities — and we work hard to make sure every new hire feels that from day one.`;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-gray-500 mb-2">
      {children}
    </label>
  );
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-[8px] rounded-[99px] border-[1.5px] text-[13px] font-medium transition-all ${
        selected
          ? 'border-[#7800D3] bg-[#EEEDFE] text-[#7800D3]'
          : 'border-gray-200 bg-white text-gray-600 hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
      }`}
    >
      {label}
    </button>
  );
}

function DomainCard({ icon: Icon, label, sub, selected, onClick }: { icon: LucideIcon; label: string; sub: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 border-[1.5px] rounded-[14px] p-[18px] text-center transition-all ${
        selected ? 'border-[#7800D3] bg-[#EEEDFE]' : 'border-gray-200 bg-white hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'
      }`}
    >
      <Icon className={`h-6 w-6 mx-auto mb-2 ${selected ? 'text-[#7800D3]' : 'text-gray-400'}`} />
      <div className={`font-sora text-[14px] font-semibold ${selected ? 'text-[#7800D3]' : 'text-gray-700'}`}>{label}</div>
      <div className={`text-[11px] mt-0.5 ${selected ? 'text-[rgba(120,0,211,0.55)]' : 'text-gray-400'}`}>{sub}</div>
    </button>
  );
}

function SaveBar({ onSave }: { onSave: () => void }) {
  return (
    <div className="pt-4 border-t border-gray-100">
      <button
        type="button"
        onClick={onSave}
        className="bg-[#7800D3] hover:opacity-90 text-white text-[13px] font-medium px-5 py-[10px] rounded-[10px] transition-opacity"
      >
        Save changes
      </button>
    </div>
  );
}

function toggle(setter: React.Dispatch<React.SetStateAction<string[]>>, label: string) {
  setter((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));
}

/* ---------------- Recruiter ---------------- */
function RecruiterProfileEditor() {
  const saved = (() => { try { return JSON.parse(localStorage.getItem('recruiterProfile') || '{}'); } catch { return {}; } })();
  const [broadRegions, setBroadRegions] = useState<string[]>(saved.broadRegions ?? []);
  const [specificLocations, setSpecificLocations] = useState<string[]>(saved.specificLocations ?? []);
  const [expertise, setExpertise] = useState<string[]>(saved.expertise ?? []);
  const [domainTop, setDomainTop] = useState<Array<'tech' | 'non-tech'>>(saved.domainTop ?? []);
  const [domainSub, setDomainSub] = useState<string[]>(saved.domainSub ?? []);
  const [seniority, setSeniority] = useState<string[]>(saved.seniority ?? []);
  const [othersOpen, setOthersOpen] = useState(false);
  const [otherDraft, setOtherDraft] = useState('');

  const specificSuggestions = Array.from(new Set(broadRegions.flatMap((r) => REGION_PLACES[r] ?? [])));

  const toggleDomainTop = (key: 'tech' | 'non-tech') => {
    setDomainTop((prev) => {
      if (prev.includes(key)) {
        const groupSubs = key === 'tech' ? TECH_SUBS : NONTECH_SUBS;
        setDomainSub((subs) => subs.filter((s) => !groupSubs.includes(s)));
        return prev.filter((k) => k !== key);
      }
      return [...prev, key];
    });
  };

  const addOther = () => {
    const v = otherDraft.trim();
    if (!v) return;
    setDomainSub((prev) => (prev.includes(v) ? prev : [...prev, v]));
    setOtherDraft('');
  };

  const handleSave = () => {
    localStorage.setItem('recruiterProfile', JSON.stringify({ broadRegions, specificLocations, expertise, domainTop, domainSub, seniority }));
    toast.success('Recruiter profile saved');
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recruiter Profile</h2>
        <p className="text-sm text-gray-500 mt-1">Update how you recruit — the AI uses this to match you to positions and build relevant briefs.</p>
      </div>

      {/* Regions */}
      <div>
        <SectionLabel>Sourcing regions</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {BROAD_REGIONS.map((r) => (
            <Chip key={r} label={r} selected={broadRegions.includes(r)} onClick={() => toggle(setBroadRegions, r)} />
          ))}
        </div>
        {broadRegions.length > 0 && (
          <div className="mt-3">
            <PredictiveSearchInput
              placeholder="Add specific countries, states, or cities..."
              selected={specificLocations}
              suggestions={specificSuggestions}
              onAdd={(item) => setSpecificLocations((p) => [...p, item])}
              onRemove={(item) => setSpecificLocations((p) => p.filter((l) => l !== item))}
            />
          </div>
        )}
      </div>

      {/* Expertise */}
      <div>
        <SectionLabel>Expertise (sectors)</SectionLabel>
        <PredictiveSearchInput
          placeholder="Search sectors or type your own..."
          selected={expertise}
          suggestions={EXPERTISE_SUGGESTIONS}
          onAdd={(item) => setExpertise((p) => [...p, item])}
          onRemove={(item) => setExpertise((p) => p.filter((i) => i !== item))}
        />
      </div>

      {/* Domain */}
      <div>
        <SectionLabel>Recruitment domain</SectionLabel>
        <div className="flex gap-3">
          <DomainCard icon={Code2} label="Tech" sub="Engineering, data, product & design" selected={domainTop.includes('tech')} onClick={() => toggleDomainTop('tech')} />
          <DomainCard icon={Briefcase} label="Non-tech" sub="Sales, marketing, finance, ops & more" selected={domainTop.includes('non-tech')} onClick={() => toggleDomainTop('non-tech')} />
        </div>
        {domainTop.length > 0 && (
          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-gray-400 mb-2">Narrow it down</p>
            <div className="flex flex-wrap gap-2">
              {domainTop.includes('tech') && TECH_SUBS.map((s) => <Chip key={s} label={s} selected={domainSub.includes(s)} onClick={() => toggle(setDomainSub, s)} />)}
              {domainTop.includes('non-tech') && NONTECH_SUBS.map((s) => <Chip key={s} label={s} selected={domainSub.includes(s)} onClick={() => toggle(setDomainSub, s)} />)}
              {domainSub.filter((s) => !TECH_SUBS.includes(s) && !NONTECH_SUBS.includes(s)).map((s) => (
                <Chip key={s} label={s} selected onClick={() => toggle(setDomainSub, s)} />
              ))}
              <button
                type="button"
                onClick={() => setOthersOpen((v) => !v)}
                className="px-4 py-[8px] rounded-[99px] border-[1.5px] border-dashed border-[#cbb9e8] text-[13px] font-medium text-[#7800D3] bg-white hover:bg-[#faf8ff] transition-colors"
              >
                + Others
              </button>
            </div>
            {othersOpen && (
              <div className="flex gap-2 mt-3">
                <input
                  value={otherDraft}
                  onChange={(e) => setOtherDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addOther(); } }}
                  placeholder="Type a domain and press Add"
                  className="w-[260px] px-3 py-[9px] border border-gray-200 rounded-[10px] text-[12px] outline-none focus:border-[#7800D3] transition-colors"
                />
                <button type="button" onClick={addOther} disabled={!otherDraft.trim()} className="bg-[#7800D3] text-white rounded-[10px] px-4 py-[9px] text-[13px] font-medium hover:opacity-90 transition-opacity disabled:opacity-40">Add</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Seniority */}
      <div>
        <SectionLabel>Seniority levels</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {SENIORITY.map(({ icon, label, sub }) => (
            <SeniorityPill key={label} icon={icon} label={label} sub={sub} selected={seniority.includes(label)} onToggle={() => toggle(setSeniority, label)} />
          ))}
        </div>
      </div>

      <SaveBar onSave={handleSave} />
    </div>
  );
}

/* ---------------- Hiring Lead ---------------- */
function HiringProfileEditor() {
  const saved = (() => { try { return JSON.parse(localStorage.getItem('hlProfile') || '{}'); } catch { return {}; } })();
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<string | null>(saved.project ?? null);
  const [selectedDept, setSelectedDept] = useState<string | null>(saved.dept ?? null);
  const [newName, setNewName] = useState('');
  const [newClient, setNewClient] = useState('');

  const addProject = () => {
    const name = newName.trim();
    if (!name) return;
    setProjects((prev) => [{ name, client: newClient.trim() || 'Internal' }, ...prev]);
    setSelectedProject(name);
    setNewName(''); setNewClient('');
  };

  const handleSave = () => {
    localStorage.setItem('hlProfile', JSON.stringify({ project: selectedProject, dept: selectedDept }));
    toast.success('Hiring profile saved');
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Hiring Profile</h2>
        <p className="text-sm text-gray-500 mt-1">Your project and department. This links positions to a project so the AI can track progress.</p>
      </div>

      <div>
        <SectionLabel>Your project</SectionLabel>
        <div className="flex gap-2 mb-3 flex-wrap">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addProject(); } }} placeholder="New project name" className="flex-1 min-w-[160px] px-3 py-[10px] border border-gray-200 rounded-[10px] text-[12px] outline-none focus:border-[#7800D3] transition-colors" />
          <input value={newClient} onChange={(e) => setNewClient(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addProject(); } }} placeholder="Client" className="w-[140px] px-3 py-[10px] border border-gray-200 rounded-[10px] text-[12px] outline-none focus:border-[#7800D3] transition-colors" />
          <button type="button" onClick={addProject} disabled={!newName.trim()} className="bg-[#7800D3] text-white rounded-[10px] px-4 py-[10px] text-[13px] font-medium inline-flex items-center gap-1 hover:opacity-90 transition-opacity disabled:opacity-40"><Plus className="h-3.5 w-3.5" />Add</button>
        </div>
        <div className="flex flex-col gap-2 max-w-md">
          {projects.map((p) => (
            <ProjectCard key={p.name} name={p.name} client={p.client} selected={selectedProject === p.name} onClick={() => setSelectedProject(selectedProject === p.name ? null : p.name)} />
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Your department</SectionLabel>
        <div className="grid grid-cols-3 gap-[10px] max-w-md">
          {DEPTS.map(({ icon: Icon, label }) => {
            const sel = selectedDept === label;
            return (
              <button key={label} type="button" onClick={() => setSelectedDept(sel ? null : label)} className={`border-[1.5px] rounded-[12px] p-[16px_10px] text-center transition-all ${sel ? 'border-[#7800D3] bg-[#EEEDFE]' : 'border-gray-200 bg-white hover:border-[rgba(120,0,211,0.3)] hover:bg-[#faf8ff]'}`}>
                <Icon className={`h-[20px] w-[20px] mx-auto mb-[6px] ${sel ? 'text-[#7800D3]' : 'text-gray-400'}`} />
                <div className={`font-sora text-[12px] font-medium ${sel ? 'text-[#7800D3]' : 'text-gray-600'}`}>{label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <SaveBar onSave={handleSave} />
    </div>
  );
}

/* ---------------- Recruitment Lead ---------------- */
function CompanyPitchEditor() {
  const navigate = useNavigate();
  const domain = localStorage.getItem('onboardingDomain') || 'yourcompany.com';
  const [usp, setUsp] = useState<string>(localStorage.getItem('companyPitch') || DEFAULT_USP);

  const handleSave = () => {
    localStorage.setItem('companyPitch', usp);
    toast.success('Company pitch saved');
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Company Pitch</h2>
        <p className="text-sm text-gray-500 mt-1">Shown to candidates in every AI-generated recruitment brief. Edit it to match your voice.</p>
      </div>

      <USPEditor domain={domain} value={usp} onChange={setUsp} />
      <SaveBar onSave={handleSave} />

      {/* Team */}
      <div className="rounded-[12px] border border-gray-100 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 p-4 flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-[#7800D3] mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Your hiring team</p>
            <p className="text-[12px] text-gray-500">Invite and manage recruiters and hiring leads.</p>
          </div>
        </div>
        <button type="button" onClick={() => navigate('/settings/members')} className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#7800D3] hover:underline shrink-0">
          Manage team <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function ProfileSettings() {
  const role = localStorage.getItem('userRole');
  if (role === 'ta-associate') return <RecruiterProfileEditor />;
  if (role === 'hiring-lead') return <HiringProfileEditor />;
  return <CompanyPitchEditor />;
}

export default ProfileSettings;
