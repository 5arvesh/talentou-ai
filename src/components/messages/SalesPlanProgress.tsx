
import React from 'react';
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SalesPlanProgressProps {
  messageProgress: number;
  submittedMessage: string;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const SalesPlanProgress = ({ 
  messageProgress, 
  submittedMessage, 
  isCollapsed,
  toggleCollapse 
}: SalesPlanProgressProps) => {
  return (
    <div className="w-1/3 bg-gray-50 dark:bg-gray-900 flex flex-col border-l border-gray-200 dark:border-gray-700 ml-4 rounded-lg shadow-sm h-full">
      {/* Panel Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800 rounded-t-lg">
        <h3 className="text-lg font-semibold res-1200:text-[15px]">Your Talent Plan So Far</h3>
        <button 
          onClick={toggleCollapse}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          )}
        </button>
      </div>

      {/* Panel Content */}
      {!isCollapsed && (
        <div className="p-4 overflow-auto flex-1 flex flex-col res-1200:p-2">
          {/* Plan Progress Chart */}
          <div className="mb-6">
            <div className="space-y-4 res-1200:space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm res-1200:text-xs">Company USP</span>
                <span className="text-xs font-medium res-1200:text-xs res-1400:text-xs">{messageProgress}%</span>
              </div>
              <Progress value={messageProgress} className="h-3 bg-gray-200" 
                style={{
                  background: messageProgress === 100 ? 
                    "linear-gradient(to right, #22c55e, #4ade80)" : 
                    "linear-gradient(to right, #f97316, #facc15)"
                }}
              />

              <div className="flex justify-between items-center">
                <span className="text-sm res-1200:text-xs">Talent Pool</span>
                <span className="text-xs font-medium res-1200:text-xs res-1400:text-xs">0%</span>
              </div>
              <Progress value={0} className="h-3 w-full bg-gray-200 rounded" />

              <div className="flex justify-between items-center">
                <span className="text-sm res-1200:text-xs">Recruitment Channels</span>
                <span className="text-xs font-medium res-1200:text-xs res-1400:text-xs">0%</span>
              </div>
              <Progress value={0} className="h-3 w-full bg-gray-200 rounded" />

              <div className="flex justify-between items-center">
                <span className="text-sm res-1200:text-xs">Success Metrics</span>
                <span className="text-xs font-medium res-1200:text-xs res-1400:text-xs">0%</span>
              </div>
              <Progress value={0} className="h-3 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Horizontal Axis */}
            <div className="mt-2 flex justify-between text-xs text-gray-500 res-1200:text-xs">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>
          
          {/* Company USP Content - Simplified without tabs */}
          <div className="mt-4 flex-1 flex flex-col res-1200:mt-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex-1 flex flex-col">
              <div className="p-3 bg-[#7800D3] rounded-t-lg res-1200:p-2">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-2 res-1200:mr-1 res-1200:h-4 res-1200:w-4" />
                  <span className="text-white font-medium res-1200:text-md">Company USP</span>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col res-1200:p-2">
                {submittedMessage ? (
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-semibold mb-2 res-1200:text-[15px] res-1600:text-[17px]">AI-led Digital Engineering</h4>
                    <p className="text-sm mb-4 font-medium res-1200:mb-2">Delivering Agentic AI for The Enterprise</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 res-1200:mb-2 res-1200:text-xs">
                      {submittedMessage}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-500 dark:text-gray-400 text-sm">
                    No Company USP content submitted yet. Type your message or upload a document.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPlanProgress;
