import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
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
import { TemplateCard } from "./TemplateCard";
import { TemplateEditor } from "./TemplateEditor";
import { DEFAULT_FORM_SECTIONS } from "@/constants/defaultFormTemplate";
import type { ApplicationFormTemplate, FormField } from "@/types/applicationForm";

interface SavedTemplatesListProps {
  templates: ApplicationFormTemplate[];
  onTemplatesChange: (templates: ApplicationFormTemplate[]) => void;
  defaultFields: FormField[];
}

function getOverrideSectionIds(templateFields: FormField[], defaultFields: FormField[]): Set<string> {
  const defaultById = new Map(defaultFields.map((f) => [f.id, f]));
  const sectionIds = new Set<string>();

  for (const field of templateFields) {
    const def = defaultById.get(field.id);
    if (!def) {
      sectionIds.add(field.sectionId);
      continue;
    }
    if (
      field.visible !== def.visible ||
      field.required !== def.required ||
      field.label !== def.label ||
      field.fieldType !== def.fieldType ||
      field.order !== def.order ||
      JSON.stringify(field.options ?? []) !== JSON.stringify(def.options ?? [])
    ) {
      sectionIds.add(field.sectionId);
    }
  }

  return sectionIds;
}

export function SavedTemplatesList({ templates, onTemplatesChange, defaultFields }: SavedTemplatesListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const selectedTemplate = templates.find((t) => t.id === selectedId) ?? null;
  const renamingTemplate = templates.find((t) => t.id === renamingId) ?? null;

  const updateTemplate = (id: string, updater: (template: ApplicationFormTemplate) => ApplicationFormTemplate) => {
    onTemplatesChange(templates.map((t) => (t.id === id ? updater(t) : t)));
  };

  const handleCreate = () => {
    const name = newTemplateName.trim();
    if (!name) return;
    const now = new Date().toISOString();
    const newTemplate: ApplicationFormTemplate = {
      id: crypto.randomUUID(),
      name,
      isDefault: false,
      sections: DEFAULT_FORM_SECTIONS,
      fields: defaultFields.map((f) => ({ ...f })),
      usedByJobCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    onTemplatesChange([...templates, newTemplate]);
    setSelectedId(newTemplate.id);
    setNewTemplateName("");
    setCreateDialogOpen(false);
    toast.success(`"${name}" template created`);
  };

  const handleRename = () => {
    if (!renamingTemplate) return;
    const name = renameValue.trim();
    if (!name) return;
    updateTemplate(renamingTemplate.id, (t) => ({ ...t, name, updatedAt: new Date().toISOString() }));
    setRenamingId(null);
    toast.success("Template renamed");
  };

  const handleDuplicate = (template: ApplicationFormTemplate) => {
    const now = new Date().toISOString();
    const copy: ApplicationFormTemplate = {
      ...template,
      id: crypto.randomUUID(),
      name: `${template.name} (copy)`,
      isDefault: false,
      usedByJobCount: 0,
      fields: template.fields.map((f) => ({ ...f })),
      createdAt: now,
      updatedAt: now,
    };
    onTemplatesChange([...templates, copy]);
    setSelectedId(copy.id);
    toast.success(`"${template.name}" duplicated`);
  };

  const handleDelete = (template: ApplicationFormTemplate) => {
    if ((template.usedByJobCount ?? 0) > 0) return;
    onTemplatesChange(templates.filter((t) => t.id !== template.id));
    if (selectedId === template.id) setSelectedId(null);
    toast.success(`"${template.name}" deleted`);
  };

  const handleSetDefault = (template: ApplicationFormTemplate) => {
    onTemplatesChange(templates.map((t) => ({ ...t, isDefault: t.id === template.id })));
    toast.success(`"${template.name}" set as default template`);
  };

  const overrideSectionIds = selectedTemplate ? getOverrideSectionIds(selectedTemplate.fields, defaultFields) : new Set<string>();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            selected={selectedId === template.id}
            onSelect={() => setSelectedId((prev) => (prev === template.id ? null : template.id))}
            onEdit={() => setSelectedId(template.id)}
            onRename={() => {
              setRenamingId(template.id);
              setRenameValue(template.name);
            }}
            onSetDefault={() => handleSetDefault(template)}
            onDuplicate={() => handleDuplicate(template)}
            onDelete={() => handleDelete(template)}
          />
        ))}

        <button
          type="button"
          onClick={() => setCreateDialogOpen(true)}
          className="rounded-card border border-dashed border-border hover:border-primary/30 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-1.5 p-4 text-primary text-sm font-medium min-h-[88px]"
        >
          <Plus className="h-4 w-4" />
          Create new template
        </button>
      </div>

      {selectedTemplate && (
        <div className="space-y-4 pt-2 border-t border-border">
          <div className="rounded-card border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground">
            All default fields are inherited. Configure only the fields you want to change for{" "}
            <span className="font-medium">{selectedTemplate.name}</span>.
          </div>

          {overrideSectionIds.size > 0 ? (
            <TemplateEditor
              sections={DEFAULT_FORM_SECTIONS}
              fields={selectedTemplate.fields}
              onFieldsChange={(fields) => updateTemplate(selectedTemplate.id, (t) => ({ ...t, fields, updatedAt: new Date().toISOString() }))}
              sectionFilter={(sectionId) => overrideSectionIds.has(sectionId)}
            />
          ) : (
            <p className="text-sm text-muted-foreground px-1">
              No customizations yet — toggle a field's visibility, requirement, or add a custom field to create an
              override for this template.
            </p>
          )}

          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => handleSetDefault(selectedTemplate)}>
              Set as default
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90" onClick={() => toast.success("Template saved")}>
              Save template
            </Button>
          </div>
        </div>
      )}

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Create new template</DialogTitle>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="new-template-name">Template name</Label>
            <Input
              id="new-template-name"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              placeholder="e.g. Internships"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90" onClick={handleCreate} disabled={!newTemplateName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!renamingTemplate} onOpenChange={(open) => !open && setRenamingId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Rename template</DialogTitle>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="rename-template-name">Template name</Label>
            <Input id="rename-template-name" value={renameValue} onChange={(e) => setRenameValue(e.target.value)} autoFocus />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenamingId(null)}>
              Cancel
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90" onClick={handleRename} disabled={!renameValue.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
