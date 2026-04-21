
import React, { useState } from "react";
import { 
  ArrowLeft,
  Send,
  Paperclip,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAlignment } from "@/context/AlignmentContext";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const MessageStep1 = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(
    "AI-led Digital Engineering\nDelivering Agentic AI for The Enterprise\nIgnitho AI, our suite of AI Agents, unlocks the power of Agentic AI, LLMs, Machine Learning and Gen AI, combining it with human expertise, to enable faster decision making and drive operational efficiency for our customers. Ignitho AI is backed by industry and tech experts with a track record of delivering results to global enterprises including Fortune 500 companies"
  );
  const { setValuePropositionAligned, setCollateralsAligned, isValuePropositionAligned, isCollateralsAligned } = useAlignment();
  
  const isMessageSubmitted = isValuePropositionAligned && isCollateralsAligned || submittedMessage;
  
  const handleSubmitMessage = () => {
    if (!message.trim()) return;
    
    // Save submitted message
    setSubmittedMessage(message);
    
    // Mark as aligned in context
    setValuePropositionAligned(true);
    setCollateralsAligned(true);
    
    // Clear input
    setMessage("");
    
    toast({
      title: "Message/USP saved",
      description: "Your message has been successfully added to your sales plan.",
    });
    
    // Navigate to sales plan page
    navigate("/sales-plan");
  };

  const handleBackClick = () => {
    // Set message as aligned
    setValuePropositionAligned(true);
    setCollateralsAligned(true);
    
    // Navigate back to sales plan
    navigate("/sales-plan");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left side - Chat interface */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Back button and header */}
        <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center rounded-t-lg">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Company USP</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Define your value proposition</p>
          </div>
        </div>

        {/* Chat messages area */}
        <div className="flex-1 py-10 overflow-y-auto">
          {isMessageSubmitted && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Thanks Roney for defining your Message / USP. Here is your uploaded Value Proposition/Message that you want to take to the market:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="font-semibold mb-2 res-1600:text-[17px]">
                  "AI-led Digital Engineering
                </p>
                <p className="mb-2 res-1600:text-[15px]">
                  Delivering Agentic AI for The Enterprise
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {submittedMessage}
                </p>
              </div>
              
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Take some time to review your message. If everything looks good, you can proceed with creating your Market / Database.
              </p>
            </div>
          )}

          {!isMessageSubmitted && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300">
                Hi there! I'm PiquAI, your sales assistant. Let's start by defining your Value Proposition or Unique Selling Point (USP).
                This is the foundation of your sales strategy - what makes your offering stand out in the market.
              </p>
              
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg my-4 border border-emerald-200 dark:border-emerald-800">
                <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                  <strong>Why this matters:</strong> A clear, compelling message helps you connect with prospects faster and makes your outreach more effective.
                  This will be the cornerstone of all your sales communications.
                </p>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300">
                Please enter your value proposition below or upload a document containing it.
              </p>
            </div>
          )}
        </div>

        {/* Message input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
          {!isMessageSubmitted ? (
            <div className="relative flex items-center">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a Message"
                className="flex-1 pr-24 rounded-full border-gray-300 shadow-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitMessage();
                  }
                }}
              />
              <div className="absolute right-2 flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-gray-600">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-gray-600">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button 
                  variant="default"
                  size="icon"
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleSubmitMessage}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="Send a Message"
                className="flex-1 pr-24 rounded-full border-gray-300 shadow-sm"
                disabled
              />
              <div className="absolute right-2 flex items-center space-x-1">
                <Button 
                  variant="default"
                  size="icon"
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleBackClick}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side - Progress panel */}
      <div className="w-full lg:w-1/3 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-6">Your Sales Plan So Far</h3>
        
        {/* Progress bars */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Message / USP</span>
            <span className="text-xs font-medium">{isMessageSubmitted ? "100%" : "50%"}</span>
          </div>
          <Progress 
            value={isMessageSubmitted ? 100 : 50} 
            className="h-2" 
            style={{
              background: isMessageSubmitted ? 
                "linear-gradient(to right, #22c55e, #4ade80)" : 
                "linear-gradient(to right, #f97316, #facc15)"
            }}
          />

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Market / Database</span>
            <span className="text-xs font-medium">0%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded"></div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Media / Outreach</span>
            <span className="text-xs font-medium">0%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded"></div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Measure / KPI</span>
            <span className="text-xs font-medium">0%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded"></div>
        </div>
        
        {/* Bottom section - removed tabs, added back button */}
        <div className="mt-auto">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sales Plan
          </Button>

          {/* Small reminder text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Complete this step to unlock the next phase of your sales plan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageStep1;
