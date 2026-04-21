import React from "react";
import { ModernJobList, JobItem } from "@/components/shared/ModernJobList";

export function JobList() {
  const allJobs: JobItem[] = [
    { id: 1, jobRole: "Software Engineer", status: "Draft", recruiter: "Sarah Johnson" },
    { id: 2, jobRole: "Product Manager", status: "Pending Approval", recruiter: "David Wilson" },
    { id: 3, jobRole: "Senior Developer", status: "Active", recruiter: "Emma Rodriguez" },
    { id: 4, jobRole: "UX Designer", status: "On Hold", recruiter: "Alex Thompson" },
    { id: 5, jobRole: "Data Analyst", status: "Closed", recruiter: "Kevin Lee" },
    { id: 6, jobRole: "DevOps Engineer", status: "Cancelled", recruiter: "Rachel Kim" },
    { id: 7, jobRole: "Frontend Developer", status: "Rejected", recruiter: "Tom Anderson" },
    { id: 8, jobRole: "QA Engineer", status: "Active", recruiter: "Nina Patel" }
  ];

  return <ModernJobList role="hiring-lead" jobs={allJobs} title="My Job Requisitions" />;
}
