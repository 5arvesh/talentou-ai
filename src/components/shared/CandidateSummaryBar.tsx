import { cn } from "@/lib/utils";
import { CandidateItem } from "./ModernCandidateList";

interface CandidateSummaryBarProps {
  candidates: CandidateItem[];
}

const AWAITING_ACTION_STATUSES = ["Shortlisted", "Interview Scheduled"];

export function CandidateSummaryBar({ candidates }: CandidateSummaryBarProps) {
  const total = candidates.length;
  const newThisWeek = candidates.filter((c) => c.isNew).length;
  const highFit = candidates.filter((c) => c.roleFitScore >= 80).length;
  const awaitingAction = candidates.filter(
    (c) => (c.daysInStage ?? 0) >= 5 && AWAITING_ACTION_STATUSES.includes(c.status)
  ).length;

  const stats = [
    { label: "Total Candidates", value: total, className: "text-primary" },
    { label: "New This Week", value: newThisWeek, className: "text-info" },
    { label: "High Fit (80%+)", value: highFit, className: "text-success" },
    { label: "Awaiting Action", value: awaitingAction, className: "text-warning" },
  ];

  return (
    <div className="grid grid-cols-2 divide-x divide-y divide-border/40 overflow-hidden rounded-card border border-border bg-card md:grid-cols-4 md:divide-y-0">
      {stats.map((stat) => (
        <div key={stat.label} className="px-4 py-3">
          <div className={cn("text-2xl font-medium", stat.className)}>{stat.value}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
