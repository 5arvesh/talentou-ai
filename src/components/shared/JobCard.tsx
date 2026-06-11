import { useState } from "react";
import {
  MapPin,
  Briefcase,
  Clock,
  Building,
  ArrowRight,
  MoreVertical,
  Eye,
  FileText,
  Edit,
  Link as LinkIcon,
  Users,
  Loader2,
  Globe,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getJobStatusColor } from "@/constants/statuses";
import { ALL_COLUMNS, DROPDOWN_FIELDS, JobItem, RoleType, getFieldValue, getPriorityColor } from "./ModernJobList";

interface JobCardProps {
  job: JobItem;
  role: RoleType;
  index: number;
  onAction: (action: string, job: JobItem) => void;
  isCareerEnabled?: boolean;
  onToggleCareer?: (enable: boolean) => void;
  onOpenFile?: (url: string, fileKey: string, fileName: string) => void;
  loadingFile?: string | null;
}

const FUNNEL_STAGES = [
  { key: "appliedCount", label: "Applied", barClass: "bg-primary/30" },
  { key: "screenedCount", label: "Screened", barClass: "bg-primary/55" },
  { key: "interviewCount", label: "Interview", barClass: "bg-primary/80" },
  { key: "selectedCount", label: "Selected", barClass: "bg-primary" },
] as const;

function getFunnelCounts(job: JobItem) {
  const total = job.applicants ?? job.openCandidates ?? parseInt(getFieldValue(job, "applicants"), 10) ?? 0;

  const hasExplicit =
    job.appliedCount !== undefined ||
    job.screenedCount !== undefined ||
    job.interviewCount !== undefined ||
    job.selectedCount !== undefined;

  if (hasExplicit) {
    return {
      appliedCount: job.appliedCount ?? 0,
      screenedCount: job.screenedCount ?? 0,
      interviewCount: job.interviewCount ?? 0,
      selectedCount: job.selectedCount ?? 0,
    };
  }

  const appliedCount = Math.round(total * 0.35);
  const screenedCount = Math.round(total * 0.35);
  const interviewCount = Math.round(total * 0.17);
  const selectedCount = Math.max(total - appliedCount - screenedCount - interviewCount, 0);

  return { appliedCount, screenedCount, interviewCount, selectedCount };
}

export function JobCard({ job, role, index, onAction, isCareerEnabled, onToggleCareer, onOpenFile, loadingFile }: JobCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const daysOpen = job.daysOpen ?? 14;
  const isStale = daysOpen >= 21;
  const newApplicants = job.newApplicants ?? 0;
  const hasNew = newApplicants > 0;
  const funnel = getFunnelCounts(job);
  const detailFields = DROPDOWN_FIELDS[role] || DROPDOWN_FIELDS["ta-leader"];

  return (
    <>
      <div
        className={cn(
          "group relative flex cursor-pointer flex-col gap-3 rounded-card border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-card animate-in fade-in slide-in-from-bottom-1",
          isStale ? "border-l-[3px] border-l-warning" : hasNew ? "border-l-[3px] border-l-info" : ""
        )}
        style={{ animationDelay: `${index * 60}ms` }}
        onClick={() => onAction("view-candidate", job)}
      >
        {/* Top row: priority + status badges, kebab menu */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {job.priority && (
              <Badge variant="outline" className={cn("font-medium px-2 py-0.5 text-xs", getPriorityColor(job.priority))}>
                {job.priority}
              </Badge>
            )}
            <Badge variant="outline" className={cn("font-medium px-2 py-0.5 text-xs", getJobStatusColor(job.status))}>
              {job.status}
            </Badge>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-lg border-gray-100 rounded-xl">
                <DropdownMenuItem onClick={() => onAction("view-candidate", job)} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-primary py-2">
                  <Eye className="mr-2 h-4 w-4 opacity-70" />
                  View Candidates
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onAction("view-jd", job)} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-primary py-2">
                  <FileText className="mr-2 h-4 w-4 opacity-70" />
                  View JD
                </DropdownMenuItem>

                {role === "hiring-lead" && (
                  <DropdownMenuItem onClick={() => onAction("edit-jd", job)} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-primary py-2">
                    <Edit className="mr-2 h-4 w-4 opacity-70" />
                    Edit JD
                  </DropdownMenuItem>
                )}

                {(role === "ta-leader" || role === "hiring-lead") && (
                  <DropdownMenuItem onClick={() => onAction("import-candidates", job)} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-primary py-2">
                    <Users className="mr-2 h-4 w-4 opacity-70" />
                    Import Candidates
                  </DropdownMenuItem>
                )}

                {role === "recruiter" && (
                  <DropdownMenuItem onClick={() => onAction("generate-jd-link", job)} className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-primary py-2">
                    <LinkIcon className="mr-2 h-4 w-4 opacity-70" />
                    Generate JD Link
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(e) => { e.preventDefault(); setDetailsOpen(true); }}
                  className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-primary py-2"
                >
                  <Info className="mr-2 h-4 w-4 opacity-70" />
                  Job Details
                </DropdownMenuItem>

                {(job.sampleCVUrl || job.sampleJDUrl) && (
                  <>
                    <DropdownMenuSeparator />
                    {job.sampleCVUrl && (
                      <DropdownMenuItem
                        onClick={(e) => { e.stopPropagation(); onOpenFile?.(job.sampleCVUrl!, `${job.id}_cv`, `${job.jobRole}_SampleCV.pdf`); }}
                        disabled={loadingFile === `${job.id}_cv`}
                        className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-primary py-2"
                      >
                        {loadingFile === `${job.id}_cv`
                          ? <Loader2 className="mr-2 h-4 w-4 animate-spin opacity-70" />
                          : <FileText className="mr-2 h-4 w-4 opacity-70" />}
                        View Sample CV
                      </DropdownMenuItem>
                    )}
                    {job.sampleJDUrl && (
                      <DropdownMenuItem
                        onClick={(e) => { e.stopPropagation(); onOpenFile?.(job.sampleJDUrl!, `${job.id}_jd`, `${job.jobRole}_SampleJD.pdf`); }}
                        disabled={loadingFile === `${job.id}_jd`}
                        className="cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-primary py-2"
                      >
                        {loadingFile === `${job.id}_jd`
                          ? <Loader2 className="mr-2 h-4 w-4 animate-spin opacity-70" />
                          : <Briefcase className="mr-2 h-4 w-4 opacity-70" />}
                        View Sample JD
                      </DropdownMenuItem>
                    )}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{job.jobRole}</h3>
          <span className="text-xs font-medium text-muted-foreground">#{String(job.id).replace("JOB-", "").padStart(4, "0")}</span>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {getFieldValue(job, "location")}
          </span>
          <span className="inline-flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5" />
            {getFieldValue(job, "experience")} Yrs
          </span>
          <span className={cn("inline-flex items-center gap-1", isStale && "text-warning")}>
            <Clock className="h-3.5 w-3.5" />
            {daysOpen}d open
          </span>
          {hasNew && (
            <span className="inline-flex items-center gap-1 font-medium text-info">
              +{getFieldValue(job, "newApplicants")} new
            </span>
          )}
          {(job.stalledCount ?? 0) > 0 && (
            <span className="inline-flex items-center gap-1 font-medium text-warning">
              <Clock className="h-3.5 w-3.5" />
              {job.stalledCount} stalled
            </span>
          )}
        </div>

        {/* Pipeline funnel */}
        <div className="space-y-1.5 pt-1">
          <div className="flex gap-1">
            {FUNNEL_STAGES.map((stage) => (
              <div key={stage.key} className={cn("h-1.5 flex-1 rounded-full", stage.barClass)} />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1 text-center">
            {FUNNEL_STAGES.map((stage) => (
              <div key={stage.key}>
                <div className="text-sm font-medium text-gray-900">{funnel[stage.key]}</div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{stage.label}</div>
              </div>
            ))}
          </div>
        </div>

        {role === "recruiter" && (
          <div className="flex items-center justify-between rounded-md border border-border/60 bg-muted/30 px-2.5 py-1.5" onClick={(e) => e.stopPropagation()}>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Globe className="h-3.5 w-3.5 opacity-80" />
              Visible on careers page
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-flex">
                    <Switch
                      checked={!!isCareerEnabled}
                      onCheckedChange={(checked) => onToggleCareer?.(checked)}
                      className="data-[state=checked]:bg-green-500 scale-90"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Visible on careers page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building className="h-3.5 w-3.5" />
            {getFieldValue(job, "department")}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
            onClick={(e) => { e.stopPropagation(); onAction("view-pipeline", job); }}
          >
            View Pipeline
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>{job.jobRole} — Job Details</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {detailFields.map((fieldId) => {
              const colDef = ALL_COLUMNS.find((c) => c.id === fieldId);
              if (!colDef) return null;
              return (
                <div key={fieldId} className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{colDef.label}</span>
                  <span className="text-sm font-medium text-gray-800">{getFieldValue(job, fieldId)}</span>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
