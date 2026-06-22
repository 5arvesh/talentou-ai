import { useState } from "react";
import type { NewFieldInput } from "./AddCustomFieldDialog";
import { FormFieldsPanel } from "./FormFieldsPanel";
import { FormPreview } from "./FormPreview";
import type { FormField, FormSection } from "@/types/applicationForm";

interface TemplateEditorProps {
  sections: FormSection[];
  fields: FormField[];
  onFieldsChange: (fields: FormField[]) => void;
  sectionFilter?: (sectionId: string) => boolean;
}

export function TemplateEditor({ sections, fields, onFieldsChange, sectionFilter }: TemplateEditorProps) {
  const [, forceRender] = useState(0);

  const visibleSections = sections
    .filter((s) => !sectionFilter || sectionFilter(s.id))
    .sort((a, b) => a.order - b.order);

  const handleToggleVisible = (id: string) => {
    onFieldsChange(
      fields.map((f) => {
        if (f.id !== id) return f;
        const visible = !f.visible;
        return { ...f, visible, required: visible ? f.required : false };
      })
    );
  };

  const handleToggleRequired = (id: string) => {
    onFieldsChange(
      fields.map((f) => {
        if (f.id !== id) return f;
        const required = !f.required;
        return { ...f, required, visible: required ? true : f.visible };
      })
    );
  };

  const handleDelete = (id: string) => {
    onFieldsChange(fields.filter((f) => f.id !== id));
  };

  const handleAddField = (sectionId: string, input: NewFieldInput) => {
    const sectionFields = fields.filter((f) => f.sectionId === sectionId);
    const maxOrder = sectionFields.length > 0 ? Math.max(...sectionFields.map((f) => f.order)) : -1;
    const newField: FormField = {
      id: crypto.randomUUID(),
      label: input.label,
      fieldType: input.fieldType,
      visible: input.visible,
      required: input.required,
      locked: false,
      sectionId,
      order: maxOrder + 1,
      isCustom: true,
      ...(input.options ? { options: input.options } : {}),
    };
    onFieldsChange([...fields, newField]);
  };

  const handleRenameField = (id: string, newLabel: string) => {
    onFieldsChange(fields.map((f) => (f.id === id ? { ...f, label: newLabel } : f)));
    forceRender((n) => n + 1);
  };

  return (
    <div className="flex min-h-[600px] border border-border rounded-lg overflow-hidden">
      {/* Left panel — field toggles */}
      <div className="w-[280px] shrink-0 border-r border-border overflow-y-auto bg-background">
        <div className="p-3 border-b border-border">
          <h3 className="text-[12px] font-semibold text-foreground">Form fields</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">Toggle fields on or off for this form</p>
        </div>
        <FormFieldsPanel
          sections={visibleSections}
          fields={fields}
          onToggleVisible={handleToggleVisible}
          onToggleRequired={handleToggleRequired}
          onAddField={handleAddField}
          onDeleteField={handleDelete}
        />
      </div>

      {/* Right panel — careers-page preview */}
      <div className="flex-1 overflow-y-auto bg-muted/20 p-5">
        <FormPreview
          sections={visibleSections}
          fields={fields}
          onRenameField={handleRenameField}
        />
      </div>
    </div>
  );
}
