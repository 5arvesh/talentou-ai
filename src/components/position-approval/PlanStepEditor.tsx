import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlanStepEditorProps {
  steps: string[];
  editingIndex: number | null;
  draft: string;
  onStartEdit: (i: number) => void;
  onDraftChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onRemove: (i: number) => void;
  onAdd: () => void;
}

export function PlanStepEditor({
  steps, editingIndex, draft, onStartEdit, onDraftChange, onSave, onCancel, onRemove, onAdd,
}: PlanStepEditorProps) {
  return (
    <div className="space-y-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-2">
          {/* Numbered bubble */}
          <div className="w-4 h-4 rounded-full bg-[#EEEDFE] text-[#3C3489] font-sora text-[9px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
            {i + 1}
          </div>

          {editingIndex === i ? (
            <div className="flex-1 space-y-1.5">
              <textarea
                autoFocus
                rows={2}
                value={draft}
                onChange={(e) => onDraftChange(e.target.value)}
                className="w-full border border-primary rounded-md text-[11px] p-[5px_8px] resize-none outline-none leading-snug"
              />
              <div className="flex gap-1.5">
                <button
                  onClick={onCancel}
                  className="text-[9px] border border-border rounded-md px-2 py-[3px] text-muted-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onSave}
                  className="text-[9px] bg-primary text-white rounded-md px-2 py-[3px] hover:bg-primary/90 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => onRemove(i)}
                  className="text-[9px] border border-destructive/20 text-destructive rounded-md px-2 py-[3px] hover:bg-destructive/5 transition-colors ml-auto"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <p
              onClick={() => onStartEdit(i)}
              className={cn(
                'flex-1 text-[11px] text-muted-foreground leading-snug cursor-text',
                'hover:text-foreground transition-colors'
              )}
            >
              {step || <span className="italic opacity-50">Empty step — click to edit</span>}
            </p>
          )}
        </div>
      ))}

      <button
        onClick={onAdd}
        className="flex items-center gap-1 text-[10px] text-primary hover:underline cursor-pointer"
      >
        <Plus className="h-3 w-3" />
        Add a step
      </button>
    </div>
  );
}

export default PlanStepEditor;
