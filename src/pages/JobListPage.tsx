import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { JobList } from "@/components/hiring-lead/JobList";
import { TourStep } from "@/store/tour-store";
import { useScreenTour } from "@/hooks/useScreenTour";
import { HL_TOUR_SCREEN_SEQUENCE } from "@/constants/tourScreens";
import { ListChecks } from "lucide-react";

const JOB_LIST_TOUR_STEPS: TourStep[] = [
  {
    variant: 'intro',
    icon: ListChecks,
    screenSequence: HL_TOUR_SCREEN_SEQUENCE,
    screenKey: 'job-list',
    title: "Your positions",
    description: "Every role you've opened, in one place — as cards or a compact table, whichever you prefer.",
  },
  {
    title: "Status",
    description: "Shows where a role sits: Draft, In Review, Active, On Hold, Filled, Closed, or Cancelled.",
    targetSelector: '[data-tour-id="job-status-badge"]',
  },
  {
    title: "Switch views",
    description: "Card view for a visual overview, list view for compact scanning.",
    targetSelector: '[data-tour-id="job-view-toggle"]',
  },
  {
    title: "See the pipeline",
    description: "View Plan opens the full job dashboard for that role. View Pipeline jumps straight to the candidate list.",
    targetSelector: '[data-tour-id="job-row-actions"]',
  },
];

export function JobListPage() {
  useScreenTour("hiring-lead", "job-list", JOB_LIST_TOUR_STEPS);

  return (
    <AppLayout>
      <div data-tour-id="job-list">
        <JobList />
      </div>
    </AppLayout>
  );
}

export default JobListPage;
