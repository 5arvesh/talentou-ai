import { Check, Copy, MoreVertical, Pencil, SquarePen, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { ApplicationFormTemplate } from "@/types/applicationForm";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: ApplicationFormTemplate;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onRename: () => void;
  onSetDefault: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function TemplateCard({ template, selected, onSelect, onEdit, onRename, onSetDefault, onDuplicate, onDelete }: TemplateCardProps) {
  const usedByJobCount = template.usedByJobCount ?? 0;
  const canDelete = usedByJobCount === 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect()}
      className={cn(
        "rounded-card border bg-card p-4 text-left transition-colors cursor-pointer",
        selected ? "border-primary/30 bg-primary/5" : "border-border hover:bg-secondary"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-foreground truncate">{template.name}</span>
          {template.isDefault && <Badge className="bg-primary text-white shrink-0">Default</Badge>}
          {selected && <Check className="h-4 w-4 text-primary shrink-0" />}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
              <SquarePen className="mr-2 h-3.5 w-3.5" />
              Edit template
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRename} className="cursor-pointer">
              <Pencil className="mr-2 h-3.5 w-3.5" />
              Rename
            </DropdownMenuItem>
            {!template.isDefault && (
              <DropdownMenuItem onClick={onSetDefault} className="cursor-pointer">
                <Star className="mr-2 h-3.5 w-3.5" />
                Set as default
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={onDuplicate} className="cursor-pointer">
              <Copy className="mr-2 h-3.5 w-3.5" />
              Duplicate
            </DropdownMenuItem>
            {canDelete ? (
              <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <DropdownMenuItem disabled className="cursor-not-allowed text-muted-foreground">
                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Remove from all jobs first</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="mt-1.5 text-xs text-muted-foreground">
        {template.fields.length} fields · Used by {usedByJobCount} job{usedByJobCount === 1 ? "" : "s"}
      </p>
    </div>
  );
}
