import React, { useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { JobList } from "@/components/hiring-lead/JobList";
import { useTourStore } from "@/store/tour-store";

const JOB_LIST_TOUR_STEPS = [
  {
    title: "Your job openings are listed here",
    description: "Each card or row shows the job title, department, number of openings, and current status. Open positions are highlighted so you can focus on what's active.",
  },
  {
    title: "Filter & search to find jobs fast",
    description: "Use the search bar and filters to narrow down by status, department, or date. Sort by recently added or by urgency.",
  },
  {
    title: "Take action on any job",
    description: "Click on a job to view full details, schedule interviews, or manage candidates. Use the action menu for quick options like editing or archiving.",
  },
];

export function JobListPage() {
  const { startTour } = useTourStore();

  useEffect(() => {
    startTour("job-list-hl", JOB_LIST_TOUR_STEPS);
  }, []);

  return (
    <Layout>
      <JobList />
    </Layout>
  );
}

export default JobListPage;
