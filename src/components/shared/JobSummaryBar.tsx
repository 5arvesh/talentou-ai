import { cn } from "@/lib/utils";
import { JobItem } from "./ModernJobList";

interface JobSummaryBarProps {
  jobs: JobItem[];
}

export function JobSummaryBar({ jobs }: JobSummaryBarProps) {
  const total = jobs.length;
  const stale = jobs.filter((j) => (j.daysOpen ?? 14) >= 21).length;
  const newApplicants = jobs.reduce((sum, j) => sum + (j.newApplicants ?? 0), 0);
  const highPriorityNoPipeline = jobs.filter(
    (j) => (j.priority || "").toLowerCase() === "high" && (j.applicants ?? j.openCandidates ?? 0) === 0
  ).length;

  const stats = [
    { label: "Total Open Reqs", value: total, className: "text-primary" },
    { label: "Stale (21d+)", value: stale, className: "text-warning" },
    { label: "New Applicants", value: newApplicants, className: "text-info" },
    { label: "High Priority, No Pipeline", value: highPriorityNoPipeline, className: "text-destructive" },
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
