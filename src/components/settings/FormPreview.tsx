import React, { useState } from "react";
import { Building2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FieldType, FormField, FormSection } from "@/types/applicationForm";

interface FormPreviewProps {
  sections: FormSection[];
  fields: FormField[];
  onRenameField: (id: string, newLabel: string) => void;
}

function PreviewInput({ type = "text" }: { type?: string }) {
  return (
    <input
      type={type}
      placeholder="Type here…"
      disabled
      className="w-full border border-border rounded-md px-3 py-1.5 text-[12px] text-muted-foreground bg-muted/40 cursor-default"
    />
  );
}

function PreviewFieldElement({ fieldType, options }: { fieldType: FieldType; options?: string[] }) {
  const base = "w-full border border-border rounded-md px-3 py-1.5 text-[12px] text-muted-foreground bg-muted/40 cursor-default";

  if (fieldType === "long_text") {
    return <textarea rows={3} disabled placeholder="Type here…" className={base + " resize-none"} />;
  }
  if (fieldType === "date") {
    return <input type="text" disabled placeholder="DD / MM / YYYY" className={base} />;
  }
  if (fieldType === "file") {
    return (
      <div className="border-2 border-dashed border-border rounded-md p-4 text-center text-[11px] text-muted-foreground cursor-default">
        Click to upload or drag & drop
      </div>
    );
  }
  if (fieldType === "dropdown") {
    return (
      <select disabled className={base + " appearance-none"}>
        <option>Select…</option>
        {(options ?? []).map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    );
  }
  if (fieldType === "yes_no") {
    return (
      <div className="flex gap-2">
        {["Yes", "No"].map((opt) => (
          <div
            key={opt}
            className="border border-border rounded-md px-4 py-1.5 text-[12px] text-muted-foreground cursor-default"
          >
            {opt}
          </div>
        ))}
      </div>
    );
  }
  if (fieldType === "email") return <PreviewInput type="email" />;
  if (fieldType === "number") return <PreviewInput type="number" />;
  if (fieldType === "url") return <PreviewInput type="url" />;
  return <PreviewInput />;
}

function PreviewField({
  field,
  isEditing,
  draftLabel,
  onStartEdit,
  onDraftChange,
  onSave,
  onCancel,
}: {
  field: FormField;
  isEditing: boolean;
  draftLabel: string;
  onStartEdit: () => void;
  onDraftChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const canEdit = !field.locked;

  return (
    <div className={cn("space-y-1", (field.fieldType === "long_text" || field.fieldType === "file") && "col-span-2")}>
      {/* Label row */}
      <div className="flex items-center gap-1.5 group">
        {isEditing ? (
          <input
            autoFocus
            value={draftLabel}
            onChange={(e) => onDraftChange(e.target.value)}
            onBlur={onSave}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); onSave(); }
              if (e.key === "Escape") onCancel();
            }}
            className="text-[11px] font-medium border-b border-primary bg-transparent focus:outline-none flex-1"
          />
        ) : (
          <span
            onClick={canEdit ? onStartEdit : undefined}
            className={cn(
              "text-[11px] font-medium text-foreground",
              canEdit && "cursor-text hover:text-primary transition-colors"
            )}
          >
            {field.label}
          </span>
        )}
        {field.required && !isEditing && (
          <span className="text-[11px] text-destructive font-medium">*</span>
        )}
        {canEdit && !isEditing && (
          <Pencil className="h-2.5 w-2.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      {/* Form element */}
      <PreviewFieldElement fieldType={field.fieldType} options={field.options} />
    </div>
  );
}

export function FormPreview({ sections, fields, onRenameField }: FormPreviewProps) {
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [draftLabel, setDraftLabel] = useState("");

  const startEdit = (field: FormField) => {
    setEditingFieldId(field.id);
    setDraftLabel(field.label);
  };

  const saveEdit = () => {
    if (editingFieldId && draftLabel.trim()) {
      onRenameField(editingFieldId, draftLabel.trim());
    }
    setEditingFieldId(null);
    setDraftLabel("");
  };

  const cancelEdit = () => {
    setEditingFieldId(null);
    setDraftLabel("");
  };

  const sorted = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div>
      {/* Careers page chrome */}
      <div className="bg-card border border-border rounded-lg p-5 mb-5">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-3">
          <Building2 className="h-3.5 w-3.5" />
          Talentou AI
        </div>
        <h2 className="font-sora text-[17px] font-semibold text-foreground mb-1">
          Apply for Senior React Developer
        </h2>
        <p className="text-[11px] text-muted-foreground">Bangalore · Full-time · Engineering</p>
        <div className="border-t border-border mt-4" />
      </div>

      {/* Form sections */}
      <div className="bg-card border border-border rounded-lg p-5">
        {sorted.map((section, sIdx) => {
          const visibleFields = fields
            .filter((f) => f.sectionId === section.id && f.visible)
            .sort((a, b) => a.order - b.order);

          if (visibleFields.length === 0) return null;

          return (
            <div key={section.id} className={sIdx > 0 ? "mt-6" : ""}>
              <h3
                className={cn(
                  "text-[12px] font-semibold text-foreground pb-1.5 mb-4",
                  sIdx > 0 && "border-t border-border pt-5 mt-2"
                )}
              >
                {section.label}
              </h3>

              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                {visibleFields.map((field) => (
                  <PreviewField
                    key={field.id}
                    field={field}
                    isEditing={editingFieldId === field.id}
                    draftLabel={draftLabel}
                    onStartEdit={() => startEdit(field)}
                    onDraftChange={setDraftLabel}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Submit button */}
        <button
          disabled
          className="w-full bg-primary text-white rounded-md py-2.5 text-[13px] font-medium mt-8 cursor-default opacity-75"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}

export default FormPreview;
