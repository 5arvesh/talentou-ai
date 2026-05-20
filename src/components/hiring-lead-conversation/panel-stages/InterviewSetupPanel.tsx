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
import { Plus, Minus, Trash2, Clock, ChevronDown, ChevronUp, Sparkles, Pencil, Check, X, GripVertical, RefreshCw } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

interface SortableQuestionItemProps {
  q: CoreQuestion;
  index: number;
  editingId: string | null;
  editText: string;
  openAnswerKeys: Set<string>;
  onEditText: (text: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onStartEdit: (q: CoreQuestion) => void;
  onRegenerate: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleAnswerKey: (id: string) => void;
}

function SortableQuestionItem({
  q, index, editingId, editText, openAnswerKeys,
  onEditText, onSaveEdit, onCancelEdit, onStartEdit, onRegenerate, onDelete, onToggleAnswerKey,
}: SortableQuestionItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: q.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isEditing = editingId === q.id;

  return (
    <Card ref={setNodeRef} style={style} className="p-3 bg-muted/20 border border-border/60">
      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={editText}
            onChange={(e) => onEditText(e.target.value)}
            rows={2}
            className="text-sm resize-none"
            autoFocus
          />
          <div className="flex gap-2">
            <Button type="button" size="sm" className="h-7 bg-[#7800D3] hover:bg-[#6600bb] text-white" onClick={() => onSaveEdit(q.id)}>
              <Check className="h-3 w-3 mr-1" /> Save
            </Button>
            <Button type="button" size="sm" variant="outline" className="h-7" onClick={onCancelEdit}>
              <X className="h-3 w-3 mr-1" /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          {/* Drag handle + number — horizontal */}
          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing touch-none text-muted-foreground hover:text-foreground"
              title="Drag to reorder"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <span className="text-[10px] font-bold text-[#7800D3] bg-[#7800D3]/10 rounded-full w-5 h-5 flex items-center justify-center leading-none shrink-0">
              {index + 1}
            </span>
          </div>

          <p className="flex-1 text-sm text-foreground leading-snug">{q.text}</p>

          <div className="flex items-center gap-1 shrink-0">
            <Badge variant="outline" className={`text-xs ${q.type === 'scenario' ? 'border-blue-300 text-blue-700 bg-blue-50' : 'border-gray-300 text-gray-600 bg-gray-50'}`}>
              {q.type === 'scenario' ? 'Scenario' : 'Knowledge'}
            </Badge>
            <Badge variant="outline" className="text-xs flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />{q.estimatedMinutes} min
            </Badge>
            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-[#7800D3]" onClick={() => onStartEdit(q)} title="Edit">
              <Pencil className="h-3 w-3" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-purple-600" onClick={() => onRegenerate(q.id)} title="Regenerate">
              <Sparkles className="h-3 w-3" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-red-500" onClick={() => onDelete(q.id)} title="Delete">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {!isEditing && (
        <Collapsible open={openAnswerKeys.has(q.id)} onOpenChange={() => onToggleAnswerKey(q.id)}>
          <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2 ml-9">
            {openAnswerKeys.has(q.id) ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            Answer Key
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="text-xs text-muted-foreground mt-2 bg-muted/40 rounded p-2 leading-relaxed ml-9">
              {q.answerKey || <span className="italic">No answer key provided.</span>}
            </p>
          </CollapsibleContent>
        </Collapsible>
      )}
    </Card>
  );
}

export function InterviewSetupPanel() {
  const navigate = useNavigate();
  const { interviewSetup, updateInterviewSetup, completeStage } = useHiringLeadConversation();

  const [openAnswerKeys, setOpenAnswerKeys] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = interviewSetup.coreQuestions.findIndex((q) => q.id === active.id);
      const newIndex = interviewSetup.coreQuestions.findIndex((q) => q.id === over.id);
      updateInterviewSetup({ coreQuestions: arrayMove(interviewSetup.coreQuestions, oldIndex, newIndex) });
    }
  };

  const handleRegenerateAll = () => {
    const shuffled = [...AI_QUESTION_POOL].sort(() => Math.random() - 0.5);
    const ts = Date.now();
    updateInterviewSetup({ coreQuestions: shuffled.slice(0, 3).map((q, i) => ({ ...q, id: `q-ai-${ts}-${i}` })) });
  };

  const handleAddAIQuestion = () => {
    const usedTexts = new Set(interviewSetup.coreQuestions.map((q) => q.text));
    const available = AI_QUESTION_POOL.filter((q) => !usedTexts.has(q.text));
    const source = available.length > 0 ? available[0] : AI_QUESTION_POOL[Math.floor(Math.random() * AI_QUESTION_POOL.length)];
    updateInterviewSetup({ coreQuestions: [...interviewSetup.coreQuestions, { ...source, id: `q-ai-${Date.now()}` }] });
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

  const total = interviewSetup.coreQuestions.length;

  return (
    <div className="space-y-5">
      {/* Interview Questions */}
      <Card className="p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#7800D3]">Interview Questions</h3>
            {total > 0 && (
              <Badge variant="secondary" className="text-xs font-normal">
                {total} question{total !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <Button
            type="button" variant="ghost" size="sm"
            className="h-7 text-xs text-muted-foreground hover:text-[#7800D3] gap-1.5 px-2"
            onClick={handleRegenerateAll}
            title="Regenerate all questions"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Regenerate All
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Drag questions to reprioritize. The order shown is the order asked.
        </p>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={interviewSetup.coreQuestions.map((q) => q.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {interviewSetup.coreQuestions.map((q, index) => (
                <SortableQuestionItem
                  key={q.id}
                  q={q}
                  index={index}
                  editingId={editingId}
                  editText={editText}
                  openAnswerKeys={openAnswerKeys}
                  onEditText={setEditText}
                  onSaveEdit={saveEdit}
                  onCancelEdit={() => setEditingId(null)}
                  onStartEdit={startEdit}
                  onRegenerate={handleRegenerateOne}
                  onDelete={handleDelete}
                  onToggleAnswerKey={toggleAnswerKey}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Card>

      {/* Add AI Question */}
      <div className="flex justify-center">
        <Button
          type="button" variant="outline" size="sm"
          className="h-8 text-xs border-[#7800D3]/30 text-[#7800D3] hover:bg-[#7800D3]/8 gap-1.5"
          onClick={handleAddAIQuestion}
          disabled={interviewSetup.coreQuestions.length >= AI_QUESTION_POOL.length}
        >
          <Plus className="h-3.5 w-3.5" />
          <Sparkles className="h-3.5 w-3.5" />
          Add AI Question
        </Button>
      </div>

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
