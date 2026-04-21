
import React from 'react';
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SalesPlanProgressProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const SalesPlanProgress = ({ 
  isCollapsed,
  toggleCollapse 
}: SalesPlanProgressProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Panel Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Talent Plan So Far</h3>
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
        <div className="p-4">
          {/* Plan Progress Chart */}
          <div className="mb-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Company USP</span>
                <span className="text-xs font-medium">100%</span>
              </div>
              <Progress value={100} className="h-3 bg-gray-200" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Talent Pool</span>
                <span className="text-xs font-medium">0%</span>
              </div>
              <Progress value={0} className="h-3 w-full bg-gray-200 rounded" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Recruitment Channels</span>
                <span className="text-xs font-medium">75%</span>
              </div>
              <Progress value={75} className="h-3 w-full bg-gray-200 rounded" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Success Metrics</span>
                <span className="text-xs font-medium">0%</span>
              </div>
              <Progress value={0} className="h-3 w-full bg-gray-200 rounded" />
            </div>
            
            {/* Horizontal Axis */}
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
