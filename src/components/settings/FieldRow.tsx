import { GripVertical, Lock, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleSwitch } from "./ToggleSwitch";
import { FIELD_TYPE_LABELS } from "@/constants/defaultFormTemplate";
import type { FormField } from "@/types/applicationForm";
import { cn } from "@/lib/utils";

export const FIELD_ROW_GRID = "grid grid-cols-[28px_1fr_130px_64px_72px_32px] items-center gap-2 px-3 py-2";

interface FieldRowProps {
  field: FormField;
  onToggleVisible: (id: string) => void;
  onToggleRequired: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
  dragHandleProps?: Record<string, unknown>;
}

export function FieldRow({ field, onToggleVisible, onToggleRequired, onEdit, onDelete, dragHandleProps }: FieldRowProps) {
  if (field.locked) {
    return (
      <div className={cn(FIELD_ROW_GRID, "border-b border-border last:border-b-0")}>
        <div />
        <span className="text-sm font-medium text-foreground">{field.label}</span>
        <div className="col-span-4 flex items-center gap-1.5 text-[10px] text-primary font-medium bg-primary/5 px-2 py-0.5 rounded-full w-fit">
          <Lock className="h-3 w-3" />
          Locked — always on
        </div>
      </div>
    );
  }

  return (
    <div className={cn(FIELD_ROW_GRID, "border-b border-border last:border-b-0 hover:bg-secondary transition-colors")}>
      <div
        {...(dragHandleProps ?? {})}
        className="flex items-center justify-center text-muted-foreground cursor-grab active:cursor-grabbing"
        title="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      <span className="text-sm text-foreground truncate">{field.label}</span>

      <span className="justify-self-center text-[10px] text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
        {FIELD_TYPE_LABELS[field.fieldType]}
      </span>

      <div className="justify-self-center">
        <ToggleSwitch
          checked={field.visible}
          onChange={() => onToggleVisible(field.id)}
          aria-label={`Toggle visibility for ${field.label}`}
        />
      </div>

      <div className="justify-self-center">
        <ToggleSwitch
          checked={field.required}
          onChange={() => onToggleRequired(field.id)}
          aria-label={`Toggle required for ${field.label}`}
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => onEdit(field.id)} className="cursor-pointer">
            <Pencil className="mr-2 h-3.5 w-3.5" />
            Rename field
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(field.id)} className="cursor-pointer">
            <Pencil className="mr-2 h-3.5 w-3.5" />
            Change field type
          </DropdownMenuItem>
          {field.isCustom && onDelete && (
            <DropdownMenuItem onClick={() => onDelete(field.id)} className="cursor-pointer text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Delete field
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
