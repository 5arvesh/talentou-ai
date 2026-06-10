import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, ArrowRight, Download, Upload, CheckCircle2, ChevronRight,
  FileSpreadsheet, Users, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SAMPLE_HEADERS = [
  "Name", "Email", "Phone", "Skills", "Status",
  "Years of Experience", "Current CTC", "Expected CTC",
  "Location", "Earliest Joining Date", "Date Added",
];

const SAMPLE_ROWS = [
  ["Rahul Sharma", "rahul.sharma@email.com", "+91 98765 43210", "React, Node.js, TypeScript", "Applied", "4", "$45,000", "$55,000", "Bangalore", "2024-04-01", "15 Jan 2025"],
  ["Priya Nair", "priya.nair@email.com", "+91 87654 32109", "Figma, Adobe XD, User Research", "Shortlisted", "3", "$38,000", "$48,000", "Mumbai", "2024-03-15", "18 Jan 2025"],
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

type ImportStage = "download" | "upload" | "importing" | "done";

interface ImportCandidatesLayoutProps {
  jobId: string;
  jobRole: string;
  role: "ta-leader" | "hiring-lead" | "recruiter";
}

export function ImportCandidatesLayout({ jobId, jobRole, role }: ImportCandidatesLayoutProps) {
  const navigate = useNavigate();
  const [stage, setStage] = useState<ImportStage>("download");
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);
  const [sampleDownloaded, setSampleDownloaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const candidatesPath =
    role === "ta-leader" ? "/sales-plan/candidates" :
    role === "hiring-lead" ? "/hiring-lead/candidates" :
    "/ta-associate/candidates";

  useEffect(() => {
    if (stage !== "importing") return;
    setProgress(0);
    setVisibleRows(0);
    const total = MOCK_IMPORT_CANDIDATES.length;
    const tickMs = 3200 / (total * 4);
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

  const handleDone = () => {
    toast.success(`${MOCK_IMPORT_CANDIDATES.length} candidates added to ${jobRole}.`);
    navigate(candidatesPath);
  };

  const stepIndex = stage === "download" ? 0 : stage === "upload" ? 1 : 2;

  const STEPS = [
    { label: "Download Template", sub: "Get the CSV format" },
    { label: "Upload File", sub: "Import your candidates" },
    { label: "Review & Confirm", sub: "Verify the import" },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Breadcrumb bar */}
      <div className="h-13 bg-white border-b border-gray-100 flex items-center px-6 gap-3 shrink-0 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
        <span className="text-sm font-medium text-gray-700">Import Candidates</span>
        <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
        <span className="text-sm font-semibold text-primary">{jobRole}</span>
      </div>

      {/* 3-panel body */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">

        {/* LEFT: Job context + progress steps */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={28}>
          <div className="h-full bg-white border-r border-gray-100 flex flex-col">
            <div className="p-6 border-b border-primary/10">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Importing for</p>
              <h2 className="text-xl font-bold text-primary mb-3 leading-tight">{jobRole}</h2>
              <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                Job #{String(jobId).padStart(4, "0")}
              </Badge>
            </div>

            <div className="flex-1 p-4 space-y-2.5">
              {STEPS.map((step, i) => {
                const isCompleted = i < stepIndex;
                const isActive = i === stepIndex;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl transition-all border",
                      isActive ? "bg-primary/8 border-primary/15" :
                      isCompleted ? "bg-green-500/5 border-green-500/15" :
                      "bg-gray-50 border-transparent opacity-50"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                      isCompleted ? "bg-green-500 text-white" :
                      isActive ? "bg-primary text-white" :
                      "bg-gray-200 text-gray-500"
                    )}>
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                    </div>
                    <div>
                      <p className={cn(
                        "text-sm font-semibold",
                        isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-gray-500"
                      )}>
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* CENTER: Upload flow */}
        <ResizablePanel defaultSize={45} minSize={35}>
          <div className="h-full bg-gray-50/50 overflow-y-auto">
            <div className="p-8 max-w-lg mx-auto space-y-6">

              {/* Step pills */}
              <div className="flex items-center gap-2">
                {["Download Format", "Upload File", "Import"].map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={cn(
                      "flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 rounded-full",
                      i < stepIndex ? "bg-green-500/20 text-green-600" :
                      i === stepIndex ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                    )}>
                      <span className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold",
                        i < stepIndex ? "bg-green-500 text-white" :
                        i === stepIndex ? "bg-white text-primary" : "bg-gray-300 text-white"
                      )}>
                        {i < stepIndex ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                      </span>
                      {s}
                    </div>
                    {i < 2 && <ChevronRight className="h-3 w-3 text-gray-300 shrink-0" />}
                  </React.Fragment>
                ))}
              </div>

              {/* Stage: download */}
              {stage === "download" && (
                <div className="space-y-5">
                  <div className="bg-accent rounded-card p-6 border border-primary/10">
                    <div className="flex items-start gap-4">
                      <FileSpreadsheet className="h-10 w-10 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-base font-semibold text-primary mb-1.5">Start with our sample template</p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Download the sample CSV to see the exact format required. Fill in your candidate data and upload it â€” the system will import all entries automatically.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2.5">Required columns</p>
                    <div className="flex flex-wrap gap-1.5">
                      {SAMPLE_HEADERS.map(h => (
                        <span key={h} className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 font-medium border border-gray-200">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-sm font-semibold gap-2"
                    onClick={() => { downloadSampleCSV(); setSampleDownloaded(true); }}
                  >
                    <Download className="h-4 w-4" />
                    Download Sample Format
                  </Button>

                  {sampleDownloaded && (
                    <p className="text-xs text-green-600 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> sample_candidates.csv downloaded
                    </p>
                  )}

                  <Button
                    variant="outline"
                    className="w-full border-primary/30 text-primary hover:bg-primary/5 gap-2 h-11"
                    onClick={() => setStage("upload")}
                  >
                    Continue to Upload
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Stage: upload */}
              {stage === "upload" && (
                <div className="space-y-5">
                  <div className="border border-gray-200 rounded-card p-5 bg-white">
                    <p className="text-sm font-semibold text-gray-800 mb-3">Import Summary</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {[["Upload Files", 0], ["Total Rows", 0], ["Processed", 0], ["Skipped", 0]].map(([label, val]) => (
                        <div key={label as string} className="flex items-center gap-1.5">
                          <span className="text-xs text-muted-foreground">{label}:</span>
                          <span className="text-xs font-bold text-gray-800">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-accent/50 rounded-card p-10 flex flex-col items-center gap-4 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-primary">Click to upload your file</p>
                      <p className="text-xs text-muted-foreground mt-1">Supports .csv, .xlsx, .xls</p>
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
                    className="w-full bg-primary hover:bg-primary/90 text-white h-12 gap-2 font-semibold"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Upload Database
                  </Button>

                  <button
                    onClick={() => setStage("download")}
                    className="w-full text-xs text-muted-foreground hover:text-gray-700 text-center"
                  >
                    â† Back to sample download
                  </button>
                </div>
              )}

              {/* Stage: importing / done */}
              {(stage === "importing" || stage === "done") && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-semibold text-gray-800">
                        {stage === "done" ? "Import complete!" : "Importing candidates..."}
                      </p>
                      {fileName && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[280px]">{fileName}</p>
                      )}
                    </div>
                    {stage === "done" && (
                      <div className="flex items-center gap-1.5 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm font-bold">{MOCK_IMPORT_CANDIDATES.length} added</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>{visibleRows} of {MOCK_IMPORT_CANDIDATES.length} candidates</span>
                      <span>{progress}%</span>
                    </div>
                  </div>

                  {stage === "done" && (
                    <>
                      <div className="bg-green-500/10 border border-green-500/25 rounded-xl p-4 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-green-600 shrink-0" />
                        <p className="text-sm font-semibold text-green-600">
                          {MOCK_IMPORT_CANDIDATES.length} candidates imported successfully.
                        </p>
                      </div>
                      <Button
                        className="w-full bg-green-500 hover:bg-green-600 text-white h-12 font-semibold"
                        onClick={handleDone}
                      >
                        Done â€” View Candidates
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* RIGHT: Candidate preview */}
        <ResizablePanel defaultSize={35} minSize={25}>
          <div className="h-full bg-white flex flex-col">
            <div className="p-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Candidate Preview</h3>
                {stage === "done" && (
                  <Badge className="ml-auto bg-green-500/10 text-green-600 border border-green-500/20 text-xs font-semibold">
                    {MOCK_IMPORT_CANDIDATES.length} imported
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {(stage === "download" || stage === "upload") ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-6">
                  <div className="w-16 h-16 rounded-card bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <Upload className="h-7 w-7 text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-400">Candidates will appear here after import</p>
                  <p className="text-xs text-muted-foreground">Upload your file to see a live preview</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {MOCK_IMPORT_CANDIDATES.map((c, i) => (
                    <div
                      key={c.name}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 transition-all duration-300",
                        i < visibleRows
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2 pointer-events-none"
                      )}
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-indigo-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{c.role}</p>
                      </div>
                      {i < visibleRows && (
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  );
}
