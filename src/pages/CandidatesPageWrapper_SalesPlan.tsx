import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { CandidatesPageSalesPlan } from "@/components/sales-plan/CandidatesPageSalesPlan";
import { TourStep } from "@/store/tour-store";
import { useScreenTour } from "@/hooks/useScreenTour";
import { RL_TOUR_SCREEN_SEQUENCE } from "@/constants/tourScreens";
import { Layers } from "lucide-react";

const CANDIDATES_TOUR_STEPS: TourStep[] = [
  {
    variant: 'intro',
    icon: Layers,
    screenSequence: RL_TOUR_SCREEN_SEQUENCE,
    screenKey: 'candidate-list',
    title: "Your candidate pool",
    description: "Every candidate across all your open roles, in one place. Three ways to look at them.",
  },
  {
    variant: 'intro',
    icon: Layers,
    screenSequence: RL_TOUR_SCREEN_SEQUENCE,
    screenKey: 'candidate-list',
    title: "Cards, list, or pipeline",
    description: "Switch between card view, list view, or Kanban — each one is useful for different tasks.",
  },
  {
    title: "Three views",
    description: "Cards for a visual overview with scores and tags. List for compact scanning across many candidates. Kanban for drag-and-drop pipeline management.",
    targetSelector: '[data-tour-id="candidate-view-toggle"]',
  },
  {
    title: "The pipeline",
    description: "Five stages: Applied/Sourced, Shortlisted, Interview, Selected — plus Rejected, a catch-all exit reachable from any of the first three stages, not a step after Selected.",
    targetSelector: '[data-tour-id="candidate-kanban-board"]',
  },
  {
    title: "Filter by role",
    description: "Kanban shows one job's pipeline at a time. Switch jobs here to see a different role's candidates.",
    targetSelector: '[data-tour-id="kanban-job-selector"]',
  },
  {
    title: "Fit score",
    description: "How well this candidate's skills, experience, and title match the role's requirements. Higher is a stronger fit.",
    targetSelector: '[data-tour-id="kanban-fit-score"]',
  },
  {
    title: "What you can do",
    description: "Click a card to view the full profile. Drag it forward or backward through Applied/Sourced, Shortlisted, Interview, and Selected freely. Selected asks for confirmation; dropping onto Rejected asks for a reason.",
    targetSelector: '[data-tour-id="kanban-candidate-card"]',
  },
];

export function CandidatesPageWrapper_SalesPlan() {
  useScreenTour("ta-leader", "candidate-list", CANDIDATES_TOUR_STEPS);
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
    <AppLayout>
      <div data-tour-id="candidate-list">
        <CandidatesPageSalesPlan jobs={jobs} />
      </div>
    </AppLayout>
  );
}

export default CandidatesPageWrapper_SalesPlan;
