import React from "react";
import { cn } from "@/lib/utils";
import { InboxSection } from "./types";

interface InboxSidebarProps {
  selectedSection: InboxSection;
  onSectionChange: (section: InboxSection) => void;
  getUnreadCount: (section: InboxSection) => number;
}

interface SectionItem {
  id: InboxSection;
  label: string;
  description: string;
}

const sectionItems: SectionItem[] = [
  {
    id: "all" as InboxSection,
    label: "All",
    description: "All notifications"
  },
  {
    id: "feedback" as InboxSection,
    label: "Feedback",
    description: "TA Plan suggestions"
  },
  {
    id: "approval" as InboxSection,
    label: "Approval",
    description: "Approval requests"
  },
  {
    id: "activity" as InboxSection,
    label: "Latest Activity",
    description: "System updates"
  }
];

export function InboxSidebar({ selectedSection, onSectionChange, getUnreadCount }: InboxSidebarProps) {
  return (
    <div className="w-[180px] border-r border-border bg-background">
      <div className="p-4">
        <div className="space-y-1">
          {sectionItems.map((item) => {
            const unreadCount = getUnreadCount(item.id);
            const isSelected = selectedSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full text-left p-2 rounded transition-colors",
                  "hover:bg-muted",
                  isSelected 
                    ? "bg-muted text-foreground" 
                    : "text-foreground"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {unreadCount > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}