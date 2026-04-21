import { Layout } from "@/components/layout/Layout";
import { InboxPage } from "@/components/inbox/InboxPage";
import { InboxNotification } from "@/components/inbox/types";

// Mock data with proper ISO timestamps
const mockNotifications: InboxNotification[] = [
  {
    id: "1",
    type: "feedback",
    title: "TA Plan Feedback Submitted",
    description: "Sarah Johnson (Recruiter) has provided feedback on the TA Plan strategy for Q4 hiring goals",
    sender: "Sarah Johnson",
    senderRole: "Recruiter",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    isRead: false,
    actionRequired: true
  },
  {
    id: "2", 
    type: "approval",
    title: "New Job Approval Required",
    description: "Senior Backend Developer position created by Emma Rodriguez requires approval",
    sender: "Emma Rodriguez",
    senderRole: "Hiring Lead",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    isRead: false,
    actionRequired: true
  },
  {
    id: "3",
    type: "activity",
    title: "Job Status Changed",
    description: "UX Designer position status changed from 'Active' to 'On Hold'",
    sender: "System",
    senderRole: "System",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    isRead: true,
    actionRequired: false
  },
  {
    id: "4",
    type: "feedback",
    title: "TA Plan Review Needed",
    description: "Mike Chen (Recruiter) suggests modifications to the talent acquisition strategy",
    sender: "Mike Chen",
    senderRole: "Recruiter",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    isRead: false,
    actionRequired: true
  },
  {
    id: "5",
    type: "activity",
    title: "Recruiter Aligned to TA Plan",
    description: "Anna Davis has aligned to the Q4 TA Plan for Backend Developer hiring",
    sender: "System",
    senderRole: "System",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    isRead: true,
    actionRequired: false
  },
  {
    id: "6",
    type: "approval",
    title: "New Job Approval Required",
    description: "QA Engineer position created by Kevin Lee requires approval",
    sender: "Kevin Lee",
    senderRole: "Hiring Lead",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    isRead: false,
    actionRequired: true
  },
  {
    id: "7",
    type: "activity",
    title: "Interview Questionnaire Created",
    description: "John Smith created a questionnaire for Senior Developer position",
    sender: "John Smith",
    senderRole: "Interviewer",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    isRead: true,
    actionRequired: false
  },
  {
    id: "8",
    type: "activity",
    title: "Job Progress Updated",
    description: "Data Analyst position progress updated to 85% completion",
    sender: "System",
    senderRole: "System",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isRead: true,
    actionRequired: false
  }
];

export function NotificationsPage() {
  return (
    <Layout>
      <InboxPage 
        notifications={mockNotifications} 
        defaultSection="all"
        showBackButton={true}
        backPath="/sales-plan/dashboard"
      />
    </Layout>
  );
}