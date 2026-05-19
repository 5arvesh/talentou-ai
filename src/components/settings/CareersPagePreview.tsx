import React from 'react';
import { Search } from 'lucide-react';

interface DesignSettings {
  template: string;
  theme: { primary: string; secondary: string; background: string; text: string; heading: string };
  fontFamily: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  showSearch: boolean;
  showFilters: boolean;
  showLocation: boolean;
  showDepartment: boolean;
  showJobType: boolean;
}

const MOCK_JOBS = [
  { title: 'Senior React Developer', type: 'Full-time', experience: '4–6 years', skills: ['React', 'TypeScript', 'Node.js'] },
  { title: 'Product Manager', type: 'Full-time', experience: '5+ years', skills: ['Strategy', 'Analytics', 'Agile'] },
  { title: 'Data Scientist', type: 'Remote', experience: '3+ years', skills: ['Python', 'ML', 'SQL'] },
];

interface CareersPagePreviewProps {
  settings: DesignSettings;
}

export function CareersPagePreview({ settings }: CareersPagePreviewProps) {
  const { theme, welcomeTitle, welcomeSubtitle, showSearch, template, fontFamily } = settings;

  const renderJobCard = (job: typeof MOCK_JOBS[0], i: number) => {
    if (template === 'compact-table') {
      return (
        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 text-xs">
          <span className="font-medium" style={{ color: theme.heading }}>{job.title}</span>
          <span className="text-gray-400">{job.type}</span>
          <span className="text-gray-400">{job.experience}</span>
          <button className="px-2 py-0.5 rounded text-white text-[10px]" style={{ backgroundColor: theme.primary }}>Apply</button>
        </div>
      );
    }
    if (template === 'minimal') {
      return (
        <div key={i} className="py-2 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium" style={{ color: theme.heading }}>{job.title}</span>
            <span className="text-[10px] text-gray-400">{job.type}</span>
          </div>
        </div>
      );
    }
    if (template === 'magazine' && i === 0) {
      return (
        <div key={i} className="col-span-2 rounded-lg p-4 mb-2" style={{ backgroundColor: theme.primary + '20' }}>
          <p className="text-xs font-bold" style={{ color: theme.heading }}>{job.title}</p>
          <div className="flex gap-1 mt-1 flex-wrap">
            {job.skills.map((s) => <span key={s} className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{s}</span>)}
          </div>
        </div>
      );
    }
    return (
      <div key={i} className="rounded-lg border border-gray-100 p-3 shadow-sm" style={{ backgroundColor: theme.background }}>
        <p className="text-xs font-semibold mb-1" style={{ color: theme.heading }}>{job.title}</p>
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[9px] px-1.5 py-0.5 rounded-full border" style={{ color: theme.secondary, borderColor: theme.secondary + '40' }}>{job.type}</span>
          <span className="text-[9px] text-gray-400">{job.experience}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {job.skills.map((s) => <span key={s} className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{s}</span>)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground italic">This is how your careers widget will appear on your website</p>
      <div
        className="border border-gray-200 rounded-xl shadow-sm overflow-hidden max-h-[420px] overflow-y-auto"
        style={{ backgroundColor: theme.background, fontFamily }}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100" style={{ backgroundColor: theme.primary + '15' }}>
          <h2 className="text-base font-bold mb-1" style={{ color: theme.heading, fontFamily }}>
            {welcomeTitle || 'Join Our Team'}
          </h2>
          <p className="text-xs" style={{ color: theme.text }}>
            {welcomeSubtitle || 'Explore open positions and find your next opportunity'}
          </p>
          {showSearch && (
            <div className="mt-3 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
              <Search className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-400">Search jobs…</span>
            </div>
          )}
        </div>

        {/* Job list */}
        <div className={`p-4 ${template === 'card-grid' || template === 'magazine' ? 'grid grid-cols-2 gap-3' : 'space-y-2'}`}>
          {MOCK_JOBS.map((job, i) => renderJobCard(job, i))}
        </div>
      </div>
    </div>
  );
}
