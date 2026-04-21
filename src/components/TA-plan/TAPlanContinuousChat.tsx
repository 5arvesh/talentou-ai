import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Bot, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTAPlan } from '@/context/TAPlanContext';
import { cn } from '@/lib/utils';
import { messageTemplates } from './messageTemplates';

const stageKeys = ['companyUSP', 'talentPool', 'recruitmentChannels', 'successMetrics', 'teamInvitation'];

// Stage-specific suggestions
const stageSuggestions = {
  0: [ // Company USP
    "We offer competitive salaries and equity",
    "Great work-life balance and remote options",
    "Fast-growing startup with learning opportunities",
    "Tell me more about what to include"
  ],
  1: [ // Talent Pool
    "Remote workers preferred",
    "Target tech industry professionals",
    "Senior level candidates (5+ years)",
    "Focus on specific geographic regions"
  ],
  2: [ // Channels
    "Use LinkedIn and Email",
    "3-touch outreach sequence",
    "Weekly follow-up cadence",
    "Multi-channel approach"
  ],
  3: [ // Metrics
    "30-day time-to-hire target",
    "Track quality-of-hire metrics",
    "Monthly hiring milestones",
    "Measure response rates"
  ],
  4: [ // Team
    "Invite recruiters now",
    "Add hiring managers",
    "Skip for now, I'll do it later",
    "How does team collaboration work?"
  ]
};

interface TAPlanContinuousChatProps {
  scrollToStageRef?: React.MutableRefObject<((stage: number) => void) | undefined>;
}

export function TAPlanContinuousChat({ scrollToStageRef }: TAPlanContinuousChatProps) {
  const { chatMessages, currentStage, stages, addChatMessage, updateStageData, completeStage } = useTAPlan();
  const [inputValue, setInputValue] = useState('');
  const [conversationState, setConversationState] = useState({
    questionsAsked: 0,
    awaitingResponse: false
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const stageMessageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Initialize with first message if empty
  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({
        id: 1,
        sender: 'ai',
        content: messageTemplates.stage0[0].content,
        name: messageTemplates.stage0[0].name,
        stageIndex: 0
      });
    }
  }, []);

  // Auto-add stage transition messages when stage changes
  useEffect(() => {
    if (currentStage > 0 && chatMessages.length > 0) {
      const lastMessage = chatMessages[chatMessages.length - 1];
      if (lastMessage.stageIndex !== currentStage) {
        const stageTemplates = messageTemplates[`stage${currentStage}` as keyof typeof messageTemplates];
        if (stageTemplates && Array.isArray(stageTemplates)) {
          setTimeout(() => {
            addChatMessage({
              id: Date.now(),
              sender: 'ai',
              content: stageTemplates[0].content,
              name: stageTemplates[0].name,
              stageIndex: currentStage
            });
          }, 500);
        }
      }
    }
  }, [currentStage]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Expose scroll function to parent
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

  const handleQuickSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const processUserResponse = (userMessage: string, stage: number) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Stage 0: Company USP
    if (stage === 0) {
      if (!stages.companyUSP.data.elevatorPitch) {
        updateStageData('companyUSP', { elevatorPitch: userMessage });
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "Great! Now tell me about career growth opportunities at your company.",
            name: 'Talentou AI',
            stageIndex: stage
          });
        }, 1000);
      } else if (!stages.companyUSP.data.careerGrowth) {
        updateStageData('companyUSP', { careerGrowth: userMessage });
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "Excellent! What about compensation and benefits?",
            name: 'Talentou AI',
            stageIndex: stage
          });
        }, 1000);
      } else if (!stages.companyUSP.data.compensation) {
        updateStageData('companyUSP', { compensation: userMessage });
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "Perfect! Any awards or recognitions your company has received?",
            name: 'Talentou AI',
            stageIndex: stage
          });
        }, 1000);
      } else {
        updateStageData('companyUSP', { awards: userMessage });
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "✅ Company USP section complete! Your employer value proposition is ready.",
            name: 'Talentou AI',
            stageIndex: stage
          });
          completeStage('companyUSP');
        }, 1000);
      }
    }
    
    // Stage 1: Talent Pool
    else if (stage === 1) {
      if (lowerMessage.includes('remote') || lowerMessage.includes('hybrid') || lowerMessage.includes('on-site')) {
        const arrangements = [];
        if (lowerMessage.includes('remote')) arrangements.push('Remote');
        if (lowerMessage.includes('hybrid')) arrangements.push('Hybrid');
        if (lowerMessage.includes('on-site') || lowerMessage.includes('onsite') || lowerMessage.includes('office')) arrangements.push('On-site');
        updateStageData('talentPool', { workArrangement: arrangements });
        
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "Got it! What geographic locations are you targeting? (e.g., San Francisco, New York, Remote US)",
            name: 'Talentou AI',
            stageIndex: stage
          });
        }, 1000);
      } else if (stages.talentPool.data.workArrangement.length > 0 && stages.talentPool.data.geographicPreferences.length === 0) {
        const locations = userMessage.split(',').map(s => s.trim());
        updateStageData('talentPool', { geographicPreferences: locations });
        
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "Which industries are you targeting? (e.g., Tech, Finance, Healthcare)",
            name: 'Talentou AI',
            stageIndex: stage
          });
        }, 1000);
      } else if (stages.talentPool.data.geographicPreferences.length > 0 && stages.talentPool.data.targetIndustries.length === 0) {
        const industries = userMessage.split(',').map(s => s.trim());
        updateStageData('talentPool', { targetIndustries: industries });
        
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "What key skills are required? (e.g., React, Python, Leadership)",
            name: 'Talentou AI',
            stageIndex: stage
          });
        }, 1000);
      } else {
        const skills = userMessage.split(',').map(s => s.trim());
        updateStageData('talentPool', { keySkills: skills });
        
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "✅ Talent Pool defined! Your ideal candidate profile is ready.",
            name: 'Talentou AI',
            stageIndex: stage
          });
          completeStage('talentPool');
        }, 1000);
      }
    }
    
    // Stage 2: Channels
    else if (stage === 2) {
      if (stages.recruitmentChannels.data.selectedChannels.length === 0) {
        const channels = [];
        if (lowerMessage.includes('email')) channels.push('Email');
        if (lowerMessage.includes('linkedin')) channels.push('LinkedIn');
        if (lowerMessage.includes('phone')) channels.push('Phone');
        updateStageData('recruitmentChannels', { selectedChannels: channels });
        
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "What's your preferred outreach cadence? (e.g., 'Contact 3 times over 2 weeks')",
            name: 'Talentou AI',
            stageIndex: stage
          });
        }, 1000);
      } else {
        updateStageData('recruitmentChannels', { cadence: userMessage });
        
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "✅ Recruitment Channels configured! Your outreach strategy is set.",
            name: 'Talentou AI',
            stageIndex: stage
          });
          completeStage('recruitmentChannels');
        }, 1000);
      }
    }
    
    // Stage 3: Metrics
    else if (stage === 3) {
      if (stages.successMetrics.data.kpis.length === 0) {
        const kpis = userMessage.split(',').map(s => s.trim());
        updateStageData('successMetrics', { kpis });
        
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "What are your hiring targets? (e.g., '10 hires in Q1, 5 senior engineers')",
            name: 'Talentou AI',
            stageIndex: stage
          });
        }, 1000);
      } else {
        const targets = userMessage.split(',').map(s => s.trim());
        updateStageData('successMetrics', { targets });
        
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "✅ Success Metrics established! You can track your progress now.",
            name: 'Talentou AI',
            stageIndex: stage
          });
          completeStage('successMetrics');
        }, 1000);
      }
    }
    
    // Stage 4: Team
    else if (stage === 4) {
      if (lowerMessage.includes('skip') || lowerMessage.includes('later')) {
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "✅ No problem! You can invite team members anytime from your dashboard.",
            name: 'Talentou AI',
            stageIndex: stage
          });
          completeStage('teamInvitation');
          
          setTimeout(() => {
            addChatMessage({
              id: Date.now() + 1,
              sender: 'ai',
              content: messageTemplates.completion.content,
              name: 'Talentou AI',
              stageIndex: stage
            });
          }, 1500);
        }, 1000);
      } else {
        updateStageData('teamInvitation', { recruiters: [{ email: userMessage }] });
        setTimeout(() => {
          addChatMessage({
            id: Date.now(),
            sender: 'ai',
            content: "✅ Team invitations sent! They'll receive access to collaborate on this plan.",
            name: 'Talentou AI',
            stageIndex: stage
          });
          completeStage('teamInvitation');
          
          setTimeout(() => {
            addChatMessage({
              id: Date.now() + 1,
              sender: 'ai',
              content: messageTemplates.completion.content,
              name: 'Talentou AI',
              stageIndex: stage
            });
          }, 1500);
        }, 1000);
      }
    }
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

    // Process the user's response
    processUserResponse(messageContent, currentStage);
  };

  const currentSuggestions = stageSuggestions[currentStage as keyof typeof stageSuggestions] || [];

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-[#58bb6b]/10 via-primary/5 to-background flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#58bb6b]/30 to-[#58bb6b]/10 flex items-center justify-center border border-[#58bb6b]/30">
          <Bot className="w-6 h-6 text-[#58bb6b]" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground">Your Talentou AI Coach</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#58bb6b] animate-pulse" />
            <span className="text-xs text-[#58bb6b] font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatMessages.map((message, index) => {
          // Check if this is a stage transition
          const isStageTransition = message.stageIndex !== undefined && 
            index > 0 && 
            chatMessages[index - 1].stageIndex !== message.stageIndex;

          // Check if this is a completion message
          const isCompletionMessage = message.content.startsWith('✅');

          return (
            <React.Fragment key={message.id}>
              {/* Stage Transition Divider */}
              {isStageTransition && (
                <div 
                  ref={(el) => {
                    if (message.stageIndex !== undefined) {
                      stageMessageRefs.current[message.stageIndex] = el;
                    }
                  }}
                  className="flex items-center gap-4 py-6 animate-fade-in"
                >
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#58bb6b]/30 to-transparent" />
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#58bb6b]/20 to-[#58bb6b]/10 border border-[#58bb6b]/30 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-[#58bb6b]" />
                    <span className="text-xs font-medium text-foreground">
                      Stage {(message.stageIndex || 0) + 1}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#58bb6b]/30 via-transparent to-transparent" />
                </div>
              )}

              {/* Message */}
              <div className={cn(
                "flex gap-3 animate-fade-in",
                message.sender === 'user' ? "flex-row-reverse" : "flex-row"
              )}>
                {/* Avatar */}
                <div className={cn(
                  "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold",
                  message.sender === 'ai' 
                    ? "bg-gradient-to-br from-[#58bb6b]/20 to-primary/20 border border-[#58bb6b]/30 text-[#58bb6b]" 
                    : "bg-gradient-to-br from-primary to-primary/80 border border-primary/30 text-primary-foreground"
                )}>
                  {message.sender === 'ai' ? <Bot className="w-5 h-5" /> : 'You'}
                </div>

                {/* Message Content */}
                <div className={cn(
                  "max-w-[70%] rounded-lg px-4 py-3",
                  message.sender === 'ai' 
                    ? isCompletionMessage
                      ? "bg-gradient-to-br from-[#58bb6b]/10 to-[#58bb6b]/5 text-foreground border border-[#58bb6b]/30"
                      : "bg-gradient-to-br from-muted to-muted/50 text-foreground border border-border/50"
                    : "bg-gradient-to-br from-[#58bb6b] to-[#4aa75c] text-white shadow-md"
                )}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {currentSuggestions.length > 0 && (
        <div className="px-6 pb-3">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {currentSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleQuickSuggestion(suggestion)}
                className="px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-accent/50 to-accent/30 hover:from-[#58bb6b]/20 hover:to-[#58bb6b]/10 text-foreground hover:text-[#58bb6b] border border-border hover:border-[#58bb6b]/40 transition-all duration-200 hover:shadow-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 border-t border-border bg-background/80 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            className="flex-shrink-0 hover:bg-accent/50 hover:border-[#58bb6b]/30"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-border/50 focus:border-[#58bb6b]/50"
          />
          
          <Button 
            type="submit" 
            size="icon"
            disabled={!inputValue.trim()}
            className="bg-[#58bb6b] hover:bg-[#4aa75c] text-white disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}