import React, { useState, useRef, useEffect } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Download, Upload, CheckCircle2, ArrowRight, FileSpreadsheet,
  Users, Sparkles, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BulkUploadModalProps {
  open: boolean;
  onClose: () => void;
  // Legacy props accepted but unused — dialog manages its own file input
  file?: File | null;
  onImport?: () => void;
}

type Stage = "download" | "upload" | "importing" | "done";

const SAMPLE_HEADERS = [
  "Name", "Email", "Phone", "Skills", "Status",
  "Years of Experience", "Current CTC", "Expected CTC",
  "Location", "Earliest Joining Date", "Date Added",
];

const SAMPLE_ROWS = [
  ["Rahul Sharma", "rahul.sharma@email.com", "+91 98765 43210", "React, Node.js, TypeScript", "Applied", "4", "$45,000", "$55,000", "Bangalore", "2024-04-01", "15 Jan 2025"],
  ["Priya Nair", "priya.nair@email.com", "+91 87654 32109", "Figma, Adobe XD, User Research", "Shortlisted", "3", "$38,000", "$48,000", "Mumbai", "2024-03-15", "18 Jan 2025"],
  ["Anil Verma", "anil.verma@email.com", "+91 76543 21098", "Java, Spring Boot, Microservices", "Interview", "6", "$60,000", "$75,000", "Pune", "2024-04-10", "20 Jan 2025"],
];

const MOCK_IMPORT_CANDIDATES = [
  { name: "Rahul Sharma", role: "Frontend Developer" },
  { name: "Priya Nair", role: "UX Designer" },
  { name: "Anil Verma", role: "Backend Engineer" },
  { name: "Sneha Kapoor", role: "Data Analyst" },
  { name: "Kiran Reddy", role: "DevOps Engineer" },
  { name: "Meera Joshi", role: "Product Manager" },
  { name: "Arjun Singh", role: "QA Engineer" },
  { name: "Divya Menon", role: "Mobile Developer" },
];

function downloadSampleCSV() {
  const rows = [SAMPLE_HEADERS, ...SAMPLE_ROWS];
  const csv = rows.map(r => r.map(cell => `"${cell}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sample_candidates.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground">{label}:</span>
      <span className="text-xs font-bold text-gray-800">{value}</span>
    </div>
  );
}

export function BulkUploadModal({ open, onClose }: BulkUploadModalProps) {
  const [stage, setStage] = useState<Stage>("download");
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);
  const [sampleDownloaded, setSampleDownloaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleClose = () => {
    setStage("download");
    setFileName(null);
    setProgress(0);
    setVisibleRows(0);
    setSampleDownloaded(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    onClose();
  };

  useEffect(() => {
    if (stage !== "importing") return;

    setProgress(0);
    setVisibleRows(0);

    const total = MOCK_IMPORT_CANDIDATES.length;
    const totalMs = 3200;
    const tickMs = totalMs / (total * 4);

    let tick = 0;
    intervalRef.current = setInterval(() => {
      tick++;
      const newProgress = Math.min(100, Math.round((tick / (total * 4)) * 100));
      setProgress(newProgress);
      setVisibleRows(Math.min(total, Math.floor(tick / 4) + 1));

      if (newProgress >= 100) {
        clearInterval(intervalRef.current!);
        setTimeout(() => setStage("done"), 400);
      }
    }, tickMs);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [stage]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    e.target.value = "";
    setStage("importing");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0A92FE] to-[#7E00FC]" />

        <div className="px-6 pt-5 pb-6 space-y-5">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-[#7800D3] flex items-center gap-2">
              <Users className="h-4 w-4" />
              Bulk Import Candidates
            </DialogTitle>
          </DialogHeader>

          {/* STAGE 1: Download sample */}
          {stage === "download" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                {["Download Format", "Upload File", "Import"].map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={cn(
                      "flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full",
                      i === 0 ? "bg-[#7800D3] text-white" : "bg-gray-100 text-gray-400"
                    )}>
                      <span className={cn("w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold",
                        i === 0 ? "bg-white text-[#7800D3]" : "bg-gray-300 text-white"
                      )}>{i + 1}</span>
                      {s}
                    </div>
                    {i < 2 && <ChevronRight className="h-3 w-3 text-gray-300 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>

              <div className="bg-[#f5efff] rounded-xl p-4 border border-[#7800D3]/10">
                <div className="flex items-start gap-3">
                  <FileSpreadsheet className="h-8 w-8 text-[#7800D3] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#7800D3] mb-1">Start with our sample template</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Download the sample CSV file to see the exact format required. Fill in your candidate data and upload it back — the system will import all entries automatically.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Required columns</p>
                <div className="flex flex-wrap gap-1.5">
                  {SAMPLE_HEADERS.map(h => (
                    <span key={h} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium border border-gray-200">{h}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-muted-foreground text-center">
                  Download the sample Excel file to update and format your data according to this structure
                </p>
                <Button
                  className="w-full bg-[#7800D3] hover:bg-[#6200ad] text-white h-11 text-sm font-semibold gap-2"
                  onClick={() => { downloadSampleCSV(); setSampleDownloaded(true); }}
                >
                  <Download className="h-4 w-4" />
                  Download Sample Format
                </Button>
                {sampleDownloaded && (
                  <p className="text-[10px] text-[#4ead3b] text-center font-medium flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> sample_candidates.csv downloaded
                  </p>
                )}
              </div>

              <Button
                variant="outline"
                className="w-full border-[#7800D3]/30 text-[#7800D3] hover:bg-[#7800D3]/5 gap-2 text-sm"
                onClick={() => setStage("upload")}
              >
                Continue to Upload
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* STAGE 2: Upload */}
          {stage === "upload" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                {["Download Format", "Upload File", "Import"].map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={cn(
                      "flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full",
                      i === 0 ? "bg-[#4ead3b]/20 text-[#4ead3b]" :
                      i === 1 ? "bg-[#7800D3] text-white" : "bg-gray-100 text-gray-400"
                    )}>
                      <span className={cn("w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold",
                        i === 0 ? "bg-[#4ead3b] text-white" :
                        i === 1 ? "bg-white text-[#7800D3]" : "bg-gray-300 text-white"
                      )}>
                        {i === 0 ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                      </span>
                      {s}
                    </div>
                    {i < 2 && <ChevronRight className="h-3 w-3 text-gray-300 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-3">Import Summary</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <StatPill label="Upload Files" value={0} />
                  <div className="w-px h-4 bg-gray-200 self-center hidden sm:block" />
                  <StatPill label="Total Rows" value={0} />
                  <div className="w-px h-4 bg-gray-200 self-center hidden sm:block" />
                  <StatPill label="Processed Rows" value={0} />
                  <div className="w-px h-4 bg-gray-200 self-center hidden sm:block" />
                  <StatPill label="Skipped" value={0} />
                  <div className="w-px h-4 bg-gray-200 self-center hidden sm:block" />
                  <StatPill label="Duplicate Rows" value={0} />
                </div>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-[#7800D3]/30 hover:border-[#7800D3]/60 hover:bg-[#f5efff]/50 rounded-xl p-8 flex flex-col items-center gap-3 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#ebdbfc] flex items-center justify-center group-hover:bg-[#7800D3]/20 transition-colors">
                  <Upload className="h-5 w-5 text-[#7800D3]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#7800D3]">Click to upload your file</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Supports .csv, .xlsx, .xls</p>
                </div>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={handleFileSelect}
              />

              <Button
                className="w-full bg-[#7800D3] hover:bg-[#6200ad] text-white h-11 text-sm font-semibold gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
                Upload Database
              </Button>

              <button onClick={() => setStage("download")} className="w-full text-xs text-muted-foreground hover:text-gray-700 text-center">
                ← Back to sample download
              </button>
            </div>
          )}

          {/* STAGE 3: Importing animation */}
          {(stage === "importing" || stage === "done") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {stage === "done" ? "Import complete!" : "Importing candidates..."}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[300px]">{fileName}</p>
                </div>
                {stage === "done" && (
                  <div className="flex items-center gap-1.5 text-[#4ead3b]">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-bold">{MOCK_IMPORT_CANDIDATES.length} added</span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Progress
                  value={progress}
                  className="h-2"
                  style={{ "--progress-background": stage === "done" ? "#4ead3b" : "#7800D3" } as React.CSSProperties}
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{visibleRows} of {MOCK_IMPORT_CANDIDATES.length} candidates</span>
                  <span>{progress}%</span>
                </div>
              </div>

              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 grid grid-cols-[1fr_1fr_auto] text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                  <span>Candidate</span>
                  <span>Role</span>
                  <span>Status</span>
                </div>
                <div className="divide-y divide-gray-50 max-h-[240px] overflow-y-auto">
                  {MOCK_IMPORT_CANDIDATES.map((c, i) => (
                    <div
                      key={c.name}
                      className={cn(
                        "px-4 py-2.5 grid grid-cols-[1fr_1fr_auto] items-center gap-2 transition-all duration-300",
                        i < visibleRows ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7800D3] to-[#0A92FE] flex items-center justify-center text-white text-[9px] font-bold shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <span className="text-xs font-medium text-gray-800 truncate">{c.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground truncate">{c.role}</span>
                      {i < visibleRows ? (
                        <CheckCircle2 className="h-4 w-4 text-[#4ead3b] shrink-0" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-200 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {stage === "done" && (
                <div className="bg-[#4ead3b]/10 border border-[#4ead3b]/25 rounded-xl p-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#4ead3b] shrink-0" />
                  <p className="text-xs font-semibold text-[#4ead3b]">
                    {MOCK_IMPORT_CANDIDATES.length} candidates imported successfully and added to your candidate list.
                  </p>
                </div>
              )}

              {stage === "done" && (
                <Button
                  className="w-full bg-[#4ead3b] hover:bg-[#3d9630] text-white h-11 text-sm font-semibold"
                  onClick={handleClose}
                >
                  Done
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
