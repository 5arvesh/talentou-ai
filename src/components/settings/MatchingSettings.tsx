import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { CheckCircle2, SlidersHorizontal, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToggleSwitch } from "./ToggleSwitch";
import { useMatchingSettingsStore } from "@/store/matching-settings-store";

export function MatchingSettings() {
  const role = localStorage.getItem('userRole');
  const canEdit = role !== 'ta-associate'; // Recruitment Lead edits; Recruiter is read-only

  const {
    highThreshold, lowThreshold, tieBreakGap, autoStepC,
    setHighThreshold, setLowThreshold, setTieBreakGap, setAutoStepC,
  } = useMatchingSettingsStore();

  const isValid = lowThreshold < highThreshold;

  const handleSave = () => {
    toast.success("Matching thresholds saved successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Matching thresholds</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tune how aggressively the AI's bulk-import matching commits to a suggestion — these are starting
          defaults and should be retuned once you have real usage data.
        </p>
      </div>

      {!canEdit && (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm text-muted-foreground">
          <Info className="h-4 w-4 shrink-0" />
          Contact your Recruitment Lead to change these.
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Confidence floors</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Control which suggestions get pre-filled, shown as a suggestion, or withheld entirely</p>
          </div>
        </div>

        <div className="p-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-800">High confidence floor</span>
                <p className="text-xs text-muted-foreground mt-0.5">Score at or above this pre-fills the dropdown and is eligible for "Confirm all high-confidence"</p>
              </div>
              <span className="text-sm font-semibold tabular-nums w-12 text-right text-primary">{highThreshold}%</span>
            </div>
            <Slider
              value={[highThreshold]}
              onValueChange={([val]) => canEdit && setHighThreshold(val)}
              min={0}
              max={100}
              step={1}
              disabled={!canEdit}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-800">Low confidence floor</span>
                <p className="text-xs text-muted-foreground mt-0.5">Score below this routes to Unassigned with no suggestion shown</p>
              </div>
              <span className="text-sm font-semibold tabular-nums w-12 text-right text-primary">{lowThreshold}%</span>
            </div>
            <Slider
              value={[lowThreshold]}
              onValueChange={([val]) => canEdit && setLowThreshold(val)}
              min={0}
              max={100}
              step={1}
              disabled={!canEdit}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-800">Tie-break gap threshold</span>
                <p className="text-xs text-muted-foreground mt-0.5">Within the Medium zone, the AI tie-break only runs if the top two positions score within this many points of each other</p>
              </div>
              <span className="text-sm font-semibold tabular-nums w-12 text-right text-primary">{tieBreakGap}</span>
            </div>
            <Slider
              value={[tieBreakGap]}
              onValueChange={([val]) => canEdit && setTieBreakGap(val)}
              min={0}
              max={50}
              step={1}
              disabled={!canEdit}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div>
              <span className="text-sm font-medium text-gray-800">Automatic tie-break</span>
              <p className="text-xs text-muted-foreground mt-0.5">Auto runs the tie-break automatically; Manual-only leaves ties for the recruiter to resolve</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{autoStepC ? "Auto" : "Manual-only"}</span>
              <ToggleSwitch checked={autoStepC} onChange={setAutoStepC} disabled={!canEdit} aria-label="Automatic tie-break" />
            </div>
          </div>
        </div>

        {!isValid && (
          <div className="mx-5 mb-5 px-4 py-3 rounded-lg border bg-destructive/10 border-destructive/30 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Low floor must be below the high floor</span>
          </div>
        )}
      </div>

      {canEdit && (
        <div className="flex items-center gap-3 pt-2">
          <Button
            onClick={handleSave}
            disabled={!isValid}
            className={cn(
              "hover:opacity-90 font-medium disabled:opacity-50",
              isValid && "bg-success text-success-foreground hover:bg-success/90"
            )}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      )}
    </div>
  );
}

export default MatchingSettings;
