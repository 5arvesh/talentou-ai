import React, { useState, useRef, useEffect } from 'react';
import { Send, PanelRightClose } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useHiringLeadConversation } from '@/context/HiringLeadConversationContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import talentouMascot from '@/assets/talentou-mascot-new.png';
import { useChatPanelStore } from '@/store/chat-panel-store';

interface HiringLeadConversationChatProps {
  scrollToStageRef?: React.MutableRefObject<((stage: number) => void) | undefined>;
}

export function HiringLeadConversationChat({ scrollToStageRef }: HiringLeadConversationChatProps) {
  const { chatMessages, currentStage, addChatMessage } = useHiringLeadConversation();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sendPulse, setSendPulse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const stageMessageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({
        id: 1,
        sender: 'ai',
        content: "Welcome! Let's create a new position together. I'll guide you through the process step by step. Please start by filling in the basic job details on the right panel, or ask me any questions you have!",
        name: 'TalentOU AI',
        stageIndex: 0
      });
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (scrollToStageRef) {
      scrollToStageRef.current = (stage: number) => {
        const stageRef = stageMessageRefs.current[stage];
        if (stageRef) {
          stageRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      };
    }
  }, [scrollToStageRef]);

  const handleAutoResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  const processUserResponse = (userMessage: string, stage: number) => {
    const lowerMessage = userMessage.toLowerCase();
    let aiResponse = '';

    switch (stage) {
      case 0:
        if (lowerMessage.includes('employment') || lowerMessage.includes('mode')) {
          aiResponse = "We offer four employment modes: Full-time, Part-time, Contract, and Internship. You can select the one that best fits your needs from the dropdown in the right panel.";
        } else if (lowerMessage.includes('salary') || lowerMessage.includes('budget') || lowerMessage.includes('range')) {
          aiResponse = "Yes! You can specify the maximum budget for this position. This helps candidates understand the compensation range and filters appropriately qualified talent.";
        } else if (lowerMessage.includes('remote') || lowerMessage.includes('work type') || lowerMessage.includes('hybrid')) {
          aiResponse = "You can choose between three work types: Remote, Hybrid, or Onsite. Simply click the toggle buttons in the Work Type section on the right panel.";
        } else {
          aiResponse = "I'm here to help with any questions about the job details! Once you've filled in all the required fields, click 'Next' and I'll generate the skills and responsibilities based on your input.";
        }
        break;
      case 1:
        if (lowerMessage.includes('add') || lowerMessage.includes('more') || lowerMessage.includes('technical')) {
          aiResponse = "Great idea! You can add more skills by typing them in the input field and clicking the '+' button. Feel free to add any technical or soft skills that are important for this role.";
        } else if (lowerMessage.includes('specific') || lowerMessage.includes('responsibilities') || lowerMessage.includes('edit')) {
          aiResponse = "To make responsibilities more specific, click the edit icon next to any item. You can modify the text to be more detailed and aligned with your exact requirements.";
        } else if (lowerMessage.includes('soft skills')) {
          aiResponse = "Soft skills can be added as either Required or Preferred Skills. Common ones include 'Communication', 'Leadership', 'Team Collaboration', and 'Problem Solving'.";
        } else {
          aiResponse = "The skills and responsibilities have been generated based on your job details. Feel free to edit, add, or remove any items. When you're satisfied, click 'Next' to set up the interview structure.";
        }
        break;
      case 2:
        if (lowerMessage.includes('what') && lowerMessage.includes('screening')) {
          aiResponse = "Screening questions are short questions candidates answer when they apply — before the actual interview. They help you filter candidates early. Examples: 'Do you have experience with React?' (Yes/No) or 'Describe your experience with cloud platforms.' (Text).";
        } else if (lowerMessage.includes('skip') || lowerMessage.includes('optional')) {
          aiResponse = "Screening questions are completely optional! If you don't need to pre-screen candidates, simply click 'Next: Interview Setup' to continue without adding any.";
        } else if (lowerMessage.includes('answer') || lowerMessage.includes('type')) {
          aiResponse = "You can choose between two answer types: 'Text response' for open-ended answers, or 'Yes / No' for simple binary questions. Yes/No questions are great for checking minimum requirements.";
        } else {
          aiResponse = "Here you can add pre-application screening questions. These are optional — candidates answer them when they apply. Click 'Next: Interview Setup' to continue whenever you're ready.";
        }
        break;
      case 3:
        if (lowerMessage.includes('ai') || lowerMessage.includes('generate') || lowerMessage.includes('questions')) {
          aiResponse = "In AI Assisted mode, you can use 'Generate with AI' to get preset questions tailored to the role. Scenario-based questions estimate ~4 mins, Knowledge questions ~2 mins. You can edit, delete, or add your own manually.";
        } else if (lowerMessage.includes('duration') || lowerMessage.includes('time') || lowerMessage.includes('default')) {
          aiResponse = "The default interview duration is 15 minutes, adjustable from 1 to 120 minutes. In AI Assisted mode, your Preset Questions play first and Adaptive AI fills whatever time remains.";
        } else if (lowerMessage.includes('difference') || lowerMessage.includes('manual') || lowerMessage.includes('assisted')) {
          aiResponse = "AI Assisted mode adds Adaptive AI questions to fill any time remaining after your Preset Questions — great for deeper exploration. Manual Setup plays only your Preset Questions with no AI involvement.";
        } else {
          aiResponse = "In this step you set the interview mode (AI Assisted or Manual), add your Preset Questions, and configure the total duration. Click 'Next: Review Job Description' when ready.";
        }
        break;
      default:
        aiResponse = "I'm here to help! What would you like to know?";
    }

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addChatMessage({
        id: Date.now(),
        sender: 'ai',
        content: aiResponse,
        name: 'TalentOU AI',
        stageIndex: stage
      });
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user' as const,
      content: inputValue,
      name: 'You',
      stageIndex: currentStage
    };

    addChatMessage(newMessage);
    const messageContent = inputValue;
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setSendPulse(true);
    setTimeout(() => setSendPulse(false), 400);

    processUserResponse(messageContent, currentStage);
  };

  return (
    <div className="flex flex-col h-full bg-[#FEFEFF] shadow-[inset_4px_0_12px_rgba(120,0,211,0.04)]">
      {/* Header */}
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

      {/* Messages Area */}
      <ScrollArea className="flex-1 min-h-0 p-6">
        <div className="space-y-4 max-w-3xl mx-auto">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] rounded-2xl px-5 py-4
                  animate-in fade-in slide-in-from-bottom-1 duration-200
                  ${message.sender === 'user'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-[#F3E8FF] border border-[#E0C7FF] text-slate-700 shadow-[0_2px_12px_rgba(120,0,211,0.06)]'
                  }
                `}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
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

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-[#FAFAFA] flex-shrink-0">
        <div className="flex gap-2 max-w-3xl mx-auto items-end">
          <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 shrink-0 mb-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
          </Button>
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
            disabled={!inputValue.trim() || isTyping}
            className={`h-10 w-10 rounded-full p-0 shrink-0 mb-0.5 bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-white border-0 disabled:opacity-50 ${sendPulse ? 'send-pulse' : ''}`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
