import React, { useState, useEffect } from 'react';
import { useHiringLeadConversation } from '@/context/HiringLeadConversationContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ClipboardList, Plus, Trash2, Sparkles, Pencil, Check, X, GripVertical, RefreshCw } from 'lucide-react';
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

type ScreeningQ = { id: string; text: string; type: 'text' | 'yesno' };

const AI_SCREENING_POOL: Omit<ScreeningQ, 'id'>[] = [
  { text: 'Do you have at least 3 years of relevant experience?', type: 'yesno' },
  { text: 'Are you open to relocation if required?', type: 'yesno' },
  { text: 'What is your current notice period?', type: 'text' },
  { text: 'Are you comfortable working in a hybrid setup (2–3 days on-site)?', type: 'yesno' },
  { text: 'Why are you looking for a change at this time?', type: 'text' },
  { text: 'What are your salary expectations for this role?', type: 'text' },
  { text: 'Do you have experience working in an agile / scrum environment?', type: 'yesno' },
  { text: 'Are you authorised to work in this country without sponsorship?', type: 'yesno' },
];

// ── Sortable card ──────────────────────────────────────────────────────────────

interface SortableScreeningItemProps {
  q: ScreeningQ;
  index: number;
  editingId: string | null;
  editText: string;
  editType: 'text' | 'yesno';
  onEditText: (v: string) => void;
  onEditType: (v: 'text' | 'yesno') => void;
  onSave: (id: string) => void;
  onCancelEdit: () => void;
  onStartEdit: (q: ScreeningQ) => void;
  onRegenerate: (id: string) => void;
  onDelete: (id: string) => void;
}

function SortableScreeningItem({
  q, index, editingId, editText, editType,
  onEditText, onEditType, onSave, onCancelEdit, onStartEdit, onRegenerate, onDelete,
}: SortableScreeningItemProps) {
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
        <div className="space-y-3">
          <Textarea
            value={editText}
            onChange={(e) => onEditText(e.target.value)}
            rows={2}
            className="text-sm resize-none"
            autoFocus
          />
          <div>
            <p className="text-xs text-muted-foreground mb-2">Answer type</p>
            <RadioGroup
              value={editType}
              onValueChange={(v) => onEditType(v as 'text' | 'yesno')}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="text" id={`edit-text-${q.id}`} />
                <Label htmlFor={`edit-text-${q.id}`} className="text-sm cursor-pointer">Text response</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="yesno" id={`edit-yesno-${q.id}`} />
                <Label htmlFor={`edit-yesno-${q.id}`} className="text-sm cursor-pointer">Yes / No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex gap-2">
            <Button type="button" size="sm" className="h-7 bg-[#7800D3] hover:bg-[#6600bb] text-white" onClick={() => onSave(q.id)}>
              <Check className="h-3 w-3 mr-1" /> Save
            </Button>
            <Button type="button" size="sm" variant="outline" className="h-7" onClick={onCancelEdit}>
              <X className="h-3 w-3 mr-1" /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          {/* Grip + number */}
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
            <Badge variant="outline" className={`text-xs ${q.type === 'yesno' ? 'border-emerald-300 text-emerald-700 bg-emerald-50' : 'border-gray-300 text-gray-600 bg-gray-50'}`}>
              {q.type === 'yesno' ? 'Yes / No' : 'Text'}
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
    </Card>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────

export function ScreeningQuestionsPanel() {
  const {
    interviewSetup,
    updateInterviewSetup,
    completeStage,
    setCurrentStage,
    addChatMessage,
  } = useHiringLeadConversation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editType, setEditType] = useState<'text' | 'yesno'>('text');
  const [isAddingManual, setIsAddingManual] = useState(false);
  const [newText, setNewText] = useState('');
  const [newType, setNewType] = useState<'text' | 'yesno'>('text');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  useEffect(() => {
    if (interviewSetup.screeningQuestions.length === 0) {
      const ts = Date.now();
      updateInterviewSetup({
        screeningQuestions: AI_SCREENING_POOL.slice(0, 3).map((q, i) => ({
          id: `sq-ai-${ts}-${i}`, text: q.text, type: q.type,
        })),
      });
    }
  }, []);

  const questions = interviewSetup.screeningQuestions as ScreeningQ[];

  // ── Handlers ──

  const handleDelete = (id: string) => {
    updateInterviewSetup({ screeningQuestions: questions.filter(q => q.id !== id) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = questions.findIndex(q => q.id === active.id);
      const newIndex = questions.findIndex(q => q.id === over.id);
      updateInterviewSetup({ screeningQuestions: arrayMove(questions, oldIndex, newIndex) });
    }
  };

  const handleRegenerateOne = (id: string) => {
    const usedTexts = new Set(questions.map(q => q.text));
    const available = AI_SCREENING_POOL.filter(q => !usedTexts.has(q.text));
    const source = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : AI_SCREENING_POOL[Math.floor(Math.random() * AI_SCREENING_POOL.length)];
    const newQ: ScreeningQ = { ...source, id: `sq-ai-${Date.now()}` };
    updateInterviewSetup({ screeningQuestions: questions.map(q => q.id === id ? newQ : q) });
  };

  const handleRegenerateAll = () => {
    const shuffled = [...AI_SCREENING_POOL].sort(() => Math.random() - 0.5);
    const ts = Date.now();
    updateInterviewSetup({
      screeningQuestions: shuffled.slice(0, 3).map((q, i) => ({ ...q, id: `sq-ai-${ts}-${i}` })),
    });
  };

  const handleAddAI = () => {
    const usedTexts = new Set(questions.map(q => q.text));
    const available = AI_SCREENING_POOL.filter(q => !usedTexts.has(q.text));
    const source = available.length > 0 ? available[0] : AI_SCREENING_POOL[Math.floor(Math.random() * AI_SCREENING_POOL.length)];
    updateInterviewSetup({ screeningQuestions: [...questions, { ...source, id: `sq-ai-${Date.now()}` }] });
  };

  const startEdit = (q: ScreeningQ) => {
    setEditingId(q.id);
    setEditText(q.text);
    setEditType(q.type);
  };

  const saveEdit = (id: string) => {
    updateInterviewSetup({ screeningQuestions: questions.map(q => q.id === id ? { ...q, text: editText, type: editType } : q) });
    setEditingId(null);
  };

  const handleAddManual = () => {
    if (!newText.trim()) return;
    updateInterviewSetup({ screeningQuestions: [...questions, { id: `sq-${Date.now()}`, text: newText.trim(), type: newType }] });
    setNewText('');
    setNewType('text');
    setIsAddingManual(false);
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

  const poolExhausted = questions.length >= AI_SCREENING_POOL.length;

  return (
    <div className="space-y-5">
      <Card className="p-5 border border-border">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#7800D3]">Screening Questions</h3>
            {questions.length > 0 && (
              <Badge variant="secondary" className="text-xs font-normal">
                {questions.length} question{questions.length !== 1 ? 's' : ''}
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
          Drag questions to reprioritize. Candidates answer these when applying — use them to pre-screen before the interview.
        </p>

        {/* Sortable list */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {questions.map((q, index) => (
                <SortableScreeningItem
                  key={q.id}
                  q={q}
                  index={index}
                  editingId={editingId}
                  editText={editText}
                  editType={editType}
                  onEditText={setEditText}
                  onEditType={setEditType}
                  onSave={saveEdit}
                  onCancelEdit={() => setEditingId(null)}
                  onStartEdit={startEdit}
                  onRegenerate={handleRegenerateOne}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Add buttons */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <Button
            type="button" variant="outline" size="sm"
            className="h-8 text-xs border-[#7800D3]/30 text-[#7800D3] hover:bg-[#7800D3]/8 gap-1.5"
            onClick={handleAddAI}
            disabled={poolExhausted}
          >
            <Plus className="h-3.5 w-3.5" />
            <Sparkles className="h-3.5 w-3.5" />
            Add AI Question
          </Button>
          <Button
            type="button" variant="ghost" size="sm"
            className="h-8 text-xs text-muted-foreground hover:text-foreground gap-1.5"
            onClick={() => setIsAddingManual(true)}
            disabled={isAddingManual}
          >
            <Plus className="h-3.5 w-3.5" />
            Add Custom Question
          </Button>
        </div>

        {/* Manual add form */}
        {isAddingManual && (
          <Card className="mt-3 p-4 border-2 border-dashed border-[#7800D3]/30 bg-[#faf5ff]/50">
            <div className="space-y-3">
              <Textarea
                placeholder="Enter screening question..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                rows={2}
                className="text-sm resize-none"
                autoFocus
              />
              <div>
                <p className="text-xs text-muted-foreground mb-2">Answer type</p>
                <RadioGroup
                  value={newType}
                  onValueChange={(v) => setNewType(v as 'text' | 'yesno')}
                  className="flex gap-4"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="text" id="sq-new-text" />
                    <Label htmlFor="sq-new-text" className="text-sm cursor-pointer">Text response</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yesno" id="sq-new-yesno" />
                    <Label htmlFor="sq-new-yesno" className="text-sm cursor-pointer">Yes / No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex gap-2">
                <Button type="button" size="sm" onClick={handleAddManual} className="bg-[#7800D3] hover:bg-[#6600bb] text-white">
                  Add Question
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={() => { setIsAddingManual(false); setNewText(''); }}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}
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
