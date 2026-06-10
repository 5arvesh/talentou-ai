
import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { JobOpenings } from "@/components/hiring-lead/JobOpenings";

export function JobOpeningsPage() {
  return (
    <AppLayout>
      <JobOpenings />
    </AppLayout>
  );
}

export default JobOpeningsPage;
