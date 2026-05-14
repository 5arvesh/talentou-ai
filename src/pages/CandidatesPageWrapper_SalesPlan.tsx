
import React, { useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { CandidatesPageSalesPlan } from "@/components/sales-plan/CandidatesPageSalesPlan";
import { useTourStore, TourStep } from "@/store/tour-store";

const CANDIDATES_TOUR_STEPS: TourStep[] = [
  {
    title: "Your candidate pipeline",
    description: "Every candidate sourced for your open roles appears here with their role-fit score, skills, and current status.",
    targetSelector: '[data-tour-id="candidate-list"]',
  },
  {
    title: "Customize columns",
    description: "Click Columns to show or hide fields like CTC, joining date, email, or phone number.",
    targetSelector: '[data-tour-id="candidate-col-filter-popover"]',
    onEnter: () => {
      (document.querySelector('[data-tour-id="candidate-col-filter-btn"]') as HTMLElement)?.click();
    },
  },
  {
    title: "Search & filter candidates",
    description: "Filter by job or status, sort by match score, or search by name, skills, or email to narrow the list.",
    targetSelector: '[data-tour-id="candidate-filter-bar"]',
  },
];

export function CandidatesPageWrapper_SalesPlan() {
  const { startTour } = useTourStore();

  useEffect(() => {
    startTour("sales-plan-candidates", CANDIDATES_TOUR_STEPS);
  }, []);
  // Mock job data that would typically come from the Job List table
  const jobs = [
    { id: 1, jobRole: "Software Engineer" },
    { id: 2, jobRole: "Product Manager" },
    { id: 3, jobRole: "Senior Developer" },
    { id: 4, jobRole: "UX Designer" },
    { id: 5, jobRole: "Data Analyst" },
    { id: 6, jobRole: "DevOps Engineer" },
    { id: 7, jobRole: "Frontend Developer" },
    { id: 8, jobRole: "QA Engineer" },
    { id: 9, jobRole: "Marketing Manager" },
    { id: 10, jobRole: "Sales Representative" },
    { id: 11, jobRole: "Backend Developer" },
    { id: 12, jobRole: "Data Scientist" },
    { id: 13, jobRole: "Mobile Developer" },
    { id: 14, jobRole: "Security Engineer" },
    { id: 15, jobRole: "Technical Writer" },
    { id: 16, jobRole: "Business Analyst" },
    { id: 17, jobRole: "Cloud Architect" },
    { id: 18, jobRole: "Scrum Master" },
    { id: 19, jobRole: "Database Administrator" },
    { id: 20, jobRole: "AI Engineer" },
    { id: 21, jobRole: "Network Engineer" },
    { id: 22, jobRole: "System Administrator" },
  ];

  return (
    <Layout>
      <div data-tour-id="candidate-list">
        <CandidatesPageSalesPlan jobs={jobs} />
      </div>
    </Layout>
  );
}

export default CandidatesPageWrapper_SalesPlan;
