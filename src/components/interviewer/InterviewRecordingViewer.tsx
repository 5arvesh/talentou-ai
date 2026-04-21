import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Header } from "@/components/header/Header";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  ArrowLeft,
  Maximize,
  Minimize,
  AlertTriangle,
  Users,
  EyeOff,
  MonitorOff,
  Clipboard,
  AlertCircle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Mic,
  Keyboard,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface TranscriptEntry {
  id: string;
  timestamp: number;
  speaker: 'ai' | 'candidate';
  type: 'voice' | 'typed';
  content: string;
  questionContext?: string;
}

interface ImportantMoment {
  startTime: number;
  endTime: number;
  type: 'multiple_faces' | 'eye_tracking' | 'background_voice' | 'tab_switch' | 'clipboard';
  severity: 'info' | 'warning' | 'critical';
  description: string;
}

interface AIAnalysis {
  overallScore: number;
  reasoning: string;
  summary: string;
  strengths: string[];
  improvements: string[];
}

export function InterviewRecordingViewer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const candidateId = searchParams.get("candidateId");
  const candidateName = searchParams.get("name") || "John Smith";
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(900); // 15 minutes total
  const [volume, setVolume] = useState([80]);
  const [feedback, setFeedback] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [writtenResponsesOpen, setWrittenResponsesOpen] = useState(true);

  // AI Analysis data
  const aiAnalysis: AIAnalysis = {
    overallScore: 78,
    reasoning: "The candidate demonstrated strong technical knowledge with clear explanations of React concepts and problem-solving approaches. Communication was effective, though could improve on system design depth and time management during complex questions.",
    summary: "Promising candidate with solid fundamentals in frontend development. Shows good problem-solving approach and communicates ideas clearly. Strong on React hooks and state management. Recommended for next round with focus on system design questions.",
    strengths: ["Technical depth", "Problem-solving", "Communication", "React expertise"],
    improvements: ["System design", "Time management", "Architecture patterns"]
  };

  // Important moments data
  const importantMoments: ImportantMoment[] = [
    { startTime: 81, endTime: 88, type: 'multiple_faces', severity: 'critical', description: 'Multiple faces detected' },
    { startTime: 145, endTime: 152, type: 'eye_tracking', severity: 'warning', description: 'Looking away from screen' },
    { startTime: 210, endTime: 215, type: 'background_voice', severity: 'warning', description: 'Background voices/whispers detected' },
    { startTime: 340, endTime: 345, type: 'tab_switch', severity: 'critical', description: 'Tab switching detected' },
    { startTime: 420, endTime: 425, type: 'clipboard', severity: 'info', description: 'Clipboard activity detected' }
  ];

  // Live transcript - complete interview conversation
  const liveTranscript: TranscriptEntry[] = [
    { id: "t1", timestamp: 0, speaker: 'ai', type: 'voice', content: "Hello and welcome to your technical interview at Talentou. I'm your AI interviewer, and I'll be guiding you through this session. Please make sure you're in a quiet environment and your camera is properly positioned. Are you ready to begin?" },
    { id: "t2", timestamp: 15, speaker: 'candidate', type: 'voice', content: "Yes, I'm ready. Thank you for having me." },
    { id: "t3", timestamp: 22, speaker: 'ai', type: 'voice', content: "Great! Let's start with the first question. Can you explain the difference between React hooks and class components?" },
    { id: "t4", timestamp: 30, speaker: 'candidate', type: 'voice', content: "Sure. React hooks were introduced in React 16.8 and allow functional components to use state and lifecycle methods. Before hooks, we had to use class components for stateful logic. With hooks like useState and useEffect, we can manage state and side effects in functional components, making the code more concise and easier to test." },
    { id: "t5", timestamp: 95, speaker: 'candidate', type: 'typed', content: "// Example of useState hook\nconst [count, setCount] = useState(0);\n\n// Example of useEffect hook\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);", questionContext: "React hooks vs class components" },
    { id: "t6", timestamp: 120, speaker: 'ai', type: 'voice', content: "Excellent explanation with a practical code example. Now, let's move on to the second question. How would you optimize a slow database query in production?" },
    { id: "t7", timestamp: 135, speaker: 'candidate', type: 'voice', content: "When dealing with slow database queries, I would start by analyzing the query execution plan using EXPLAIN. This helps identify bottlenecks like full table scans. Then I'd look at adding appropriate indexes, especially for columns used in WHERE clauses and JOINs." },
    { id: "t8", timestamp: 180, speaker: 'candidate', type: 'voice', content: "I would also consider query restructuring, breaking down complex queries into simpler ones, and using query caching where appropriate. Monitoring tools like pg_stat_statements in PostgreSQL help identify frequently slow queries." },
    { id: "t9", timestamp: 220, speaker: 'candidate', type: 'typed', content: "-- Adding an index for optimization\nCREATE INDEX idx_user_email ON users(email);\n\n-- Using EXPLAIN to analyze query\nEXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123;", questionContext: "Database query optimization" },
    { id: "t10", timestamp: 250, speaker: 'ai', type: 'voice', content: "Good approach with practical examples. For our third question, describe a challenging project you worked on and how you overcame the obstacles." },
    { id: "t11", timestamp: 265, speaker: 'candidate', type: 'voice', content: "In my previous role, we faced a critical performance issue where our main application was experiencing significant latency spikes during peak hours. The issue was affecting user experience and we were losing potential customers." },
    { id: "t12", timestamp: 310, speaker: 'candidate', type: 'voice', content: "I led the investigation and discovered that our caching layer wasn't properly invalidating, causing stale data issues. We implemented a more robust cache invalidation strategy using Redis pub/sub, added circuit breakers to prevent cascade failures, and set up comprehensive monitoring with Datadog." },
    { id: "t13", timestamp: 380, speaker: 'candidate', type: 'voice', content: "The result was a 70% reduction in latency and zero downtime during the migration. We also documented the entire process which helped prevent similar issues in the future." },
    { id: "t14", timestamp: 420, speaker: 'ai', type: 'voice', content: "That's a great example of problem-solving and leadership. Let me now ask you about your experience with microservices architecture. Can you explain how you would design a microservices system from scratch?" },
    { id: "t15", timestamp: 440, speaker: 'candidate', type: 'voice', content: "When designing a microservices architecture, I would first identify the bounded contexts and domain boundaries. Each microservice should be responsible for a single business capability. I'd use an API gateway for routing, implement service discovery, and ensure proper inter-service communication using either REST or message queues like RabbitMQ." },
    { id: "t16", timestamp: 520, speaker: 'candidate', type: 'typed', content: "// Microservices architecture example\nServices:\n- User Service (Auth, Profile)\n- Order Service (Cart, Checkout)\n- Product Service (Catalog, Inventory)\n- Notification Service (Email, Push)\n\nCommunication: REST API + RabbitMQ for async", questionContext: "Microservices architecture design" },
    { id: "t17", timestamp: 560, speaker: 'ai', type: 'voice', content: "Good overview. Now, how would you handle distributed transactions across microservices?" },
    { id: "t18", timestamp: 575, speaker: 'candidate', type: 'voice', content: "Distributed transactions are challenging. I would use the Saga pattern, where each transaction step has a compensating action. For example, if an order fails at the payment step, we roll back the inventory reservation. I'd also consider eventual consistency over strong consistency for better scalability." },
    { id: "t19", timestamp: 640, speaker: 'ai', type: 'voice', content: "That's correct. For our final question, what do you consider your greatest strength as a developer and an area you're currently working to improve?" },
    { id: "t20", timestamp: 660, speaker: 'candidate', type: 'voice', content: "My greatest strength is my ability to break down complex problems into manageable pieces and communicate technical concepts clearly to both technical and non-technical stakeholders. I'm currently working on improving my knowledge of system design at scale and distributed systems patterns." },
    { id: "t21", timestamp: 720, speaker: 'ai', type: 'voice', content: "Thank you for your thoughtful answers throughout this interview. We've covered a lot of ground, from React fundamentals to system design concepts. You'll receive feedback within 48 hours. Do you have any questions for me?" },
    { id: "t22", timestamp: 750, speaker: 'candidate', type: 'voice', content: "Yes, I was wondering about the team structure I'd be working with and what technologies are currently being used in the project?" },
    { id: "t23", timestamp: 780, speaker: 'ai', type: 'voice', content: "Great questions. You'd be joining a team of 5 engineers working on a React and Node.js stack with AWS infrastructure. The team follows agile methodologies with two-week sprints. Thank you for your time today. We'll be in touch soon!" },
    { id: "t24", timestamp: 820, speaker: 'candidate', type: 'voice', content: "Thank you very much for the opportunity. I look forward to hearing from you." }
  ];

  // Extract only typed responses for the collapsible section
  const typedResponses = liveTranscript.filter(entry => entry.type === 'typed');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration || 900);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRejectCandidate = () => {
    navigate("/interviewer/candidates", { 
      state: { 
        message: `${candidateName} has been rejected. Feedback recorded.` 
      }
    });
  };

  const handleSelectForF2F = () => {
    navigate("/interviewer/candidates", { 
      state: { 
        message: `${candidateName} has been selected for Face-to-Face round!` 
      }
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBorderColor = (score: number) => {
    if (score >= 80) return 'border-emerald-500';
    if (score >= 60) return 'border-amber-500';
    return 'border-red-500';
  };

  const getMomentIcon = (type: ImportantMoment['type']) => {
    switch (type) {
      case 'multiple_faces': return <Users className="h-4 w-4" />;
      case 'eye_tracking': return <EyeOff className="h-4 w-4" />;
      case 'background_voice': return <AlertCircle className="h-4 w-4" />;
      case 'tab_switch': return <MonitorOff className="h-4 w-4" />;
      case 'clipboard': return <Clipboard className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: ImportantMoment['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      case 'warning': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
      case 'info': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        {/* Page Header */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/interviewer/candidates")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Candidates
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-lg font-semibold text-foreground">{candidateName}</h1>
                <p className="text-sm text-muted-foreground">Software Engineer Position</p>
              </div>
            </div>
            
            {/* AI Score Badge */}
            <Badge 
              variant="outline" 
              className={cn(
                "text-lg px-4 py-2 font-bold border-2",
                getScoreBorderColor(aiAnalysis.overallScore),
                getScoreColor(aiAnalysis.overallScore)
              )}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI Score: {aiAnalysis.overallScore}/100
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Side - Video Player & Timestamps */}
          <div className={`flex flex-col ${isFullScreen ? 'flex-1' : 'w-1/2'} border-r border-border`}>
            {/* Video Player */}
            <div className="flex-1 bg-black flex items-center justify-center relative min-h-0">
              <video
                ref={videoRef}
                className="max-w-full max-h-full object-contain"
                poster="/lovable-uploads/ff853d55-4548-4078-945d-405c29da62c5.png"
              >
                Your browser does not support the video tag.
              </video>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
                onClick={() => setIsFullScreen(!isFullScreen)}
              >
                {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Video Controls */}
            <div className="bg-card border-t border-border p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    onValueChange={(value) => handleSeek(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleSeek(Math.max(0, currentTime - 10))}>
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handlePlayPause}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleSeek(Math.min(duration, currentTime + 10))}>
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={volume}
                      max={100}
                      step={1}
                      onValueChange={setVolume}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Important Timestamps */}
            {!isFullScreen && (
              <div className="border-t border-border bg-card">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Important Timestamps
                  </h3>
                  <ScrollArea className="h-[140px]">
                    <div className="space-y-2 pr-4">
                      {importantMoments.map((moment, index) => (
                        <button
                          key={index}
                          onClick={() => handleSeek(moment.startTime)}
                          className={cn(
                            "w-full text-left p-3 rounded-lg border transition-all hover:shadow-md",
                            getSeverityColor(moment.severity)
                          )}
                        >
                          <div className="flex items-center gap-3">
                            {getMomentIcon(moment.type)}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{moment.description}</p>
                              <p className="text-xs opacity-80">
                                {formatTime(moment.startTime)} - {formatTime(moment.endTime)}
                              </p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs capitalize",
                                moment.severity === 'critical' && "border-red-500 text-red-600",
                                moment.severity === 'warning' && "border-amber-500 text-amber-600",
                                moment.severity === 'info' && "border-blue-500 text-blue-600"
                              )}
                            >
                              {moment.severity}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Live Transcript & AI Analysis */}
          {!isFullScreen && (
            <div className="flex-1 bg-card overflow-hidden flex flex-col">
              <ScrollArea className="flex-1">
                <div className="p-6 space-y-6">
                  {/* AI Analysis Card */}
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        AI Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Score Circle */}
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <svg className="w-24 h-24 transform -rotate-90">
                            <circle
                              cx="48"
                              cy="48"
                              r="42"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              className="text-muted"
                            />
                            <circle
                              cx="48"
                              cy="48"
                              r="42"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              strokeDasharray={`${aiAnalysis.overallScore * 2.64} 264`}
                              className={getScoreColor(aiAnalysis.overallScore)}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={cn("text-2xl font-bold", getScoreColor(aiAnalysis.overallScore))}>
                              {aiAnalysis.overallScore}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {aiAnalysis.reasoning}
                          </p>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-foreground leading-relaxed">
                          {aiAnalysis.summary}
                        </p>
                      </div>

                      {/* Strengths & Improvements */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                            Strengths
                          </h4>
                          <div className="space-y-1">
                            {aiAnalysis.strengths.map((strength, i) => (
                              <Badge key={i} variant="secondary" className="mr-1 mb-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 text-amber-500" />
                            Areas to Improve
                          </h4>
                          <div className="space-y-1">
                            {aiAnalysis.improvements.map((area, i) => (
                              <Badge key={i} variant="secondary" className="mr-1 mb-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Candidate's Written Responses - Collapsible */}
                  <Collapsible open={writtenResponsesOpen} onOpenChange={setWrittenResponsesOpen}>
                    <Card>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Keyboard className="h-4 w-4 text-primary" />
                              Candidate's Written Responses
                              <Badge variant="secondary" className="ml-2">{typedResponses.length}</Badge>
                            </CardTitle>
                            {writtenResponsesOpen ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0 space-y-4">
                          {typedResponses.map((response) => (
                            <div key={response.id} className="border border-border rounded-lg p-4 bg-muted/20">
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {response.questionContext}
                                </Badge>
                                <button 
                                  onClick={() => handleSeek(response.timestamp)}
                                  className="text-xs text-primary hover:underline"
                                >
                                  {formatTime(response.timestamp)}
                                </button>
                              </div>
                              <pre className="text-xs font-mono bg-background p-3 rounded border overflow-x-auto whitespace-pre-wrap">
                                {response.content}
                              </pre>
                            </div>
                          ))}
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>

                  {/* Live Transcript */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Mic className="h-4 w-4 text-primary" />
                        Live Transcript
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                          {liveTranscript.map((entry) => (
                            <div 
                              key={entry.id} 
                              className={cn(
                                "flex gap-3",
                                entry.speaker === 'candidate' && "flex-row-reverse"
                              )}
                            >
                              <div 
                                className={cn(
                                  "max-w-[80%] rounded-lg p-3",
                                  entry.speaker === 'ai' 
                                    ? "bg-muted" 
                                    : entry.type === 'typed'
                                    ? "bg-primary/10 border border-primary/20"
                                    : "bg-primary text-primary-foreground"
                                )}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium">
                                    {entry.speaker === 'ai' ? 'AI Interviewer' : candidateName}
                                  </span>
                                  {entry.type === 'typed' && (
                                    <Badge variant="outline" className="text-[10px] px-1 py-0">
                                      <Keyboard className="h-2 w-2 mr-1" />
                                      Typed
                                    </Badge>
                                  )}
                                  {entry.type === 'voice' && entry.speaker === 'candidate' && (
                                    <Badge variant="outline" className="text-[10px] px-1 py-0 bg-primary-foreground/10">
                                      <Mic className="h-2 w-2 mr-1" />
                                      Voice
                                    </Badge>
                                  )}
                                  <button 
                                    onClick={() => handleSeek(entry.timestamp)}
                                    className="text-[10px] opacity-70 hover:opacity-100 hover:underline ml-auto"
                                  >
                                    {formatTime(entry.timestamp)}
                                  </button>
                                </div>
                                {entry.type === 'typed' ? (
                                  <pre className="text-xs font-mono whitespace-pre-wrap bg-background/50 p-2 rounded mt-2">
                                    {entry.content}
                                  </pre>
                                ) : (
                                  <p className="text-sm">{entry.content}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Feedback Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Additional Feedback</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Provide detailed feedback about the candidate's performance..."
                        className="min-h-[100px]"
                      />
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>

              {/* Decision Buttons - Fixed at bottom */}
              <div className="border-t border-border p-4 bg-card">
                <div className="flex gap-3">
                  <Button 
                    onClick={handleRejectCandidate}
                    variant="outline"
                    className="flex-1 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Candidate
                  </Button>
                  <Button 
                    onClick={handleSelectForF2F}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Select for Face-to-Face
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
