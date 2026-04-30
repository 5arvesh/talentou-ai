import React, { useState } from 'react';
import { useHiringLeadConversation } from '@/context/HiringLeadConversationContext';
import type { CoreQuestion } from '@/context/HiringLeadConversationContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Trash2,
  Clock,
  ListChecks,
  Sparkles,
  MessageSquarePlus,
} from 'lucide-react';

export function InterviewSetupPanel() {
  const {
    interviewSetup,
    updateInterviewSetup,
    completeStage,
    setCurrentStage,
    addChatMessage,
  } = useHiringLeadConversation();

  const [isAddingManually, setIsAddingManually] = useState(false);
  const [manualText, setManualText] = useState('');
  const [manualAnswerKey, setManualAnswerKey] = useState('');
  const [manualType, setManualType] = useState<'scenario' | 'knowledge'>('scenario');
  const [openAnswerKeys, setOpenAnswerKeys] = useState<Set<string>>(new Set());


  const coreMins = interviewSetup.coreQuestions.reduce((s, q) => s + q.estimatedMinutes, 0);
  const remainingMins = Math.max(0, interviewSetup.totalDurationMins - coreMins);
  const isOverBudget = coreMins > interviewSetup.totalDurationMins;

  const coreBarPct = interviewSetup.totalDurationMins > 0
    ? Math.min(100, (coreMins / interviewSetup.totalDurationMins) * 100)
    : 0;
  const remainingBarPct = 100 - coreBarPct;

  const showAI = interviewSetup.includeAIQuestions;

  const handleGenerateWithAI = () => {
    const ts = Date.now();
    const ai: CoreQuestion[] = [
      {
        id: `q-ai-${ts}-1`,
        text: 'Describe a situation where you had to optimize a slow database query in production. What was your approach?',
        answerKey: 'Indexing, EXPLAIN/ANALYZE, query restructuring, caching considerations, and post-deployment monitoring.',
        estimatedMinutes: 4,
        type: 'scenario',
        source: 'ai',
      },
      {
        id: `q-ai-${ts}-2`,
        text: 'What is the difference between REST and GraphQL? When would you choose one over the other?',
        answerKey: 'REST: stateless, fixed endpoints, good for caching. GraphQL: flexible queries, avoids over-fetching. Choose GraphQL for complex/varied clients.',
        estimatedMinutes: 2,
        type: 'knowledge',
        source: 'ai',
      },
      {
        id: `q-ai-${ts}-3`,
        text: 'Walk me through how you would design a notification system that needs to handle 1 million events per day.',
        answerKey: 'Event queue (Kafka/RabbitMQ), worker pool, fan-out strategy, idempotency, retry logic, monitoring/alerting.',
        estimatedMinutes: 5,
        type: 'scenario',
        source: 'ai',
      },
    ];
    updateInterviewSetup({ coreQuestions: [...interviewSetup.coreQuestions, ...ai] });
  };

  const handleAddManual = () => {
    if (!manualText.trim()) return;
    const q: CoreQuestion = {
      id: `q-manual-${Date.now()}`,
      text: manualText.trim(),
      answerKey: manualAnswerKey.trim(),
      estimatedMinutes: manualType === 'scenario' ? 4 : 2,
      type: manualType,
      source: 'manual',
    };
    updateInterviewSetup({ coreQuestions: [...interviewSetup.coreQuestions, q] });
    setManualText('');
    setManualAnswerKey('');
    setManualType('scenario');
    setIsAddingManually(false);
  };

  const handleDelete = (id: string) => {
    updateInterviewSetup({
      coreQuestions: interviewSetup.coreQuestions.filter((q) => q.id !== id),
    });
  };

  const toggleAnswerKey = (id: string) => {
    const next = new Set(openAnswerKeys);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpenAnswerKeys(next);
  };

  const handleNext = () => {
    addChatMessage({
      id: Date.now(),
      sender: 'ai',
      content:
        "Excellent! I've generated a complete Job Description based on your inputs. Please review it in the panel on the right.",
      name: 'Talentou AI',
      stageIndex: 4,
    });
    completeStage('interviewSetup');
    setCurrentStage(4);
  };

  return (
    <div className="space-y-5">
      {/* Section A: Interview Mode */}
      <Card className="p-5 border border-border">
        <h3 className="text-base font-semibold text-[#6474a9] mb-1">Interview Mode</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Choose how the interview will be structured for candidates
        </p>
        <div className="grid grid-cols-2 gap-3">
          {/* AI Assisted */}
          <button
            type="button"
            onClick={() => updateInterviewSetup({ includeAIQuestions: true })}
            className={`relative text-left rounded-xl border-2 p-4 transition-all duration-150 ${
              interviewSetup.includeAIQuestions
                ? 'border-[#7800D3] bg-[#faf5ff] shadow-sm'
                : 'border-border bg-white hover:bg-muted/30 hover:border-muted-foreground/30'
            }`}
          >
            {interviewSetup.includeAIQuestions && (
              <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-[#7800D3]" />
            )}
            <div className={`inline-flex items-center justify-center h-9 w-9 rounded-lg mb-3 ${
              interviewSetup.includeAIQuestions ? 'bg-[#7800D3]/10' : 'bg-muted'
            }`}>
              <Sparkles className={`h-5 w-5 ${interviewSetup.includeAIQuestions ? 'text-[#7800D3]' : 'text-muted-foreground'}`} />
            </div>
            <p className={`text-sm font-semibold mb-1 ${interviewSetup.includeAIQuestions ? 'text-[#7800D3]' : 'text-foreground'}`}>
              AI Assisted
            </p>
            <p className="text-xs text-muted-foreground leading-snug">
              AI helps structure the interview with guided question planning and adaptive follow-ups.
            </p>
          </button>

          {/* Manual Setup */}
          <button
            type="button"
            onClick={() => updateInterviewSetup({ includeAIQuestions: false })}
            className={`relative text-left rounded-xl border-2 p-4 transition-all duration-150 ${
              !interviewSetup.includeAIQuestions
                ? 'border-slate-500 bg-slate-50 shadow-sm'
                : 'border-border bg-white hover:bg-muted/30 hover:border-muted-foreground/30'
            }`}
          >
            {!interviewSetup.includeAIQuestions && (
              <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-slate-600" />
            )}
            <div className={`inline-flex items-center justify-center h-9 w-9 rounded-lg mb-3 ${
              !interviewSetup.includeAIQuestions ? 'bg-slate-100' : 'bg-muted'
            }`}>
              <ListChecks className={`h-5 w-5 ${!interviewSetup.includeAIQuestions ? 'text-slate-600' : 'text-muted-foreground'}`} />
            </div>
            <p className={`text-sm font-semibold mb-1 ${!interviewSetup.includeAIQuestions ? 'text-slate-700' : 'text-foreground'}`}>
              Manual Setup
            </p>
            <p className="text-xs text-muted-foreground leading-snug">
              Build and manage the interview flow yourself with full control.
            </p>
          </button>
        </div>
      </Card>

      {/* Section B: Preset Questions */}
      <Card className="p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#6474a9]">Preset Questions</h3>
            {interviewSetup.coreQuestions.length > 0 && (
              <Badge variant="secondary" className="text-xs font-normal">
                {interviewSetup.coreQuestions.length} question{interviewSetup.coreQuestions.length !== 1 ? 's' : ''} · {coreMins} min
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {interviewSetup.includeAIQuestions && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleGenerateWithAI}
                className="text-xs border-[#7800D3]/30 text-[#7800D3] hover:bg-[#faf5ff] hover:border-[#7800D3]"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Generate with AI
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setIsAddingManually(true)}
              className="text-xs"
              disabled={isAddingManually}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Question
            </Button>
          </div>
        </div>

        {interviewSetup.coreQuestions.length === 0 && !isAddingManually && (
          <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
            <MessageSquarePlus className="h-8 w-8 opacity-30" />
            <p className="text-sm">
              {interviewSetup.includeAIQuestions
                ? 'No questions yet — add your own or let AI suggest some'
                : 'No questions yet — add your own to get started'}
            </p>
          </div>
        )}

        <div className="space-y-3">
          {interviewSetup.coreQuestions.map((q) => (
            <Card key={q.id} className="p-3 bg-muted/20 border border-border/60">
              <div className="flex items-start gap-2">
                <p className="flex-1 text-sm text-foreground leading-snug">{q.text}</p>
                <div className="flex items-center gap-1 shrink-0">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      q.type === 'scenario'
                        ? 'border-blue-300 text-blue-700 bg-blue-50'
                        : 'border-gray-300 text-gray-600 bg-gray-50'
                    }`}
                  >
                    {q.type === 'scenario' ? 'Scenario' : 'Knowledge'}
                  </Badge>
                  <Badge variant="outline" className="text-xs flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {q.estimatedMinutes} min
                  </Badge>
                  {q.source === 'ai' && (
                    <Badge variant="outline" className="text-xs border-purple-200 text-purple-600 bg-purple-50">
                      <Bot className="h-3 w-3 mr-1" />
                      AI
                    </Badge>
                  )}
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
                  placeholder="Enter your question..."
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
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Question type</p>
                  <RadioGroup
                    value={manualType}
                    onValueChange={(v) => setManualType(v as 'scenario' | 'knowledge')}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="scenario" id="type-scenario" />
                      <Label htmlFor="type-scenario" className="text-sm cursor-pointer">
                        Scenario <span className="text-muted-foreground">(~4 min)</span>
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="knowledge" id="type-knowledge" />
                      <Label htmlFor="type-knowledge" className="text-sm cursor-pointer">
                        Knowledge <span className="text-muted-foreground">(~2 min)</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddManual}
                    className="bg-[#7800D3] hover:bg-[#6600bb] text-white"
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
      </Card>

      {/* Section C: Interview Duration + Time Allocation */}
      <Card className="p-5 border border-border">
        <h3 className="text-base font-semibold text-[#6474a9] mb-4">Interview Duration</h3>

        <div className="flex items-center gap-3 mb-5">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() =>
              updateInterviewSetup({
                totalDurationMins: Math.max(1, interviewSetup.totalDurationMins - 1),
              })
            }
            disabled={interviewSetup.totalDurationMins <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min={1}
            max={120}
            value={interviewSetup.totalDurationMins}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              if (!isNaN(v) && v >= 1 && v <= 120)
                updateInterviewSetup({ totalDurationMins: v });
            }}
            className="w-20 text-center font-semibold"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() =>
              updateInterviewSetup({
                totalDurationMins: Math.min(120, interviewSetup.totalDurationMins + 1),
              })
            }
            disabled={interviewSetup.totalDurationMins >= 120}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">minutes total</span>
        </div>

        {/* Visual allocation bar */}
        {!isOverBudget && interviewSetup.totalDurationMins > 0 && (
          <div className="mb-4">
            <div className="flex h-3 w-full rounded-full overflow-hidden bg-muted/40 gap-0.5">
              {coreMins > 0 && (
                <div
                  className="bg-blue-500 rounded-l-full transition-all duration-300"
                  style={{ width: `${coreBarPct}%` }}
                />
              )}
              {remainingMins > 0 && showAI && (
                <div
                  className="bg-purple-400 rounded-r-full transition-all duration-300"
                  style={{ width: `${remainingBarPct}%` }}
                />
              )}
              {remainingMins > 0 && !showAI && (
                <div
                  className="bg-muted/60 rounded-r-full transition-all duration-300"
                  style={{ width: `${remainingBarPct}%` }}
                />
              )}
              {coreMins === 0 && <div className="flex-1 bg-muted/40 rounded-full" />}
            </div>
            <div className="flex items-center gap-4 mt-2 text-[10px] flex-wrap">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                Preset Questions
              </span>
              {showAI && (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400" />
                  Adaptive AI
                </span>
              )}
              {!showAI && remainingMins > 0 && (
                <span className="text-muted-foreground">Unused time</span>
              )}
            </div>
          </div>
        )}

        {/* Text breakdown */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm bg-muted/30 rounded-lg px-4 py-3">
          <span>
            <span className="text-muted-foreground text-xs">Preset </span>
            <span className="font-semibold text-blue-600">{coreMins} min</span>
          </span>
          {showAI && (
            <>
              <span className="text-muted-foreground/50">|</span>
              <span>
                <span className="text-muted-foreground text-xs">Adaptive AI </span>
                <span className="font-semibold text-purple-500 italic text-xs">fills rest</span>
              </span>
            </>
          )}
          <span className="text-muted-foreground/50">|</span>
          <span>
            <span className="text-muted-foreground text-xs">Total </span>
            <span className="font-semibold text-foreground">{interviewSetup.totalDurationMins} min</span>
          </span>
        </div>

        {/* Priority note */}
        <p className="mt-2 text-xs text-muted-foreground px-1">
          {showAI
            ? 'Preset Questions play first — Adaptive AI fills whatever time remains.'
            : 'Only your Preset Questions will be asked in the interview.'}
        </p>

        {isOverBudget && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
            <p className="text-sm text-yellow-800">
              Preset questions exceed the total interview duration. Increase the time limit or remove some questions.
            </p>
          </div>
        )}
      </Card>

      {/* Action Button */}
      <div className="pt-1">
        <Button
          onClick={handleNext}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0"
        >
          Next: Review Job Description
        </Button>
      </div>
    </div>
  );
}
