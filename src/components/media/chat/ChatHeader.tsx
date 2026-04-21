
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onBackClick?: () => void;
  title?: string;
}

export function ChatHeader({ onBackClick, title = "Media / Outreach Chat" }: ChatHeaderProps) {
  return (
    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
      {onBackClick && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBackClick}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      <h2 className="text-xl font-semibold flex-grow">{title}</h2>
    </div>
  );
}
