import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookMarked, Briefcase, Hash, Plus, Radio, Search, Sparkles, Target, UserCheck,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { cn } from '@/lib/utils';
import { getAllPlaybooks, formatClosed, type Playbook } from '@/components/position-approval/playbooks';
import { CreatePlaybookDialog } from '@/components/position-approval/CreatePlaybookDialog';

interface LibraryState {
  fromPosition?: boolean;
  positionTitle?: string;
}

function matchBadgeClass(pct: number) {
  if (pct >= 85) return 'bg-[#EAF3DE] text-[#27500A]';
  if (pct >= 70) return 'bg-[#FAEEDA] text-[#633806]';
  return 'bg-[#F1EFE8] text-[#444441]';
}

// Distinct filter chips derived from the playbook tags
const FILTERS = ['Engineering', 'Senior', 'Mid', 'Leadership', 'Bangalore', 'Pune', 'Remote'];

function PlaybookCard({
  pb,
  showMatch,
  onUse,
}: {
  pb: Playbook;
  showMatch: boolean;
  onUse: (pb: Playbook) => void;
}) {
  return (
    <div className="flex flex-col rounded-[14px] border-[0.5px] border-border bg-card p-[18px] hover:border-[rgba(120,0,211,0.35)] hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-sora text-[14px] font-semibold text-foreground leading-snug">{pb.name}</h3>
        {showMatch && (
          <span className={cn('shrink-0 rounded-full text-[10px] font-semibold px-[8px] py-[3px]', matchBadgeClass(pb.matchPct))}>
            {pb.matchPct}% match
          </span>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground mb-2">{pb.context}</p>

      {/* Job ID + closed-ago */}
      <div className="flex flex-wrap items-center gap-x-3 text-[10px] text-muted-foreground/80 mb-3">
        <span className="inline-flex items-center gap-[3px]">
          <Hash className="h-[10px] w-[10px]" />
          {pb.jobId}
        </span>
        <span>{formatClosed(pb.closedDaysAgo)}</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {pb.tags.map((t) => (
          <span key={t} className="rounded-full bg-[#EEEDFE] text-[#3C3489] text-[10px] font-medium px-[7px] py-[2px]">
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-[6px] text-[11px] text-muted-foreground mb-3">
        <span className="inline-flex items-center gap-[6px]">
          <UserCheck className="h-3 w-3 text-[#7800D3] shrink-0" />
          {pb.summary.recruiter}
        </span>
        <span className="inline-flex items-center gap-[6px]">
          <Radio className="h-3 w-3 text-[#7800D3] shrink-0" />
          {pb.summary.channels}
        </span>
        <span className="inline-flex items-center gap-[6px]">
          <Target className="h-3 w-3 text-[#7800D3] shrink-0" />
          {pb.summary.closeDays} days to close · {pb.brief.targets.confidence}% confidence
        </span>
      </div>

      {/* AI diff note */}
      <div className="flex items-start gap-[5px] text-[10px] text-[#7800D3]/80 leading-[1.45] mb-4">
        <Sparkles className="h-[11px] w-[11px] shrink-0 mt-[1px]" />
        <span className="italic">{pb.diffNote}</span>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">{pb.usageNote}</span>
        <button
          type="button"
          onClick={() => onUse(pb)}
          className="inline-flex items-center gap-1.5 bg-[#7800D3] text-white text-[11px] font-medium px-3 py-[7px] rounded-[9px] hover:opacity-90 transition-opacity"
        >
          Use this Playbook
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export function PlaybookLibraryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LibraryState) ?? {};
  const showMatch = !!state.fromPosition;

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const playbooks = useMemo(() => {
    const all = getAllPlaybooks();
    const base = showMatch ? [...all].sort((a, b) => b.matchPct - a.matchPct) : all;
    const q = query.trim().toLowerCase();
    return base.filter((pb) => {
      const matchesQuery =
        !q ||
        pb.name.toLowerCase().includes(q) ||
        pb.tags.some((t) => t.toLowerCase().includes(q)) ||
        pb.context.toLowerCase().includes(q);
      const matchesFilter = !activeFilter || pb.tags.includes(activeFilter);
      return matchesQuery && matchesFilter;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeFilter, showMatch, refreshKey]);

  const handleUse = (pb: Playbook) => {
    navigate('/notifications/new-position', { state: { applyPlaybookId: pb.id } });
  };

  return (
    <Layout>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 border-b border-border bg-background px-6 py-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to position
          </button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <BookMarked className="h-[18px] w-[18px] text-[#7800D3]" />
                <h1 className="font-sora text-[19px] font-semibold text-foreground">Playbook Library</h1>
              </div>
              <p className="text-[12px] text-muted-foreground mt-1">
                Reusable Recruitment Plans from past positions. Pick one to start your brief, then adjust what's different.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {state.positionTitle && (
                <span className="inline-flex items-center gap-[6px] bg-[#EEEDFE] text-[#3C3489] rounded-full text-[11px] px-[10px] py-[5px]">
                  <Briefcase className="h-3 w-3" />
                  Matching for: {state.positionTitle}
                </span>
              )}
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className="inline-flex items-center gap-1.5 bg-[#7800D3] text-white text-[12px] font-medium px-3 py-[8px] rounded-[9px] hover:opacity-90 transition-opacity"
              >
                <Plus className="h-3.5 w-3.5" />
                New Playbook
              </button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="shrink-0 border-b border-border bg-background px-6 py-3 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px] max-w-[360px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by role, skill, or location…"
              className="w-full pl-9 pr-3 py-[9px] border-[0.5px] border-border rounded-[10px] text-[12px] outline-none bg-muted/30 focus:border-[#7800D3] focus:bg-background transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(isActive ? null : f)}
                  className={cn(
                    'rounded-full text-[11px] font-medium px-[11px] py-[5px] border-[0.5px] transition-colors',
                    isActive
                      ? 'bg-[#0e0020] text-[#c084fc] border-[#0e0020]'
                      : 'bg-transparent text-muted-foreground border-border hover:border-[rgba(120,0,211,0.35)] hover:text-foreground'
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-6 py-5 bg-muted/10">
          {playbooks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <BookMarked className="h-7 w-7 text-muted-foreground/50 mb-2" />
              <p className="text-[13px] font-medium text-foreground">No Playbooks match your search</p>
              <p className="text-[12px] text-muted-foreground mt-1">Try a different keyword or clear the filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-w-[1200px]">
              {playbooks.map((pb) => (
                <PlaybookCard key={pb.id} pb={pb} showMatch={showMatch} onUse={handleUse} />
              ))}
            </div>
          )}
        </div>
      </div>

      <CreatePlaybookDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={() => setRefreshKey((k) => k + 1)}
      />
    </Layout>
  );
}

export default PlaybookLibraryPage;
