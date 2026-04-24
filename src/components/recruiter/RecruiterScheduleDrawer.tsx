import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  AlertTriangle,
  Bot,
  CalendarIcon,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Clock,
  Plus,
  SkipForward,
  Trash2,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BehavioralQuestion {
  id: string;
  text: string;
  answerKey: string;
  estimatedMinutes: number;
}

interface CandidateSummary {
  id: string | number;
  name: string;
  jobTitle?: string;
}

interface RecruiterScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: CandidateSummary[];         // 1 = single, >1 = bulk
  technicalMins: number;
  totalDurationMins: number;
  onSubmit: (data: ScheduleData) => void;
}

export interface ScheduleData {
  candidateIds: Array<string | number>;
  behavioralQuestions: BehavioralQuestion[];
  expiryDate: Date;
  expiryTime: string;
  sendDelay: SendDelay;
}

type SendDelay = 'now' | '1h' | '2h' | '4h' | '8h';
type BehavioralChoice = 'skip' | 'ai' | 'manual' | null;
type DrawerStep = 'behavioral' | 'schedule';

const MOCK_TECHNICAL_MINS = 11;

const AI_QUESTIONS: BehavioralQuestion[] = [
  {
    id: 'bq-ai-1',
    text: 'Tell me about a time you had to work under tight deadlines. How did you prioritize tasks?',
    answerKey: 'Look for: task breakdown, stakeholder communication, trade-off decisions, and outcome. Strong candidates mention proactive escalation.',
    estimatedMinutes: 3,
  },
  {
    id: 'bq-ai-2',
    text: "Describe a situation where you disagreed with your team's technical decision. What did you do?",
    answerKey: 'Look for: constructive communication, data-driven arguments, respect for process, and final acceptance. Avoid candidates who simply comply without voice.',
    estimatedMinutes: 3,
  },
  {
    id: 'bq-ai-3',
    text: 'Give an example of how you handled a difficult stakeholder relationship.',
    answerKey: 'Look for: empathy, active listening, clear communication, and outcome. Red flag if candidate blames stakeholder.',
    estimatedMinutes: 3,
  },
];

const SEND_OPTIONS: { value: SendDelay; label: string }[] = [
  { value: 'now', label: 'Send Now' },
  { value: '1h', label: 'Send in 1 hour' },
  { value: '2h', label: 'Send in 2 hours' },
  { value: '4h', label: 'Send in 4 hours' },
  { value: '8h', label: 'Send in 8 hours' },
];

export function RecruiterScheduleDrawer({
  isOpen,
  onClose,
  candidates,
  technicalMins,
  totalDurationMins,
  onSubmit,
}: RecruiterScheduleDrawerProps) {
  const isBulk = candidates.length > 1;

  const [step, setStep] = useState<DrawerStep>(isBulk ? 'schedule' : 'behavioral');
  const [behavioralChoice, setBehavioralChoice] = useState<BehavioralChoice>(null);
  const [behavioralQuestions, setBehavioralQuestions] = useState<BehavioralQuestion[]>([]);
  const [openAnswerKeys, setOpenAnswerKeys] = useState<Set<string>>(new Set());
  const [isAddingManual, setIsAddingManual] = useState(false);
  const [manualText, setManualText] = useState('');
  const [manualAnswerKey, setManualAnswerKey] = useState('');
  const [extensionMins, setExtensionMins] = useState(0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [expiryTime, setExpiryTime] = useState('');
  const [sendDelay, setSendDelay] = useState<SendDelay>('now');

  const behavioralMins = behavioralQuestions.reduce((s, q) => s + q.estimatedMinutes, 0);
  const remainingAfterTech = totalDurationMins - technicalMins;
  const effectiveTotal = totalDurationMins + extensionMins;
  const aiDynamicMins = Math.max(0, effectiveTotal - technicalMins - behavioralMins);
  const isOverBudget = behavioralMins > remainingAfterTech + extensionMins;
  const maxExtension = remainingAfterTech;

  const resetState = () => {
    setStep(isBulk ? 'schedule' : 'behavioral');
    setBehavioralChoice(null);
    setBehavioralQuestions([]);
    setOpenAnswerKeys(new Set());
    setIsAddingManual(false);
    setManualText('');
    setManualAnswerKey('');
    setExtensionMins(0);
    setExpiryDate(undefined);
    setExpiryTime('');
    setSendDelay('now');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleChooseAI = () => {
    setBehavioralChoice('ai');
    setBehavioralQuestions(AI_QUESTIONS.map(q => ({ ...q, id: `${q.id}-${Date.now()}` })));
  };

  const handleChooseManual = () => {
    setBehavioralChoice('manual');
    setBehavioralQuestions([]);
  };

  const handleAddManual = () => {
    if (!manualText.trim()) return;
    setBehavioralQuestions(prev => [...prev, {
      id: `bq-manual-${Date.now()}`,
      text: manualText.trim(),
      answerKey: manualAnswerKey.trim(),
      estimatedMinutes: 3,
    }]);
    setManualText('');
    setManualAnswerKey('');
    setIsAddingManual(false);
  };

  const handleDeleteQuestion = (id: string) => {
    setBehavioralQuestions(prev => prev.filter(q => q.id !== id));
  };

  const toggleAnswerKey = (id: string) => {
    const next = new Set(openAnswerKeys);
    next.has(id) ? next.delete(id) : next.add(id);
    setOpenAnswerKeys(next);
  };

  const handleSubmit = () => {
    if (!expiryDate || !expiryTime) return;
    onSubmit({
      candidateIds: candidates.map(c => c.id),
      behavioralQuestions,
      expiryDate,
      expiryTime,
      sendDelay,
    });
    handleClose();
  };

  const canProceedToSchedule =
    behavioralChoice === 'skip' ||
    (behavioralChoice !== null && behavioralQuestions.length > 0);

  // ── Shared time breakdown bar ──────────────────────────────────────────────
  const TimeBreakdown = () => (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs bg-muted/30 rounded-lg px-4 py-2.5">
      <span>
        <span className="text-muted-foreground">Technical: </span>
        <span className="font-semibold text-blue-600">~{technicalMins} min</span>
      </span>
      <span className="text-muted-foreground">|</span>
      <span>
        <span className="text-muted-foreground">Behavioral: </span>
        <span className="font-semibold text-orange-600">{behavioralMins} min</span>
      </span>
      <span className="text-muted-foreground">|</span>
      <span>
        <span className="text-muted-foreground">AI Dynamic: </span>
        <span className="font-semibold text-purple-600">{aiDynamicMins} min</span>
      </span>
      <span className="text-muted-foreground">|</span>
      <span>
        <span className="text-muted-foreground">Total: </span>
        <span className="font-semibold text-foreground">{effectiveTotal} min</span>
      </span>
    </div>
  );

  // ── Step: Behavioral Questions ─────────────────────────────────────────────
  const BehavioralStep = () => (
    <div className="space-y-5">
      {/* Technical read-only */}
      <Card className="p-3 bg-muted/20 border border-border/60">
        <p className="text-sm text-muted-foreground">
          Technical round:{' '}
          <span className="font-semibold text-foreground">~{technicalMins} mins</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Questions are set by the hiring lead
        </p>
      </Card>

      {/* Choice cards */}
      {behavioralChoice === null && (
        <div>
          <p className="text-sm font-medium text-foreground mb-3">
            Do you want to add behavioral questions for this candidate?
          </p>
          <div className="grid grid-cols-1 gap-3">
            <Card
              className="p-4 cursor-pointer border-2 hover:border-[#7800D3] hover:bg-[#faf5ff]/50 transition-all"
              onClick={() => setBehavioralChoice('skip')}
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <SkipForward className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Skip — technical only</p>
                  <p className="text-xs text-muted-foreground">
                    Send the interview with technical questions only
                  </p>
                </div>
              </div>
            </Card>
            <Card
              className="p-4 cursor-pointer border-2 hover:border-[#7800D3] hover:bg-[#faf5ff]/50 transition-all"
              onClick={handleChooseAI}
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Generate with AI</p>
                  <p className="text-xs text-muted-foreground">
                    AI suggests behavioral questions based on the role
                  </p>
                </div>
              </div>
            </Card>
            <Card
              className="p-4 cursor-pointer border-2 hover:border-[#7800D3] hover:bg-[#faf5ff]/50 transition-all"
              onClick={handleChooseManual}
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Plus className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Add manually</p>
                  <p className="text-xs text-muted-foreground">
                    Write your own behavioral questions
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* AI or Manual builder */}
      {behavioralChoice !== null && behavioralChoice !== 'skip' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-muted-foreground"
                onClick={() => { setBehavioralChoice(null); setBehavioralQuestions([]); }}
              >
                <ChevronLeft className="h-3 w-3 mr-0.5" />
                Back
              </Button>
              <span className="text-sm font-medium text-foreground">
                {behavioralChoice === 'ai' ? 'AI-Generated Questions' : 'Your Questions'}
              </span>
            </div>
            {behavioralChoice === 'manual' && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="text-xs h-7"
                onClick={() => setIsAddingManual(true)}
                disabled={isAddingManual}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Question
              </Button>
            )}
            {behavioralChoice === 'ai' && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="text-xs h-7"
                onClick={() => setBehavioralQuestions(prev => [
                  ...prev,
                  ...AI_QUESTIONS.map(q => ({ ...q, id: `${q.id}-extra-${Date.now()}` })).slice(0, 1)
                ])}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add More
              </Button>
            )}
          </div>

          {/* Question list */}
          <div className="space-y-2">
            {behavioralQuestions.map((q) => (
              <Card key={q.id} className="p-3 bg-muted/20 border border-border/60">
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-sm text-foreground leading-snug">{q.text}</p>
                  <div className="flex items-center gap-1 shrink-0">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {q.estimatedMinutes} min
                    </Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-red-500"
                      onClick={() => handleDeleteQuestion(q.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Collapsible open={openAnswerKeys.has(q.id)} onOpenChange={() => toggleAnswerKey(q.id)}>
                  <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2">
                    {openAnswerKeys.has(q.id) ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    Answer Key
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-xs text-muted-foreground mt-1.5 bg-muted/40 rounded p-2 leading-relaxed">
                      {q.answerKey || <span className="italic">No answer key.</span>}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}

            {behavioralQuestions.length === 0 && behavioralChoice === 'manual' && !isAddingManual && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No questions yet. Click "Add Question" to start.
              </p>
            )}

            {isAddingManual && (
              <Card className="p-4 border-2 border-dashed border-[#7800D3]/30 bg-[#faf5ff]/50">
                <div className="space-y-3">
                  <Textarea
                    placeholder="Enter behavioral question..."
                    value={manualText}
                    onChange={(e) => setManualText(e.target.value)}
                    rows={2}
                    className="text-sm resize-none"
                  />
                  <Textarea
                    placeholder="Answer key / what to look for (optional)..."
                    value={manualAnswerKey}
                    onChange={(e) => setManualAnswerKey(e.target.value)}
                    rows={2}
                    className="text-sm resize-none"
                  />
                  <div className="flex gap-2">
                    <Button type="button" size="sm" onClick={handleAddManual} className="bg-[#7800D3] text-white">
                      Add
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => { setIsAddingManual(false); setManualText(''); setManualAnswerKey(''); }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Time breakdown */}
          {behavioralQuestions.length > 0 && (
            <div className="mt-3 space-y-2">
              <TimeBreakdown />
              {isOverBudget && (
                <div className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-orange-800">
                      Behavioral questions exceed the remaining time budget.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-orange-700 shrink-0">
                      Extend by (max {maxExtension} min):
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      max={maxExtension}
                      value={extensionMins}
                      onChange={(e) => {
                        const v = parseInt(e.target.value);
                        if (!isNaN(v) && v >= 0 && v <= maxExtension) setExtensionMins(v);
                      }}
                      className="w-20 text-center text-sm h-8"
                    />
                    <span className="text-xs text-orange-600">mins</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Skip confirmation state */}
      {behavioralChoice === 'skip' && (
        <Card className="p-4 border border-border bg-muted/20">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#4ead3b] shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Technical interview only</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                No behavioral questions will be added. Candidate will receive only the technical round (~{technicalMins} min).
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground ml-auto shrink-0"
              onClick={() => setBehavioralChoice(null)}
            >
              Change
            </Button>
          </div>
        </Card>
      )}
    </div>
  );

  // ── Step: Schedule ─────────────────────────────────────────────────────────
  const ScheduleStep = () => (
    <div className="space-y-5">
      {/* Summary */}
      {!isBulk && (
        <Card className="p-3 bg-muted/20 border border-border/60">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Interview Summary
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <span>
              <span className="text-muted-foreground">Technical: </span>
              <span className="font-semibold text-blue-600">~{technicalMins} min</span>
            </span>
            {behavioralMins > 0 && (
              <span>
                <span className="text-muted-foreground">Behavioral: </span>
                <span className="font-semibold text-orange-600">~{behavioralMins} min</span>
              </span>
            )}
            <span>
              <span className="text-muted-foreground">Total: </span>
              <span className="font-semibold text-foreground">~{effectiveTotal} min</span>
            </span>
          </div>
        </Card>
      )}

      {isBulk && (
        <Card className="p-3 bg-blue-50 border border-blue-200">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500 shrink-0" />
            <p className="text-sm text-blue-800">
              Scheduling for <span className="font-semibold">{candidates.length} candidates</span> — technical interview only (~{technicalMins} min each)
            </p>
          </div>
        </Card>
      )}

      {/* Expiry Date */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Interview Link Expiry Date <span className="text-destructive">*</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal h-11',
                !expiryDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {expiryDate ? format(expiryDate, 'PPP') : 'Select expiry date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={expiryDate}
              onSelect={setExpiryDate}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <p className="text-xs text-muted-foreground">The interview link will expire on this date</p>
      </div>

      {/* Expiry Time */}
      <div className="space-y-2">
        <Label htmlFor="expiry-time-sched" className="text-sm font-medium text-foreground">
          Expiry Time <span className="text-destructive">*</span>
        </Label>
        <Input
          id="expiry-time-sched"
          type="time"
          value={expiryTime}
          onChange={(e) => setExpiryTime(e.target.value)}
          className="h-11"
        />
      </div>

      {/* Send delay */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">When to send the interview link</Label>
        <RadioGroup
          value={sendDelay}
          onValueChange={(v) => setSendDelay(v as SendDelay)}
          className="space-y-2"
        >
          {SEND_OPTIONS.map(({ value, label }) => (
            <div
              key={value}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors',
                sendDelay === value
                  ? 'border-[#7800D3] bg-[#faf5ff]'
                  : 'border-border hover:bg-muted/30'
              )}
              onClick={() => setSendDelay(value)}
            >
              <RadioGroupItem value={value} id={`delay-${value}`} />
              <Label htmlFor={`delay-${value}`} className="cursor-pointer text-sm">
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const drawerTitle = isBulk
    ? `Bulk Schedule — ${candidates.length} candidates`
    : step === 'behavioral'
    ? 'Schedule Interview'
    : 'Schedule Interview';

  const drawerDescription = isBulk
    ? 'All selected candidates will receive a technical interview link'
    : candidates[0]?.name
    ? `for ${candidates[0].name}${candidates[0].jobTitle ? ` · ${candidates[0].jobTitle}` : ''}`
    : '';

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
        <SheetContent side="right" className="w-[560px] sm:max-w-[560px] flex flex-col p-0">
          {/* Header */}
          <SheetHeader className="px-6 py-5 border-b border-border">
            <div className="flex items-center gap-2">
              {step === 'schedule' && !isBulk && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 -ml-1 text-muted-foreground"
                  onClick={() => setStep('behavioral')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              <div>
                <SheetTitle className="text-lg font-bold text-[#7800D3]">{drawerTitle}</SheetTitle>
                {drawerDescription && (
                  <SheetDescription className="text-sm text-muted-foreground mt-0.5">
                    {drawerDescription}
                  </SheetDescription>
                )}
              </div>
            </div>

            {/* Step indicator — single candidate only */}
            {!isBulk && (
              <div className="flex items-center gap-2 mt-3">
                <div className={cn('flex items-center gap-1.5 text-xs font-medium',
                  step === 'behavioral' ? 'text-[#7800D3]' : 'text-[#4ead3b]'
                )}>
                  <div className={cn('h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold',
                    step === 'behavioral' ? 'bg-[#7800D3] text-white' : 'bg-[#4ead3b] text-white'
                  )}>
                    {step === 'behavioral' ? '1' : <CheckCircle2 className="h-3 w-3" />}
                  </div>
                  Behavioral Questions
                </div>
                <div className="h-px flex-1 bg-border" />
                <div className={cn('flex items-center gap-1.5 text-xs font-medium',
                  step === 'schedule' ? 'text-[#7800D3]' : 'text-muted-foreground'
                )}>
                  <div className={cn('h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold',
                    step === 'schedule' ? 'bg-[#7800D3] text-white' : 'bg-muted text-muted-foreground'
                  )}>
                    2
                  </div>
                  Schedule & Send
                </div>
              </div>
            )}
          </SheetHeader>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {step === 'behavioral' ? <BehavioralStep /> : <ScheduleStep />}
          </div>

          {/* Footer */}
          <SheetFooter className="px-6 py-4 border-t border-border">
            {step === 'behavioral' ? (
              <div className="flex gap-3 w-full">
                <SheetClose asChild>
                  <Button variant="outline" className="flex-1" onClick={handleClose}>
                    Cancel
                  </Button>
                </SheetClose>
                <Button
                  className="flex-1 bg-[#7800D3] hover:bg-[#6600bb] text-white"
                  disabled={!canProceedToSchedule || isAddingManual}
                  onClick={() => setStep('schedule')}
                >
                  Continue to Schedule
                </Button>
              </div>
            ) : (
              <div className="flex gap-3 w-full">
                {!isBulk && (
                  <Button variant="outline" className="flex-1" onClick={() => setStep('behavioral')}>
                    Back
                  </Button>
                )}
                {isBulk && (
                  <SheetClose asChild>
                    <Button variant="outline" className="flex-1" onClick={handleClose}>
                      Cancel
                    </Button>
                  </SheetClose>
                )}
                <Button
                  className="flex-1 bg-[#4ead3b] hover:bg-[#8FD378] text-white disabled:opacity-50"
                  disabled={!expiryDate || !expiryTime}
                  onClick={handleSubmit}
                >
                  {isBulk
                    ? `Schedule ${candidates.length} Interviews`
                    : 'Send Interview Link'}
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
