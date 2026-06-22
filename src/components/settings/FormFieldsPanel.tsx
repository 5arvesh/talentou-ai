import React, { useState } from "react";
import {
  User, GraduationCap, Briefcase, Award, Building2, Link2, LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormField, FormSection } from "@/types/applicationForm";
import { ToggleSwitch } from "./ToggleSwitch";
import { AddCustomFieldDialog } from "./AddCustomFieldDialog";
import type { NewFieldInput } from "./AddCustomFieldDialog";

const SECTION_ICON_MAP: Record<string, LucideIcon> = {
  User, GraduationCap, Briefcase, Award, Building2, Link2,
};

interface FormFieldsPanelProps {
  sections: FormSection[];
  fields: FormField[];
  onToggleVisible: (id: string) => void;
  onToggleRequired: (id: string) => void;
  onAddField: (sectionId: string, input: NewFieldInput) => void;
  onDeleteField: (id: string) => void;
}

export function FormFieldsPanel({
  sections,
  fields,
  onToggleVisible,
  onToggleRequired,
  onAddField,
}: FormFieldsPanelProps) {
  const [addingSectionId, setAddingSectionId] = useState<string | null>(null);
  const sorted = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="divide-y divide-border">
      {sorted.map((section) => {
        const sectionFields = fields
          .filter((f) => f.sectionId === section.id)
          .sort((a, b) => a.order - b.order);

        const SectionIcon = SECTION_ICON_MAP[section.icon] ?? User;

        return (
          <div key={section.id} className="px-3 py-2.5">
            {/* Section header */}
            <div className="flex items-center gap-1.5 mb-2">
              <SectionIcon className="h-3 w-3 text-primary shrink-0" />
              <span className="text-[11px] font-semibold text-foreground">{section.label}</span>
            </div>

            {/* Column labels */}
            <div className="grid grid-cols-[1fr_28px_28px] gap-1 mb-1 px-1">
              <span className="text-[9px] uppercase tracking-wide text-muted-foreground">Field</span>
              <span className="text-[9px] uppercase tracking-wide text-muted-foreground text-center">Vis</span>
              <span className="text-[9px] uppercase tracking-wide text-muted-foreground text-center">Req</span>
            </div>

            {/* Field rows */}
            <div className="space-y-0">
              {sectionFields.map((field) => (
                <div
                  key={field.id}
                  className="grid grid-cols-[1fr_28px_28px] gap-1 items-center py-1.5 border-b border-border/40 last:border-b-0"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full shrink-0",
                        field.visible ? "bg-primary" : "bg-border"
                      )}
                    />
                    <span className="text-[11px] text-foreground truncate">{field.label}</span>
                    {field.locked && (
                      <span className="text-[9px] text-muted-foreground shrink-0">· locked</span>
                    )}
                  </div>

                  {field.locked ? (
                    <>
                      <div className="flex justify-center">
                        <ToggleSwitch checked disabled onChange={() => {}} aria-label="Visible" />
                      </div>
                      <div className="flex justify-center">
                        <ToggleSwitch checked disabled onChange={() => {}} aria-label="Required" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <ToggleSwitch
                          checked={field.visible}
                          onChange={() => onToggleVisible(field.id)}
                          aria-label={`Toggle visibility for ${field.label}`}
                        />
                      </div>
                      <div className="flex justify-center">
                        <ToggleSwitch
                          checked={field.required}
                          onChange={() => onToggleRequired(field.id)}
                          aria-label={`Toggle required for ${field.label}`}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Add field link */}
            <button
              onClick={() => setAddingSectionId(section.id)}
              className="mt-2 text-[11px] text-primary hover:underline cursor-pointer"
            >
              + Add field
            </button>

            <AddCustomFieldDialog
              open={addingSectionId === section.id}
              onOpenChange={(open) => !open && setAddingSectionId(null)}
              onAdd={(input) => {
                onAddField(section.id, input);
                setAddingSectionId(null);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FormFieldsPanel;
