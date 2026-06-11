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
import { ToggleSwitch } from "./ToggleSwitch";
import { CUSTOM_FIELD_TYPES, FIELD_TYPE_LABELS } from "@/constants/defaultFormTemplate";
import type { FieldType } from "@/types/applicationForm";

export interface NewFieldInput {
  label: string;
  fieldType: FieldType;
  visible: boolean;
  required: boolean;
  options?: string[];
}

interface AddCustomFieldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (field: NewFieldInput) => void;
}

const DEFAULT_STATE = {
  label: "",
  fieldType: "text" as FieldType,
  visible: true,
  required: false,
  options: [""],
};

export function AddCustomFieldDialog({ open, onOpenChange, onAdd }: AddCustomFieldDialogProps) {
  const [label, setLabel] = useState(DEFAULT_STATE.label);
  const [fieldType, setFieldType] = useState<FieldType>(DEFAULT_STATE.fieldType);
  const [visible, setVisible] = useState(DEFAULT_STATE.visible);
  const [required, setRequired] = useState(DEFAULT_STATE.required);
  const [options, setOptions] = useState<string[]>(DEFAULT_STATE.options);

  const reset = () => {
    setLabel(DEFAULT_STATE.label);
    setFieldType(DEFAULT_STATE.fieldType);
    setVisible(DEFAULT_STATE.visible);
    setRequired(DEFAULT_STATE.required);
    setOptions(DEFAULT_STATE.options);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleAdd = () => {
    if (!label.trim()) return;
    const cleanedOptions = options.map((o) => o.trim()).filter(Boolean);
    onAdd({
      label: label.trim(),
      fieldType,
      visible,
      required,
      ...(fieldType === "dropdown" ? { options: cleanedOptions } : {}),
    });
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add custom field</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="custom-field-label">Field name</Label>
            <Input
              id="custom-field-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Notice period"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Field type</Label>
            <Select value={fieldType} onValueChange={(value) => setFieldType(value as FieldType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CUSTOM_FIELD_TYPES.map((type) => (
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

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Visible to candidates</Label>
            <ToggleSwitch checked={visible} onChange={setVisible} aria-label="Visible to candidates" />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-normal">Required</Label>
            <ToggleSwitch checked={required} onChange={setRequired} aria-label="Required" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/90" onClick={handleAdd} disabled={!label.trim()}>
            Add field
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
