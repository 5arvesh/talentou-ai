import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  AlertTriangle,
  Bot,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Plus,
  Trash2,
  User,
  Briefcase,
} from 'lucide-react';

export interface BehavioralQuestion {
  id: string;
  text: string;
  answerKey: string;
  estimatedMinutes: number;
}

interface BehavioralQuestionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  technicalMins: number;
  totalDurationMins: number;
  onProceedToScheduling: (questions: BehavioralQuestion[]) => void;
  onSkip: () => void;
}

export function BehavioralQuestionsDrawer({
  isOpen,
  onClose,
  candidateName,
  technicalMins,
  totalDurationMins,
  onProceedToScheduling,
  onSkip,
}: BehavioralQuestionsDrawerProps) {
  const [behavioralQuestions, setBehavioralQuestions] = useState<BehavioralQuestion[]>([]);
  const [isAddingManually, setIsAddingManually] = useState(false);
  const [manualText, setManualText] = useState('');
  const [manualAnswerKey, setManualAnswerKey] = useState('');
  const [openAnswerKeys, setOpenAnswerKeys] = useState<Set<string>>(new Set());
  const [extensionMins, setExtensionMins] = useState(0);
  const [showSkipDialog, setShowSkipDialog] = useState(false);

  const behavioralMins = behavioralQuestions.reduce((s, q) => s + q.estimatedMinutes, 0);
  const remainingAfterTech = totalDurationMins - technicalMins;
  const effectiveTotal = totalDurationMins + extensionMins;
  const aiDynamicMins = Math.max(0, effectiveTotal - technicalMins - behavioralMins);
  const isOverBehavioralBudget = behavioralMins > remainingAfterTech + extensionMins;
  const maxExtension = remainingAfterTech;

  const handleGenerateWithAI = () => {
    const generated: BehavioralQuestion[] = [
      {
        id: `bq-${Date.now()}-1`,
        text: 'Tell me about a time you had to work under tight deadlines. How did you prioritize?',
        answerKey:
          'Look for: task breakdown, stakeholder communication, trade-off decisions, and the outcome.',
        estimatedMinutes: 3,
      },
      {
        id: `bq-${Date.now()}-2`,
        text: "Describe a situation where you disagreed with your team's technical decision. What did you do?",
        answerKey:
          'Look for: constructive communication, data-driven arguments, respect for team process, and final acceptance.',
        estimatedMinutes: 3,
      },
    ];
    setBehavioralQuestions((prev) => [...prev, ...generated]);
  };

  const handleAddManual = () => {
    if (!manualText.trim()) return;
    const q: BehavioralQuestion = {
      id: `bq-manual-${Date.now()}`,
      text: manualText.trim(),
      answerKey: manualAnswerKey.trim(),
      estimatedMinutes: 3,
    };
    setBehavioralQuestions((prev) => [...prev, q]);
    setManualText('');
    setManualAnswerKey('');
    setIsAddingManually(false);
  };

  const handleDelete = (id: string) => {
    setBehavioralQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const toggleAnswerKey = (id: string) => {
    const next = new Set(openAnswerKeys);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpenAnswerKeys(next);
  };

  const handleClose = () => {
    setBehavioralQuestions([]);
    setIsAddingManually(false);
    setManualText('');
    setManualAnswerKey('');
    setExtensionMins(0);
    setOpenAnswerKeys(new Set());
    onClose();
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
        <SheetContent side="right" className="w-[580px] sm:max-w-[580px] flex flex-col p-0">
          <SheetHeader className="px-6 py-5 border-b border-border">
            <SheetTitle className="text-lg font-bold text-[#7800D3]">
              Behavioral Questions
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              for <span className="font-medium text-foreground">{candidateName}</span>
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* CV Summary */}
            <Card className="p-4 bg-muted/30 border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Candidate Profile
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">Chennai, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Current Role</p>
                    <p className="text-sm font-medium text-foreground">Sr. Software Engineer</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="text-sm font-medium text-foreground">5 years</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Technical time (read-only) */}
            <Card className="p-3 bg-muted/20 border border-border/60">
              <p className="text-sm text-muted-foreground">
                Technical round:{' '}
                <span className="font-semibold text-foreground">~{technicalMins} mins</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Questions and answer keys are set by the hiring lead
              </p>
            </Card>

            {/* Behavioral Questions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Your Behavioral Questions</h3>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={handleGenerateWithAI}
                  >
                    <Bot className="h-3 w-3 mr-1" />
                    Generate with AI
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    disabled={isAddingManually}
                    onClick={() => setIsAddingManually(true)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Manually
                  </Button>
                </div>
              </div>

              {behavioralQuestions.length === 0 && !isAddingManually && (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No behavioral questions added yet.
                </p>
              )}

              <div className="space-y-3">
                {behavioralQuestions.map((q) => (
                  <Card key={q.id} className="p-3 bg-muted/20 border border-border/60">
                    <div className="flex items-start gap-2">
                      <p className="flex-1 text-sm text-foreground leading-snug">{q.text}</p>
                      <div className="flex items-center gap-1 shrink-0">
                        <Badge
                          variant="outline"
                          className="text-xs flex items-center gap-1 text-muted-foreground"
                        >
                          <Clock className="h-3 w-3" />
                          {q.estimatedMinutes} min
                        </Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-red-500"
                          onClick={() => handleDelete(q.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Collapsible
                      open={openAnswerKeys.has(q.id)}
                      onOpenChange={() => toggleAnswerKey(q.id)}
                    >
                      <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2">
                        {openAnswerKeys.has(q.id) ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                        Answer Key
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <p className="text-xs text-muted-foreground mt-2 bg-muted/40 rounded p-2 leading-relaxed">
                          {q.answerKey || <span className="italic">No answer key provided.</span>}
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}

                {isAddingManually && (
                  <Card className="p-4 border-2 border-dashed border-[#7800D3]/30 bg-[#faf5ff]/50">
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Enter your behavioral question..."
                        value={manualText}
                        onChange={(e) => setManualText(e.target.value)}
                        rows={2}
                        className="text-sm resize-none"
                      />
                      <Textarea
                        placeholder="Answer key (optional)..."
                        value={manualAnswerKey}
                        onChange={(e) => setManualAnswerKey(e.target.value)}
                        rows={2}
                        className="text-sm resize-none"
                      />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleAddManual}
                          className="bg-[#7800D3] text-white"
                        >
                          Add Question
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setIsAddingManually(false);
                            setManualText('');
                            setManualAnswerKey('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              {/* Live time breakdown */}
              {(behavioralQuestions.length > 0 || technicalMins > 0) && (
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs bg-muted/30 rounded-lg px-4 py-3">
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
              )}

              {/* Over-budget disclaimer */}
              {isOverBehavioralBudget && (
                <div className="mt-3 rounded-lg border border-orange-300 bg-orange-50 px-4 py-3 space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-orange-800">
                      Behavioral questions exceed remaining time after technical round.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-orange-700">
                      You can extend the interview by up to{' '}
                      <span className="font-semibold">{maxExtension} mins</span> (recruiter limit).
                      No HL re-approval required — HL will be notified of the change.
                    </p>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="extension-input" className="text-xs text-orange-800 shrink-0">
                        Extend by:
                      </Label>
                      <Input
                        id="extension-input"
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
                      <span className="text-xs text-orange-700">mins (max {maxExtension})</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Skip option */}
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground text-xs"
                onClick={() => setShowSkipDialog(true)}
              >
                Skip behavioral questions
              </Button>
            </div>
          </div>

          <SheetFooter className="px-6 py-4 border-t border-border">
            <Button
              onClick={() => onProceedToScheduling(behavioralQuestions)}
              className="w-full bg-[#7800D3] hover:bg-[#6600bb] text-white"
            >
              Continue to Scheduling
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Skip behavioral questions?</AlertDialogTitle>
            <AlertDialogDescription>
              Candidates will only receive the technical interview without any behavioral questions.
              Are you sure you want to skip?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go back</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowSkipDialog(false);
                handleClose();
                onSkip();
              }}
              className="bg-[#7800D3] text-white hover:bg-[#6600bb]"
            >
              Yes, skip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
