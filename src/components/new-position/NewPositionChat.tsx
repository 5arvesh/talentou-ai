import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Paperclip } from 'lucide-react';
import { useNewPosition } from '@/context/NewPositionContext';

export function NewPositionChat() {
  const {
    messages,
    addMessage,
    showPrioritySelection
  } = useNewPosition();

  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    addMessage({
      sender: 'user',
      content: currentMessage,
      name: 'Roney'
    });
    setCurrentMessage('');
  };

  return (
    <div className="h-full bg-background flex flex-col border-r border-border">
      {/* Chat Header */}
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Avatar className="h-10 w-10 bg-[#7800D3]">
          <AvatarFallback className="text-white font-bold">TA</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-foreground">Talentou AI</h3>
          <p className="text-xs text-green-500">Online</p>
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
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-[#7800D3] text-white' 
                  : 'bg-muted text-foreground'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      {!showPrioritySelection && (
        <div className="p-4 border-t border-border">
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
            <Button type="submit" size="icon" className="shrink-0 bg-[#7800D3] hover:bg-[#7800D3]/90">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
