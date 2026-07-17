import React from 'react';
import { Quote } from 'lucide-react';
import { BriefSection } from './BriefSection';
import { usePositionApproval } from '@/context/PositionApprovalContext';

export function CompanyUSPSection({ bare }: { bare?: boolean }) {
  const { brief, editSourceMap, editingSection, editDraft, setEditDraft, startEditing, saveEdit, cancelEdit } =
    usePositionApproval();

  if (!brief) return null;

  const isEditing = editingSection === 'usp';
  const src = editSourceMap['usp'];

  return (
    <BriefSection
      bare={bare}
      tourId="pa-chat-flag"
      eyebrowIcon={Quote}
      eyebrow="Company pitch"
      isEdited={!!src}
      editSource={src}
      editMode={isEditing}
      onEdit={() => startEditing('usp')}
      onSave={saveEdit}
      onCancel={cancelEdit}
      animationDelay={0}
      editContent={
        <div className="space-y-1.5">
          <textarea
            rows={4}
            value={editDraft}
            onChange={(e) => setEditDraft(e.target.value)}
            className="w-full border border-primary rounded-md p-[7px_9px] text-[11px] resize-none outline-none leading-[1.55] focus:shadow-[0_0_0_2px_rgba(120,0,211,0.12)]"
          />
          <p className="text-[10px] text-muted-foreground">
            This edit applies to this position only. To update for all future briefs, go to Settings → Company.
          </p>
        </div>
      }
    >
      <blockquote className="border-l-2 border-primary pl-[9px] text-[11px] italic text-muted-foreground leading-[1.6]">
        {brief.usp}
      </blockquote>
    </BriefSection>
  );
}

export default CompanyUSPSection;
