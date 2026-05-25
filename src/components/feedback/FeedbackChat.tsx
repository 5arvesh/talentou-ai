import React, { useState } from "react";
import { 
  PaperclipIcon, 
  Mic, 
  ArrowRightIcon,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAlignment } from "@/context/AlignmentContext";

type Message = {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

type FeedbackChatProps = {
  onSubmitFeedback: (feedback: string) => void;
};

export const FeedbackChat = ({ onSubmitFeedback }: FeedbackChatProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! I'd love to hear your feedback about the sales process. What suggestions do you have to improve our approach?",
      sender: "ai",
      timestamp: new Date(),
    }
  ]);
  const navigate = useNavigate();
  const { setValuePropositionAligned, setCollateralsAligned } = useAlignment();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: message,
      sender: "user" as const,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    
    // Send feedback to parent component
    onSubmitFeedback(message);
    
    // Clear input
    setMessage("");
    
    // Mark message as aligned in context
    setValuePropositionAligned(true);
    // Also set collaterals as aligned to fully complete the Message/USP card
    setCollateralsAligned(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        content: "Thank you for your feedback! I've recorded your suggestion and forwarded it to the sales team for review.",
        sender: "ai" as const,
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      
      // Navigate to sales plan after a short delay
      setTimeout(() => {
        navigate("/sales-plan");
      }, 1000);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header with Bot Info */}
      <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-4 rounded-t-lg">
        <div className="flex-shrink-0">
          <Avatar className="h-10 w-10 bg-emerald-600 text-white">
            <AvatarFallback>PA</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Piqual AI - Feedback</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Share your suggestions to improve the sales process</p>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex max-w-[80%] rounded-lg p-4",
                msg.sender === "user"
                  ? "ml-auto bg-emerald-100 dark:bg-emerald-900/30 text-gray-800 dark:text-gray-100"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              )}
            >
              {msg.content}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your feedback or suggestion..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button variant="ghost" size="icon">
            <PaperclipIcon className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5 text-gray-500" />
          </Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
