
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAlignment } from "@/context/AlignmentContext";
import YourTAPlanSoFar from "@/components/Reuseable/YourTAPlanSoFar";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string;
  name: string;
}

interface WorkspacePanelProps {
  currentStageIndex?: number;
  onStageChange?: (newStageIndex: number) => void;
}

export function MessageChat({ currentStageIndex = 0, onStageChange }: WorkspacePanelProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setComponentProgress, componentProgress } = useAlignment();
  const [isAligned, setIsAligned] = useState(false);
  const [isPlanSectionCollapsed, setIsPlanSectionCollapsed] = useState(false);

  useEffect(() => {
    localStorage.setItem("CollateralsAligned", "true");
    localStorage.setItem("ValuePropositionAligned", "true");
  }, []);

  const handleBackClick = () => {
    navigate("/sales-plan");
  };

  const handleAlignClick = () => {
    setIsAligned(true);
    toast({
      title: "Alignment Successful!",
      description: "Value proposition has been marked as aligned.",
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/ta-associate-plan");
      setComponentProgress("companyUSP", 100);
    }, 1000);
  };

  const handleSuggestFeedbackClick = () => {
    toast({
      title: "Feedback Submitted",
      description: "Your feedback has been recorded.",
      duration: 3000,
    });
  };

  const conversationFlow = [
    {
      ai: "Hi there! Let's begin with your TA Plan. The first step is defining your Company's Unique Selling Proposition, or simply, why a candidate should join your organization.\nYou can chat with me about your company's USP, attach a pre-written company profile or brand document, or share your company's website link. An ideal USP will cover these four broad topics Elevator Pitch, Career growth & development, Compensation & Benefits, Awards & Brand Recognition.\nSuggestions : Let's chat, Attach pre-written company profile.",
      expectedResponse: "Let's chat",
    },
    {
      ai: "How would you describe your company in a few lines to inspire a candidate to join? Think of it as your elevator pitch,  what makes your organization the right place for talent seeking purpose, growth, and impact?",
      expectedResponse:
        "At Ignitho, you'll work at the intersection of innovation and impact, helping build cutting-edge digital products for global enterprises. We offer the agility of a startup with the stability of a growth-stage company. You'll collaborate with industry leaders, upskill rapidly, and see your work make a real difference. If you're looking for purpose, growth, and a future-proof tech career, this is where it begins",
    },
    {
      ai: "That's a strong foundation. How would you describe the work culture at Ignitho?",
      expectedResponse:
        "It's highly collaborative and entrepreneurial. Teams work closely with senior leaders and clients, with a lot of freedom to lead.",
    },
    {
      ai: "Noted. What kind of career growth or development opportunities do you offer?",
      expectedResponse:
        "We promote fast. High performers take on leadership roles early, and we invest in mentorship and cross-skill training.",
    },
    {
      ai: "Great! And what are the top benefits and perks the candidates should know about?",
      expectedResponse:
      "Hybrid work, flexibility, upskilling programs, and Health care Insurance"
    },
    {
      ai: "Thanks! What types of performance-based rewards or recognition programs are currently offered to employees?",
      expectedResponse:
        "Yes – we offer performance-based bonuses and are known for our delivery excellence.",
    },
    {
      ai: "And finally, has Ignitho received any awards or recognitions that reinforce its brand?",
      expectedResponse:
        "We've been recognized by clients for our delivery excellence. Our alumni go on to lead teams in major tech firms, and we're scaling across the US and Europe. We've received the Great Place to Work Certification due to our high Employee Satisfaction Scores",
    },
    {
      ai: "We have captured your company's USP in the right panel.\nWould you like to: Edit this, or; Proceed to the next step - Talent Pool",
      type: "summary",
    },
  ];

  const messages: Message[] = conversationFlow.flatMap((step, index) => [
    {
      id: index * 2 + 1,
      sender: "ai",
      content: step.ai,
      name: "Talentou AI",
    },
    {
      id: index * 2 + 2,
      sender: "user",
      content: step.expectedResponse,
      name: "Roney",
    },
  ]);

  return (
    <div className="flex h-screen dark:bg-gray-900">
      <div className="flex flex-col h-full w-full">
        {/* Header */}
        <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Company USP</h2>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Messages Section */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white dark:bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "ai" && (
                    <div className="flex items-start max-w-[80%]">
                      <div className="flex flex-col justify-end">
                        <div className="bg-gray-200 p-2 dark:bg-gray-700 rounded-lg">
                          <p className="text-slate-900 px-1 dark:text-blue-100 whitespace-pre-line text-sm">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {message.sender === "user" && message.content && (
                    <div className="flex items-start max-w-[70%]">
                      <div className="flex flex-col justify-end">
                        <div className="bg-blue-100 p-2 dark:bg-blue-900 rounded-lg">
                          <p className="text-blue-900 px-1 dark:text-blue-100 whitespace-pre-line text-sm">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 p-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={handleSuggestFeedbackClick}
                className="border-brand-500 text-brand-600 dark:border-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20"
              >
                Suggest Feedback
              </Button>

              <Button
                onClick={handleAlignClick}
                className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-800 text-white"
              >
                {isAligned ? "Continue" : "I'm Aligned"}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
            <div className="border border-gray-200 rounded-lg p-2.5 m-2.5">
              <div
                className="flex justify-between items-center cursor-pointer mb-4"
                onClick={() => setIsPlanSectionCollapsed(!isPlanSectionCollapsed)}
              >
                <h3 className="font-semibold text-lg">Your TA Plan So Far</h3>
                {isPlanSectionCollapsed ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronUp className="h-5 w-5" />
                )}
              </div>

              {!isPlanSectionCollapsed && (
                <YourTAPlanSoFar
                  currentStageIndex={currentStageIndex}
                  onStageClick={onStageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
