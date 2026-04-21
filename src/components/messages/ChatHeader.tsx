
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const ChatHeader = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-4 rounded-t-lg">
      <div className="flex-shrink-0">
        <Avatar className="h-10 w-10 bg-emerald-600 text-white">
          <AvatarFallback>PA</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">Piqual AI</h2>
        <p className="text-sm text-gray-500">Message / USP Submission</p>
      </div>
    </div>
  );
};

export default ChatHeader;
