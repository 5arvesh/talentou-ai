import React from 'react';
import { Info, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BriefSection } from './BriefSection';
import { ChannelCheckboxGrid } from './ChannelCheckboxGrid';
import { usePositionApproval, BriefChannel } from '@/context/PositionApprovalContext';

function yieldBadgeClass(yld: BriefChannel['yield']) {
  if (yld === 'high') return 'bg-[#EAF3DE] text-[#27500A]';
  if (yld === 'medium') return 'bg-[#FAEEDA] text-[#633806]';
  return 'bg-[#F1EFE8] text-[#444441]';
}

function yieldLabel(yld: BriefChannel['yield']) {
  if (yld === 'high') return 'High yield';
  if (yld === 'medium') return 'Medium yield';
  return 'Low yield';
}

export function ChannelListSection({ bare }: { bare?: boolean }) {
  const {
    brief, editSourceMap, editingSection,
    editChannels, editCustomChannels,
    setEditChannels,
    startEditing, saveEdit, cancelEdit,
  } = usePositionApproval();

  if (!brief) return null;

  const isEditing = editingSection === 'channels';
  const src = editSourceMap['channels'];

  return (
    <BriefSection
      bare={bare}
      eyebrowIcon={Radio}
      eyebrow="Recruitment channels"
      isEdited={!!src}
      editSource={src}
      editMode={isEditing}
      onEdit={() => startEditing('channels')}
      onSave={saveEdit}
      onCancel={cancelEdit}
      animationDelay={120}
      editContent={
        <ChannelCheckboxGrid
          selected={editChannels}
          customChannels={editCustomChannels}
          onChange={setEditChannels}
        />
      }
    >
      <div>
        <div className="flex flex-col gap-1 mb-2">
          {brief.channels.map((channel) => (
            <div
              key={channel.rank}
              className="bg-background border border-border rounded-md px-2 py-[5px] flex items-center gap-1.5"
            >
              <span className="font-sora text-[9px] font-semibold text-muted-foreground w-[10px] shrink-0">
                {channel.rank}
              </span>
              <span className="text-[11px] text-foreground flex-1">{channel.name}</span>
              {channel.aiTag && (
                <span className="bg-[#0e0020] text-[#c084fc] rounded-full text-[9px] px-[5px] py-px shrink-0">
                  ✦ {channel.aiTag}
                </span>
              )}
              <span className={cn('rounded-full text-[9px] px-[6px] py-px shrink-0', yieldBadgeClass(channel.yield))}>
                {yieldLabel(channel.yield)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Info className="h-3 w-3 shrink-0" />
          <span>Based on 4 similar React hires in Bangalore</span>
        </div>
      </div>
    </BriefSection>
  );
}

export default ChannelListSection;
