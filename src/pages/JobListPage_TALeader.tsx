import React, { useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { JobListSalesPlan } from "@/components/sales-plan/JobListSalesPlan";
import { useTourStore } from "@/store/tour-store";

const JOB_LIST_TOUR_STEPS = [
  {
    title: "Your job openings are listed here",
    description: "Each card or row shows the job title, department, number of openings, and current status. Open positions are highlighted so you can focus on what's active.",
    targetSelector: '[data-tour-id="job-list"]',
  },
  {
    title: "Filter & search to find jobs fast",
    description: "Use the search bar and filters to narrow down by status, department, or date. Sort by recently added or by urgency.",
    targetSelector: '[data-tour-id="job-list"]',
  },
  {
    title: "Take action on any job",
    description: "Click on a job to view full details, schedule interviews, or manage candidates. Use the action menu for quick options like editing or archiving.",
    targetSelector: '[data-tour-id="job-list"]',
  },
];

export function JobListPage_TALeader() {
  const { startTour } = useTourStore();

  useEffect(() => {
    startTour("job-list-leader", JOB_LIST_TOUR_STEPS);
  }, []);

  return (
    <Layout>
      <div data-tour-id="job-list">
        <JobListSalesPlan />
      </div>
    </Layout>
  );
}

export default JobListPage_TALeader;
