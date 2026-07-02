import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ThumbsUp, PauseCircle, ThumbsDown } from 'lucide-react';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getRoleFitColor } from "@/components/shared/ModernCandidateList";

export interface ScorecardCandidate {
  name: string;
  initials: string;
  role: string;
  round: string;
  exp: string;
  statusLabel: string;
  fitScore: number;
  aiSummary: string;
}

interface HiringLeadScorecardProps {
  open: boolean;
  onClose: () => void;
  candidate: ScorecardCandidate | null;
}

const ATTRIBUTES = [
  { key: 'technical',     label: 'Technical skill', hint: 'React, TypeScript, architecture' },
  { key: 'problemSolving',label: 'Problem solving', hint: 'Approach, reasoning, edge cases' },
  { key: 'communication', label: 'Communication',   hint: 'Clarity, collaboration' },
  { key: 'cultureAdd',    label: 'Culture add',      hint: 'Values, team fit' },
] as const;

type AttributeKey = typeof ATTRIBUTES[number]['key'];

const RECOMMENDATIONS = [
  { key: 'Advance', icon: ThumbsUp,    selected: 'bg-success text-white border-success',         resting: 'border-success/40 text-success hover:bg-success/5' },
  { key: 'Hold',    icon: PauseCircle, selected: 'bg-warning text-white border-warning',         resting: 'border-warning/40 text-warning hover:bg-warning/5' },
  { key: 'Reject',  icon: ThumbsDown,  selected: 'bg-destructive text-white border-destructive', resting: 'border-destructive/40 text-destructive hover:bg-destructive/5' },
] as const;

function ratingBand(rating: number, value: number): string {
  if (value !== rating) return 'border-border text-muted-foreground hover:border-foreground/40';
  if (rating <= 2) return 'bg-muted text-foreground border-foreground/30';
  if (rating === 3) return 'bg-warning/15 text-warning border-warning';
  return 'bg-success/15 text-success border-success';
}

export function HiringLeadScorecard({ open, onClose, candidate }: HiringLeadScorecardProps) {
  const [ratings, setRatings] = useState<Record<AttributeKey, number>>({} as Record<AttributeKey, number>);
  const [notes, setNotes] = useState('');
  const [recommendation, setRecommendation] = useState<string | null>(null);

  // Reset the form whenever a new candidate is opened
  useEffect(() => {
    if (open) {
      setRatings({} as Record<AttributeKey, number>);
      setNotes('');
      setRecommendation(null);
    }
  }, [open, candidate?.name]);

  if (!candidate) return null;

  const handleSubmit = () => {
    toast.success(`Scorecard submitted — ${candidate.name} marked ${recommendation}`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-lg rounded-card p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="sr-only">Interview scorecard for {candidate.name}</DialogTitle>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="text-sm font-bold">{candidate.initials}</span>
              </div>
              <div className="min-w-0">
                <p className="font-sora text-[17px] font-semibold text-foreground truncate">{candidate.name}</p>
                <p className="text-xs text-muted-foreground truncate">{candidate.role} · {candidate.round}</p>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <Badge variant="outline" className="text-xs bg-muted/60 text-muted-foreground border-border">{candidate.statusLabel}</Badge>
                  <Badge variant="outline" className="text-xs bg-muted/60 text-muted-foreground border-border">{candidate.exp} exp</Badge>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className={cn("font-sora text-3xl font-bold leading-none", getRoleFitColor(candidate.fitScore))}>{candidate.fitScore}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mt-1">AI Fit Score</p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* AI interview summary */}
          <div className="flex items-start gap-2 rounded-lg bg-primary/10 p-3">
            <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-foreground leading-relaxed">
              <span className="font-semibold text-primary">AI interview summary: </span>
              {candidate.aiSummary}
            </p>
          </div>

          {/* Attribute ratings */}
          <div className="space-y-4">
            {ATTRIBUTES.map((attr) => (
              <div key={attr.key} className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{attr.label}</p>
                  <p className="text-xs text-muted-foreground">{attr.hint}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRatings((r) => ({ ...r, [attr.key]: n }))}
                      className={cn(
                        "h-8 w-8 rounded-md border text-sm font-semibold transition-colors",
                        ratingBand(n, ratings[attr.key]),
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-foreground">Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What stood out? Any concerns to flag for the next round?"
              className="mt-1.5 min-h-[72px] resize-none text-sm"
            />
          </div>

          {/* Recommendation */}
          <div>
            <label className="text-sm font-medium text-foreground">Recommendation</label>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {RECOMMENDATIONS.map((rec) => {
                const Icon = rec.icon;
                const isSelected = recommendation === rec.key;
                return (
                  <button
                    key={rec.key}
                    type="button"
                    onClick={() => setRecommendation(rec.key)}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-md border-[1.5px] py-2 text-sm font-medium transition-colors",
                      isSelected ? rec.selected : rec.resting,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {rec.key}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border bg-muted/20">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button
            size="sm"
            className="bg-primary text-white hover:bg-primary/90"
            disabled={!recommendation}
            onClick={handleSubmit}
          >
            Submit scorecard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default HiringLeadScorecard;
