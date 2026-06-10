import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useTAPlanReview } from '@/context/TAPlanReviewContext';
import talentouMascot from '@/assets/talentou-mascot-new.png';

export function ReviewChatPanel() {
  const { chatMessages, addChatMessage } = useTAPlanReview();
  const [currentMessage, setCurrentMessage] = useState('');
  const [sendPulse, setSendPulse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleAutoResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    addChatMessage('user', currentMessage);
    setCurrentMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setSendPulse(true);
    setTimeout(() => setSendPulse(false), 400);
  };

  return (
    <div className="h-full flex flex-col bg-[#FEFEFF] shadow-[inset_4px_0_12px_rgba(120,0,211,0.04)]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={talentouMascot} alt="Talentou Agent" className="h-10 w-auto object-contain shrink-0 mascot-idle" />
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-medium tracking-tight text-gray-800">Talentou Agent</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4 max-w-3xl mx-auto">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] rounded-2xl px-5 py-4
                  animate-in fade-in slide-in-from-bottom-1 duration-200
                  ${msg.sender === 'user'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-[#F3E8FF] border border-[#E0C7FF] text-slate-700 shadow-[0_2px_12px_rgba(120,0,211,0.06)]'
                  }
                `}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-[#FAFAFA]">
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
            placeholder="Type your feedback here…"
            className="min-h-[44px] max-h-[120px] rounded-2xl resize-none bg-gray-50/80 border-gray-200 text-sm py-3"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim()}
            className={`h-10 w-10 shrink-0 rounded-full p-0 mb-0.5 bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-white border-0 disabled:opacity-50 ${sendPulse ? 'send-pulse' : ''}`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
