import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionBlock } from "./SectionBlock";
import type { NewFieldInput } from "./AddCustomFieldDialog";
import { CUSTOM_FIELD_TYPES, FIELD_TYPE_LABELS } from "@/constants/defaultFormTemplate";
import type { FieldType, FormField, FormSection } from "@/types/applicationForm";

interface TemplateEditorProps {
  sections: FormSection[];
  fields: FormField[];
  onFieldsChange: (fields: FormField[]) => void;
  sectionFilter?: (sectionId: string) => boolean;
}

interface EditFieldState {
  label: string;
  fieldType: FieldType;
  options: string[];
}

function EditFieldDialog({
  field,
  onClose,
  onSave,
}: {
  field: FormField;
  onClose: () => void;
  onSave: (id: string, updates: EditFieldState) => void;
}) {
  const [label, setLabel] = useState(field.label);
  const [fieldType, setFieldType] = useState<FieldType>(field.fieldType);
  const [options, setOptions] = useState<string[]>(field.options && field.options.length > 0 ? field.options : [""]);

  const typeOptions = Array.from(new Set<FieldType>([field.fieldType, ...CUSTOM_FIELD_TYPES]));

  const handleSave = () => {
    if (!label.trim()) return;
    onSave(field.id, {
      label: label.trim(),
      fieldType,
      options: options.map((o) => o.trim()).filter(Boolean),
    });
  };

  return (
    <Dialog open onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit field</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-field-label">Field name</Label>
            <Input id="edit-field-label" value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Field type</Label>
            <Select value={fieldType} onValueChange={(value) => setFieldType(value as FieldType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {FIELD_TYPE_LABELS[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {fieldType === "dropdown" && (
            <div className="space-y-1.5">
              <Label>Options</Label>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) =>
                        setOptions((prev) => prev.map((o, i) => (i === index ? e.target.value : o)))
                      }
                      placeholder={`Option ${index + 1}`}
                    />
                    {options.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => setOptions((prev) => prev.filter((_, i) => i !== index))}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary"
                onClick={() => setOptions((prev) => [...prev, ""])}
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add option
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/90" onClick={handleSave} disabled={!label.trim()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TemplateEditor({ sections, fields, onFieldsChange, sectionFilter }: TemplateEditorProps) {
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const editingField = fields.find((f) => f.id === editingFieldId) ?? null;

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

  const handleReorder = (sectionId: string, orderedIds: string[]) => {
    const lockedCount = fields.filter((f) => f.sectionId === sectionId && f.locked).length;
    const orderMap = new Map(orderedIds.map((id, idx) => [id, lockedCount + idx]));
    onFieldsChange(
      fields.map((f) => {
        if (f.sectionId !== sectionId || f.locked) return f;
        const order = orderMap.get(f.id);
        return order === undefined ? f : { ...f, order };
      })
    );
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

  const handleEditSave = (id: string, updates: EditFieldState) => {
    onFieldsChange(
      fields.map((f) => {
        if (f.id !== id) return f;
        return {
          ...f,
          label: updates.label,
          fieldType: updates.fieldType,
          options: updates.fieldType === "dropdown" ? updates.options : undefined,
        };
      })
    );
    setEditingFieldId(null);
  };

  return (
    <div className="space-y-4">
      {visibleSections.map((section) => (
        <SectionBlock
          key={section.id}
          section={section}
          fields={fields.filter((f) => f.sectionId === section.id)}
          onToggleVisible={handleToggleVisible}
          onToggleRequired={handleToggleRequired}
          onEdit={setEditingFieldId}
          onDelete={handleDelete}
          onReorder={handleReorder}
          onAddField={handleAddField}
        />
      ))}

      {editingField && (
        <EditFieldDialog field={editingField} onClose={() => setEditingFieldId(null)} onSave={handleEditSave} />
      )}
    </div>
  );
}
