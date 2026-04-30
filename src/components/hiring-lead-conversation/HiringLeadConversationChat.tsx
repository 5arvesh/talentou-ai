import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useHiringLeadConversation } from '@/context/HiringLeadConversationContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import talentouMascot from '@/assets/talentou-mascot.png';

const stageSuggestions = {
  0: [
    "What employment modes are available?",
    "Can I set a salary range?",
    "How do I specify remote work?",
  ],
  1: [
    "Add more technical skills",
    "Make the responsibilities more specific",
    "What about soft skills?",
  ],
  2: [
    "What are screening questions?",
    "Can I skip screening questions?",
    "What answer types can I use?",
  ],
  3: [
    "How does AI generate questions?",
    "What is the default interview duration?",
    "What is the difference between AI Assisted and Manual?",
  ],
};

interface HiringLeadConversationChatProps {
  scrollToStageRef?: React.MutableRefObject<((stage: number) => void) | undefined>;
}

export function HiringLeadConversationChat({ scrollToStageRef }: HiringLeadConversationChatProps) {
  const { chatMessages, currentStage, addChatMessage } = useHiringLeadConversation();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const stageMessageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Initialize with first message
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

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Expose scroll function
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

  const processUserResponse = (userMessage: string, stage: number) => {
    const lowerMessage = userMessage.toLowerCase();
    let aiResponse = '';

    switch (stage) {
      case 0: // Job Details
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
      case 1: // Skills & Responsibilities
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
      case 2: // Screening Questions
        if (lowerMessage.includes('what') && lowerMessage.includes('screening')) {
          aiResponse = "Screening questions are short questions candidates answer when they apply for the position — before the actual interview. They help you filter candidates early. Examples: 'Do you have experience with React?' (Yes/No) or 'Describe your experience with cloud platforms.' (Text).";
        } else if (lowerMessage.includes('skip') || lowerMessage.includes('optional')) {
          aiResponse = "Screening questions are completely optional! If you don't need to pre-screen candidates, simply click 'Next: Interview Setup' to continue without adding any.";
        } else if (lowerMessage.includes('answer') || lowerMessage.includes('type')) {
          aiResponse = "You can choose between two answer types: 'Text response' for open-ended answers, or 'Yes / No' for simple binary questions. Yes/No questions are great for checking minimum requirements.";
        } else {
          aiResponse = "Here you can add pre-application screening questions. These are optional — candidates answer them when they apply. Click 'Next: Interview Setup' to continue whenever you're ready.";
        }
        break;
      case 3: // Interview Setup
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

    setTimeout(() => {
      addChatMessage({
        id: Date.now(),
        sender: 'ai',
        content: aiResponse,
        name: 'TalentOU AI',
        stageIndex: stage
      });
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

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

    processUserResponse(messageContent, currentStage);
  };

  const currentSuggestions = stageSuggestions[currentStage as keyof typeof stageSuggestions] || [];


  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src="/src/assets/talentou-mascot-new.png" alt="Talentou Mascot" className="h-10 w-auto object-contain shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#7800D3]">Talentou AI</h2>
              <Sparkles className="h-4 w-4 text-[#7800D3]" />
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-600 font-medium">ASSISTANT ACTIVE</span>
            </div>
          </div>
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
                className={cn(
                  "max-w-[80%] rounded-2xl px-5 py-4",
                  message.sender === 'user'
                    ? 'bg-[#7800D3] text-white shadow-sm'
                    : 'bg-white text-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100'
                )}
              >
                {message.sender === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-[#7800D3]" />
                    <span className="text-xs font-semibold text-[#7800D3]">Talentou AI</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Quick Suggestions */}
      {currentSuggestions.length > 0 && (
        <div className="px-6 pb-3 flex-shrink-0">
          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {currentSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputValue(suggestion)}
                className="text-xs h-8 hover:border-[#7800D3]/50"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex gap-2 max-w-3xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about creating your position..."
            className="h-11 bg-gray-50 border-gray-200 rounded-xl text-sm"
          />
          <Button 
            type="button"
            variant="outline"
            className="h-12 px-4"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button 
            type="submit" 
            className="h-10 w-10 shrink-0 bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0 rounded-full p-0 flex items-center justify-center ml-2"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
