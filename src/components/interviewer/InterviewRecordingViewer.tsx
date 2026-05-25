import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/header/Header";
import { Sidebar } from "@/components/sidebar/Sidebar";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeft,
  Maximize, Minimize, AlertTriangle, Users, EyeOff, MonitorOff,
  Clipboard, CheckCircle2, XCircle, TrendingUp, TrendingDown,
  Sparkles, Mic, Keyboard, ChevronDown, ChevronUp, Brain,
  MessageSquare, ClipboardList,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface TranscriptEntry {
  id: string;
  timestamp: number;
  speaker: "ai" | "candidate";
  type: "voice" | "typed";
  content: string;
  questionContext?: string;
}

interface ImportantMoment {
  startTime: number;
  endTime: number;
  type: "multiple_faces" | "eye_tracking" | "background_voice" | "tab_switch" | "clipboard";
  severity: "info" | "warning" | "critical";
  description: string;
}

interface AIAnalysis {
  overallScore: number;
  reasoning: string;
  summary: string;
  strengths: string[];
  improvements: string[];
}

const aiAnalysis: AIAnalysis = {
  overallScore: 78,
  reasoning:
    "The candidate demonstrated strong technical knowledge with clear explanations of React concepts and problem-solving approaches. Communication was effective, though depth on system design and time management under pressure could be improved.",
  summary:
    "Promising candidate with solid fundamentals in frontend development. Shows good problem-solving approach and communicates ideas clearly. Strong on React hooks and state management. Recommended for the next round with a focus on system design.",
  strengths: ["Technical depth", "Problem-solving", "Communication", "React expertise"],
  improvements: ["System design", "Time management", "Architecture patterns"],
};

const importantMoments: ImportantMoment[] = [
  { startTime: 81, endTime: 88, type: "multiple_faces", severity: "critical", description: "Multiple faces detected" },
  { startTime: 145, endTime: 152, type: "eye_tracking", severity: "warning", description: "Looking away from screen" },
  { startTime: 210, endTime: 215, type: "background_voice", severity: "warning", description: "Background voices detected" },
  { startTime: 340, endTime: 345, type: "tab_switch", severity: "critical", description: "Tab switching detected" },
  { startTime: 420, endTime: 425, type: "clipboard", severity: "info", description: "Clipboard activity detected" },
];

const liveTranscript: TranscriptEntry[] = [
  { id: "t1", timestamp: 0, speaker: "ai", type: "voice", content: "Hello and welcome to your technical interview at Talentou. I'm your AI interviewer. Are you ready to begin?" },
  { id: "t2", timestamp: 15, speaker: "candidate", type: "voice", content: "Yes, I'm ready. Thank you for having me." },
  { id: "t3", timestamp: 22, speaker: "ai", type: "voice", content: "Great! Let's start with the first question. Can you explain the difference between React hooks and class components?" },
  { id: "t4", timestamp: 30, speaker: "candidate", type: "voice", content: "React hooks were introduced in React 16.8 and allow functional components to use state and lifecycle methods. With useState and useEffect, we can manage state and side effects in functional components, making code more concise and easier to test." },
  { id: "t5", timestamp: 95, speaker: "candidate", type: "typed", content: "// useState hook\nconst [count, setCount] = useState(0);\n\n// useEffect hook\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);", questionContext: "React hooks vs class components" },
  { id: "t6", timestamp: 120, speaker: "ai", type: "voice", content: "Excellent explanation! Now, how would you optimize a slow database query in production?" },
  { id: "t7", timestamp: 135, speaker: "candidate", type: "voice", content: "I'd start by analyzing the query execution plan using EXPLAIN to identify bottlenecks like full table scans. Then I'd add appropriate indexes on columns used in WHERE clauses and JOINs." },
  { id: "t8", timestamp: 180, speaker: "candidate", type: "voice", content: "I'd also consider query restructuring, breaking down complex queries, and using query caching. Tools like pg_stat_statements help identify frequently slow queries." },
  { id: "t9", timestamp: 220, speaker: "candidate", type: "typed", content: "-- Adding index\nCREATE INDEX idx_user_email ON users(email);\n\n-- Analyzing query\nEXPLAIN ANALYZE\n  SELECT * FROM orders WHERE user_id = 123;", questionContext: "Database query optimization" },
  { id: "t10", timestamp: 250, speaker: "ai", type: "voice", content: "Good practical approach. Can you describe a challenging project and how you overcame the obstacles?" },
  { id: "t11", timestamp: 265, speaker: "candidate", type: "voice", content: "In my previous role, our application experienced significant latency spikes during peak hours. I led the investigation and found the caching layer wasn't properly invalidating, causing stale data." },
  { id: "t12", timestamp: 310, speaker: "candidate", type: "voice", content: "We implemented a more robust cache invalidation strategy using Redis pub/sub, added circuit breakers, and set up monitoring with Datadog. Result: 70% reduction in latency with zero downtime." },
  { id: "t13", timestamp: 380, speaker: "ai", type: "voice", content: "Impressive outcome! How would you design a microservices system from scratch?" },
  { id: "t14", timestamp: 400, speaker: "candidate", type: "voice", content: "I'd first identify bounded contexts. Each microservice should own a single business capability. I'd use an API gateway for routing, implement service discovery, and use REST or message queues like RabbitMQ for inter-service communication." },
  { id: "t15", timestamp: 460, speaker: "candidate", type: "typed", content: "Services:\n- User Service (Auth, Profile)\n- Order Service (Cart, Checkout)\n- Product Service (Catalog, Inventory)\n- Notification Service (Email, Push)\n\nComms: REST + RabbitMQ for async events", questionContext: "Microservices architecture design" },
  { id: "t16", timestamp: 520, speaker: "ai", type: "voice", content: "Good overview. Thank you for your thoughtful answers today. You'll receive feedback within 48 hours. Do you have any questions?" },
  { id: "t17", timestamp: 540, speaker: "candidate", type: "voice", content: "Yes — what does the team structure look like and what technologies are currently being used in the project?" },
  { id: "t18", timestamp: 570, speaker: "ai", type: "voice", content: "You'd join a team of 5 engineers on a React and Node.js stack with AWS infrastructure, following agile methodologies with two-week sprints. Thanks for your time today!" },
  { id: "t19", timestamp: 600, speaker: "candidate", type: "voice", content: "Thank you very much. I look forward to hearing from you." },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getMomentIcon(type: ImportantMoment["type"]) {
  switch (type) {
    case "multiple_faces": return <Users className="h-3.5 w-3.5" />;
    case "eye_tracking": return <EyeOff className="h-3.5 w-3.5" />;
    case "background_voice": return <Mic className="h-3.5 w-3.5" />;
    case "tab_switch": return <MonitorOff className="h-3.5 w-3.5" />;
    case "clipboard": return <Clipboard className="h-3.5 w-3.5" />;
  }
}

function getMomentStyle(severity: ImportantMoment["severity"]) {
  switch (severity) {
    case "critical": return { row: "bg-red-50 border-red-200 hover:bg-red-100", text: "text-red-700", badge: "bg-red-100 text-red-600 border-red-200" };
    case "warning": return { row: "bg-amber-50 border-amber-200 hover:bg-amber-100", text: "text-amber-700", badge: "bg-amber-100 text-amber-600 border-amber-200" };
    case "info": return { row: "bg-blue-50 border-blue-200 hover:bg-blue-100", text: "text-blue-700", badge: "bg-blue-100 text-blue-600 border-blue-200" };
  }
}

function getScoreColor(score: number) {
  if (score >= 80) return "#4ead3b";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

export function InterviewRecordingViewer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const candidateName = searchParams.get("name") || "John Smith";

  const userRole = localStorage.getItem("userRole") || "interviewer";
  const isRecruiter = userRole === "ta-associate";
  const isHiringLead = userRole === "hiring-lead";

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(900);
  const [volume, setVolume] = useState([80]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [scoreOpen, setScoreOpen] = useState(true);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => setCurrentTime(video.currentTime);
    const onMeta = () => setDuration(video.duration || 900);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    return () => { video.removeEventListener("timeupdate", onTime); video.removeEventListener("loadedmetadata", onMeta); };
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) { v.pause(); } else { v.play(); }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolume = (val: number[]) => {
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val[0] / 100;
  };

  const handleFullscreen = () => {
    const el = videoContainerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) { el.requestFullscreen(); } else { document.exitFullscreen(); }
  };

  const getBackRoute = () => {
    if (isRecruiter) return "/ta-associate/candidates";
    if (isHiringLead) return "/hiring-lead/candidates";
    return "/interviewer/candidates";
  };

  const primaryLabel = isHiringLead ? "Select Candidate" : isRecruiter ? "Align" : "Select for F2F";

  const handlePrimary = () => navigate(getBackRoute(), { state: { message: `${candidateName} — action confirmed.` } });
  const handleReject = () => navigate(getBackRoute(), { state: { message: `${candidateName} has been rejected.` } });

  const score = aiAnalysis.overallScore;
  const scoreColor = getScoreColor(score);
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dashOffset = circ - (score / 100) * circ;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        {/* Page header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800 -ml-2" onClick={() => navigate(getBackRoute())}>
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back
            </Button>
            <div className="h-5 w-px bg-gray-200" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{candidateName}</p>
              <p className="text-xs text-muted-foreground">Software Engineer · Interview Recording</p>
            </div>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-sm font-semibold",
            score >= 80 ? "border-[#4ead3b] text-[#4ead3b] bg-green-50"
              : score >= 60 ? "border-amber-500 text-amber-600 bg-amber-50"
              : "border-red-500 text-red-600 bg-red-50"
          )}>
            <Sparkles className="h-3.5 w-3.5" />
            AI Score: {score}/100
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">

          {/* LEFT: video + timestamps */}
          <div className="flex flex-col w-[48%] border-r border-gray-200 shrink-0">

            {/* Video */}
            <div ref={videoContainerRef} className="relative flex-1 bg-black flex items-center justify-center min-h-0 group">
              <video ref={videoRef} className="max-w-full max-h-full object-contain">
                Your browser does not support the video tag.
              </video>

              {!isPlaying && (
                <button onClick={handlePlayPause} className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="h-7 w-7 text-white ml-1" />
                  </div>
                </button>
              )}

              <button
                onClick={handleFullscreen}
                className="absolute top-3 right-3 p-1.5 rounded-md bg-black/50 text-white hover:bg-black/75 transition-colors opacity-0 group-hover:opacity-100"
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </button>
            </div>

            {/* Controls */}
            <div className="bg-gray-900 px-4 py-3 space-y-2 shrink-0">
              <Slider value={[currentTime]} max={duration || 100} step={1} onValueChange={(v) => handleSeek(v[0])} className="w-full" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-400 w-10">{formatTime(currentTime)}</span>
                  <button onClick={() => handleSeek(Math.max(0, currentTime - 10))} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button onClick={handlePlayPause} className="mx-1 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                  </button>
                  <button onClick={() => handleSeek(Math.min(duration, currentTime + 10))} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                    <SkipForward className="h-4 w-4" />
                  </button>
                  <span className="text-[10px] text-gray-400 w-10 text-right">{formatTime(duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-3.5 w-3.5 text-gray-400" />
                  <Slider value={volume} max={100} step={1} onValueChange={handleVolume} className="w-20" />
                </div>
              </div>
            </div>

            {/* Review Moments */}
            <div className="bg-white border-t border-gray-100 flex flex-col" style={{ maxHeight: 260 }}>
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 shrink-0">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-semibold text-gray-800">Review Moments</span>
                <span className="ml-auto text-[10px] text-muted-foreground">Click to jump</span>
              </div>
              <div className="overflow-y-auto flex-1">
                <div className="p-3 space-y-2">
                  {importantMoments.map((moment, i) => {
                    const style = getMomentStyle(moment.severity);
                    return (
                      <button
                        key={i}
                        onClick={() => handleSeek(moment.startTime)}
                        className={cn("w-full text-left px-3 py-2.5 rounded-lg border transition-all", style.row)}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={cn("shrink-0", style.text)}>{getMomentIcon(moment.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-xs font-medium leading-tight", style.text)}>{moment.description}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {formatTime(moment.startTime)} – {formatTime(moment.endTime)}
                            </p>
                          </div>
                          <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border capitalize shrink-0", style.badge)}>
                            {moment.severity}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: accordions */}
          <div className="flex-1 flex flex-col bg-[#ebdbfc] overflow-hidden">

            <div className="px-6 py-4 shrink-0">
              <h2 className="text-base font-semibold text-[#7800D3]">Candidate Evaluation</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Review AI analysis, transcript & provide feedback</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">

              {/* AI Score accordion */}
              <div className={cn("bg-white border-2 rounded-lg overflow-hidden", scoreOpen ? "border-[#7800D3]/40" : "border-[#7800D3]/20")}>
                <button
                  onClick={() => setScoreOpen(!scoreOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Brain className="h-4 w-4 text-[#7800D3]" />
                    <span className="text-sm font-semibold text-[#7800D3]">AI Score & Analysis</span>
                  </div>
                  {scoreOpen ? <ChevronUp className="h-4 w-4 text-[#7800D3]" /> : <ChevronDown className="h-4 w-4 text-[#7800D3]" />}
                </button>
                {scoreOpen && (
                  <div className="px-5 pb-5 border-t border-gray-100 space-y-5 pt-4">
                    <div className="flex items-start gap-5">
                      <div className="shrink-0 flex flex-col items-center gap-1">
                        <svg width="96" height="96" viewBox="0 0 96 96">
                          <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
                          <circle
                            cx="48" cy="48" r={r} fill="none"
                            stroke={scoreColor} strokeWidth="8"
                            strokeDasharray={circ} strokeDashoffset={dashOffset}
                            strokeLinecap="round"
                            transform="rotate(-90 48 48)"
                          />
                          <text x="48" y="53" textAnchor="middle" fontSize="22" fontWeight="700" fill={scoreColor}>{score}</text>
                        </svg>
                        <span className="text-[10px] text-muted-foreground">out of 100</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-xs font-semibold text-[#7800D3] mb-1.5">AI Reasoning</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{aiAnalysis.reasoning}</p>
                      </div>
                    </div>

                    <div className="bg-[#f5efff] rounded-lg p-3.5">
                      <p className="text-xs font-semibold text-[#7800D3] mb-1">Summary</p>
                      <p className="text-xs text-gray-700 leading-relaxed">{aiAnalysis.summary}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <TrendingUp className="h-3.5 w-3.5 text-[#4ead3b]" />
                          <span className="text-xs font-semibold text-[#7800D3]">Strengths</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {aiAnalysis.strengths.map((s, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <TrendingDown className="h-3.5 w-3.5 text-amber-500" />
                          <span className="text-xs font-semibold text-[#7800D3]">To Improve</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {aiAnalysis.improvements.map((imp, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">{imp}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Transcript accordion */}
              <div className={cn("bg-white border-2 rounded-lg overflow-hidden", transcriptOpen ? "border-[#7800D3]/40" : "border-[#7800D3]/20")}>
                <button
                  onClick={() => setTranscriptOpen(!transcriptOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="h-4 w-4 text-[#7800D3]" />
                    <span className="text-sm font-semibold text-[#7800D3]">Interview Transcript</span>
                    <span className="text-[10px] ml-1 bg-[#f5efff] text-[#7800D3] px-1.5 py-0.5 rounded-full font-medium">
                      {liveTranscript.length} entries
                    </span>
                  </div>
                  {transcriptOpen ? <ChevronUp className="h-4 w-4 text-[#7800D3]" /> : <ChevronDown className="h-4 w-4 text-[#7800D3]" />}
                </button>
                {transcriptOpen && (
                  <div className="border-t border-gray-100">
                    <div className="p-4 space-y-3 max-h-[520px] overflow-y-auto">
                      {liveTranscript.map((entry) => (
                        <div key={entry.id} className={cn("flex gap-2.5", entry.speaker === "candidate" && "flex-row-reverse")}>
                          <div className={cn(
                            "w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold mt-0.5",
                            entry.speaker === "ai" ? "bg-[#7800D3] text-white" : "bg-[#4ead3b] text-white"
                          )}>
                            {entry.speaker === "ai" ? "AI" : candidateName.charAt(0).toUpperCase()}
                          </div>

                          <div className="max-w-[82%]">
                            <div className={cn("flex items-center gap-1.5 mb-1", entry.speaker === "candidate" && "flex-row-reverse")}>
                              <span className="text-[10px] font-semibold text-gray-600">
                                {entry.speaker === "ai" ? "Talentou AI" : candidateName}
                              </span>
                              <button
                                onClick={() => handleSeek(entry.timestamp)}
                                className="text-[9px] text-[#7800D3] hover:underline"
                              >
                                {formatTime(entry.timestamp)}
                              </button>
                              {entry.type === "typed" && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-50 text-[#7800D3] border border-purple-200 font-medium flex items-center gap-0.5">
                                  <Keyboard className="h-2.5 w-2.5" /> Written
                                </span>
                              )}
                              {entry.type === "voice" && entry.speaker === "candidate" && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 font-medium flex items-center gap-0.5">
                                  <Mic className="h-2.5 w-2.5" /> Voice
                                </span>
                              )}
                            </div>

                            {entry.type === "typed" ? (
                              <div className="rounded-lg border border-[#7800D3]/20 bg-[#f5efff] overflow-hidden">
                                {entry.questionContext && (
                                  <div className="px-3 py-1.5 border-b border-[#7800D3]/10">
                                    <span className="text-[9px] font-semibold text-[#7800D3]">{entry.questionContext}</span>
                                  </div>
                                )}
                                <pre className="text-[10px] font-mono p-3 text-gray-700 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                                  {entry.content}
                                </pre>
                              </div>
                            ) : (
                              <div className={cn(
                                "rounded-xl px-3.5 py-2.5 text-xs leading-relaxed",
                                entry.speaker === "ai"
                                  ? "bg-gray-100 text-gray-700 rounded-tl-sm"
                                  : "bg-[#7800D3] text-white rounded-tr-sm"
                              )}>
                                {entry.content}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Feedback accordion */}
              <div className={cn("bg-white border-2 rounded-lg overflow-hidden", feedbackOpen ? "border-[#7800D3]/40" : "border-[#7800D3]/20")}>
                <button
                  onClick={() => setFeedbackOpen(!feedbackOpen)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <ClipboardList className="h-4 w-4 text-[#7800D3]" />
                    <span className="text-sm font-semibold text-[#7800D3]">Feedback</span>
                    <span className="text-[10px] text-muted-foreground ml-0.5">— Optional</span>
                  </div>
                  {feedbackOpen ? <ChevronUp className="h-4 w-4 text-[#7800D3]" /> : <ChevronDown className="h-4 w-4 text-[#7800D3]" />}
                </button>
                {feedbackOpen && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Add your personal observations — attitude, culture fit, or anything the AI may have missed.
                    </p>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="e.g. Candidate was very composed under pressure and asked insightful questions about the team..."
                      className="min-h-[120px] text-xs resize-none border-[#7800D3]/20 focus-visible:ring-[#7800D3]/30"
                    />
                    <Button
                      size="sm"
                      disabled={!feedback.trim()}
                      className="bg-[#7800D3] hover:bg-[#6200ad] text-white text-xs"
                    >
                      Save Feedback
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="px-4 py-4 bg-white border-t border-gray-200 shrink-0">
              <div className="flex gap-3">
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-medium"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={handlePrimary}
                  className="flex-1 bg-[#4ead3b] hover:bg-[#3d9630] text-white font-medium"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  {primaryLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
