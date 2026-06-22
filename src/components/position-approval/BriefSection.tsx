import React, { ReactNode } from 'react';
import { MessageCircle, Pencil, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EditSource } from '@/context/PositionApprovalContext';

interface BriefSectionProps {
  eyebrowIcon: LucideIcon;
  eyebrow: string;
  editLabel?: string;
  isEdited: boolean;
  editSource?: EditSource;
  editMode: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  children: ReactNode;
  editContent: ReactNode;
  animationDelay?: number;
}

export function BriefSection({
  eyebrowIcon: Icon,
  eyebrow,
  editLabel,
  isEdited,
  editSource,
  editMode,
  onEdit,
  onSave,
  onCancel,
  children,
  editContent,
  animationDelay = 0,
}: BriefSectionProps) {
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-1 mb-3"
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: 'both' }}
    >
      {/* Eyebrow */}
      <div className="flex items-center gap-1 mb-1.5">
        <Icon className="h-2.5 w-2.5 text-primary" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
          {eyebrow}
        </span>
        {isEdited && (
          <span className="w-[5px] h-[5px] rounded-full bg-[#639922] inline-block ml-1" title="Edited" />
        )}
      </div>

      {/* Card */}
      <div
        className={cn(
          'relative border rounded-lg p-[10px_12px] transition-colors',
          editMode
            ? 'border-primary bg-background'
            : editSource === 'chat'
            ? 'border-[rgba(120,0,211,0.4)] bg-[#faf8ff]'
            : 'border-border bg-card'
        )}
      >
        {/* Always-visible pencil button */}
        {!editMode && (
          <button
            onClick={onEdit}
            className="absolute top-2 right-2.5 flex items-center gap-[3px] text-[10px] text-primary bg-background px-[7px] py-[2px] rounded border border-primary/20 hover:bg-primary/5 transition-colors"
          >
            <Pencil className="h-2.5 w-2.5" />
            {editLabel ?? 'Edit'}
          </button>
        )}

        {/* View content */}
        {!editMode && (
          <div className="pr-14">
            {children}
            {editSource === 'chat' && (
              <div className="mt-[6px] inline-flex items-center gap-[3px] text-[9px] text-[#7800D3] bg-[#EEEDFE] px-[6px] py-[1px] rounded-full">
                <MessageCircle className="h-[9px] w-[9px]" />
                Updated via chat
              </div>
            )}
          </div>
        )}

        {/* Edit content */}
        {editMode && (
          <div>
            {editContent}
            <div className="flex justify-end gap-1.5 mt-2.5">
              <button
                onClick={onCancel}
                className="text-[11px] border border-border rounded-md px-3 py-1 text-muted-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="text-[11px] bg-primary text-white rounded-md px-3 py-1 hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BriefSection;
