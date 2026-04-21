import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  PanelRightOpen,
  PanelRightClose,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Users,
  EyeOff,
  AlertCircle,
  MonitorOff,
  Clipboard,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Mic,
  Keyboard,
  CheckCircle2,
  XCircle,
  MessageSquare,
} from "lucide-react";
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
  strengths: string[];
  improvements: string[];
}

interface Props {
  role: "recruiter" | "hiring-lead";
}

const aiAnalysis: AIAnalysis = {
  overallScore: 78,
  reasoning:
    "The candidate demonstrated strong technical knowledge with clear explanations of React concepts and problem-solving approaches. Communication was effective, though could improve on system design depth and time management during complex questions.",
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
  { id: "t1", timestamp: 0, speaker: "ai", type: "voice", content: "Hello and welcome to your technical interview at Talentou. I'm your AI interviewer, and I'll be guiding you through this session. Please make sure you're in a quiet environment and your camera is properly positioned. Are you ready to begin?" },
  { id: "t2", timestamp: 15, speaker: "candidate", type: "voice", content: "Yes, I'm ready. Thank you for having me." },
  { id: "t3", timestamp: 22, speaker: "ai", type: "voice", content: "Great! Let's start with the first question. Can you explain the difference between React hooks and class components?" },
  { id: "t4", timestamp: 30, speaker: "candidate", type: "voice", content: "Sure. React hooks were introduced in React 16.8 and allow functional components to use state and lifecycle methods. Before hooks, we had to use class components for stateful logic. With hooks like useState and useEffect, we can manage state and side effects in functional components, making the code more concise and easier to test." },
  { id: "t5", timestamp: 95, speaker: "candidate", type: "typed", content: "// Example of useState hook\nconst [count, setCount] = useState(0);\n\n// Example of useEffect hook\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);", questionContext: "React hooks vs class components" },
  { id: "t6", timestamp: 120, speaker: "ai", type: "voice", content: "Excellent explanation with a practical code example. Now, let's move on to the second question. How would you optimize a slow database query in production?" },
  { id: "t7", timestamp: 135, speaker: "candidate", type: "voice", content: "When dealing with slow database queries, I would start by analyzing the query execution plan using EXPLAIN. This helps identify bottlenecks like full table scans. Then I'd look at adding appropriate indexes, especially for columns used in WHERE clauses and JOINs." },
  { id: "t8", timestamp: 180, speaker: "candidate", type: "voice", content: "I would also consider query restructuring, breaking down complex queries into simpler ones, and using query caching where appropriate. Monitoring tools like pg_stat_statements in PostgreSQL help identify frequently slow queries." },
  { id: "t9", timestamp: 220, speaker: "candidate", type: "typed", content: "-- Adding an index for optimization\nCREATE INDEX idx_user_email ON users(email);\n\n-- Using EXPLAIN to analyze query\nEXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123;", questionContext: "Database query optimization" },
  { id: "t10", timestamp: 250, speaker: "ai", type: "voice", content: "Good approach with practical examples. For our third question, describe a challenging project you worked on and how you overcame the obstacles." },
  { id: "t11", timestamp: 265, speaker: "candidate", type: "voice", content: "In my previous role, we faced a critical performance issue where our main application was experiencing significant latency spikes during peak hours. The issue was affecting user experience and we were losing potential customers." },
  { id: "t12", timestamp: 310, speaker: "candidate", type: "voice", content: "I led the investigation and discovered that our caching layer wasn't properly invalidating, causing stale data issues. We implemented a more robust cache invalidation strategy using Redis pub/sub, added circuit breakers to prevent cascade failures, and set up comprehensive monitoring with Datadog." },
  { id: "t13", timestamp: 380, speaker: "candidate", type: "voice", content: "The result was a 70% reduction in latency and zero downtime during the migration. We also documented the entire process which helped prevent similar issues in the future." },
  { id: "t14", timestamp: 420, speaker: "ai", type: "voice", content: "That's a great example of problem-solving and leadership. Let me now ask you about your experience with microservices architecture. Can you explain how you would design a microservices system from scratch?" },
  { id: "t15", timestamp: 440, speaker: "candidate", type: "voice", content: "When designing a microservices architecture, I would first identify the bounded contexts and domain boundaries. Each microservice should be responsible for a single business capability. I'd use an API gateway for routing, implement service discovery, and ensure proper inter-service communication using either REST or message queues like RabbitMQ." },
  { id: "t16", timestamp: 520, speaker: "candidate", type: "typed", content: "// Microservices architecture example\nServices:\n- User Service (Auth, Profile)\n- Order Service (Cart, Checkout)\n- Product Service (Catalog, Inventory)\n- Notification Service (Email, Push)\n\nCommunication: REST API + RabbitMQ for async", questionContext: "Microservices architecture design" },
  { id: "t17", timestamp: 560, speaker: "ai", type: "voice", content: "Good overview. Now, how would you handle distributed transactions across microservices?" },
  { id: "t18", timestamp: 575, speaker: "candidate", type: "voice", content: "Distributed transactions are challenging. I would use the Saga pattern, where each transaction step has a compensating action. For example, if an order fails at the payment step, we roll back the inventory reservation. I'd also consider eventual consistency over strong consistency for better scalability." },
  { id: "t19", timestamp: 640, speaker: "ai", type: "voice", content: "That's correct. For our final question, what do you consider your greatest strength as a developer and an area you're currently working to improve?" },
  { id: "t20", timestamp: 660, speaker: "candidate", type: "voice", content: "My greatest strength is my ability to break down complex problems into manageable pieces and communicate technical concepts clearly to both technical and non-technical stakeholders. I'm currently working on improving my knowledge of system design at scale and distributed systems patterns." },
  { id: "t21", timestamp: 720, speaker: "ai", type: "voice", content: "Thank you for your thoughtful answers throughout this interview. We've covered a lot of ground, from React fundamentals to system design concepts. You'll receive feedback within 48 hours. Do you have any questions for me?" },
  { id: "t22", timestamp: 750, speaker: "candidate", type: "voice", content: "Yes, I was wondering about the team structure I'd be working with and what technologies are currently being used in the project?" },
  { id: "t23", timestamp: 780, speaker: "ai", type: "voice", content: "Great questions. You'd be joining a team of 5 engineers working on a React and Node.js stack with AWS infrastructure. The team follows agile methodologies with two-week sprints. Thank you for your time today. We'll be in touch soon!" },
  { id: "t24", timestamp: 820, speaker: "candidate", type: "voice", content: "Thank you very much for the opportunity. I look forward to hearing from you." },
];

const mockRecruiterFeedback =
  "Strong candidate overall — technical fundamentals are solid and communication was clear throughout. Performed especially well on the React and caching questions. Recommend moving forward; suggest focusing next round on system design depth and scalability scenarios.";

export function AIInterviewPerformanceViewer({ role }: Props) {
  const navigate = useNavigate();
  const { candidateId } = useParams<{ candidateId: string }>();
  const [searchParams] = useSearchParams();
  const candidateName = searchParams.get("name") || "John Smith";

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(900);
  const [volume, setVolume] = useState([80]);
  const [feedback, setFeedback] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const backPath = role === "recruiter" ? "/ta-associate/candidates" : "/hiring-lead/candidates";
  const alignLabel = role === "recruiter" ? "Align Candidate" : "Select Candidate";
  const score = aiAnalysis.overallScore;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration || 900);
    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) video.pause();
    else video.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (video) video.currentTime = time;
    setCurrentTime(time);
  };

  const handleReject = () => {
    navigate(backPath, { state: { message: `${candidateName} has been rejected.` } });
  };

  const handleAlign = () => {
    const action = role === "recruiter" ? "aligned" : "selected";
    navigate(backPath, { state: { message: `${candidateName} has been ${action}.` } });
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-emerald-500";
    if (s >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreStroke = (s: number) => {
    if (s >= 80) return "#10b981";
    if (s >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getSeverityColor = (severity: ImportantMoment["severity"]) => {
    if (severity === "critical") return "#ef4444";
    if (severity === "warning") return "#f59e0b";
    return "#3b82f6";
  };

  const getMomentIcon = (type: ImportantMoment["type"]) => {
    switch (type) {
      case "multiple_faces": return <Users className="h-3 w-3" />;
      case "eye_tracking": return <EyeOff className="h-3 w-3" />;
      case "background_voice": return <AlertCircle className="h-3 w-3" />;
      case "tab_switch": return <MonitorOff className="h-3 w-3" />;
      case "clipboard": return <Clipboard className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 -ml-2"
            onClick={() => navigate(backPath)}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back
          </Button>
          <Separator orientation="vertical" className="h-5" />

          {/* Candidate name + position + panel toggle */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{candidateName}</span>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-500">Software Engineer</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-gray-400 hover:text-[#7800D4] hover:bg-[#7800D4]/8 ml-1"
                  onClick={() => setIsPanelOpen(!isPanelOpen)}
                >
                  {isPanelOpen
                    ? <PanelRightClose className="h-4 w-4" />
                    : <PanelRightOpen className="h-4 w-4" />
                  }
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {isPanelOpen ? "Close panel" : "Open panel"}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* AI Score badge */}
        <Badge
          variant="outline"
          className={cn(
            "text-sm px-3 py-1.5 font-bold border-2 gap-1.5",
            score >= 80
              ? "border-emerald-400 text-emerald-600"
              : score >= 60
              ? "border-amber-400 text-amber-600"
              : "border-red-400 text-red-600"
          )}
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI Score: {score}/100
        </Badge>
      </div>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* VIDEO COLUMN — always flex-1 */}
        <div className="flex flex-col flex-1 min-w-0">

          {/* Video */}
          <div className="flex-1 bg-black relative min-h-0">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Controls bar */}
          <div className="bg-white border-t border-gray-100 px-5 pt-4 pb-3 shrink-0">

            {/* ── Timeline with flag markers ── */}
            <div className="relative w-full mb-1">
              {/* Flag markers row — sits above the slider */}
              <div className="relative h-7 w-full pointer-events-none mb-0.5">
                {importantMoments.map((m, i) => {
                  const pct = duration > 0 ? (m.startTime / duration) * 100 : 0;
                  const color = getSeverityColor(m.severity);
                  return (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <button
                          className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center pointer-events-auto group"
                          style={{ left: `${pct}%` }}
                          onClick={() => handleSeek(m.startTime)}
                        >
                          {/* Time label */}
                          <span
                            className="text-[9px] font-mono font-semibold leading-none mb-0.5 group-hover:opacity-100 opacity-80 transition-opacity"
                            style={{ color }}
                          >
                            {formatTime(m.startTime)}
                          </span>
                          {/* Tick line */}
                          <div
                            className="w-px h-2.5"
                            style={{ backgroundColor: color }}
                          />
                          {/* Dot */}
                          <div
                            className="w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm -mt-px"
                            style={{ backgroundColor: color }}
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs max-w-[160px]">
                        <div className="flex items-center gap-1.5">
                          <span style={{ color }}>{getMomentIcon(m.type)}</span>
                          <span className="font-medium">{m.description}</span>
                        </div>
                        <p className="text-gray-400 text-[10px] mt-0.5">Click to jump to {formatTime(m.startTime)}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>

              {/* Seek slider */}
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={(v) => handleSeek(v[0])}
                className="w-full"
              />
            </div>

            {/* Time display */}
            <div className="flex justify-between text-xs text-gray-400 mt-1 mb-2.5 px-0.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Playback controls + volume */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-900"
                  onClick={() => handleSeek(Math.max(0, currentTime - 10))}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-gray-900"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-900"
                  onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <Slider
                  value={volume}
                  max={100}
                  step={1}
                  onValueChange={setVolume}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — slides in/out by adjusting width */}
        <div
          className={cn(
            "flex flex-col bg-white border-l border-gray-100 shrink-0 overflow-hidden transition-all duration-300 ease-in-out",
            isPanelOpen ? "w-[300px]" : "w-0"
          )}
        >
          {/* Inner wrapper keeps content at 300px so it doesn't squish during animation */}
          <div className="flex flex-col h-full w-[300px]">

            <div className="flex-1 overflow-y-auto py-3">
              <Accordion type="multiple" defaultValue={["score", "transcript", "feedback"]}>

                {/* ── AI Interview Score ── */}
                <div className="mx-3 mb-2 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <AccordionItem value="score" className="border-0">
                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-gray-800 hover:no-underline hover:bg-gray-50 bg-white border-l-4 border-l-[#7800D4]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[#7800D4]" />
                        AI Interview Score
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-1 bg-white">
                      {/* Score gauge + reasoning */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="relative w-16 h-16 shrink-0">
                          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 96 96">
                            <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="9" fill="none" />
                            <circle
                              cx="48" cy="48" r="40"
                              stroke={getScoreStroke(score)}
                              strokeWidth="9"
                              fill="none"
                              strokeLinecap="round"
                              strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={cn("text-lg font-bold", getScoreColor(score))}>{score}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed pt-0.5">{aiAnalysis.reasoning}</p>
                      </div>

                      {/* Strengths & Improvements */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[11px] font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-[#4EAD3B]" /> Strengths
                          </p>
                          <div className="flex flex-col gap-1">
                            {aiAnalysis.strengths.map((s, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-green-50 text-green-700 border border-green-200 w-fit">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
                            <TrendingDown className="h-3 w-3 text-amber-500" /> Improvements
                          </p>
                          <div className="flex flex-col gap-1">
                            {aiAnalysis.improvements.map((s, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 w-fit">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </div>

                {/* ── Transcript ── */}
                <div className="mx-3 mb-2 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <AccordionItem value="transcript" className="border-0">
                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-gray-800 hover:no-underline hover:bg-gray-50 bg-white border-l-4 border-l-[#503afd]">
                      <div className="flex items-center gap-2">
                        <Mic className="h-4 w-4 text-[#503afd]" />
                        Transcript
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3 pt-1 bg-gray-50/50">
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-2.5 pr-2 pt-1">
                          {liveTranscript.map((entry) => (
                            <div
                              key={entry.id}
                              className={cn("flex gap-2", entry.speaker === "candidate" && "flex-row-reverse")}
                            >
                              <div
                                className={cn(
                                  "max-w-[88%] rounded-xl px-3 py-2 text-xs",
                                  entry.speaker === "ai"
                                    ? "bg-white border border-gray-200 text-gray-800 shadow-sm"
                                    : entry.type === "typed"
                                    ? "bg-[#7800D4]/8 border border-[#7800D4]/25 text-gray-800"
                                    : "bg-[#503afd] text-white"
                                )}
                              >
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className={cn(
                                    "text-[9px] font-semibold",
                                    entry.speaker === "ai" ? "text-gray-400" : entry.type !== "typed" ? "text-white/70" : "text-[#7800D4]/70"
                                  )}>
                                    {entry.speaker === "ai" ? "AI Interviewer" : candidateName}
                                  </span>
                                  {entry.type === "typed" && (
                                    <span className="text-[8px] px-1 py-0 rounded bg-[#7800D4]/15 text-[#7800D4] font-medium flex items-center gap-0.5">
                                      <Keyboard className="h-2 w-2" /> Typed
                                    </span>
                                  )}
                                  <button
                                    onClick={() => handleSeek(entry.timestamp)}
                                    className={cn(
                                      "text-[9px] ml-auto hover:underline",
                                      entry.speaker === "ai" ? "text-gray-400 hover:text-[#503afd]" : entry.type !== "typed" ? "text-white/60 hover:text-white" : "text-[#7800D4]/60 hover:text-[#7800D4]"
                                    )}
                                  >
                                    {formatTime(entry.timestamp)}
                                  </button>
                                </div>
                                {entry.type === "typed" ? (
                                  <pre className="text-[10px] font-mono whitespace-pre-wrap bg-white/80 p-2 rounded border border-[#7800D4]/10 mt-0.5">
                                    {entry.content}
                                  </pre>
                                ) : (
                                  <p className="leading-relaxed">{entry.content}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                </div>

                {/* ── Recruiter Feedback ── */}
                <div className="mx-3 mb-2 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <AccordionItem value="feedback" className="border-0">
                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-gray-800 hover:no-underline hover:bg-gray-50 bg-white border-l-4 border-l-[#4EAD3B]">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-[#4EAD3B]" />
                        Recruiter Feedback
                        {role === "recruiter" && (
                          <span className="text-[10px] font-normal text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full ml-0.5">
                            Optional
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-2 bg-white">
                      {role === "recruiter" ? (
                        <Textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Share your notes on this candidate's performance. This will be visible to the Hiring Lead."
                          className="min-h-[90px] resize-none border-gray-200 text-xs focus-visible:ring-[#7800D4] focus-visible:ring-offset-0"
                        />
                      ) : (
                        <div className="min-h-[70px] rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
                          <p className="text-xs text-gray-700 leading-relaxed">{mockRecruiterFeedback}</p>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </div>

              </Accordion>
            </div>

            {/* Action buttons */}
            <div className="border-t border-gray-100 px-4 py-3.5 bg-white shrink-0 flex gap-2.5">
              <Button
                variant="outline"
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 text-sm"
                onClick={handleReject}
              >
                <XCircle className="h-4 w-4 mr-1.5" />
                Reject
              </Button>
              <Button
                className="flex-1 bg-[#4EAD3B] hover:bg-[#3e8a2f] text-white text-sm"
                onClick={handleAlign}
              >
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                {alignLabel}
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
