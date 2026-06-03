import React, { useState, useEffect, useRef } from 'react';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, PanelRightClose } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import talentouMascot from '@/assets/talentou-mascot-new.png';
import { useChatPanelStore } from '@/store/chat-panel-store';

interface TAPlanFlowChatProps {
  scrollToStageRef?: React.MutableRefObject<((stage: number) => void) | undefined>;
}

export function TAPlanFlowChat({ scrollToStageRef }: TAPlanFlowChatProps) {
  const { chatMessages, currentStage, addChatMessage, updatePlanData } = useTAPlanFlow();
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({
        sender: 'ai',
        content: "Welcome! I'm Talentou Agent, your Recruitment Plan assistant. Paste your company website URL in the chat and I'll extract key USPs automatically, or fill in the form on the right.",
      });
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const processUserResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (currentStage === 0) {
      if (lowerInput.includes('extract') || lowerInput.includes('website') || lowerInput.includes('document')) {
        return "Simply paste your company's website URL in the chat, and I'll automatically extract key USP points for you!";
      }
      if (lowerInput.includes('usp') || lowerInput.includes('value')) {
        return "Great USPs highlight what makes your company special: culture, benefits, growth opportunities, work-life balance, innovation, impact, flexibility, and compensation. Focus on what candidates care about most!";
      }
      if (lowerInput.includes('help')) {
        return "I'm here to guide you through building your recruitment plan. For Company USP, you can paste your company website URL directly in the chat, and I'll extract the key points automatically. What would you like to do?";
      }
    }

    if (currentStage === 1) {
      if (lowerInput.includes('region') || lowerInput.includes('location') || lowerInput.includes('country')) {
        return "Start by adding the countries you want to target, then drill down to specific states/regions and cities. You can add multiple locations across different countries. Remote work? Just specify it in the work mode!";
      }
      if (lowerInput.includes('industry') || lowerInput.includes('industries')) {
        return "Target industries help narrow your candidate pool. Think about where you'll find the best talent - Tech, Finance, Healthcare, E-commerce, etc. You can also specify target companies you'd like to poach from!";
      }
      if (lowerInput.includes('work mode') || lowerInput.includes('remote') || lowerInput.includes('hybrid')) {
        return "Work modes are critical for modern hiring! You can select Remote (work from anywhere), On-site (office-based), or Hybrid (mix of both). You can select multiple options if you're flexible.";
      }
    }

    if (currentStage === 2) {
      if (lowerInput.includes('who') || lowerInput.includes('invite') || lowerInput.includes('first')) {
        return "Start by inviting your core recruitment team - recruiters who'll source candidates. Then add hiring leads who'll interview. HR team invitations are coming soon!";
      }
      if (lowerInput.includes('multiple') || lowerInput.includes('many')) {
        return "Yes! You can invite as many team members as you need in each role. Just enter their email addresses and they'll receive invitations to join your recruitment plan workspace.";
      }
      if (lowerInput.includes('notify') || lowerInput.includes('notification')) {
        return "Once you complete the setup, all invited team members will receive email notifications with access to the plan. They'll be able to see their assigned roles and start collaborating immediately!";
      }
    }

    if (currentStage === 3) {
      if (lowerInput.includes('platform') || lowerInput.includes('digital') || lowerInput.includes('linkedin')) {
        return "This feature is coming soon! You'll be able to select digital platforms like LinkedIn, Naukri, and Indeed for reaching candidates. Stay tuned!";
      }
      return "Recruitment Channels section is coming soon! This will allow you to configure digital platforms, recruitment agencies, and offline events.";
    }

    return "I'm here to help! Let me know if you have any questions about filling out the form, or if you need guidance on any specific field. Just type your question and I'll do my best to assist!";
  };

  const extractFromURL = async (url: string) => {
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const elevatorPitch = `We offer a compelling work environment that prioritizes employee growth and wellbeing. Our flexible work arrangements include a remote-first culture, ensuring work-life balance. We provide comprehensive health insurance and wellness programs to support our employees' wellbeing.

Our company culture has been recognized as a Great Place to Work in 2024, reflecting our commitment to creating an exceptional workplace. We believe in rewarding performance with competitive compensation and annual bonuses. Each employee receives a professional development budget of $2000 annually to invest in their growth.`;

    updatePlanData('companyUSP', { elevatorPitch });

    setIsProcessing(false);

    addChatMessage({
      sender: 'ai',
      content: `I've extracted key USP points from your website and formatted them into an elevator pitch in the right panel. Feel free to review and edit!`,
    });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isProcessing) return;

    const message = userInput.trim();
    addChatMessage({ sender: 'user', content: message });
    setUserInput('');

    if (currentStage === 0) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = message.match(urlRegex);

      if (urls && urls.length > 0) {
        await extractFromURL(urls[0]);
        return;
      }
    }

    setIsTyping(true);
    const response = processUserResponse(message);
    setTimeout(() => {
      setIsTyping(false);
      addChatMessage({ sender: 'ai', content: response });
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img
            src={talentouMascot}
            alt="Talentou Agent"
            className="h-10 w-auto object-contain shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-[15px] font-semibold text-gray-800">Talentou Agent</h2>
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

      {/* Messages Area with centered loader overlay */}
      <div className="flex-1 relative overflow-hidden">
        {isProcessing && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <Loader2 className="h-9 w-9 text-[#7800D3] animate-spin" />
            <p className="text-sm text-muted-foreground mt-3 font-medium">Extracting from website…</p>
          </div>
        )}
        <ScrollArea className="h-full p-6">
          <div className="space-y-4 max-w-3xl mx-auto">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] rounded-2xl px-5 py-4
                    ${
                      message.sender === 'user'
                        ? 'bg-[#7800D3] text-white shadow-sm'
                        : 'bg-white text-slate-700 shadow-[0_2px_12px_rgba(0,0,0,0.08)]'
                    }
                  `}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                  <div className="flex gap-1.5 items-center">
                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-white">
        <div className="flex gap-2 max-w-3xl mx-auto items-center">
          <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
          </Button>
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="h-11 bg-gray-50 border-gray-200 rounded-full text-sm"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isProcessing || isTyping}
            className="h-10 w-10 rounded-full p-0 shrink-0 bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
