import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, User, GraduationCap, Briefcase, Award, Building2, Link2, type LucideIcon } from "lucide-react";
import { FieldRow, FIELD_ROW_GRID } from "./FieldRow";
import { AddCustomFieldDialog, type NewFieldInput } from "./AddCustomFieldDialog";
import type { FormField, FormSection } from "@/types/applicationForm";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  User,
  GraduationCap,
  Briefcase,
  Award,
  Building2,
  Link2,
};

interface SectionBlockProps {
  section: FormSection;
  fields: FormField[];
  onToggleVisible: (id: string) => void;
  onToggleRequired: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (sectionId: string, orderedIds: string[]) => void;
  onAddField: (sectionId: string, field: NewFieldInput) => void;
}

function SortableFieldRow({
  field,
  onToggleVisible,
  onToggleRequired,
  onEdit,
  onDelete,
}: {
  field: FormField;
  onToggleVisible: (id: string) => void;
  onToggleRequired: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <FieldRow
        field={field}
        onToggleVisible={onToggleVisible}
        onToggleRequired={onToggleRequired}
        onEdit={onEdit}
        onDelete={onDelete}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export function SectionBlock({ section, fields, onToggleVisible, onToggleRequired, onEdit, onDelete, onReorder, onAddField }: SectionBlockProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const Icon = ICON_MAP[section.icon] ?? User;

  const sortedFields = [...fields].sort((a, b) => a.order - b.order);
  const lockedFields = sortedFields.filter((f) => f.locked);
  const sortableFields = sortedFields.filter((f) => !f.locked);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sortableFields.findIndex((f) => f.id === active.id);
    const newIndex = sortableFields.findIndex((f) => f.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(sortableFields, oldIndex, newIndex);
    onReorder(section.id, reordered.map((f) => f.id));
  };

  return (
    <div className="rounded-card border border-border overflow-hidden bg-card">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary border-b border-border">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">{section.label}</span>
      </div>

      <div className={cn(FIELD_ROW_GRID, "bg-secondary text-[10px] uppercase tracking-wide text-muted-foreground border-b border-border")}>
        <div />
        <div>Field name</div>
        <div className="justify-self-center">Type</div>
        <div className="justify-self-center">Visible</div>
        <div className="justify-self-center">Required</div>
        <div />
      </div>

      {lockedFields.map((field) => (
        <FieldRow
          key={field.id}
          field={field}
          onToggleVisible={onToggleVisible}
          onToggleRequired={onToggleRequired}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sortableFields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          {sortableFields.map((field) => (
            <SortableFieldRow
              key={field.id}
              field={field}
              onToggleVisible={onToggleVisible}
              onToggleRequired={onToggleRequired}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        type="button"
        onClick={() => setAddDialogOpen(true)}
        className="w-full flex items-center gap-1.5 px-3 py-2.5 text-sm text-primary hover:bg-primary/5 transition-colors"
      >
        <Plus className="h-3.5 w-3.5" />
        Add custom field
      </button>

      <AddCustomFieldDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={(field) => onAddField(section.id, field)}
      />
    </div>
  );
}
