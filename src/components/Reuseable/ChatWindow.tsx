import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, PaperclipIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  useAlignment,
  ComponentProgressType,
} from "@/context/AlignmentContext";
import { Textarea } from "../ui/textarea";

interface Message {
  id: number;
  sender: "ai" | "user";
  content: string | JSX.Element;
  name?: string;
}

interface ChatWindowProps {
  title: string;
  messages: Message[];
  currentMessage: string;
  onFileSelect?: () => void;
  onCurrentMessageChange: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onBackClick: () => void;
  sidebarComponent: React.ReactNode;
  additionalContent?: React.ReactNode;
  checkType?: React.ReactNode;
  currentStageIndex?: number;
  onProceedToNext?: () => void;
  showProceedButton?: boolean;
  progressTitle?: keyof ComponentProgressType;
  proceedButtonText?: string;
}

export function ChatWindow({
  title,
  messages,
  currentMessage,
  onCurrentMessageChange,
  onSendMessage,
  onBackClick,
  sidebarComponent,
  additionalContent,
  checkType,
  currentStageIndex = 0,
  onProceedToNext,
  showProceedButton,
  progressTitle,
  onFileSelect,
  proceedButtonText,
}: ChatWindowProps) {
  const [input, setInput] = useState(currentMessage); // Use local state only for input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  const {
    setComponentProgress,
    setValuePropositionAligned,
    setCollateralsAligned,
    setMilestonesAligned,
    setOutreachTimelineAligned,
    setMarketCriteriaAligned,
    isMilestonesAligned,
  } = useAlignment();

  useEffect(() => {
    if (progressTitle) {
      setComponentProgress(progressTitle, 50);
    }
  }, []);

  useEffect(() => {
    // Keep local input in sync with currentMessage prop from the parent
    setInput(currentMessage);
  }, [currentMessage]);

  const handleProceedClick = () => {
    if (progressTitle) {
      setComponentProgress(progressTitle, 100);
    }
    onBackClick();
    if (localStorage.getItem("ValuePropositionAligned") === "true") {
      setValuePropositionAligned(true);
    }
    if (localStorage.getItem("CollateralsAligned") === "true") {
      setCollateralsAligned(true);
    }
    if (localStorage.getItem("MilestonesAligned") === "true") {
      setMilestonesAligned(true);
    }
    if (localStorage.getItem("OutreachTimelineAligned") === "true") {
      setOutreachTimelineAligned(true);
    }
    if (localStorage.getItem("MarketCriteriaAligned") === "true") {
      setMarketCriteriaAligned(true);
    }
  };


  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submit behavior
    if (input.trim()) {
      onSendMessage(e); // Trigger parent message send callback
      setInput(""); // Clear input after submitting
      resetTextareaHeight();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If "Enter" is pressed, only submit the form, do not trigger file upload
    if (e.key === "Enter && !e.shiftKey") {
      e.preventDefault(); // Prevent default action (triggering file upload button)
      handleSubmit(e as React.FormEvent); // Trigger form submit
    }
  };

  const resetTextareaHeight = ()=>{
    if(textareaRef.current){
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(()=>{
    resetTextareaHeight();
  }, [input])

  return (
    <div className="flex h-[92vh] dark:bg-gray-900 res-1200:h-[91.5vh] res-1400:h-[90vh] res-1600:h-[91.2vh]">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={70} minSize={50}>
          <div className="flex flex-col h-full border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 res-1200:p-0.5 res-1400:p-1 res-1600:p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackClick}
                className="mr-2 res-1200:-mr-0.5 bg-transparent text-black dark:text-white hover:bg-transparent border-none shadow-none cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5 res-1200:h-2 res-1200:w-3" />
              </Button>
              <h2 className="text-xl font-semibold flex-grow res-1200:text-[14px] res-1400:text-[16px] res-1600:text-[18px]">
                {title}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4 res-1200:py-5 bg-white dark:bg-gray-900 res-1200:space-y-2 res-1200:px-3 res-1400:py-6 res-1400:px-4 res-1600:py-7 res-1600:px-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-6 flex res-1200:mb-3 res-1400:mb-4 res-1600:mb-5 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "ai" && (
                    <div className="flex items-start max-w-[80%]">
                      <div className="flex flex-col justify-end">
                        <div className="bg-gray-200 p-2 dark:bg-gray-700 rounded-lg">
                          <p className="text-slate-900 px-1 dark:text-blue-100 whitespace-pre-line text-base res-1200:text-[10px] res-1400:text-xs res-1600:text-[14px]">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {message.sender === "user" && (
                    <>
                      {!message.content ? (
                        ""
                      ) : (
                        <div className="flex items-start max-w-[70%]">
                          <div className="flex flex-col justify-end">
                            <div className="bg-blue-100 p-2 dark:bg-blue-900 rounded-lg">
                              <div className="text-blue-900 px-1 dark:text-blue-100 whitespace-pre-line text-base res-1200:text-[10px] res-1400:text-xs res-1600:text-[14px]">
                                {typeof message.content === "string" ? (
                                  <p>{message.content}</p>
                                ) : (
                                  message.content
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Your existing code for Proceed Button */}
            <div className="relative w-full">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-br from-[#7E00FC] to-[#0A92FE] z-10 res-1200:h-[1.5px]" />
              <div className="bg-white dark:bg-gray-900 w-full flex justify-end px-3 pt-3">
                {showProceedButton && (
                    <Button
                      onClick={handleProceedClick}
                      className="bg-white border-2 text-black dark:text-white rounded-full hover:bg-brand-50 dark:hover:bg-gray-700 px-4 py-2 res-1200:text-[10px] res-1200:h-6 res-1400:text-xs res-1400:h-7 res-1600:h-8 shadow-md"
                    >
                      {proceedButtonText || "Proceed to Next Step"}
                    </Button>
                  )}
              </div>
            </div>

            {/* Input & Send Message */}
            <div className="py-3 px-4 res-1200:p-2 overflow-hidden res-1600:pt-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <textarea
                  placeholder="Send a Message"
                  value={input} // Bind to local input state
                  onChange={(e) => {
                    setInput(e.target.value);
                    onCurrentMessageChange(e.target.value);
                    e.target.style.height = "auto"; // Reset height first
                    e.target.style.height = `${e.target.scrollHeight}px`; // Then expand
                  }}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  ref={textareaRef}
                  style={{ minHeight: "40px", maxHeight: "120px" }}
                  className="flex-1 resize-none overflow-y-auto scrollbar-hide px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#7E00FC] transition-all duration-200 res-1200:text-[10px] res-1400:text-xs"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-gray-500"
                  onClick={triggerFileUpload}
                >
                  <PaperclipIcon className="h-5 w-5 res-1200:w-3 res-1200:h-3" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileSelect}
                  className="hidden"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full h-10 w-10 cursor-pointer flex items-center justify-center bg-gradient-to-br from-[#7E00FC] to-[#0A92FE] hover:from-[#0A92FE] hover:to-[#7E00FC] 
                  res-1200:h-7 res-1200:w-7 res-1400:h-7 res-1400:w-7"
                  disabled={!input.trim()}
                >
                  <Send className="h-4 w-4 res-1200:h-3 res-1200:w-2.5 res-1400:h-3 res-1400:w-3 res-1600:h-4 res-1600:w-4" />
                </button>
              </form>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={48} minSize={30} maxSize={48}>
          {sidebarComponent}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
