import { cn } from "@/lib/utils";

export interface ChipDef<T> {
  id: string;
  label: string;
  dotColorClass?: string;
  filter: (item: T) => boolean;
}

interface TriageChipsBarProps<T> {
  chips: ChipDef<T>[];
  activeChip: string;
  onChipChange: (id: string) => void;
}

export function TriageChipsBar<T>({ chips, activeChip, onChipChange }: TriageChipsBarProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => {
        const isActive = activeChip === chip.id;
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onChipChange(chip.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors",
              isActive
                ? "border-primary bg-primary text-white"
                : "bg-card text-muted-foreground hover:border-primary hover:text-primary"
            )}
          >
            {chip.dotColorClass && (
              <span className={cn("h-1.5 w-1.5 rounded-full", chip.dotColorClass)} />
            )}
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
