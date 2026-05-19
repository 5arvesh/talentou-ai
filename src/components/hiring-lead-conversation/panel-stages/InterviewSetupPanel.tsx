import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHiringLeadConversation } from '@/context/HiringLeadConversationContext';
import type { CoreQuestion } from '@/context/HiringLeadConversationContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, Minus, Trash2, Clock, ChevronDown, ChevronUp, Sparkles, Pencil, Check, X } from 'lucide-react';

const AI_QUESTION_POOL: Omit<CoreQuestion, 'id'>[] = [
  { text: 'Describe a situation where you had to optimize a slow database query in production. What was your approach?', answerKey: 'Indexing, EXPLAIN/ANALYZE, query restructuring, caching considerations, and post-deployment monitoring.', estimatedMinutes: 4, type: 'scenario', source: 'ai' },
  { text: 'What is the difference between REST and GraphQL? When would you choose one over the other?', answerKey: 'REST: stateless, fixed endpoints, good for caching. GraphQL: flexible queries, avoids over-fetching.', estimatedMinutes: 2, type: 'knowledge', source: 'ai' },
  { text: 'Walk me through how you would design a notification system that needs to handle 1 million events per day.', answerKey: 'Event queue (Kafka/RabbitMQ), worker pool, fan-out strategy, idempotency, retry logic, monitoring/alerting.', estimatedMinutes: 5, type: 'scenario', source: 'ai' },
  { text: 'Explain the concept of eventual consistency and when you would use it.', answerKey: 'CAP theorem trade-off, distributed systems, eventual vs strong consistency, use cases like shopping carts or DNS.', estimatedMinutes: 3, type: 'knowledge', source: 'ai' },
  { text: 'Tell me about a time you had to make a critical technical decision under time pressure. What was the outcome?', answerKey: 'STAR format: situation, trade-offs evaluated, decision made, post-mortem learnings.', estimatedMinutes: 4, type: 'scenario', source: 'ai' },
  { text: 'How would you approach refactoring a large legacy codebase with no test coverage?', answerKey: 'Characterization tests first, strangler fig pattern, incremental refactoring, CI gates, team alignment.', estimatedMinutes: 4, type: 'scenario', source: 'ai' },
];

function getDefaultQuestions(): CoreQuestion[] {
  const ts = Date.now();
  return AI_QUESTION_POOL.slice(0, 3).map((q, i) => ({ ...q, id: `q-ai-${ts}-${i}` }));
}

export function InterviewSetupPanel() {
  const navigate = useNavigate();
  const { interviewSetup, updateInterviewSetup, completeStage } = useHiringLeadConversation();

  const [openAnswerKeys, setOpenAnswerKeys] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Auto-load default AI questions on first mount if none exist
  useEffect(() => {
    if (interviewSetup.coreQuestions.length === 0) {
      updateInterviewSetup({ coreQuestions: getDefaultQuestions(), includeAIQuestions: true });
    }
  }, []);

  const toggleAnswerKey = (id: string) => {
    const next = new Set(openAnswerKeys);
    if (next.has(id)) next.delete(id); else next.add(id);
    setOpenAnswerKeys(next);
  };

  const handleDelete = (id: string) => {
    updateInterviewSetup({ coreQuestions: interviewSetup.coreQuestions.filter((q) => q.id !== id) });
  };

  const handleRegenerateOne = (id: string) => {
    const usedTexts = new Set(interviewSetup.coreQuestions.map((q) => q.text));
    const available = AI_QUESTION_POOL.filter((q) => !usedTexts.has(q.text));
    const source = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : AI_QUESTION_POOL[Math.floor(Math.random() * AI_QUESTION_POOL.length)];
    const newQ: CoreQuestion = { ...source, id: `q-ai-${Date.now()}` };
    updateInterviewSetup({ coreQuestions: interviewSetup.coreQuestions.map((q) => q.id === id ? newQ : q) });
  };

  const startEdit = (q: CoreQuestion) => {
    setEditingId(q.id);
    setEditText(q.text);
  };

  const saveEdit = (id: string) => {
    updateInterviewSetup({ coreQuestions: interviewSetup.coreQuestions.map((q) => q.id === id ? { ...q, text: editText } : q) });
    setEditingId(null);
  };

  const handleSave = () => {
    completeStage('interviewSetup');
    navigate('/hiring-lead/jobs');
  };

  return (
    <div className="space-y-5">
      {/* Interview Questions */}
      <Card className="p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#7800D3]">Interview Questions</h3>
            {interviewSetup.coreQuestions.length > 0 && (
              <Badge variant="secondary" className="text-xs font-normal">
                {interviewSetup.coreQuestions.length} question{interviewSetup.coreQuestions.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Questions generated by AI — you can edit, regenerate, or delete them.
        </p>

        <div className="space-y-3">
          {interviewSetup.coreQuestions.map((q) => (
            <Card key={q.id} className="p-3 bg-muted/20 border border-border/60">
              {editingId === q.id ? (
                <div className="space-y-2">
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={2}
                    className="text-sm resize-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button type="button" size="sm" className="h-7 bg-[#7800D3] hover:bg-[#6600bb] text-white" onClick={() => saveEdit(q.id)}>
                      <Check className="h-3 w-3 mr-1" /> Save
                    </Button>
                    <Button type="button" size="sm" variant="outline" className="h-7" onClick={() => setEditingId(null)}>
                      <X className="h-3 w-3 mr-1" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-sm text-foreground leading-snug">{q.text}</p>
                  <div className="flex items-center gap-1 shrink-0">
                    <Badge variant="outline" className={`text-xs ${q.type === 'scenario' ? 'border-blue-300 text-blue-700 bg-blue-50' : 'border-gray-300 text-gray-600 bg-gray-50'}`}>
                      {q.type === 'scenario' ? 'Scenario' : 'Knowledge'}
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />{q.estimatedMinutes} min
                    </Badge>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-[#7800D3]" onClick={() => startEdit(q)} title="Edit">
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-purple-600" onClick={() => handleRegenerateOne(q.id)} title="Regenerate">
                      <Sparkles className="h-3 w-3" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-red-500" onClick={() => handleDelete(q.id)} title="Delete">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}

              {editingId !== q.id && (
                <Collapsible open={openAnswerKeys.has(q.id)} onOpenChange={() => toggleAnswerKey(q.id)}>
                  <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2">
                    {openAnswerKeys.has(q.id) ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    Answer Key
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-xs text-muted-foreground mt-2 bg-muted/40 rounded p-2 leading-relaxed">
                      {q.answerKey || <span className="italic">No answer key provided.</span>}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </Card>
          ))}
        </div>
      </Card>

      {/* Interview Duration */}
      <Card className="p-5 border border-border">
        <h3 className="text-base font-semibold text-[#7800D3] mb-4">Interview Duration</h3>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0"
            onClick={() => updateInterviewSetup({ totalDurationMins: Math.max(1, interviewSetup.totalDurationMins - 1) })}
            disabled={interviewSetup.totalDurationMins <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <Input type="number" min={1} max={120} value={interviewSetup.totalDurationMins}
            onChange={(e) => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 1 && v <= 120) updateInterviewSetup({ totalDurationMins: v }); }}
            className="w-20 text-center font-semibold" />
          <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0"
            onClick={() => updateInterviewSetup({ totalDurationMins: Math.min(120, interviewSetup.totalDurationMins + 1) })}
            disabled={interviewSetup.totalDurationMins >= 120}>
            <Plus className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">minutes total</span>
        </div>
      </Card>

      <div className="pt-1">
        <Button onClick={handleSave} className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0">
          Save & Finish
        </Button>
      </div>
    </div>
  );
}
