import { Video, Briefcase, Clock, Phone, Mail, Linkedin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getCandidateStatusColor } from "@/constants/statuses";
import { getAvatarColor, getInitials } from "@/lib/avatar";
import { RoleType } from "./ModernJobList";
import { CandidateItem, getFieldValue, getRoleFitColor, getRoleFitFillColor } from "./ModernCandidateList";

interface CandidateCardProps {
  candidate: CandidateItem;
  role: RoleType;
  index: number;
  onAction: (action: string, candidate: CandidateItem) => void;
  selected?: boolean;
  onSelectionChange?: (id: string | number, selected: boolean) => void;
  isNewUnviewed?: boolean;
}

export function CandidateCard({ candidate, role, index, onAction, selected, onSelectionChange, isNewUnviewed }: CandidateCardProps) {
  const dateAddedRaw = getFieldValue(candidate, "dateAdded");
  const addedLabel = dateAddedRaw === "-" ? "Recently added" : `Added ${dateAddedRaw}`;

  return (
    <div
      className={cn(
        "group relative flex cursor-pointer flex-col gap-3 rounded-card border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-card animate-in fade-in slide-in-from-bottom-1",
        isNewUnviewed ? "border-[1.5px] border-info" : "border-border"
      )}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => onAction("view-profile", candidate)}
    >
      {isNewUnviewed && (
        <span className="absolute -top-[9px] right-3 rounded-full bg-info px-2 py-px text-[9px] font-medium text-white">
          New
        </span>
      )}

      {/* Top row: checkbox + avatar + name/title + status */}
      <div className="flex items-start gap-3">
        {onSelectionChange && (
          <div className="pt-1" onClick={(e) => e.stopPropagation()}>
            <Checkbox checked={!!selected} onCheckedChange={(checked) => onSelectionChange(candidate.id, !!checked)} />
          </div>
        )}
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white", getAvatarColor(candidate.name))}>
          {getInitials(candidate.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-sm font-semibold text-gray-900">{candidate.name}</h3>
            {candidate.hasRecording && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Video className="h-3.5 w-3.5 shrink-0 text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Video interview available</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <p className="truncate text-xs text-muted-foreground">{getFieldValue(candidate, "currentTitle")}</p>
        </div>
        <Badge variant="outline" className={cn("shrink-0 px-2 py-0.5 text-xs font-medium", getCandidateStatusColor(candidate.status))}>
          {candidate.status}
        </Badge>
      </div>

      {/* Job chip */}
      {candidate.jobTitle && (
        <div className="inline-flex w-fit max-w-full items-center gap-1.5 rounded-full bg-info/10 px-2.5 py-1 text-xs text-info">
          <Briefcase className="h-3 w-3 shrink-0" />
          <span className="truncate">{candidate.jobTitle}</span>
        </div>
      )}

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {candidate.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="rounded-full border border-primary/20 bg-primary/[0.08] px-2 py-0.5 text-xs text-primary/80">
            {skill}
          </span>
        ))}
        {candidate.skills.length > 3 && (
          <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            +{candidate.skills.length - 3}
          </span>
        )}
      </div>

      {/* Experience + fit score */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {getFieldValue(candidate, "yearsOfExperience")} Yrs
        </span>
        <div className="flex items-center gap-2">
          <div className="h-[5px] w-16 overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full", getRoleFitFillColor(candidate.roleFitScore))}
              style={{ width: `${candidate.roleFitScore}%` }}
            />
          </div>
          <span className={cn("text-xs font-semibold", getRoleFitColor(candidate.roleFitScore))}>
            {candidate.roleFitScore}%
          </span>
        </div>
      </div>

      {/* Footer: added date + quick actions */}
      <div className="flex items-center justify-between border-t border-border/60 pt-2.5">
        <span className="text-[11px] text-muted-foreground">{addedLabel}</span>
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                disabled={!candidate.phone}
                onClick={() => {
                  navigator.clipboard.writeText(candidate.phone ?? "");
                  toast.success("Phone number copied");
                }}
                className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-border text-gray-400 transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Phone className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Copy phone</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                disabled={!candidate.email}
                onClick={() => {
                  navigator.clipboard.writeText(candidate.email ?? "");
                  toast.success("Email address copied");
                }}
                className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-border text-gray-400 transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Mail className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Copy email</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                disabled={!candidate.linkedinUrl}
                onClick={() => window.open(candidate.linkedinUrl, "_blank")}
                className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-border text-info transition-colors hover:border-info/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Linkedin className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent>{candidate.linkedinUrl ? "Open LinkedIn" : "LinkedIn not available"}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onAction("view-profile", candidate)}
                className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-primary bg-primary text-white transition-colors hover:bg-primary/90"
              >
                <ArrowRight className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent>View profile</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
