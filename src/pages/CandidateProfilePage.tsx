import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { CandidateProfile } from "@/components/sales-plan/CandidateProfile";

export function CandidateProfilePage() {
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
      <CandidateProfile jobs={jobs} />
    </Layout>
  );
}

export default CandidateProfilePage;