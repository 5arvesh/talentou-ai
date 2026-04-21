import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Switch } from "@/components/ui/switch";
import { Clock, ArrowLeft, Edit2, Check, Send, Paperclip, Sparkles, PenLine, Plus, Trash2, Mic, Keyboard, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useChatPanelStore } from "@/store/chat-panel-store";

interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  name?: string;
}

interface Question {
  id: string;
  question: string;
  answerKey: string;
  answerMode: 'voice' | 'text' | 'both';
  isOpenEnded: boolean;
}

const stages = [
  { id: 0, title: 'Choose Source', description: 'AI or manual questions' },
  { id: 1, title: 'Configure Questions', description: 'Edit and review questions' },
  { id: 2, title: 'Set Time Limit', description: 'Overall interview duration' },
  { id: 3, title: 'Review & Save', description: 'Final review and confirm' }
];

// Helper to detect open-ended questions
const isOpenEndedQuestion = (question: string): boolean => {
  const openPatterns = [
    'tell me about',
    'describe',
    'walk me through',
    'what motivates',
    'why do you',
    'how do you handle',
    'what are your',
    'share an example',
    'explain your approach',
    'what interests you',
    'where do you see yourself',
    'what makes you'
  ];
  const lowerQuestion = question.toLowerCase();
  return openPatterns.some(p => lowerQuestion.includes(p));
};

// Auto-generate answer key for definitive questions
const generateAnswerKey = (question: string, isOpenEnded: boolean): string => {
  if (isOpenEnded) return "";
  
  const lowerQ = question.toLowerCase();
  
  if (lowerQ.includes('react') && lowerQ.includes('hooks')) {
    return "Should cover useState, useEffect, lifecycle methods, and modern React patterns.";
  }
  if (lowerQ.includes('database') || lowerQ.includes('query')) {
    return "Should mention indexing, query optimization, execution plans, and monitoring.";
  }
  if (lowerQ.includes('error handling') || lowerQ.includes('distributed')) {
    return "Circuit breakers, retry mechanisms, graceful degradation, and logging.";
  }
  if (lowerQ.includes('typescript') || lowerQ.includes('javascript')) {
    return "Type safety, interfaces, generics, and compile-time checks.";
  }
  if (lowerQ.includes('api') || lowerQ.includes('rest')) {
    return "HTTP methods, status codes, authentication, and RESTful design principles.";
  }
  
  return "Evaluate based on technical accuracy, clarity, and practical examples.";
};

export function QuestionnaireChat() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("jobId") || "0086";
  const jobName = searchParams.get("jobName") || "Senior Full Stack Developer";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const { isChatOpen } = useChatPanelStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [questionSource, setQuestionSource] = useState<"ai" | "manual" | "">("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [overallTime, setOverallTime] = useState(45);
  const [questionnaireName, setQuestionnaireName] = useState(`${jobName} - #${jobId}`);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [editingAnswerKey, setEditingAnswerKey] = useState<string | null>(null);
  const [editAnswerKeyValue, setEditAnswerKeyValue] = useState("");

  const createQuestion = (questionText: string): Question => {
    const isOpen = isOpenEndedQuestion(questionText);
    return {
      id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question: questionText,
      answerKey: generateAnswerKey(questionText, isOpen),
      answerMode: 'voice',
      isOpenEnded: isOpen
    };
  };

  const aiQuestions: Question[] = [
    createQuestion("Explain the difference between React hooks and class components."),
    createQuestion("How would you optimize a slow database query?"),
    createQuestion("Describe your approach to error handling in distributed systems."),
    createQuestion("Tell me about a challenging project and how you overcame obstacles."),
    createQuestion("How do you stay updated with the latest technologies?")
  ];

  useEffect(() => {
    setMessages([{
      id: 1,
      sender: "ai",
      content: "Hi! Let's create a questionnaire for this position. Would you like me to generate questions using AI, or would you prefer to provide your own questions?",
      name: "Talentou AI"
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const completeStage = (stage: number) => {
    setCompletedStages(prev => prev.includes(stage) ? prev : [...prev, stage]);
    setCurrentStage(stage + 1);
  };

  const handleSourceSelect = (source: "ai" | "manual") => {
    setQuestionSource(source);
    if (source === "ai") {
      setQuestions(aiQuestions);
    } else {
      setQuestions([]);
    }
    
    setMessages(prev => [...prev, 
      { id: prev.length + 1, sender: "user", content: source === "ai" ? "Let AI generate questions" : "I'll provide my own questions", name: "Interviewer" },
      { id: prev.length + 2, sender: "ai", content: source === "ai" 
        ? "I've generated 5 questions based on the job requirements. You can review and edit them in the right panel. Each question has a voice/text toggle and auto-generated answer keys."
        : "No problem! Add your questions in the right panel. Answer keys will be auto-generated for technical questions.", name: "Talentou AI" }
    ]);
    completeStage(0);
  };

  const handleQuestionsConfirm = () => {
    if (questions.length === 0) {
      toast.error("Please add at least one question");
      return;
    }
    setMessages(prev => [...prev, 
      { id: prev.length + 1, sender: "ai", content: `Great! You have ${questions.length} questions configured. Now, set the overall time limit for the interview.`, name: "Talentou AI" }
    ]);
    completeStage(1);
  };

  const handleTimeConfirm = () => {
    setMessages(prev => [...prev, 
      { id: prev.length + 1, sender: "ai", content: `Perfect! ${overallTime} minutes total. Each question will have approximately ${Math.round(overallTime / questions.length)} minutes. Review everything and save when ready.`, name: "Talentou AI" }
    ]);
    completeStage(2);
  };

  const handleSave = () => {
    toast.success("Questionnaire saved successfully!");
    setTimeout(() => navigate("/interviewer/jobs"), 1500);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    setQuestions(prev => [...prev, createQuestion(newQuestion)]);
    setNewQuestion("");
  };

  const handleAnswerModeChange = (questionId: string, mode: 'voice' | 'text' | 'both') => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, answerMode: mode } : q
    ));
  };

  const handleEditAnswerKey = (questionId: string, currentValue: string) => {
    setEditingAnswerKey(questionId);
    setEditAnswerKeyValue(currentValue);
  };

  const handleSaveAnswerKey = (questionId: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, answerKey: editAnswerKeyValue } : q
    ));
    setEditingAnswerKey(null);
    setEditAnswerKeyValue("");
  };

  const progressPercentage = (completedStages.length / stages.length) * 100;

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      {/* Left Progress Sidebar */}
      <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
        <div className="h-full flex flex-col bg-white">
          <div className="p-6 border-b border-[#7800D3]/15">
            <Button variant="ghost" size="sm" onClick={() => navigate("/interviewer/jobs")} className="mb-4 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h2 className="text-xl font-bold text-[#7800D3]">Questionnaire</h2>
            <p className="text-xs text-muted-foreground mt-1">Create interview questions</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {stages.map((stage) => {
              const isCompleted = completedStages.includes(stage.id);
              const isCurrent = stage.id === currentStage;
              return (
                <Card key={stage.id} className={`p-4 transition-all ${isCompleted ? 'border-[#4ead3b]' : isCurrent ? 'border-[#7800D3] shadow-md' : 'opacity-60'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold
                      ${isCompleted ? 'bg-[#4ead3b] text-white' : isCurrent ? 'bg-[#7800D3] text-white' : 'bg-muted text-muted-foreground'}`}>
                      {isCompleted ? <Check className="h-4 w-4" /> : stage.id + 1}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${isCompleted ? 'text-[#4ead3b]' : isCurrent ? 'text-[#7800D3]' : 'text-muted-foreground'}`}>
                        {stage.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{stage.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="p-6 border-t border-[#7800D3]/15">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-xl font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle>
        <div 
          className="absolute z-50 flex h-6 w-5 items-center justify-center rounded-full border border-gray-200 bg-white cursor-pointer shadow-md text-gray-500 hover:text-gray-800 hover:bg-gray-50"
          onClick={() => useChatPanelStore.getState().toggleChat()}
          title="Toggle Chat"
        >
          {isChatOpen ? <ChevronLeft className="h-4 w-4 pr-0.5" /> : <ChevronRight className="h-4 w-4 pl-0.5" />}
        </div>
      </ResizableHandle>

      {isChatOpen && (
        <>
          {/* Center Chat */}
          <ResizablePanel defaultSize={30} minSize={20}>
        <div className="h-full flex flex-col bg-white">
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 bg-[#7800D3]">
                <AvatarFallback className="text-white font-bold text-sm">TA</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#7800D3]">Talentou AI</h3>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-600 font-medium">ASSISTANT ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${msg.sender === 'user' ? 'bg-[#7800D3] text-white shadow-sm' : 'bg-white text-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100'}`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2 items-center">
              <Button type="button" variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button>
              <Input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder="Type your message..." className="flex-1" />
              <Button size="icon" className="shrink-0 h-10 w-10 shrink-0 bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0 rounded-full"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </ResizablePanel>
        </>
      )}

      <ResizableHandle />

      {/* Right Panel */}
      <ResizablePanel defaultSize={55} minSize={35}>
        <div className="h-full flex flex-col bg-white">
          {currentStage === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <h3 className="text-xl font-semibold mb-6">Choose Question Source</h3>
              <div className="space-y-4 w-full max-w-sm">
                <Card className={`p-5 cursor-pointer transition-all border-2 ${questionSource === 'ai' ? 'border-[#7800D3]' : 'hover:bg-muted/50'}`} onClick={() => handleSourceSelect('ai')}>
                  <div className="flex items-center gap-4">
                    <Sparkles className="h-8 w-8 text-[#7800D3]" />
                    <div>
                      <p className="font-semibold">AI Generated</p>
                      <p className="text-sm text-muted-foreground">Let AI create questions based on the JD</p>
                    </div>
                  </div>
                </Card>
                <Card className={`p-5 cursor-pointer transition-all border-2 ${questionSource === 'manual' ? 'border-[#7800D3]' : 'hover:bg-muted/50'}`} onClick={() => handleSourceSelect('manual')}>
                  <div className="flex items-center gap-4">
                    <PenLine className="h-8 w-8 text-[#7800D3]" />
                    <div>
                      <p className="font-semibold">Manual Input</p>
                      <p className="text-sm text-muted-foreground">Provide your own questions</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {currentStage === 1 && (
            <>
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-2">
                  {isEditingName ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input 
                        value={questionnaireName} 
                        onChange={(e) => setQuestionnaireName(e.target.value)}
                        className="text-xl font-bold"
                        autoFocus
                      />
                      <Button size="sm" variant="ghost" onClick={() => setIsEditingName(false)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-[#7800D3]">{questionnaireName}</h2>
                      <Button size="sm" variant="ghost" onClick={() => setIsEditingName(true)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{questions.length} questions</p>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="flex gap-2 p-4 border border-dashed border-border rounded-lg bg-muted/20">
                    <Input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Add a question..." className="flex-1" />
                    <Button onClick={handleAddQuestion}><Plus className="h-4 w-4" /></Button>
                  </div>
                  
                  {questions.map((q, i) => (
                    <div key={q.id} className="p-4 border-b border-border last:border-b-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-3">Q{i + 1}: {q.question}</p>
                          
                          {/* Answer Mode Toggle */}
                          <div className="flex items-center gap-4 mb-3">
                            <Label className="text-xs text-muted-foreground">Answer via:</Label>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant={q.answerMode === 'voice' ? 'default' : 'outline'}
                                className={q.answerMode === 'voice' ? 'bg-[#7800D3]' : ''}
                                onClick={() => handleAnswerModeChange(q.id, 'voice')}
                              >
                                <Mic className="h-3 w-3 mr-1" />
                                Voice
                              </Button>
                              <Button 
                                size="sm" 
                                variant={q.answerMode === 'text' ? 'default' : 'outline'}
                                className={q.answerMode === 'text' ? 'bg-[#7800D3]' : ''}
                                onClick={() => handleAnswerModeChange(q.id, 'text')}
                              >
                                <Keyboard className="h-3 w-3 mr-1" />
                                Text
                              </Button>
                              <Button 
                                size="sm" 
                                variant={q.answerMode === 'both' ? 'default' : 'outline'}
                                className={q.answerMode === 'both' ? 'bg-[#7800D3]' : ''}
                                onClick={() => handleAnswerModeChange(q.id, 'both')}
                              >
                                Both
                              </Button>
                            </div>
                          </div>
                          
                          {/* Answer Key */}
                          <div className="bg-muted/30 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-xs text-muted-foreground">
                                Answer Key {q.isOpenEnded && "(Open-ended question)"}
                              </Label>
                              {editingAnswerKey !== q.id && (
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 text-xs"
                                  onClick={() => handleEditAnswerKey(q.id, q.answerKey)}
                                >
                                  <Edit2 className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                              )}
                            </div>
                            {editingAnswerKey === q.id ? (
                              <div className="flex gap-2">
                                <Textarea 
                                  value={editAnswerKeyValue}
                                  onChange={(e) => setEditAnswerKeyValue(e.target.value)}
                                  className="text-xs min-h-[60px]"
                                  placeholder="Enter answer key..."
                                />
                                <Button size="sm" onClick={() => handleSaveAnswerKey(q.id)}>
                                  <Check className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                {q.answerKey || (q.isOpenEnded ? "No answer key for open-ended questions" : "Click edit to add answer key")}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 shrink-0" 
                          onClick={() => setQuestions(prev => prev.filter(x => x.id !== q.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t"><Button onClick={handleQuestionsConfirm} className="w-full bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0 font-semibold h-12">Confirm Questions</Button></div>
            </>
          )}

          {currentStage === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <Clock className="h-16 w-16 text-[#7800D3] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Set Overall Time Limit</h3>
              <p className="text-muted-foreground mb-6">Total time for all {questions.length} questions</p>
              <div className="flex items-center gap-4 mb-6">
                <Input type="number" value={overallTime} onChange={(e) => setOverallTime(Number(e.target.value))} className="w-24 text-center text-2xl" min={10} max={120} />
                <span className="text-lg">minutes</span>
              </div>
              <p className="text-sm text-muted-foreground">~{Math.round(overallTime / questions.length)} min per question</p>
              <Button onClick={handleTimeConfirm} className="mt-6 bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0 font-semibold h-12 px-6">Confirm Time</Button>
            </div>
          )}

          {currentStage === 3 && (
            <>
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-[#7800D3]">Review & Save</h2>
                <p className="text-xs text-muted-foreground mt-1">{questionnaireName}</p>
              </div>
              <ScrollArea className="flex-1 p-6">
                <Card className="p-4 mb-4 bg-muted/30">
                  <div className="flex justify-between mb-2"><span>Questions:</span><span className="font-bold">{questions.length}</span></div>
                  <div className="flex justify-between"><span>Total Time:</span><span className="font-bold">{overallTime} min</span></div>
                </Card>
                {questions.map((q, i) => (
                  <div key={q.id} className="p-3 mb-2 border-b border-border last:border-b-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium">Q{i + 1}: {q.question}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {q.answerMode === 'voice' && <><Mic className="h-3 w-3" /> Voice</>}
                        {q.answerMode === 'text' && <><Keyboard className="h-3 w-3" /> Text</>}
                        {q.answerMode === 'both' && <>Voice & Text</>}
                      </span>
                      {q.answerKey && <span>• Has answer key</span>}
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="p-4 border-t"><Button onClick={handleSave} className="w-full bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0 font-semibold h-12">Save Questionnaire</Button></div>
            </>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
