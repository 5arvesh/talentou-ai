import React, { useState } from 'react';
import { useHiringLeadConversation } from '@/context/HiringLeadConversationContext';
import type { TechnicalQuestion } from '@/context/HiringLeadConversationContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertTriangle,
  Bot,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Trash2,
  Clock,
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
  const [manualType, setManualType] = useState<'scenario' | 'factual'>('scenario');
  const [openAnswerKeys, setOpenAnswerKeys] = useState<Set<string>>(new Set());

  const estimatedTechnicalMins = interviewSetup.technicalQuestions.reduce(
    (s, q) => s + q.estimatedMinutes,
    0
  );
  const estimatedBehavioralMins = interviewSetup.allowBehavioralQuestions
    ? Math.max(0, interviewSetup.totalDurationMins - estimatedTechnicalMins)
    : 0;
  const estimatedAIDynamicMins = interviewSetup.allowBehavioralQuestions
    ? 0
    : Math.max(0, interviewSetup.totalDurationMins - estimatedTechnicalMins);
  const isOverBudget = estimatedTechnicalMins > interviewSetup.totalDurationMins;

  const handleGenerateWithAI = () => {
    const ai: TechnicalQuestion[] = [
      {
        id: `q-ai-${Date.now()}-1`,
        text: 'Describe a situation where you had to optimize a slow database query in production. What was your approach?',
        answerKey:
          'Candidate should mention: identifying bottleneck (EXPLAIN/ANALYZE), indexing strategy, query restructuring, caching considerations, and post-deployment monitoring.',
        estimatedMinutes: 4,
        type: 'scenario',
        source: 'ai',
      },
      {
        id: `q-ai-${Date.now()}-2`,
        text: 'What is the difference between REST and GraphQL? When would you choose one over the other?',
        answerKey:
          'REST: stateless, resource-based, fixed endpoints, good for caching. GraphQL: flexible queries, single endpoint, avoids over/under-fetching. Choose GraphQL for complex/varied clients; REST for simpler, cacheable APIs.',
        estimatedMinutes: 2,
        type: 'factual',
        source: 'ai',
      },
      {
        id: `q-ai-${Date.now()}-3`,
        text: 'Walk me through how you would design a notification system that needs to handle 1 million events per day.',
        answerKey:
          'Look for: event queue (Kafka/RabbitMQ), worker pool pattern, fan-out strategy, idempotency, retry logic, monitoring/alerting, and cost considerations.',
        estimatedMinutes: 5,
        type: 'scenario',
        source: 'ai',
      },
    ];
    updateInterviewSetup({
      technicalQuestions: [...interviewSetup.technicalQuestions, ...ai],
    });
  };

  const handleAddManual = () => {
    if (!manualText.trim()) return;
    const q: TechnicalQuestion = {
      id: `q-manual-${Date.now()}`,
      text: manualText.trim(),
      answerKey: manualAnswerKey.trim(),
      estimatedMinutes: manualType === 'scenario' ? 4 : 2,
      type: manualType,
      source: 'manual',
    };
    updateInterviewSetup({
      technicalQuestions: [...interviewSetup.technicalQuestions, q],
    });
    setManualText('');
    setManualAnswerKey('');
    setManualType('scenario');
    setIsAddingManually(false);
  };

  const handleDelete = (id: string) => {
    updateInterviewSetup({
      technicalQuestions: interviewSetup.technicalQuestions.filter((q) => q.id !== id),
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
      stageIndex: 3,
    });
    completeStage('interviewSetup');
    setCurrentStage(3);
  };

  return (
    <div className="space-y-6">
      {/* Section 1: Technical Questions */}
      <Card className="p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#6474a9]">Technical Questions</h3>
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <Bot className="h-3 w-3" />
              AI-assisted
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleGenerateWithAI}
              className="text-xs"
            >
              <Bot className="h-3 w-3 mr-1" />
              Generate with AI
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setIsAddingManually(true)}
              className="text-xs"
              disabled={isAddingManually}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Manually
            </Button>
          </div>
        </div>

        {interviewSetup.technicalQuestions.length === 0 && !isAddingManually && (
          <p className="text-sm text-muted-foreground text-center py-6">
            No questions added yet. Generate with AI or add manually.
          </p>
        )}

        <div className="space-y-3">
          {interviewSetup.technicalQuestions.map((q) => (
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
                    {q.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs flex items-center gap-1 text-muted-foreground">
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
                    onValueChange={(v) => setManualType(v as 'scenario' | 'factual')}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="scenario" id="type-scenario" />
                      <Label htmlFor="type-scenario" className="text-sm cursor-pointer">
                        Scenario (~4 min)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="factual" id="type-factual" />
                      <Label htmlFor="type-factual" className="text-sm cursor-pointer">
                        Factual (~2 min)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex gap-2">
                  <Button type="button" size="sm" onClick={handleAddManual} className="bg-[#7800D3] text-white">
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

      {/* Section 2: Interview Duration */}
      <Card className="p-5 border border-border">
        <h3 className="text-base font-semibold text-[#6474a9] mb-4">Interview Duration</h3>

        <div className="flex items-center gap-3 mb-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8"
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
            className="h-8 w-8"
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

        {/* Live time breakdown */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm bg-muted/30 rounded-lg px-4 py-3">
          <span>
            <span className="text-muted-foreground">Technical: </span>
            <span className="font-semibold text-blue-600">{estimatedTechnicalMins} min</span>
          </span>
          <span className="text-muted-foreground">|</span>
          <span>
            <span className="text-muted-foreground">Behavioral: </span>
            <span className="font-semibold text-orange-600">{estimatedBehavioralMins} min</span>
          </span>
          <span className="text-muted-foreground">|</span>
          <span>
            <span className="text-muted-foreground">AI Dynamic: </span>
            <span className="font-semibold text-purple-600">{estimatedAIDynamicMins} min</span>
          </span>
          <span className="text-muted-foreground">|</span>
          <span>
            <span className="text-muted-foreground">Total: </span>
            <span className="font-semibold text-foreground">{interviewSetup.totalDurationMins} min</span>
          </span>
        </div>

        {isOverBudget && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
            <p className="text-sm text-yellow-800">
              Technical questions exceed your time budget. Increase the interview duration or remove
              some questions.
            </p>
          </div>
        )}
      </Card>

      {/* Section 3: Behavioral Questions Permission */}
      <Card className="p-5 border border-border">
        <h3 className="text-base font-semibold text-[#6474a9] mb-4">Behavioral Questions</h3>
        <div className="flex items-center gap-3">
          <Switch
            id="behavioral-toggle"
            checked={interviewSetup.allowBehavioralQuestions}
            onCheckedChange={(checked) =>
              updateInterviewSetup({ allowBehavioralQuestions: checked })
            }
          />
          <Label htmlFor="behavioral-toggle" className="text-sm cursor-pointer">
            Allow recruiter to add behavioral questions for each candidate
          </Label>
        </div>
        {interviewSetup.allowBehavioralQuestions && (
          <p className="mt-3 text-xs text-muted-foreground bg-muted/30 rounded p-3">
            Estimated behavioral slot:{' '}
            <span className="font-semibold text-orange-600">~{estimatedBehavioralMins} mins</span>{' '}
            (based on remaining time after technical questions)
          </p>
        )}
      </Card>

      {/* Action Button */}
      <div className="pt-2">
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
