import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Mail, MessageSquare, Phone, Clock, Star, Search, ArrowLeft, Info, GripVertical, Ban } from 'lucide-react';
import { RoleType } from '@/components/shared/ModernJobList';
import { getAvatarColor, getInitials } from '@/lib/avatar';
import { cn } from '@/lib/utils';

type Stage = 'Applied/Sourced' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected';

interface KanbanCandidate {
  id: string;
  name: string;
  title: string;
  company: string;
  experience: string;
  location: string;
  fitScore: number;
  fitLabel: 'Good Fit' | 'Strong Fit' | 'Excellent Fit';
  daysAdded: number;
  daysInStage: number;
  stage: Stage;
}

// First four columns are the happy-path pipeline; Rejected is a non-sequential exit column,
// not "the next step" after Selected — reachable from any of the first three stages.
const PIPELINE_STAGES: Stage[] = ['Applied/Sourced', 'Shortlisted', 'Interview', 'Selected'];
const COLUMN_ORDER: Stage[] = [...PIPELINE_STAGES, 'Rejected'];

function isTransitionAllowed(from: Stage, to: Stage): { allowed: boolean; reason?: string } {
  if (from === to) return { allowed: true };

  if (to === 'Rejected') {
    if (from === 'Selected') {
      return { allowed: false, reason: 'Selected is a terminal stage and cannot be rejected from here.' };
    }
    return { allowed: true };
  }
  if (from === 'Rejected') {
    return { allowed: false, reason: 'Rejected is a terminal stage — this candidate cannot be moved back into the pipeline.' };
  }
  if (from === 'Selected') {
    return { allowed: false, reason: 'Selected is a terminal stage.' };
  }

  // Both forward and backward moves among the happy-path stages are freely allowed.
  return { allowed: true };
}

const INITIAL_CANDIDATES: KanbanCandidate[] = [
  { id: 'c1', name: 'Arun Sharma', title: 'Senior Frontend Dev', company: 'Infosys', experience: '6y', location: 'Bangalore', fitScore: 88, fitLabel: 'Excellent Fit', daysAdded: 12, daysInStage: 2, stage: 'Applied/Sourced' },
  { id: 'c2', name: 'Priya Nair', title: 'React Developer', company: 'Wipro', experience: '4y', location: 'Pune', fitScore: 74, fitLabel: 'Strong Fit', daysAdded: 8, daysInStage: 4, stage: 'Applied/Sourced' },
  { id: 'c3', name: 'Vikram Patel', title: 'Full Stack Engineer', company: 'TCS', experience: '5y', location: 'Mumbai', fitScore: 61, fitLabel: 'Good Fit', daysAdded: 15, daysInStage: 11, stage: 'Applied/Sourced' },
  { id: 'c4', name: 'Sneha Reddy', title: 'Frontend Architect', company: 'HCL', experience: '7y', location: 'Hyderabad', fitScore: 91, fitLabel: 'Excellent Fit', daysAdded: 10, daysInStage: 3, stage: 'Shortlisted' },
  { id: 'c5', name: 'Rahul Verma', title: 'UI Engineer', company: 'Tech Mahindra', experience: '4y', location: 'Chennai', fitScore: 70, fitLabel: 'Strong Fit', daysAdded: 18, daysInStage: 11, stage: 'Shortlisted' },
  { id: 'c6', name: 'Deepa Menon', title: 'React Native Dev', company: 'Capgemini', experience: '5y', location: 'Kochi', fitScore: 65, fitLabel: 'Good Fit', daysAdded: 20, daysInStage: 6, stage: 'Shortlisted' },
  { id: 'c7', name: 'Karan Singh', title: 'Senior Dev', company: 'Accenture', experience: '6y', location: 'Delhi', fitScore: 82, fitLabel: 'Excellent Fit', daysAdded: 7, daysInStage: 2, stage: 'Interview' },
  { id: 'c8', name: 'Meera Joshi', title: 'Tech Lead', company: 'Mindtree', experience: '8y', location: 'Bangalore', fitScore: 77, fitLabel: 'Strong Fit', daysAdded: 9, daysInStage: 1, stage: 'Interview' },
  { id: 'c9', name: 'Ankit Gupta', title: 'Principal Engineer', company: 'Mphasis', experience: '9y', location: 'Pune', fitScore: 94, fitLabel: 'Excellent Fit', daysAdded: 5, daysInStage: 0, stage: 'Selected' },
  { id: 'c10', name: 'Ritu Desai', title: 'Backend Developer', company: 'Cognizant', experience: '3y', location: 'Ahmedabad', fitScore: 38, fitLabel: 'Good Fit', daysAdded: 22, daysInStage: 14, stage: 'Rejected' },
  { id: 'c11', name: 'Suresh Iyer', title: 'DevOps Engineer', company: 'L&T Infotech', experience: '4y', location: 'Chennai', fitScore: 29, fitLabel: 'Good Fit', daysAdded: 30, daysInStage: 20, stage: 'Rejected' },
];

const COLUMNS: { id: Stage; label: string; color: string; headerColor: string }[] = [
  { id: 'Applied/Sourced', label: 'Applied/Sourced', color: 'bg-blue-50',   headerColor: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'Shortlisted',     label: 'Shortlisted',     color: 'bg-amber-50',  headerColor: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'Interview',       label: 'Interview',       color: 'bg-orange-50', headerColor: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'Selected',        label: 'Selected',        color: 'bg-green-50',  headerColor: 'bg-green-100 text-green-600 border-green-200' },
  { id: 'Rejected',        label: 'Rejected',        color: 'bg-gray-50',   headerColor: 'bg-gray-100 text-gray-600 border-gray-200' },
];

const FIT_LABEL_CONFIG: Record<string, string> = {
  'Good Fit': 'bg-orange-50 text-orange-700 border-orange-200',
  'Strong Fit': 'bg-blue-50 text-blue-700 border-blue-200',
  'Excellent Fit': 'bg-green-50 text-green-600 border-green-200',
};

const STALLED_THRESHOLD_DAYS = 10;

// Droppable column wrapper — registers the column as a dnd-kit drop target
function DroppableColumn({ id, children, className }: { id: string; children: React.ReactNode; className: string }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${className} ${isOver ? 'ring-2 ring-primary/30 ring-inset' : ''}`}>
      {children}
    </div>
  );
}

function CandidateCard({
  candidate,
  isDragging,
  role,
  onRejectClick,
}: {
  candidate: KanbanCandidate;
  isDragging?: boolean;
  role: RoleType;
  onRejectClick: (candidate: KanbanCandidate) => void;
}) {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: candidate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const isStalled = candidate.daysInStage >= STALLED_THRESHOLD_DAYS;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-action-btn]')) return;
    const base = role === 'ta-leader' ? '/sales-plan' : role === 'recruiter' ? '/ta-associate' : '/hiring-lead';
    navigate(`${base}/candidate-profile/${candidate.id}`);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        data-tour-id="kanban-candidate-card"
        className={`mb-2 border shadow-sm hover:shadow-md transition-all cursor-pointer select-none ${isStalled ? 'border-amber-300 ring-1 ring-amber-200' : 'border-border'}`}
        onClick={handleCardClick}
      >
        <CardContent className="p-3">
          {/* Avatar + Name + drag handle */}
          <div className="flex items-start gap-2 mb-2">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(candidate.name)} flex items-center justify-center shrink-0`}>
              <span className="text-xs font-bold text-white">{getInitials(candidate.name)}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-snug truncate">{candidate.name}</p>
              <p className="text-xs text-muted-foreground truncate">{candidate.title} · {candidate.company}</p>
              <p className={cn("text-[10px] mt-0.5", isStalled ? "text-warning font-medium" : "text-muted-foreground")}>
                {candidate.daysInStage}d in stage
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {isStalled && (
                <div title={`Stalled for ${candidate.daysInStage} days`}>
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                </div>
              )}
              {/* Drag handle — only this element triggers drag */}
              <div
                {...attributes}
                {...listeners}
                data-action-btn
                data-tour-id="kanban-drag-handle"
                className="p-0.5 rounded cursor-grab active:cursor-grabbing hover:bg-muted transition-colors"
                title="Drag to move"
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground/40" />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1 mb-2">
            <Badge variant="outline" className="text-xs px-1.5 py-0">{candidate.experience} exp</Badge>
            <Badge variant="outline" className="text-xs px-1.5 py-0">{candidate.location}</Badge>
          </div>

          {/* Fit Score + Fit Label */}
          <div data-tour-id="kanban-fit-score" className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-500" />
              <span className="text-xs font-semibold">{candidate.fitScore}</span>
            </div>
            <Badge variant="outline" className={`text-xs px-1.5 py-0 ${FIT_LABEL_CONFIG[candidate.fitLabel]}`}>
              {candidate.fitLabel}
            </Badge>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground">{candidate.daysAdded}d ago</span>
            <div className="flex items-center gap-1.5" data-action-btn>
              <button className="p-1 rounded hover:bg-muted transition-colors" onClick={(e) => e.stopPropagation()} title="Email">
                <Mail className="h-3 w-3 text-muted-foreground" />
              </button>
              <button className="p-1 rounded hover:bg-muted transition-colors" onClick={(e) => e.stopPropagation()} title="Message">
                <MessageSquare className="h-3 w-3 text-muted-foreground" />
              </button>
              <button className="p-1 rounded hover:bg-muted transition-colors" onClick={(e) => e.stopPropagation()} title="Call">
                <Phone className="h-3 w-3 text-muted-foreground" />
              </button>
              {candidate.stage !== 'Rejected' && candidate.stage !== 'Selected' && (
                <button
                  className="p-1 rounded hover:bg-destructive/10 transition-colors"
                  onClick={(e) => { e.stopPropagation(); onRejectClick(candidate); }}
                  title="Reject"
                >
                  <Ban className="h-3 w-3 text-destructive/70" />
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface KanbanBoardProps {
  jobId: string;
  role?: RoleType;
  embedded?: boolean;
}

const JOB_TITLES: Record<string, string> = {
  '1': 'Senior React Developer',
  '2': 'Product Manager',
  '3': 'Data Scientist',
  '4': 'DevOps Engineer',
  '5': 'UX Designer',
  '6': 'QA Engineer',
};

const JOB_DAYS_OPEN: Record<string, number> = {
  '1': 14, '2': 21, '3': 9, '4': 30, '5': 18, '6': 7,
};

export function KanbanBoard({ jobId, role = 'hiring-lead', embedded = false }: KanbanBoardProps) {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<KanbanCandidate[]>(INITIAL_CANDIDATES);
  const [search, setSearch] = useState('');
  const [fitFilter, setFitFilter] = useState('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState(jobId);

  const [pendingSelect, setPendingSelect] = useState<KanbanCandidate | null>(null);
  const [pendingReject, setPendingReject] = useState<KanbanCandidate | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const jobTitle = JOB_TITLES[selectedJobId] || `Job #${selectedJobId}`;
  const daysOpen = JOB_DAYS_OPEN[selectedJobId] || 0;
  const backRoute = role === 'ta-leader' ? '/sales-plan/jobs' : role === 'recruiter' ? '/ta-associate/jobs' : '/hiring-lead/jobs';
  const jdRoute = role === 'ta-leader' ? `/sales-plan/jd/${selectedJobId}` : role === 'recruiter' ? `/ta-associate/jd/${selectedJobId}` : `/hiring-lead/jd/${selectedJobId}`;

  const filtered = candidates.filter((c) => {
    const matchSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase());
    const matchFit = fitFilter === 'all' || c.fitLabel === fitFilter;
    return matchSearch && matchFit;
  });

  const getColumnCandidates = (stage: Stage) => filtered.filter((c) => c.stage === stage);

  const totalCandidates = candidates.length;
  const showJdNudge = daysOpen > 14 && totalCandidates < 3;

  const moveCandidate = (candidateId: string, targetStage: Stage) => {
    setCandidates((prev) =>
      prev.map((c) => c.id === candidateId ? { ...c, stage: targetStage, daysInStage: 0 } : c)
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const draggedId = active.id as string;
    const overId = over.id as string;
    const dragged = candidates.find((c) => c.id === draggedId);
    if (!dragged) return;

    const isOverColumn = COLUMNS.some((col) => col.id === overId);
    const overCard = candidates.find((c) => c.id === overId);

    let targetStage: Stage | undefined;
    if (isOverColumn) {
      targetStage = overId as Stage;
    } else if (overCard) {
      targetStage = overCard.stage;
    }

    if (!targetStage || targetStage === dragged.stage) return;

    const { allowed, reason } = isTransitionAllowed(dragged.stage, targetStage);
    if (!allowed) {
      if (reason) toast.error(reason, { duration: 4000 });
      return;
    }

    // Selected and Rejected are terminal/exit moves — gate on a confirm/reason dialog
    // rather than committing immediately; the card only moves once the dialog resolves.
    if (targetStage === 'Selected') {
      setPendingSelect(dragged);
      return;
    }
    if (targetStage === 'Rejected') {
      setPendingReject(dragged);
      setRejectReason('');
      return;
    }

    moveCandidate(draggedId, targetStage);
  };

  const confirmSelect = () => {
    if (!pendingSelect) return;
    moveCandidate(pendingSelect.id, 'Selected');
    setPendingSelect(null);
  };

  const confirmReject = () => {
    if (!pendingReject || !rejectReason.trim()) return;
    moveCandidate(pendingReject.id, 'Rejected');
    setPendingReject(null);
    setRejectReason('');
  };

  const activeCandidate = activeId ? candidates.find((c) => c.id === activeId) : null;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
        {embedded ? (
          <div className="flex items-center gap-3">
            <Select value={selectedJobId} onValueChange={setSelectedJobId}>
              <SelectTrigger data-tour-id="kanban-job-selector" className="w-[220px] h-9 text-sm font-medium">
                <SelectValue placeholder="Select a job" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(JOB_TITLES).map(([id, title]) => (
                  <SelectItem key={id} value={id}>{title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground hidden sm:block">Pipeline · {daysOpen} days open</p>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(backRoute)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-foreground">{jobTitle}</h1>
              <p className="text-xs text-muted-foreground">Candidate Pipeline · {daysOpen} days open</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search candidates…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
          <Select value={fitFilter} onValueChange={setFitFilter}>
            <SelectTrigger className="w-[140px] h-8 text-sm">
              <SelectValue placeholder="Filter by fit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fit Levels</SelectItem>
              <SelectItem value="Excellent Fit">Excellent Fit</SelectItem>
              <SelectItem value="Strong Fit">Strong Fit</SelectItem>
              <SelectItem value="Good Fit">Good Fit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showJdNudge && (
        <div className="mx-6 mt-4 flex items-start gap-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
          <Info className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-700">
            This role may benefit from reviewing the job description — it has been open {daysOpen} days with few candidates.{' '}
            <button className="underline font-medium" onClick={() => navigate(jdRoute)}>
              Review JD
            </button>
          </p>
        </div>
      )}

      {/* Kanban columns */}
      <div data-tour-id="kanban-columns" className="flex-1 overflow-x-auto p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={(e) => setActiveId(e.active.id as string)}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 h-full min-h-0" style={{ minWidth: '900px' }}>
            {COLUMNS.map((col) => {
              const colCandidates = getColumnCandidates(col.id);
              return (
                <div key={col.id} className="flex flex-col flex-1 min-w-[220px]">
                  <div className={`flex items-center justify-between px-3 py-2 rounded-lg border mb-3 ${col.headerColor}`}>
                    <span className="text-xs font-semibold">{col.label}</span>
                    <Badge className="text-xs h-4 px-1.5 bg-white/60 text-inherit border-0">
                      {colCandidates.length}
                    </Badge>
                  </div>

                  {/* Droppable zone — registered with dnd-kit, works even when empty */}
                  <DroppableColumn id={col.id} className={`flex-1 rounded-lg p-2 min-h-[300px] transition-all ${col.color}`}>
                    <SortableContext items={colCandidates.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                      {colCandidates.length > 0 ? (
                        colCandidates.map((c) => (
                          <CandidateCard
                            key={c.id}
                            candidate={c}
                            isDragging={c.id === activeId}
                            role={role}
                            onRejectClick={(candidate) => { setPendingReject(candidate); setRejectReason(''); }}
                          />
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border/40 rounded-lg text-muted-foreground">
                          <p className="text-xs">No candidates at this stage</p>
                        </div>
                      )}
                    </SortableContext>
                  </DroppableColumn>
                </div>
              );
            })}
          </div>

          <DragOverlay>
            {activeCandidate ? (
              <div className="opacity-90 rotate-1 w-[240px]">
                <Card className="border shadow-xl">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(activeCandidate.name)} flex items-center justify-center`}>
                        <span className="text-xs font-bold text-white">{getInitials(activeCandidate.name)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{activeCandidate.name}</p>
                        <p className="text-xs text-muted-foreground">{activeCandidate.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Confirm selection — Selected is a terminal positive state */}
      <AlertDialog open={!!pendingSelect} onOpenChange={(open) => { if (!open) setPendingSelect(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm selection for {pendingSelect?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This moves the candidate to Selected, a terminal stage in the pipeline.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSelect}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject reason prompt — required whether triggered by drag or the card's Reject action */}
      <Dialog open={!!pendingReject} onOpenChange={(open) => { if (!open) { setPendingReject(null); setRejectReason(''); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject {pendingReject?.name}?</DialogTitle>
            <DialogDescription>
              A reason is required before this candidate is moved to Rejected.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for rejection..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="min-h-[80px] text-sm"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => { setPendingReject(null); setRejectReason(''); }}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={!rejectReason.trim()}
              onClick={confirmReject}
            >
              Reject candidate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
