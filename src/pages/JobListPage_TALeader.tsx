import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { JobListSalesPlan } from "@/components/sales-plan/JobListSalesPlan";
import { TourStep } from "@/store/tour-store";
import { useScreenTour } from "@/hooks/useScreenTour";
import { RL_TOUR_SCREEN_SEQUENCE } from "@/constants/tourScreens";
import { ListChecks } from "lucide-react";

function clickByTourId(tourId: string) {
  (document.querySelector(`[data-tour-id="${tourId}"]`) as HTMLElement)?.click();
}

const JOB_LIST_TOUR_STEPS: TourStep[] = [
  {
    variant: 'intro',
    icon: ListChecks,
    screenSequence: RL_TOUR_SCREEN_SEQUENCE,
    screenKey: 'job-list',
    title: "Every role, in one place",
    description: "This page holds every position you're hiring for, open or closed — as cards or a compact table, whichever you prefer.",
  },
  {
    variant: 'intro',
    icon: ListChecks,
    screenSequence: RL_TOUR_SCREEN_SEQUENCE,
    screenKey: 'job-list',
    title: "Actions live right here",
    description: "You don't need to open a job to act on it — most day-to-day actions happen right from this screen.",
  },
  {
    title: "Switching views",
    description: "Toggle between Cards — a scannable, visual layout — and List, a compact table, depending on what you need.",
    targetSelector: '[data-tour-id="job-view-toggle"]',
  },
  {
    title: "Status",
    description: "Shows where a role sits: Draft, In Review, Active, On Hold, Filled, Closed, or Cancelled. Color is just visual grouping here, not urgency — that's the \"at risk\" flag, next.",
    targetSelector: '[data-tour-id="job-status-badge"]',
  },
  {
    title: "At risk flag",
    description: "A role gets flagged when candidates have stalled in two or more stages, or it's been open 21+ days with at least one stall. It's an early warning, not a failure state.",
    targetSelector: '[data-tour-id="job-at-risk-flag"]',
  },
  {
    title: "Job actions",
    description: "View Plan opens the full job dashboard. View Pipeline opens the Kanban board. The menu next to them has View Candidates, View JD, and Import Candidates.",
    targetSelector: '[data-tour-id="job-row-actions"]',
  },
  {
    title: "Customize your columns",
    description: "Toggle which columns are visible in the table. Check or uncheck any column, then click Apply to save your view.",
    targetSelector: '[data-tour-id="job-col-filter-popover"]',
    onEnter: () => clickByTourId('job-col-filter-btn'),
  },
  {
    title: "Finding a specific role",
    description: "Type a job name or ID to filter instantly. Click any column header to sort or filter by that field — recruiter and status both support this.",
    targetSelector: '[data-tour-id="job-search"]',
  },
  {
    title: "Opening a role",
    description: "Click View Plan on any job to get the full job dashboard — funnel, pace, plan details, and history.",
    targetSelector: '[data-tour-id="job-view-plan-btn"]',
  },
];

export function JobListPage_TALeader() {
  useScreenTour("ta-leader", "job-list", JOB_LIST_TOUR_STEPS);

  return (
    <AppLayout>
      <div data-tour-id="job-list">
        <JobListSalesPlan />
      </div>
    </AppLayout>
  );
}

export default JobListPage_TALeader;
