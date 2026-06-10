import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ClipboardList, Plus, Trash2, Lock } from 'lucide-react';

interface ScreeningQuestion {
  id: string;
  text: string;
  type: 'text' | 'yesno';
  source: 'hl' | 'recruiter';
}

interface RecruiterScreeningDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jobRole: string;
}

const HL_PRESET_QUESTIONS: ScreeningQuestion[] = [
  { id: 'hl-1', text: 'Do you have at least 3 years of relevant experience?', type: 'yesno', source: 'hl' },
  { id: 'hl-2', text: 'Are you comfortable working in a hybrid setup (2â€“3 days on-site)?', type: 'yesno', source: 'hl' },
  { id: 'hl-3', text: 'Briefly describe your most relevant past project.', type: 'text', source: 'hl' },
];

export function RecruiterScreeningDrawer({ isOpen, onClose, onConfirm, jobRole }: RecruiterScreeningDrawerProps) {
  const [recruiterQuestions, setRecruiterQuestions] = useState<ScreeningQuestion[]>([]);
  const [hasAnsweredPrompt, setHasAnsweredPrompt] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');
  const [type, setType] = useState<'text' | 'yesno'>('text');

  const handleAdd = () => {
    if (!text.trim()) return;
    setRecruiterQuestions(prev => [
      ...prev,
      { id: `rq-${Date.now()}`, text: text.trim(), type, source: 'recruiter' }
    ]);
    setText('');
    setType('text');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setRecruiterQuestions(prev => prev.filter(q => q.id !== id));
  };

  // Cancel â€” does NOT confirm; toggle stays OFF
  const handleClose = () => {
    setIsAdding(false);
    setText('');
    setType('text');
    setHasAnsweredPrompt(false);
    onClose();
  };

  // Confirm â€” called on skip or save; turns the toggle ON
  const handleConfirm = () => {
    onConfirm();
    // reset internal state (onConfirm already closes via parent)
    setIsAdding(false);
    setText('');
    setType('text');
    setHasAnsweredPrompt(false);
  };

  const allQuestions = [...HL_PRESET_QUESTIONS, ...recruiterQuestions];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <SheetContent side="right" className="w-[540px] sm:max-w-[540px] flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="text-lg font-bold text-primary">Screening Questions</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {jobRole} â€” Questions candidates answer when applying
          </SheetDescription>
        </SheetHeader>

        {/* â”€â”€ Prompt screen â”€â”€ */}
        {!hasAnsweredPrompt ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-6 text-center">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <ClipboardList className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">Add Screening Questions?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Candidates will answer these when applying through your careers page.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Button
                className="w-full bg-primary hover:bg-[#6600bb] text-white"
                onClick={() => setHasAnsweredPrompt(true)}
              >
                Yes, add questions
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleConfirm}
              >
                No, skip for now
              </Button>
            </div>
          </div>
        ) : (
          /* â”€â”€ Questions screen â”€â”€ */
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {/* HL-set questions */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Set by Hiring Lead</p>
                </div>
                <div className="space-y-2">
                  {HL_PRESET_QUESTIONS.map(q => (
                    <div key={q.id} className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg border border-border/60">
                      <p className="flex-1 text-sm text-muted-foreground">{q.text}</p>
                      <Badge variant="outline" className="text-xs shrink-0">{q.type === 'yesno' ? 'Yes / No' : 'Text'}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recruiter questions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-3.5 w-3.5 text-primary" />
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide">Your Questions</p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 border-primary/30 text-primary hover:bg-[#faf5ff]"
                    onClick={() => setIsAdding(true)}
                    disabled={isAdding}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Question
                  </Button>
                </div>

                <div className="space-y-2">
                  {recruiterQuestions.length === 0 && !isAdding && (
                    <div className="flex flex-col items-center gap-2 py-6 text-muted-foreground border-2 border-dashed rounded-lg">
                      <ClipboardList className="h-6 w-6 opacity-30" />
                      <p className="text-sm">No questions added yet</p>
                    </div>
                  )}

                  {recruiterQuestions.map(q => (
                    <div key={q.id} className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="flex-1 text-sm">{q.text}</p>
                      <Badge variant="outline" className="text-xs shrink-0 border-purple-200 text-purple-700">
                        {q.type === 'yesno' ? 'Yes / No' : 'Text'}
                      </Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-red-500 shrink-0"
                        onClick={() => handleDelete(q.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  {isAdding && (
                    <Card className="p-4 border-2 border-dashed border-primary/30 bg-[#faf5ff]/50">
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Enter screening question..."
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          rows={2}
                          className="text-sm resize-none"
                          autoFocus
                        />
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Answer type</p>
                          <RadioGroup
                            value={type}
                            onValueChange={(v) => setType(v as 'text' | 'yesno')}
                            className="flex gap-4"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="text" id="rq-text" />
                              <Label htmlFor="rq-text" className="text-sm cursor-pointer">Text response</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="yesno" id="rq-yesno" />
                              <Label htmlFor="rq-yesno" className="text-sm cursor-pointer">Yes / No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="flex gap-2">
                          <Button type="button" size="sm" onClick={handleAdd} className="bg-primary hover:bg-[#6600bb] text-white">
                            Add Question
                          </Button>
                          <Button type="button" size="sm" variant="outline" onClick={() => { setIsAdding(false); setText(''); }}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </div>

              {allQuestions.length > 0 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  {allQuestions.length} total question{allQuestions.length !== 1 ? 's' : ''} â€”
                  candidates will answer all of these when applying
                </p>
              )}
            </div>

            <SheetFooter className="px-6 py-4 border-t border-border">
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-[#6600bb] text-white"
                  onClick={handleConfirm}
                >
                  {recruiterQuestions.length === 0 ? 'Skip for now' : 'Save Questions'}
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
