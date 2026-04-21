import React from "react";
import { ModernJobList, JobItem } from "@/components/shared/ModernJobList";

export function InterviewerJobList() {
  const allJobs: JobItem[] = [
    { id: 1, jobRole: "Software Engineer", status: "Active", recruiter: "Sarah Johnson", hiringLead: "John Smith" },
    { id: 2, jobRole: "Product Manager", status: "Pending", recruiter: "David Wilson", hiringLead: "Sarah Connor" },
    { id: 3, jobRole: "UX Designer", status: "Active", recruiter: "Emma Rodriguez", hiringLead: "Mike Johnson" },
  ];

  return <ModernJobList role="interviewer" jobs={allJobs} title="Interview Management" />;
}