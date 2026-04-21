
import React, { useState } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  onSendMessage: (e: React.FormEvent) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleQuickMessage = (text: string) => {
    setMessage(text);
  };

  return (
    <div className="border-t p-3">
      <form 
        onSubmit={(e) => {
          onSendMessage(e);
          setMessage("");
        }} 
        className="flex items-end gap-2"
      >
        <Textarea 
          placeholder="Send a Message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 min-h-[44px] max-h-[200px] py-3 px-4 resize-none"
        />
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="icon" className="rounded-full">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="rounded-full">
            <Mic className="h-5 w-5" />
          </Button>
          <Button type="submit" size="icon" className="bg-emerald-500 hover:bg-emerald-600 rounded-full">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
      
      {/* Message shortcuts */}
      <div className="flex gap-2 mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full whitespace-nowrap"
          onClick={() => handleQuickMessage("Email Plan")}
        >
          Email Plan
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full whitespace-nowrap"
          onClick={() => handleQuickMessage("LinkedIn Plan")}
        >
          LinkedIn Plan
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full whitespace-nowrap"
          onClick={() => handleQuickMessage("Calling Plan")}
        >
          Calling Plan
        </Button>
      </div>
    </div>
  );
}
