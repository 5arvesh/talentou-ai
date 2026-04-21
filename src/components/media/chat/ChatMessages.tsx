
import React from "react";
import { Card } from "@/components/ui/card";

export function ChatMessages() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* AI message */}
      <div className="flex items-start gap-3 max-w-[80%]">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
          <span className="text-emerald-600 font-semibold">AI</span>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <p className="text-gray-800 dark:text-gray-200">
            Kindly setup the workflow for your SDRs to kickstart their outreach initiatives.
            Email, LinkedIn and Warm Calls are the three key media channels that you should
            be utilizing. Which media channel would you want to start with?
          </p>
          <p className="text-gray-800 dark:text-gray-200 mt-3">
            *We suggest not to start with calls in the B2B context.
          </p>
        </div>
      </div>
    </div>
  );
}
