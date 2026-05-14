import React, { useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { TAAssociateJobList } from "@/TAAssociate/Job/TAAssociateJobList";
import { useTourStore, TourStep } from "@/store/tour-store";

const JOB_LIST_TOUR_STEPS: TourStep[] = [
  {
    title: "Your assigned jobs",
    description: "Each row shows the job title, experience required, status, number of applicants and priority. Click any row to expand its details.",
    targetSelector: '[data-tour-id="job-list"]',
  },
  {
    title: "Customize your columns",
    description: "Toggle which columns are visible in the table. Check or uncheck any column, then click Apply to save your view.",
    targetSelector: '[data-tour-id="job-col-filter-popover"]',
    onEnter: () => {
      (document.querySelector('[data-tour-id="job-col-filter-btn"]') as HTMLElement)?.click();
    },
  },
  {
    title: "Search & filter jobs",
    description: "Type a job name or ID to filter instantly. Click any column header to sort the table ascending or descending.",
    targetSelector: '[data-tour-id="job-search"]',
  },
];

export function JobListPage_TAAssociate() {
  const { startTour } = useTourStore();

  useEffect(() => {
    startTour("job-list-recruiter", JOB_LIST_TOUR_STEPS);
  }, []);

  return (
    <Layout>
      <div data-tour-id="job-list">
        <TAAssociateJobList />
      </div>
    </Layout>
  );
}

export default JobListPage_TAAssociate;
