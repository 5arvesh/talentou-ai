
import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { JobOpenings } from "@/components/hiring-lead/JobOpenings";

export function JobOpeningsPage() {
  return (
    <Layout>
      <JobOpenings />
    </Layout>
  );
}

export default JobOpeningsPage;
