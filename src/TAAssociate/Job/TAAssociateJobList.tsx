import React from "react";
import { ModernJobList, JobItem } from "@/components/shared/ModernJobList";

export function TAAssociateJobList() {
  const mockJobs: JobItem[] = [
    { id: "JOB-0001", jobRole: "Senior Frontend Developer", priority: "High", status: "Active", hiringLead: "Jennifer Adams" },
    { id: "JOB-0002", jobRole: "Backend Engineer", priority: "Medium", status: "Active", hiringLead: "Michael Brown" },
    { id: "JOB-0003", jobRole: "DevOps Engineer", priority: "High", status: "Active", hiringLead: "Sarah Johnson" },
    { id: "JOB-0004", jobRole: "Product Manager", priority: "Low", status: "Closed", hiringLead: "Rachel Green" },
    { id: "JOB-0005", jobRole: "UI/UX Designer", priority: "Medium", status: "Active", hiringLead: "David Miller" },
    { id: "JOB-0006", jobRole: "Data Scientist", priority: "Low", status: "Cancelled", hiringLead: "Andrew Wilson" },
    { id: "JOB-0007", jobRole: "Full Stack Developer", priority: "High", status: "Active", hiringLead: "Emily Davis" },
  ];

  return <ModernJobList role="recruiter" jobs={mockJobs} title="Assigned Jobs" />;
}
