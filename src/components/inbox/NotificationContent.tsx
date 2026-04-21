import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { InboxSection, InboxNotification } from "./types";

interface NotificationContentProps {
  section: InboxSection;
  notifications: InboxNotification[];
}

export function NotificationContent({ section, notifications }: NotificationContentProps) {
  const navigate = useNavigate();
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | null>(null);

  const handleNotificationClick = (notification: InboxNotification) => {
    if (notification.type === "approval") {
      navigate("/notifications/new-position");
    }
  };

  const handleQuickApprove = (option: "auto" | "manual", notificationId: string) => {
    if (option === "auto") {
      // Handle auto-assignment logic here
      console.log("Auto-assigning recruiter for notification:", notificationId);
    } else {
      // Navigate to conversation for manual recruiter selection
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

  return (
    <div className="flex-1 rounded-full dark:bg-blue-950/20">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {getSectionTitle(section)}
          </h2>
          <p className="text-muted-foreground">
            {notifications.length} {notifications.length === 1 ? "notification" : "notifications"}
          </p>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No notifications found</p>
            </div>
          ) : (
            notifications.map((notification) => (
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
  );
}