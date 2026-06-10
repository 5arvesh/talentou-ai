import React from "react";
import { ModernJobList, JobItem } from "@/components/shared/ModernJobList";

export function JobListSalesPlan() {
  const allJobs: JobItem[] = [
    { id: 1, jobRole: "Software Engineer", status: "Draft", recruiter: "Sarah Johnson", hiringLead: "Mike Chen", priority: "Medium" },
    { id: 2, jobRole: "Product Manager", status: "In Review", recruiter: "David Wilson", hiringLead: "Lisa Zhang", priority: "High" },
    { id: 3, jobRole: "Senior Developer", status: "Active", recruiter: "Emma Rodriguez", hiringLead: "John Smith", priority: "High" },
    { id: 4, jobRole: "UX Designer", status: "On Hold", recruiter: "Alex Thompson", hiringLead: "Maria Garcia", priority: "Low" },
    { id: 5, jobRole: "Data Analyst", status: "Closed", recruiter: "Kevin Lee", hiringLead: "Jennifer Brown", priority: "Medium" },
    { id: 6, jobRole: "DevOps Engineer", status: "Cancelled", recruiter: "Rachel Kim", hiringLead: "Robert Taylor", priority: "Low" },
    { id: 7, jobRole: "Backend Developer", status: "Filled", recruiter: "Anna Davis", hiringLead: "Carlos Martinez", priority: "High" },
  ];

  return <ModernJobList role="ta-leader" jobs={allJobs} title="Job List" />;
}
