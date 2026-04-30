import React, { useState } from 'react';
import { useHiringLeadConversation } from '@/context/HiringLeadConversationContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ClipboardList, Plus, Trash2 } from 'lucide-react';

export function ScreeningQuestionsPanel() {
  const {
    interviewSetup,
    updateInterviewSetup,
    completeStage,
    setCurrentStage,
    addChatMessage,
  } = useHiringLeadConversation();

  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');
  const [type, setType] = useState<'text' | 'yesno'>('text');

  const handleAdd = () => {
    if (!text.trim()) return;
    const q = { id: `sq-${Date.now()}`, text: text.trim(), type };
    updateInterviewSetup({ screeningQuestions: [...interviewSetup.screeningQuestions, q] });
    setText('');
    setType('text');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    updateInterviewSetup({
      screeningQuestions: interviewSetup.screeningQuestions.filter(q => q.id !== id),
    });
  };

  const handleNext = () => {
    addChatMessage({
      id: Date.now(),
      sender: 'ai',
      content: "Great! Now let's set up the interview — add your preset questions, choose AI assistance, and set the duration.",
      name: 'Talentou AI',
      stageIndex: 3,
    });
    completeStage('screeningSetup');
    setCurrentStage(3);
  };

  return (
    <div className="space-y-5">
      <Card className="p-5 border border-border">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#6474a9]">Screening Questions</h3>
            {interviewSetup.screeningQuestions.length > 0 && (
              <Badge variant="secondary" className="text-xs font-normal">
                {interviewSetup.screeningQuestions.length} question{interviewSetup.screeningQuestions.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setIsAdding(true)}
            className="text-xs"
            disabled={isAdding}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Question
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Candidates answer these when applying. Use them to pre-screen before the interview.
          These are optional — skip to proceed without screening questions.
        </p>

        {interviewSetup.screeningQuestions.length === 0 && !isAdding && (
          <div className="flex flex-col items-center gap-2 py-6 text-muted-foreground">
            <ClipboardList className="h-7 w-7 opacity-30" />
            <p className="text-sm">No screening questions yet — add some or skip to continue</p>
          </div>
        )}

        <div className="space-y-2">
          {interviewSetup.screeningQuestions.map((q) => (
            <div key={q.id} className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg border border-border/60">
              <p className="flex-1 text-sm">{q.text}</p>
              <Badge variant="outline" className="text-xs shrink-0">
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
            <Card className="p-4 border-2 border-dashed border-[#7800D3]/30 bg-[#faf5ff]/50">
              <div className="space-y-3">
                <Textarea
                  placeholder="Enter screening question..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                />
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Answer type</p>
                  <RadioGroup
                    value={type}
                    onValueChange={(v) => setType(v as 'text' | 'yesno')}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="text" id="sq-text" />
                      <Label htmlFor="sq-text" className="text-sm cursor-pointer">Text response</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yesno" id="sq-yesno" />
                      <Label htmlFor="sq-yesno" className="text-sm cursor-pointer">Yes / No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex gap-2">
                  <Button type="button" size="sm" onClick={handleAdd} className="bg-[#7800D3] hover:bg-[#6600bb] text-white">
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
      </Card>

      <div className="pt-1">
        <Button
          onClick={handleNext}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0"
        >
          Next: Interview Setup
        </Button>
      </div>
    </div>
  );
}
