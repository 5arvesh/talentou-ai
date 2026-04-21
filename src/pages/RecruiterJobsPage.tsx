
import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { RecruiterJobList } from "@/components/recruiter/RecruiterJobList";

export function RecruiterJobsPage() {
  return (
    <Layout>
      <RecruiterJobList />
    </Layout>
  );
}

export default RecruiterJobsPage;
