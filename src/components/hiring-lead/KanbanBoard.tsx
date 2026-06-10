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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Link2, Phone, Clock, Star, Search, ArrowLeft, Info, GripVertical, Lock } from 'lucide-react';
import { RoleType } from '@/components/shared/ModernJobList';

type Stage = 'Applied' | 'Shortlisted' | 'Phone Screen' | 'Interview' | 'Offered';

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

const COLUMN_ORDER: Stage[] = ['Applied', 'Shortlisted', 'Phone Screen', 'Interview', 'Offered'];

function isTransitionAllowed(from: Stage, to: Stage): { allowed: boolean; reason?: string } {
  if (from === to) return { allowed: true };
  const fromIdx = COLUMN_ORDER.indexOf(from);
  const toIdx = COLUMN_ORDER.indexOf(to);
  if (toIdx < fromIdx) return { allowed: true }; // backward moves always allowed
  if (from === 'Applied' && to === 'Shortlisted') return { allowed: true };
  if (from === 'Shortlisted' && to === 'Phone Screen') return { allowed: true };
  if (to === 'Interview') return { allowed: false, reason: 'Move to Interview happens automatically when an interview is scheduled.' };
  if (to === 'Offered') return { allowed: false, reason: 'Move to Offered happens when an offer letter is generated through HR.' };
  return { allowed: false, reason: 'This status change cannot be done manually.' };
}

const INITIAL_CANDIDATES: KanbanCandidate[] = [
  { id: 'c1', name: 'Arun Sharma', title: 'Senior Frontend Dev', company: 'Infosys', experience: '6y', location: 'Bangalore', fitScore: 88, fitLabel: 'Excellent Fit', daysAdded: 12, daysInStage: 2, stage: 'Applied' },
  { id: 'c2', name: 'Priya Nair', title: 'React Developer', company: 'Wipro', experience: '4y', location: 'Pune', fitScore: 74, fitLabel: 'Strong Fit', daysAdded: 8, daysInStage: 4, stage: 'Applied' },
  { id: 'c3', name: 'Vikram Patel', title: 'Full Stack Engineer', company: 'TCS', experience: '5y', location: 'Mumbai', fitScore: 61, fitLabel: 'Good Fit', daysAdded: 15, daysInStage: 7, stage: 'Applied' },
  { id: 'c4', name: 'Sneha Reddy', title: 'Frontend Architect', company: 'HCL', experience: '7y', location: 'Hyderabad', fitScore: 91, fitLabel: 'Excellent Fit', daysAdded: 10, daysInStage: 3, stage: 'Shortlisted' },
  { id: 'c5', name: 'Rahul Verma', title: 'UI Engineer', company: 'Tech Mahindra', experience: '4y', location: 'Chennai', fitScore: 70, fitLabel: 'Strong Fit', daysAdded: 18, daysInStage: 9, stage: 'Shortlisted' },
  { id: 'c6', name: 'Deepa Menon', title: 'React Native Dev', company: 'Capgemini', experience: '5y', location: 'Kochi', fitScore: 65, fitLabel: 'Good Fit', daysAdded: 20, daysInStage: 6, stage: 'Shortlisted' },
  { id: 'c7', name: 'Karan Singh', title: 'Senior Dev', company: 'Accenture', experience: '6y', location: 'Delhi', fitScore: 82, fitLabel: 'Excellent Fit', daysAdded: 7, daysInStage: 2, stage: 'Interview' },
  { id: 'c8', name: 'Meera Joshi', title: 'Tech Lead', company: 'Mindtree', experience: '8y', location: 'Bangalore', fitScore: 77, fitLabel: 'Strong Fit', daysAdded: 9, daysInStage: 1, stage: 'Interview' },
  { id: 'c9', name: 'Ankit Gupta', title: 'Principal Engineer', company: 'Mphasis', experience: '9y', location: 'Pune', fitScore: 94, fitLabel: 'Excellent Fit', daysAdded: 5, daysInStage: 0, stage: 'Offered' },
];

const COLUMNS: { id: Stage; label: string; color: string; headerColor: string }[] = [
  { id: 'Applied',      label: 'Applied',      color: 'bg-blue-50',   headerColor: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'Shortlisted',  label: 'Shortlisted',  color: 'bg-amber-50',  headerColor: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 'Phone Screen', label: 'Phone Screen', color: 'bg-purple-50', headerColor: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'Interview',    label: 'Interview',    color: 'bg-orange-50', headerColor: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'Offered',      label: 'Offered',      color: 'bg-green-50',  headerColor: 'bg-green-100 text-green-600 border-green-200' },
];

const FIT_LABEL_CONFIG: Record<string, string> = {
  'Good Fit': 'bg-orange-50 text-orange-700 border-orange-200',
  'Strong Fit': 'bg-blue-50 text-blue-700 border-blue-200',
  'Excellent Fit': 'bg-green-50 text-green-600 border-green-200',
};

const AVATAR_COLORS = [
  'from-primary to-purple-700',
  'from-blue-500 to-blue-700',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-red-600',
];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase();
}

function getAvatarColor(name: string) {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

// Droppable column wrapper â€” registers the column as a dnd-kit drop target
function DroppableColumn({ id, children, className }: { id: string; children: React.ReactNode; className: string }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${className} ${isOver ? 'ring-2 ring-primary/30 ring-inset' : ''}`}>
      {children}
    </div>
  );
}

function CandidateCard({ candidate, isDragging, role }: { candidate: KanbanCandidate; isDragging?: boolean; role: RoleType }) {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: candidate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const isStalled = candidate.daysInStage > 5;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-action-btn]')) return;
    const base = role === 'ta-leader' ? '/sales-plan' : role === 'recruiter' ? '/ta-associate' : '/hiring-lead';
    navigate(`${base}/candidate-profile/${candidate.id}`);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
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
              <p className="text-xs text-muted-foreground truncate">{candidate.title} Â· {candidate.company}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {isStalled && (
                <div title={`Stalled for ${candidate.daysInStage} days`}>
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                </div>
              )}
              {/* Drag handle â€” only this element triggers drag */}
              <div
                {...attributes}
                {...listeners}
                data-action-btn
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
          <div className="flex items-center justify-between mb-2">
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
              <button className="p-1 rounded hover:bg-muted transition-colors" onClick={(e) => e.stopPropagation()} title="LinkedIn">
                <Link2 className="h-3 w-3 text-muted-foreground" />
              </button>
              <button className="p-1 rounded hover:bg-muted transition-colors" onClick={(e) => e.stopPropagation()} title="Phone">
                <Phone className="h-3 w-3 text-muted-foreground" />
              </button>
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

export function KanbanBoard({ jobId, role = 'hiring-lead' }: KanbanBoardProps) {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<KanbanCandidate[]>(INITIAL_CANDIDATES);
  const [search, setSearch] = useState('');
  const [fitFilter, setFitFilter] = useState('all');
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const jobTitle = JOB_TITLES[jobId] || `Job #${jobId}`;
  const daysOpen = JOB_DAYS_OPEN[jobId] || 0;
  const backRoute = role === 'ta-leader' ? '/sales-plan/jobs' : role === 'recruiter' ? '/ta-associate/jobs' : '/hiring-lead/jobs';
  const jdRoute = role === 'ta-leader' ? `/sales-plan/jd/${jobId}` : role === 'recruiter' ? `/ta-associate/jd/${jobId}` : `/hiring-lead/jd/${jobId}`;

  const filtered = candidates.filter((c) => {
    const matchSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase());
    const matchFit = fitFilter === 'all' || c.fitLabel === fitFilter;
    return matchSearch && matchFit;
  });

  const getColumnCandidates = (stage: Stage) => filtered.filter((c) => c.stage === stage);

  const totalCandidates = candidates.length;
  const showJdNudge = daysOpen > 14 && totalCandidates < 3;

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
      toast.error(reason, { duration: 4000 });
      return;
    }

    setCandidates((prev) =>
      prev.map((c) => c.id === draggedId ? { ...c, stage: targetStage!, daysInStage: 0 } : c)
    );
  };

  const activeCandidate = activeId ? candidates.find((c) => c.id === activeId) : null;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(backRoute)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">{jobTitle}</h1>
            <p className="text-xs text-muted-foreground">Candidate Pipeline Â· {daysOpen} days open</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search candidatesâ€¦"
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
            This role may benefit from reviewing the job description â€” it has been open {daysOpen} days with few candidates.{' '}
            <button className="underline font-medium" onClick={() => navigate(jdRoute)}>
              Review JD
            </button>
          </p>
        </div>
      )}

      {/* Kanban columns */}
      <div className="flex-1 overflow-x-auto p-6">
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
                  {/* Column header â€” shows lock hint for auto-managed columns during drag */}
                  {(() => {
                    const isLocked = activeId !== null && (col.id === 'Interview' || col.id === 'Offered');
                    return (
                      <div className={`flex flex-col px-3 py-2 rounded-lg border mb-3 transition-opacity ${col.headerColor} ${isLocked ? 'opacity-50' : ''}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{col.label}</span>
                          <Badge className="text-xs h-4 px-1.5 bg-white/60 text-inherit border-0">
                            {colCandidates.length}
                          </Badge>
                        </div>
                        {isLocked && (
                          <span className="text-[10px] mt-0.5 opacity-80 flex items-center gap-1">
                            <Lock className="h-2.5 w-2.5" /> Auto-assigned
                          </span>
                        )}
                      </div>
                    );
                  })()}

                  {/* Droppable zone â€” registered with dnd-kit, works even when empty */}
                  <DroppableColumn id={col.id} className={`flex-1 rounded-lg p-2 min-h-[300px] transition-all ${col.color}`}>
                    <SortableContext items={colCandidates.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                      {colCandidates.length > 0 ? (
                        colCandidates.map((c) => (
                          <CandidateCard key={c.id} candidate={c} isDragging={c.id === activeId} role={role} />
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
    </div>
  );
}
