import React, { useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserPlus, X, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { UploadStage } from "./bulk-import/UploadStage";
import { ParsingStage } from "./bulk-import/ParsingStage";
import { ReviewAssignStage } from "./bulk-import/ReviewAssignStage";
import { CompleteStage } from "./bulk-import/CompleteStage";
import {
  buildParsedCandidates, confidenceTier, isConfirmable, NO_MATCH, type ParsedCandidate,
} from "./bulk-import/data";

interface BulkUploadModalProps {
  open: boolean;
  onClose: () => void;
}

type Stage = "upload" | "parsing" | "review" | "complete";

const STEPS: { key: Stage; label: string }[] = [
  { key: "upload", label: "Upload" },
  { key: "parsing", label: "Parsing" },
  { key: "review", label: "Review & Assign" },
  { key: "complete", label: "Complete" },
];

function Stepper({ stage }: { stage: Stage }) {
  const currentIdx = STEPS.findIndex((s) => s.key === stage);
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {STEPS.map((s, i) => {
        const done = i < currentIdx;
        const current = i === currentIdx;
        return (
          <React.Fragment key={s.key}>
            <div
              className="inline-flex items-center gap-1.5 rounded-full text-[11px] font-semibold px-2.5 py-1"
              style={
                current
                  ? { background: "#7800D3", color: "#fff" }
                  : done
                  ? { background: "#DCEFC8", color: "#1F4A0A" }
                  : { background: "#ECEAF0", color: "#6B6B6B" }
              }
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={
                  current
                    ? { background: "#fff", color: "#7800D3" }
                    : done
                    ? { background: "#2F7A10", color: "#fff" }
                    : { background: "#CFC9DA", color: "#fff" }
                }
              >
                {done ? <Check className="h-2.5 w-2.5" /> : i + 1}
              </span>
              {s.label}
            </div>
            {i < STEPS.length - 1 && <ChevronRight className="h-3 w-3 shrink-0" style={{ color: "#bbb" }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function BulkUploadModal({ open, onClose }: BulkUploadModalProps) {
  const [stage, setStage] = useState<Stage>("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [candidates, setCandidates] = useState<ParsedCandidate[]>([]);

  const reset = useCallback(() => {
    setStage("upload");
    setFiles([]);
    setCandidates([]);
  }, []);

  const handleClose = () => { reset(); onClose(); };

  const startParse = () => {
    setCandidates(buildParsedCandidates(files));
    setStage("parsing");
  };

  const setStatus = (id: string, status: ParsedCandidate["status"]) =>
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));

  const changePosition = (id: string, title: string) =>
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, assignedTitle: title, status: title === NO_MATCH && c.status === "confirmed" ? "pending" : c.status }
          : c
      )
    );

  const confirmAllHigh = () =>
    setCandidates((prev) =>
      prev.map((c) => (confidenceTier(c.score) === "high" && isConfirmable(c) ? { ...c, status: "confirmed" } : c))
    );

  // Stage 4 stats
  const confirmed = candidates.filter((c) => c.status === "confirmed");
  const merged = confirmed.filter((c) => c.flags.includes("duplicate")).length;
  const imported = confirmed.length - merged;
  const unassigned = candidates.length - confirmed.length;

  const handleDone = () => {
    toast.success(`${confirmed.length} candidates imported${unassigned > 0 ? ` · ${unassigned} sent to Unassigned` : ""}.`);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent
        className="max-w-[880px] w-[90vw] p-0 overflow-hidden rounded-[16px] border-0 shadow-2xl gap-0"
        onInteractOutside={(e) => { if (stage === "parsing") e.preventDefault(); }}
      >
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(to right, #7800D3, #a855f7)" }} />

        <div className="px-6 pt-5 pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UserPlus className="h-[18px] w-[18px]" style={{ color: "#7800D3" }} />
              <h2 className="font-sora text-[16px] font-semibold" style={{ color: "#1A0B2E" }}>Bulk Import Candidates</h2>
            </div>
            <button type="button" onClick={handleClose} className="transition-colors hover:text-[#555]" style={{ color: "#888" }}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stepper */}
          <div className="mb-5">
            <Stepper stage={stage} />
          </div>

          {/* Active stage */}
          {stage === "upload" && (
            <UploadStage files={files} onFilesChange={setFiles} onParse={startParse} />
          )}
          {stage === "parsing" && (
            <ParsingStage total={candidates.length} onDone={() => setStage("review")} />
          )}
          {stage === "review" && (
            <ReviewAssignStage
              candidates={candidates}
              onConfirm={(id) => setStatus(id, "confirmed")}
              onSkip={(id) => setStatus(id, "skipped")}
              onChangePosition={changePosition}
              onConfirmAllHigh={confirmAllHigh}
              onImport={() => setStage("complete")}
            />
          )}
          {stage === "complete" && (
            <CompleteStage imported={imported} unassigned={unassigned} merged={merged} onDone={handleDone} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BulkUploadModal;
