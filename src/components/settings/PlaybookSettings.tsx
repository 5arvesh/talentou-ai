import React, { useState } from 'react';
import { BookMarked, Hash, Plus, Radio, Sparkles, Target, Trash2, UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import { getAllPlaybooks, deleteCustomPlaybook, formatClosed, type Playbook } from '@/components/position-approval/playbooks';
import { CreatePlaybookDialog } from '@/components/position-approval/CreatePlaybookDialog';

function PlaybookRow({ pb, onDelete }: { pb: Playbook; onDelete?: (id: string) => void }) {
  return (
    <div className="flex flex-col rounded-[12px] border border-gray-100 bg-white p-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-sora text-[14px] font-semibold text-gray-900 dark:text-gray-100">{pb.name}</h3>
            {pb.custom && (
              <span className="rounded-full bg-[#EEEDFE] text-[#3C3489] text-[10px] font-medium px-[7px] py-[2px]">Custom</span>
            )}
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5">{pb.context}</p>
        </div>
        {pb.custom && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(pb.id)}
            className="shrink-0 text-gray-400 hover:text-[#A32D2D] transition-colors p-1"
            title="Delete playbook"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 text-[10px] text-gray-400 mb-2">
        <span className="inline-flex items-center gap-[3px]"><Hash className="h-[10px] w-[10px]" />{pb.jobId}</span>
        <span>{formatClosed(pb.closedDaysAgo)}</span>
      </div>

      <div className="flex flex-col gap-[5px] text-[11px] text-gray-600 dark:text-gray-300">
        <span className="inline-flex items-center gap-[6px]"><UserCheck className="h-3 w-3 text-[#7800D3]" />{pb.summary.recruiter}</span>
        <span className="inline-flex items-center gap-[6px]"><Radio className="h-3 w-3 text-[#7800D3]" />{pb.summary.channels}</span>
        <span className="inline-flex items-center gap-[6px]"><Target className="h-3 w-3 text-[#7800D3]" />{pb.summary.closeDays} days to close · {pb.brief.targets.confidence}% confidence</span>
      </div>

      <div className="flex items-start gap-[5px] text-[10px] text-[#7800D3]/80 leading-[1.45] mt-2">
        <Sparkles className="h-[11px] w-[11px] shrink-0 mt-[1px]" />
        <span className="italic">{pb.diffNote}</span>
      </div>
    </div>
  );
}

export function PlaybookSettings() {
  const [createOpen, setCreateOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const playbooks = React.useMemo(() => getAllPlaybooks(), [refreshKey]);

  const handleDelete = (id: string) => {
    deleteCustomPlaybook(id);
    setRefreshKey((k) => k + 1);
    toast.success('Playbook deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-[#7800D3]" />
            Playbooks
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Reusable recruitment plans. Saved playbooks appear as suggestions when you create a plan for a new position.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-1.5 bg-[#7800D3] text-white text-[13px] font-medium px-4 py-[9px] rounded-[9px] hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          New Playbook
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {playbooks.map((pb) => (
          <PlaybookRow key={pb.id} pb={pb} onDelete={handleDelete} />
        ))}
      </div>

      <CreatePlaybookDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
}

export default PlaybookSettings;
