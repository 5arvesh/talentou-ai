
import React from "react";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, PhoneCall } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function OutreachSchedule() {
  return (
    <Card className="border rounded-xl overflow-hidden">
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-medium">Weekly SDR Outreach Plan</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Daily and weekly targets for each SDR
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400 w-20">Week</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Mon</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Tue</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Wed</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Thu</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Fri</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 text-xs">
            <tr>
              <td className="px-3 py-2 whitespace-nowrap font-medium">Week 1</td>
              <td colSpan={5} className="px-3 py-2">
                <TaskChip 
                  icon={<Mail size={14} />} 
                  label="Cold intro email" 
                  color="green"
                  tooltip="Send personalized intro email to all target contacts" 
                />
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 whitespace-nowrap font-medium">Week 2</td>
              <td colSpan={3} className="px-3 py-2">
                <TaskChip 
                  icon={<Mail size={14} />} 
                  label="Follow-up email" 
                  color="green"
                  tooltip="Send follow-up email to non-responders" 
                />
              </td>
              <td colSpan={2} className="px-3 py-2">
                <TaskChip 
                  icon={<Linkedin size={14} />} 
                  label="Connection request" 
                  color="orange"
                  tooltip="Send LinkedIn connection request with personalized note" 
                />
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 whitespace-nowrap font-medium">Week 3</td>
              <td colSpan={2} className="px-3 py-2">
                <TaskChip 
                  icon={<Linkedin size={14} />} 
                  label="Follow-up message" 
                  color="orange"
                  tooltip="Send LinkedIn follow-up message if connected" 
                />
              </td>
              <td className="px-3 py-2">
                <TaskChip 
                  icon={<PhoneCall size={14} />} 
                  label="First Call" 
                  color="green"
                  tooltip="Make first phone contact attempt" 
                />
              </td>
              <td colSpan={2} className="px-3 py-2">
                <TaskChip 
                  icon={<Mail size={14} />} 
                  label="Follow-up email" 
                  color="green"
                  tooltip="Send follow-up email with additional value proposition" 
                />
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 whitespace-nowrap font-medium">Week 4</td>
              <td colSpan={3} className="px-3 py-2">
                <TaskChip 
                  icon={<Mail size={14} />} 
                  label="Case study email" 
                  color="green"
                  tooltip="Send case study or value proposition email" 
                />
              </td>
              <td colSpan={2} className="px-3 py-2">
                <TaskChip 
                  icon={<Linkedin size={14} />} 
                  label="Engage content" 
                  color="orange"
                  tooltip="Engage with prospect's posts and content" 
                />
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 whitespace-nowrap font-medium">Week 5</td>
              <td colSpan={5} className="px-3 py-2">
                <TaskChip 
                  icon={<PhoneCall size={14} />} 
                  label="Reattempt Call" 
                  color="green"
                  tooltip="Make final follow-up call attempt" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}

interface TaskChipProps {
  icon: React.ReactNode;
  label: string;
  color: 'green' | 'orange' | 'red';
  tooltip: string;
}

function TaskChip({ icon, label, color, tooltip }: TaskChipProps) {
  const colorClasses = {
    green: "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400",
    orange: "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400",
    red: "bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`py-1.5 px-3 border rounded flex items-center justify-center ${colorClasses[color]}`}>
            <span className="mr-1.5">{icon}</span>
            <span className="truncate">{label}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
