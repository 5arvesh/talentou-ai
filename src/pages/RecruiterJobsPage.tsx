
import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { RecruiterJobList } from "@/components/recruiter/RecruiterJobList";

export function RecruiterJobsPage() {
  return (
    <AppLayout>
      <RecruiterJobList />
    </AppLayout>
  );
}

export default RecruiterJobsPage;
