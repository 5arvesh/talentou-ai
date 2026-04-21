
import React, { useRef } from 'react';
import { PaperclipIcon, Mic, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  onFileSelect: () => void;
}

export const MessageInput = ({ message, setMessage, onSend, onFileSelect }: MessageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
      <div className="relative flex items-center">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your Message/USP or upload a document"
          className="flex-1 pr-24 rounded-full border-gray-300 shadow-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
        />
        <div className="absolute right-2 flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500" onClick={triggerFileUpload}>
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
            <Mic className="h-5 w-5" />
          </Button>
          <Button 
            variant="default"
            size="icon"
            className="rounded-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={onSend}
            style={{ backgroundColor: "#7800D3" }}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files?.length) {
              onFileSelect();
            }
          }}
          className="hidden"
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
      </div>
    </div>
  );
};

export default MessageInput;
