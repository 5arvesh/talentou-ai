import React from "react";
import { Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: 1,
    title: "New feedback received",
    description: "John Doe submitted feedback on the sales process.",
    timestamp: "2023-10-23T12:34:56.789Z",
  },
  {
    id: 2,
    title: "New Position created",
    description: "A new job opening for Senior Backend Developer has been created.",
    timestamp: "2023-10-22T09:15:30.123Z",
  },
  {
    id: 3,
    title: "Reminder: Submit your sales plan",
    description: "The deadline for submitting your sales plan is approaching.",
    timestamp: "2023-10-21T18:00:00.000Z",
  },
];

export function Notifications() {
  const navigate = useNavigate();

  const handleNotificationClick = (notification: any) => {
    if (notification.title === "New Position created") {
      navigate("/notifications/new-position");
    }
  };

  return (
    <Card className="w-[500px] shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
        </CardTitle>
        <CardDescription>
          Here is a list of all your notifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                notification.title === "New Position created" ? "cursor-pointer" : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {notification.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
