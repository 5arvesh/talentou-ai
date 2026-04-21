import React, { useState, useEffect, useRef } from 'react';
import { useTAPlanFlow } from '@/context/TAPlanFlowContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import talentouMascot from '@/assets/talentou-mascot-new.png';


const stageSuggestions = {
  0: [
    "How do I extract USPs from our website?",
    "What makes a good company USP?",
    "Can I upload a document?",
  ],
  1: [
    "How do I target specific regions?",
    "What industries should I focus on?",
    "Can I add multiple countries?",
  ],
  2: [
    "Who should I invite first?",
    "Can I invite multiple people?",
    "How do team members get notified?",
  ],
  3: [
    "Which digital platforms work best?",
    "Should I use recruitment agencies?",
    "What about campus recruitment?",
  ],
};

interface TAPlanFlowChatProps {
  scrollToStageRef?: React.MutableRefObject<((stage: number) => void) | undefined>;
}

export function TAPlanFlowChat({ scrollToStageRef }: TAPlanFlowChatProps) {
  const { chatMessages, currentStage, addChatMessage, planData, updatePlanData } = useTAPlanFlow();
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({
        sender: 'ai',
        content: "Welcome! I'm Talentou AI, your TA Plan assistant. You can paste your company website URL directly in the chat, and I'll automatically extract key USP points for you. Or use the form on the right to add them manually!",
      });
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const processUserResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    // Stage-specific AI responses
    if (currentStage === 0) {
      if (lowerInput.includes('extract') || lowerInput.includes('website') || lowerInput.includes('document')) {
        return "Simply paste your company's website URL in the chat, and I'll automatically extract key USP points for you!";
      }
      if (lowerInput.includes('usp') || lowerInput.includes('value')) {
        return "Great USPs highlight what makes your company special: culture, benefits, growth opportunities, work-life balance, innovation, impact, flexibility, and compensation. Focus on what candidates care about most!";
      }
      if (lowerInput.includes('help')) {
        return "I'm here to guide you through building your TA plan. For Company USP, you can paste your company website URL directly in the chat, and I'll extract the key points automatically. What would you like to do?";
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
        return "Yes! You can invite as many team members as you need in each role. Just enter their email addresses and they'll receive invitations to join your TA Plan workspace.";
      }
      if (lowerInput.includes('notify') || lowerInput.includes('notification')) {
        return "Once you complete the setup, all invited team members will receive email notifications with access to the TA Plan. They'll be able to see their assigned roles and start collaborating immediately!";
      }
    }

    if (currentStage === 3) {
      if (lowerInput.includes('platform') || lowerInput.includes('digital') || lowerInput.includes('linkedin')) {
        return "This feature is coming soon! You'll be able to select digital platforms like LinkedIn, Naukri, and Indeed for reaching candidates. Stay tuned!";
      }
      return "Recruitment Channels section is coming soon! This will allow you to configure digital platforms, recruitment agencies, and offline events.";
    }

    // Generic helpful response
    return "I'm here to help! Let me know if you have any questions about filling out the form, or if you need guidance on any specific field. Just type your question and I'll do my best to assist!";
  };

  const extractFromURL = async (url: string) => {
    setIsProcessing(true);
    addChatMessage({
      sender: 'ai',
      content: `Extracting USPs from website: ${url}...`,
    });
    
    // Simulate API call (replace with actual extraction logic)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Format as elevator pitch paragraphs
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

    // Check for URLs only in Company USP stage
    if (currentStage === 0) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = message.match(urlRegex);
      
      if (urls && urls.length > 0) {
        await extractFromURL(urls[0]); // Extract from first URL
        return; // Don't process as regular chat
      }
    }

    // Regular chat processing
    const response = processUserResponse(message);
    setTimeout(() => {
      addChatMessage({ sender: 'ai', content: response });
    }, 500);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Chat Header with Talentou mascot */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start gap-4">
          <img 
            src={talentouMascot} 
            alt="Talentou AI" 
            className="h-14 w-auto object-contain shrink-0 mt-1" 
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#7800D3]" />
              <h2 className="text-xl font-bold text-[#7800D3]">Talentou AI</h2>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Online & ready to help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6">
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
                      : 'bg-white text-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100'
                  }
                `}
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
      {stageSuggestions[currentStage as keyof typeof stageSuggestions] && (
        <div className="px-6 pb-3">
          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {stageSuggestions[currentStage as keyof typeof stageSuggestions].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setUserInput(suggestion);
                }}
                className="text-xs h-8 hover:border-[#7800D3]/50"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2 max-w-3xl mx-auto items-center">
          <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
          </Button>
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="h-11 bg-gray-50 border-gray-200 rounded-xl text-sm"
          />
          <Button
            onClick={handleSendMessage}
            className="h-10 w-10 rounded-full p-0 shrink-0 bg-gradient-to-r from-[#503afd] to-[#3857fd] hover:from-[#503afd]/90 hover:to-[#3857fd]/90 text-white border-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
