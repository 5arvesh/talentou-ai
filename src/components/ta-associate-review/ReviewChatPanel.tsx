import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useTAPlanReview } from '@/context/TAPlanReviewContext';
import robotHead from '@/assets/robothead.svg';

export function ReviewChatPanel() {
  const { chatMessages, addChatMessage } = useTAPlanReview();
  const [currentMessage, setCurrentMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      addChatMessage('user', currentMessage);
      setCurrentMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="h-full flex flex-col bg-background border-r">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-[#7800d3]/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#7800d3] flex items-center justify-center">
            <img src={robotHead} alt="AI" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Talentou AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Here to help you review the plan</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div ref={scrollRef} className="space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] rounded-lg p-3 shadow-sm
                  ${msg.sender === 'user'
                    ? 'bg-[#7800d3] text-white'
                    : 'bg-muted'
                  }
                `}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <span
                  className={`
                    text-xs mt-1 block
                    ${msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}
                  `}
                >
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t p-4 bg-background">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type your feedback here..."
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-[#7800d3] hover:bg-[#7800d3]/90 text-white"
            disabled={!currentMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
