import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { InboxSection, InboxNotification } from "./types";

interface InboxPageProps {
  notifications: InboxNotification[];
  defaultSection?: InboxSection;
  showBackButton?: boolean;
  backPath?: string;
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

export function InboxPage({ notifications, defaultSection = "all", showBackButton = false, backPath = "/" }: InboxPageProps) {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<InboxSection>(defaultSection);
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | null>(null);

  const getFilteredNotifications = (section: InboxSection) => {
    if (section === "all") return notifications;
    if (section === "feedback") return notifications.filter(n => n.type === "feedback");
    if (section === "approval") return notifications.filter(n => n.type === "approval");
    if (section === "activity") return notifications.filter(n => n.type === "activity");
    return notifications;
  };

  const getUnreadCount = (section: InboxSection) => {
    const filtered = getFilteredNotifications(section);
    return filtered.filter(n => !n.isRead).length;
  };

  const handleNotificationClick = (notification: InboxNotification) => {
    if (notification.type === "approval") {
      navigate("/notifications/new-position");
    }
  };

  const handleQuickApprove = (option: "auto" | "manual", notificationId: string) => {
    if (option === "auto") {
      console.log("Auto-assigning recruiter for notification:", notificationId);
    } else {
      navigate("/notifications/new-position", { 
        state: { mode: "manual-recruiter-selection", notificationId } 
      });
    }
    setSelectedNotificationId(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const getSectionTitle = (section: InboxSection) => {
    switch (section) {
      case "all":
        return "All";
      case "feedback":
        return "Feedback";
      case "approval":
        return "Approval";
      case "activity":
        return "Latest Activity";
      default:
        return "Notifications";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "approval":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "feedback":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "activity":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredNotifications = getFilteredNotifications(selectedSection);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[180px] border-r border-border bg-background">
        <div className="p-4">
          <div className="space-y-1">
            {sectionItems.map((item) => {
              const unreadCount = getUnreadCount(item.id);
              const isSelected = selectedSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSection(item.id)}
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

      {/* Content */}
      <div className="flex-1 dark:bg-blue-950/20">
        <div className="p-6">
          {showBackButton && (
            <Button
              variant="ghost"
              onClick={() => navigate(backPath)}
              className="mb-4 -ml-2"
            >
              ← Back to Dashboard
            </Button>
          )}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {getSectionTitle(selectedSection)}
            </h2>
            <p className="text-muted-foreground">
              {filteredNotifications.length} {filteredNotifications.length === 1 ? "notification" : "notifications"}
            </p>
          </div>

          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "border border-border rounded-lg p-4 transition-colors bg-background hover:bg-muted/30",
                    notification.type === "approval" ? "cursor-pointer" : ""
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-sm">
                        {getInitials(notification.sender)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-foreground text-sm">
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className={cn(
                              "h-2 w-2 rounded-full",
                              notification.actionRequired ? "bg-red-500" : "bg-green-500"
                            )}></div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getTypeColor(notification.type)}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </Badge>
                          {notification.actionRequired && (
                            <Badge variant="destructive" className="text-xs">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-2">
                        {notification.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          From: {notification.sender} • {notification.senderRole}
                        </span>
                        <span>
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      
                      {notification.type === "approval" && notification.actionRequired && (
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" className="bg-gradient-to-r from-brand-500 to-blue-500 hover:from-brand-600 hover:to-blue-600">
                            Review Request
                          </Button>
                          <DropdownMenu 
                            open={selectedNotificationId === notification.id}
                            onOpenChange={(open) => setSelectedNotificationId(open ? notification.id : null)}
                          >
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                Quick Approve
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80 bg-white border border-border shadow-lg">
                              <DropdownMenuItem 
                                onClick={() => handleQuickApprove("auto", notification.id)}
                                className="cursor-pointer hover:bg-accent p-3"
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">Let Talentou AI auto-assign recruiter</span>
                                  <span className="text-xs text-muted-foreground mt-1">AI will automatically assign the best recruiter</span>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleQuickApprove("manual", notification.id)}
                                className="cursor-pointer hover:bg-accent p-3"
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">I want to choose the recruiter</span>
                                  <span className="text-xs text-muted-foreground mt-1">Select which recruiter to assign to this role</span>
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}