import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, PanelRightClose } from 'lucide-react';
import { useTAAssociateJDFlow } from '@/context/TAAssociateJDFlowContext';
import talentouMascot from '@/assets/talentou-mascot-new.png';
import { useChatPanelStore } from '@/store/chat-panel-store';

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
  const { currentStage } = useTAAssociateJDFlow();
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sendPulse, setSendPulse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  }, [messages, isTyping]);

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

  const handleAutoResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: currentMessage,
      name: 'Recruiter'
    };
    setMessages(prev => [...prev, userMessage]);
    const msgContent = currentMessage;
    setCurrentMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setSendPulse(true);
    setTimeout(() => setSendPulse(false), 400);

    setIsTyping(true);
    setTimeout(() => {
      let aiResponse = "I understand. Let me help you with that.";
      const input = msgContent.toLowerCase();
      if (input.includes('next') || input.includes('proceed') || input.includes('continue')) {
        if (currentStage === 0) aiResponse = "Great! Click the 'I've Reviewed the JD' button in the right panel to proceed to the screening questions step.";
        else if (currentStage === 1) aiResponse = "Perfect! Once you're satisfied with the screening questions, click 'Save Questions' to proceed to link generation.";
        else if (currentStage === 2) aiResponse = "Click 'Generate Link' in the right panel to create your shareable JD link!";
      } else if (input.includes('question') || input.includes('screen')) {
        aiResponse = "You can customize the screening questions in the right panel. Add new questions, edit existing ones, or remove any that aren't relevant.";
      } else if (input.includes('link') || input.includes('share')) {
        aiResponse = "Once you complete the setup, you'll get a shareable link that candidates can use to view the job and apply.";
      }

      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'ai',
        content: aiResponse,
        name: 'Talentou AI'
      }]);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-[#FEFEFF] shadow-[inset_4px_0_12px_rgba(120,0,211,0.04)]">
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img
            src={talentouMascot}
            alt="Talentou Agent"
            className={`h-10 w-auto object-contain shrink-0 ${isTyping ? 'mascot-talking' : 'mascot-idle'}`}
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-medium tracking-tight text-gray-800">Talentou Agent</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
          <button
            onClick={() => useChatPanelStore.getState().toggleChat()}
            className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors"
            title="Close chat"
          >
            <PanelRightClose className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-5 py-4 animate-in fade-in slide-in-from-bottom-1 duration-200 ${
                message.sender === 'user'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-[#F3E8FF] border border-[#E0C7FF] text-slate-700 shadow-[0_2px_12px_rgba(120,0,211,0.06)]'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#F3E8FF] border border-[#E0C7FF] rounded-2xl px-4 py-3.5 shadow-[0_2px_12px_rgba(120,0,211,0.06)]">
                <div className="flex gap-1.5 items-center">
                  <span className="h-2 w-2 rounded-full bg-[#7800D3]/60 animate-bounce [animation-delay:0ms]" />
                  <span className="h-2 w-2 rounded-full bg-[#7800D3]/60 animate-bounce [animation-delay:150ms]" />
                  <span className="h-2 w-2 rounded-full bg-[#7800D3]/60 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border bg-[#FAFAFA]">
        <div className="flex gap-2 max-w-3xl mx-auto items-end">
          <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 shrink-0 mb-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
          </Button>
          <Textarea
            ref={textareaRef}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onInput={handleAutoResize}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message…"
            className="min-h-[44px] max-h-[120px] rounded-2xl resize-none bg-gray-50/80 border-gray-200 text-sm py-3"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || isTyping}
            className={`h-10 w-10 shrink-0 rounded-full p-0 mb-0.5 bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-white border-0 disabled:opacity-50 ${sendPulse ? 'send-pulse' : ''}`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
