export type InboxSection = "all" | "feedback" | "approval" | "activity";

export interface InboxNotification {
  id: string;
  type: "feedback" | "approval" | "activity";
  title: string;
  description: string;
  sender: string;
  senderRole: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
  relatedJobId?: string;
}