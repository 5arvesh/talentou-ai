import React, { useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ApprovalMethod = 'auto' | 'manual';

interface ApprovalHistoryRow {
  id: string;
  positionTitle: string;
  approvingTALeader: string;
  timestamp: string;
  method: ApprovalMethod;
}

const APPROVAL_HISTORY: ApprovalHistoryRow[] = [
  { id: '1', positionTitle: 'Senior React Developer', approvingTALeader: 'Arjun Mehta', timestamp: 'Today, 2:30 PM', method: 'auto' },
  { id: '2', positionTitle: 'Data Engineer', approvingTALeader: 'Arjun Mehta', timestamp: 'Yesterday, 4:15 PM', method: 'auto' },
  { id: '3', positionTitle: 'UX Designer', approvingTALeader: 'Divya Nair', timestamp: '2 days ago, 11:00 AM', method: 'manual' },
  { id: '4', positionTitle: 'Backend Developer', approvingTALeader: 'Arjun Mehta', timestamp: '5 days ago, 9:45 AM', method: 'manual' },
  { id: '5', positionTitle: 'QA Engineer', approvingTALeader: 'Divya Nair', timestamp: '1 week ago, 3:20 PM', method: 'manual' },
];

const METHOD_BADGE: Record<ApprovalMethod, { label: string; className: string; icon: typeof Sparkles }> = {
  auto: { label: 'AI-handled', className: 'bg-[#0e0020] text-[#c084fc]', icon: Sparkles },
  manual: { label: 'Manually approved', className: 'bg-success/10 text-success', icon: CheckCircle2 },
};

export function ApprovalHistorySettings() {
  const [methodFilter, setMethodFilter] = useState<'all' | ApprovalMethod>('all');

  const rows = APPROVAL_HISTORY.filter((row) => methodFilter === 'all' || row.method === methodFilter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-1">Approval History</h2>
        <p className="text-sm text-gray-500">
          A record of every position-approval decision, whether handled automatically by AI or reviewed manually.
        </p>
      </div>

      <div className="flex items-center justify-end">
        <Select value={methodFilter} onValueChange={(v) => setMethodFilter(v as 'all' | ApprovalMethod)}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter by method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All methods</SelectItem>
            <SelectItem value="auto">Auto</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position Title</TableHead>
              <TableHead>Approving TA Leader</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const badge = METHOD_BADGE[row.method];
              const Icon = badge.icon;
              return (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-foreground">{row.positionTitle}</TableCell>
                  <TableCell className="text-muted-foreground">{row.approvingTALeader}</TableCell>
                  <TableCell className="text-muted-foreground">{row.timestamp}</TableCell>
                  <TableCell>
                    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium', badge.className)}>
                      <Icon className="h-3 w-3" />
                      {badge.label}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-6 text-center text-sm text-muted-foreground">
                  No approvals match this filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ApprovalHistorySettings;
