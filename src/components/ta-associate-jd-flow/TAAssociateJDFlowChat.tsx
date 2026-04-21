import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Paperclip } from 'lucide-react';
import { useTAAssociateJDFlow } from '@/context/TAAssociateJDFlowContext';

interface Message {
  id: number;
  sender: 'ai' | 'user';
  content: string;
  name: string;
}

interface TAAssociateJDFlowChatProps {
  scrollToStageRef: React.MutableRefObject<((stage: number) => void) | undefined>;
  jobId: string;
}

export function TAAssociateJDFlowChat({ scrollToStageRef, jobId }: TAAssociateJDFlowChatProps) {
  const { currentStage, completeStage, completedStages } = useTAAssociateJDFlow();
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      content: `Hi! I'm here to help you set up the job posting for ${jobId}. Let's start by reviewing the Job Description in the right panel. Please take your time to go through all the details.`,
      name: 'Talentou AI'
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update messages when stage changes
  useEffect(() => {
    if (currentStage === 1 && !messages.find(m => m.content.includes('screening questions'))) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          sender: 'ai',
          content: "Great! Now let's set up the screening questions. I've pre-generated some questions based on the job requirements. You can review, edit, add, or remove questions in the right panel.",
          name: 'Talentou AI'
        }]);
      }, 500);
    } else if (currentStage === 2 && !messages.find(m => m.content.includes('generate the shareable link'))) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          sender: 'ai',
          content: "Perfect! The screening questions have been saved. Now you can generate the shareable JD link. This link can be distributed to potential candidates.",
          name: 'Talentou AI'
        }]);
      }, 500);
    }
  }, [currentStage, messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: currentMessage,
      name: 'Recruiter'
    };
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');

    // Generate AI response
    setTimeout(() => {
      let aiResponse = "I understand. Let me help you with that.";
      
      const input = currentMessage.toLowerCase();
      if (input.includes('next') || input.includes('proceed') || input.includes('continue')) {
        if (currentStage === 0) {
          aiResponse = "Great! Click the 'I've Reviewed the JD' button in the right panel to proceed to the screening questions step.";
        } else if (currentStage === 1) {
          aiResponse = "Perfect! Once you're satisfied with the screening questions, click 'Save Questions' to proceed to link generation.";
        } else if (currentStage === 2) {
          aiResponse = "Click 'Generate Link' in the right panel to create your shareable JD link!";
        }
      } else if (input.includes('question') || input.includes('screen')) {
        aiResponse = "You can customize the screening questions in the right panel. Add new questions, edit existing ones, or remove any that aren't relevant. These questions will be asked to candidates when they apply.";
      } else if (input.includes('link') || input.includes('share')) {
        aiResponse = "Once you complete the setup, you'll get a shareable link that candidates can use to view the job and apply. You can copy the link and share it via email, social media, or any other channel.";
      }

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'ai',
        content: aiResponse,
        name: 'Talentou AI'
      }]);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-[#7800D3]">
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

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                message.sender === 'user' 
                  ? 'bg-[#7800D3] text-white shadow-sm' 
                  : 'bg-white text-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button type="button" variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="shrink-0 h-10 w-10 shrink-0 bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0 rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
