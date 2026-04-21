
import React from 'react';
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  content: string;
  from: 'user' | 'ai';
}

export const ChatMessage = ({ content, from }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex w-full",
      from === 'user' ? "justify-end" : "justify-start"
    )}>
      <div 
        className={cn(
          "inline-block max-w-[85%] p-3 rounded-lg",
          from === 'user' 
            ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100" 
            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
        )}
      >
        {from === 'ai' ? (
          <div className="prose dark:prose-invert prose-sm">
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
