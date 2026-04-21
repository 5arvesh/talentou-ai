import React from "react";
import { ModernJobList, JobItem } from "@/components/shared/ModernJobList";

export function JobListSalesPlan() {
  const allJobs: JobItem[] = [
    { id: 1, jobRole: "Software Engineer", status: "Draft", recruiter: "Sarah Johnson", hiringLead: "Mike Chen" },
    { id: 2, jobRole: "Product Manager", status: "Pending Approval", recruiter: "David Wilson", hiringLead: "Lisa Zhang" },
    { id: 3, jobRole: "Senior Developer", status: "Active", recruiter: "Emma Rodriguez", hiringLead: "John Smith" },
    { id: 4, jobRole: "UX Designer", status: "On Hold", recruiter: "Alex Thompson", hiringLead: "Maria Garcia" },
    { id: 5, jobRole: "Data Analyst", status: "Closed", recruiter: "Kevin Lee", hiringLead: "Jennifer Brown" },
    { id: 6, jobRole: "DevOps Engineer", status: "Cancelled", recruiter: "Rachel Kim", hiringLead: "Robert Taylor" },
  ];

  return <ModernJobList role="ta-leader" jobs={allJobs} title="Job List" />;
}
