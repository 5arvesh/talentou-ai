import type { TourScreenSequenceItem } from "@/store/tour-store";

/** Orientation + click-to-navigate sequence shown on each Recruitment Lead intro slide's progress bar. */
export const RL_TOUR_SCREEN_SEQUENCE: TourScreenSequenceItem[] = [
  { key: "dashboard", label: "Dashboard", path: "/sales-plan/dashboard" },
  { key: "job-list", label: "Job list", path: "/sales-plan/jobs" },
  { key: "candidate-list", label: "Candidates", path: "/sales-plan/candidates" },
  { key: "new-position", label: "New position", path: "/notifications/new-position" },
  { key: "settings", label: "Settings", path: "/settings/license" },
];

/** Orientation + click-to-navigate sequence shown on each Recruiter intro slide's progress bar. */
export const RECRUITER_TOUR_SCREEN_SEQUENCE: TourScreenSequenceItem[] = [
  { key: "dashboard", label: "Dashboard", path: "/ta-associate/dashboard" },
  { key: "job-list", label: "Job list", path: "/ta-associate/jobs" },
  { key: "candidate-list", label: "Candidates", path: "/ta-associate/candidates" },
  { key: "bulk-import", label: "Bulk import", path: "/ta-associate/candidates" },
  { key: "settings", label: "Settings", path: "/settings/profile" },
];

/** Orientation + click-to-navigate sequence shown on each Hiring Lead intro slide's progress bar. */
export const HL_TOUR_SCREEN_SEQUENCE: TourScreenSequenceItem[] = [
  { key: "dashboard", label: "Dashboard", path: "/hiring-lead/dashboard" },
  { key: "job-list", label: "Job list", path: "/hiring-lead/jobs" },
  { key: "candidate-list", label: "Candidates", path: "/hiring-lead/candidates" },
  { key: "settings", label: "Settings", path: "/settings/profile" },
];
