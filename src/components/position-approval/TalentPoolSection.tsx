import React from 'react';
import { Info, MapPin } from 'lucide-react';
import { BriefSection } from './BriefSection';
import { PredictiveSearchInput, LOCATION_SUGGESTIONS, INDUSTRY_SUGGESTIONS } from './PredictiveSearchInput';
import { usePositionApproval } from '@/context/PositionApprovalContext';

export function TalentPoolSection({ bare }: { bare?: boolean }) {
  const {
    brief, editSourceMap, editingSection,
    editLocations, editIndustries,
    setEditLocations, setEditIndustries,
    startEditing, saveEdit, cancelEdit,
  } = usePositionApproval();

  if (!brief) return null;

  const isEditing = editingSection === 'talentPool';
  const src = editSourceMap['talentPool'];

  return (
    <BriefSection
      bare={bare}
      eyebrowIcon={MapPin}
      eyebrow="Talent pool"
      isEdited={!!src}
      editSource={src}
      editMode={isEditing}
      onEdit={() => startEditing('talentPool')}
      onSave={saveEdit}
      onCancel={cancelEdit}
      animationDelay={60}
      editContent={
        <div className="space-y-3">
          <PredictiveSearchInput
            label="Locations"
            selected={editLocations}
            suggestions={LOCATION_SUGGESTIONS}
            placeholder="Search city or region…"
            chipType="location"
            onAdd={(item) => setEditLocations([...editLocations, item])}
            onRemove={(item) => setEditLocations(editLocations.filter((l) => l !== item))}
            allowFreeform
          />
          <PredictiveSearchInput
            label="Target industries"
            selected={editIndustries}
            suggestions={INDUSTRY_SUGGESTIONS}
            placeholder="Search industry…"
            chipType="industry"
            onAdd={(item) => setEditIndustries([...editIndustries, item])}
            onRemove={(item) => setEditIndustries(editIndustries.filter((i) => i !== item))}
            allowFreeform
          />
        </div>
      }
    >
      <div>
        <p className="text-[10px] text-muted-foreground mb-1.5">Locations</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {brief.talentPool.locations.map((loc) => (
            <span
              key={loc}
              className="inline-flex items-center gap-1 bg-[#E6F1FB] text-[#0C447C] rounded-full text-[10px] font-medium px-[7px] py-[2px]"
            >
              <MapPin className="h-2.5 w-2.5" />
              {loc}
            </span>
          ))}
        </div>

        <p className="text-[10px] text-muted-foreground mb-1.5">Target industries</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {brief.talentPool.industries.map((ind) => (
            <span
              key={ind}
              className="inline-flex items-center bg-[#EEEDFE] text-[#3C3489] rounded-full text-[10px] font-medium px-[7px] py-[2px]"
            >
              {ind}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-2">
          <Info className="h-3 w-3 shrink-0" />
          <span>Based on role type + team location. Industries from last 6 similar hires.</span>
        </div>
      </div>
    </BriefSection>
  );
}

export default TalentPoolSection;
