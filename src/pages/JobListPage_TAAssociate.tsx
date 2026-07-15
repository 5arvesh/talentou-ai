import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { TAAssociateJobList } from "@/TAAssociate/Job/TAAssociateJobList";
import { TourStep } from "@/store/tour-store";
import { useScreenTour } from "@/hooks/useScreenTour";
import { RECRUITER_TOUR_SCREEN_SEQUENCE } from "@/constants/tourScreens";
import { ListChecks } from "lucide-react";

const JOB_LIST_TOUR_STEPS: TourStep[] = [
  {
    variant: 'intro',
    icon: ListChecks,
    screenSequence: RECRUITER_TOUR_SCREEN_SEQUENCE,
    screenKey: 'job-list',
    title: "Your assigned roles",
    description: "This view shows only the jobs assigned to you. Same actions, same views as the full team list — just filtered to your workload.",
  },
  {
    title: "Status",
    description: "Shows where a role sits: Draft, In Review, Active, On Hold, Filled, Closed, or Cancelled.",
    targetSelector: '[data-tour-id="job-status-badge"]',
  },
  {
    title: "At risk flag",
    description: "A role gets flagged when candidates have stalled in two or more stages, or it's been open 21+ days with at least one stall. Check these first.",
    targetSelector: '[data-tour-id="job-at-risk-flag"]',
  },
  {
    title: "Job actions",
    description: "View Plan opens the full job dashboard. View Pipeline opens the Kanban board. The menu next to them has View Candidates, View JD, and Generate JD Link.",
    targetSelector: '[data-tour-id="job-row-actions"]',
  },
  {
    title: "Switching views",
    description: "Toggle between Cards for a visual summary and List for a compact scannable table.",
    targetSelector: '[data-tour-id="job-view-toggle"]',
  },
  {
    title: "Dive deeper",
    description: "Click View Plan on any job for the full job dashboard — your daily sourcing pace, pipeline funnel, and plan details for that role.",
    targetSelector: '[data-tour-id="job-view-plan-btn"]',
  },
];

export function JobListPage_TAAssociate() {
  useScreenTour("recruiter", "job-list", JOB_LIST_TOUR_STEPS);

  return (
    <AppLayout>
      <div data-tour-id="job-list">
        <TAAssociateJobList />
      </div>
    </AppLayout>
  );
}

export default JobListPage_TAAssociate;
