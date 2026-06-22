import React, { useState } from 'react';
import { toast } from 'sonner';
import { BookMarked } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addCustomPlaybook, type Playbook } from './playbooks';
import type { Brief } from '@/context/PositionApprovalContext';

interface CreatePlaybookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

const EMPTY = {
  name: '',
  department: 'Engineering',
  experience: '',
  location: '',
  tags: '',
  recruiter: '',
  channels: '',
  closeDays: '40',
  confidence: '75',
  note: '',
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || 'NA';
}

export function CreatePlaybookDialog({ open, onOpenChange, onCreated }: CreatePlaybookDialogProps) {
  const [form, setForm] = useState({ ...EMPTY });

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const reset = () => setForm({ ...EMPTY });

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error('Give your playbook a name');
      return;
    }
    const closeDays = parseInt(form.closeDays, 10) || 40;
    const confidence = parseInt(form.confidence, 10) || 75;
    const channelNames = form.channels.split(',').map((c) => c.trim()).filter(Boolean);
    const tagList = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
    const recruiterName = form.recruiter.trim() || 'Unassigned';
    const context = [form.department, form.experience, form.location].filter(Boolean).join(' · ') || 'Custom role';

    const brief: Brief = {
      usp: `Reusable recruitment plan saved for ${form.department || 'future'} roles like ${form.name.trim()}.`,
      talentPool: {
        locations: form.location ? form.location.split(/[,/]/).map((l) => l.trim()).filter(Boolean) : ['Bangalore'],
        industries: tagList.length ? tagList : ['SaaS / B2B'],
      },
      channels: (channelNames.length ? channelNames : ['LinkedIn Recruiter', 'Employee Referrals']).map((name, i) => ({
        rank: i + 1,
        name,
        yield: (i < 2 ? 'high' : 'medium') as Brief['channels'][number]['yield'],
      })),
      recruiter: {
        id: `rec-${Date.now()}`,
        name: recruiterName,
        title: 'Recruiter',
        initials: initials(recruiterName),
        bandwidthPct: 60,
        activeReqs: 1,
        closesCount: 0,
        avgCloseDays: closeDays,
        aiPick: false,
        otherActivePositions: [],
        planSteps: [
          `Lead with ${channelNames[0] ?? 'LinkedIn'} for ${form.department || 'this'} candidates.`,
          'Run referrals in parallel to widen the pool.',
          'Screen and shortlist against the role requirements.',
        ],
      },
      targets: { closeDays, dailySourcingGoal: 4, confidence },
      relatedJobId: '3',
    };

    const pb: Playbook = {
      id: `custom-${Date.now()}`,
      name: form.name.trim(),
      context,
      usageNote: 'Custom playbook · added just now',
      jobId: `CUSTOM-${Math.floor(1000 + Math.random() * 9000)}`,
      closedDaysAgo: 0,
      diffNote: form.note.trim() || `Your saved playbook for ${context}.`,
      matchPct: 70,
      tags: tagList.length ? tagList : [form.department].filter(Boolean),
      summary: {
        recruiter: recruiterName,
        channels: channelNames.slice(0, 2).join(' + ') || 'LinkedIn + Referrals',
        closeDays,
      },
      brief,
      custom: true,
    };

    addCustomPlaybook(pb);
    toast.success(`Playbook "${pb.name}" saved`);
    reset();
    onCreated?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o); }}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookMarked className="h-4 w-4 text-[#7800D3]" />
            New Playbook
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-1 max-h-[60vh] overflow-y-auto pr-1">
          <div className="grid gap-1.5">
            <Label className="text-[12px]">Playbook name *</Label>
            <Input value={form.name} onChange={set('name')} placeholder="e.g. Senior Backend Engineer" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-1.5">
              <Label className="text-[12px]">Department</Label>
              <Input value={form.department} onChange={set('department')} placeholder="Engineering" />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-[12px]">Experience</Label>
              <Input value={form.experience} onChange={set('experience')} placeholder="5–8 yrs" />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-[12px]">Location</Label>
              <Input value={form.location} onChange={set('location')} placeholder="Bangalore" />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label className="text-[12px]">Tags (comma-separated)</Label>
            <Input value={form.tags} onChange={set('tags')} placeholder="Engineering, Senior, Bangalore" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label className="text-[12px]">Primary recruiter</Label>
              <Input value={form.recruiter} onChange={set('recruiter')} placeholder="Rohan Kapoor" />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-[12px]">Channels (comma-separated)</Label>
              <Input value={form.channels} onChange={set('channels')} placeholder="LinkedIn Recruiter, GitHub Jobs" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label className="text-[12px]">Target close (days)</Label>
              <Input type="number" value={form.closeDays} onChange={set('closeDays')} />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-[12px]">Confidence (%)</Label>
              <Input type="number" value={form.confidence} onChange={set('confidence')} />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label className="text-[12px]">Note / what this playbook is for</Label>
            <Textarea
              value={form.note}
              onChange={set('note')}
              rows={3}
              placeholder="Built for senior backend hires in Bangalore; strong referral + LinkedIn mix."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-[#7800D3] hover:bg-[#7800D3]/90 text-white" onClick={handleSave}>Save Playbook</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePlaybookDialog;
